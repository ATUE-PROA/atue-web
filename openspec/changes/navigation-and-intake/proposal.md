## Why

As telas do MVP já existem, mas parte delas só é alcançável pela barra de endereço: `/form` não aparece na landing, o perfil manda para o site público e as páginas internas não têm rodapé compartilhado. A Central de Documentos também depende de uma lista fictícia em `NativeSelect`, enquanto a demonstração pede um fluxo mais natural de anexar um arquivo e então solicitar a análise. Por fim, os PDF, DOCX e TXT gerados são válidos, mas têm aparência simples para uma apresentação de negócio.

## What Changes

- Conectar todas as rotas existentes com links visíveis: landing, planos, login, cadastro, envio, painel, documentos, perfil, configurações e 404.
- Criar `ProductFooter` e `CrossLinks`, com destinos centralizados em `src/content/navigation.ts`.
- Adicionar atalhos no painel, no perfil, nas configurações, na Central de Documentos e nas páginas públicas.
- Substituir a entrada por lista fictícia por um botão “Anexar documento” com `input type="file"` como controle, validação de tipo/tamanho e uso exclusivo de metadados.
- Manter os documentos de exemplo como alternativa de demonstração.
- Expor a ação “Analisar com IA”, deixando explícito que a análise é simulada e local.
- Ampliar o resultado com a origem do documento e atalhos para o painel e para os downloads.
- Reescrever os geradores PDF, DOCX e TXT com capa, métricas, cabeçalho, rodapé, paginação, estilos e conteúdo mais completo.
- Atualizar `README.md`, `DESIGN.md`, `AGENTS.md`, `BACKLOG.md` e os artefatos OpenSpec.

Fora de escopo:

- Upload, leitura de conteúdo, armazenamento ou envio de arquivos a qualquer servidor.
- IA real, modelo externo, análise jurídica ou verificação de conformidade.
- Backend, autenticação persistente ou permissões.
- Novas dependências para PDF, DOCX ou navegação.

## Capabilities

### New Capabilities

- `app-navigation`: navegação conectada entre todas as rotas, com rodapé compartilhado, atalhos contextuais e página 404 útil.

### Modified Capabilities

- `diagnostic-documents`: a entrada deixa de ser somente uma lista fictícia e passa a aceitar anexo local como controle, mantendo a análise simulada e adicionando arquivos com estrutura profissional.

## Impact

- **Rotas:** todas as rotas existentes ganham links; `/form` deixa de ser órfã; `/plan` continua como alias de `/plans`.
- **Código:** novos componentes de layout, conteúdo de navegação, validação de anexo, ajustes de tipos, services, mocks, páginas e geradores.
- **Dependências:** nenhuma nova biblioteca.
- **Risco:** o anexo pode sugerir upload ou leitura real. A copy, os estados e os avisos devem deixar claro que o arquivo permanece no dispositivo e que a IA é simulada.
