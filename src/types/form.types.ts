export interface FormValues {
  cnpj: string
  url: string
  empresa: string
  email: string
  dpoNome: string
  dpoEmail: string
  finalidades: string
  documentos: FileList | undefined
  observacoes: string
}

export interface FormSubmission {
  protocol: string
  receivedAt: string
}
