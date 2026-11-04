import { ChevronDown } from 'lucide-react'

import { PLAN_FAQ } from '@/content/plans'

export function PlanFaq() {
  return (
    <section
      aria-labelledby="plan-faq-heading"
      className="rounded-xl border border-border bg-card p-6"
    >
      <h3 id="plan-faq-heading" className="text-lg font-semibold tracking-tight text-foreground">
        Perguntas frequentes
      </h3>

      <div className="mt-4 divide-y divide-border">
        {PLAN_FAQ.map((item) => (
          <details key={item.id} className="group py-4 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md text-sm font-medium text-foreground focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none dark:focus-visible:ring-blue-400/60 [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
