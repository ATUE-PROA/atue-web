import type {
  LandingDomainCaptureContent,
  LandingFeature,
  LandingFooterContent,
  LandingHeroContent,
  LandingNavItem,
  LandingStep,
  LandingVisionContent,
} from '@/types/landing.types'

export const LANDING_NAV = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
] as const satisfies readonly LandingNavItem[]

export const LANDING_HERO = {
  eyebrow: 'Conformidade digital',
  title: 'É possível obter um contrato mesmo após conquistar o cliente.',
  description:
    'Veja os riscos e oportunidades e evite problemas de conformidade.',
  ctaLabel: 'Conheça o ATUE',
  ctaHref: '#capturar-dominio',
} as const satisfies LandingHeroContent

export const LANDING_FEATURES = [
  {
    title: 'Confiança',
    description:
      'Centralize evidências e demonstre maturidade para clientes e auditorias.',
  },
  {
    title: 'Documentos',
    description:
      'Organize políticas, registros e comprovações em um só lugar.',
  },
  {
    title: 'Conformidade',
    description:
      'Acompanhe requisitos de LGPD e segurança da informação.',
  },
  {
    title: 'Mais transparência para o seu negócio',
    description:
      'Transforme conformidade em um diferencial comercial.',
  },
] as const satisfies readonly LandingFeature[]

export const LANDING_STEPS = [
  {
    title: 'ATUE avalia',
    description:
      'Informe seu domínio e receba uma leitura inicial dos riscos e oportunidades.',
  },
  {
    title: 'ATUE organiza',
    description:
      'Estruture documentos, evidências e pendências em um fluxo simples.',
  },
  {
    title: 'Seja aprovado',
    description:
      'Apresente sua conformidade com clareza para clientes e parceiros.',
  },
] as const satisfies readonly LandingStep[]

export const LANDING_VISION = {
  title: 'O que queremos construir',
  description:
    'Uma plataforma acessível para pequenas e médias empresas entenderem, organizarem e comprovarem sua conformidade digital.',
  commitments: [
    'Privacidade e segurança',
    'Identificar riscos e reduzir custos',
    'Transparência e confiabilidade',
    'Segurança e conformidade',
  ],
} as const satisfies LandingVisionContent

export const LANDING_CAPTURE = {
  eyebrow: 'Organize-se com a plataforma de conformidade',
  title: 'Entenda, organize e prove a conformidade do seu negócio.',
  label: 'Conecte o seu domínio',
  placeholder: 'suaempresa.com.br',
  submitLabel: 'Avaliar meu site agora',
  helperText:
    'Leva menos de um minuto. Você será direcionado para criar sua conta.',
} as const satisfies LandingDomainCaptureContent

export const LANDING_FOOTER = {
  description: 'Ajudamos a manter a conformidade da sua empresa.',
  copyright: '© 2026 ATUE. Todos os direitos reservados.',
  links: LANDING_NAV,
} as const satisfies LandingFooterContent
