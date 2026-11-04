export const LOGIN_CONTENT = {
  title: 'Faça login',
  description: 'Preencha os dados abaixo para entrar na sua conta.',
  fields: {
    email: {
      label: 'E-mail corporativo',
      placeholder: 'voce@empresa.com.br',
      autoComplete: 'email',
    },
    senha: {
      label: 'Senha',
      placeholder: 'Sua senha',
      autoComplete: 'current-password',
      helpText: 'Mínimo de 8 caracteres, com pelo menos uma letra e um número.',
    },
  },
  submitLabel: 'Entrar',
  submittingLabel: 'Entrando...',
  errorTitle: 'Não foi possível entrar',
  errorDescription: 'Verifique os dados e tente novamente.',
  demoNotice: 'Este é um ambiente de demonstração: nenhuma conta real será criada.',
} as const
