import type { CompanySector } from '@/types/profile.types'

export const PROFILE_CONTENT = {
  eyebrow: 'Dados pessoais e da empresa',
  title: 'Perfil',
  backToSite: 'Voltar ao site',
  loading: 'Carregando perfil...',
  loadErrorTitle: 'Não foi possível carregar o perfil',
  loadErrorDescription: 'Tente novamente. Nenhuma alteração foi feita nesta tela.',
  retryLabel: 'Tentar novamente',
  personal: {
    title: 'Dados pessoais',
    avatarButton: 'Alterar foto',
    avatarSuccessTitle: 'Prévia local da foto',
    avatarSuccessDescription: 'A imagem não é enviada nem salva nesta demonstração.',
    avatarErrorTitle: 'Não foi possível usar esta imagem',
    avatarErrorDescription: 'Selecione uma imagem PNG, JPG ou WebP de até 2 MB.',
    fields: {
      fullName: {
        label: 'Nome completo',
        placeholder: 'Nome e sobrenome',
        autoComplete: 'name',
      },
      role: {
        label: 'Cargo',
        placeholder: 'Ex.: Responsável de Conformidade',
        autoComplete: 'organization-title',
      },
    },
    saveLabel: 'Salvar dados',
    savingLabel: 'Salvando...',
  },
  contact: {
    title: 'Contato',
    description: 'E-mail e telefone associados à sua conta de usuário.',
    fields: {
      email: {
        label: 'E-mail',
        placeholder: 'voce@empresa.com.br',
        autoComplete: 'email',
      },
      phone: {
        label: 'Telefone',
        placeholder: '+55 (11) 91234-5678',
        autoComplete: 'tel',
      },
    },
  },
  company: {
    title: 'Dados da empresa',
    description:
      'Informações institucionais exibidas nos relatórios e certificados de conformidade.',
    fields: {
      legalName: {
        label: 'Razão social',
        placeholder: 'Sua Empresa Ltda.',
        autoComplete: 'organization',
      },
      cnpj: {
        label: 'CNPJ',
        placeholder: '00.000.000/0000-00',
      },
      sector: {
        label: 'Setor',
      },
      address: {
        label: 'Endereço',
        placeholder: 'Rua, número — cidade, estado',
        autoComplete: 'street-address',
      },
      website: {
        label: 'Site institucional',
        placeholder: 'https://suaempresa.com.br',
        autoComplete: 'url',
      },
    },
  },
  dpo: {
    title: 'Responsável legal / DPO',
    description: 'Dados do encarregado de proteção de dados (DPO) exigidos pela LGPD.',
    fields: {
      name: {
        label: 'Nome do responsável',
        placeholder: 'Nome do responsável',
        autoComplete: 'name',
      },
      email: {
        label: 'E-mail do DPO',
        placeholder: 'dpo@suaempresa.com.br',
        autoComplete: 'email',
      },
    },
    note: 'O DPO é o ponto de contato oficial para questões relacionadas à LGPD.',
  },
  actions: {
    saveLabel: 'Salvar perfil',
    savingLabel: 'Salvando perfil...',
    successTitle: 'Perfil salvo na demonstração',
    successDescription:
      'As alterações valem apenas nesta sessão e não são persistidas em um servidor real.',
    errorTitle: 'Não foi possível salvar o perfil',
    errorDescription: 'Tente novamente. Os valores preenchidos permanecem na tela.',
    demoNotice: 'Ambiente de demonstração: as alterações não serão salvas.',
  },
} as const

export const COMPANY_SECTOR_OPTIONS = [
  { value: 'technology', label: 'Tecnologia' },
  { value: 'health', label: 'Saúde' },
  { value: 'finance', label: 'Financeiro' },
  { value: 'retail', label: 'Varejo' },
  { value: 'education', label: 'Educação' },
  { value: 'industry', label: 'Indústria' },
  { value: 'services', label: 'Serviços' },
  { value: 'other', label: 'Outro' },
] as const satisfies readonly { value: CompanySector; label: string }[]
