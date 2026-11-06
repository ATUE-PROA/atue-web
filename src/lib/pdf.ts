import { formatDocumentDateTime } from '@/lib/documents'
import type { DownloadContent, DownloadMetric } from '@/types/documents.types'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 52
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2
const FIRST_TOP = 792
const NEXT_TOP = 758
const BOTTOM_Y = 82

const BRAND_COLOR = [0.145, 0.388, 0.922] as const
const TITLE_COLOR = [0.07, 0.09, 0.15] as const
const BODY_COLOR = [0.16, 0.18, 0.22] as const
const MUTED_COLOR = [0.42, 0.45, 0.5] as const
const FAINT_COLOR = [0.55, 0.58, 0.63] as const
const RULE_COLOR = [0.85, 0.87, 0.91] as const
const METRIC_FILL = [0.955, 0.965, 0.99] as const

const BODY_SIZE = 9.6
const BODY_LINE_HEIGHT = 14

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

type AnyBlock =
  | { type: 'eyebrow'; lines: string[] }
  | { type: 'title'; lines: string[] }
  | { type: 'subtitle'; lines: string[] }
  | { type: 'meta'; lines: string[] }
  | { type: 'section'; lines: string[] }
  | { type: 'paragraph'; lines: string[] }
  | { type: 'bullet'; lines: string[] }
  | { type: 'metrics'; metrics: readonly DownloadMetric[] }

interface LaidOutBlock {
  block: AnyBlock
  top: number
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

function estimateTextWidth(value: string, size: number, bold = false): number {
  return value.length * size * (bold ? 0.545 : 0.512)
}

function wrapText(value: string, size: number, width: number, bold = false): string[] {
  const words = value.replace(/\s+/g, ' ').trim().split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word

    if (estimateTextWidth(candidate, size, bold) <= width) {
      current = candidate
      continue
    }

    if (current) {
      lines.push(current)
    }

    if (estimateTextWidth(word, size, bold) <= width) {
      current = word
      continue
    }

    let chunk = ''

    for (const character of word) {
      if (estimateTextWidth(chunk + character, size, bold) <= width) {
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

function truncateToWidth(value: string, size: number, width: number, bold = false): string {
  if (estimateTextWidth(value, size, bold) <= width) {
    return value
  }

  let result = value

  while (result.length > 1 && estimateTextWidth(`${result}\u2026`, size, bold) > width) {
    result = result.slice(0, -1)
  }

  return `${result.trimEnd()}\u2026`
}

function buildMetaLines(content: DownloadContent): string[] {
  const lines: string[] = []

  if (content.reference) {
    lines.push(`Referência: ${content.reference}`)
  }

  if (content.organization) {
    lines.push(`Organização: ${content.organization}`)
  }

  if (content.generatedAt) {
    lines.push(`Gerado em: ${formatDocumentDateTime(content.generatedAt)}`)
  }

  if (content.meta) {
    lines.push(...content.meta)
  }

  return lines
}

function buildBlocks(content: DownloadContent): AnyBlock[] {
  const blocks: AnyBlock[] = [
    {
      type: 'eyebrow',
      lines: wrapText(
        `ATUE · ${content.documentType ?? 'Documento de demonstração'}`,
        8,
        CONTENT_WIDTH,
        true,
      ),
    },
    {
      type: 'title',
      lines: wrapText(content.title, 21, CONTENT_WIDTH, true),
    },
  ]

  if (content.subtitle) {
    blocks.push({
      type: 'subtitle',
      lines: wrapText(content.subtitle, 10.8, CONTENT_WIDTH),
    })
  }

  const metaLines = buildMetaLines(content)

  if (metaLines.length > 0) {
    blocks.push({
      type: 'meta',
      lines: metaLines.flatMap((line) => wrapText(line, 8.4, CONTENT_WIDTH)),
    })
  }

  if (content.metrics && content.metrics.length > 0) {
    const metrics = content.metrics.map((metric) => ({
      ...metric,
      value: truncateToWidth(metric.value, 11.5, (CONTENT_WIDTH - 10) / 2 - 20, true),
    }))

    blocks.push({ type: 'metrics', metrics })
  }

  for (const section of content.sections) {
    blocks.push({
      type: 'section',
      lines: wrapText(section.heading, 11.8, CONTENT_WIDTH - 12, true),
    })

    for (const paragraph of section.paragraphs ?? []) {
      blocks.push({
        type: 'paragraph',
        lines: wrapText(paragraph, BODY_SIZE, CONTENT_WIDTH),
      })
    }

    for (const bullet of section.bullets ?? []) {
      blocks.push({
        type: 'bullet',
        lines: wrapText(bullet, BODY_SIZE, CONTENT_WIDTH - 14),
      })
    }
  }

  return blocks
}

function getGapBefore(block: AnyBlock): number {
  if (block.type === 'section') {
    return 14
  }

  if (block.type === 'metrics') {
    return 12
  }

  if (block.type === 'meta' || block.type === 'subtitle') {
    return 4
  }

  if (block.type === 'bullet') {
    return 1
  }

  return 0
}

function getBlockHeight(block: AnyBlock): number {
  if (block.type === 'metrics') {
    const rows = Math.ceil(block.metrics.length / 2)

    return rows * 58 - 6 + 12
  }

  const lineCount = block.lines.length

  switch (block.type) {
    case 'eyebrow':
      return lineCount * 10 + 2
    case 'title':
      return lineCount * 26 + 6
    case 'subtitle':
      return lineCount * 15 + 4
    case 'meta':
      return lineCount * 12 + 4
    case 'section':
      return 20 + 4
    case 'bullet':
      return lineCount * 13.5 + 2
    default:
      return lineCount * BODY_LINE_HEIGHT + 4
  }
}

function paginate(blocks: readonly AnyBlock[]): LaidOutBlock[][] {
  const pages: LaidOutBlock[][] = []
  let currentPage: LaidOutBlock[] = []
  let cursor = FIRST_TOP

  for (const block of blocks) {
    const gapBefore = getGapBefore(block)
    const height = getBlockHeight(block)
    const keepWithNext = block.type === 'section' ? 42 : 0
    const required = gapBefore + height + keepWithNext

    if (currentPage.length > 0 && cursor - required < BOTTOM_Y) {
      pages.push(currentPage)
      currentPage = []
      cursor = NEXT_TOP
    }

    const top = cursor - gapBefore
    currentPage.push({ block, top })
    cursor = top - height
  }

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return pages.length > 0 ? pages : [[]]
}

function textCommand(
  text: string,
  x: number,
  y: number,
  size: number,
  bold: boolean,
  color: readonly [number, number, number],
  align: 'left' | 'right' = 'left',
): string {
  const xPosition = align === 'right' ? x - estimateTextWidth(text, size, bold) : x

  return [
    'BT',
    `/${bold ? 'F2' : 'F1'} ${size} Tf`,
    `${color[0]} ${color[1]} ${color[2]} rg`,
    `1 0 0 1 ${xPosition.toFixed(2)} ${y.toFixed(2)} Tm`,
    `(${escapePdfString(toWinAnsi(text))}) Tj`,
    'ET',
  ].join('\n')
}

function rectCommand(
  x: number,
  y: number,
  width: number,
  height: number,
  fill: readonly [number, number, number] | null,
  stroke?: readonly [number, number, number],
): string {
  const parts = ['q']

  if (fill) {
    parts.push(`${fill[0]} ${fill[1]} ${fill[2]} rg`)
  }

  if (stroke) {
    parts.push(`${stroke[0]} ${stroke[1]} ${stroke[2]} RG`, '0.6 w')
  }

  parts.push(`${x.toFixed(2)} ${y.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re`)

  if (fill) {
    parts.push('f')
  }

  if (stroke) {
    parts.push('S')
  }

  parts.push('Q')

  return parts.join('\n')
}

function lineCommand(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: readonly [number, number, number],
  width = 0.6,
): string {
  return [
    'q',
    `${color[0]} ${color[1]} ${color[2]} RG`,
    `${width} w`,
    `${x1.toFixed(2)} ${y1.toFixed(2)} m`,
    `${x2.toFixed(2)} ${y2.toFixed(2)} l`,
    'S',
    'Q',
  ].join('\n')
}

function renderBlock(block: AnyBlock, top: number): string[] {
  const commands: string[] = []

  switch (block.type) {
    case 'eyebrow':
      block.lines.forEach((line, index) => {
        commands.push(
          textCommand(line.toUpperCase(), MARGIN, top - 7 - index * 10, 8, true, BRAND_COLOR),
        )
      })
      break
    case 'title':
      block.lines.forEach((line, index) => {
        commands.push(textCommand(line, MARGIN, top - 19 - index * 26, 21, true, TITLE_COLOR))
      })
      break
    case 'subtitle':
      block.lines.forEach((line, index) => {
        commands.push(
          textCommand(line, MARGIN, top - 8 - index * 15, 10.8, false, [0.28, 0.31, 0.36]),
        )
      })
      break
    case 'meta':
      block.lines.forEach((line, index) => {
        commands.push(textCommand(line, MARGIN, top - 7 - index * 12, 8.4, false, MUTED_COLOR))
      })
      break
    case 'section':
      commands.push(rectCommand(MARGIN, top - 10, 3, 11, BRAND_COLOR))
      block.lines.forEach((line, index) => {
        commands.push(textCommand(line, MARGIN + 10, top - 9 - index * 19, 11.8, true, TITLE_COLOR))
      })
      commands.push(lineCommand(MARGIN, top - 17, PAGE_WIDTH - MARGIN, top - 17, RULE_COLOR, 0.5))
      break
    case 'paragraph':
      block.lines.forEach((line, index) => {
        commands.push(
          textCommand(
            line,
            MARGIN,
            top - 9 - index * BODY_LINE_HEIGHT,
            BODY_SIZE,
            false,
            BODY_COLOR,
          ),
        )
      })
      break
    case 'bullet':
      block.lines.forEach((line, index) => {
        if (index === 0) {
          commands.push(textCommand('\u2022', MARGIN + 1, top - 9, BODY_SIZE, true, BRAND_COLOR))
        }

        commands.push(
          textCommand(line, MARGIN + 14, top - 9 - index * 13.5, BODY_SIZE, false, BODY_COLOR),
        )
      })
      break
    case 'metrics': {
      const boxWidth = (CONTENT_WIDTH - 10) / 2
      const boxHeight = 52

      block.metrics.forEach((metric, index) => {
        const column = index % 2
        const row = Math.floor(index / 2)
        const x = MARGIN + column * (boxWidth + 10)
        const boxTop = top - row * 58

        commands.push(
          rectCommand(x, boxTop - boxHeight, boxWidth, boxHeight, METRIC_FILL, RULE_COLOR),
        )
        commands.push(
          textCommand(metric.label.toUpperCase(), x + 10, boxTop - 15, 6.8, true, MUTED_COLOR),
        )
        commands.push(textCommand(metric.value, x + 10, boxTop - 33, 11.5, true, TITLE_COLOR))

        if (metric.hint) {
          commands.push(
            textCommand(
              truncateToWidth(metric.hint, 7.4, boxWidth - 20),
              x + 10,
              boxTop - 45,
              7.4,
              false,
              FAINT_COLOR,
            ),
          )
        }
      })
      break
    }
  }

  return commands
}

function renderHeader(content: DownloadContent): string[] {
  const headerLabel = truncateToWidth(
    content.documentType ?? content.title,
    8,
    CONTENT_WIDTH - 180,
    true,
  )

  return [
    textCommand(headerLabel, MARGIN, 806, 8, true, MUTED_COLOR),
    textCommand(
      'DOCUMENTO DE DEMONSTRAÇÃO',
      PAGE_WIDTH - MARGIN,
      806,
      7,
      true,
      BRAND_COLOR,
      'right',
    ),
    lineCommand(MARGIN, 798, PAGE_WIDTH - MARGIN, 798, RULE_COLOR, 0.5),
  ]
}

function renderFooter(content: DownloadContent, pageNumber: number, totalPages: number): string[] {
  const footerLabel = truncateToWidth(content.footer, 7.4, CONTENT_WIDTH - 120)

  return [
    lineCommand(MARGIN, 58, PAGE_WIDTH - MARGIN, 58, RULE_COLOR, 0.5),
    textCommand(footerLabel, MARGIN, 42, 7.4, false, MUTED_COLOR),
    textCommand(
      `Página ${pageNumber} de ${totalPages}`,
      PAGE_WIDTH - MARGIN,
      42,
      7.4,
      false,
      MUTED_COLOR,
      'right',
    ),
  ]
}

function buildPageStream(
  content: DownloadContent,
  blocks: readonly LaidOutBlock[],
  pageNumber: number,
  totalPages: number,
): string {
  const commands: string[] = []

  if (pageNumber > 1) {
    commands.push(...renderHeader(content))
  }

  for (const { block, top } of blocks) {
    commands.push(...renderBlock(block, top))
  }

  commands.push(...renderFooter(content, pageNumber, totalPages))

  return commands.join('\n')
}

export function createPdfBlob(content: DownloadContent): Blob {
  const pages = paginate(buildBlocks(content))
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

  pages.forEach((blocks, index) => {
    const pageId = pageObjectIds[index]
    const contentId = contentObjectIds[index]
    const stream = buildPageStream(content, blocks, index + 1, pages.length)

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
