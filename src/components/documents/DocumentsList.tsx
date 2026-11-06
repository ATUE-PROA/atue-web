import { CheckCircle2, FileText } from 'lucide-react'

import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT } from '@/content/documents'
import { formatDocumentDate } from '@/lib/documents'
import { cn } from '@/lib/utils'
import type { SampleDocument, SampleDocumentId } from '@/types/documents.types'

interface DocumentsListProps {
  documents: readonly SampleDocument[]
  selectedId: SampleDocumentId | null
  analyzedIds: readonly SampleDocumentId[]
  onSelect: (documentId: SampleDocumentId) => void
  disabled?: boolean
}

export function DocumentsList({
  documents,
  selectedId,
  analyzedIds,
  onSelect,
  disabled = false,
}: DocumentsListProps) {
  return (
    <SectionCard
      title={DOCUMENTS_CONTENT.catalog.title}
      description={DOCUMENTS_CONTENT.catalog.description}
    >
      {documents.length === 0 ? (
        <p className="text-sm text-muted-foreground">{DOCUMENTS_CONTENT.catalog.empty}</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((document) => {
            const isSelected = document.id === selectedId
            const wasAnalyzed = analyzedIds.includes(document.id)

            return (
              <li key={document.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  disabled={disabled}
                  onClick={() => onSelect(document.id)}
                  className={cn(
                    'w-full rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 dark:focus-visible:ring-blue-400/60',
                    isSelected
                      ? 'border-blue-600/40 bg-blue-600/5 dark:border-blue-500/40 dark:bg-blue-500/10'
                      : 'border-border bg-background hover:bg-muted/50',
                  )}
                >
                  <span className="flex items-start gap-3">
                    <FileText
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-foreground">
                        {document.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {document.kind} · {document.sizeLabel} · Atualizado em{' '}
                        {formatDocumentDate(document.updatedAt)}
                      </span>
                      <span className="mt-2 flex flex-wrap items-center gap-2">
                        {isSelected ? (
                          <span className="inline-flex items-center rounded-full border border-blue-600/30 bg-blue-600/10 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
                            {DOCUMENTS_CONTENT.catalog.selectedLabel}
                          </span>
                        ) : null}
                        {wasAnalyzed ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-green-600/30 bg-green-600/10 px-2 py-0.5 text-xs font-medium text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300">
                            <CheckCircle2 aria-hidden="true" className="size-3" />
                            {DOCUMENTS_CONTENT.catalog.analyzedLabel}
                          </span>
                        ) : null}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Selecione um exemplo para habilitar a análise sem anexar nenhum arquivo.
      </p>
    </SectionCard>
  )
}
