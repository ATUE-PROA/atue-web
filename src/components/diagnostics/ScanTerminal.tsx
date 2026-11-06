import { useEffect, useState } from 'react'
import { TerminalSquare } from 'lucide-react'

import { SCAN_TERMINAL_CONTENT } from '@/content/scenarios'

const MIN_DURATION_MS = 3000
const MAX_DURATION_MS = 7000

interface ScanTerminalProps {
  active: boolean
}

function getInitialVisibleCount(active: boolean, totalLines: number): number {
  if (!active) {
    return totalLines
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? totalLines : 0
}

export function ScanTerminal({ active }: ScanTerminalProps) {
  const lines = SCAN_TERMINAL_CONTENT.lines
  const [visibleCount, setVisibleCount] = useState(() =>
    getInitialVisibleCount(active, lines.length),
  )

  useEffect(() => {
    if (!active) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const totalDuration =
      MIN_DURATION_MS + Math.floor(Math.random() * (MAX_DURATION_MS - MIN_DURATION_MS))
    const stepDuration = totalDuration / lines.length

    const timers = lines.map((_, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), Math.round(stepDuration * (index + 1))),
    )

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer)
      }
    }
  }, [active, lines])

  const visibleLines = lines.slice(0, visibleCount)

  return (
    <section
      aria-labelledby="scan-terminal-title"
      className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex items-start gap-2">
        <TerminalSquare
          aria-hidden="true"
          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
        />
        <div>
          <h3 id="scan-terminal-title" className="text-sm font-semibold text-foreground">
            {SCAN_TERMINAL_CONTENT.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {SCAN_TERMINAL_CONTENT.description}
          </p>
        </div>
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label={SCAN_TERMINAL_CONTENT.title}
        className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs leading-relaxed text-foreground"
      >
        <p className="text-muted-foreground">
          {active ? SCAN_TERMINAL_CONTENT.runningLabel : SCAN_TERMINAL_CONTENT.doneLabel}
        </p>

        <ul className="mt-2 space-y-1">
          {visibleLines.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span aria-hidden="true" className="text-green-700 dark:text-green-400">
                ✓
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {active && visibleCount < lines.length ? (
          <span
            aria-hidden="true"
            className="mt-1 inline-block animate-pulse motion-reduce:animate-none"
          >
            ▍
          </span>
        ) : null}

        {!active ? (
          <p className="mt-2 text-muted-foreground">{SCAN_TERMINAL_CONTENT.doneLine}</p>
        ) : null}
      </div>
    </section>
  )
}
