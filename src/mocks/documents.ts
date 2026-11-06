import {
  ANALYSIS_STEPS,
  DOWNLOAD_FORMATS,
  REPORT_DEMO_FOOTER,
  SEVERITY_CONTENT,
  TEMPLATE_PDF_CONTENT,
} from '@/content/documents'
import { formatCnpj } from '@/lib/cnpj'
import { cloneDiagnosticReport, getScoreLevel } from '@/lib/diagnostics'
import { delay, formatDocumentDateTime, pluralize, slugifyFilename } from '@/lib/documents'
import {
  buildDiagnosticReport,
  getMockDiagnosticSnapshot,
  setMockDiagnostic,
} from '@/mocks/diagnostics'
import { getMockInstitutionalProfile } from '@/mocks/organization'
import type { DiagnosticReport, IssueCategory } from '@/types/api'
import type {
  AnalysisProgressListener,
  AnalyzedDocument,
  DocumentAnalysisTarget,
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

const LOCAL_PROFILE_KEYWORDS: Record<SampleDocumentId, readonly string[]> = {
  'privacy-policy': ['politica', 'privacidade', 'privacy', 'lgpd'],
  'consent-term': ['consentimento', 'consent', 'termo', 'marketing', 'newsletter'],
  'incident-log': ['incidente', 'incident', 'resposta', 'seguranca'],
  'vendor-contract': ['contrato', 'fornecedor', 'vendor', 'crm', 'operador'],
}

const PROFILE_IDS: readonly SampleDocumentId[] = [
  'privacy-policy',
  'consent-term',
  'incident-log',
  'vendor-contract',
]

interface GeneratedReportRecord {
  item: DownloadItem
  report: DiagnosticReport
  documentName: string
  documentSource: AnalyzedDocument['source']
}

const TEMPLATE_ITEMS: DownloadItem[] = [
  {
    id: 'privacy-policy-template',
    category: 'template',
    title: 'Modelo de Política de Privacidade',
    description:
      'Estrutura completa com escopo, bases legais, cookies, retenção, direitos e resposta a incidentes.',
    pages: 6,
    updatedAt: '2026-09-30T09:00:00.000Z',
    baseFilename: 'modelo-politica-de-privacidade',
    formats: DOWNLOAD_FORMATS,
  },
  {
    id: 'consent-term-template',
    category: 'template',
    title: 'Modelo de Termo de Consentimento',
    description:
      'Estrutura para registrar finalidade, evidência de consentimento, revogação e declaração do titular.',
    pages: 4,
    updatedAt: '2026-09-30T09:00:00.000Z',
    baseFilename: 'modelo-termo-de-consentimento',
    formats: DOWNLOAD_FORMATS,
  },
  {
    id: 'incident-response-template',
    category: 'template',
    title: 'Modelo de Plano de Resposta a Incidentes',
    description:
      'Fluxo com papéis, triagem, contenção, comunicação à ANPD, evidências e lições aprendidas.',
    pages: 5,
    updatedAt: '2026-09-30T09:00:00.000Z',
    baseFilename: 'modelo-plano-de-resposta-a-incidentes',
    formats: DOWNLOAD_FORMATS,
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
      baseFilename: 'relatorio-diagnostico-inicial',
      formats: DOWNLOAD_FORMATS,
    },
    report: initialDiagnostic,
    documentName: 'Site institucional',
    documentSource: 'sample',
  },
]

let reportSequence = 1

function findDocument(documentId: SampleDocumentId): SampleDocument | undefined {
  return SAMPLE_DOCUMENTS.find((document) => document.id === documentId)
}

function hashText(value: string): number {
  let hash = 0

  for (const character of value) {
    const code = character.codePointAt(0) ?? 0
    hash = (hash * 31 + code) >>> 0
  }

  return hash
}

function getLocalProfileId(name: string, sizeLabel: string): SampleDocumentId {
  const normalizedName = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

  for (const profileId of PROFILE_IDS) {
    if (LOCAL_PROFILE_KEYWORDS[profileId].some((keyword) => normalizedName.includes(keyword))) {
      return profileId
    }
  }

  return (
    PROFILE_IDS[hashText(`${normalizedName}-${sizeLabel}`) % PROFILE_IDS.length] ?? 'privacy-policy'
  )
}

function buildAnalyzedDocument(target: DocumentAnalysisTarget): AnalyzedDocument {
  if (target.source === 'local') {
    return {
      id: `local-${slugifyFilename(target.document.name)}`,
      name: target.document.name,
      kind: target.document.kind,
      sizeLabel: target.document.sizeLabel,
      updatedAt: new Date().toISOString(),
      description: `Arquivo ${target.document.kind} anexado nesta sessão de demonstração. Nenhum conteúdo foi lido ou enviado.`,
      source: 'local',
    }
  }

  const document = findDocument(target.documentId)

  if (!document) {
    throw new Error('Documento de exemplo não encontrado.')
  }

  return { ...document, source: 'sample' }
}

function findProfile(target: DocumentAnalysisTarget): AnalysisProfile {
  if (target.source === 'sample') {
    return ANALYSIS_PROFILES[target.documentId]
  }

  return ANALYSIS_PROFILES[getLocalProfileId(target.document.name, target.document.sizeLabel)]
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
  const { report, documentName, documentSource, item } = record
  const level = getScoreLevel(report.score)
  const { bySeverity } = report.summary
  const sourceLabel =
    documentSource === 'local'
      ? 'Arquivo anexado neste dispositivo'
      : 'Documento de exemplo da demonstração'
  const profile = getMockInstitutionalProfile()
  const organizationLabel = profile
    ? `${profile.companyName} — CNPJ ${formatCnpj(profile.cnpj)}`
    : 'Sua Empresa Ltda. (organização fictícia)'
  const institutionalBullets = profile
    ? [
        `Organização informada: ${profile.companyName}.`,
        `CNPJ informado: ${formatCnpj(profile.cnpj)}.`,
        `Encarregado (DPO): ${profile.dpoName} — ${profile.dpoEmail}.`,
        `Finalidades declaradas: ${profile.purposes}.`,
      ]
    : []

  return {
    title: 'Relatório de diagnóstico de conformidade',
    subtitle: `Análise simulada de ${documentName}`,
    documentType: 'Relatório de diagnóstico',
    reference: `ATUE-DEMO-${item.id.replace(/\D/g, '').padStart(3, '0')}`,
    organization: organizationLabel,
    generatedAt: item.updatedAt,
    metrics: [
      {
        label: 'Score de conformidade',
        value: `${report.score}/100`,
        hint: level.label,
      },
      {
        label: 'Achados identificados',
        value: String(report.summary.total),
        hint: `Alta ${bySeverity.alta} · Média ${bySeverity.media} · Baixa ${bySeverity.baixa}`,
      },
      {
        label: 'Documento analisado',
        value: documentName,
        hint: sourceLabel,
      },
      {
        label: 'Natureza do resultado',
        value: 'Simulação',
        hint: 'Sem validade legal',
      },
    ],
    sections: [
      {
        heading: '1. Aviso de demonstração',
        paragraphs: [
          'Este relatório foi produzido por uma simulação local do ATUE. O conteúdo do documento não foi enviado a um servidor, processado por um modelo de IA real ou submetido a revisão jurídica.',
          'Os achados servem como roteiro de discussão e não representam uma avaliação oficial de conformidade com a LGPD. Uma decisão de negócio deve ser validada pela equipe responsável.',
        ],
      },
      {
        heading: '2. Sumário executivo',
        paragraphs: [
          `A leitura simulada de "${documentName}" considerou ${report.summary.total} ${pluralize(
            report.summary.total,
            'achado',
            'achados',
          )}, com score de conformidade ${report.score} de 100 (${level.label}).`,
          `A distribuição por severidade ficou em ${bySeverity.alta} de severidade alta, ${bySeverity.media} média e ${bySeverity.baixa} baixa. Achados de severidade alta devem ser tratados primeiro, porque podem comprometer obrigações centrais de privacidade e segurança.`,
          'O resultado é indicativo: ele organiza a conversa, mas não substitui a revisão dos documentos originais, dos contratos vigentes e dos registros operacionais.',
        ],
      },
      {
        heading: '3. Escopo e método',
        paragraphs: [
          'A simulação seguiu uma sequência determinística de preparação do documento, mapeamento de seções, comparação com controles esperados e consolidação dos achados. Apenas metadados do arquivo anexado foram usados nesta demonstração.',
        ],
        bullets: [
          'Documento avaliado: ' + documentName + '.',
          'Origem considerada: ' + sourceLabel + '.',
          'Referência do relatório: ' + `ATUE-DEMO-${item.id.replace(/\D/g, '').padStart(3, '0')}.`,
          'Limitação: nenhum conteúdo de arquivo foi lido, armazenado ou transmitido.',
        ],
      },
      {
        heading: '4. Leitura por severidade',
        bullets: [
          `Alta (${bySeverity.alta}): ${SEVERITY_CONTENT.alta.description}`,
          `Média (${bySeverity.media}): ${SEVERITY_CONTENT.media.description}`,
          `Baixa (${bySeverity.baixa}): ${SEVERITY_CONTENT.baixa.description}`,
        ],
      },
      {
        heading: '5. Achados e recomendações priorizadas',
        bullets: report.issues.map(
          (issue) =>
            `${SEVERITY_CONTENT[issue.severity].label} · ${issue.name} (${issue.category}) — ${issue.description} Recomendação: ${issue.recommendation}`,
        ),
      },
      {
        heading: '6. Plano de ação sugerido',
        bullets: [
          'Primeiros 30 dias: tratar os achados de severidade alta, nomear responsáveis e registrar prazos de conclusão.',
          'Próximos 60 dias: revisar os documentos de origem, anexar evidências e atualizar políticas e contratos afetados.',
          'Próximos 90 dias: repetir a análise simulada, comparar a evolução do score e apresentar o resultado à liderança.',
        ],
      },
      {
        heading: '7. Evidências e acompanhamento',
        paragraphs: [
          'Mantenha uma pasta controlada com a versão revisada de cada documento, o registro de aprovação e as evidências das medidas adotadas. Evite armazenar dados pessoais desnecessários ou credenciais junto aos documentos.',
        ],
        bullets: [
          'Versão do documento, data da revisão e responsável pela aprovação.',
          'Achados encerrados e evidência objetiva de cada correção.',
          'Data da próxima revisão e histórico de decisões.',
        ],
      },
      {
        heading: '8. Controle do documento',
        bullets: [
          `Organização: ${profile ? profile.companyName : 'Sua Empresa Ltda. (fictícia)'}.`,
          `Gerado em: ${formatDocumentDateTime(item.updatedAt)}.`,
          ...institutionalBullets,
          'Classificação: documento de demonstração, sem validade legal.',
          'Distribuição: apenas para fins de apresentação do produto.',
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
  target: DocumentAnalysisTarget,
  onProgress?: AnalysisProgressListener,
): Promise<DocumentAnalysisResult> {
  const document = buildAnalyzedDocument(target)
  const profile = findProfile(target)

  if (!profile) {
    throw new Error('Perfil de análise não encontrado.')
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
    pages: 6 + Math.ceil(report.issues.length / 2),
    updatedAt: completedAt,
    baseFilename: `relatorio-${slugifyFilename(document.name.replace(/\.[^.]+$/, ''))}`,
    formats: DOWNLOAD_FORMATS,
  }

  generatedReports.unshift({
    item,
    report: cloneDiagnosticReport(report),
    documentName: document.name,
    documentSource: document.source,
  })

  return {
    document,
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
