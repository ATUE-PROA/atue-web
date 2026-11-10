import type {
  LandingDomainCaptureContent,
  LandingFeature,
  LandingFooterContent,
  LandingHeroContent,
  LandingStep,
  LandingVisionContent,
} from '@/types/landing.types'

export const LANDING_HERO = {
  eyebrow: 'Conformidade digital',
  title: 'É possível perder um contrato mesmo após conquistar o cliente.',
  description: 'Veja os riscos e oportunidades e evite problemas de conformidade.',
  ctaLabel: 'Conheça o ATUE',
  ctaHref: '#avaliar',
} as const satisfies LandingHeroContent

export const LANDING_FEATURES = [
  {
    title: 'Confiança',
    description: 'Conquiste mais valor e fortaleça sua reputação com clientes e parceiros.',
  },
  {
    title: 'Documentos',
    description: 'Organize políticas, registros e comunicações em um só lugar.',
  },
  {
    title: 'Conformidade',
    description: 'Acompanhe requisitos da LGPD e as práticas de privacidade.',
  },
  {
    title: 'Mais transparência para o seu negócio',
    description: 'Transforme conformidade em um diferencial comercial.',
  },
] as const satisfies readonly LandingFeature[]

export const LANDING_STEPS = [
  {
    title: 'ATUE avalia',
    description: 'Informe seu domínio e receba uma leitura inicial dos riscos e oportunidades.',
  },
  {
    title: 'ATUE organiza',
    description: 'Estruture documentos, evidências e pendências em um fluxo simples.',
  },
  {
    title: 'Seja aprovado',
    description: 'Apresente sua conformidade com clareza para clientes e parceiros.',
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
  helperText: 'Leva menos de um minuto. Você será direcionado para criar sua conta.',
} as const satisfies LandingDomainCaptureContent

export const LANDING_FOOTER = {
  description: 'Ajudamos a manter a conformidade da sua empresa.',
  copyright: '© 2026 ATUE. Todos os direitos reservados.',
} as const satisfies LandingFooterContent
