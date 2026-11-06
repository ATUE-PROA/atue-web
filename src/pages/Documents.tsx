import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { AnalysisProgress } from '@/components/documents/AnalysisProgress'
import { DocumentAnalysisResult } from '@/components/documents/DocumentAnalysisResult'
import { DocumentIntakeCard } from '@/components/documents/DocumentIntakeCard'
import { DocumentsList } from '@/components/documents/DocumentsList'
import { DownloadCenter } from '@/components/documents/DownloadCenter'
import { CrossLinks } from '@/components/layout/cross-links'
import { ProductFooter } from '@/components/layout/product-footer'
import { ProductHeader } from '@/components/layout/product-header'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { ANALYSIS_STEPS, DOCUMENTS_CONTENT } from '@/content/documents'
import { DOCUMENT_SHORTCUTS } from '@/content/navigation'
import { usePlan } from '@/contexts/plan-context'
import { saveDocument } from '@/lib/download'
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

const IDLE_PROGRESS: AnalysisProgressState = {
  stepIndex: 0,
  progress: 0,
  status: 'idle',
}

export function Documents() {
  const { requestFeature } = usePlan()
  const isMountedRef = useRef(true)
  const progressSectionRef = useRef<HTMLDivElement | null>(null)
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
        setSelectedId((current) => current ?? documentList[0]?.id ?? null)
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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <ProductHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <header className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
            {DOCUMENTS_CONTENT.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {DOCUMENTS_CONTENT.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {DOCUMENTS_CONTENT.description}
          </p>
        </header>

        <CrossLinks
          className="mt-6"
          ariaLabel={DOCUMENTS_CONTENT.shortcutsLabel}
          links={DOCUMENT_SHORTCUTS}
        />

        {loadState === 'loading' ? (
          <div
            role="status"
            className="mt-10 flex items-center gap-2 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-sm"
          >
            <Loader2
              aria-hidden="true"
              className="size-4 animate-spin motion-reduce:animate-none"
            />
            {DOCUMENTS_CONTENT.loading}
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
            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
              <DocumentIntakeCard
                documents={documents}
                selectedId={selectedId}
                attachedDocument={attachedDocument}
                onSelectSample={handleSelectSample}
                onAttach={(document) => {
                  setAttachedDocument(document)
                  setResult(null)
                  setAnalysisState('idle')
                  setDownloadFeedback(null)
                }}
                onRemoveAttached={() => {
                  setAttachedDocument(null)
                  setResult(null)
                  setAnalysisState('idle')
                  setDownloadFeedback(null)
                }}
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
              </div>
            ) : null}

            {result ? (
              <div className="mt-6">
                <DocumentAnalysisResult result={result} />
              </div>
            ) : null}

            <div className="mt-6">
              <DownloadCenter
                items={downloads}
                pending={pendingDownload}
                feedback={downloadFeedback}
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
