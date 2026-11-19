export const DIAGNOSTICS_CONTENT = {
  page: {
    title: 'Painel',
    demoBadge: 'Demonstração',
    cta: 'Gerar análise',
    ctaUpdate: 'Atualizar análise',
  },
  index: {
    title: 'Índice de conformidade',
    scaleNote: 'de 100',
    updatedLabel: 'Última análise em',
    disclaimer:
      'Indicador demonstrativo. Não é certificação, laudo nem garantia de conformidade com a LGPD.',
    dimensionsLabel: 'O que é avaliado',
    dimensions: [
      'Transparência: política de privacidade acessível e finalidades de tratamento.',
      'Cookies e rastreamento: escolha do visitante antes de cookies não essenciais.',
      'Retenção de dados: prazos e critérios de eliminação informados.',
    ],
  },
  pending: {
    title: 'Pendências',
    description: 'Ordenadas por severidade.',
    severityTitle: 'Pendências por severidade',
    columns: {
      severity: 'Severidade',
      item: 'Pendência',
      recommendation: 'O que fazer',
    },
    empty: 'Nenhuma pendência no diagnóstico atual.',
    viewAll: 'Ver todas na Central de Documentos',
  },
  nextStep: {
    title: 'Próximo passo',
    pendingLabel: 'Pendência prioritária',
    action: 'Organizar evidência',
    viewAll: 'Ver todas as pendências',
    emptyTitle: 'Nada urgente agora',
    emptyDescription:
      'Nenhuma pendência registrada. Mantenha as evidências atualizadas para sustentar esse resultado.',
  },
  request: {
    label: 'Nova análise',
    placeholder: 'https://cliente.com.br',
    submitLabel: 'Analisar',
    updateSubmitLabel: 'Atualizar',
    submittingLabel: 'Analisando…',
    helpText: 'Análise simulada. Nenhum site é acessado e o resultado anterior é substituído.',
    successTitle: 'Análise atualizada',
    successDescription: 'O resultado no topo da página foi atualizado para a URL informada.',
    errorTitle: 'Não foi possível analisar',
    errorDescription: 'Tente novamente. O resultado anterior foi mantido.',
  },
  empty: {
    title: 'Nenhuma análise ainda',
    description:
      'Informe o site da empresa para ver o índice, as pendências priorizadas e o próximo passo.',
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
