import {
  mockAnalyzeDocument,
  mockGetDocuments,
  mockGetDownloadContent,
  mockGetDownloads,
} from '@/mocks/documents'
import type {
  AnalysisProgressListener,
  DocumentAnalysisResult,
  DocumentAnalysisTarget,
  DownloadContent,
  DownloadItem,
  SampleDocument,
} from '@/types/documents.types'

export function getDocuments(): Promise<SampleDocument[]> {
  return mockGetDocuments()
}

export function analyzeDocument(
  target: DocumentAnalysisTarget,
  onProgress?: AnalysisProgressListener,
): Promise<DocumentAnalysisResult> {
  return mockAnalyzeDocument(target, onProgress)
}

export function getDownloads(): Promise<DownloadItem[]> {
  return mockGetDownloads()
}

export function getDownloadContent(itemId: string): Promise<DownloadContent> {
  return mockGetDownloadContent(itemId)
}
