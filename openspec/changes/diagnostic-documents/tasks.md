# Tasks

## 1. Contratos, conteúdo e serviços

- [x] 1.1 Enriquecer `IssueCategory` e `DiagnosticReport` com severidade, categoria, explicação, recomendação e resumo.
- [x] 1.2 Criar `src/types/documents.types.ts` com documentos, relatórios, etapas e resultado da análise.
- [x] 1.3 Criar `src/content/documents.ts` com copy em pt-BR, documentos de exemplo, etapas, modelos e rótulos de severidade.
- [x] 1.4 Criar `src/lib/documents.ts` com formatação de datas, pluralização e slug de nomes.
- [x] 1.5 Criar `src/lib/pdf.ts` com geração local de PDF e download por Blob.
- [x] 1.6 Criar `src/mocks/diagnostics.ts`, mover o estado do diagnóstico e atualizar `src/mocks/api.ts` e `src/services/diagnostic.ts`.
- [x] 1.7 Criar `src/mocks/documents.ts` e `src/services/documents.ts` com estado em memória e análise simulada por etapas.

## 2. Componentes da central

- [x] 2.1 Criar `FindingsList` com severidade, explicação expansível e recomendação.
- [x] 2.2 Criar `AnalysisProgress` com barra, etapas, `aria-live` e suporte a `motion-reduce`.
- [x] 2.3 Criar `DocumentUploadCard` com documento de exemplo e aviso de simulação.
- [x] 2.4 Criar `DocumentsList` com status dos documentos fictícios.
- [x] 2.5 Criar `DocumentAnalysisResult` com score, data, contagem e achados.
- [x] 2.6 Criar `DownloadCenter` com relatórios, modelos, loading e estados de vazio/erro/sucesso.

## 3. Página, rotas e dashboard

- [x] 3.1 Criar `src/pages/Documents.tsx` com carregamento, erro, análise, resultado e downloads.
- [x] 3.2 Adicionar a rota `/documents` em `src/routes.tsx`.
- [x] 3.3 Adicionar o link “Documentos” ao `ProductHeader`.
- [x] 3.4 Atualizar o `/dashboard` para usar o `FindingsList` enriquecido e linkar para a central.

## 4. Acessibilidade e responsividade

- [x] 4.1 Verificar um único `h1`, hierarquia de títulos, landmarks e nomes acessíveis.
- [x] 4.2 Verificar foco visível, ordem de tabulação, `details`, botões e link do cabeçalho.
- [x] 4.3 Verificar anúncio das etapas, estados de sucesso/erro e `motion-reduce`.
- [x] 4.4 Verificar o layout em 320px, 375px, 768px, 1024px e 1440px, sem rolagem horizontal.

## 5. Documentação e verificação

- [x] 5.1 Atualizar `DESIGN.md` com a Central de Documentos, achados, animação e dívidas.
- [x] 5.2 Atualizar `AGENTS.md` com as regras de análise simulada e PDF local.
- [x] 5.3 Atualizar `README.md` com a rota, o fluxo e as limitações.
- [x] 5.4 Rodar `npm run lint`, `npm run build` e Prettier nos arquivos alterados.
- [x] 5.5 Verificar a análise, os downloads, o dashboard, os temas e os breakpoints no navegador.
- [x] 5.6 Revisar o diff, publicar a branch e abrir PR para revisão.

## 6. Ajustes de UX e formatos de download

- [x] 6.1 Rolar a tela até o cartão de processamento ao iniciar a análise, respeitando `prefers-reduced-motion`.
- [x] 6.2 Criar `DropdownMenu` acessível e usar um menu de formatos por item da Central de Downloads.
- [x] 6.3 Oferecer PDF, DOCX e TXT com descrição de uso, estado pendente e extensão correta.
- [x] 6.4 Criar `src/lib/docx.ts` com pacote OOXML/ZIP válido e `src/lib/text.ts` com texto UTF-8.
- [x] 6.5 Centralizar a geração e o download em `src/lib/download.ts` e atualizar mocks e tipos.
- [x] 6.6 Atualizar `README.md`, `DESIGN.md`, `AGENTS.md` e os artefatos OpenSpec.
- [x] 6.7 Validar DOCX (ZIP/XML), TXT e PDF, além do scroll e do layout em desktop e mobile.
