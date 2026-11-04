import { PLAN_COMPARISON } from '@/content/plans'

export function PlanComparison() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <caption className="sr-only">Comparação entre os planos Início, Cresce e Escala</caption>
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-3 font-medium">
                Recurso
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Início
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                Cresce
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Escala
              </th>
            </tr>
          </thead>
          <tbody>
            {PLAN_COMPARISON.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0">
                <th scope="row" className="px-4 py-3 text-left font-medium text-foreground">
                  {row.feature}
                </th>
                <td className="px-4 py-3 text-muted-foreground">{row.inicio}</td>
                <td className="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">
                  {row.cresce}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.escala}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden">
        {PLAN_COMPARISON.map((row) => (
          <li key={row.id} className="rounded-xl border border-border bg-card p-4">
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
          </li>
        ))}
      </ul>
    </>
  )
}
