export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atue-theme'
export const THEME_EVENT = 'atue:theme-change'

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  window.dispatchEvent(new Event(THEME_EVENT))
}

export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  applyTheme(next)

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // shortcut: sem localStorage a escolha vale só nesta sessão
  }

  return next
}

export function watchSystemTheme() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (readStoredTheme()) {
      return
    }

    applyTheme(event.matches ? 'dark' : 'light')
  })
}
