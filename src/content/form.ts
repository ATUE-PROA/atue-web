export const FORM_CONTENT = {
  eyebrow: 'Documentos e site',
  title: 'Envie os dados do site e os documentos de conformidade.',
  description:
    'Informe a URL do site e anexe os arquivos que ajudam a demonstrar como a empresa trata dados e privacidade.',
  urlNotice: 'A URL do site é obrigatória.',
  documents: [
    'Política de privacidade e termos de uso',
    'Registros de consentimento e cookies',
    'Políticas e evidências de segurança da informação',
  ],
  formTitle: 'Dados do site e documentos',
  formDescription: 'Preencha os dados abaixo e anexe os documentos disponíveis.',
  fields: {
    cnpj: {
      label: 'CNPJ da empresa',
      placeholder: '00.000.000/0000-00',
      helpText: 'Consulta à base pública OpenCNPJ. A busca preenche os dados disponíveis.',
      lookupLabel: 'Buscar CNPJ',
      lookingUpLabel: 'Buscando CNPJ...',
    },
    url: {
      label: 'URL do site',
      placeholder: 'https://cliente.com.br',
      autoComplete: 'url',
      helpText: 'Informe o endereço completo do site que será avaliado.',
    },
    empresa: {
      label: 'Nome da empresa',
      placeholder: 'Minha Empresa Ltda.',
      autoComplete: 'organization',
    },
    email: {
      label: 'E-mail de contato',
      placeholder: 'voce@empresa.com.br',
      autoComplete: 'email',
    },
    documentos: {
      label: 'Documentos',
      helpText: 'PDF, DOC ou DOCX, até 10 MB por arquivo. Você pode selecionar mais de um.',
    },
    observacoes: {
      label: 'Observações (opcional)',
      placeholder: 'Contexto adicional sobre os documentos ou sobre o site.',
      helpText: 'Não inclua senhas ou outros dados sensíveis.',
    },
  },
  lookup: {
    loading: 'Consultando CNPJ...',
    success: 'Dados da empresa preenchidos. Confira as informações antes de enviar.',
    notFound: 'CNPJ não encontrado. Preencha os dados manualmente.',
    error: 'Não foi possível consultar o CNPJ agora. Tente novamente ou preencha manualmente.',
  },
  submitLabel: 'Enviar dados e documentos',
  submittingLabel: 'Enviando...',
  successTitle: 'Dados registrados',
  successDescription:
    'Esta é uma demonstração: nenhum arquivo foi enviado e nenhum dado foi armazenado.',
  errorTitle: 'Não foi possível enviar os dados',
  errorDescription: 'Tente novamente. Seus dados foram preservados.',
  demoNotice: 'Ambiente de demonstração: o envio de arquivos é simulado.',
} as const
