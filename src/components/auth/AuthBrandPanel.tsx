import { Globe } from 'lucide-react'

import { AuthBenefits } from '@/components/auth/AuthBenefits'
import { PhotoFrame } from '@/components/ui/photo'
import { CADASTRO_CONTENT } from '@/content/cadastro'

interface AuthBrandPanelProps {
  domain: string | null
}

export function AuthBrandPanel({ domain }: AuthBrandPanelProps) {
  return (
    <section aria-labelledby="cadastro-heading" className="min-w-0 max-w-xl">
      <p className="text-eyebrow text-blue-600 dark:text-blue-400">{CADASTRO_CONTENT.eyebrow}</p>
      <h1 id="cadastro-heading" className="text-display mt-5 text-balance text-foreground">
        {CADASTRO_CONTENT.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {CADASTRO_CONTENT.description}
      </p>

      {domain ? (
        <div className="mt-6">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-3 py-1.5 text-sm">
            <Globe
              aria-hidden="true"
              className="size-4 shrink-0 text-blue-600 dark:text-blue-400"
            />
            <span className="shrink-0 text-muted-foreground">{CADASTRO_CONTENT.domainLabel}:</span>
            <span className="truncate font-medium text-foreground">{domain}</span>
          </div>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
            {CADASTRO_CONTENT.domainNote}
          </p>
        </div>
      ) : null}

      <div className="mt-8 hidden sm:block">
        <h2 className="text-sm font-semibold text-foreground">
          {CADASTRO_CONTENT.nextSteps.title}
        </h2>
        <ol className="mt-3 space-y-2">
          {CADASTRO_CONTENT.nextSteps.items.map((item, index) => (
            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span
                aria-hidden="true"
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                {index + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden sm:block">
        <AuthBenefits compact />
      </div>

      <div className="mt-10 hidden sm:block">
        <PhotoFrame {...CADASTRO_CONTENT.brandPhoto} frameClassName="aspect-[4/3]" />
      </div>
    </section>
  )
}
