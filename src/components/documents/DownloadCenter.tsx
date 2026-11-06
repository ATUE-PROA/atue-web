import { Download, FileText, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT, DOWNLOAD_CATEGORY_CONTENT } from '@/content/documents'
import { formatDocumentDate, formatPageCount } from '@/lib/documents'
import type { DownloadCategory, DownloadFeedback, DownloadItem } from '@/types/documents.types'

interface DownloadCenterProps {
  items: readonly DownloadItem[]
  pendingId: string | null
  feedback: DownloadFeedback | null
  onDownload: (item: DownloadItem) => void
}

interface DownloadGroupProps {
  category: DownloadCategory
  items: readonly DownloadItem[]
  pendingId: string | null
  onDownload: (item: DownloadItem) => void
}

function DownloadGroup({ category, items, pendingId, onDownload }: DownloadGroupProps) {
  const content = DOWNLOAD_CATEGORY_CONTENT[category]
  const emptyMessage =
    category === 'report'
      ? DOCUMENTS_CONTENT.downloads.emptyReports
      : DOCUMENTS_CONTENT.downloads.emptyTemplates

  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{content.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{content.description}</p>

      {items.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((item) => {
            const isPending = pendingId === item.id
            const dateLabel =
              item.category === 'report'
                ? DOCUMENTS_CONTENT.downloads.generatedAtLabel
                : DOCUMENTS_CONTENT.downloads.updatedAtLabel

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <FileText
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {dateLabel} {formatDocumentDate(item.updatedAt)} ·{' '}
                      {formatPageCount(item.pages)} · PDF
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full shrink-0 sm:w-auto"
                  aria-label={DOCUMENTS_CONTENT.downloads.downloadAriaLabel.replace(
                    '{title}',
                    item.title,
                  )}
                  aria-busy={isPending}
                  disabled={pendingId !== null}
                  onClick={() => onDownload(item)}
                >
                  {isPending ? (
                    <Loader2
                      aria-hidden="true"
                      className="animate-spin motion-reduce:animate-none"
                    />
                  ) : (
                    <Download aria-hidden="true" />
                  )}
                  {isPending
                    ? DOCUMENTS_CONTENT.downloads.downloadingLabel
                    : DOCUMENTS_CONTENT.downloads.downloadLabel}
                </Button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function DownloadCenter({ items, pendingId, feedback, onDownload }: DownloadCenterProps) {
  const reports = items.filter((item) => item.category === 'report')
  const templates = items.filter((item) => item.category === 'template')

  return (
    <SectionCard
      id="central-de-downloads"
      title={DOCUMENTS_CONTENT.downloads.title}
      description={DOCUMENTS_CONTENT.downloads.description}
    >
      {feedback ? (
        <FormAlert tone={feedback.tone} title={feedback.title} description={feedback.description} />
      ) : null}

      {pendingId ? (
        <FormAlert
          tone="info"
          title={DOCUMENTS_CONTENT.downloads.preparingTitle}
          description={DOCUMENTS_CONTENT.downloads.preparingDescription}
        />
      ) : null}

      <div className="mt-6 space-y-6">
        <DownloadGroup
          category="report"
          items={reports}
          pendingId={pendingId}
          onDownload={onDownload}
        />
        <DownloadGroup
          category="template"
          items={templates}
          pendingId={pendingId}
          onDownload={onDownload}
        />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        {DOCUMENTS_CONTENT.downloads.demoNotice}
      </p>
    </SectionCard>
  )
}
