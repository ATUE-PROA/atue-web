import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PLAN_FAQ } from '@/content/plans'

export function PlanFaq() {
  return (
    <Card role="region" aria-labelledby="plan-faq-heading" className="gap-0 p-6">
      <CardHeader className="p-0">
        <h3 id="plan-faq-heading" className="text-lg font-semibold tracking-tight text-foreground">
          Perguntas frequentes
        </h3>
      </CardHeader>

      <CardContent className="p-0 pt-4">
        <Accordion type="single" collapsible>
          {PLAN_FAQ.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="py-4 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
