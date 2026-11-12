import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PLAN_COMPARISON } from '@/content/plans'
import { cn } from '@/lib/utils'

const PLAN_COLUMNS = [
  { id: 'start', name: 'Início', field: 'inicio', recommended: false },
  { id: 'growth', name: 'Cresce', field: 'cresce', recommended: true },
  { id: 'scale', name: 'Escala', field: 'escala', recommended: false },
] as const

export function PlanComparison() {
  return (
    <>
      <Card className="hidden overflow-hidden p-0 md:block">
        <Table>
          <TableCaption className="sr-only">
            Comparação entre os planos Início, Cresce e Escala
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase hover:bg-muted/40">
              <TableHead className="px-4 py-3 font-medium">Recurso</TableHead>
              <TableHead className="px-4 py-3 font-medium">Início</TableHead>
              <TableHead className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                Cresce
              </TableHead>
              <TableHead className="px-4 py-3 font-medium">Escala</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PLAN_COMPARISON.map((row) => (
              <TableRow key={row.id} className="border-b border-border last:border-b-0">
                <TableHead scope="row" className="px-4 py-3 text-left font-medium text-foreground">
                  {row.feature}
                </TableHead>
                <TableCell className="px-4 py-3 text-muted-foreground">{row.inicio}</TableCell>
                <TableCell className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                  {row.cresce}
                </TableCell>
                <TableCell className="px-4 py-3 text-muted-foreground">{row.escala}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="space-y-4 md:hidden">
        {PLAN_COLUMNS.map((plan) => (
          <Card
            key={plan.id}
            className={cn('gap-0 p-5', plan.recommended && 'ring-blue-600/30')}
            role="region"
            aria-labelledby={`plan-comparison-${plan.id}`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                id={`plan-comparison-${plan.id}`}
                className="text-lg font-semibold text-foreground"
              >
                {plan.name}
              </h3>
              {plan.recommended ? (
                <Badge
                  variant="outline"
                  className="h-auto rounded-full border-blue-600/30 bg-blue-600/10 px-3 py-1 text-blue-600 dark:text-blue-400"
                >
                  Recomendado
                </Badge>
              ) : null}
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              {PLAN_COMPARISON.map((row) => (
                <div
                  key={row.id}
                  className="flex justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
                >
                  <dt className="min-w-0 text-muted-foreground">{row.feature}</dt>
                  <dd className="max-w-[55%] shrink-0 text-right font-medium text-foreground">
                    {row[plan.field]}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </>
  )
}
