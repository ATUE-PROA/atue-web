export const FORM_CONTENT = {
  eyebrow: 'Documentos e site',
  title: 'Envie os dados do site e os documentos de conformidade.',
  description:
    'Informe a URL do site e anexe os arquivos que ajudam a demonstrar como a empresa trata dados e privacidade.',
  urlNotice: 'A URL do site é obrigatória.',
  photo: {
    src: '/photos/documentos-analise.jpg',
    alt: 'Mãos analisando documentos e anotações ao lado de notebooks',
    width: 1300,
    height: 868,
  },
  steps: [
    {
      id: 'empresa',
      title: 'Empresa',
      description: 'Identifique a organização e o site que será avaliado.',
    },
    {
      id: 'contato',
      title: 'Contato e DPO',
      description: 'Informe quem responde pelos dados pessoais na empresa.',
    },
    {
      id: 'documentos',
      title: 'Documentos',
      description: 'Descreva as finalidades e anexe as evidências disponíveis.',
    },
  ],
  stepperLabel: 'Etapas do envio',
  stepLabel: 'Etapa {current} de {total}',
  neededTitle: 'O que você vai precisar',
  needed: [
    'CNPJ da empresa para consulta pública e conferência.',
    'URL do site que será avaliado.',
    'Documentos de privacidade e segurança disponíveis.',
  ],
  formTitle: 'Envie os dados e documentos',
  formDescription: 'São três etapas curtas. Nada é enviado ou armazenado nesta demonstração.',
  nextLabel: 'Continuar',
  backLabel: 'Voltar',
  reviewTitle: 'Revise antes de enviar',
  reviewDescription:
    'Confira os dados das etapas anteriores. Use “Voltar” para ajustar o que precisar.',
  emptyValue: 'Não informado',
  fields: {
    cnpj: {
      label: 'CNPJ da empresa',
      placeholder: '00.000.000/0000-00',
      helpText:
        'Usado para consultar a base pública OpenCNPJ. A busca preenche os dados disponíveis, que você pode editar.',
      lookupLabel: 'Buscar CNPJ',
      lookingUpLabel: 'Buscando CNPJ...',
    },
    url: {
      label: 'URL do site',
      placeholder: 'https://cliente.com.br',
      autoComplete: 'url',
      helpText: 'O endereço é usado no diagnóstico do site e no relatório gerado.',
    },
    empresa: {
      label: 'Nome da empresa',
      placeholder: 'Minha Empresa Ltda.',
      autoComplete: 'organization',
      helpText: 'O nome identifica a organização nos relatórios da Central de Documentos.',
    },
    email: {
      label: 'E-mail de contato',
      placeholder: 'voce@empresa.com.br',
      autoComplete: 'email',
      helpText: 'Canal para retorno sobre o envio. Nesta demonstração, nenhuma mensagem é enviada.',
    },
    dpoNome: {
      label: 'Encarregado pelo tratamento (DPO)',
      placeholder: 'Nome do responsável',
      autoComplete: 'name',
      helpText:
        'Pessoa indicada como canal de contato entre a organização e os titulares de dados.',
    },
    dpoEmail: {
      label: 'E-mail do DPO',
      placeholder: 'dpo@empresa.com.br',
      autoComplete: 'email',
      helpText: 'Contato divulgado para solicitações de titulares, conforme a LGPD.',
    },
    finalidades: {
      label: 'Finalidades do tratamento',
      placeholder: 'Ex.: cadastro de clientes, envio de newsletter e suporte.',
      helpText:
        'Liste as finalidades declaradas. Essas informações aparecem no relatório gerado localmente.',
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
  files: {
    attachLabel: 'Anexar documentos',
    replaceLabel: 'Escolher outros arquivos',
    emptyTitle: 'Nenhum documento selecionado',
    emptyDescription: 'Use o botão acima para escolher arquivos do seu computador.',
    selectedCount: 'arquivo selecionado',
    selectedCountPlural: 'arquivos selecionados',
    replaceNotice: 'Uma nova seleção substitui os arquivos anteriores.',
    removeHint: 'Para remover um arquivo, escolha novamente apenas os que deseja enviar.',
    localOnly: 'Os arquivos permanecem no seu dispositivo e não são lidos nesta demonstração.',
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
  successNextTitle: 'Próximos passos',
  successNextDescription: 'Você pode simular a análise de um documento ou voltar ao painel.',
  analyzeDocumentLabel: 'Analisar documento',
  dashboardLabel: 'Ir para o painel',
  newSubmissionLabel: 'Enviar outro conjunto',
  errorTitle: 'Não foi possível enviar os dados',
  errorDescription: 'Tente novamente. Seus dados foram preservados.',
  demoNotice: 'Ambiente de demonstração: o envio de arquivos é simulado.',
} as const
