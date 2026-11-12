import { FileText, Link2 } from 'lucide-react'

import { PhotoFrame } from '@/components/ui/photo'
import { FORM_CONTENT } from '@/content/form'

export function FormBrandPanel() {
  return (
    <section aria-labelledby="form-heading" className="max-w-xl">
      <p className="text-eyebrow text-blue-600 dark:text-blue-400">{FORM_CONTENT.eyebrow}</p>
      <h1 id="form-heading" className="text-display mt-4 text-foreground">
        {FORM_CONTENT.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {FORM_CONTENT.description}
      </p>

      <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-3 py-1.5 text-sm dark:border-blue-400/30 dark:bg-blue-500/10">
        <Link2 aria-hidden="true" className="size-4 shrink-0 text-blue-700 dark:text-blue-300" />
        <span className="text-blue-900 dark:text-blue-100">{FORM_CONTENT.urlNotice}</span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:block">
        <div>
          <div className="hidden sm:block">
            <h2 className="text-sm font-semibold text-foreground">Como o envio funciona</h2>
            <ol aria-label={FORM_CONTENT.stepperLabel} className="mt-3 space-y-3">
              {FORM_CONTENT.steps.map((step, index) => (
                <li key={step.id} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-blue-600/30 bg-blue-600/10 text-xs font-semibold text-blue-700 dark:border-blue-400/30 dark:text-blue-300"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 hidden sm:block">
            <h2 className="text-sm font-semibold text-foreground">{FORM_CONTENT.neededTitle}</h2>
            <ul className="mt-3 space-y-2">
              {FORM_CONTENT.needed.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <FileText
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden sm:block lg:mt-8">
          <PhotoFrame {...FORM_CONTENT.photo} frameClassName="aspect-[4/3]" />
        </div>
      </div>
    </section>
  )
}
