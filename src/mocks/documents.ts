import {
  ANALYSIS_STEPS,
  REPORT_DEMO_FOOTER,
  SEVERITY_CONTENT,
  TEMPLATE_PDF_CONTENT,
} from '@/content/documents'
import { cloneDiagnosticReport, getScoreLevel } from '@/lib/diagnostics'
import { delay, formatDocumentDateTime, pluralize, slugifyFilename } from '@/lib/documents'
import {
  buildDiagnosticReport,
  getMockDiagnosticSnapshot,
  setMockDiagnostic,
} from '@/mocks/diagnostics'
import type { DiagnosticReport, IssueCategory } from '@/types/api'
import type {
  AnalysisProgressListener,
  DocumentAnalysisResult,
  DownloadContent,
  DownloadItem,
  SampleDocument,
  SampleDocumentId,
  TemplateId,
} from '@/types/documents.types'

const DOCUMENTS_DELAY_MS = 500
const DOWNLOADS_DELAY_MS = 450
const DOWNLOAD_CONTENT_DELAY_MS = 650
const ANALYSIS_STEP_DELAY_MS = 620

const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'privacy-policy',
    name: 'Política de Privacidade 2026',
    kind: 'Política interna',
    sizeLabel: '184 KB',
    updatedAt: '2026-10-21T13:40:00.000Z',
    description:
      'Versão publicada no site institucional, com seções de coleta, uso e compartilhamento de dados.',
  },
  {
    id: 'consent-term',
    name: 'Termo de Consentimento — Marketing',
    kind: 'Termo',
    sizeLabel: '96 KB',
    updatedAt: '2026-10-12T09:15:00.000Z',
    description:
      'Termo usado em campanhas de e-mail e formulários de newsletter para registrar a escolha do titular.',
  },
  {
    id: 'incident-log',
    name: 'Registro de Incidentes — 3º trimestre',
    kind: 'Registro operacional',
    sizeLabel: '212 KB',
    updatedAt: '2026-10-05T17:05:00.000Z',
    description:
      'Planilha com ocorrências de segurança, responsáveis, prazos e evidências coletadas pela equipe.',
  },
  {
    id: 'vendor-contract',
    name: 'Contrato — Fornecedor de CRM',
    kind: 'Contrato',
    sizeLabel: '348 KB',
    updatedAt: '2026-09-29T11:30:00.000Z',
    description:
      'Contrato de prestação de serviço com cláusulas de tratamento de dados e transferência internacional.',
  },
]

interface AnalysisProfile {
  score: number
  issues: IssueCategory[]
}

const ANALYSIS_PROFILES: Record<SampleDocumentId, AnalysisProfile> = {
  'privacy-policy': {
    score: 84,
    issues: [
      {
        id: 'privacy-cookies',
        name: 'Detalhamento de cookies',
        category: 'Cookies e rastreamento',
        severity: 'media',
        description: 'A política cita cookies, mas não descreve as categorias usadas.',
        explanation:
          'Sem uma lista de categorias e finalidades, o titular não consegue avaliar o impacto dos cookies de análise e marketing.',
        recommendation:
          'Inclua uma tabela com categoria, finalidade, duração e fornecedor de cada cookie, além do caminho para alterar a escolha.',
      },
      {
        id: 'privacy-retention',
        name: 'Prazos de retenção',
        category: 'Retenção de dados',
        severity: 'baixa',
        description: 'Os prazos de retenção são citados de forma genérica.',
        explanation:
          'A política informa que os dados são mantidos "pelo tempo necessário", sem indicar critérios ou prazos por categoria.',
        recommendation:
          'Defina prazos objetivos por categoria de dado e registre o critério de eliminação ou anonimização.',
      },
    ],
  },
  'consent-term': {
    score: 66,
    issues: [
      {
        id: 'consent-evidence',
        name: 'Comprovação de consentimento',
        category: 'Bases legais',
        severity: 'alta',
        description: 'O termo não define como a manifestação será registrada.',
        explanation:
          'Sem data, versão do texto e canal de coleta, a organização não consegue demonstrar que o consentimento foi obtido de forma livre e informada.',
        recommendation:
          'Registre data, hora, versão do termo, canal e identificador do titular, com trilha de auditoria para consulta posterior.',
      },
      {
        id: 'consent-revocation',
        name: 'Canal de revogação',
        category: 'Direitos do titular',
        severity: 'media',
        description: 'O documento não informa como revogar o consentimento.',
        explanation:
          'A revogação é um direito do titular e precisa ser simples e acessível, sem exigir justificativa ou contato presencial.',
        recommendation:
          'Descreva o canal de revogação, o prazo de resposta e o efeito da revogação sobre tratamentos já realizados.',
      },
    ],
  },
  'incident-log': {
    score: 46,
    issues: [
      {
        id: 'incident-deadline',
        name: 'Prazo de comunicação',
        category: 'Resposta a incidentes',
        severity: 'alta',
        description: 'O registro não indica o prazo para comunicar a ANPD e os titulares.',
        explanation:
          'A ausência de prazo e de critério de avaliação pode atrasar a comunicação obrigatória e ampliar o impacto do incidente.',
        recommendation:
          'Defina um fluxo com prazo interno, critério de risco e responsáveis pela comunicação à ANPD e aos titulares afetados.',
      },
      {
        id: 'incident-owner',
        name: 'Responsável pela resposta',
        category: 'Governança',
        severity: 'alta',
        description: 'Os incidentes não têm um responsável formal pela condução.',
        explanation:
          'Sem um responsável nomeado, a triagem, a contenção e a comunicação ficam sujeitas a atraso e decisões inconsistentes.',
        recommendation:
          'Nomeie um responsável e um substituto, com papéis documentados para triagem, contenção, comunicação e encerramento.',
      },
      {
        id: 'incident-evidence',
        name: 'Evidências do incidente',
        category: 'Registro e evidências',
        severity: 'media',
        description: 'As ocorrências não registram as evidências coletadas.',
        explanation:
          'A falta de evidências dificulta a análise de causa, a comprovação das medidas adotadas e o aprendizado posterior.',
        recommendation:
          'Padronize o registro de logs, datas, sistemas afetados e ações executadas, com retenção adequada das evidências.',
      },
    ],
  },
  'vendor-contract': {
    score: 58,
    issues: [
      {
        id: 'vendor-dpa',
        name: 'Cláusula de tratamento de dados',
        category: 'Contratos e terceiros',
        severity: 'alta',
        description: 'O contrato não detalha as obrigações do fornecedor como operador.',
        explanation:
          'Sem cláusulas de finalidade, segurança, subcontratação e devolução de dados, a organização mantém risco mesmo quando o fornecedor é quem trata os dados.',
        recommendation:
          'Inclua um anexo de tratamento de dados com instruções, medidas de segurança, subcontratados autorizados e devolução ou eliminação ao final.',
      },
      {
        id: 'vendor-transfer',
        name: 'Transferência internacional',
        category: 'Transferência de dados',
        severity: 'media',
        description: 'O contrato prevê suporte no exterior sem indicar a base legal.',
        explanation:
          'A transferência internacional exige mecanismo legal e informação clara sobre o país de destino e as salvaguardas adotadas.',
        recommendation:
          'Identifique o mecanismo de transferência, os países envolvidos e as cláusulas contratuais ou garantias aplicáveis.',
      },
    ],
  },
}

interface GeneratedReportRecord {
  item: DownloadItem
  report: DiagnosticReport
  documentName: string
}

const TEMPLATE_ITEMS: DownloadItem[] = [
  {
    id: 'privacy-policy-template',
    category: 'template',
    title: 'Modelo de Política de Privacidade',
    description:
      'Estrutura com finalidades, cookies, direitos do titular, retenção e contato do DPO.',
    pages: 4,
    updatedAt: '2026-09-30T09:00:00.000Z',
    filename: 'modelo-politica-de-privacidade.pdf',
  },
  {
    id: 'consent-term-template',
    category: 'template',
    title: 'Modelo de Termo de Consentimento',
    description: 'Estrutura para registrar finalidade, evidência de consentimento e revogação.',
    pages: 3,
    updatedAt: '2026-09-30T09:00:00.000Z',
    filename: 'modelo-termo-de-consentimento.pdf',
  },
]

const initialDiagnostic = getMockDiagnosticSnapshot()

const generatedReports: GeneratedReportRecord[] = [
  {
    item: {
      id: 'report-initial-diagnostic',
      category: 'report',
      title: 'Diagnóstico inicial da organização',
      description: 'Visão consolidada do site institucional antes das análises de documentos.',
      pages: 4,
      updatedAt: initialDiagnostic.createdAt,
      filename: 'relatorio-diagnostico-inicial.pdf',
    },
    report: initialDiagnostic,
    documentName: 'Site institucional',
  },
]

let reportSequence = 1

function findDocument(documentId: SampleDocumentId): SampleDocument | undefined {
  return SAMPLE_DOCUMENTS.find((document) => document.id === documentId)
}

function emitProgress(
  listener: AnalysisProgressListener | undefined,
  progress: {
    stepIndex: number
    progress: number
    status: 'idle' | 'running' | 'done' | 'error'
  },
): void {
  listener?.(progress)
}

function buildReportDownloadContent(record: GeneratedReportRecord): DownloadContent {
  const { report, documentName, item } = record
  const level = getScoreLevel(report.score)
  const { bySeverity } = report.summary

  return {
    title: 'Relatório de diagnóstico — Demonstração',
    subtitle: `Documento analisado: ${documentName}`,
    meta: [
      `Score de conformidade: ${report.score} de 100 (${level.label})`,
      `Achados: ${report.summary.total} · Alta ${bySeverity.alta} · Média ${bySeverity.media} · Baixa ${bySeverity.baixa}`,
      `Gerado em ${formatDocumentDateTime(item.updatedAt)}`,
      'Organização fictícia: Sua Empresa Ltda.',
    ],
    sections: [
      {
        heading: 'Aviso de demonstração',
        paragraphs: [
          'Este relatório foi gerado por uma simulação local do ATUE. Os achados não resultam da leitura de um arquivo real e não representam uma avaliação jurídica.',
        ],
      },
      {
        heading: 'Resumo executivo',
        paragraphs: [
          `A análise simulada de "${documentName}" identificou ${report.summary.total} ${pluralize(
            report.summary.total,
            'achado',
            'achados',
          )} e atribuiu score ${report.score} de 100 ao cenário de demonstração.`,
          'As recomendações abaixo servem como roteiro de revisão e devem ser validadas pela equipe responsável antes de qualquer alteração.',
        ],
      },
      {
        heading: 'Achados identificados',
        bullets: report.issues.map(
          (issue) =>
            `${SEVERITY_CONTENT[issue.severity].label}: ${issue.name} (${issue.category}) — ${issue.description} Recomendação: ${issue.recommendation}`,
        ),
      },
      {
        heading: 'Próximos passos sugeridos',
        bullets: [
          'Priorizar os achados de severidade alta e registrar responsáveis e prazos.',
          'Revisar os documentos de origem com apoio da equipe jurídica ou de privacidade.',
          'Repetir a análise simulada após as correções para acompanhar a evolução.',
        ],
      },
    ],
    footer: REPORT_DEMO_FOOTER,
  }
}

export async function mockGetDocuments(): Promise<SampleDocument[]> {
  await delay(DOCUMENTS_DELAY_MS)

  return SAMPLE_DOCUMENTS.map((document) => ({ ...document }))
}

export async function mockAnalyzeDocument(
  documentId: SampleDocumentId,
  onProgress?: AnalysisProgressListener,
): Promise<DocumentAnalysisResult> {
  const document = findDocument(documentId)
  const profile = ANALYSIS_PROFILES[documentId]

  if (!document || !profile) {
    throw new Error('Documento de exemplo não encontrado.')
  }

  const totalSteps = ANALYSIS_STEPS.length

  for (let index = 0; index < totalSteps; index += 1) {
    emitProgress(onProgress, {
      stepIndex: index,
      progress: Math.round((index / totalSteps) * 100),
      status: 'running',
    })

    await delay(ANALYSIS_STEP_DELAY_MS)

    emitProgress(onProgress, {
      stepIndex: index,
      progress: Math.round(((index + 1) / totalSteps) * 100),
      status: index === totalSteps - 1 ? 'done' : 'running',
    })
  }

  const completedAt = new Date().toISOString()
  const sequence = reportSequence
  reportSequence += 1
  const report = buildDiagnosticReport({
    id: `diag-analysis-${sequence}`,
    score: profile.score,
    createdAt: completedAt,
    issues: profile.issues,
  })

  setMockDiagnostic(report)

  const item: DownloadItem = {
    id: `report-analysis-${sequence}`,
    category: 'report',
    title: `Análise — ${document.name}`,
    description: `Relatório simulado com ${report.summary.total} ${pluralize(
      report.summary.total,
      'achado',
      'achados',
    )} após a análise de ${document.name}.`,
    pages: 3 + Math.ceil(report.issues.length / 2),
    updatedAt: completedAt,
    filename: `relatorio-${slugifyFilename(document.name)}.pdf`,
  }

  generatedReports.unshift({
    item,
    report: cloneDiagnosticReport(report),
    documentName: document.name,
  })

  return {
    document: { ...document },
    report: cloneDiagnosticReport(report),
    completedAt,
  }
}

export async function mockGetDownloads(): Promise<DownloadItem[]> {
  await delay(DOWNLOADS_DELAY_MS)

  return [
    ...generatedReports.map((record) => ({ ...record.item })),
    ...TEMPLATE_ITEMS.map((item) => ({ ...item })),
  ]
}

export async function mockGetDownloadContent(itemId: string): Promise<DownloadContent> {
  await delay(DOWNLOAD_CONTENT_DELAY_MS)

  const reportRecord = generatedReports.find((record) => record.item.id === itemId)

  if (reportRecord) {
    return buildReportDownloadContent(reportRecord)
  }

  if (Object.prototype.hasOwnProperty.call(TEMPLATE_PDF_CONTENT, itemId)) {
    return TEMPLATE_PDF_CONTENT[itemId as TemplateId]
  }

  throw new Error('Conteúdo de download não encontrado.')
}
