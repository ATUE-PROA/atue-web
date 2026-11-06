import type { DownloadContent } from '@/types/documents.types'

const DOS_TIME = 0
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1
const UTF8_FLAG = 0x0800
const STORE_METHOD = 0

const encoder = new TextEncoder()

const CONTENT_TYPES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`

const ROOT_RELS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`

interface ZipEntry {
  name: string
  data: Uint8Array
}

interface RunOptions {
  bold?: boolean
  size?: number
  color?: string
}

interface ParagraphOptions extends RunOptions {
  spacingBefore?: number
  spacingAfter?: number
  indent?: number
}

let crcTable: Uint32Array | null = null

function getCrcTable(): Uint32Array {
  if (crcTable) {
    return crcTable
  }

  const table = new Uint32Array(256)

  for (let index = 0; index < 256; index += 1) {
    let value = index

    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
    }

    table[index] = value >>> 0
  }

  crcTable = table
  return table
}

function crc32(bytes: Uint8Array): number {
  const table = getCrcTable()
  let crc = 0xffffffff

  for (const byte of bytes) {
    crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  }

  return (crc ^ 0xffffffff) >>> 0
}

function concat(chunks: readonly Uint8Array[]): Uint8Array<ArrayBuffer> {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const result = new Uint8Array(total)
  let offset = 0

  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }

  return result
}

function createZip(entries: readonly ZipEntry[]): Uint8Array<ArrayBuffer> {
  const localChunks: Uint8Array[] = []
  const centralChunks: Uint8Array[] = []
  let offset = 0

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name)
    const checksum = crc32(entry.data)
    const size = entry.data.length

    const localHeader = new Uint8Array(30 + nameBytes.length)
    const localView = new DataView(localHeader.buffer)
    localView.setUint32(0, 0x04034b50, true)
    localView.setUint16(4, 20, true)
    localView.setUint16(6, UTF8_FLAG, true)
    localView.setUint16(8, STORE_METHOD, true)
    localView.setUint16(10, DOS_TIME, true)
    localView.setUint16(12, DOS_DATE, true)
    localView.setUint32(14, checksum, true)
    localView.setUint32(18, size, true)
    localView.setUint32(22, size, true)
    localView.setUint16(26, nameBytes.length, true)
    localView.setUint16(28, 0, true)
    localHeader.set(nameBytes, 30)

    localChunks.push(localHeader, entry.data)

    const centralHeader = new Uint8Array(46 + nameBytes.length)
    const centralView = new DataView(centralHeader.buffer)
    centralView.setUint32(0, 0x02014b50, true)
    centralView.setUint16(4, 20, true)
    centralView.setUint16(6, 20, true)
    centralView.setUint16(8, UTF8_FLAG, true)
    centralView.setUint16(10, STORE_METHOD, true)
    centralView.setUint16(12, DOS_TIME, true)
    centralView.setUint16(14, DOS_DATE, true)
    centralView.setUint32(16, checksum, true)
    centralView.setUint32(20, size, true)
    centralView.setUint32(24, size, true)
    centralView.setUint16(28, nameBytes.length, true)
    centralView.setUint16(30, 0, true)
    centralView.setUint16(32, 0, true)
    centralView.setUint16(34, 0, true)
    centralView.setUint16(36, 0, true)
    centralView.setUint32(38, 0, true)
    centralView.setUint32(42, offset, true)
    centralHeader.set(nameBytes, 46)

    centralChunks.push(centralHeader)
    offset += localHeader.length + entry.data.length
  }

  const centralSize = centralChunks.reduce((total, chunk) => total + chunk.length, 0)
  const endRecord = new Uint8Array(22)
  const endView = new DataView(endRecord.buffer)
  endView.setUint32(0, 0x06054b50, true)
  endView.setUint16(4, 0, true)
  endView.setUint16(6, 0, true)
  endView.setUint16(8, entries.length, true)
  endView.setUint16(10, entries.length, true)
  endView.setUint32(12, centralSize, true)
  endView.setUint32(16, offset, true)
  endView.setUint16(20, 0, true)

  return concat([...localChunks, ...centralChunks, endRecord])
}

function stripControlCharacters(value: string): string {
  let result = ''

  for (const character of value) {
    const code = character.codePointAt(0) ?? 0

    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      continue
    }

    result += character
  }

  return result
}

function escapeXml(value: string): string {
  return stripControlCharacters(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildRunXml(text: string, options: RunOptions): string {
  const size = options.size ?? 20
  const properties = [
    options.bold ? '<w:b/>' : '',
    `<w:sz w:val="${size}"/>`,
    `<w:szCs w:val="${size}"/>`,
    options.color ? `<w:color w:val="${options.color}"/>` : '',
  ].join('')

  const content = text
    .split('\n')
    .map(
      (part, index) =>
        `${index > 0 ? '<w:br/>' : ''}<w:t xml:space="preserve">${escapeXml(part)}</w:t>`,
    )
    .join('')

  return `<w:r><w:rPr>${properties}</w:rPr>${content}</w:r>`
}

function buildParagraphXml(text: string, options: ParagraphOptions = {}): string {
  const spacing =
    options.spacingBefore !== undefined || options.spacingAfter !== undefined
      ? `<w:spacing w:before="${options.spacingBefore ?? 0}" w:after="${options.spacingAfter ?? 0}"/>`
      : ''
  const indent =
    options.indent !== undefined ? `<w:ind w:left="${options.indent}" w:hanging="180"/>` : ''

  return `<w:p><w:pPr>${spacing}${indent}</w:pPr>${buildRunXml(text, options)}</w:p>`
}

function buildDocumentXml(content: DownloadContent): string {
  const paragraphs: string[] = []

  paragraphs.push(buildParagraphXml(content.title, { bold: true, size: 40, color: '1F2937' }))

  if (content.subtitle) {
    paragraphs.push(
      buildParagraphXml(content.subtitle, { size: 24, color: '475569', spacingBefore: 120 }),
    )
  }

  for (const metaLine of content.meta ?? []) {
    paragraphs.push(buildParagraphXml(metaLine, { size: 18, color: '6B7280', spacingBefore: 60 }))
  }

  for (const section of content.sections) {
    paragraphs.push(
      buildParagraphXml(section.heading, {
        bold: true,
        size: 24,
        color: '1F2937',
        spacingBefore: 320,
        spacingAfter: 80,
      }),
    )

    for (const paragraph of section.paragraphs ?? []) {
      paragraphs.push(buildParagraphXml(paragraph, { size: 20, spacingAfter: 120 }))
    }

    for (const bullet of section.bullets ?? []) {
      paragraphs.push(
        buildParagraphXml(`\u2022 ${bullet}`, { size: 20, spacingAfter: 100, indent: 360 }),
      )
    }
  }

  paragraphs.push(
    buildParagraphXml(content.footer, { size: 16, color: '6B7280', spacingBefore: 360 }),
  )

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs.join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>`
}

export function createDocxBlob(content: DownloadContent): Blob {
  const zip = createZip([
    { name: '[Content_Types].xml', data: encoder.encode(CONTENT_TYPES_XML) },
    { name: '_rels/.rels', data: encoder.encode(ROOT_RELS_XML) },
    { name: 'word/document.xml', data: encoder.encode(buildDocumentXml(content)) },
  ])

  return new Blob([zip], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
}
