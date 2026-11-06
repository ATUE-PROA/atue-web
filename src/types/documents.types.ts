import type { DiagnosticReport } from '@/types/api'

export type SampleDocumentId =
  'privacy-policy' | 'consent-term' | 'incident-log' | 'vendor-contract'

export type DocumentSource = 'sample' | 'local'

export interface SampleDocument {
  id: SampleDocumentId
  name: string
  kind: string
  sizeLabel: string
  updatedAt: string
  description: string
}

export interface LocalDocument {
  name: string
  kind: string
  sizeLabel: string
  extension: string
}

export interface AnalyzedDocument {
  id: string
  name: string
  kind: string
  sizeLabel: string
  updatedAt: string
  description: string
  source: DocumentSource
}

export type DocumentAnalysisTarget =
  { source: 'sample'; documentId: SampleDocumentId } | { source: 'local'; document: LocalDocument }

export type AnalysisStatus = 'idle' | 'running' | 'done' | 'error'

export interface AnalysisStep {
  id: string
  label: string
  description: string
}

export interface AnalysisProgress {
  stepIndex: number
  progress: number
  status: AnalysisStatus
}

export type AnalysisProgressListener = (progress: AnalysisProgress) => void

export interface DocumentAnalysisResult {
  document: AnalyzedDocument
  report: DiagnosticReport
  completedAt: string
}

export type DownloadCategory = 'report' | 'template'

export type DownloadFormat = 'pdf' | 'docx' | 'txt'

export type TemplateId =
  'privacy-policy-template' | 'consent-term-template' | 'incident-response-template'

export interface DownloadItem {
  id: string
  category: DownloadCategory
  title: string
  description: string
  pages: number
  updatedAt: string
  baseFilename: string
  formats: readonly DownloadFormat[]
}

export interface PendingDownload {
  itemId: string
  format: DownloadFormat
}

export interface DownloadMetric {
  label: string
  value: string
  hint?: string
}

export interface DownloadSection {
  heading: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
}

export interface DownloadContent {
  title: string
  subtitle?: string
  documentType?: string
  reference?: string
  organization?: string
  generatedAt?: string
  meta?: readonly string[]
  metrics?: readonly DownloadMetric[]
  sections: readonly DownloadSection[]
  footer: string
}

export interface DownloadFeedback {
  tone: 'success' | 'error'
  title: string
  description: string
}
