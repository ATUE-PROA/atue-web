export const PLANS_CONTENT = {
  hero: {
    eyebrow: 'Escolha o plano certo',
    title: 'Escolha como quer organizar sua conformidade.',
    description:
      'Compare os planos abaixo e escolha o plano que melhor acompanha o tamanho e a maturidade da sua empresa.',
  },
  comparison: {
    title: 'Compare os planos',
    description:
      'Os recursos abaixo são ilustrativos e servem para demonstrar como os planos podem evoluir. Nenhum valor, recurso ou condição comercial é real.',
    demoLabel: 'Estamos em demonstração',
  },
  plans: {
    title: 'Escolha o plano',
    description:
      'Cada plano abaixo é ilustrativo e serve apenas para demonstrar os cartões de planos nesta página. Nenhum valor, recurso ou condição comercial é real.',
  },
  help: {
    title: 'Precisa de ajuda para escolher?',
    description:
      'Se você não tem certeza sobre o melhor plano para a sua empresa, o nosso time pode ajudar a encontrar o mais adequado para você.',
  },
  footer: '© 2026 ATUE. Todos os direitos reservados.',
} as const

export const PLAN_BENEFITS = [
  {
    id: 'organization',
    icon: 'layers',
    title: 'Organização imediata',
    description: 'Políticas, evidências, pendências e atualizações em um só lugar.',
  },
  {
    id: 'control',
    icon: 'shield',
    title: 'Mais controle, menos surpresa',
    description: 'Demonstre maturidade e transparência para clientes e parceiros.',
  },
  {
    id: 'growth',
    icon: 'growth',
    title: 'Apoio para crescer',
    description: 'Evolua o plano conforme sua operação e seus riscos aumentam.',
  },
] as const

export const PLAN_COMPARISON = [
  {
    id: 'domains',
    feature: 'Domínios monitorados',
    inicio: '1 domínio',
    cresce: 'Até 5 domínios',
    escala: 'Ilimitados',
  },
  {
    id: 'pending',
    feature: 'Acompanhamento de pendências',
    inicio: 'Checklist básico',
    cresce: 'Fluxo com prioridades',
    escala: 'Fluxo avançado',
  },
  {
    id: 'reports',
    feature: 'Relatórios e compartilhamento',
    inicio: 'Relatório mensal',
    cresce: 'Relatórios detalhados',
    escala: 'Relatórios e auditoria',
  },
  {
    id: 'support',
    feature: 'Suporte',
    inicio: 'E-mail',
    cresce: 'E-mail prioritário',
    escala: 'Orientação e suporte',
  },
  {
    id: 'integrations',
    feature: 'Integrações',
    inicio: '2 integrações',
    cresce: '5 integrações',
    escala: 'Ilimitadas',
  },
] as const

export const PLANS = [
  {
    id: 'start',
    name: 'Início',
    badge: 'Básico',
    recommended: false,
    description:
      'Para pequenas empresas que precisam organizar as conformidades e acompanhar as evidências em um só lugar.',
    price: 'R$ 49',
    priceSuffix: '/mês',
    inherits: null,
    features: [
      'Centraliza evidências e documentos',
      'Acompanha pendências com checklist',
      'Relatórios essenciais do plano',
    ],
    ctaLabel: 'Escolher Início',
    href: '/register',
    note: 'Para empresas que estão começando a organizar as evidências.',
  },
  {
    id: 'growth',
    name: 'Cresce',
    badge: 'Recomendado',
    recommended: true,
    description:
      'Para empresas que já possuem um processo de gestão de conformidade e precisam de mais controle e prioridades.',
    price: 'R$ 149',
    priceSuffix: '/mês',
    inherits: 'Tudo do Início, mais:',
    features: [
      'Acompanhamento de pendências priorizado',
      'Relatórios detalhados para auditoria e análise',
      'Relatórios de evidências e atualizações',
      'Suporte para o dia a dia',
      'Integrações com ferramentas',
    ],
    ctaLabel: 'Escolher Cresce',
    href: '/form',
    note: 'Recomendado para a maioria das empresas.',
  },
  {
    id: 'scale',
    name: 'Escala',
    badge: 'Para operações',
    recommended: false,
    description:
      'Para operações com múltiplos times, clientes e necessidades de auditoria e governança.',
    price: 'R$ 299',
    priceSuffix: '/mês',
    inherits: 'Tudo do Cresce, mais:',
    features: [
      'Acompanhamento de pendências ilimitado',
      'Relatórios avançados e auditáveis',
      'Integrações e domínios ilimitados',
      'Suporte prioritário e onboarding',
    ],
    ctaLabel: 'Escolher Escala',
    href: '/form',
    note: 'Para operações que exigem governança e auditoria.',
  },
] as const

export const PLAN_FAQ = [
  {
    id: 'change',
    question: 'Posso mudar de plano depois?',
    answer:
      'Sim. A mudança pode ser solicitada a qualquer momento e o novo escopo passa a valer no próximo ciclo.',
  },
  {
    id: 'data',
    question: 'O que acontece com os dados dos sites antigos?',
    answer:
      'Os dados continuam disponíveis no painel conforme o plano contratado. Você pode exportar as informações ou solicitar a exclusão.',
  },
  {
    id: 'choice',
    question: 'Qual é o plano certo para mim?',
    answer:
      'O Início organiza o essencial; o Cresce adiciona prioridades e relatórios; o Escala atende operações com vários domínios e auditoria. Se ainda tiver dúvida, fale com o time.',
  },
] as const

export const PLAN_SUPPORT = {
  title: 'Fale com o suporte',
  description:
    'Se você ainda tiver dúvidas, o nosso time pode ajudar a escolher o plano mais adequado.',
  items: [
    { id: 'contact', icon: 'mail', label: 'Atendimento', value: 'Pelo formulário de contato' },
    { id: 'hours', icon: 'clock', label: 'Horário', value: 'Segunda a sexta, das 9h às 18h' },
    { id: 'response', icon: 'message', label: 'Retorno', value: 'Em até 1 dia útil' },
  ],
  ctaLabel: 'Falar com o suporte',
  href: '/form',
} as const

export type Plan = (typeof PLANS)[number]
export type PlanBenefit = (typeof PLAN_BENEFITS)[number]
export type PlanComparisonRow = (typeof PLAN_COMPARISON)[number]
