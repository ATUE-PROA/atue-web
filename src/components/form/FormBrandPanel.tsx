import { FileText, Link2 } from 'lucide-react'

import { FORM_CONTENT } from '@/content/form'

export function FormBrandPanel() {
  return (
    <section aria-labelledby="form-heading" className="max-w-xl">
      <p className="text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400">
        {FORM_CONTENT.eyebrow}
      </p>
      <h1
        id="form-heading"
        className="mt-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
      >
        {FORM_CONTENT.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        {FORM_CONTENT.description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-blue-600/30 bg-blue-600/10 px-3 py-1.5 text-sm dark:border-blue-400/30 dark:bg-blue-500/10">
        <Link2 aria-hidden="true" className="size-4 shrink-0 text-blue-700 dark:text-blue-300" />
        <span className="text-blue-900 dark:text-blue-100">{FORM_CONTENT.urlNotice}</span>
      </div>

      <ul className="mt-8 space-y-4">
        {FORM_CONTENT.documents.map((document) => (
          <li key={document} className="flex items-start gap-3">
            <FileText
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-blue-600 dark:text-blue-400"
            />
            <p className="text-sm leading-relaxed text-muted-foreground">{document}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
