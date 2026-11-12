import { AuthBenefits } from '@/components/auth/AuthBenefits'
import { PhotoFrame } from '@/components/ui/photo'
import { LOGIN_CONTENT } from '@/content/login'

const { eyebrow, title, description, photo } = LOGIN_CONTENT.proof

/** Coluna de contexto do login: produto e resultado, sem prova social inventada. */
export function AuthProofPanel() {
  return (
    <section aria-labelledby="login-heading" className="min-w-0 max-w-xl">
      <p className="text-eyebrow text-blue-600 dark:text-blue-400">{eyebrow}</p>
      <h1 id="login-heading" className="text-display mt-5 text-balance text-foreground">
        {title}
      </h1>
      <p className="mt-5 hidden text-base leading-relaxed text-muted-foreground sm:block sm:text-lg">
        {description}
      </p>

      <div className="hidden lg:block">
        <AuthBenefits compact />
      </div>

      <div className="mt-8 hidden sm:block">
        <PhotoFrame {...photo} frameClassName="aspect-[4/3]" />
      </div>
    </section>
  )
}
