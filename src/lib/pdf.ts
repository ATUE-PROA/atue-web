import type { DownloadContent, DownloadSection } from '@/types/documents.types'

const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842
const MARGIN = 50
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const TOP_Y = 792
const BOTTOM_Y = 70
const TITLE_COLOR = [0.07, 0.09, 0.15] as const
const BODY_COLOR = [0.16, 0.18, 0.22] as const
const MUTED_COLOR = [0.42, 0.45, 0.5] as const
const FOOTER_COLOR = [0.52, 0.55, 0.6] as const

const WIN_ANSI_MAP: Record<string, number> = {
  '\u20ac': 0x80,
  '\u201a': 0x82,
  '\u0192': 0x83,
  '\u201e': 0x84,
  '\u2026': 0x85,
  '\u2020': 0x86,
  '\u2021': 0x87,
  '\u02c6': 0x88,
  '\u2030': 0x89,
  '\u0160': 0x8a,
  '\u2039': 0x8b,
  '\u0152': 0x8c,
  '\u017d': 0x8e,
  '\u2018': 0x91,
  '\u2019': 0x92,
  '\u201c': 0x93,
  '\u201d': 0x94,
  '\u2022': 0x95,
  '\u2013': 0x96,
  '\u2014': 0x97,
  '\u02dc': 0x98,
  '\u2122': 0x99,
  '\u0161': 0x9a,
  '\u203a': 0x9b,
  '\u0153': 0x9c,
  '\u017e': 0x9e,
  '\u0178': 0x9f,
  '\u00a0': 0x20,
}

interface RenderLine {
  text: string
  size: number
  bold: boolean
  color: readonly [number, number, number]
  gapBefore: number
  baseline: number
}

interface LineOptions {
  size: number
  bold?: boolean
  color?: readonly [number, number, number]
  gapBefore?: number
  prefix?: string
}

function toWinAnsi(value: string): string {
  let result = ''

  for (const character of value.replace(/\s+/g, ' ').trim()) {
    const code = character.codePointAt(0) ?? 63

    if (code === 32 || (code >= 33 && code <= 126) || (code >= 160 && code <= 255)) {
      result += character
      continue
    }

    const mapped = WIN_ANSI_MAP[character]
    result += mapped === undefined ? '?' : String.fromCharCode(mapped)
  }

  return result || ' '
}

function escapePdfString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function estimateTextWidth(value: string, size: number): number {
  return value.length * size * 0.52
}

function wrapText(value: string, size: number): string[] {
  const words = value.replace(/\s+/g, ' ').trim().split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word

    if (estimateTextWidth(candidate, size) <= CONTENT_WIDTH) {
      current = candidate
      continue
    }

    if (current) {
      lines.push(current)
    }

    if (estimateTextWidth(word, size) <= CONTENT_WIDTH) {
      current = word
      continue
    }

    let chunk = ''

    for (const character of word) {
      if (estimateTextWidth(chunk + character, size) <= CONTENT_WIDTH) {
        chunk += character
        continue
      }

      lines.push(chunk)
      chunk = character
    }

    current = chunk
  }

  if (current) {
    lines.push(current)
  }

  return lines.length > 0 ? lines : [' ']
}

function pushWrappedLine(lines: RenderLine[], text: string, options: LineOptions): void {
  const content = options.prefix ? `${options.prefix}${text}` : text
  const wrapped = wrapText(content, options.size)

  wrapped.forEach((line, index) => {
    lines.push({
      text: line,
      size: options.size,
      bold: options.bold ?? false,
      color: options.color ?? BODY_COLOR,
      gapBefore: index === 0 ? (options.gapBefore ?? 0) : 0,
      baseline: 0,
    })
  })
}

function pushSection(lines: RenderLine[], section: DownloadSection): void {
  pushWrappedLine(lines, section.heading, {
    size: 12,
    bold: true,
    color: TITLE_COLOR,
    gapBefore: 18,
  })

  for (const paragraph of section.paragraphs ?? []) {
    pushWrappedLine(lines, paragraph, { size: 10, gapBefore: 6 })
  }

  for (const bullet of section.bullets ?? []) {
    pushWrappedLine(lines, bullet, { size: 10, gapBefore: 5, prefix: '\u2022 ' })
  }
}

function buildRenderLines(content: DownloadContent): RenderLine[] {
  const lines: RenderLine[] = []

  pushWrappedLine(lines, content.title, { size: 20, bold: true, color: TITLE_COLOR })

  if (content.subtitle) {
    pushWrappedLine(lines, content.subtitle, {
      size: 12,
      color: [0.28, 0.31, 0.36],
      gapBefore: 8,
    })
  }

  for (const metaLine of content.meta ?? []) {
    pushWrappedLine(lines, metaLine, { size: 9, color: MUTED_COLOR, gapBefore: 4 })
  }

  for (const section of content.sections) {
    pushSection(lines, section)
  }

  return lines
}

function paginate(lines: readonly RenderLine[]): RenderLine[][] {
  const pages: RenderLine[][] = []
  let currentPage: RenderLine[] = []
  let cursor = TOP_Y

  for (const line of lines) {
    const lineHeight = Math.ceil(line.size * 1.45)
    const requiredHeight = line.gapBefore + lineHeight

    if (currentPage.length > 0 && cursor - requiredHeight < BOTTOM_Y) {
      pages.push(currentPage)
      currentPage = []
      cursor = TOP_Y
    }

    cursor -= line.gapBefore
    currentPage.push({ ...line, baseline: cursor })
    cursor -= lineHeight
  }

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return pages.length > 0 ? pages : [[]]
}

function buildPageStream(
  lines: readonly RenderLine[],
  pageNumber: number,
  totalPages: number,
  footer: string,
): string {
  const commands: string[] = ['BT']

  for (const line of lines) {
    commands.push(`/${line.bold ? 'F2' : 'F1'} ${line.size} Tf`)
    commands.push(`${line.color[0]} ${line.color[1]} ${line.color[2]} rg`)
    commands.push(`1 0 0 1 ${MARGIN} ${line.baseline} Tm`)
    commands.push(`(${escapePdfString(toWinAnsi(line.text))}) Tj`)
  }

  const footerText = toWinAnsi(`${footer} \u00b7 Página ${pageNumber} de ${totalPages}`)
  const footerX = Math.max(MARGIN, (PAGE_WIDTH - estimateTextWidth(footerText, 8)) / 2)

  commands.push('/F1 8 Tf')
  commands.push(`${FOOTER_COLOR[0]} ${FOOTER_COLOR[1]} ${FOOTER_COLOR[2]} rg`)
  commands.push(`1 0 0 1 ${footerX.toFixed(2)} 36 Tm`)
  commands.push(`(${escapePdfString(footerText)}) Tj`)
  commands.push('ET')

  return commands.join('\n')
}

export function createPdfBlob(content: DownloadContent): Blob {
  const pages = paginate(buildRenderLines(content))
  const pageObjectIds = pages.map((_, index) => 5 + index * 2)
  const contentObjectIds = pages.map((_, index) => 6 + index * 2)

  const objects: string[] = []
  objects[0] = '<< /Type /Catalog /Pages 2 0 R >>'
  objects[1] = `<< /Type /Pages /Kids [${pageObjectIds
    .map((id) => `${id} 0 R`)
    .join(' ')}] /Count ${pages.length} >>`
  objects[2] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
  objects[3] =
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'

  pages.forEach((lines, index) => {
    const pageId = pageObjectIds[index]
    const contentId = contentObjectIds[index]
    const stream = buildPageStream(lines, index + 1, pages.length, content.footer)

    objects[pageId - 1] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`
    objects[contentId - 1] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  })

  let document = `%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n`
  const offsets: number[] = []

  objects.forEach((body, index) => {
    offsets[index] = document.length
    document += `${index + 1} 0 obj\n${body}\nendobj\n`
  })

  const xrefOffset = document.length
  document += `xref\n0 ${objects.length + 1}\n`
  document += '0000000000 65535 f\r\n'

  for (const offset of offsets) {
    document += `${String(offset).padStart(10, '0')} 00000 n\r\n`
  }

  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n`
  document += `startxref\n${xrefOffset}\n%%EOF`

  const bytes = Uint8Array.from(document, (character) => character.charCodeAt(0) & 0xff)

  return new Blob([bytes], { type: 'application/pdf' })
}

export function downloadPdf(content: DownloadContent, filename: string): void {
  const blob = createPdfBlob(content)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
