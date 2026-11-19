import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Link } from 'react-router-dom'

import { Reveal } from '@/components/ui/reveal'
import { LANDING_FAQ, LANDING_SECTIONS } from '@/content/landing'

export default function LandingFaq() {
  return (
    <section
      id="duvidas"
      aria-labelledby="faq-titulo"
      className="mx-auto w-full max-w-7xl px-6 pb-20"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        <Reveal className="card-surface flex flex-col p-6 sm:p-8 lg:col-span-4">
          <h2 id="faq-titulo" className="text-section text-foreground">
            {LANDING_SECTIONS.faq.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {LANDING_SECTIONS.faq.description}
          </p>
          <Link
            to="/contato"
            className="mt-auto pt-6 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Falar com o time
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="card-surface p-6 sm:p-8 lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {LANDING_FAQ.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className="border-border last:border-b-0"
              >
                <AccordionTrigger className="py-4 text-left text-base font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[70ch] pb-4 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
