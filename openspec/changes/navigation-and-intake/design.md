## Context

O SPA tem landing, cadastro, login, envio, planos, painel, documentos, perfil, configurações e 404. A navegação da área logada está concentrada no `ProductHeader`, mas não há rodapé compartilhado. A rota `/form` só é alcançável pelo botão de planos, o perfil aponta para o site público e a 404 oferece apenas a página inicial. A Central de Documentos usa documentos fictícios em um `NativeSelect`, e a análise simulada já atualiza o diagnóstico compartilhado.

O pedido atual altera a experiência de entrada de arquivos e o nível dos downloads. O `AGENTS.md` exige mock-first, avisos explícitos e nenhuma promessa de conformidade real. O `DESIGN.md` exige foco visível, estados claros e reutilização de primitives.

## Goals / Non-Goals

**Goals:**

- Tornar todas as rotas alcançáveis por navegação visível e oferecer caminho de volta.
- Reutilizar rodapé, atalhos e destinos em vez de listas duplicadas.
- Introduzir anexo local com validação, sem upload ou leitura de conteúdo.
- Manter documentos de exemplo como fallback de demonstração.
- Deixar explícito que a IA é simulada.
- Produzir arquivos com estrutura profissional nos três formatos.

**Non-Goals:**

- Ler `File` com `FileReader`, enviar arquivos ou persistir conteúdo.
- Usar IA real, backend ou serviço de geração de documentos.
- Garantir conformidade, validade jurídica ou certificação.
- Adicionar bibliotecas de PDF, DOCX, ícones ou roteamento.

## Decisions

### Mapa de navegação explícito

Cada rota recebe pelo menos uma entrada visível em outra tela. A área logada usa `ProductHeader` + `ProductFooter`; páginas internas usam `CrossLinks` no topo. Páginas públicas usam o cabeçalho e o rodapé da landing. A 404 lista início, painel, documentos, planos e login.

Os destinos ficam em `src/content/navigation.ts` para evitar listas divergentes. Alternativa descartada: repetir links em cada página, que já produziu rotas órfãs.

### Anexo como controle, não como upload

O botão “Anexar documento” aciona um `input type="file"` oculto. A validação usa nome, extensão, tamanho e tipo informado pelo navegador; o conteúdo não é aberto. PDF, DOC, DOCX e TXT de até 10 MB são aceitos, com mensagens específicas para vazio, formato e tamanho.

O arquivo permanece no dispositivo e é descrito como tal. Alternativa descartada: continuar apenas com documentos fictícios, que não demonstra o fluxo pedido; e ler o conteúdo com `FileReader`, que criaria expectativa de processamento real e risco de privacidade.

### Exemplos continuam disponíveis

O `NativeSelect` e a lista lateral permanecem como caminho de demonstração sem arquivo. O campo de exemplo fica desabilitado enquanto houver arquivo anexado, e remover o arquivo devolve o controle. Alternativa descartada: exigir um arquivo do dispositivo para demonstrar, o que quebraria apresentações sem arquivo preparado.

### Análise simulada com alvo tipado

`analyzeDocument` recebe uma união discriminada: `sample` com `documentId` ou `local` com metadados do arquivo. O mock escolhe um perfil determinístico a partir do nome/tamanho e executa as mesmas etapas. A UI não afirma que o conteúdo foi lido. Alternativa descartada: passar apenas strings, que perderia a distinção entre origem e exemplo.

### Arquivos com layout profissional

O contrato `DownloadContent` ganha campos opcionais de tipo, referência, organização, data e métricas. Os geradores compartilham esse contrato:

- PDF: capa, métricas em grade, cabeçalho, rodapé, paginação e títulos com `keepWithNext`.
- DOCX: `styles.xml`, `numbering.xml`, `header1.xml`, `footer1.xml`, `docProps/core.xml` e `docProps/app.xml`, com estilos nomeados e tabela.
- TXT: 78 colunas, cabeçalho, métricas com pontilhado e seções sublinhadas.

Alternativa descartada: adicionar bibliotecas de PDF/DOCX para um gerador local simples, aumentando o bundle sem necessidade.

### Conteúdo revisável

Relatórios e modelos ganham seções de aviso, sumário, escopo, método, severidade, plano de ação, evidências e controle do documento. O texto continua em `src/content/documents.ts` e `src/mocks/documents.ts`, com placeholders explícitos nos modelos.

## Risks / Trade-offs

- [O anexo parece upload] → aviso fixo, uso exclusivo de metadados e ausência de requisição.
- [A análise parece IA real] → rótulo “IA simulada”, aviso de demonstração e etapas determinísticas.
- [DOCX inválido] → pacote OOXML completo, XML bem formado e verificação estrutural.
- [PDF com texto cortado] → quebra de linha própria, truncamento de rótulos e paginação testada com conteúdo longo.
- [Links duplicados] → destinos centralizados e componentes compartilhados.
- [Estado perdido ao recarregar] → comportamento documentado como demonstração em memória.
