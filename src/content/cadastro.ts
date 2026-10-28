export const CADASTRO_CONTENT = {
  eyebrow: 'Conformidade digital',
  title: 'Crie a conta da sua empresa',
  description:
    'Organize documentos, acompanhe pendências e demonstre conformidade para clientes e auditorias.',
  domainLabel: 'Domínio conectado',
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
      helpText: 'Mínimo de 8 caracteres, com pelo menos uma letra e um número.',
    },
  },
  submitLabel: 'Criar conta',
  submittingLabel: 'Criando conta...',
  successTitle: 'Conta de demonstração criada',
  successDescription: 'Você será encaminhado ao painel.',
  errorTitle: 'Não foi possível concluir o cadastro',
  errorDescription: 'Tente novamente. Seus dados foram preservados.',
  demoNotice: 'Este é um ambiente de demonstração: nenhuma conta real será criada.',
} as const
