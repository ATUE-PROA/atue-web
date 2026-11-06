import type { DiagnosticReport } from '@/types/api'

export type SampleDocumentId =
  'privacy-policy' | 'consent-term' | 'incident-log' | 'vendor-contract'

export interface SampleDocument {
  id: SampleDocumentId
  name: string
  kind: string
  sizeLabel: string
  updatedAt: string
  description: string
}

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
  document: SampleDocument
  report: DiagnosticReport
  completedAt: string
}

export type DownloadCategory = 'report' | 'template'

export type TemplateId = 'privacy-policy-template' | 'consent-term-template'

export interface DownloadItem {
  id: string
  category: DownloadCategory
  title: string
  description: string
  pages: number
  updatedAt: string
  filename: string
}

export interface DownloadSection {
  heading: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
}

export interface DownloadContent {
  title: string
  subtitle?: string
  meta?: readonly string[]
  sections: readonly DownloadSection[]
  footer: string
}

export interface DownloadFeedback {
  tone: 'success' | 'error'
  title: string
  description: string
}
