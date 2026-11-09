import { AlertCircle, Check, Circle, Loader2 } from 'lucide-react'

import { Progress } from '@/components/ui/progress'
import { SectionCard } from '@/components/ui/section-card'
import { DOCUMENTS_CONTENT } from '@/content/documents'
import { cn } from '@/lib/utils'
import type {
  AnalysisProgress as AnalysisProgressState,
  AnalysisStep,
} from '@/types/documents.types'

interface AnalysisProgressProps {
  steps: readonly AnalysisStep[]
  progress: AnalysisProgressState
}

type StepState = 'done' | 'active' | 'pending' | 'error'

function getStepState(index: number, progress: AnalysisProgressState): StepState {
  if (progress.status === 'done') {
    return 'done'
  }

  if (index < progress.stepIndex) {
    return 'done'
  }

  if (index > progress.stepIndex) {
    return 'pending'
  }

  return progress.status === 'error' ? 'error' : 'active'
}

export function AnalysisProgress({ steps, progress }: AnalysisProgressProps) {
  const hasError = progress.status === 'error'
  const currentStep = steps[progress.stepIndex] ?? steps[steps.length - 1]
  const statusText =
    progress.status === 'done'
      ? DOCUMENTS_CONTENT.intake.progressDone
      : DOCUMENTS_CONTENT.intake.progressStatus
          .replace('{current}', String(progress.stepIndex + 1))
          .replace('{total}', String(steps.length))
          .replace('{label}', currentStep?.label ?? '')

  return (
    <SectionCard
      title={
        hasError ? DOCUMENTS_CONTENT.intake.errorTitle : DOCUMENTS_CONTENT.intake.progressTitle
      }
      description={
        hasError
          ? DOCUMENTS_CONTENT.intake.errorDescription
          : DOCUMENTS_CONTENT.intake.progressDescription
      }
      className="animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none"
    >
      <Progress
        aria-label={DOCUMENTS_CONTENT.intake.progressAriaLabel}
        value={progress.progress}
        className="h-2"
        indicatorClassName={hasError ? 'bg-destructive' : 'bg-blue-600 dark:bg-blue-500'}
      />

      <p role="status" className="mt-3 text-sm font-medium text-foreground">
        {statusText}
      </p>

      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => {
          const state = getStepState(index, progress)
          const isActive = state === 'active'

          return (
            <li key={step.id} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border',
                  state === 'done' &&
                    'border-green-600/30 bg-green-600/10 text-green-700 dark:text-green-300',
                  isActive && 'border-blue-600/30 bg-blue-600/10 text-blue-700 dark:text-blue-300',
                  state === 'pending' && 'border-border bg-background text-muted-foreground',
                  state === 'error' && 'border-destructive/30 bg-destructive/10 text-destructive',
                )}
              >
                {state === 'done' ? <Check className="size-3.5" /> : null}
                {isActive ? (
                  <Loader2 className="size-3.5 animate-spin motion-reduce:animate-none" />
                ) : null}
                {state === 'pending' ? <Circle className="size-3" /> : null}
                {state === 'error' ? <AlertCircle className="size-3.5" /> : null}
              </span>

              <div className="min-w-0">
                <p
                  className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </SectionCard>
  )
}
