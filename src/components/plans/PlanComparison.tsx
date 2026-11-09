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

      <ul className="space-y-3 md:hidden">
        {PLAN_COMPARISON.map((row) => (
          <li key={row.id}>
            <Card className="gap-0 p-4">
              <p className="text-sm font-medium text-foreground">{row.feature}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Início</dt>
                  <dd className="text-right text-foreground">{row.inicio}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Cresce</dt>
                  <dd className="text-right font-medium text-blue-600 dark:text-blue-400">
                    {row.cresce}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Escala</dt>
                  <dd className="text-right text-foreground">{row.escala}</dd>
                </div>
              </dl>
            </Card>
          </li>
        ))}
      </ul>
    </>
  )
}
