import { Check, Circle, X } from 'lucide-react'

import { CADASTRO_CONTENT } from '@/content/cadastro'
import { cn } from '@/lib/utils'

const LETTER_PATTERN = /[A-Za-z]/
const NUMBER_PATTERN = /\d/

interface PasswordChecklistProps {
  id: string
  password: string
}

/** Requisitos da senha em tempo real. O estado também é anunciado por texto oculto. */
export function PasswordChecklist({ id, password }: PasswordChecklistProps) {
  const rules = [
    { id: 'length', label: CADASTRO_CONTENT.passwordRules.length, met: password.length >= 8 },
    {
      id: 'letter',
      label: CADASTRO_CONTENT.passwordRules.letter,
      met: LETTER_PATTERN.test(password),
    },
    {
      id: 'number',
      label: CADASTRO_CONTENT.passwordRules.number,
      met: NUMBER_PATTERN.test(password),
    },
  ]

  return (
    <div id={id} className="mt-2">
      <p className="text-xs font-medium text-muted-foreground">
        {CADASTRO_CONTENT.passwordChecklistLabel}
      </p>
      <ul className="mt-1.5 space-y-1">
        {rules.map((rule) => {
          const hasStarted = password.length > 0
          const Icon = rule.met ? Check : hasStarted ? X : Circle

          return (
            <li
              key={rule.id}
              className={cn(
                'flex items-center gap-1.5 text-xs',
                rule.met ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  'size-3.5 shrink-0',
                  rule.met ? 'text-green-700 dark:text-green-300' : 'text-muted-foreground',
                )}
              />
              {rule.label}
              <span className="sr-only">{rule.met ? '— atendido' : '— pendente'}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
