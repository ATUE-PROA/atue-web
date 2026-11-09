import { useRef, useState } from 'react'
import { ArrowUpRight, FileCheck2, FileText, Loader2, Paperclip, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { FormField } from '@/components/ui/form-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT } from '@/content/documents'
import {
  ACCEPTED_DOCUMENT_ACCEPT,
  type DocumentFileError,
  validateDocumentFile,
} from '@/lib/document-intake'
import { formatDocumentDate } from '@/lib/documents'
import type { LocalDocument, SampleDocument, SampleDocumentId } from '@/types/documents.types'

interface DocumentIntakeCardProps {
  documents: readonly SampleDocument[]
  selectedId: SampleDocumentId | null
  attachedDocument: LocalDocument | null
  onSelectSample: (documentId: SampleDocumentId) => void
  onAttach: (document: LocalDocument) => void
  onRemoveAttached: () => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

const { intake } = DOCUMENTS_CONTENT

function getFileErrorMessage(error: DocumentFileError): string {
  if (error === 'empty') {
    return intake.emptyFileError
  }

  if (error === 'too-large') {
    return intake.tooLargeFileError
  }

  return intake.unsupportedFileError
}

export function DocumentIntakeCard({
  documents,
  selectedId,
  attachedDocument,
  onSelectSample,
  onAttach,
  onRemoveAttached,
  onAnalyze,
  isAnalyzing,
}: DocumentIntakeCardProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const selectedDocument = documents.find((document) => document.id === selectedId) ?? null
  const canAnalyze = attachedDocument !== null || selectedDocument !== null

  const handleFileChange = (file: File | undefined) => {
    if (!file) {
      return
    }

    const result = validateDocumentFile(file)

    if (!result.ok) {
      setStatusMessage(null)
      setFileError(getFileErrorMessage(result.error))
      return
    }

    setFileError(null)
    setStatusMessage(`${intake.attachedTitle}: ${result.document.name}`)
    onAttach(result.document)
  }

  return (
    <SectionCard title={intake.title} description={intake.description}>
      <p role="status" className="sr-only">
        {statusMessage}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_DOCUMENT_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0]
          event.currentTarget.value = ''
          handleFileChange(file)
        }}
      />

      <div className="rounded-xl border border-dashed border-border bg-muted/20 p-4 sm:p-5">
        {attachedDocument ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                <FileCheck2 aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {intake.attachedTitle}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                  {attachedDocument.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {attachedDocument.kind} · {attachedDocument.sizeLabel} · {intake.sourceFileLabel}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                disabled={isAnalyzing}
              >
                <Paperclip aria-hidden="true" />
                {intake.replaceLabel}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFileError(null)
                  setStatusMessage(intake.removedNotice)
                  onRemoveAttached()
                }}
                disabled={isAnalyzing}
                aria-label={`${intake.removeLabel}: ${attachedDocument.name}`}
              >
                <X aria-hidden="true" />
                {intake.removeLabel}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{intake.emptyTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {intake.emptyDescription}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="brand"
              size="lg"
              className="w-full shrink-0 sm:w-auto"
              onClick={() => inputRef.current?.click()}
              disabled={isAnalyzing}
            >
              <Paperclip aria-hidden="true" />
              {intake.attachLabel}
            </Button>
          </div>
        )}

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{intake.acceptedHelp}</p>
      </div>

      {fileError ? (
        <FormAlert tone="error" title={intake.fileErrorTitle} description={fileError} />
      ) : null}

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-foreground">{intake.sampleTitle}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {intake.sampleDescription}
        </p>

        <FormField
          label={intake.sampleLabel}
          description={
            attachedDocument
              ? 'Remova o arquivo anexado para usar um documento de exemplo.'
              : intake.sampleHelp
          }
          className="mt-3"
        >
          {(field) => (
            <Select
              value={selectedId ?? ''}
              disabled={isAnalyzing || attachedDocument !== null || documents.length === 0}
              onValueChange={(value) => {
                const nextDocument = documents.find((document) => document.id === value)

                if (nextDocument) {
                  setFileError(null)
                  onSelectSample(nextDocument.id)
                }
              }}
            >
              <SelectTrigger
                id={field.id}
                aria-invalid={field['aria-invalid']}
                aria-describedby={field['aria-describedby']}
                aria-required={field['aria-required']}
                className="h-11 w-full data-[size=default]:h-11"
              >
                <SelectValue
                  placeholder={
                    documents.length === 0 ? DOCUMENTS_CONTENT.catalog.empty : intake.sampleLabel
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {documents.map((document) => (
                  <SelectItem key={document.id} value={document.id}>
                    {document.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </FormField>
      </div>

      {attachedDocument ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-background p-3">
          <FileText
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400"
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">{intake.selectedSourceLabel}: </span>
            {intake.sourceFileLabel}.
          </p>
        </div>
      ) : selectedDocument ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
          <FileText
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-foreground">{selectedDocument.name}</p>
              <Badge
                variant="outline"
                className="rounded-full border-blue-600/30 bg-blue-600/10 px-2 py-0.5 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
              >
                Fictício
              </Badge>
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
        disabled={isAnalyzing || !canAnalyze}
        aria-busy={isAnalyzing}
      >
        {isAnalyzing ? (
          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
        ) : (
          <Sparkles aria-hidden="true" />
        )}
        {isAnalyzing ? intake.analyzeBusyLabel : intake.analyzeLabel}
      </Button>

      <FormAlert
        tone="info"
        title={intake.demoNoticeTitle}
        description={intake.demoNoticeDescription}
      />

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{intake.privacyNote}</p>

      <Link
        to="/form"
        className="mt-3 inline-flex items-center gap-1 rounded-md text-sm font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
      >
        Precisa enviar vários documentos? Use o envio completo
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </Link>
    </SectionCard>
  )
}
