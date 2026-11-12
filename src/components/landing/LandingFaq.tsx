import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Reveal } from '@/components/ui/reveal'
import { LANDING_FAQ } from '@/content/landing'

export default function LandingFaq() {
  return (
    <section id="duvidas" className="scroll-mt-16 border-t border-border/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-eyebrow text-blue-600 dark:text-blue-400">Dúvidas</p>
          <h2 className="mt-4 text-section text-foreground">O que costumam perguntar.</h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
            Respostas diretas sobre o que a plataforma faz — e o que ela não faz.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion type="single" collapsible>
            {LANDING_FAQ.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-4">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
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
