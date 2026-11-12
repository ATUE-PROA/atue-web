export interface AppNavLink {
  to: string
  label: string
  description?: string
}

export const PUBLIC_NAV = [
  { to: '/#como-funciona', label: 'Como funciona' },
  { to: '/#beneficios', label: 'Benefícios' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/plans', label: 'Planos' },
] as const satisfies readonly AppNavLink[]

export const PRODUCT_FOOTER_LINKS = [
  { to: '/dashboard', label: 'Painel' },
  { to: '/documents', label: 'Documentos' },
  { to: '/form', label: 'Enviar documentos' },
  { to: '/profile', label: 'Perfil' },
  { to: '/settings', label: 'Configurações' },
  { to: '/plans', label: 'Planos' },
  { to: '/', label: 'Site' },
] as const satisfies readonly AppNavLink[]

/** Páginas institucionais da demonstração, compartilhadas pelos dois rodapés. */
export const LEGAL_LINKS = [
  { to: '/contato', label: 'Contato' },
  { to: '/privacidade', label: 'Privacidade' },
  { to: '/termos', label: 'Termos' },
] as const satisfies readonly AppNavLink[]

export const NOT_FOUND_LINKS = [
  { to: '/', label: 'Página inicial' },
  { to: '/dashboard', label: 'Painel de controle' },
  { to: '/documents', label: 'Central de Documentos' },
  { to: '/plans', label: 'Planos' },
  { to: '/login', label: 'Entrar' },
] as const satisfies readonly AppNavLink[]
