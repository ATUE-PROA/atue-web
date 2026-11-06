export const SCENARIOS_CONTENT = {
  sectionTitle: 'Cenários de demonstração',
  sectionDescription:
    'Escolha uma empresa fictícia para carregar um diagnóstico pronto. Nenhum site real é acessado.',
  applyLabel: 'Carregar cenário',
  appliedLabel: 'Cenário carregado',
  loading: 'Carregando cenários...',
  errorTitle: 'Não foi possível carregar os cenários',
  errorDescription: 'Tente novamente. Nenhum dado foi alterado.',
  retryLabel: 'Tentar novamente',
  demoNotice:
    'Dados fictícios criados para a demonstração do produto. Não representam empresas reais.',
} as const

export const SCAN_TERMINAL_CONTENT = {
  title: 'Registro simulado da varredura',
  description:
    'As linhas abaixo são geradas localmente para ilustrar o fluxo. Nenhum site é acessado e nenhuma IA real é executada.',
  runningLabel: 'Varredura simulada em andamento',
  doneLabel: 'Varredura simulada concluída',
  doneLine: 'Simulação concluída. Resultado montado a partir do catálogo de demonstração.',
  lines: [
    'Simulação: validando a URL informada',
    'Simulação: verificando redirecionamentos e HTTPS',
    'Simulação: inspecionando cabeçalhos de segurança',
    'Simulação: mapeando cookies e rastreadores',
    'Simulação: procurando política de privacidade e DPO',
    'Simulação: comparando com o catálogo de achados',
    'Simulação: calculando o score de conformidade',
  ],
} as const
