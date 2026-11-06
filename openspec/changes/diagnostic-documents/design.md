## Context

O `/dashboard` já exibe um score com Recharts e uma lista de pendências. Os dados vêm de `services/diagnostic.ts` e do mock em `mocks/api.ts`. A lista usa `IssueCategory` com apenas `id`, `name` e `description`; não há severidade, explicação ou recomendação. Também não existe uma central para documentos, análise simulada ou downloads.

A referência de produto pede uma SPA unificada com diagnóstico, achados explicados e central de documentos. O `AGENTS.md` exige mock-first, simulação explícita, tipagem estrita, acessibilidade e nenhuma promessa de conformidade real. O `DESIGN.md` exige animações discretas, foco visível e estados claros.

## Goals / Non-Goals

**Goals:**

- Enriquecer os achados com severidade, categoria, explicação e recomendação.
- Criar uma Central de Documentos com documentos fictícios e análise animada.
- Rolar até o processamento ao iniciar a análise e exibir os achados.
- Permitir baixar relatórios/modelos em PDF, DOCX e TXT localmente.
- Reutilizar o painel de achados no dashboard.
- Manter a simulação honesta, acessível e responsiva.

**Non-Goals:**

- Ler arquivos do dispositivo, enviar arquivos ou persistir dados.
- Usar IA real, backend ou serviços externos.
- Garantir conformidade ou substituir avaliação profissional.
- Introduzir biblioteca de PDF, animação ou gerenciamento de estado.

## Decisions

### Central em rota própria

A Central de Documentos fica em `/documents`, com link “Documentos” no `ProductHeader`. O dashboard usa o mesmo painel de achados e um link para a central. Alternativa descartada: esconder tudo em uma única seção do dashboard, que ficaria densa e misturaria diagnóstico com gestão de documentos.

### Estado de diagnóstico compartilhado

O estado do diagnóstico sai de `mocks/api.ts` para `mocks/diagnostics.ts`. A central atualiza esse estado ao concluir uma análise, e o dashboard lê o mesmo relatório ao montar. Alternativa descartada: manter dois mocks independentes, que mostrariam scores diferentes entre as telas.

### Documentos fictícios, sem seletor do sistema

O usuário escolhe um documento de exemplo em um `NativeSelect`. Nenhum `input type="file"` é usado; nenhum arquivo do dispositivo é lido. A copy informa que os documentos são fictícios e que a análise não usa IA real. Alternativa descartada: abrir o seletor real e fingir leitura, o que criaria expectativa incorreta e risco de privacidade.

### Análise simulada com etapas

O service `analyzeDocument` recebe um callback de progresso e executa etapas determinísticas com atraso: ler, extrair, comparar e gerar. A UI mostra uma barra de progresso, a etapa atual e o histórico, com `aria-live`. O botão fica desabilitado e o envio duplicado é bloqueado. Ao iniciar, a página rola até o cartão de processamento com `smooth` e usa `auto` quando `prefers-reduced-motion` está ativo. Alternativa descartada: apenas um spinner genérico, que não comunica o que a “IA” estaria fazendo.

### Menu de formatos e geração local

Cada item da Central de Downloads abre um `DropdownMenu` com PDF, DOCX e TXT, cada um com uma descrição curta de uso. O conteúdo é o mesmo contrato `DownloadContent`; `src/lib/download.ts` escolhe o gerador e troca a extensão. O PDF usa `src/lib/pdf.ts`; o DOCX é um pacote OOXML/ZIP mínimo (`[Content_Types].xml`, `_rels/.rels`, `word/document.xml`) escrito sem biblioteca; o TXT é texto UTF-8 simples. Alternativas descartadas: adicionar uma biblioteca só para DOCX e exportar HTML renomeado para `.docx`, que não é um formato editável confiável.

### Scroll até o processamento

O container do `AnalysisProgress` recebe uma ref e `scroll-mt-20`. Um efeito disparado quando o estado vira `running` chama `scrollIntoView`. O comportamento é `smooth` por padrão e `auto` com movimento reduzido. Alternativa descartada: rolar para o resultado final, que esconderia o processo e tiraria o feedback de progresso.

### PDF local sem nova dependência

`src/lib/pdf.ts` gera um PDF válido de uma ou mais páginas, com fontes Helvetica e codificação WinAnsi, a partir de linhas de texto. O download usa `Blob` e um link temporário. O documento inclui “Documento de demonstração” e não é armazenado. Alternativa descartada: adicionar uma biblioteca de PDF para um relatório fictício simples, aumentando o bundle sem necessidade.

### Achados compartilhados

O componente `FindingsList` é usado no dashboard e no resultado da análise. Ele exibe severidade com texto + ícone, descrição curta e uma seção expansível com explicação simulada e recomendação. Alternativa descartada: duplicar a lista em duas telas com padrões divergentes.

### Animação discreta

As entradas usam `animate-in fade-in` e a barra usa transição de largura; spinners usam `animate-spin`. Tudo respeita `motion-reduce`. Alternativa descartada: animações contínuas ou chamativas, que competem com os dados.

## Risks / Trade-offs

- [A análise parece real] → copy fixa de demonstração, etapas chamadas de “IA simulada” e aviso no resultado e nos arquivos.
- [O usuário não percebe que a análise começou] → rolagem automática até o cartão de processamento, com anúncio da etapa.
- [O DOCX pode ser inválido ou abrir como HTML] → pacote OOXML/ZIP real com XML bem formado e verificação estrutural no navegador.
- [O PDF pode parecer oficial] → marca d'água textual e rodapé explícito em todos os arquivos.
- [Documentos de exemplo podem ser confundidos com arquivos reais] → nomes, metadados e aviso de que nada é lido ou enviado.
- [Muitos passos podem tornar a demo lenta] → atrasos curtos e determinísticos, com possibilidade de reduzir motion.
- [O estado é perdido ao recarregar] → comportamento documentado como simulação em memória.
