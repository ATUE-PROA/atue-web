import { useLocation } from 'react-router-dom'

import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { CadastroForm } from '@/components/auth/CadastroForm'
import { readDomainState } from '@/lib/domain'

export function Cadastro() {
  const location = useLocation()
  const domain = readDomainState(location.state)

  return (
    <AuthLayout aside={<AuthBrandPanel domain={domain} />}>
      <CadastroForm />
    </AuthLayout>
  )
}
