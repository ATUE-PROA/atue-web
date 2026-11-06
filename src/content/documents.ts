import type { DownloadContent, TemplateId } from '@/types/documents.types'

export const DOCUMENTS_CONTENT = {
  eyebrow: 'Diagnóstico, análise e downloads',
  title: 'Central de Documentos',
  description:
    'Escolha um documento de exemplo, acompanhe uma análise simulada e baixe relatórios ou modelos em PDF gerados localmente.',
  loading: 'Carregando documentos...',
  loadErrorTitle: 'Não foi possível carregar a Central de Documentos',
  loadErrorDescription: 'Tente novamente. Nenhum arquivo foi lido ou alterado.',
  retryLabel: 'Tentar novamente',
  catalog: {
    title: 'Documentos disponíveis',
    description:
      'Documentos fictícios desta demonstração. Nenhum arquivo do seu dispositivo é acessado.',
    selectedLabel: 'Selecionado',
    analyzedLabel: 'Analisado nesta sessão',
    empty: 'Nenhum documento de exemplo disponível.',
  },
  analysis: {
    title: 'Análise simulada',
    description:
      'Escolha um documento de exemplo para simular a leitura, a comparação com requisitos da LGPD e a geração de achados.',
    selectLabel: 'Documento de exemplo',
    selectHelp: 'Lista fictícia. O seletor de arquivos do sistema não é aberto.',
    fileNameLabel: 'Arquivo simulado',
    actionLabel: 'Iniciar análise simulada',
    actionBusyLabel: 'Analisando documento...',
    demoNoticeTitle: 'Nenhum arquivo real é usado',
    demoNoticeDescription:
      'O ATUE não lê, envia nem armazena arquivos nesta demonstração. A análise e a IA são simulações locais.',
    progressTitle: 'Processando documento',
    progressDescription: 'As etapas abaixo são simuladas e servem apenas para demonstrar o fluxo.',
    progressAriaLabel: 'Progresso da análise simulada',
    progressStatus: 'Etapa {current} de {total}: {label}',
    progressDone: 'Análise simulada concluída.',
    errorTitle: 'Não foi possível concluir a análise simulada',
    errorDescription: 'Tente novamente. Nenhum arquivo real foi lido ou alterado.',
  },
  result: {
    title: 'Resultado da análise simulada',
    description: 'Achados, explicações e recomendações gerados por uma simulação local.',
    completedAtLabel: 'Concluída em',
    documentLabel: 'Documento',
    scoreLabel: 'Score de conformidade',
    findingsTitle: 'Achados identificados',
    findingsDescription: 'Abra cada achado para ver a explicação simulada e a recomendação.',
    emptyFindings: 'Nenhum achado foi identificado neste documento de exemplo.',
    summaryLabel: 'Resumo por severidade',
    downloadLink: 'Ir para a Central de Downloads',
    demoNoticeTitle: 'Resultado de demonstração',
    demoNoticeDescription:
      'Os achados, explicações e recomendações são fictícios. Eles não representam uma avaliação jurídica nem garantem conformidade com a LGPD.',
  },
  downloads: {
    title: 'Central de Downloads',
    description:
      'Relatórios e modelos em PDF gerados no navegador, sempre com aviso de demonstração.',
    reportsTitle: 'Relatórios gerados',
    reportsDescription: 'Cada análise simulada adiciona um relatório a esta lista.',
    templatesTitle: 'Modelos de documentos',
    templatesDescription:
      'Estruturas de referência para a equipe preencher. Não são documentos aprovados.',
    emptyReports:
      'Nenhum relatório foi gerado ainda. Conclua uma análise simulada para criar o primeiro.',
    emptyTemplates: 'Nenhum modelo disponível.',
    downloadLabel: 'Baixar PDF',
    downloadingLabel: 'Gerando PDF...',
    downloadAriaLabel: 'Baixar PDF de {title}',
    generatedAtLabel: 'Gerado em',
    updatedAtLabel: 'Atualizado em',
    preparingTitle: 'Gerando PDF de demonstração',
    preparingDescription: 'O arquivo é criado localmente no navegador e não é armazenado.',
    successTitle: 'PDF de demonstração gerado',
    successDescription: 'O download foi criado localmente. Nenhum dado foi enviado a um servidor.',
    errorTitle: 'Não foi possível gerar o PDF',
    errorDescription: 'Tente novamente. Nenhum dado foi alterado.',
    demoNotice: 'Os PDFs contêm marca de demonstração e não têm validade legal.',
  },
} as const

export const ANALYSIS_STEPS = [
  {
    id: 'reading',
    label: 'Lendo documento',
    description: 'Carregando o exemplo e identificando o tipo de arquivo.',
  },
  {
    id: 'extracting',
    label: 'Extraindo cláusulas',
    description: 'Separando seções, datas e referências ao tratamento de dados.',
  },
  {
    id: 'comparing',
    label: 'Comparando com a LGPD',
    description: 'Verificando a presença de controles esperados para o documento.',
  },
  {
    id: 'findings',
    label: 'Identificando achados',
    description: 'Agrupando lacunas por categoria e severidade.',
  },
  {
    id: 'report',
    label: 'Gerando relatório',
    description: 'Montando o resultado e o PDF de demonstração.',
  },
] as const

export const SEVERITY_CONTENT = {
  alta: {
    label: 'Alta',
    description: 'Pode comprometer obrigações centrais da LGPD e deve ser tratada primeiro.',
  },
  media: {
    label: 'Média',
    description: 'Exige correção planejada e pode gerar dúvidas em uma revisão.',
  },
  baixa: {
    label: 'Baixa',
    description: 'Ajuste de clareza ou de documentação, com impacto limitado.',
  },
} as const

export const DOWNLOAD_CATEGORY_CONTENT = {
  report: {
    title: 'Relatórios gerados',
    description: 'Cada análise simulada adiciona um relatório a esta lista.',
  },
  template: {
    title: 'Modelos de documentos',
    description: 'Estruturas de referência para a equipe preencher. Não são documentos aprovados.',
  },
} as const

export const REPORT_DEMO_FOOTER = 'Documento de demonstração — não possui validade legal.'

export const TEMPLATE_PDF_CONTENT: Record<TemplateId, DownloadContent> = {
  'privacy-policy-template': {
    title: 'Modelo de Política de Privacidade',
    subtitle: 'Estrutura de referência para preenchimento pela sua organização.',
    meta: ['Versão de demonstração · Setembro de 2026', 'Documento fictício, sem validade legal.'],
    sections: [
      {
        heading: '1. Quem somos e como falar conosco',
        paragraphs: [
          '[PREENCHER] Razão social, CNPJ e endereço da organização.',
          '[PREENCHER] Nome e canal de contato do encarregado de proteção de dados (DPO).',
        ],
      },
      {
        heading: '2. Quais dados pessoais coletamos',
        bullets: [
          'Dados de identificação e contato fornecidos em formulários.',
          'Dados de navegação e cookies, conforme as ferramentas utilizadas no site.',
          'Dados necessários à execução dos serviços contratados.',
        ],
      },
      {
        heading: '3. Para que usamos os dados',
        paragraphs: [
          'Descreva cada finalidade de tratamento e a base legal correspondente. Evite finalidades genéricas como "melhorar a experiência" sem explicar como.',
          '[PREENCHER] Finalidade, base legal e categoria de dados para cada operação.',
        ],
      },
      {
        heading: '4. Compartilhamento e cookies',
        paragraphs: [
          'Liste os fornecedores que recebem dados, a finalidade do compartilhamento e o mecanismo contratual adotado.',
          'Descreva as categorias de cookies, a forma de consentimento e como o titular pode alterar a escolha.',
        ],
      },
      {
        heading: '5. Direitos do titular',
        bullets: [
          'Confirmação da existência de tratamento e acesso aos dados.',
          'Correção, anonimização, bloqueio ou eliminação de dados desnecessários.',
          'Informação sobre compartilhamentos e possibilidade de revogar o consentimento.',
          '[PREENCHER] Canal e prazo para responder às solicitações.',
        ],
      },
      {
        heading: '6. Retenção e segurança',
        paragraphs: [
          '[PREENCHER] Prazos de retenção por categoria de dado e critérios de eliminação.',
          'Descreva os controles de segurança adotados e o processo de resposta a incidentes.',
        ],
      },
    ],
    footer: 'Documento de demonstração — modelo sem validade legal.',
  },
  'consent-term-template': {
    title: 'Modelo de Termo de Consentimento',
    subtitle: 'Estrutura de referência para coleta de consentimento informado.',
    meta: ['Versão de demonstração · Setembro de 2026', 'Documento fictício, sem validade legal.'],
    sections: [
      {
        heading: '1. Finalidade do consentimento',
        paragraphs: [
          '[PREENCHER] Descreva de forma específica para que os dados serão usados. O consentimento deve ser vinculado a uma finalidade clara, sem termos vagos.',
        ],
      },
      {
        heading: '2. Dados tratados',
        bullets: [
          '[PREENCHER] Categorias de dados incluídas no consentimento.',
          '[PREENCHER] Origem dos dados e período de tratamento.',
          'Informe se há dados sensíveis e, se houver, a finalidade específica.',
        ],
      },
      {
        heading: '3. Como o consentimento é registrado',
        paragraphs: [
          'Descreva o canal de coleta, a data e hora do registro, a versão do texto apresentado e os mecanismos técnicos que comprovam a manifestação.',
          '[PREENCHER] Sistema ou processo usado como evidência do consentimento.',
        ],
      },
      {
        heading: '4. Revogação e direitos do titular',
        paragraphs: [
          'Explique que o consentimento pode ser revogado a qualquer momento, sem prejuízo ao titular, e informe o canal disponível para isso.',
          '[PREENCHER] Canal de revogação, prazo de resposta e consequências da revogação.',
        ],
      },
      {
        heading: '5. Contato do controlador e do DPO',
        paragraphs: [
          '[PREENCHER] Nome da organização, e-mail de privacidade e contato do encarregado.',
        ],
      },
    ],
    footer: 'Documento de demonstração — modelo sem validade legal.',
  },
}
