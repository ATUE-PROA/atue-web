## Why

O painel atual exibe apenas uma lista básica de pendências e não oferece uma central para enviar documentos fictícios, acompanhar uma análise simulada ou baixar relatórios. A task DEV-501 pede um painel de achados com explicações da IA e uma central de downloads em PDF. O repositório ainda não possui tipos enriquecidos de achados, fluxo de análise, geração local de PDF nem rota de documentos.

## What Changes

- Enriquecer os achados do diagnóstico com severidade, categoria, explicação e recomendação.
- Criar a rota `/documents` com a Central de Documentos, acessível pelo `ProductHeader`.
- Adicionar documentos de exemplo fictícios, sem abrir o seletor de arquivos do sistema.
- Simular a análise com etapas animadas e anunciadas, sem IA real.
- Exibir o resultado da análise com score, achados e estados de vazio, erro e sucesso.
- Criar a Central de Downloads com relatórios gerados e modelos de documentos em PDF, DOCX e TXT.
- Gerar arquivos fictícios localmente no navegador, com aviso explícito de demonstração.
- Rolar a tela até o processamento assim que a análise simulada começar.
- Reutilizar o painel de achados no `/dashboard` e linkar para a Central de Documentos.
- Atualizar `DESIGN.md`, `AGENTS.md`, `README.md` e os artefatos OpenSpec.

Fora de escopo:

- Leitura real de arquivos, upload, persistência ou backend.
- IA real, análise jurídica, verificação de conformidade ou consulta a bases externas.
- Autenticação, permissões ou armazenamento de documentos reais.
- Geração de relatórios com dados de produção.

## Capabilities

### New Capabilities

- `diagnostic-documents`: central de documentos com análise simulada, painel de achados enriquecido e downloads locais de relatórios e modelos em PDF.

### Modified Capabilities

<!-- Nenhuma: o dashboard apenas passa a consumir o painel de achados compartilhado e um link para a nova central. -->

## Impact

- **Rotas:** nova rota `/documents`; `ProductHeader` passa a exibir o link “Documentos”.
- **Código:** novos tipos, conteúdo, libs de PDF/DOCX/TXT, mocks, service, componentes de documentos, página e atualização do dashboard.
- **Dependências:** nenhuma nova biblioteca; PDF, DOCX e TXT são gerados com implementações locais.
- **Risco:** a análise e os arquivos parecem reais, mas são fictícios. A copy, os estados e os avisos devem deixar isso explícito.
