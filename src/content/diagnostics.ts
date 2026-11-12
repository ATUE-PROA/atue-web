export const DIAGNOSTICS_CONTENT = {
  page: {
    title: 'Visão geral',
    description:
      'Aqui você vê o que precisa de atenção, o que já está organizado e qual é o próximo passo. Os resultados vêm de uma análise demonstrativa do site.',
    demoBadge: 'Demonstração',
    statusLabel: 'Situação atual',
    urlLabel: 'Site analisado',
    updatedLabel: 'Última análise em',
    cta: 'Gerar novo diagnóstico',
    ctaUpdate: 'Atualizar diagnóstico',
  },
  request: {
    title: 'Gerar novo diagnóstico',
    updateTitle: 'Atualizar diagnóstico',
    description:
      'Informe a URL do site da sua empresa para gerar o primeiro diagnóstico demonstrativo.',
    updateDescription:
      'Informe uma URL para substituir o diagnóstico atual por um novo resultado demonstrativo.',
    label: 'URL do site',
    placeholder: 'https://cliente.com.br',
    helpText:
      'Informe o endereço completo. Nesta demonstração, a análise é simulada e nenhum site é acessado.',
    submitLabel: 'Gerar diagnóstico',
    updateSubmitLabel: 'Atualizar diagnóstico',
    submittingLabel: 'Analisando site...',
    successTitle: 'Diagnóstico atualizado',
    successDescription:
      'O resultado no topo da página foi atualizado para a URL informada. Nenhum site foi acessado.',
    errorTitle: 'Não foi possível gerar o diagnóstico',
    errorDescription: 'Tente novamente. O resultado anterior foi mantido.',
  },
  score: {
    title: 'Índice de conformidade',
    description: 'Resume, de 0 a 100, como as dimensões avaliadas aparecem no site analisado.',
    caption: 'de 100',
    ariaLabel: 'Índice de conformidade',
    scaleNote: 'Quanto maior o número, mais dimensões aparecem organizadas na simulação.',
    disclaimer:
      'Este índice é um indicador demonstrativo. Não é certificação, laudo nem garantia de conformidade com a LGPD.',
    dimensionsTitle: 'O que a simulação considera',
    dimensions: [
      'Transparência: política de privacidade acessível e finalidades de tratamento.',
      'Cookies e rastreamento: escolha do visitante antes de cookies não essenciais.',
      'Retenção de dados: prazos e critérios de eliminação informados.',
    ],
  },
  priorities: {
    title: 'Comece por aqui',
    description:
      'As pendências que pedem atenção primeiro. Você não precisa resolver tudo hoje; comece pela primeira.',
    nextStepLabel: 'Próximo passo',
    nextSteps: {
      alta: 'Corrija esta pendência primeiro e registre a correção como evidência.',
      media: 'Planeje a correção e anexe a evidência quando concluir.',
      baixa: 'Ajuste quando as pendências principais estiverem resolvidas.',
    },
    action: 'Organizar evidências na Central de Documentos',
    emptyTitle: 'Nada urgente no momento',
    emptyDescription:
      'Nenhuma pendência foi registrada no diagnóstico atual. Mantenha as evidências atualizadas para sustentar esse resultado.',
  },
  findings: {
    title: 'Todas as pendências',
    description: 'Agrupadas por severidade, com explicação simulada e recomendação para cada item.',
    empty: 'Nenhuma pendência encontrada no diagnóstico atual.',
    summaryLabel: 'Resumo por severidade',
  },
  empty: {
    title: 'Nenhum diagnóstico ainda',
    description:
      'Informe a URL do site da empresa para ver um índice demonstrativo, as pendências priorizadas e o próximo passo. A análise é simulada, leva alguns segundos e não acessa o site.',
    cta: 'Gerar meu primeiro diagnóstico',
  },
  loadError: {
    title: 'Não foi possível carregar o diagnóstico',
    description: 'Tente novamente. Nenhum dado foi alterado.',
    retry: 'Tentar novamente',
  },
  degraded: {
    title: 'Resultado com resumo estático',
    description:
      'A análise não pôde ser concluída pelo serviço de IA. As pendências exibidas vêm do catálogo de referência e podem estar incompletas.',
  },
  footerNote: 'Dados de demonstração. O resultado não garante conformidade com a LGPD.',
} as const
