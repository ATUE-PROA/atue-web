import { Globe } from 'lucide-react'

import { AuthBenefits } from '@/components/auth/AuthBenefits'
import { AuthPreview } from '@/components/auth/AuthPreview'
import { CADASTRO_CONTENT } from '@/content/cadastro'

interface AuthBrandPanelProps {
  domain: string | null
}

export function AuthBrandPanel({ domain }: AuthBrandPanelProps) {
  return (
    <section aria-labelledby="cadastro-heading" className="max-w-xl">
      <p className="text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">
        {CADASTRO_CONTENT.eyebrow}
      </p>
      <h1
        id="cadastro-heading"
        className="mt-5 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl"
      >
        {CADASTRO_CONTENT.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
        {CADASTRO_CONTENT.description}
      </p>

      {domain ? (
        <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1.5 text-sm">
          <Globe aria-hidden="true" className="size-4 shrink-0 text-blue-300" />
          <span className="shrink-0 text-neutral-400">{CADASTRO_CONTENT.domainLabel}:</span>
          <span className="truncate font-medium text-blue-100">{domain}</span>
        </div>
      ) : null}

      <AuthBenefits />
      <AuthPreview />
    </section>
  )
}
