# DESIGN.md — Sistema de Design ATUE

**Documento oficial e único da identidade visual do ATUE.**

Este arquivo é idêntico em `atue-web/DESIGN.md` e `atue-apresentation/DESIGN.md`. Ele define a identidade institucional compartilhada pelas duas aplicações. Não edite uma cópia isoladamente: qualquer alteração deve ser aplicada nas duas e validada com comparação byte a byte.

O `DESIGN.md` prevalece em decisões visuais e de interação. O `AGENTS.md` de cada projeto prevalece em decisões arquiteturais, funcionais e técnicas. Em caso de conflito, ajuste a documentação antes de implementar.

---

## 1. Escopo e princípios

### 1.1 O que este documento define

- Identidade visual institucional.
- Paleta cromática obrigatória e papéis de cor.
- Tipografia e escala tipográfica.
- Hierarquia visual.
- Espaçamento, grid e proporções.
- Bordas, raios, sombras e superfícies.
- Padrões de botões, campos, cards, tabelas, ícones e indicadores.
- Estados, animações, responsividade e acessibilidade.
- Conteúdo, microcopy e práticas proibidas.

### 1.2 O que este documento não define

- Layout, navegação, rotas ou arquitetura das aplicações.
- Quantidade de telas, ordem de seções ou densidade de informação.
- Regras de negócio, contratos de API ou persistência.
- Detalhes de implementação que pertencem ao `AGENTS.md` de cada projeto.

**Regra fundamental:** a consistência do ATUE está na identidade, não na repetição de telas. As duas aplicações podem ter composições diferentes e devem parecer parte da mesma marca.

### 1.3 Prioridades

1. Hierarquia visual.
2. Legibilidade e contraste.
3. Clareza dos dados.
4. Consistência de identidade entre telas e aplicações.
5. Previsibilidade das interações.
6. Responsividade e acessibilidade.

Elementos decorativos só existem quando cumprem função narrativa ou comunicam estado.

### 1.4 Direção estética

Estética SaaS B2B moderna, com influência de dashboards de conformidade, segurança e observabilidade.

Características obrigatórias:

- Minimalismo profissional.
- Layout orientado a dados.
- Contraste bem definido.
- Bordas discretas.
- Espaçamento consistente.
- Elementos gráficos objetivos.
- Movimento sutil e funcional.

A interface não deve parecer um template administrativo genérico, uma janela de hacker cinematográfica ou um protótipo sem acabamento.

---

## 2. Identidade cromática

### 2.1 Paleta institucional obrigatória

Estas são as únicas cores de identidade do ATUE. Não substitua, amplie ou troque seus valores.

| Token                 | Hex       | Papel               | Uso principal                                                       |
| --------------------- | --------- | ------------------- | ------------------------------------------------------------------- |
| `--atue-ink`          | `#0A0A0A` | Preto institucional | Texto principal no tema claro; fundo no tema escuro.                |
| `--atue-surface-dark` | `#161616` | Superfície escura   | Cards e superfícies elevadas no tema escuro.                        |
| `--atue-blue`         | `#2563EB` | Azul institucional  | Marca, ação primária, foco, links e dados de destaque.              |
| `--atue-gray`         | `#777777` | Cinza médio         | Bordas de campo, ícones neutros e texto de apoio em tamanho grande. |
| `--atue-gray-soft`    | `#A0A0A0` | Cinza claro         | Texto secundário sobre fundo escuro e divisores discretos.          |
| `--atue-line`         | `#CACACA` | Linha               | Bordas, divisores e superfícies neutras derivadas.                  |
| `--atue-white`        | `#FFFFFF` | Branco              | Fundo no tema claro; texto principal no tema escuro.                |

### 2.2 Como derivar tons

- Tons de apoio são derivados das sete cores por opacidade (`/10`, `/20`, `/24`, `/66`, `/72`) ou por mistura com transparência. Não crie novos hex de identidade.
- Variações de interação do azul (`blue-400`, `blue-500`, `blue-700`) existem apenas para hover, foco e contraste sobre fundo escuro. São derivadas funcionais do `#2563EB`, não cores institucionais independentes.
- Superfícies neutras no tema claro usam `#CACACA` com opacidade baixa (por exemplo `rgb(202 202 202 / 0.18)`).
- Texto secundário no claro usa `#0A0A0A` com opacidade (`/72`); no escuro usa `#FFFFFF` com opacidade (`/66`).
- `#777777` e `#A0A0A0` não são texto pequeno sobre branco: não atingem contraste AA nesse contexto.

### 2.3 Cores funcionais de estado

Estas cores não pertencem à identidade e nunca substituem o azul institucional. Servem apenas para comunicar estado, sempre acompanhadas de rótulo textual e, quando pertinente, ícone.

| Estado     | Cor base  | Fundo           | Texto (claro / escuro)      | Borda           |
| ---------- | --------- | --------------- | --------------------------- | --------------- |
| Sucesso    | `#22C55E` | `green-600/10`  | `green-800` / `green-300`   | `green-600/30`  |
| Atenção    | `#EAB308` | `yellow-600/10` | `yellow-800` / `yellow-200` | `yellow-600/30` |
| Crítico    | `#EF4444` | `red-600/10`    | `red-700` / `red-300`       | `red-600/30`    |
| Informação | `#2563EB` | `blue-600/10`   | `blue-800` / `blue-200`     | `blue-600/30`   |

Exceção funcional: a faixa intermediária do score usa laranja `#F97316`. Ele existe apenas na escala de score, nunca como cor de marca, CTA ou superfície.

### 2.4 Contraste

- Texto principal deve atender WCAG AA no tamanho em que é usado.
- Texto de apoio nunca carrega informação essencial sozinho.
- Placeholders, estados desabilitados e textos sobre fotografia também precisam de contraste verificado.
- Sobre fotografia, use scrim escuro: `bg-black/60` em telas estreitas e gradiente `from-black/85 via-black/65 to-black/30` a partir de `sm`.
- Nunca use cor como único indicador de estado, risco ou seleção.

### 2.5 Proibições cromáticas

- Não introduza verde, terracota, bege, roxo ou outra cor como identidade.
- Não use gradientes coloridos como identidade da marca.
- Não use sombras coloridas.
- Não use hex inline em componentes quando existir token.
- Não crie uma segunda paleta para uma tela isolada.
- Não use `zinc`, `neutral`, `slate` ou `gray` fixos como atalho para superfícies da identidade.

---

## 3. Temas e superfícies

### 3.1 Tema claro

É o padrão do produto. O tema escuro é escolha explícita do usuário quando a aplicação oferece alternância.

| Papel             | Token / receita                          |
| ----------------- | ---------------------------------------- |
| Fundo da página   | `--background` → `#FFFFFF`               |
| Texto principal   | `--foreground` → `#0A0A0A`               |
| Card              | `--card` → `#FFFFFF` com borda `#CACACA` |
| Superfície neutra | `rgb(202 202 202 / 0.18)`                |
| Texto secundário  | `rgb(10 10 10 / 0.72)`                   |
| Borda             | `--border` → `#CACACA`                   |
| Borda de campo    | `--input` → `#777777`                    |
| Foco              | `--ring` → `#2563EB`                     |

### 3.2 Tema escuro e superfície escura fixa

Aplicações demonstrativas podem operar em superfície escura fixa. A identidade continua a mesma.

| Papel              | Token / receita                               |
| ------------------ | --------------------------------------------- |
| Fundo da página    | `#0A0A0A`                                     |
| Card               | `#161616`                                     |
| Superfície elevada | `#161616` com borda `rgb(202 202 202 / 0.24)` |
| Texto principal    | `#FFFFFF`                                     |
| Texto secundário   | `rgb(255 255 255 / 0.66)`                     |
| Texto auxiliar     | `#A0A0A0`                                     |
| Borda              | `rgb(202 202 202 / 0.24)`                     |
| Borda de campo     | `rgb(255 255 255 / 0.42)`                     |
| Foco               | `#2563EB`; sobre fundo escuro, `blue-400`     |

### 3.3 Regras de superfície

- Use uma hierarquia clara entre página, card e elemento elevado.
- Evite misturar superfícies com tons muito próximos sem necessidade.
- Não empilhe borda + anel + sombra em cards estáticos. Escolha um divisor principal.
- A sombra `shadow-soft` fica reservada a elementos flutuantes e ao destaque recomendado.
- O fundo do `html` deve acompanhar o tema; não use fundos fixos por página.
- Não aplique efeito de vidro fora do cabeçalho fixo, quando a aplicação usar um.

---

## 4. Tipografia

### 4.1 Famílias institucionais

| Uso                                                       | Família                               | Fallback                                      |
| --------------------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Títulos display (`h1`, `h2` de página/seção e cabeçalhos) | **Fraunces Variable**                 | `Georgia`, `'Times New Roman'`, serif         |
| Interface, corpo, rótulos, `h3`/`h4` e microtítulos       | **Geist Variable**                    | `system-ui`, sans-serif                       |
| Dados técnicos, logs e código                             | monoespaçada do sistema ou do projeto | `ui-monospace`, `SFMono-Regular`, `monospace` |

- A ausência de uma fonte instalada é dívida de implementação, não uma segunda identidade. Use o fallback declarado e não carregue fontes de CDNs não revisados.
- Não adicione uma terceira família decorativa.
- Identificadores de código permanecem em inglês; copy de interface em pt-BR.

### 4.2 Escala tipográfica

| Papel              | Classes / medida canônica                           |
| ------------------ | --------------------------------------------------- |
| Display / hero     | `text-display` — `clamp(2rem, 5vw, 3.75rem)`, 1.04  |
| Título de seção    | `text-section` — `clamp(1.75rem, 3vw, 2.5rem)`, 1.1 |
| Título de página   | `text-3xl sm:text-4xl`                              |
| Título de card     | `text-base sm:text-lg`, semibold                    |
| Corpo de destaque  | `text-lg leading-relaxed`                           |
| Corpo padrão       | `text-base` ou `text-sm`                            |
| Rótulo             | `text-sm font-medium`                               |
| Metadado / caption | `text-xs` — nunca abaixo disso                      |
| Eyebrow            | `text-eyebrow` — 0.75rem, 500, uppercase, 0.14em    |
| Dado numérico      | `font-semibold tabular-nums`                        |
| Log / código       | `font-mono text-xs sm:text-sm`                      |

A escala base em `rem` pode ser ampliada pela aplicação para leitura confortável (o produto usa 120%). Não fixe tamanhos de texto em `px`; use utilitários `text-*` para acompanhar a escala.

### 4.3 Hierarquia

- Um único `h1` por tela.
- Títulos usam `font-semibold` ou `font-medium`, com `tracking-tight` em tamanhos grandes.
- Não use `font-bold` como padrão.
- Evite mais de três tamanhos de título na mesma seção.
- Rótulos e metadados não competem com o conteúdo principal.
- Textos longos usam `leading-relaxed` e largura de leitura (`max-w-xl` ou `max-w-2xl`).
- Eyebrows são curtos, em caixa alta e com tracking; não substituem títulos.
- Não misture Fraunces e Geist no mesmo nível hierárquico. Cabeçalhos display usam Fraunces; microtítulos e rótulos usam Geist.
- `text-wrap: balance` é permitido em títulos; não force em parágrafos.

---

## 5. Espaçamento, grid e proporções

### 5.1 Ritmo

Use a escala de 4px. Evite valores arbitrários.

| Uso                | Referência                          |
| ------------------ | ----------------------------------- |
| Ícone + texto      | `gap-2`                             |
| Grupo compacto     | `gap-3`                             |
| Grid padrão        | `gap-4` ou `gap-6`                  |
| Entre blocos       | `gap-6` a `gap-12`                  |
| Card compacto      | `p-5`                               |
| Card padrão        | `p-6`                               |
| Card amplo         | `p-6 sm:p-8`                        |
| Seção de aplicação | `py-12 sm:py-16`                    |
| Seção editorial    | `py-16 sm:py-20 lg:py-24`           |
| Formulário         | `space-y-4`; grupos com `space-y-6` |

### 5.2 Containers

São permitidas duas larguras canônicas, declaradas no `AGENTS.md` de cada projeto:

- **Container padrão:** `mx-auto w-full max-w-6xl px-6`.
- **Container amplo:** `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`.

Leitura longa usa `max-w-xl` ou `max-w-2xl`. Telas centralizadas de autenticação usam `max-w-md`.

### 5.3 Grid

- Grid de 12 colunas como referência mental; na prática, use `grid` com `gap-4`/`gap-6` e `minmax(0, 1fr)` para impedir estouro.
- Colunas assimétricas são permitidas quando a hierarquia de conteúdo justificar.
- Em telas estreitas, empilhe colunas em vez de criar rolagem horizontal.
- Tabelas largas viram cards empilhados; não force scroll horizontal na página.

### 5.4 Breakpoints

Use mobile-first. Breakpoints do Tailwind:

- `sm`: 640px.
- `md`: 768px.
- `lg`: 1024px.
- `xl`: 1280px.

Valide sempre: 320px, 375px, 768px, 1024px e 1440px.

### 5.5 Proporções

- Reserve a proporção de imagens e gráficos antes do carregamento.
- Herói fotográfico: `aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]`.
- Blocos editoriais e autenticação: `aspect-[4/3]`.
- Faixa de suporte: `aspect-[16/9]`.
- Não distorça logos, ícones ou gráficos para preencher espaço.

---

## 6. Bordas, raios e sombras

### 6.1 Raios

Base do tema: `--radius: 0.75rem`.

| Elemento                     | Raio           |
| ---------------------------- | -------------- |
| Inputs e botões              | `rounded-lg`   |
| Cards e blocos               | `rounded-xl`   |
| Containers principais / auth | `rounded-2xl`  |
| Badges, chips e pílulas      | `rounded-full` |
| Ícones em tile               | `rounded-lg`   |

Não arredonde toda a interface. Pílula é para chips e badges, não para botões de ação.

### 6.2 Bordas

- Interface: 1px com `border-border`.
- Campos: `border-input`.
- Divisores: mesma cor da borda, com opacidade quando necessário.
- Não use bordas coloridas decorativas sem função semântica.
- Não combine borda, anel e sombra no mesmo card estático.

### 6.3 Sombras

- `shadow-sm`: cards e superfícies discretas.
- `shadow-soft`: card principal de autenticação, elemento flutuante e destaques pontuais.
- `shadow-2xl`: apenas terminal, overlay ou elemento decorativo isolado.
- Proibido: sombra colorida, brilho neon e sombra pesada em toda a interface.

---

## 7. Botões e ações

### 7.1 Hierarquia

| Variante   | Receita canônica                                              | Uso                                 |
| ---------- | ------------------------------------------------------------- | ----------------------------------- |
| Primária   | `bg-blue-600 text-white hover:bg-blue-500`                    | Ação principal da tela ou do bloco. |
| Secundária | `border border-border bg-card text-foreground hover:bg-muted` | Ação alternativa com peso menor.    |
| Outline    | `border border-border bg-transparent hover:bg-muted`          | Ação neutra em superfícies densas.  |
| Ghost      | `text-muted-foreground hover:bg-muted hover:text-foreground`  | Ação terciária ou dentro de listas. |
| Destrutiva | `bg-destructive/10 text-destructive hover:bg-destructive/20`  | Exclusão ou ação irreversível.      |
| Link       | `text-primary underline-offset-4 hover:underline`             | Navegação textual.                  |

Regras:

- Uma única ação primária por região visual.
- Não crie um segundo estilo de botão primário.
- Use ícone Lucide ou SVG inline consistente quando ele agregar significado.
- Botões de ícone exigem `aria-label`.
- Botões que não enviam formulário usam `type="button"`.
- Toda ação visível deve ter comportamento funcional ou estado explicitamente simulado.

### 7.2 Tamanhos

- `md`: `h-10 px-4 text-sm` — uso padrão.
- `lg`: `h-11 px-5 text-sm` — CTA de bloco e formulário.
- `xl`: `h-11 px-6 text-base` — ação principal de formulário amplo.
- Alvos de toque em mobile: pelo menos 44px de altura.
- Botões de ícone: `size-8`, `size-9` ou `size-10`, com área de toque adequada.

### 7.3 Estados

- **Hover:** mudança discreta de cor ou superfície.
- **Focus:** anel visível de 2–3px na cor de marca, com offset quando necessário.
- **Active:** deslocamento de 1px ou escurecimento leve; nunca mudança brusca.
- **Disabled:** `opacity-50` + `pointer-events-none`; o motivo deve ser compreensível no contexto.
- **Loading:** indicador + texto explícito (“Gerando relatório...”), bloqueio de envio duplicado e `aria-busy` quando aplicável.
- **Selecionado:** cor + rótulo ou ícone; nunca apenas cor.

Transições de botão: 150–200ms.

---

## 8. Campos e formulários

- Todo campo tem rótulo visível associado por `htmlFor`/`id`.
- Placeholder não substitui rótulo.
- Altura padrão: `h-11`.
- Superfície: `rounded-lg border-input bg-transparent text-foreground`.
- Foco: borda azul e anel `ring-blue-600/40`; no escuro, `blue-400`.
- Erro: `aria-invalid`, borda/anel destrutivo e mensagem junto ao campo com `role="alert"`.
- Texto de ajuda: `text-xs text-muted-foreground`, ligado por `aria-describedby`.
- Use `autoComplete` adequado (`name`, `email`, `organization`, `new-password`, `url`).
- Valide no envio e revalide após o primeiro erro; preserve os valores quando o envio falhar.
- Bloqueie envio duplicado durante operações assíncronas.
- Use `noValidate` no `<form>` quando a validação for controlada pela aplicação.
- Textos longos usam `Textarea`; anexos usam `input type="file"` com tipos e tamanho aceitos descritos.
- Selects simples usam o componente do projeto; seleções com descrição e ícone usam menu de ações.
- Switch exige rótulo visível e não comunica estado apenas por cor.
- Ações destrutivas exigem confirmação em diálogo acessível, com cancelamento e explicação da consequência.

Mensagens de erro devem ser objetivas e acionáveis: “Informe um e-mail válido.”; “A senha precisa ter pelo menos 8 caracteres, com letra e número.”

---

## 9. Cards, tabelas e listas

### 9.1 Cards

Receita padrão:

`rounded-xl border border-border bg-card p-6`

- Título do card: `text-base sm:text-lg font-semibold`.
- Descrição: `text-sm leading-relaxed text-muted-foreground`.
- Cards selecionáveis têm hover sutil de borda/superfície e foco visível.
- Não aninhe mais de dois níveis de card.
- Não use cards dentro de cards apenas para criar hierarquia; use divisores e espaçamento.
- Card recomendado pode usar `border-blue-600/40 ring-1 ring-blue-600/15` e um badge textual.
- Cards estáticos não acumulam borda + ring + sombra.

### 9.2 Tabelas

- Use componentes semânticos de tabela, com `caption` ou título acessível.
- Cabeçalho: `bg-muted/40`, `text-xs uppercase tracking-wide text-muted-foreground`.
- Linhas separadas por `border-b border-border`.
- Primeira célula: `font-medium text-foreground`.
- Números alinham à direita e usam `tabular-nums`.
- Em telas estreitas, substitua a tabela por cards empilhados.
- Nunca permita rolagem horizontal da página por causa de uma tabela.

### 9.3 Listas e definições

- Listas de achados, indicadores e recomendações mantêm espaçamento consistente e hierarquia clara.
- Use `<dl>` para pares rótulo/valor quando a semântica for de definição.
- Agrupe itens por severidade ou categoria com título e contagem.
- Não apresente blocos extensos de texto; quebre em descrição técnica, impacto e recomendação.

### 9.4 Badges e chips

- Raio `rounded-full`.
- Cor + ícone ou ponto + texto; nunca apenas cor.
- Tons de estado seguem a seção 2.3.
- Chips de metadado usam superfície neutra e borda discreta.
- Não use badge como botão sem affordance e foco visível.

---

## 10. Ícones e imagens

### 10.1 Ícones

- Biblioteca preferencial: Lucide React, quando instalada.
- Se não houver biblioteca, use SVGs inline com grade de 24px, traço 1.5–2, `currentColor` e tamanho consistente.
- Tamanhos: `size-4` em botões e campos, `size-5` em listas e indicadores, `size-6` em destaques.
- Ícones decorativos recebem `aria-hidden="true"`.
- Ícones que substituem texto exigem nome acessível no controle.
- Não use emojis como substitutos de ícones na interface principal.
- Não misture bibliotecas de ícones na mesma tela.

### 10.2 Imagens e ilustrações

- Fotografia é conteúdo, não decoração: `alt` descritivo em pt-BR e proporção reservada.
- Use arquivos locais revisados; não carregue URLs externas não revisadas em runtime.
- Não aplique filtros de cor que desviem da paleta.
- Ilustrações e mockups são construídos com CSS/SVG e `aria-hidden` quando decorativos.
- Logos mantêm proporção e área de respiro; não recebem filtros.

---

## 11. Indicadores, scores e estados

### 11.1 Estados semânticos

Todo estado combina cor, rótulo textual e, quando útil, ícone.

| Estado     | Rótulo canônico          | Uso                                          |
| ---------- | ------------------------ | -------------------------------------------- |
| Sucesso    | “Concluído” / “Conforme” | Operação concluída ou condição satisfatória. |
| Atenção    | “Atenção”                | Lacuna relevante ou risco moderado.          |
| Crítico    | “Crítico”                | Risco alto ou falha que exige ação.          |
| Informação | “Informação”             | Contexto, demonstração ou dado neutro.       |

### 11.2 Score de conformidade

O score é um indicador de 0 a 100 em que quanto maior, melhor. Deve ser recuperado ou calculado dos dados da aplicação; nunca gerado aleatoriamente durante a apresentação.

| Faixa        | Cor       | Classificação canônica |
| ------------ | --------- | ---------------------- |
| menor que 25 | `#EF4444` | Crítico                |
| 25 a 49      | `#F97316` | Atenção                |
| 50 a 74      | `#EAB308` | Atenção                |
| 75 a 100     | `#22C55E` | Conforme               |

Os limites pertencem à faixa superior: 25 já é laranja, 50 já é amarelo e 75 já é verde.

Um score deve apresentar:

- Valor numérico central.
- Arco ou barra proporcional.
- Rótulo textual da classificação.
- Descrição curta do significado.
- Alternativa textual para leitores de tela.
- Ressalva de que é demonstrativo quando não for medição real.

### 11.3 Indicadores

Cada indicador tem valor numérico, descrição curta, ícone contextual e cor semântica quando aplicável.

- Indicadores simples não precisam de gráfico.
- O valor é o elemento de maior peso visual.
- O rótulo nunca depende apenas da cor.
- Um indicador sem dado mostra estado vazio explícito, não zero.

### 11.4 Progresso, carregamento e vazio

- **Progresso:** barra proporcional, `role="progressbar"` e valor acessível; sincronize com a etapa real.
- **Loading:** indicador + texto + bloqueio de ação duplicada.
- **Sucesso:** confirmação clara e próximo passo.
- **Erro:** mensagem amigável, `role="alert"`, dados preservados e nova tentativa.
- **Vazio:** explicação do que fazer; nunca uma área em branco.
- **Skeleton:** apenas para estrutura previsível; não substitua feedback de ação.

### 11.5 Gráficos

- Dados tipados explicitamente.
- Escalas honestas; não distorça proporções.
- Rótulos, unidades e tooltips claros.
- Trate ausência de dados e valores nulos.
- Use container responsivo.
- Ofereça resumo textual quando o gráfico for essencial.
- Use gráfico apenas quando comunicar melhor que tabela ou indicador.
- Não adicione biblioteca de gráficos sem justificativa.

---

## 12. Movimento e transições

Movimento existe para comunicar resposta, continuidade e progresso.

- Microinterações: 150–400ms.
- Entradas de seção: 600–800ms, `ease-out`.
- Animações de score: até 700ms.
- Use `prefers-reduced-motion` obrigatoriamente; sem movimento e sem transição quando solicitado.
- Nunca use `opacity: 0` em conteúdo essencial que dependa de JavaScript para aparecer.
- Não bloqueie interação durante animação decorativa.
- Não use parallax, bounce exagerado, rotação gratuita ou loops chamativos.
- Não anime elementos já visíveis na primeira dobra.
- Não adicione animação de entrada em formulários, confirmações ou carregamentos: o estado já comunica a mudança.
- Animações de log e terminal devem ser progressivas, legíveis e sincronizadas com o progresso.

---

## 13. Responsividade

- Abordagem mobile-first: estilos base para telas estreitas, breakpoints apenas para ampliar.
- Valide 320px, 375px, 768px, 1024px e 1440px.
- Sem rolagem horizontal indesejada em nenhuma tela.
- Cabeçalhos, tabelas e grades se reorganizam; não são apenas reduzidos.
- Alvos de toque com pelo menos 44px.
- Tipografia não fica abaixo de `text-xs`.
- Gráficos e imagens preservam proporção.
- A experiência demonstrativa é otimizada para celular, sem perder a identidade compartilhada.
- A experiência de produto pode ser mais densa em desktop, mas deve permanecer utilizável em mobile.

---

## 14. Acessibilidade

Obrigatório em toda tela:

- HTML semântico: `header`, `main`, `nav`, `section`, `footer`, `form`.
- Um único `h1` por tela e hierarquia coerente de títulos.
- Foco visível em todos os controles.
- Ordem de tabulação lógica.
- Nomes acessíveis para controles de ícone.
- Rótulos visíveis para inputs.
- Erros associados ao campo com `aria-describedby`.
- Status comunicado por texto + ícone + cor.
- Contraste adequado em ambos os temas.
- Elementos decorativos com `aria-hidden="true"`.
- Diálogos com foco preso e retorno de foco ao fechar.
- Menus e componentes interativos com comportamento de teclado esperado.
- `aria-live="polite"` apenas em atualizações relevantes; não anuncie cada log em alta frequência.
- Respeito a `prefers-reduced-motion`.

---

## 15. Conteúdo e microcopy

- Idioma: português brasileiro.
- Tom: profissional, direto, técnico quando necessário e executivo nas explicações de negócio.
- Use sentence case em títulos e botões; caixa alta apenas em eyebrows curtos.
- Verbos de ação em botões: “Baixar relatório”, “Simular análise”, “Salvar alterações”.
- Explique termos técnicos em uma frase curta.
- Não use jargão desnecessário, texto genérico de template ou promessas vagas.
- Não afirme que o ATUE garante conformidade, certifica segurança ou substitui auditoria.
- Não invente diagnósticos, integrações ou resultados.
- Em fluxos simulados, diga explicitamente que é demonstração e que nenhum dado real é processado.
- Não apresente resultados fictícios como dados reais.
- Mensagens de erro não culpam o usuário e indicam o próximo passo.
- Datas, números e moeda seguem o formato pt-BR.
- Centralize copy revisável no projeto, quando houver estrutura para isso.

---

## 16. Exemplos de aplicação

Os exemplos abaixo mostram a identidade aplicada. Eles não obrigam as duas aplicações a terem o mesmo layout.

### 16.1 Superfície de produto

```tsx
<section className="rounded-xl border border-border bg-card p-6">
  <p className="text-eyebrow text-blue-600 dark:text-blue-400">Índice de conformidade</p>
  <h2 className="mt-2 text-section">Visão geral</h2>
  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
    O que precisa de atenção e qual é o próximo passo.
  </p>

  <div className="mt-6 flex flex-wrap items-center gap-3">
    <span className="text-4xl font-semibold tabular-nums">82</span>
    <span className="inline-flex items-center gap-2 rounded-full border border-green-600/30 bg-green-600/10 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-300">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-green-500" />
      Conforme
    </span>
  </div>
</section>
```

### 16.2 Superfície demonstrativa escura

```tsx
<div className="rounded-xl border border-border bg-[var(--atue-ink)] p-6">
  <h2 className="text-base font-semibold text-white">Execução simulada</h2>
  <div
    role="log"
    aria-live="polite"
    className="mt-4 font-mono text-xs text-[var(--atue-gray-soft)]"
  >
    <p className="text-green-400">[+] Resolvendo DNS...</p>
    <p className="text-yellow-400">[!] Cookies de terceiros detectados.</p>
    <p className="text-blue-400">[i] Consolidando relatório executivo.</p>
  </div>
</div>
```

### 16.3 Mesma identidade, composições diferentes

| Elemento   | Produto                                 | Demonstração                               |
| ---------- | --------------------------------------- | ------------------------------------------ |
| Paleta     | Sete cores institucionais               | As mesmas sete cores                       |
| Tipografia | Fraunces em títulos; Geist na interface | Mesma família ou fallback declarado        |
| Superfície | Clara por padrão, escura opcional       | Escura fixa permitida                      |
| Densidade  | Alta, orientada a dados                 | Focada em uma narrativa de análise         |
| Navegação  | Rotas e área logada                     | Fluxo linear de três etapas                |
| Movimento  | Discreto, com progresso e feedback      | Logs progressivos e progresso sincronizado |

### 16.4 Exemplo de estado vazio

```tsx
<div className="rounded-xl border border-dashed border-border p-6 text-center">
  <p className="text-sm font-medium text-foreground">Nenhum diagnóstico gerado</p>
  <p className="mt-1 text-sm text-muted-foreground">
    Gere o primeiro diagnóstico para ver o índice e as pendências.
  </p>
</div>
```

---

## 17. Práticas proibidas

- Criar cores, gradientes ou famílias tipográficas fora desta identidade.
- Usar hex inline quando existir token.
- Usar verde, amarelo ou vermelho como identidade, CTA ou decoração.
- Comunicar estado apenas por cor.
- Usar emojis como ícones da interface.
- Empilhar borda + anel + sombra em cards estáticos.
- Aplicar sombras pesadas ou coloridas.
- Arredondar todos os elementos com pílula.
- Fixar tamanhos de texto em `px`.
- Esconder erros, estados vazios ou limitações atrás de mensagens de sucesso.
- Apresentar simulação como persistência real, auditoria real ou conformidade garantida.
- Criar rolagem horizontal em telas estreitas.
- Introduzir dependência visual sem justificativa.
- Alterar apenas uma cópia do `DESIGN.md`.
- Deixar uma rota ou tela sem caminho de volta e sem conexão visível.
- Usar `dangerouslySetInnerHTML` para conteúdo não confiável.
- Registrar dados sensíveis, tokens ou credenciais no console.

---

## 18. Checklist de revisão visual

- [ ] A tela usa apenas a paleta institucional e as cores funcionais de estado.
- [ ] Tokens são usados no lugar de neutrals fixos.
- [ ] Tipografia e escala estão coerentes com a hierarquia.
- [ ] Há um único `h1` e a ordem de títulos é lógica.
- [ ] Espaçamento, grid e containers seguem o ritmo de 4px.
- [ ] Botões usam a hierarquia correta e uma única ação primária por região.
- [ ] Campos têm rótulo visível, foco e erros acessíveis.
- [ ] Cards, tabelas e listas seguem as receitas e não acumulam efeitos.
- [ ] Estados de loading, sucesso, erro e vazio estão tratados.
- [ ] Score, indicadores e riscos têm rótulo textual além da cor.
- [ ] Animações respeitam `prefers-reduced-motion` e não escondem conteúdo.
- [ ] O layout funciona em 320px, 375px, 768px, 1024px e 1440px.
- [ ] Não há rolagem horizontal indesejada.
- [ ] Teclado, foco e leitor de tela básico funcionam.
- [ ] A copy está em pt-BR e não promete conformidade real.
- [ ] Fluxos simulados deixam claro que são demonstração.
- [ ] O `DESIGN.md` foi atualizado nas duas aplicações, se houve padrão novo.

---

## 19. Governança e sincronização

1. Este é o único documento oficial de identidade visual do ATUE.
2. As cópias em `atue-web/DESIGN.md` e `atue-apresentation/DESIGN.md` devem ser rigorosamente idênticas.
3. Toda alteração visual começa pela leitura deste documento.
4. Toda alteração neste documento deve ser aplicada nas duas cópias no mesmo trabalho.
5. O `AGENTS.md` de cada projeto prevalece em decisões técnicas, arquiteturais e funcionais.
6. O `DESIGN.md` prevalece em decisões visuais e de interação.
7. Não implemente silenciosamente uma divergência: atualize a documentação primeiro.
8. Padrões novos nascem como componente reutilizável ou receita documentada, não como classe solta em uma página.
9. Dívidas visuais conhecidas devem ser registradas no acompanhamento do projeto, não escondidas.
10. Ao finalizar qualquer alteração visual, valide a igualdade das cópias com `cmp` ou `diff` e execute as verificações do projeto.

**Verificação de sincronização:**

```bash
cmp -s atue-web/DESIGN.md atue-apresentation/DESIGN.md \
  && echo "DESIGN.md idêntico" \
  || echo "DIVERGÊNCIA: atualize as duas cópias"
```

## 20. Composição editorial — evitar SaaS genérico

Este guia define identidade, não um kit de dashboard. A interface deve parecer um produto editorial e intencional, não uma sequência de cards genéricos.

### 20.1 Antes de adicionar um elemento

Pergunte se ele cumpre uma função que o texto, o espaçamento ou um divisor não cumprem melhor.

- **Card:** use apenas para conter um bloco com interação, estado próprio ou agrupamento que se perderia sem delimitação. Não transforme cada seção em card.
- **Borda:** use para separar regiões reais. Não desenhe uma caixa para cada informação.
- **Fundo:** use quando houver mudança de contexto ou estado. Não use para decorar agrupamentos que o espaçamento já resolve.
- **Sombra:** use apenas em elementos flutuantes, modais e destaques pontuais.
- **Badge:** use quando o estado precisa ser escaneado rapidamente. Rótulos naturais, metadados e categorias devem ser texto, ponto colorido ou tipografia.
- **Grade de cards:** use quando os itens forem comparáveis e selecionáveis. Não crie grades apenas para preencher largura.
- **Raio:** mantenha a escala canônica. Não arredonde todos os elementos.
- **Ícone em tile:** use quando o ícone for um marco visual recorrente. Fora disso, o ícone pode ser inline.

### 20.2 Preferir

- Hierarquia editorial com títulos, olhos e texto de apoio.
- Agrupamento por proximidade e significado.
- Divisores horizontais discretos entre itens de uma mesma lista.
- Tipografia como principal elemento de composição.
- Espaçamento generoso e consistente.
- Contraste e hierarquia sem depender de caixas.
- Uma composição diferente para cada tipo de conteúdo.
- Componentes com função clara e estados explícitos.

### 20.3 Evitar

- Cards dentro de cards.
- Borda + fundo + sombra + contorno no mesmo bloco sem necessidade.
- Badges para categoria, contagem, metadado ou informação que o texto já comunica.
- Grades de cards idênticos em todas as telas.
- Aparência de template SaaS genérico, com tudo “encapsulado”.
- Excesso de pílulas, ícones em tiles e cantos arredondados.
- Ruído visual que compete com os dados.

### 20.4 Checklist de composição

- [ ] Cada card existente tem uma função de contenção, interação ou estado.
- [ ] Nenhuma informação depende de badge quando texto + ponto ou tipografia bastam.
- [ ] A tela não repete a mesma composição de outra sem motivo de conteúdo.
- [ ] Divisores e espaçamento fazem o trabalho que caixas fariam.
- [ ] A hierarquia continua clara sem bordas e fundos.
- [ ] O resultado parece parte do ATUE, não um dashboard genérico.

**Versão:** 2026-11 · **Aplica-se a:** `atue-web`, `atue-apresentation`.
