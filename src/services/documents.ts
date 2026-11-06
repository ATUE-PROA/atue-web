import {
  mockAnalyzeDocument,
  mockGetDocuments,
  mockGetDownloadContent,
  mockGetDownloads,
} from '@/mocks/documents'
import type {
  AnalysisProgressListener,
  DocumentAnalysisResult,
  DownloadContent,
  DownloadItem,
  SampleDocument,
  SampleDocumentId,
} from '@/types/documents.types'

export function getDocuments(): Promise<SampleDocument[]> {
  return mockGetDocuments()
}

export function analyzeDocument(
  documentId: SampleDocumentId,
  onProgress?: AnalysisProgressListener,
): Promise<DocumentAnalysisResult> {
  return mockAnalyzeDocument(documentId, onProgress)
}

export function getDownloads(): Promise<DownloadItem[]> {
  return mockGetDownloads()
}

export function getDownloadContent(itemId: string): Promise<DownloadContent> {
  return mockGetDownloadContent(itemId)
}
