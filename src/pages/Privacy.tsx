import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PublicFooter } from '@/components/layout/public-footer'
import { PublicHeader } from '@/components/layout/public-header'
import { SectionCard } from '@/components/ui/section-card'
import { LEGAL_BACK_LABEL, LEGAL_FOOTER, PRIVACY_CONTENT } from '@/content/legal'

const backLinkClasses =
  'inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none'

const inlineLinkClasses =
  'rounded-md font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-700 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function Privacy() {
  const { eyebrow, title, intro, disclaimer, sections } = PRIVACY_CONTENT

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />

      <main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:py-16">
        <Link to="/" className={backLinkClasses}>
          <ArrowLeft aria-hidden="true" className="size-4" />
          {LEGAL_BACK_LABEL}
        </Link>

        <p className="text-eyebrow mt-6 text-blue-600 dark:text-blue-400">{eyebrow}</p>
        <h1 className="text-display mt-4 text-foreground">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        <p className="mt-4 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>

        <div className="mt-8 space-y-5">
          {sections.map((section) => (
            <SectionCard key={section.id} title={section.title}>
              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Tem alguma dúvida?{' '}
          <Link to="/contato" className={inlineLinkClasses}>
            Fale com o ATUE
          </Link>{' '}
          — o envio também é simulado nesta demonstração.
        </p>
      </main>

      <PublicFooter {...LEGAL_FOOTER} />
    </div>
  )
}
