import { useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { AnalysisProgress } from '@/components/documents/AnalysisProgress'
import { DocumentAnalysisResult } from '@/components/documents/DocumentAnalysisResult'
import { DocumentIntakeCard } from '@/components/documents/DocumentIntakeCard'
import { DocumentsList } from '@/components/documents/DocumentsList'
import { DownloadCenter } from '@/components/documents/DownloadCenter'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ANALYSIS_STEPS, DOCUMENTS_CONTENT } from '@/content/documents'
import { usePlan } from '@/contexts/plan-context'
import { saveDocument } from '@/lib/download'
import { cn } from '@/lib/utils'
import {
  analyzeDocument,
  getDownloadContent,
  getDownloads,
  getDocuments,
} from '@/services/documents'
import type {
  AnalysisProgress as AnalysisProgressState,
  DocumentAnalysisResult as DocumentAnalysisResultData,
  DocumentAnalysisTarget,
  DownloadFeedback,
  DownloadFormat,
  DownloadItem,
  LocalDocument,
  PendingDownload,
  SampleDocument,
  SampleDocumentId,
} from '@/types/documents.types'

type LoadState = 'loading' | 'ready' | 'error'
type AnalysisState = 'idle' | 'running' | 'success' | 'error'
type DocumentsTab = 'analyze' | 'downloads'

const DOCUMENT_TABS = [
  { id: 'analyze', label: DOCUMENTS_CONTENT.tabs.analyze },
  { id: 'downloads', label: DOCUMENTS_CONTENT.tabs.downloads },
] as const satisfies readonly { id: DocumentsTab; label: string }[]

const IDLE_PROGRESS: AnalysisProgressState = {
  stepIndex: 0,
  progress: 0,
  status: 'idle',
}

export function Documents() {
  const { canAccess, requestFeature } = usePlan()
  const isMountedRef = useRef(true)
  const progressSectionRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [activeTab, setActiveTab] = useState<DocumentsTab>('analyze')
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [reloadKey, setReloadKey] = useState(0)
  const [documents, setDocuments] = useState<SampleDocument[]>([])
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [selectedId, setSelectedId] = useState<SampleDocumentId | null>(null)
  const [attachedDocument, setAttachedDocument] = useState<LocalDocument | null>(null)
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle')
  const [progress, setProgress] = useState<AnalysisProgressState>(IDLE_PROGRESS)
  const [result, setResult] = useState<DocumentAnalysisResultData | null>(null)
  const [analyzedIds, setAnalyzedIds] = useState<SampleDocumentId[]>([])
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null)
  const [downloadFeedback, setDownloadFeedback] = useState<DownloadFeedback | null>(null)
  const canDownloadReports = canAccess('detailed-reports')

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (analysisState !== 'running') {
      return
    }

    const section = progressSectionRef.current

    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    section.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [analysisState])

  useEffect(() => {
    let isActive = true

    Promise.all([getDocuments(), getDownloads()])
      .then(([documentList, downloadList]) => {
        if (!isActive) {
          return
        }

        setDocuments(documentList)
        setDownloads(downloadList)
        setLoadState('ready')
      })
      .catch(() => {
        if (isActive) {
          setLoadState('error')
        }
      })

    return () => {
      isActive = false
    }
  }, [reloadKey])

  const handleSelectSample = (documentId: SampleDocumentId) => {
    if (analysisState === 'running') {
      return
    }

    setAttachedDocument(null)
    setSelectedId(documentId)
    setResult(null)
    setAnalysisState('idle')
    setDownloadFeedback(null)
  }

  const handleAttach = (document: LocalDocument) => {
    setSelectedId(null)
    setAttachedDocument(document)
    setResult(null)
    setAnalysisState('idle')
    setDownloadFeedback(null)
  }

  const handleRemoveAttached = () => {
    setAttachedDocument(null)
    setResult(null)
    setAnalysisState('idle')
    setDownloadFeedback(null)
  }

  const handleAnalyze = async () => {
    if (analysisState === 'running') {
      return
    }

    const target: DocumentAnalysisTarget | null = attachedDocument
      ? { source: 'local', document: attachedDocument }
      : selectedId
        ? { source: 'sample', documentId: selectedId }
        : null

    if (!target) {
      return
    }

    setAnalysisState('running')
    setProgress({ stepIndex: 0, progress: 0, status: 'running' })
    setResult(null)
    setDownloadFeedback(null)

    try {
      const analysis = await analyzeDocument(target, (nextProgress) => {
        if (isMountedRef.current) {
          setProgress(nextProgress)
        }
      })

      if (!isMountedRef.current) {
        return
      }

      setResult(analysis)
      setAnalysisState('success')

      if (target.source === 'sample') {
        setAnalyzedIds((current) =>
          current.includes(target.documentId) ? current : [...current, target.documentId],
        )
      }

      const updatedDownloads = await getDownloads()

      if (isMountedRef.current) {
        setDownloads(updatedDownloads)
      }
    } catch {
      if (isMountedRef.current) {
        setAnalysisState('error')
        setProgress((current) => ({ ...current, status: 'error' }))
      }
    }
  }

  const handleDownload = async (item: DownloadItem, format: DownloadFormat) => {
    if (item.category === 'report' && !requestFeature('detailed-reports')) {
      return
    }

    if (pendingDownload !== null) {
      return
    }

    setPendingDownload({ itemId: item.id, format })
    setDownloadFeedback(null)

    try {
      const content = await getDownloadContent(item.id)
      saveDocument(content, item.baseFilename, format)

      if (isMountedRef.current) {
        setDownloadFeedback({
          tone: 'success',
          title: DOCUMENTS_CONTENT.downloads.successTitle,
          description: DOCUMENTS_CONTENT.downloads.successDescription,
        })
      }
    } catch {
      if (isMountedRef.current) {
        setDownloadFeedback({
          tone: 'error',
          title: DOCUMENTS_CONTENT.downloads.errorTitle,
          description: DOCUMENTS_CONTENT.downloads.errorDescription,
        })
      }
    } finally {
      if (isMountedRef.current) {
        setPendingDownload(null)
      }
    }
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = DOCUMENT_TABS.length - 1
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') {
      nextIndex = index === lastIndex ? 0 : index + 1
    } else if (event.key === 'ArrowLeft') {
      nextIndex = index === 0 ? lastIndex : index - 1
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = lastIndex
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    setActiveTab(DOCUMENT_TABS[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  const showDownloadsTab = () => {
    const index = DOCUMENT_TABS.findIndex((tab) => tab.id === 'downloads')

    setActiveTab('downloads')
    tabRefs.current[index]?.focus()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />

      <main id="conteudo" className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <header className="max-w-2xl">
          <p className="text-eyebrow text-blue-600 dark:text-blue-400">
            {DOCUMENTS_CONTENT.eyebrow}
          </p>
          <h1 className="text-display mt-3 text-foreground">{DOCUMENTS_CONTENT.title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {DOCUMENTS_CONTENT.description}
          </p>
        </header>

        {loadState === 'loading' ? (
          <div role="status" className="mt-8 space-y-4">
            <span className="sr-only">{DOCUMENTS_CONTENT.loading}</span>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-44" />
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-3 rounded-xl border border-border bg-card p-6 shadow-sm">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        ) : null}

        {loadState === 'error' ? (
          <div className="mt-10 max-w-2xl">
            <FormAlert
              tone="error"
              title={DOCUMENTS_CONTENT.loadErrorTitle}
              description={DOCUMENTS_CONTENT.loadErrorDescription}
            />
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => {
                setLoadState('loading')
                setReloadKey((current) => current + 1)
              }}
            >
              {DOCUMENTS_CONTENT.retryLabel}
            </Button>
          </div>
        ) : null}

        {loadState === 'ready' ? (
          <>
            <div
              role="tablist"
              aria-label={DOCUMENTS_CONTENT.tabs.label}
              className="mt-8 flex w-full max-w-md rounded-lg border border-border bg-muted p-1"
            >
              {DOCUMENT_TABS.map((tab, index) => {
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    ref={(element) => {
                      tabRefs.current[index] = element
                    }}
                    type="button"
                    role="tab"
                    id={`${tab.id}-tab`}
                    aria-selected={isActive}
                    aria-controls={`${tab.id}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={cn(
                      'flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60',
                      isActive
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div
              role="tabpanel"
              id="analyze-panel"
              aria-labelledby="analyze-tab"
              className="mt-6"
              hidden={activeTab !== 'analyze'}
            >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
                <DocumentIntakeCard
                  documents={documents}
                  selectedId={selectedId}
                  attachedDocument={attachedDocument}
                  onSelectSample={handleSelectSample}
                  onAttach={handleAttach}
                  onRemoveAttached={handleRemoveAttached}
                  onAnalyze={() => {
                    void handleAnalyze()
                  }}
                  isAnalyzing={analysisState === 'running'}
                />

                <DocumentsList
                  documents={documents}
                  selectedId={attachedDocument ? null : selectedId}
                  analyzedIds={analyzedIds}
                  onSelect={handleSelectSample}
                  disabled={analysisState === 'running'}
                />
              </div>

              {analysisState === 'running' || analysisState === 'error' ? (
                <div ref={progressSectionRef} className="mt-6 scroll-mt-20">
                  <AnalysisProgress steps={ANALYSIS_STEPS} progress={progress} />
                  {analysisState === 'error' ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="mt-3"
                      onClick={() => {
                        void handleAnalyze()
                      }}
                    >
                      {DOCUMENTS_CONTENT.retryLabel}
                    </Button>
                  ) : null}
                </div>
              ) : null}

              {result ? (
                <div className="mt-6">
                  <DocumentAnalysisResult result={result} onShowDownloads={showDownloadsTab} />
                </div>
              ) : null}
            </div>

            <div
              role="tabpanel"
              id="downloads-panel"
              aria-labelledby="downloads-tab"
              className="mt-6"
              hidden={activeTab !== 'downloads'}
            >
              <DownloadCenter
                items={downloads}
                pending={pendingDownload}
                feedback={downloadFeedback}
                canDownloadReports={canDownloadReports}
                onDownload={(item, format) => {
                  void handleDownload(item, format)
                }}
              />
            </div>
          </>
        ) : null}
      </main>

      <ProductFooter />
    </div>
  )
}
