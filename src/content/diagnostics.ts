export const DIAGNOSTICS_CONTENT = {
  request: {
    title: 'Analisar um site',
    description: 'Informe a URL de um site para gerar um novo diagnóstico de conformidade.',
    label: 'URL do site',
    placeholder: 'https://cliente.com.br',
    helpText:
      'Informe o endereço completo. Nesta demonstração, a análise é simulada e nenhum site é acessado.',
    submitLabel: 'Gerar diagnóstico',
    submittingLabel: 'Analisando site...',
    successTitle: 'Diagnóstico atualizado',
    successDescription: 'O resultado abaixo foi gerado para a URL informada.',
    errorTitle: 'Não foi possível gerar o diagnóstico',
    errorDescription: 'Tente novamente. O resultado anterior foi mantido.',
  },
  score: {
    title: 'Score de Conformidade',
    caption: 'de 100',
    ariaLabel: 'Score de conformidade',
  },
  degraded: {
    title: 'Resultado com resumo estático',
    description:
      'A análise não pôde ser concluída pelo serviço de IA. Os achados exibidos vêm do catálogo de referência e podem estar incompletos.',
  },
  empty: {
    title: 'Nenhum diagnóstico disponível',
    description: 'Gere o primeiro diagnóstico informando a URL de um site no formulário acima.',
  },
  findings: {
    title: 'Achados e pendências',
    description: 'Explicações e recomendações da análise.',
    empty: 'Nenhuma pendência encontrada no diagnóstico atual.',
    groupLabel: 'Achados de severidade',
  },
  footerNote: 'Dados de demonstração. O resultado não garante conformidade com a LGPD.',
} as const
