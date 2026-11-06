import { cloneDiagnosticReport } from '@/lib/diagnostics'
import { delay } from '@/lib/documents'
import { buildDiagnosticReport, setMockDiagnostic } from '@/mocks/diagnostics'
import type { IssueCategory } from '@/types/api'
import type { DemoScenario, DemoScenarioId } from '@/types/scenarios.types'

const SCENARIOS_DELAY_MS = 450

const ECOMMERCE_ISSUES: IssueCategory[] = [
  {
    id: 'ecommerce-https',
    name: 'Site sem HTTPS',
    category: 'Segurança',
    severity: 'alta',
    description: 'O domínio responde em HTTP e não redireciona para uma conexão segura.',
    explanation:
      'Sem HTTPS, dados de cadastro, senhas e informações de pagamento trafegam sem criptografia e podem ser interceptados.',
    recommendation:
      'Emita um certificado TLS, redirecione todo o tráfego para HTTPS e ative HSTS para impedir o retorno ao protocolo inseguro.',
  },
  {
    id: 'ecommerce-csp',
    name: 'Política de segurança de conteúdo ausente',
    category: 'Segurança',
    severity: 'alta',
    description: 'O site não envia o cabeçalho Content-Security-Policy.',
    explanation:
      'Sem uma política de conteúdo, scripts injetados por terceiros podem executar no navegador do visitante e capturar dados do formulário.',
    recommendation:
      'Defina uma Content-Security-Policy restritiva, liberando apenas os domínios realmente necessários e revisando a política a cada novo script.',
  },
  {
    id: 'ecommerce-cookies',
    name: 'Banner de cookies sem escolha granular',
    category: 'Cookies e rastreamento',
    severity: 'alta',
    description: 'Cookies de marketing são gravados antes de qualquer manifestação do visitante.',
    explanation:
      'A ausência de consentimento prévio impede o titular de recusar rastreamento e reduz a transparência sobre as finalidades.',
    recommendation:
      'Implemente um banner com categorias separadas, bloqueie cookies não essenciais até o aceite e permita alterar a escolha depois.',
  },
  {
    id: 'ecommerce-policy',
    name: 'Política de Privacidade incompleta',
    category: 'Transparência',
    severity: 'media',
    description: 'A política não informa prazos de retenção nem o canal do encarregado.',
    explanation:
      'Sem prazos e sem canal de contato, o titular não consegue exercer direitos nem entender por quanto tempo seus dados serão mantidos.',
    recommendation:
      'Inclua prazos por categoria de dado, o contato do DPO e o processo para atender solicitações de titulares.',
  },
]

const CLINIC_ISSUES: IssueCategory[] = [
  {
    id: 'clinic-sensitive-retention',
    name: 'Retenção de dados de saúde sem critério',
    category: 'Dados sensíveis',
    severity: 'alta',
    description: 'Prontuários e agendamentos são mantidos sem prazo definido na política.',
    explanation:
      'Dados de saúde exigem justificativa específica e controle rigoroso de acesso e retenção. A ausência de prazo amplia o risco de uso indevido.',
    recommendation:
      'Defina prazos por tipo de registro, restrinja o acesso por função e registre a base legal aplicada a cada tratamento.',
  },
  {
    id: 'clinic-dpo',
    name: 'Encarregado (DPO) não indicado',
    category: 'Governança',
    severity: 'alta',
    description: 'O site não informa quem é o encarregado pelo tratamento de dados.',
    explanation:
      'Sem um canal claro para o encarregado, titulares não conseguem solicitar acesso, correção ou eliminação de dados de saúde.',
    recommendation:
      'Nomeie o encarregado, publique o canal de contato e defina prazo interno de resposta para solicitações de titulares.',
  },
  {
    id: 'clinic-consent',
    name: 'Formulário de agendamento sem consentimento',
    category: 'Bases legais',
    severity: 'media',
    description: 'O formulário coleta dados pessoais sem informar a finalidade.',
    explanation:
      'A coleta sem aviso de finalidade e sem opção de consentimento dificulta a comprovação de que o titular foi informado.',
    recommendation:
      'Explique a finalidade ao lado do formulário, registre a versão do aviso aceita e permita revogar o consentimento.',
  },
  {
    id: 'clinic-vendors',
    name: 'Compartilhamento com fornecedores não declarado',
    category: 'Terceiros',
    severity: 'baixa',
    description: 'A política não lista os sistemas usados para prontuário e agendamento.',
    explanation:
      'A falta de transparência sobre operadores dificulta a revisão de contratos e de transferências internacionais.',
    recommendation:
      'Liste os fornecedores por finalidade, mantenha contratos de tratamento de dados e indique países de armazenamento.',
  },
]

const AGENCY_ISSUES: IssueCategory[] = [
  {
    id: 'agency-cookie-details',
    name: 'Categorias de cookies sem detalhamento',
    category: 'Cookies e rastreamento',
    severity: 'media',
    description: 'O banner existe, mas não descreve duração e fornecedores.',
    explanation:
      'Sem detalhes por categoria, o visitante não consegue avaliar o impacto dos cookies de análise e publicidade.',
    recommendation:
      'Publique uma tabela com categoria, finalidade, duração e fornecedor, além do caminho para revisar a escolha.',
  },
  {
    id: 'agency-retention',
    name: 'Prazos de retenção genéricos',
    category: 'Retenção de dados',
    severity: 'media',
    description: 'A política informa apenas que os dados são mantidos pelo tempo necessário.',
    explanation:
      'Critérios genéricos não demonstram controle e dificultam a eliminação oportuna de dados de campanhas encerradas.',
    recommendation:
      'Defina prazos objetivos por tipo de dado e documente o critério de eliminação ou anonimização.',
  },
  {
    id: 'agency-vendor-contracts',
    name: 'Contratos de fornecedores sem cláusula de dados',
    category: 'Contratos e terceiros',
    severity: 'baixa',
    description: 'Modelos de contrato não preveem obrigações de segurança e subcontratação.',
    explanation:
      'Sem cláusulas de tratamento de dados, a agência mantém risco mesmo quando o fornecedor é quem opera os dados do cliente.',
    recommendation:
      'Inclua anexo de tratamento de dados com instruções, medidas de segurança, subcontratados e devolução ao final do contrato.',
  },
]

function buildScenarioReport(
  id: string,
  score: number,
  createdAt: string,
  issues: IssueCategory[],
): DemoScenario['report'] {
  return buildDiagnosticReport({ id, score, createdAt, issues })
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'ecommerce',
    companyName: 'Loja Verde Naturals',
    sector: 'E-commerce',
    description:
      'Loja de produtos naturais com checkout próprio, rastreadores de marketing e política desatualizada.',
    website: 'https://lojaverdenaturals.com.br',
    report: buildScenarioReport('demo-ecommerce', 24, '2026-11-04T14:20:00.000Z', ECOMMERCE_ISSUES),
  },
  {
    id: 'clinica',
    companyName: 'Clínica Bem Estar',
    sector: 'Clínica médica',
    description:
      'Clínica com agendamento online e prontuário eletrônico, sem encarregado indicado publicamente.',
    website: 'https://clinicabemestar.com.br',
    report: buildScenarioReport('demo-clinica', 41, '2026-11-04T15:10:00.000Z', CLINIC_ISSUES),
  },
  {
    id: 'agencia',
    companyName: 'Agência Órbita',
    sector: 'Agência B2B',
    description:
      'Agência que trata dados de leads de clientes e mantém contratos de fornecedores sem cláusulas específicas.',
    website: 'https://agenciaorbita.com.br',
    report: buildScenarioReport('demo-agencia', 68, '2026-11-04T16:05:00.000Z', AGENCY_ISSUES),
  },
]

export async function mockGetDemoScenarios(): Promise<DemoScenario[]> {
  await delay(SCENARIOS_DELAY_MS)

  return DEMO_SCENARIOS.map((scenario) => ({
    ...scenario,
    report: cloneDiagnosticReport(scenario.report),
  }))
}

export function mockApplyDemoScenario(scenarioId: DemoScenarioId): DemoScenario['report'] {
  const scenario = DEMO_SCENARIOS.find((item) => item.id === scenarioId)

  if (!scenario) {
    throw new Error('Cenário de demonstração não encontrado.')
  }

  const report = cloneDiagnosticReport(scenario.report)
  setMockDiagnostic(report)

  return cloneDiagnosticReport(report)
}
