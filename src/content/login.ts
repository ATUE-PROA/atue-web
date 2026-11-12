export const LOGIN_CONTENT = {
  proof: {
    eyebrow: 'Conformidade digital',
    title: 'Veja o que já está organizado e o que ainda falta.',
    description:
      'O ATUE reúne evidências, pendências e relatórios para você comprovar conformidade sem planilhas soltas.',
    photo: {
      src: '/photos/equipe-tela.jpg',
      alt: 'Duas pessoas analisando informações juntas na tela de um notebook',
      width: 1400,
      height: 933,
    },
  },
  title: 'Entrar na sua conta',
  description: 'Preencha seus dados ou explore o produto sem cadastro.',
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
  recovery: {
    trigger: 'Esqueci minha senha',
    title: 'Recuperação de senha simulada',
    description:
      'Esta demonstração não envia e-mails e não tem um serviço de recuperação. Nenhuma senha será redefinida. Para conhecer o produto, feche este aviso e use “Entrar na demonstração”.',
    action: 'Entendi',
  },
  submitLabel: 'Entrar',
  submittingLabel: 'Entrando...',
  errorTitle: 'Não foi possível entrar',
  errorDescription: 'Verifique os dados e tente novamente.',
  demo: {
    cta: 'Entrar na demonstração',
    note: 'Abre o painel com dados fictícios e acesso de demonstração. Nenhuma cobrança é feita e nada é salvo.',
  },
  legal: {
    intro: 'Ao continuar, você concorda com os',
    terms: 'Termos de uso',
    conjunction: 'e a',
    privacy: 'Política de privacidade',
    suffix: 'desta demonstração.',
  },
  demoNotice: 'Este é um ambiente de demonstração: nenhuma conta real será criada.',
  signUpQuestion: 'Ainda não tem conta?',
  signUpLabel: 'Criar conta',
  plansLabel: 'Ver planos',
} as const
