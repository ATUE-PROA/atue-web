import { ChevronDown, Download, FileText, Loader2, Lock, Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FormAlert } from '@/components/ui/form-alert'
import { SectionCard } from '@/components/ui/section-card'
import {
  DOCUMENTS_CONTENT,
  DOWNLOAD_CATEGORY_CONTENT,
  DOWNLOAD_FORMAT_CONTENT,
} from '@/content/documents'
import { formatDocumentDate, formatPageCount } from '@/lib/documents'
import type {
  DownloadCategory,
  DownloadFeedback,
  DownloadFormat,
  DownloadItem,
  PendingDownload,
} from '@/types/documents.types'

interface DownloadCenterProps {
  items: readonly DownloadItem[]
  pending: PendingDownload | null
  feedback: DownloadFeedback | null
  /** Relatórios gerados exigem plano superior; o bloqueio aparece antes do clique. */
  canDownloadReports: boolean
  onDownload: (item: DownloadItem, format: DownloadFormat) => void
}

interface DownloadGroupProps {
  category: DownloadCategory
  items: readonly DownloadItem[]
  pending: PendingDownload | null
  locked: boolean
  onDownload: (item: DownloadItem, format: DownloadFormat) => void
}

function DownloadGroup({ category, items, pending, locked, onDownload }: DownloadGroupProps) {
  const content = DOWNLOAD_CATEGORY_CONTENT[category]
  const emptyMessage =
    category === 'report'
      ? DOCUMENTS_CONTENT.downloads.emptyReports
      : DOCUMENTS_CONTENT.downloads.emptyTemplates

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-sm font-semibold text-foreground">{content.title}</h3>
        {locked ? (
          <Badge variant="outline" className="gap-1 rounded-full border-border">
            <Lock aria-hidden="true" />
            {DOCUMENTS_CONTENT.downloads.reportLockBadge}
          </Badge>
        ) : null}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{content.description}</p>
      {locked ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {DOCUMENTS_CONTENT.downloads.reportLockNote}
        </p>
      ) : null}

      {items.length === 0 ? (
        <p className="mt-3 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {items.map((item) => {
            const isPending = pending?.itemId === item.id
            const dateLabel =
              item.category === 'report'
                ? DOCUMENTS_CONTENT.downloads.generatedAtLabel
                : DOCUMENTS_CONTENT.downloads.updatedAtLabel
            const formatLabels = item.formats
              .map((format) => DOWNLOAD_FORMAT_CONTENT[format].label)
              .join(' · ')
            const pendingLabel = isPending
              ? DOCUMENTS_CONTENT.downloads.downloadingLabel.replace(
                  '{format}',
                  DOWNLOAD_FORMAT_CONTENT[pending.format].label,
                )
              : DOCUMENTS_CONTENT.downloads.downloadLabel

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
                      {formatPageCount(item.pages)} · {formatLabels}
                    </p>
                    {locked ? (
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Lock aria-hidden="true" className="size-3.5 shrink-0" />
                        {DOCUMENTS_CONTENT.downloads.reportLockBadge}
                      </p>
                    ) : null}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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
                      disabled={pending !== null}
                    >
                      {isPending ? (
                        <Loader2
                          aria-hidden="true"
                          className="animate-spin motion-reduce:animate-none"
                        />
                      ) : (
                        <Download aria-hidden="true" />
                      )}
                      {pendingLabel}
                      <ChevronDown aria-hidden="true" className="size-3.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>
                      <span className="block text-foreground">
                        {DOCUMENTS_CONTENT.downloads.formatMenuLabel}
                      </span>
                      <span className="mt-0.5 block font-normal">
                        {DOCUMENTS_CONTENT.downloads.formatMenuDescription}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {item.formats.map((format) => {
                      const formatContent = DOWNLOAD_FORMAT_CONTENT[format]

                      return (
                        <DropdownMenuItem
                          key={format}
                          className="items-start"
                          onSelect={() => onDownload(item, format)}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 inline-flex h-6 min-w-11 items-center justify-center rounded border border-border bg-muted px-1.5 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase"
                          >
                            {formatContent.label}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-medium text-foreground">
                              {formatContent.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                              {formatContent.description}
                            </span>
                          </span>
                        </DropdownMenuItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function DownloadCenter({
  items,
  pending,
  feedback,
  canDownloadReports,
  onDownload,
}: DownloadCenterProps) {
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

      {pending ? (
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
          pending={pending}
          locked={!canDownloadReports}
          onDownload={onDownload}
        />
        <DownloadGroup
          category="template"
          items={templates}
          pending={pending}
          locked={false}
          onDownload={onDownload}
        />
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        {DOCUMENTS_CONTENT.downloads.demoNotice}
      </p>

      <Link
        to="/settings"
        className="mt-3 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-blue-300 dark:hover:text-blue-200 dark:focus-visible:ring-blue-400/60"
      >
        <Settings2 aria-hidden="true" className="size-4" />
        {DOCUMENTS_CONTENT.downloads.preferencesLink}
      </Link>
    </SectionCard>
  )
}
