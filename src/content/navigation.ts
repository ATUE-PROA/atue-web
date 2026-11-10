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

export const DASHBOARD_SHORTCUTS = [
  {
    to: '/documents',
    label: 'Central de Documentos',
    description: 'Anexe um arquivo, simule a análise e baixe relatórios.',
  },
  {
    to: '/form',
    label: 'Enviar documentos',
    description: 'Informe o site, o CNPJ e anexe os documentos da organização.',
  },
  {
    to: '/plans',
    label: 'Comparar planos',
    description: 'Veja o que muda entre Início, Cresce e Escala.',
  },
] as const satisfies readonly AppNavLink[]

export const DOCUMENT_SHORTCUTS = [
  { to: '/dashboard', label: 'Painel de controle' },
  { to: '/form', label: 'Envio completo de documentos' },
  { to: '/settings', label: 'Preferências de relatório' },
  { to: '/plans', label: 'Planos' },
] as const satisfies readonly AppNavLink[]

export const PROFILE_SHORTCUTS = [
  { to: '/documents', label: 'Central de Documentos' },
  { to: '/settings', label: 'Configurações da conta' },
  { to: '/plans', label: 'Planos' },
] as const satisfies readonly AppNavLink[]

export const SETTINGS_SHORTCUTS = [
  { to: '/documents', label: 'Central de Documentos' },
  { to: '/profile', label: 'Perfil da conta' },
  { to: '/plans', label: 'Planos' },
] as const satisfies readonly AppNavLink[]

export const NOT_FOUND_LINKS = [
  { to: '/', label: 'Página inicial' },
  { to: '/dashboard', label: 'Painel de controle' },
  { to: '/documents', label: 'Central de Documentos' },
  { to: '/plans', label: 'Planos' },
  { to: '/login', label: 'Entrar' },
] as const satisfies readonly AppNavLink[]
