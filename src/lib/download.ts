import { createDocxBlob } from '@/lib/docx'
import { createPdfBlob } from '@/lib/pdf'
import { createTextBlob } from '@/lib/text'
import type { DownloadContent, DownloadFormat } from '@/types/documents.types'

const FORMAT_EXTENSION: Record<DownloadFormat, string> = {
  pdf: 'pdf',
  docx: 'docx',
  txt: 'txt',
}

export function buildDownloadFilename(baseFilename: string, format: DownloadFormat): string {
  const base = baseFilename.replace(/\.(pdf|docx|txt)$/i, '')

  return `${base}.${FORMAT_EXTENSION[format]}`
}

export function createDocumentBlob(content: DownloadContent, format: DownloadFormat): Blob {
  if (format === 'docx') {
    return createDocxBlob(content)
  }

  if (format === 'txt') {
    return createTextBlob(content)
  }

  return createPdfBlob(content)
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

export function saveDocument(
  content: DownloadContent,
  baseFilename: string,
  format: DownloadFormat,
): void {
  downloadBlob(createDocumentBlob(content, format), buildDownloadFilename(baseFilename, format))
}
