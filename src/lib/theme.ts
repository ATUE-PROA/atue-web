export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'atue-theme'
export const THEME_EVENT = 'atue:theme-change'

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
