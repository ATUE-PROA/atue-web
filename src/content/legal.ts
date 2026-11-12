interface LegalSection {
  id: string
  title: string
  paragraphs: readonly string[]
}

export const LEGAL_FOOTER = {
  description: 'Conformidade digital para pequenas e médias empresas.',
  copyright: '© 2026 ATUE. Todos os direitos reservados.',
} as const

export const LEGAL_BACK_LABEL = 'Voltar para o início'

const DEMO_DISCLAIMER =
  'Este texto é um aviso de demonstração. Não é uma política jurídica, não tem validade legal e não substitui a orientação de um profissional.'

const PRIVACY_SECTIONS: readonly LegalSection[] = [
  {
    id: 'coleta',
    title: 'O que a demonstração coleta',
    paragraphs: [
      'Os formulários de login, cadastro, contato e diagnóstico existem para demonstrar o produto. Nesta demonstração, as informações ficam apenas na memória do navegador.',
      'Nada é enviado para um banco de dados, não existe conta real e os dados desaparecem quando você recarrega a página ou fecha a aba.',
    ],
  },
  {
    id: 'arquivos',
    title: 'Arquivos anexados',
    paragraphs: [
      'Quando uma tela permite anexar um documento, apenas o nome, o tamanho e a extensão do arquivo são lidos, para validar formato e limite.',
      'O conteúdo do arquivo não é lido, não é enviado e não é processado por nenhum modelo de inteligência artificial. O arquivo permanece no seu dispositivo.',
    ],
  },
  {
    id: 'dados-ficticios',
    title: 'Dados fictícios',
    paragraphs: [
      'Empresas, documentos, diagnósticos, relatórios e planos exibidos na demonstração são fictícios. Eles não representam organizações reais nem uma avaliação de conformidade verificada.',
    ],
  },
  {
    id: 'persistencia',
    title: 'Persistência e cookies',
    paragraphs: [
      'A demonstração não grava dados de formulário em armazenamento do navegador. A preferência de tema claro ou escuro pode ser guardada localmente, apenas para lembrar a sua escolha.',
      'Nenhuma informação é usada para publicidade ou compartilhada com terceiros por esta demonstração.',
    ],
  },
  {
    id: 'contato',
    title: 'Dúvidas e contato',
    paragraphs: [
      'Se você quiser falar sobre privacidade ou sobre o produto, use a página de contato. O formulário de contato também é simulado: nenhuma mensagem é enviada nesta demonstração.',
    ],
  },
]

const TERMS_SECTIONS: readonly LegalSection[] = [
  {
    id: 'demonstracao',
    title: 'Ambiente de demonstração',
    paragraphs: [
      'Tudo o que aparece nesta versão é uma amostra do produto, criada para apresentação. Contas, diagnósticos, documentos e relatórios são fictícios e não devem ser usados como registro real da sua empresa.',
      'O acesso pode ser alterado ou encerrado a qualquer momento, sem aviso prévio.',
    ],
  },
  {
    id: 'sem-garantia',
    title: 'Sem garantia de conformidade',
    paragraphs: [
      'O ATUE organiza informações para ajudar você a entender e comprovar o que já está estruturado. Usar a plataforma não torna uma empresa automaticamente conforme à LGPD nem garante aprovação em auditorias ou avaliações de terceiros.',
      'As análises apresentadas na demonstração são simuladas, determinísticas e não têm validade legal.',
    ],
  },
  {
    id: 'assinatura',
    title: 'Assinatura simulada',
    paragraphs: [
      'A escolha de um plano ativa o plano apenas na memória do navegador. Não há cobrança, cobrança recorrente, emissão de nota fiscal ou contrato comercial nesta demonstração.',
      'Recarregar a página ou fechar a aba remove a assinatura simulada e volta ao estado sem plano.',
    ],
  },
  {
    id: 'uso',
    title: 'Uso adequado',
    paragraphs: [
      'Não use formulários da demonstração para inserir dados pessoais ou comerciais sensíveis de terceiros. Use apenas informações fictícias durante os testes.',
    ],
  },
  {
    id: 'contato',
    title: 'Fale com o ATUE',
    paragraphs: [
      'Para dúvidas sobre estes termos, use a página de contato. O envio é simulado e nenhuma mensagem é encaminhada ao time nesta demonstração.',
    ],
  },
]

export const PRIVACY_CONTENT = {
  eyebrow: 'Privacidade',
  title: 'Privacidade nesta demonstração',
  intro:
    'Esta página explica, de forma direta, o que o ambiente de demonstração do ATUE faz com os dados que você digita.',
  disclaimer: DEMO_DISCLAIMER,
  sections: PRIVACY_SECTIONS,
} as const

export const TERMS_CONTENT = {
  eyebrow: 'Termos',
  title: 'Termos de uso da demonstração',
  intro:
    'Estas condições descrevem o uso do ambiente de demonstração do ATUE. Elas não substituem um contrato de prestação de serviço.',
  disclaimer: DEMO_DISCLAIMER,
  sections: TERMS_SECTIONS,
} as const

export const CONTACT_CONTENT = {
  eyebrow: 'Contato',
  title: 'Fale com o ATUE',
  intro:
    'Envie uma mensagem para o time do ATUE. Nesta demonstração, o envio é simulado e nenhuma mensagem é entregue.',
  formTitle: 'Envie uma mensagem',
  formDescription: 'Campos com * são obrigatórios.',
  fields: {
    nome: {
      label: 'Seu nome',
      placeholder: 'Nome e sobrenome',
      autoComplete: 'name',
    },
    email: {
      label: 'E-mail',
      placeholder: 'voce@empresa.com.br',
      autoComplete: 'email',
    },
    mensagem: {
      label: 'Mensagem',
      placeholder: 'Conte o que você precisa saber sobre o ATUE.',
    },
  },
  submitLabel: 'Enviar mensagem',
  simulated: {
    title: 'Mensagem não enviada',
    description:
      'Este formulário é uma simulação: nenhuma mensagem foi enviada nem armazenada, e não existe um canal de atendimento real nesta demonstração.',
  },
  demoNote:
    'Para conhecer o produto agora, entre na demonstração pela página de login. Nenhuma cobrança é feita.',
  demoLinkLabel: 'Entrar na demonstração',
} as const
