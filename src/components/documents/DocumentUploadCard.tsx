import { FileText, Loader2, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import { NativeSelect } from '@/components/ui/native-select'
import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT } from '@/content/documents'
import { formatDocumentDate } from '@/lib/documents'
import type { SampleDocument, SampleDocumentId } from '@/types/documents.types'

interface DocumentUploadCardProps {
  documents: readonly SampleDocument[]
  selectedId: SampleDocumentId | null
  onSelect: (documentId: SampleDocumentId) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export function DocumentUploadCard({
  documents,
  selectedId,
  onSelect,
  onAnalyze,
  isAnalyzing,
}: DocumentUploadCardProps) {
  const selectedDocument = documents.find((document) => document.id === selectedId) ?? null

  return (
    <SectionCard
      title={DOCUMENTS_CONTENT.analysis.title}
      description={DOCUMENTS_CONTENT.analysis.description}
    >
      <FormField
        label={DOCUMENTS_CONTENT.analysis.selectLabel}
        description={DOCUMENTS_CONTENT.analysis.selectHelp}
      >
        {(field) => (
          <NativeSelect
            {...field}
            value={selectedId ?? ''}
            disabled={isAnalyzing || documents.length === 0}
            onChange={(event) => {
              const nextDocument = documents.find(
                (document) => document.id === event.currentTarget.value,
              )

              if (nextDocument) {
                onSelect(nextDocument.id)
              }
            }}
          >
            {documents.length === 0 ? (
              <option value="">{DOCUMENTS_CONTENT.catalog.empty}</option>
            ) : null}
            {documents.map((document) => (
              <option key={document.id} value={document.id}>
                {document.name}
              </option>
            ))}
          </NativeSelect>
        )}
      </FormField>

      {selectedDocument ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <FileText
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-foreground">{selectedDocument.name}</p>
              <span className="inline-flex items-center rounded-full border border-blue-600/30 bg-blue-600/10 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
                Fictício
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedDocument.kind} · {selectedDocument.sizeLabel} · Atualizado em{' '}
              {formatDocumentDate(selectedDocument.updatedAt)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {selectedDocument.description}
            </p>
          </div>
        </div>
      ) : null}

      <Button
        type="button"
        variant="brand"
        size="xl"
        className="mt-4 w-full"
        onClick={onAnalyze}
        disabled={isAnalyzing || !selectedDocument}
        aria-busy={isAnalyzing}
      >
        {isAnalyzing ? (
          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
        ) : (
          <Sparkles aria-hidden="true" />
        )}
        {isAnalyzing
          ? DOCUMENTS_CONTENT.analysis.actionBusyLabel
          : DOCUMENTS_CONTENT.analysis.actionLabel}
      </Button>

      <FormAlert
        tone="info"
        title={DOCUMENTS_CONTENT.analysis.demoNoticeTitle}
        description={DOCUMENTS_CONTENT.analysis.demoNoticeDescription}
      />
    </SectionCard>
  )
}
