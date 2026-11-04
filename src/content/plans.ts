export const PLANS_CONTENT = {
  eyebrow: 'Planos',
  title: 'Escolha o plano para organizar sua conformidade.',
  description:
    'Comece pelo diagnóstico do site e evolua conforme a operação cresce. Os três planos usam a mesma base de acompanhamento.',
  disclaimer:
    'Planos ilustrativos para esta demonstração. Não há cobrança e os recursos serão confirmados em proposta.',
  footer: '© 2026 ATUE. Todos os direitos reservados.',
} as const

export const PLANS = [
  {
    id: 'essential',
    name: 'Essencial',
    description: 'Para empresas que estão começando a organizar a conformidade digital.',
    priceLabel: 'Sob consulta',
    priceNote: 'Escopo definido conforme o tamanho da operação.',
    features: [
      'Diagnóstico inicial do site',
      'Score e pendências no painel',
      'Acompanhamento manual de evidências',
      '1 domínio monitorado',
    ],
    ctaLabel: 'Começar agora',
    href: '/register',
  },
  {
    id: 'professional',
    name: 'Profissional',
    description: 'Para quem já acompanha pendências e evidências com frequência.',
    priceLabel: 'Sob consulta',
    priceNote: 'Escopo definido conforme o tamanho da operação.',
    features: [
      'Tudo do plano Essencial',
      'Organização de evidências',
      'Acompanhamento de documentos desatualizados',
      'Até 3 domínios monitorados',
    ],
    ctaLabel: 'Solicitar proposta',
    href: '/form',
  },
  {
    id: 'business',
    name: 'Empresarial',
    description: 'Para operações com mais de um site e avaliações externas.',
    priceLabel: 'Sob consulta',
    priceNote: 'Escopo definido conforme o tamanho da operação.',
    features: [
      'Tudo do plano Profissional',
      'Visão consolidada de unidades',
      'Relatórios para avaliações externas',
      'Até 10 domínios monitorados',
    ],
    ctaLabel: 'Falar com o time',
    href: '/form',
  },
] as const

export type Plan = (typeof PLANS)[number]
