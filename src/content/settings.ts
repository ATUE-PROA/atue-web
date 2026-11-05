import type { ReportFrequency, ReportLanguage } from '@/types/settings.types'

export const SETTINGS_CONTENT = {
  eyebrow: 'Gerais da conta',
  title: 'Configurações',
  description:
    'Revise as preferências da conta, o domínio monitorado e as integrações disponíveis nesta demonstração.',
  loading: 'Carregando configurações...',
  loadErrorTitle: 'Não foi possível carregar as configurações',
  loadErrorDescription: 'Tente novamente. Nenhuma alteração foi feita nesta tela.',
  retryLabel: 'Tentar novamente',
  notifications: {
    title: 'Notificações',
    description: 'Escolha como deseja ser notificado sobre pendências e atualizações.',
    items: {
      emailAlerts: 'Alertas por e-mail',
      weeklySummary: 'Resumo semanal de conformidade',
      criticalAlerts: 'Alertas de pendências críticas',
    },
  },
  security: {
    title: 'Segurança',
    description: 'Gerencie sua senha e acompanhe as camadas de proteção da conta.',
    fields: {
      currentPassword: {
        label: 'Senha atual',
        placeholder: 'Informe sua senha atual',
        autoComplete: 'current-password',
      },
      newPassword: {
        label: 'Nova senha',
        placeholder: 'Crie uma nova senha',
        autoComplete: 'new-password',
        helpText: 'Mínimo de 8 caracteres, com pelo menos uma letra e um número.',
      },
    },
    submitLabel: 'Alterar senha',
    submittingLabel: 'Alterando...',
    successTitle: 'Alteração de senha simulada',
    successDescription:
      'Nenhuma senha real foi alterada. Esta confirmação existe apenas para demonstrar o fluxo.',
    errorTitle: 'Não foi possível alterar a senha',
    errorDescription: 'Tente novamente. Os campos permanecem preenchidos.',
    twoFactorTitle: 'Autenticação em dois fatores',
    twoFactorDescription: 'Camada extra de proteção para o acesso à conta.',
    twoFactorStatus: 'Em breve',
  },
  danger: {
    title: 'Zona de risco',
    description: 'Ações irreversíveis. Revise com atenção antes de prosseguir.',
    deleteLabel: 'Excluir conta permanentemente',
    dialogTitle: 'Solicitar exclusão da conta?',
    dialogDescription:
      'Esta é uma demonstração. A solicitação é simulada e nenhuma conta, configuração ou dado será excluído.',
    cancelLabel: 'Cancelar',
    confirmLabel: 'Solicitar exclusão',
    confirmingLabel: 'Solicitando...',
    successTitle: 'Solicitação simulada',
    successDescription:
      'Nenhuma conta foi excluída. Em um ambiente real, a exclusão exigiria confirmação adicional e seria irreversível.',
    errorTitle: 'Não foi possível registrar a solicitação',
    errorDescription: 'Tente novamente. Nenhuma conta foi excluída.',
  },
  domain: {
    title: 'Domínio monitorado',
    description:
      'Domínio vinculado à sua conta para análise de conformidade. Para alterar, entre em contato com o suporte.',
    fieldLabel: 'Domínio',
    readOnlyHelp: 'O domínio não pode ser editado nesta tela.',
    verifiedLabel: 'Verificado',
    unverifiedLabel: 'Não verificado',
    lastCheckedPrefix: 'Última verificação:',
    lastCheckedUnavailable: 'data indisponível',
  },
  reports: {
    title: 'Preferências de relatório',
    description: 'Defina o idioma e a periodicidade dos relatórios gerados automaticamente.',
    languageLabel: 'Idioma dos relatórios',
    frequencyLabel: 'Periodicidade',
  },
  integrations: {
    title: 'Integrações',
    description:
      'Conecte ferramentas externas para enriquecer seu painel de conformidade. As conexões são simuladas nesta demonstração.',
    connectLabel: 'Conectar',
    connectingLabel: 'Conectando...',
    connectedLabel: 'Conectado',
    unavailableLabel: 'Disponível',
    moreLabel: 'Mais integrações estarão disponíveis em breve.',
    successTitle: 'Conexão simulada',
    successDescription:
      'A integração foi marcada como conectada apenas nesta demonstração. Nenhuma autorização externa foi feita.',
    errorTitle: 'Não foi possível conectar a integração',
    errorDescription: 'Tente novamente. Nenhuma conexão real foi criada.',
    items: {
      'google-search-console': {
        name: 'Google Search Console',
        description: 'Acompanhe indexação e problemas de pesquisa do domínio monitorado.',
      },
      slack: {
        name: 'Slack',
        description: 'Receba alertas de pendências no workspace da sua equipe.',
      },
    },
  },
  actions: {
    saveLabel: 'Salvar configurações',
    savingLabel: 'Salvando configurações...',
    successTitle: 'Configurações salvas na demonstração',
    successDescription:
      'As alterações valem apenas nesta sessão e não são persistidas em um servidor real.',
    errorTitle: 'Não foi possível salvar as configurações',
    errorDescription: 'Tente novamente. Os valores escolhidos permanecem na tela.',
    demoNotice: 'Ambiente de demonstração: nenhuma configuração é enviada a um servidor real.',
  },
  footer: '© 2026 ATUE. Todos os direitos reservados.',
} as const

export const REPORT_LANGUAGE_OPTIONS = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en', label: 'Inglês' },
  { value: 'es', label: 'Espanhol' },
] as const satisfies readonly { value: ReportLanguage; label: string }[]

export const REPORT_FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Semanal' },
  { value: 'monthly', label: 'Mensal' },
  { value: 'quarterly', label: 'Trimestral' },
] as const satisfies readonly { value: ReportFrequency; label: string }[]
