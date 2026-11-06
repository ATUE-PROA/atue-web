import { formatDocumentDateTime } from '@/lib/documents'
import type { DownloadContent, DownloadMetric } from '@/types/documents.types'

const LINE_WIDTH = 78
const RULE = '='.repeat(LINE_WIDTH)
const SUB_RULE = '-'.repeat(LINE_WIDTH)
const BULLET_INDENT = '  \u2022 '

function wrapText(value: string, width: number): string[] {
  const words = value.replace(/\s+/g, ' ').trim().split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word

    if (candidate.length <= width) {
      current = candidate
      continue
    }

    if (current) {
      lines.push(current)
    }

    if (word.length <= width) {
      current = word
      continue
    }

    let chunk = ''

    for (const character of word) {
      if (chunk.length + 1 <= width) {
        chunk += character
        continue
      }

      lines.push(chunk)
      chunk = character
    }

    current = chunk
  }

  if (current) {
    lines.push(current)
  }

  return lines.length > 0 ? lines : ['']
}

function formatParagraph(text: string): string {
  return wrapText(text, LINE_WIDTH).join('\n')
}

function formatBullet(text: string): string {
  const lines = wrapText(text, LINE_WIDTH - BULLET_INDENT.length)

  return lines
    .map((line, index) =>
      index === 0 ? `${BULLET_INDENT}${line}` : `${' '.repeat(BULLET_INDENT.length)}${line}`,
    )
    .join('\n')
}

function formatMetric(metric: DownloadMetric): string[] {
  const label = metric.label.toUpperCase()
  const value = metric.value
  const availableForDots = LINE_WIDTH - label.length - value.length - 2
  const lines: string[] = []

  if (availableForDots >= 3) {
    lines.push(`${label} ${'.'.repeat(availableForDots)} ${value}`)
  } else {
    lines.push(label, value)
  }

  if (metric.hint) {
    lines.push(`${' '.repeat(4)}${metric.hint}`)
  }

  return lines
}

function buildHeader(content: DownloadContent): string[] {
  const lines = ['ATUE', 'DOCUMENTO DE DEMONSTRAÇÃO', RULE, content.title.toUpperCase()]

  if (content.subtitle) {
    lines.push(...wrapText(content.subtitle, LINE_WIDTH))
  }

  lines.push(SUB_RULE)

  if (content.documentType) {
    lines.push(`Tipo: ${content.documentType}`)
  }

  if (content.reference) {
    lines.push(`Referência: ${content.reference}`)
  }

  if (content.organization) {
    lines.push(`Organização: ${content.organization}`)
  }

  if (content.generatedAt) {
    lines.push(`Gerado em: ${formatDocumentDateTime(content.generatedAt)}`)
  }

  if (content.meta) {
    lines.push(...content.meta.flatMap((line) => wrapText(line, LINE_WIDTH)))
  }

  lines.push(RULE, '')

  return lines
}

function buildPlainText(content: DownloadContent): string {
  const lines: string[] = buildHeader(content)

  if (content.metrics && content.metrics.length > 0) {
    for (const metric of content.metrics) {
      lines.push(...formatMetric(metric))
    }

    lines.push('', SUB_RULE, '')
  }

  content.sections.forEach((section, index) => {
    if (index > 0) {
      lines.push('')
    }

    lines.push(section.heading.toUpperCase(), SUB_RULE)

    for (const paragraph of section.paragraphs ?? []) {
      lines.push(formatParagraph(paragraph), '')
    }

    for (const bullet of section.bullets ?? []) {
      lines.push(formatBullet(bullet))
    }
  })

  lines.push('', RULE, content.footer.toUpperCase(), RULE)

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`
}

export function createTextBlob(content: DownloadContent): Blob {
  return new Blob([buildPlainText(content)], { type: 'text/plain;charset=utf-8' })
}
