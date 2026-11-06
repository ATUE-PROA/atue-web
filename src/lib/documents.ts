const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDocumentDate(isoDate: string): string {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    return 'Data indisponível'
  }

  return DATE_FORMATTER.format(date)
}

export function formatDocumentDateTime(isoDate: string): string {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    return 'Data indisponível'
  }

  return DATE_TIME_FORMATTER.format(date)
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export function formatPageCount(pages: number): string {
  return `${pages} ${pluralize(pages, 'página', 'páginas')}`
}

export function slugifyFilename(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
