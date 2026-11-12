import type {
  LandingDomainCaptureContent,
  LandingFaqItem,
  LandingFeature,
  LandingFooterContent,
  LandingHeroContent,
  LandingPhoto,
  LandingProductPreview,
  LandingSectionIntro,
  LandingStep,
  LandingTrustFact,
  LandingVisionContent,
} from '@/types/landing.types'

export const LANDING_HERO = {
  eyebrow: 'Conformidade digital para pequenas e médias empresas',
  title: 'Entenda, organize e comprove sua conformidade.',
  description:
    'O ATUE ajuda a identificar pendências de LGPD, organiza evidências e gera relatórios claros — sem prometer conformidade automática.',
  primaryCtaLabel: 'Fazer diagnóstico gratuito',
  primaryCtaHref: '#avaliar',
  secondaryCtaLabel: 'Ver como funciona',
  secondaryCtaHref: '#como-funciona',
} as const satisfies LandingHeroContent

export const LANDING_PREVIEW = {
  badge: 'Demonstração',
  title: 'Diagnóstico de exemplo',
  domain: 'suaempresa.com.br',
  dateLabel: '28 out 2026',
  scoreCaption: 'Índice de conformidade',
  score: 72,
  scoreLabel: 'Atenção',
  summary: '3 pontos de atenção em privacidade, cookies e retenção de dados.',
  findings: [
    { title: 'Política de Privacidade não encontrada', severity: 'alta' },
    { title: 'Sem escolha de cookies antes do carregamento', severity: 'media' },
    { title: 'Prazos de retenção não informados', severity: 'baixa' },
  ],
  nextActionLabel: 'Próximo passo',
  nextAction: 'Publicar a Política de Privacidade em local visível.',
  footnote:
    'Exemplo ilustrativo montado para esta apresentação. Nenhuma análise real foi executada.',
} as const satisfies LandingProductPreview

export const LANDING_TRUST = [
  {
    title: 'Seus arquivos ficam no dispositivo',
    description: 'Nenhum documento é enviado ou armazenado sem um serviço real por trás.',
  },
  {
    title: 'Nenhuma conformidade é garantida automaticamente',
    description: 'A ATUE organiza evidências; a decisão sobre o que implementar continua com você.',
  },
  {
    title: 'Feito para pequenas e médias empresas',
    description: 'Sem jargão jurídico e sem exigir uma equipe de privacidade dedicada.',
  },
] as const satisfies readonly LandingTrustFact[]

export const LANDING_BENEFITS_INTRO = {
  eyebrow: 'Benefícios',
  title: 'Ter resposta pronta muda a conversa.',
  description:
    'É possível perder um contrato mesmo depois de conquistar o cliente. Organizar as evidências é o que permite mostrar, com clareza, como a sua empresa trata dados.',
} as const satisfies LandingSectionIntro

export const LANDING_FEATURES = [
  {
    title: 'Clareza para decidir',
    description:
      'Saiba quais pendências de LGPD pedem atenção primeiro, com explicação e recomendação em cada uma.',
  },
  {
    title: 'Evidências reunidas',
    description:
      'Guarde políticas, registros e comprovantes em um só lugar, com data e origem de cada item.',
  },
  {
    title: 'Relatórios para compartilhar',
    description:
      'Gere um resumo do que está organizado para conversar com clientes e parceiros, sem prometer certificação.',
  },
  {
    title: 'Menos retrabalho',
    description:
      'Acompanhe o que venceu ou precisa de atualização antes da próxima revisão ou auditoria.',
  },
] as const satisfies readonly LandingFeature[]

export const LANDING_HOW_IT_WORKS = {
  eyebrow: 'Como funciona',
  title: 'Três passos até conseguir comprovar.',
  description:
    'Um caminho curto entre entender o que falta e apresentar o que a sua empresa já faz de certo.',
} as const satisfies LandingSectionIntro

export const LANDING_STEPS = [
  {
    title: 'Diagnóstico do site',
    description:
      'Informe o domínio e veja os primeiros pontos de atenção de privacidade, cada um com o que significa e o que fazer.',
  },
  {
    title: 'Organização das evidências',
    description:
      'Reúna políticas, registros e comprovantes e marque o que já está pronto para ser apresentado.',
  },
  {
    title: 'Comprove o que já faz',
    description:
      'Gere relatórios com data, escopo e limitações — material de apoio, não um atestado de conformidade.',
  },
] as const satisfies readonly LandingStep[]

export const LANDING_VISION = {
  eyebrow: 'Sobre a ATUE',
  title: 'Feito para quem cuida da empresa e da conformidade ao mesmo tempo.',
  description:
    'O ATUE nasceu para pequenas e médias empresas que precisam organizar privacidade e segurança sem um time jurídico dedicado. A proposta é simples: menos planilha, menos jargão e mais clareza sobre o próximo passo.',
  commitments: [
    'Pensado para PMEs sem equipe jurídica dedicada',
    'Transparência sobre o que é demonstração',
    'Evidências com data, origem e responsável',
    'Relatórios que você revisa antes de compartilhar',
  ],
} as const satisfies LandingVisionContent

export const LANDING_FAQ = [
  {
    question: 'O ATUE garante que minha empresa está em conformidade com a LGPD?',
    answer:
      'Não. O ATUE organiza diagnósticos e evidências para você entender o que falta e mostrar o que já faz. A avaliação jurídica e a decisão sobre o que implementar continuam com a sua empresa.',
  },
  {
    question: 'Preciso de um time de TI ou jurídico para usar a plataforma?',
    answer:
      'Não. A linguagem foi escrita para quem cuida da empresa no dia a dia. Cada pendência vem com uma explicação curta e uma recomendação prática para começar.',
  },
  {
    question: 'Meus arquivos são enviados para algum servidor?',
    answer:
      'Nesta demonstração, não. Os arquivos permanecem no seu dispositivo e nenhuma análise é feita por IA real. A ATUE é um protótipo para apresentação e não guarda documentos.',
  },
] as const satisfies readonly LandingFaqItem[]

export const LANDING_CAPTURE = {
  eyebrow: 'Comece pelo diagnóstico',
  title: 'Descubra o que falta antes de uma revisão ou de um novo contrato.',
  label: 'Domínio da sua empresa',
  placeholder: 'suaempresa.com.br',
  submitLabel: 'Começar diagnóstico',
  helperText:
    'Ao continuar, você cria sua conta e inicia o diagnóstico a partir deste domínio. Nenhum arquivo é enviado nesta etapa.',
  loginLabel: 'Já tem uma conta? Entrar',
} as const satisfies LandingDomainCaptureContent

export const LANDING_PHOTOS = {
  hero: {
    src: '/photos/equipe-reuniao.jpg',
    alt: 'Quatro pessoas de uma pequena empresa conversando ao redor de uma mesa de madeira',
    width: 1800,
    height: 1200,
  },
  howItWorks: {
    src: '/photos/equipe-oficina.jpg',
    alt: 'Equipe reunida em uma sala clara, organizando ideias em notas adesivas na parede',
    width: 1600,
    height: 1067,
  },
  vision: {
    src: '/photos/equipe-focada.jpg',
    alt: 'Equipe concentrada trabalhando em notebooks ao redor de uma mesa',
    width: 1900,
    height: 1247,
  },
  capture: {
    src: '/photos/equipe-tela.jpg',
    alt: 'Duas pessoas analisando informações juntas na tela de um notebook',
    width: 1400,
    height: 933,
  },
} as const satisfies Record<string, LandingPhoto>

export const LANDING_FOOTER = {
  description: 'Ajudamos pequenas e médias empresas a organizar evidências de privacidade.',
  copyright: '© 2026 ATUE. Todos os direitos reservados.',
} as const satisfies LandingFooterContent
