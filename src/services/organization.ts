import { saveMockInstitutionalProfile } from '@/mocks/organization'
import type { FormValues } from '@/types/form.types'
import type { InstitutionalProfile } from '@/types/organization.types'

/**
 * Guarda os dados institucionais apenas em memória para que o relatório
 * gerado localmente refleta o que a pessoa informou no envio de documentos.
 * Nada é enviado ou persistido.
 */
export function saveInstitutionalProfile(values: FormValues): InstitutionalProfile {
  return saveMockInstitutionalProfile({
    companyName: values.empresa.trim(),
    cnpj: values.cnpj.trim(),
    contactEmail: values.email.trim(),
    website: values.url.trim(),
    dpoName: values.dpoNome.trim(),
    dpoEmail: values.dpoEmail.trim(),
    purposes: values.finalidades.trim(),
  })
}
