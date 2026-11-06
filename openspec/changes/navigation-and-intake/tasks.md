# Tasks

## 1. Navegação entre todas as telas

- [x] 1.1 Centralizar destinos compartilhados em `src/content/navigation.ts`.
- [x] 1.2 Criar `ProductFooter` e `CrossLinks` reutilizáveis.
- [x] 1.3 Conectar painel, documentos, perfil e configurações com rodapé e atalhos contextuais.
- [x] 1.4 Conectar landing, planos, login, cadastro e envio de documentos.
- [x] 1.5 Transformar a página 404 em ponto de continuidade com links úteis.
- [x] 1.6 Exibir ações no resultado da análise e nas preferências de relatório.

## 2. Anexo e análise simulada

- [x] 2.1 Ampliar os tipos com `LocalDocument`, `AnalyzedDocument` e alvo de análise discriminado.
- [x] 2.2 Criar `src/lib/document-intake.ts` com extensões aceitas, limite de 10 MB e validação.
- [x] 2.3 Criar `DocumentIntakeCard` com botão de anexo, troca, remoção, exemplos e avisos.
- [x] 2.4 Permitir seleção de documento de exemplo pela lista lateral.
- [x] 2.5 Atualizar services e mocks para analisar arquivo local ou exemplo com etapas determinísticas.
- [x] 2.6 Exibir origem do documento no resultado e anunciar anexo/remoção em região `status`.
- [x] 2.7 Manter o scroll para o progresso com suporte a `prefers-reduced-motion`.

## 3. Arquivos profissionais

- [x] 3.1 Ampliar `DownloadContent` com tipo, referência, organização, data e métricas.
- [x] 3.2 Reescrever o PDF com capa, métricas, cabeçalho, rodapé, paginação e títulos protegidos.
- [x] 3.3 Reescrever o DOCX com estilos, numeração, tabela, cabeçalho, rodapé, campos de página e propriedades.
- [x] 3.4 Reescrever o TXT com cabeçalho, métricas alinhadas, seções sublinhadas e 78 colunas.
- [x] 3.5 Enriquecer relatórios e modelos com sumário, método, plano de ação, evidências e controle.
- [x] 3.6 Adicionar modelo de Plano de Resposta a Incidentes.

## 4. Documentação e verificação

- [x] 4.1 Atualizar `DESIGN.md` com navegação, anexo, arquivos e dívidas.
- [x] 4.2 Atualizar `README.md`, `AGENTS.md` e `BACKLOG.md`.
- [x] 4.3 Criar os artefatos OpenSpec da change.
- [x] 4.4 Rodar `npm run lint`, `npm run format:check` e `npm run build`.
- [x] 4.5 Validar PDF, DOCX (ZIP/XML) e TXT com conteúdo longo.
- [x] 4.6 Revisar o diff, criar commits semânticos e publicar a branch.
