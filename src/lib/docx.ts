import type { DownloadContent, DownloadMetric } from '@/types/documents.types'

const DOS_TIME = 0
const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1
const UTF8_FLAG = 0x0800
const STORE_METHOD = 0
const CONTENT_WIDTH_TWIPS = 9638

const encoder = new TextEncoder()

const CONTENT_TYPES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`

const ROOT_RELS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`

const DOCUMENT_RELS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/><Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>`

const SETTINGS_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:updateFields w:val="true"/><w:defaultTabStop w:val="708"/><w:characterSpacingControl w:val="doNotCompress"/></w:settings>`

const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="21"/><w:szCs w:val="21"/><w:color w:val="1F2937"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Subtitle"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="120"/><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="48"/><w:szCs w:val="48"/><w:color w:val="111827"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:next w:val="Meta"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="160"/><w:keepNext/></w:pPr><w:rPr><w:sz w:val="24"/><w:szCs w:val="24"/><w:color w:val="475569"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Meta"><w:name w:val="Meta"/><w:basedOn w:val="Normal"/><w:next w:val="BodyText"/><w:pPr><w:spacing w:before="0" w:after="40"/></w:pPr><w:rPr><w:sz w:val="17"/><w:szCs w:val="17"/><w:color w:val="6B7280"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="BodyText"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="360" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/><w:szCs w:val="28"/><w:color w:val="1F2937"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="BodyText"><w:name w:val="Body Text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="120"/></w:pPr><w:rPr><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="BulletText"><w:name w:val="Bullet Text"/><w:basedOn w:val="BodyText"/><w:pPr><w:spacing w:before="0" w:after="60"/><w:ind w:left="360" w:hanging="220"/></w:pPr></w:style><w:style w:type="paragraph" w:styleId="MetricLabel"><w:name w:val="Metric Label"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="20"/></w:pPr><w:rPr><w:b/><w:sz w:val="15"/><w:szCs w:val="15"/><w:color w:val="6B7280"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="MetricValue"><w:name w:val="Metric Value"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="20"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/><w:szCs w:val="24"/><w:color w:val="111827"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="MetricHint"><w:name w:val="Metric Hint"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="0"/></w:pPr><w:rPr><w:sz w:val="15"/><w:szCs w:val="15"/><w:color w:val="6B7280"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Notice"><w:name w:val="Notice"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="6" w:color="BFDBFE"/><w:bottom w:val="single" w:sz="4" w:space="6" w:color="BFDBFE"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="EFF6FF"/><w:spacing w:before="360" w:after="0"/><w:ind w:left="120" w:right="120"/></w:pPr><w:rPr><w:i/><w:sz w:val="18"/><w:szCs w:val="18"/><w:color w:val="475569"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Header"><w:name w:val="Header"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="D9DEE7"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="${CONTENT_WIDTH_TWIPS}"/></w:tabs><w:spacing w:before="0" w:after="80"/></w:pPr><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/><w:color w:val="6B7280"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Footer"><w:name w:val="Footer"/><w:basedOn w:val="Normal"/><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="D9DEE7"/></w:pBdr><w:tabs><w:tab w:val="right" w:pos="${CONTENT_WIDTH_TWIPS}"/></w:tabs><w:spacing w:before="80" w:after="0"/></w:pPr><w:rPr><w:sz w:val="16"/><w:szCs w:val="16"/><w:color w:val="6B7280"/></w:rPr></w:style></w:styles>`

const NUMBERING_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="\u2022"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="360" w:hanging="220"/></w:pPr><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:color w:val="2563EB"/></w:rPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`

interface ZipEntry {
  name: string
  data: Uint8Array
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

function buildRuns(text: string): string {
  return text
    .split('\n')
    .map(
      (part, index) =>
        `${index > 0 ? '<w:br/>' : ''}<w:t xml:space="preserve">${escapeXml(part)}</w:t>`,
    )
    .join('')
}

function buildParagraph(text: string, styleId: string, bullet = false): string {
  const numbering = bullet ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : ''

  return `<w:p><w:pPr><w:pStyle w:val="${styleId}"/>${numbering}</w:pPr><w:r>${buildRuns(text)}</w:r></w:p>`
}

function buildMetricCell(metric: DownloadMetric | null): string {
  if (!metric) {
    return `<w:tc><w:tcPr><w:tcW w:w="${CONTENT_WIDTH_TWIPS / 2}" w:type="dxa"/></w:tcPr><w:p/></w:tc>`
  }

  const hint = metric.hint
    ? `<w:p><w:pPr><w:pStyle w:val="MetricHint"/></w:pPr><w:r>${buildRuns(metric.hint)}</w:r></w:p>`
    : ''

  return `<w:tc><w:tcPr><w:tcW w:w="${CONTENT_WIDTH_TWIPS / 2}" w:type="dxa"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="D9DEE7"/><w:left w:val="single" w:sz="4" w:space="0" w:color="D9DEE7"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="D9DEE7"/><w:right w:val="single" w:sz="4" w:space="0" w:color="D9DEE7"/></w:tcBorders><w:shd w:val="clear" w:color="auto" w:fill="F5F8FF"/><w:tcMar><w:top w:w="120" w:type="dxa"/><w:left w:w="160" w:type="dxa"/><w:bottom w:w="120" w:type="dxa"/><w:right w:w="160" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:pPr><w:pStyle w:val="MetricLabel"/></w:pPr><w:r>${buildRuns(metric.label.toUpperCase())}</w:r></w:p><w:p><w:pPr><w:pStyle w:val="MetricValue"/></w:pPr><w:r>${buildRuns(metric.value)}</w:r></w:p>${hint}</w:tc>`
}

function buildMetricsTable(metrics: readonly DownloadMetric[]): string {
  const rows: string[] = []

  for (let index = 0; index < metrics.length; index += 2) {
    rows.push(
      `<w:tr><w:trPr><w:cantSplit/></w:trPr>${buildMetricCell(metrics[index] ?? null)}${buildMetricCell(metrics[index + 1] ?? null)}</w:tr>`,
    )
  }

  return `<w:tbl><w:tblPr><w:tblW w:w="${CONTENT_WIDTH_TWIPS}" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="0" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="0" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="${CONTENT_WIDTH_TWIPS / 2}"/><w:gridCol w:w="${CONTENT_WIDTH_TWIPS / 2}"/></w:tblGrid>${rows.join('')}</w:tbl><w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>`
}

function buildDocumentXml(content: DownloadContent): string {
  const paragraphs: string[] = []

  paragraphs.push(buildParagraph(content.title, 'Title'))

  if (content.subtitle) {
    paragraphs.push(buildParagraph(content.subtitle, 'Subtitle'))
  }

  const metaLines: string[] = []

  if (content.reference) {
    metaLines.push(`Referência: ${content.reference}`)
  }

  if (content.organization) {
    metaLines.push(`Organização: ${content.organization}`)
  }

  if (content.generatedAt) {
    metaLines.push(`Gerado em: ${formatIsoDateTime(content.generatedAt)}`)
  }

  if (content.meta) {
    metaLines.push(...content.meta)
  }

  for (const line of metaLines) {
    paragraphs.push(buildParagraph(line, 'Meta'))
  }

  if (content.metrics && content.metrics.length > 0) {
    paragraphs.push(buildMetricsTable(content.metrics))
  }

  for (const section of content.sections) {
    paragraphs.push(buildParagraph(section.heading, 'Heading1'))

    for (const paragraph of section.paragraphs ?? []) {
      paragraphs.push(buildParagraph(paragraph, 'BodyText'))
    }

    for (const bullet of section.bullets ?? []) {
      paragraphs.push(buildParagraph(bullet, 'BulletText', true))
    }
  }

  paragraphs.push(buildParagraph(content.footer, 'Notice'))

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${paragraphs.join('')}<w:sectPr><w:headerReference w:type="default" r:id="rId3"/><w:footerReference w:type="default" r:id="rId4"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/><w:cols w:space="708"/><w:docGrid w:linePitch="360"/></w:sectPr></w:body></w:document>`
}

function formatIsoDateTime(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function buildHeaderXml(content: DownloadContent): string {
  const documentType = escapeXml(content.documentType ?? 'Documento de demonstração')

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Header"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="2563EB"/></w:rPr><w:t>ATUE</w:t></w:r><w:r><w:tab/></w:r><w:r><w:t xml:space="preserve">${documentType} · Documento de demonstração</w:t></w:r></w:p></w:hdr>`
}

function buildFooterXml(content: DownloadContent): string {
  const footer = escapeXml(content.footer)

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:pStyle w:val="Footer"/></w:pPr><w:r><w:t xml:space="preserve">${footer}</w:t></w:r><w:r><w:tab/></w:r><w:r><w:t xml:space="preserve">Página </w:t></w:r><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r><w:r><w:t xml:space="preserve"> de </w:t></w:r><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> NUMPAGES </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`
}

function buildCoreXml(content: DownloadContent): string {
  const timestamp = content.generatedAt ?? '2026-09-30T09:00:00.000Z'
  const date = new Date(timestamp)
  const iso = Number.isNaN(date.getTime()) ? '2026-09-30T09:00:00Z' : date.toISOString()

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(content.title)}</dc:title><dc:subject>${escapeXml(content.documentType ?? 'Documento de demonstração')}</dc:subject><dc:creator>ATUE</dc:creator><cp:keywords>demonstração, conformidade, LGPD</cp:keywords><dc:description>${escapeXml(content.footer)}</dc:description><dcterms:created xsi:type="dcterms:W3CDTF">${iso}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${iso}</dcterms:modified></cp:coreProperties>`
}

const APP_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>ATUE</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><Company>ATUE</Company><AppVersion>1.0</AppVersion></Properties>`

export function createDocxBlob(content: DownloadContent): Blob {
  const entries: ZipEntry[] = [
    { name: '[Content_Types].xml', data: encoder.encode(CONTENT_TYPES_XML) },
    { name: '_rels/.rels', data: encoder.encode(ROOT_RELS_XML) },
    { name: 'docProps/core.xml', data: encoder.encode(buildCoreXml(content)) },
    { name: 'docProps/app.xml', data: encoder.encode(APP_XML) },
    { name: 'word/document.xml', data: encoder.encode(buildDocumentXml(content)) },
    { name: 'word/styles.xml', data: encoder.encode(STYLES_XML) },
    { name: 'word/numbering.xml', data: encoder.encode(NUMBERING_XML) },
    { name: 'word/header1.xml', data: encoder.encode(buildHeaderXml(content)) },
    { name: 'word/footer1.xml', data: encoder.encode(buildFooterXml(content)) },
    { name: 'word/settings.xml', data: encoder.encode(SETTINGS_XML) },
    { name: 'word/_rels/document.xml.rels', data: encoder.encode(DOCUMENT_RELS_XML) },
  ]

  return new Blob([createZip(entries)], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  })
}
