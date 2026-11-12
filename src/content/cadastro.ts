export const CADASTRO_CONTENT = {
  eyebrow: 'Conformidade digital',
  title: 'Crie a conta da sua empresa',
  description:
    'Organize documentos, acompanhe pendências e demonstre conformidade para clientes e auditorias.',
  domainLabel: 'Domínio conectado',
  domainNote:
    'O domínio contextualiza o diagnóstico desta demonstração. Nada é acessado, escaneado ou monitorado automaticamente.',
  nextSteps: {
    title: 'O que acontece depois',
    items: [
      'Você cria a conta de demonstração.',
      'Escolhe um plano ou explora a demonstração.',
      'Gera o primeiro diagnóstico no painel.',
    ],
  },
  formTitle: 'Dados da conta',
  formDescription: 'Preencha os dados abaixo para criar sua conta de demonstração.',
  fields: {
    nome: {
      label: 'Seu nome',
      placeholder: 'Nome e sobrenome',
      autoComplete: 'name',
    },
    email: {
      label: 'E-mail corporativo',
      placeholder: 'voce@empresa.com.br',
      autoComplete: 'email',
    },
    empresa: {
      label: 'Nome da empresa',
      placeholder: 'Minha Empresa Ltda.',
      autoComplete: 'organization',
    },
    senha: {
      label: 'Senha',
      placeholder: 'Crie uma senha forte',
      autoComplete: 'new-password',
    },
  },
  passwordChecklistLabel: 'Sua senha precisa ter:',
  passwordRules: {
    length: 'Pelo menos 8 caracteres',
    letter: 'Pelo menos uma letra',
    number: 'Pelo menos um número',
  },
  consent: {
    label: 'Li e concordo com os Termos de uso e a Política de privacidade desta demonstração.',
    termsLink: 'Ler os termos',
    privacyLink: 'Ler a privacidade',
  },
  submitLabel: 'Criar conta',
  submittingLabel: 'Criando conta...',
  brandPhoto: {
    src: '/photos/documentos-analise.jpg',
    alt: 'Mãos analisando documentos e anotações ao lado de notebooks',
    width: 1300,
    height: 868,
  },
  successTitle: 'Conta de demonstração criada',
  successDescription: 'Você será encaminhado para a escolha do plano.',
  errorTitle: 'Não foi possível concluir o cadastro',
  errorDescription: 'Tente novamente. Seus dados foram preservados.',
  demoNotice: 'Este é um ambiente de demonstração: nenhuma conta real será criada.',
  signInQuestion: 'Já tem uma conta?',
  signInLabel: 'Entrar',
  plansLabel: 'Comparar planos',
} as const
