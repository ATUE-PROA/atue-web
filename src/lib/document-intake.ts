import type { LocalDocument } from '@/types/documents.types'

export const ACCEPTED_DOCUMENT_EXTENSIONS = ['pdf', 'doc', 'docx', 'txt'] as const
export const ACCEPTED_DOCUMENT_ACCEPT =
  '.pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain'
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024

const KIND_BY_EXTENSION: Record<string, string> = {
  pdf: 'PDF',
  doc: 'DOC',
  docx: 'DOCX',
  txt: 'TXT',
}

export type DocumentFileError = 'empty' | 'unsupported' | 'too-large'

export type DocumentFileValidation =
  { ok: true; document: LocalDocument } | { ok: false; error: DocumentFileError }

export function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.')

  return parts.length > 1 ? (parts.at(-1) ?? '') : ''
}

export function getDocumentKind(filename: string): string {
  return KIND_BY_EXTENSION[getFileExtension(filename)] ?? 'Documento'
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`
}

export function validateDocumentFile(file: File): DocumentFileValidation {
  if (file.size === 0) {
    return { ok: false, error: 'empty' }
  }

  const extension = getFileExtension(file.name)

  if (!ACCEPTED_DOCUMENT_EXTENSIONS.some((accepted) => accepted === extension)) {
    return { ok: false, error: 'unsupported' }
  }

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return { ok: false, error: 'too-large' }
  }

  return {
    ok: true,
    document: {
      name: file.name,
      kind: getDocumentKind(file.name),
      sizeLabel: formatFileSize(file.size),
      extension,
    },
  }
}
