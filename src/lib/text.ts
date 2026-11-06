import type { DownloadContent } from '@/types/documents.types'

function buildPlainText(content: DownloadContent): string {
  const lines: string[] = [content.title]

  if (content.subtitle) {
    lines.push('', content.subtitle)
  }

  if (content.meta && content.meta.length > 0) {
    lines.push('', ...content.meta)
  }

  for (const section of content.sections) {
    lines.push('', section.heading, '')

    for (const paragraph of section.paragraphs ?? []) {
      lines.push(paragraph, '')
    }

    for (const bullet of section.bullets ?? []) {
      lines.push(`- ${bullet}`)
    }
  }

  lines.push('', content.footer)

  return `${lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd()}\n`
}

export function createTextBlob(content: DownloadContent): Blob {
  return new Blob([buildPlainText(content)], { type: 'text/plain;charset=utf-8' })
}
