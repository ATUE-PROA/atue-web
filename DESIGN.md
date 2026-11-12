# DESIGN.md — Guia de Design do ATUE Web

Este documento é a fonte de verdade para decisões visuais e de interação do frontend do ATUE. Ele complementa o `AGENTS.md` e deve ser consultado antes de criar ou alterar telas, componentes e estilos.

**Princípio central:** o ATUE é uma plataforma B2B de conformidade. A interface deve transmitir confiança, organização e maturidade operacional. Priorize hierarquia, legibilidade e previsibilidade. Evite efeitos decorativos que competem com os dados.

**Regra de manutenção:** todo padrão novo, ou alteração de padrão existente, deve atualizar este arquivo no mesmo pull request. Se a implementação divergir do guia, uma das duas precisa mudar antes do merge.

---

## 1. Superfícies e temas

O projeto tem duas superfícies visuais. Elas compartilham tipografia, espaçamento, raios, acessibilidade e o mesmo conjunto de tokens; mudam o fundo quando o tema claro/escuro é alternado.

### 1.1 Superfície pública e de autenticação

Usada em landing page, cadastro, login e páginas institucionais. Usa os mesmos tokens da superfície de produto, com acentos de marca em azul e CTAs em pílula.

| Papel                  | Classes canônicas                                               |
| ---------------------- | --------------------------------------------------------------- |
| Fundo da página        | `bg-background text-foreground`                                 |
| Texto secundário       | `text-muted-foreground`                                         |
| Borda padrão           | `border-border`                                                 |
| Borda de campo         | `border-input`                                                  |
| Superfície elevada     | `bg-card`                                                       |
| Superfície em destaque | `bg-gradient-to-br from-muted via-card to-background`           |
| Superfície azul clara  | `border-blue-100 bg-blue-50/50 dark:border-border dark:bg-card` |
| Destaque de marca      | `text-blue-600 dark:text-blue-400`                              |
| Foco                   | `ring-blue-600/60 dark:ring-blue-400/60`                        |
| Ação primária          | `bg-blue-600 text-white hover:bg-blue-500`                      |
| Ação neutra/invertida  | `bg-primary text-primary-foreground hover:bg-primary/90`        |
| Fotografia             | `rounded-2xl bg-muted ring-1 ring-black/5 dark:ring-white/10`   |

A vitrine visual do site público é fotográfica (seção 6.25), não um mockup de interface. Não reintroduza mockups decorativos com gradiente sem uma necessidade nova aprovada; quando existirem, eles não são superfícies de leitura e continuam escuros no tema escuro.

O site público também usa **fotografia editorial** (seção 6.25): imagens locais, com pessoas e ambientes reais, que contextualizam o conteúdo. A foto é conteúdo, não decoração: `alt` descritivo em pt-BR e quadro com proporção reservada. Texto sobre fotografia usa o scrim da seção 6.25 para manter contraste AA.

### 1.2 Superfície de produto

Usada na área logada, como o dashboard. Deriva dos tokens shadcn definidos em `src/index.css` e acompanha o tema claro/escuro.

| Papel            | Classes canônicas                    |
| ---------------- | ------------------------------------ |
| Fundo            | `bg-background text-foreground`      |
| Card             | `bg-card text-card-foreground`       |
| Texto secundário | `text-muted-foreground`              |
| Borda            | `border-border`                      |
| Ação primária    | `bg-primary text-primary-foreground` |
| Erro             | `text-destructive`                   |

As duas superfícies compartilham os mesmos tokens. No tema claro, `--primary` e `--ring` usam o azul institucional e os demais tokens usam neutros derivados: isso mantém landing, autenticação, planos e área logada com a mesma paleta de marca sem recriar estilos por tela. Use `dark:` apenas quando um valor precisar mudar entre temas (por exemplo, o azul de marca).

A área logada usa `ProductHeader` (`src/components/layout/product-header.tsx`) como cabeçalho compartilhado entre painel, documentos, perfil e configurações. Ele combina `SiteHeader`, `BrandLink` com `to`, navegação por `NavLink` (painel, documentos, perfil e configurações), ícones com nomes acessíveis e `ThemeToggle`. Em mobile, os rótulos visuais dos links são ocultados, mas os nomes acessíveis permanecem.

### 1.3 Tema claro/escuro

- O padrão é o tema claro. O tema escuro é uma escolha explícita do usuário.
- `ThemeToggle` (`src/components/layout/theme-toggle.tsx`) alterna o tema e grava a escolha em `localStorage` com a chave `atue-theme`. Depois de uma escolha manual, o site deixa de seguir o sistema.
- A classe `.dark` é aplicada em `<html>` por um script em `index.html` antes da primeira pintura (evita flash) e por `src/lib/theme.ts` ao alternar. `watchSystemTheme()` sincroniza o tema enquanto não houver escolha salva.
- Use tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `border-input`, `bg-card`, `text-destructive`) em vez de neutrals fixos.
- O fundo do `html` acompanha `--background`; não use `data-page-surface`.
- O botão de tema é icon-only, precisa de `aria-label` e aparece no `SiteHeader` (landing/auth) e no cabeçalho do dashboard.

---

## 2. Cores

### 2.1 Paleta de marca e decorativa

A interface usa tokens semânticos. As cores abaixo ficam restritas a acentos, mockups decorativos e exceções documentadas.

- `blue-600`: ação primária e acentos.
- `blue-400`: acentos e foco no tema escuro.
- `blue-500`: hover de ações de marca.
- `blue-300`: acentos sobre fotografia escura.
- `blue-50` a `blue-100`: superfícies de destaque pontuais no tema claro (chips de compromissos, painéis de captura e cartões de plano quando houver necessidade de contraste).
- `white` e `white/10` a `white/40`: detalhes em superfícies escuras, como a faixa fotográfica de “Sobre”.
- `black/20` a `black/85`: scrim sobre fotografia para garantir contraste do texto.

### 2.2 Paleta de interface

Use os tokens semânticos (`background`, `foreground`, `card`, `muted`, `primary`, `accent`, `destructive`, `border`, `input`, `ring`) em vez de neutrals fixos. Não crie variações locais sem necessidade.

### 2.3 Cores de estado

Estados nunca devem depender apenas de cor. Sempre combine cor, ícone e texto.

| Estado     | Fundo                                    | Texto                                  | Borda                                            |
| ---------- | ---------------------------------------- | -------------------------------------- | ------------------------------------------------ |
| Sucesso    | `bg-green-600/10 dark:bg-green-500/10`   | `text-green-800 dark:text-green-300`   | `border-green-600/30 dark:border-green-500/30`   |
| Erro       | `bg-destructive/10`                      | `text-destructive`                     | `border-destructive/30`                          |
| Alerta     | `bg-yellow-600/10 dark:bg-yellow-500/10` | `text-yellow-800 dark:text-yellow-200` | `border-yellow-600/30 dark:border-yellow-500/30` |
| Informação | `bg-blue-600/10 dark:bg-blue-500/10`     | `text-blue-800 dark:text-blue-200`     | `border-blue-600/30 dark:border-blue-500/30`     |

Para status operacionais no dashboard, use também um rótulo textual: “Adequado”, “Atenção”, “Crítico”. Não use verde/amarelo/vermelho sozinhos.

#### Score de conformidade

O indicador de score e o arco do gráfico usam a mesma faixa de cor, com rótulo textual ao lado do ponto:

| Faixa de score | Cor                                   | Rótulo     |
| -------------- | ------------------------------------- | ---------- |
| `< 25`         | vermelho — `bg-red-500` / `#ef4444`   | `Crítico`  |
| `25` a `< 50`  | laranja — `bg-orange-500` / `#f97316` | `Atenção`  |
| `50` a `< 75`  | amarelo — `bg-yellow-500` / `#eab308` | `Atenção`  |
| `>= 75`        | verde — `bg-green-500` / `#22c55e`    | `Adequado` |

Os limites pertencem à faixa superior (`25` já é laranja, `50` já é amarelo, `75` já é verde). O texto do rótulo usa o tom `700` no tema claro e `400` no escuro para manter contraste.

### 2.4 Contraste

- Texto principal deve atender WCAG AA no tamanho em que é usado.
- `text-muted-foreground` é para apoio, não para textos longos de leitura.
- Não use texto de baixa ênfase para informação essencial.
- Verifique contraste de estados e placeholders.

### 2.5 Tokens globais (`src/index.css`)

| Token                                | Uso                                                                  |
| ------------------------------------ | -------------------------------------------------------------------- |
| `--background` / `--foreground`      | Página em ambos os temas.                                            |
| `--card` / `--card-foreground`       | Cards e superfícies elevadas.                                        |
| `--muted` / `--muted-foreground`     | Superfície neutra discreta no claro e texto secundário.              |
| `--primary` / `--primary-foreground` | Ação primária e CTA invertido pelo tema; no claro é o azul de marca. |
| `--secondary` / `--accent`           | Hover e seleção.                                                     |
| `--destructive`                      | Erro e ações destrutivas.                                            |
| `--border`, `--input`, `--ring`      | Bordas, campos e foco.                                               |
| `--radius`                           | Raio base de `0.75rem`; os demais raios derivam dele.                |
| `--chart-1` a `--chart-5`            | Séries de gráficos.                                                  |
| `--sidebar-*`                        | Navegação lateral do produto.                                        |

A classe `.dark` é aplicada em `<html>` pelo controle de tema (seção 1.3); os tokens abaixo trocam de valor nos blocos `:root` e `.dark` de `src/index.css`. Não crie um segundo conjunto de variáveis para uma tela isolada.

---

## 3. Tipografia

- **Fonte:** Geist Variable, carregada em `src/index.css`.
- **Família:** `font-sans` em todo o app.
- **Escala base:** `html { font-size: 120% }` (19.2px). Reproduz a leitura confortável de 120% de zoom e faz tipografia, espaçamento, raios e containers em `rem` crescerem juntos. Não fixe tamanhos de texto em `px`; use utilitários `text-*` para acompanhar a escala.
- **Títulos:** `font-semibold tracking-tight`.
- **Rótulos:** `text-sm font-medium`.
- **Corpo:** `text-sm` ou `text-base`, com `leading-relaxed` em blocos longos.
- **Eyebrow:** `text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400`.

### Escala recomendada

| Uso                      | Classes                            |
| ------------------------ | ---------------------------------- |
| Hero / título de página  | `text-4xl sm:text-5xl lg:text-6xl` |
| Título principal de tela | `text-3xl sm:text-4xl`             |
| Título de seção          | `text-2xl sm:text-3xl`             |
| Título de card           | `text-lg`                          |
| Corpo de destaque        | `text-lg leading-relaxed`          |
| Corpo padrão             | `text-base` ou `text-sm`           |
| Auxiliar                 | `text-sm`                          |
| Caption                  | `text-xs`                          |

Evite mais de três tamanhos de título na mesma seção. Não use `font-bold` como padrão; prefira `font-semibold`.

---

## 4. Espaçamento e layout

- Use a escala de 4px do Tailwind. Evite valores arbitrários.
- **Container padrão:** `mx-auto w-full max-w-6xl px-6` (72rem, 1382px na escala base de 120%).
- **Largura de leitura:** `max-w-xl` ou `max-w-2xl` para textos longos.
- **Cabeçalho:** `h-16`.
- **Seções de marketing:** `py-16 sm:py-20 lg:py-24`.
- **Seções editoriais com fotografia:** `py-20 sm:py-28` para a faixa imersiva.
- **Gap entre blocos:** `gap-6` a `gap-12`.
- **Cards:** `p-6` ou `p-8`.
- **Formulários:** `space-y-4` entre campos; `space-y-6` entre grupos.

### Breakpoints

Use mobile-first. Os breakpoints usados no projeto são `sm`, `md`, `lg`.

Verifique sempre: 320px, 375px, 768px, 1024px e 1440px. Não permita rolagem horizontal.

O `html` reserva `scrollbar-gutter: stable` para que contêineres centralizados não mudem de posição entre páginas curtas e longas, e pinta o fundo com `--background` para acompanhar o tema.

---

## 5. Raios, bordas e sombras

- Base do tema: `--radius: 0.75rem`.
- **Inputs e botões de formulário:** `rounded-lg`.
- **Cards e blocos:** `rounded-xl`; o card principal de autenticação usa `rounded-2xl`.
- **Fotografias:** `rounded-2xl` com `ring-1 ring-black/5 dark:ring-white/10`.
- **Shells e containers grandes:** `rounded-2xl`.
- **CTAs de marketing:** `rounded-full`.
- **Badges/chips:** `rounded-full`.
- **Bordas:** `border-border` na interface e `border-input` em campos; mockups decorativos no tema claro usam `border-white/40` e, no escuro, `border-white/10`.
- **Sombras:** `shadow-sm` em cards; `shadow-2xl` apenas em elementos decorativos. Não use sombras coloridas fora de gradientes decorativos.

---

## 6. Componentes e receitas

### 6.1 Botões

Use o componente `Button` de `src/components/ui/button.tsx`. Não recrie botões com `<button>` estilizado sem motivo.

Variantes disponíveis:

- `default`: ação neutra baseada em tokens.
- `brand`: ação primária em azul (`bg-blue-600 text-white hover:bg-blue-500`).
- `inverse`: CTA de marketing em pílula usando `--primary`; isso resolve para o azul de marca.
- `outline`, `secondary`, `ghost`, `destructive`, `link`: variações shadcn.

Regras:

- Use `size="xl"` (altura `h-11`) para ações principais de formulário.
- Sempre forneça `type="button"` em botões que não enviam formulário.
- Botões de ícone precisam de `aria-label`.
- Desabilite durante operações assíncronas e comunique o estado com texto.

### 6.2 Links

- Na interface: `text-muted-foreground hover:text-foreground transition-colors`.
- Foco: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-400/60`.
- Use `<Link>` para navegação interna e `<a>` para âncoras.
- Use `<button>` para ações.

### 6.3 Inputs

- Altura: `h-11` em formulários de autenticação.
- Superfície do campo: `rounded-lg border-input bg-transparent text-foreground placeholder:text-muted-foreground`.
- Foco: `focus-visible:border-blue-600 focus-visible:ring-blue-600/40 dark:focus-visible:border-blue-400 dark:focus-visible:ring-blue-400/40`.
- Erro: `aria-invalid` + borda/anel destrutivo.
- Sempre use `Label` visível associado por `htmlFor`/`id`.
- Use `autoComplete` adequado: `name`, `email`, `organization`, `new-password`, `url`.
- **Textos longos e arquivos:** use `Textarea` para mensagens e `Input type="file"` para anexos, com `multiple` quando aplicável e tipos/tamanho aceitos descritos no texto de ajuda.
- **Busca assíncrona:** quando um campo dispara consulta externa, use um botão secundário ao lado, mantenha o campo editável e comunique carregamento, sucesso e falha com texto. Preencha campos derivados sem impedir a edição manual.

### 6.4 FormField

Use `src/components/ui/form-field.tsx` para campos de formulário. Ele cuida de:

- rótulo visível;
- `id` gerado com `useId`;
- texto de ajuda;
- erro com `role="alert"`;
- `aria-invalid` e `aria-describedby`.

O controle é passado por render prop, sem `cloneElement`:

```tsx
<FormField label="Seu nome" error={errors.nome?.message} required>
  {(field) => <Input {...field} {...register('nome')} />}
</FormField>
```

Não monte manualmente a mesma estrutura em cada campo.

### 6.5 PasswordInput

Use `src/components/ui/password-input.tsx` para senhas. O controle de mostrar/ocultar deve:

- ter nome acessível (“Mostrar senha” / “Ocultar senha”);
- informar estado com `aria-pressed`;
- ser acionável por teclado.

### 6.6 Cards

- Use `Card` (`src/components/ui/card.tsx`) como superfície base, com anel `ring-border` neutro. `SectionCard` compõe `Card`, `CardHeader`, `CardContent` e `CardDescription`, mantendo `role="region"` e `aria-labelledby` para o título.
- Cards: `p-6`; o `SectionCard` usa `CardHeader`/`CardContent` com `p-0` para preservar o espaçamento interno.
- Card principal de autenticação: `rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/5 sm:p-8 dark:shadow-2xl dark:shadow-black/30`.
- Card de plano: `article` com `rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8`; o plano recomendado usa `border-blue-600/40 ring-1 ring-blue-600/15 dark:border-blue-400/40 dark:ring-blue-400/15` e um `Badge` textual “Recomendado”. Não use preenchimento azul no cartão inteiro.
- Título do card: `text-lg font-semibold`.
- Não aninhe mais de dois níveis de card.

### 6.7 Badges e chips

- Use `Badge` (`src/components/ui/badge.tsx`) com `variant="outline"` e as classes de tom (`green`, `yellow`, `blue`, `red`).
- Para chips maiores, use `h-auto rounded-full px-3 py-1`; para chips compactos, mantenha `px-2 py-0.5`.
- Use cor + ícone + texto; não comunique estado apenas por cor.
- Para domínio conectado: `Globe` + texto do domínio em `font-mono` ou `font-medium`.

### 6.8 Alertas de estado

- Estrutura: `div` com `role="alert"` (erro) ou `role="status"` (sucesso ou informação), ícone, título curto e descrição.
- Use `FormAlert` (`src/components/ui/form-alert.tsx`), que compõe `Alert`, `AlertTitle` e `AlertDescription` (`src/components/ui/alert.tsx`), para os alertas de sucesso, erro e informação de formulários e fluxos simulados.
- Tons disponíveis: `success`, `error` e `info`. Use `info` para explicar que uma ação é apenas uma demonstração, sem sugerir falha ou sucesso real.
- Não use apenas `bg-green-100`/`bg-red-100`; use as receitas da seção 2.3.
- Em sucesso simulado, diga explicitamente que a conta é de demonstração.

### 6.9 AuthLayout

Use `src/components/auth/AuthLayout.tsx` como layout base de telas de autenticação.

- Duas colunas em `lg`, alinhadas pelo topo (`lg:items-start`); coluna única abaixo disso.
- Recebe o painel institucional como `aside` (no cadastro, `AuthBrandPanel`).
- Recebe o formulário como `children`.
- Card de formulário à direita.
- Cabeçalho via `SiteHeader` e `BrandLink`, com caminho de volta. Quando já existe sessão ativa, o cabeçalho troca o caminho de volta por um botão `variant="brand"`: “Planos” (ícone `CreditCard`) enquanto não houver plano ativo e “Dashboard” (ícone `LayoutDashboard`) depois da assinatura simulada.
- Para telas com um único card centralizado (login), use `AuthCenteredLayout` do mesmo arquivo; ele compartilha o cabeçalho e centraliza o conteúdo em `max-w-md`.
- O painel institucional usa os benefícios em lista e a fotografia de `CADASTRO_CONTENT.brandPhoto` (seção 6.25), oculta em telas estreitas. Não use elementos decorativos com gradiente neste painel.
- Não replique esse layout em páginas de produto.

### 6.10 SiteHeader e PublicHeader

Use `src/components/layout/site-header.tsx` como cabeçalho das páginas públicas.

- `SiteHeader` concentra `sticky top-0` e o contêiner `max-w-6xl px-6`. O material do cabeçalho é translúcido com desfoque: `border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150`. Use essa receita apenas no cabeçalho fixo; não transforme outras superfícies em vidro.
- `BrandLink` concentra a marca ATUE e deve ser usado em todas as páginas públicas. Renderiza `public/brand/atue-logo-light.svg` no tema claro e `public/brand/atue-logo-dark.svg` no escuro (839×302), sem filtros CSS. Aceita `to` (padrão `/`) para que a marca leve ao painel na área logada. O favicon é `public/favicon.svg`, o ícone sozinho, sem fundo, com o `viewBox` recortado no limite da arte para preencher o espaço da aba.
- O botão de tema (`ThemeToggle`) fica no cabeçalho ao lado das ações, sempre visível em mobile e desktop.
- Landing e planos usam `PublicHeader` (`src/components/layout/public-header.tsx`), que reúne a navegação pública, o `ThemeToggle` e as ações de autenticação. Landing e autenticação devem compartilhar esses componentes; não replique a estrutura do cabeçalho.
- A navegação pública aparece no topo e é repetida no rodapé público (landing e planos): “Como funciona”, “Benefícios”, “Sobre” e “Planos”, mais “Cadastre-se”. Mantenha a lista em `src/content/navigation.ts` e o rodapé em `src/components/layout/public-footer.tsx`.
- As ações de autenticação são idênticas entre landing e planos: “Entrar” como link e “Cadastre-se” como `Button variant="brand" size="lg"` em pílula (`rounded-full`). Quando há sessão ativa, ambas são substituídas por um `Button variant="brand" size="lg"`: “Planos” com `CreditCard` enquanto não houver plano ativo e “Dashboard” com `LayoutDashboard` depois da assinatura simulada.
- O menu móvel usa `Sheet` (`src/components/ui/sheet.tsx`) com `SheetTrigger`, `SheetContent`, `SheetHeader` e `SheetTitle`; o Radix cuida de foco, Escape e overlay. O menu substitui a navegação até `lg`, quando a barra central e as ações de autenticação passam a caber. Mantenha os mesmos destinos e ações, com botões de largura total e alvos de toque de pelo menos 44px.
- O logo mantém a mesma posição horizontal entre páginas, inclusive quando apenas uma delas tem barra de rolagem.

### 6.11 ProductHeader

Use `src/components/layout/product-header.tsx` na área logada (painel, documentos, perfil e configurações).

- Combina `SiteHeader`, `BrandLink to="/dashboard"`, `NavLink` para painel, documentos, perfil e configurações, ícones Lucide e `ThemeToggle`.
- Exibe um chip discreto à esquerda dos links com o plano atual ou “Sem plano ativo”. O chip é um link para `/plans` e usa `CreditCard`.
- Nas páginas internas, use `ProductFooter` ao final do `main` ou como último filho do shell flexível. O rodapé garante caminhos para painel, documentos, envio, perfil, configurações, planos e site.
- `NavLink` fornece `aria-current`; o estado ativo usa `bg-muted text-foreground`.
- Em mobile, os rótulos textuais ficam `hidden sm:inline`; os links mantêm `aria-label` claro, como “Central de Documentos”, “Perfil da conta” e “Configurações da conta”.
- Use `LayoutDashboard` para painel, `Files` para documentos e `UserRound` para perfil; o ícone de configurações é obrigatório na área logada.
- Os ícones são decorativos (`aria-hidden`) porque o link já tem nome acessível.
- Não use `ProductHeader` em landing, autenticação, planos ou formulário público.

### 6.12 Tabelas comparativas

- Use `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell` e `TableCaption` (`src/components/ui/table.tsx`).
- Cabeçalho: `bg-muted/40`, `text-xs tracking-wide text-muted-foreground uppercase`; destaque de coluna com texto e `text-blue-600 dark:text-blue-400`.
- Linhas separadas por `border-b border-border`; a primeira célula usa `font-medium text-foreground`.
- Em telas estreitas, substitua a tabela por cartões empilhados em vez de criar rolagem horizontal na página.

### 6.13 FAQ

- Use `Accordion` (`src/components/ui/accordion.tsx`) com `type="single" collapsible` para perguntas frequentes.
- Use um `AccordionItem` por pergunta; o `AccordionTrigger` já fornece foco visível e o indicador de abrir/fechar.
- Mantenha a resposta em `text-sm leading-relaxed text-muted-foreground`.

### 6.14 Switch

Use `src/components/ui/switch.tsx` para alternâncias binárias.

- Base Radix (`radix-ui`) com `role="switch"` e estado acessível nativo.
- Trilho `h-6 w-11 rounded-full bg-muted`; estado ligado `data-[state=checked]:bg-blue-600`.
- Thumb branco `size-5`, com translação entre os estados.
- Foco visível com anel azul e `ring-offset-background`; estado desabilitado com `opacity-50`.
- Associe um `Label` visível por `htmlFor`/`id`. Não use apenas cor para comunicar o estado.

### 6.15 Select

Use `src/components/ui/select.tsx` para seleções simples.

- Base Radix (`radix-ui`) com `Select`, `SelectTrigger`, `SelectValue`, `SelectContent` e `SelectItem`.
- Use `h-11 w-full` no `SelectTrigger` para alinhar com os inputs.
- Em React Hook Form, use `Controller` e passe `id`, `aria-invalid`, `aria-describedby` e `aria-required` do `FormField` para o `SelectTrigger`.
- Para listas muito longas que precisam de busca, avalie outro padrão antes de usar `Select`.

### 6.16 AlertDialog

Use `src/components/ui/alert-dialog.tsx` para confirmações destrutivas ou irreversíveis.

- O diálogo usa overlay `bg-black/60`, superfície `bg-card`, borda e `rounded-xl`.
- Título `text-lg font-semibold`, descrição `text-sm leading-relaxed text-muted-foreground`.
- A ação destrutiva usa a variante `destructive`; o cancelamento usa `outline`.
- O foco SHALL ir para o diálogo ao abrir e retornar ao gatilho ao fechar.
- Sempre explique a consequência e, em demonstração, diga que nenhum dado real será apagado.

### 6.17 Tela de configurações

- Use `SectionCard` (`src/components/ui/section-card.tsx`) para cada card; ele compõe `Card` (`src/components/ui/card.tsx`) com `p-6`, título `h2` e descrição opcional.
- A variação `danger` usa `border-destructive/30` e título `text-destructive`.
- Layout: duas colunas a partir de `lg`, empilhamento abaixo disso; a coluna direita concentra domínio, relatórios, integrações e a ação de salvar.
- O formulário principal salva notificações e preferências de relatório. Segurança e zona de risco usam ações próprias com `type="button"` para não criar formulários aninhados.
- A ação de salvar é `variant="brand" size="xl"`, com loading, bloqueio de envio duplicado e mensagem explícita de demonstração.
- Domínio é somente leitura, com rótulo visível, estado de verificação por texto + ícone e última verificação.
- Integrações diferenciam “Conectado” e “Conectar” por texto e ícone; a conexão é simulada.
- A zona de risco exige `AlertDialog` antes de qualquer solicitação e nunca afirma exclusão real.

### 6.18 Tela de perfil

Use `src/pages/Profile.tsx` como referência para telas de perfil editáveis.

- Cabeçalho do conteúdo: `h1` “Perfil”, eyebrow `text-xs font-medium tracking-[0.2em] text-blue-600 uppercase dark:text-blue-400` e link “Voltar ao site” com `ArrowLeft`.
- Cards em `SectionCard`: dados pessoais, contato, dados da empresa e responsável legal / DPO. Duas colunas a partir de `lg`; empilhamento abaixo disso.
- Avatar: use `Avatar`, `AvatarImage` e `AvatarFallback` (`src/components/ui/avatar.tsx`) com `size-16 bg-blue-600 text-white`; iniciais derivadas do nome e imagem de prévia local com `object-cover`.
- “Alterar foto” abre um seletor escondido. Aceite PNG, JPG e WebP de até 2 MB, valide tipo e tamanho, revogue o object URL e informe com `FormAlert` que a imagem não é enviada nem salva.
- O formulário é único (React Hook Form + Zod). “Salvar dados” no card pessoal e “Salvar perfil” ao final da coluna direita enviam o mesmo payload, desabilitam juntos e compartilham o feedback no topo.
- O aviso fixo “Ambiente de demonstração: as alterações não serão salvas.” fica sob a ação principal.
- Reutilize `PROFILE_INPUT_CLASSES` (`src/components/profile/profile-styles.ts`) para manter altura e foco dos inputs iguais entre os cards.
- A nota do DPO usa `text-xs leading-relaxed text-muted-foreground` com ícone `Info` decorativo.
- O salvamento é simulado em memória: sucesso, erro e retry são explícitos e nunca prometem persistência real.

### 6.19 Central de Documentos

Use `src/pages/Documents.tsx` como referência para a rota `/documents`.

- Cabeçalho: mesmo padrão do perfil — eyebrow azul em `tracking-[0.2em]`, `h1` “Central de Documentos” e descrição em `max-w-2xl`.
- Conexões: `CrossLinks` no topo leva ao painel, ao envio completo, às preferências de relatório e aos planos. O resultado inclui link para o painel e para a Central de Downloads; a Central de Downloads inclui link para as preferências de relatório. `ProductHeader` e `ProductFooter` completam a navegação.
- Layout principal: grid `lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]` com a entrada/análise à esquerda e a lista de documentos fictícios à direita; empilhe em telas menores.
- Entrada de documento: a ação primária é o botão “Anexar documento” (`Paperclip`), que aciona um `input type="file"` visualmente oculto. Aceite PDF, DOC, DOCX e TXT de até 10 MB, valide extensão e tamanho, mostre o arquivo anexado com nome, tipo, tamanho e uma ação “Remover arquivo” com nome acessível. Nenhum conteúdo do arquivo pode ser lido, enviado ou armazenado; use apenas metadados (`File.name`, `File.size`, extensão).
- A cópia deve deixar explícito que o arquivo permanece no dispositivo e que a IA é uma simulação local. Não afirme que houve leitura de conteúdo, upload ou processamento por modelo real.
- O envio agrega os dados institucionais necessários ao relatório: CNPJ (com consulta OpenCNPJ), nome da empresa, e-mail de contato, encarregado (DPO) e finalidades do tratamento. Esses dados ficam em memória e alimentam o relatório gerado localmente.
- Alternativa de demonstração: abaixo do anexo, `Select` dentro de `FormField` permite escolher um documento fictício. O campo fica desabilitado enquanto houver arquivo anexado; a lista lateral também permite selecionar um exemplo.
- Ação principal: `Button variant="brand" size="xl"` com rótulo “Simular análise”, `aria-busy`, `Loader2` e bloqueio de envio duplicado. O botão permanece desabilitado até existir arquivo anexado ou documento de exemplo selecionado.
- Ao iniciar a análise, role até o cartão de processamento com `scrollIntoView` e `scroll-mt-20` para compensar o cabeçalho fixo. Use `behavior: 'smooth'` por padrão e `'auto'` quando `prefers-reduced-motion: reduce`.
- `FormAlert tone="info"` é obrigatório logo abaixo da ação, explicando que nenhum conteúdo é enviado ou processado por IA real e que a análise é determinística.
- Achados: use `FindingsList`, que agrupa por severidade (`alta`, `media`, `baixa`) com título e contagem por grupo, renderiza `Badge` com cor + rótulo textual e abre explicação e recomendação em `Accordion` (`src/components/ui/accordion.tsx`).
- Resultado: `SectionCard` com grade de score (`text-5xl`), nível do score, `Progress` proporcional, documento, origem (arquivo anexado ou exemplo), data, contagem de achados e resumo por severidade. Sempre inclua `FormAlert tone="info"` com o aviso de demonstração.
- Análise simulada: `AnalysisProgress` usa `Progress` (`src/components/ui/progress.tsx`) com `aria-label` e uma região `role="status"` com a etapa atual. Cada etapa tem estado pendente, ativo, concluído ou erro, com ícone + texto. Transições usam `motion-reduce:animate-none` e `motion-reduce:transition-none`.
- Central de Downloads: `#central-de-downloads` com dois grupos (relatórios gerados e modelos). Cada item tem título, descrição, data, contagem de páginas e os formatos disponíveis.
- O download usa `DropdownMenu` (`src/components/ui/dropdown-menu.tsx`) com os formatos PDF, DOCX e TXT. O gatilho é um `Button variant="outline"` com `Download`, `ChevronDown` e `aria-label` “Escolher formato para baixar {título}”.
- Cada item do menu combina um chip textual do formato (PDF/DOCX/TXT) com título e descrição curta. PDF é “pronto para compartilhar”, DOCX é “editável” e TXT é “texto simples”.
- Durante a geração, o gatilho mostra `Loader2` e “Gerando {formato}...”, desabilita todos os downloads e usa `FormAlert` de preparação/sucesso/erro. O texto deve deixar claro que o arquivo é criado localmente e não é armazenado.
- Animações de entrada (`animate-in fade-in slide-in-from-bottom-2`) são discretas e sempre respeitam `motion-reduce`.
- Não afirme que a análise leu um arquivo real, que houve IA real ou que o resultado garante conformidade. Os arquivos e achados são fictícios e não têm validade legal.
- O dashboard reutiliza `FindingsList` e deve refletir o último diagnóstico simulado salvo em `mocks/diagnostics.ts`.

### 6.20 DropdownMenu

Use `src/components/ui/dropdown-menu.tsx` para menus de ações contextuais, como a escolha do formato de download.

- Base Radix (`radix-ui`), com `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuLabel`, `DropdownMenuSeparator` e `DropdownMenuItem`.
- O conteúdo usa `bg-popover`, `border-border`, `rounded-lg`, `shadow-lg` e animações curtas com `motion-reduce:animate-none`.
- Itens usam `focus:bg-muted` e `data-[disabled]:opacity-50`; mantenha o item inteiro acionável por teclado.
- Use `DropdownMenuTrigger asChild` com um `Button` e preserve um `aria-label` específico no gatilho.
- Para ícones decorativos ou chips de formato, use `aria-hidden="true"` e garanta que o texto do item continue descrevendo a ação.
- Prefira esse primitive a um select nativo quando a ação tiver descrições e ícones; para seleção simples de valor, use `Select`.

### 6.21 ProductFooter e CrossLinks

Use `src/components/layout/product-footer.tsx` e `src/components/layout/cross-links.tsx` para conectar as telas da área logada.

- `ProductFooter` é o rodapé compartilhado de painel, documentos, perfil e configurações. Ele usa `mt-auto`, borda superior, contêiner `max-w-6xl px-6`, aviso de demonstração e links para painel, documentos, envio, perfil, configurações, planos e site.
- `CrossLinks` renderiza uma `nav` com `aria-label` e links em formato de chip (`border-border bg-card`, foco azul). Use para atalhos contextuais no topo de páginas internas.
- Não duplique a lista de destinos em cada página: mantenha os links revisáveis em `src/content/navigation.ts`.
- Toda rota criada deve ser alcançável por pelo menos um controle visível em outra tela e deve oferecer um caminho de volta. Páginas sem conexão são consideradas incompletas.
- Toda navegação entre rotas deve começar no topo da página. A landing é a exceção: as âncoras internas (`#como-funciona` e `#sobre`) mantêm a rolagem para a seção clicada. O retorno à landing a partir de outra tela volta ao topo.
- A navegação pública fica no `PublicHeader` e é repetida no rodapé da landing e de planos pelo `PublicFooter` (`src/components/layout/public-footer.tsx`), que concentra marca, descrição, links públicos e copyright. A área logada usa `ProductFooter`, com os destinos de produto.
- O comportamento fica em `ScrollToTop` (`src/components/layout/scroll-to-top.tsx`), montado no `AppRoot` (`src/components/layout/app-root.tsx`). Não replique `window.scrollTo` em páginas ou componentes.

### 6.22 Arquivos gerados

Os geradores locais (`src/lib/pdf.ts`, `src/lib/docx.ts`, `src/lib/text.ts`) compartilham o contrato `DownloadContent` e devem produzir documentos com aparência profissional.

- **PDF:** A4, margens de 52pt, cabeçalho de demonstração nas páginas seguintes, rodapé com paginação, capa com tipo, título, subtítulo, referência, organização e data, e blocos de métricas em grade. Use Helvetica/WinAnsi, quebra de linha própria e `keepWithNext` para não deixar títulos órfãos no fim da página.
- **DOCX:** pacote OOXML válido com `styles.xml`, `numbering.xml`, `header1.xml`, `footer1.xml`, `docProps/core.xml` e `docProps/app.xml`. Use estilos nomeados (`Title`, `Subtitle`, `Heading1`, `BodyText`, `BulletText`, `MetricValue`, `Notice`), tabela de métricas e campos `PAGE`/`NUMPAGES` no rodapé. O arquivo deve abrir no Word e no Google Docs sem reparo.
- **TXT:** UTF-8, largura de 78 colunas, cabeçalho, métricas com pontilhado, seções sublinhadas, marcadores com recuo e aviso final.
- Os três formatos devem incluir aviso de demonstração e não podem sugerir validade legal. Nenhum arquivo é enviado ou armazenado.
- O conteúdo de relatórios e modelos deve ser revisável em `src/content/documents.ts` e `src/mocks/documents.ts`, com seções completas, referência, versão e linguagem de recomendação.

### 6.23 Dashboard e diagnóstico

Use `src/pages/Dashboard.tsx` como referência para a tela `/dashboard`.

- O `h1` “Painel de Controle” é único. O status geral é opcional: só aparece quando existe um diagnóstico carregado e combina ponto colorido, rótulo textual e `aria-label`.
- O formulário `DiagnosticRequestForm` (`src/components/diagnostics/DiagnosticRequestForm.tsx`) pede a URL do site com `FormField`, valida com Zod e desabilita o envio durante a requisição. Sucesso e erro usam `FormAlert`; o resultado anterior é preservado quando a requisição falha.
- O `ScoreGauge` (`src/components/diagnostics/ScoreGauge.tsx`) é o único lugar que desenha o arco do score. Ele usa `ResponsiveContainer`, limita o valor entre 0 e 100, usa a faixa de cor da seção 2.3 e expõe o resultado também como texto para leitores de tela.
- Quando o relatório retorna `degraded: true`, exiba `FormAlert tone="info"` explicando que o resumo veio do catálogo de referência e pode estar incompleto. O mesmo aviso aparece no resultado da análise de documentos.
- Sem diagnóstico carregado, mostre um estado vazio com instrução para gerar o primeiro diagnóstico; não exiba score `0` como se fosse um resultado real.
- Enquanto a Core API não expõe a leitura do histórico, `getDiagnostic` retorna `null` com `VITE_API_URL` preenchida. A tela então apresenta o estado vazio e mantém o formulário como caminho para um novo diagnóstico.

### 6.24 Planos e assinatura simulada

Use `src/pages/Plans.tsx`, `PlanProvider` (`src/contexts/PlanProvider.tsx`) e `SubscriptionPrompt` (`src/components/plans/SubscriptionPrompt.tsx`) como referência para o fluxo de acesso por plano.

- Login e cadastro encaminham para `/plans`. A escolha do plano é o próximo passo, não o painel.
- A página usa `PublicHeader` e `PublicFooter`. Os benefícios são uma grade de três colunas sem cartões: item com `border-t border-border pt-5`, ícone em `bg-blue-600/10` e título `text-base font-semibold`. Os cartões de plano usam a receita da seção 6.6. O cartão de suporte começa com uma fotografia `aspect-[16/9]` e mantém o restante do conteúdo em `p-6`.
- `SubscriptionPrompt` usa o `AlertDialog` de `src/components/ui/alert-dialog.tsx` com `open={gate !== null}`. O fechamento (`onOpenChange`) chama `dismissGate`.
- A ação principal usa `AlertDialogAction variant="brand"`: na confirmação de assinatura, “Assinar {plano}” ativa o plano em memória e leva ao painel; no bloqueio de recurso ou rota, navega para `/plans`.
- O diálogo é modal: overlay escuro, foco preso e retorno de foco ao fechar. Escape, clique fora e “Agora não” fecham sem alterar o estado. A troca de rota também fecha; rotas de produto sem plano reabrem o pedido.
- Use o mesmo diálogo para bloquear recursos de planos superiores, como integrações e download de relatórios detalhados. Nunca esconda o recurso nem simule sucesso sem acesso.
- Acesso sem plano a `/dashboard`, `/documents`, `/profile` ou `/settings` também abre o diálogo pedindo assinatura; a tela permanece visível atrás do overlay.
- O chip do `ProductHeader` e o botão do `PublicHeader` refletem o estado: “Sem plano ativo” ou o nome do plano. O destino é `/plans` enquanto não houver acesso e `/dashboard` depois dele. Em telas estreitas, o chip mantém o ícone e oculta o rótulo, preservando o `aria-label`.
- Toda a assinatura é simulada e vive apenas em memória. A copy deve dizer que nenhuma cobrança é realizada e que recarregar a página volta ao estado sem plano.

### 6.25 Fotografia editorial

As páginas públicas usam fotografias reais para aproximar a marca do público e explicar o contexto de cada seção.

- Use `Photo` e `PhotoFrame` (`src/components/ui/photo.tsx`). `PhotoFrame` reserva a proporção no quadro (`frameClassName`) antes de a imagem carregar, evitando salto de layout; `Photo` preenche o quadro com `object-cover`.
- Arquivos ficam em `public/photos/` e são referenciados por caminho absoluto (`/photos/...`). Não use URLs externas em runtime.
- Toda foto é conteúdo: exige `alt` descritivo em pt-BR, com pessoas, ambiente e ação quando existirem. Não use `alt=""` para fotos narrativas.
- A primeira imagem da dobra pode usar `priority` (carregamento imediato); as demais usam lazy loading.
- Proporções: herói `aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]`; blocos editoriais e autenticação `aspect-[4/3]`; faixa de suporte `aspect-[16/9]`.
- Direção de arte: pessoas trabalhando em ambientes reais, luz natural, composição editorial, proximidade e profissionalismo. Evite poses publicitárias, aperto de mão genérico, gráficos fictícios, robôs, circuitos e ilustrações de IA.
- Cada foto precisa cumprir uma função narrativa. Se a seção funciona sem a imagem, remova a imagem.
- **Texto sobre fotografia:** use a faixa `relative isolate overflow-hidden` com a foto absoluta e um scrim. Em telas estreitas, `bg-black/60` garante contraste; a partir de `sm`, use `bg-gradient-to-r from-black/85 via-black/65 to-black/30`. O texto fica em `text-white` (título) e `text-white/80` (apoio). Verifique contraste no tema claro e escuro.
- Não aplique filtros de cor nas fotos; mantenha o tratamento natural para combinar com a paleta de marca.

### 6.26 Entrada de seções (Reveal)

Use `Reveal` (`src/components/ui/reveal.tsx`) para uma entrada discreta de blocos abaixo da dobra.

- O conteúdo é sempre renderizado visível. O componente aplica apenas um deslocamento vertical discreto; nunca usa `opacity: 0` em conteúdo essencial.
- Ao entrar na área visível, o bloco desliza para a posição final em `700ms ease-out`, com atraso opcional de até `80ms` (em segundos no GSAP).
- Respeite `prefers-reduced-motion`: sem movimento e sem transição.
- Não anime o que já está na primeira tela e não use `Reveal` em elementos interativos ou dentro de grades que dependem do item ser filho direto.
- Não adicione animação de entrada em fluxos de formulário, confirmações ou carregamentos: nesses casos, o feedback de estado já comunica a mudança.

---

## 7. Formulários e validação

- Use React Hook Form + Zod. Não adicione outra biblioteca.
- Todo campo tem rótulo visível e nome acessível.
- Valide no submit e revalide após o primeiro erro.
- Exiba erros junto ao campo, nunca apenas no topo.
- Preserve os valores digitados quando o envio falha.
- Bloqueie envio duplicado durante operações assíncronas.
- Use `noValidate` no `<form>` para controlar a validação.
- Não use validação de cliente como substituta da validação de backend.
- Não registre dados de formulário, tokens ou credenciais no console.
- Ações destrutivas ou irreversíveis exigem confirmação em `AlertDialog`, com cancelamento e explicação da consequência.
- Em fluxos simulados, não mostre “salvo” ou “excluído” como se a operação tivesse ocorrido em produção.

### Mensagens

- Objetivas e acionáveis: “Informe um e-mail válido.”, “A senha precisa ter pelo menos 8 caracteres, com letra e número.”
- Sem culpar o usuário e sem jargão técnico.
- Sem promessas de conformidade ou sucesso real quando o fluxo é simulado.

---

## 8. Estados

Toda operação assíncrona deve cobrir:

- **Loading:** controle desabilitado + texto (“Criando conta...”) + indicador visual.
- **Sucesso:** confirmação clara e próximo passo.
- **Erro:** mensagem amigável, `role="alert"`, dados preservados e nova tentativa.
- **Vazio:** explicação do que fazer, não apenas uma área em branco.

Não oculte falhas atrás de estados de sucesso. Não mostre “salvo” quando a operação foi apenas simulada.

---

## 9. Acessibilidade

Obrigatório em toda tela:

- Landmarks semânticos: `header`, `main`, `nav`, `section`, `footer`, `form`.
- Um único `h1` por página e hierarquia de títulos coerente.
- Foco visível em todos os controles.
- Ordem de tabulação lógica.
- Nomes acessíveis para controles de ícone.
- Rótulos visíveis para inputs.
- Erros associados ao campo com `aria-describedby`.
- Status não comunicado apenas por cor.
- Contraste adequado.
- Alvos de toque confortáveis; ações principais com pelo menos 44px de altura em mobile.
- Conteúdo decorativo com `aria-hidden="true"`.

---

## 10. Conteúdo e tom

- Idioma da interface: português do Brasil.
- Tom: profissional, direto, sem jargão desnecessário.
- Explique termos técnicos em uma frase curta.
- Não afirme que o ATUE garante conformidade com LGPD ou segurança.
- Não invente diagnósticos, integrações ou resultados.
- Em fluxos simulados, diga que é demonstração.
- Centralize copy revisável em `src/content/`.

---

## 11. Ícones e ilustrações

- Biblioteca: Lucide React.
- Tamanhos: `size-4` em botões/inputs, `size-5` em listas, `size-6` em destaques.
- Ícones decorativos recebem `aria-hidden="true"`.
- Ícones que substituem texto precisam de nome acessível no controle.
- Ilustrações e mockups devem ser construídos com CSS/gradientes e `aria-hidden`, sem URLs externas não revisadas.
- Fotografias seguem a seção 6.25. Só use imagens locais revisadas em `public/photos/`, com `alt` em pt-BR e crédito registrado na seção 17.

---

## 12. Gráficos (Recharts)

- Dados tipados explicitamente.
- Rótulos, unidades e tooltips claros.
- Escalas honestas; não distorça proporções.
- Trate ausência de dados e valores nulos.
- Use `ResponsiveContainer` ou largura responsiva.
- Ofereça resumo textual quando o gráfico for essencial.
- Use gráfico apenas quando ele comunica melhor que uma tabela ou indicador.

---

## 13. Estrutura de arquivos e nomenclatura

- Páginas: `src/pages/PascalCase.tsx`.
- Layout compartilhado: `src/components/layout/kebab-case.tsx`.
- Componentes de feature: `src/components/<feature>/PascalCase.tsx`.
- Cards de seção de configurações e perfil: `SectionCard` (`src/components/ui/section-card.tsx`); cada seção em `PascalCase.tsx` dentro de `src/components/<feature>/`.
- Primitives shadcn: `src/components/ui/kebab-case.tsx`.
- Conteúdo revisável: `src/content/<feature>.ts`.
- Tipos: `src/types/<feature>.types.ts` ou `src/types/api.ts`.
- Lógica pura/schemas: `src/lib/<feature>.ts`.
- Mocks: `src/mocks/`.
- Serviços: `src/services/<feature>.ts`; só eles importam mocks.
- Identificadores de código em inglês; copy de interface em pt-BR.
- Evite `any`; use tipos explícitos ou `unknown` com narrowing.

---

## 14. Do / Don't

### Do

- Reutilize `Button`, `Input`, `Label`, `FormField`, `FormAlert`, `PasswordInput`, `AuthLayout`, `SiteHeader`, `ProductHeader`, `ProductFooter`, `CrossLinks`, `BrandLink`, `Switch`, `Select`, `AlertDialog`, `SectionCard`, `Card`, `Badge`, `Accordion`, `Sheet`, `Table`, `Avatar`, `Progress`, `Skeleton` e `ThemeToggle`.
- Use `max-w-6xl px-6` para páginas.
- Use as receitas de superfície e estado deste guia.
- Conecte cada rota a pelo menos uma outra tela e ofereça caminho de volta.
- Valide em mobile antes de desktop.
- Teste teclado, foco e leitor de tela básico.
- Atualize este guia ao criar padrão novo.

### Don't

- Não use cores arbitrárias ou hex inline.
- Não crie um segundo botão primário com estilo próprio.
- Não use neutrals fixos (`text-neutral-400`, `border-white/10`) em texto ou superfícies de interface; use tokens.
- Não use sombras pesadas, gradientes chamativos ou animações gratuitas.
- Não esconda estados de erro.
- Não registre dados sensíveis no console.
- Não copie textos de concorrentes ou prometa conformidade automática.
- Não execute ação destrutiva sem confirmação em diálogo acessível.
- Não trate simulação como persistência real.

---

## 15. Checklist de PR de design

- [ ] A tela funciona nos temas claro e escuro e usa tokens em vez de neutrals fixos.
- [ ] Cores, raios, sombras e espaçamentos seguem as receitas deste guia.
- [ ] Fotografias usam `PhotoFrame`, têm proporção reservada e `alt` descritivo em pt-BR.
- [ ] Animações de entrada respeitam `prefers-reduced-motion` e não escondem conteúdo sem JavaScript.
- [ ] Componentes compartilhados foram reutilizados.
- [ ] Há um único `h1` e hierarquia de títulos coerente.
- [ ] Inputs têm rótulo visível e `autoComplete`.
- [ ] Erros são acessíveis e associados ao campo.
- [ ] Loading, sucesso, erro e vazio estão tratados.
- [ ] Foco é visível e a ordem de tabulação é lógica.
- [ ] Layout funciona em 320px sem rolagem horizontal.
- [ ] A rota está conectada a outras telas por links visíveis e oferece caminho de volta.
- [ ] Copy está em pt-BR, sem promessas indevidas.
- [ ] Ações destrutivas exigem confirmação acessível e informam quando são simulações.
- [ ] Assinatura, teste de ambiente e bloqueio por plano informam que a operação é simulada e sem cobrança.
- [ ] `npm run lint` e `npm run build` passam.
- [ ] `DESIGN.md` foi atualizado se houve padrão novo.

---

## 16. Governança

- Alterações em `src/index.css` e em tokens globais exigem justificativa e revisão de impacto em todas as telas.
- Alterações em `src/components/ui` são compartilhadas: valide landing, auth e dashboard.
- Novos padrões devem nascer como componente reutilizável ou receita documentada, não como classe solta em uma página.
- Dívidas visuais conhecidas devem ser registradas aqui e no `BACKLOG.md`, não escondidas.

---

## 17. Dívidas e próximos passos

- Não há mockups decorativos na landing nem na autenticação; a vitrine visual dessas telas é fotográfica.
- As fotografias em `public/photos/` são arquivos locais do Unsplash (licença Unsplash), baixados em resolução única e sem `srcset`. Antes de produção, avalie variantes responsivas e WebP/AVIF.
- A landing, o cadastro e os planos usam fotografia; a área logada mantém o layout denso de produto, sem fotos, para preservar a leitura dos dados.
- A escala base de 120% é global. Os breakpoints continuam em `px`, então cada faixa de largura comporta mais conteúdo do que com 120% de zoom do navegador; valide 320px, 768px e 1024px ao criar layouts novos.
- O botão de tema não oferece um terceiro estado explícito “seguir sistema”; depois de uma escolha manual, a preferência salva prevalece.
- O mock de login/cadastro não falha naturalmente; o caminho de erro existe, mas não é exercitável sem gatilho de teste.
- As configurações da conta operam apenas em memória: salvar, conectar integração, alterar senha e solicitar exclusão são simulações e voltam ao estado inicial ao recarregar.
- Autenticação em dois fatores e novas integrações estão marcadas como “Em breve”; não há OAuth real.
- A exclusão de conta é apenas uma solicitação simulada; nenhum dado é apagado.
- O perfil da conta também opera apenas em memória: salvar restaura os dados de demonstração ao recarregar, e a foto escolhida é apenas uma prévia local.
- O CNPJ de demonstração foi ajustado para um valor com dígitos verificadores válidos; não há consulta a bases externas.
- O mock do perfil não falha naturalmente; o caminho de erro de carregamento e retry existe, mas não é exercitável sem gatilho de teste.
- A análise de documentos é uma simulação determinística. O arquivo anexado permanece no dispositivo e apenas nome, tipo e tamanho são usados; nenhum conteúdo é lido, enviado ou processado por IA real.
- Os PDFs, DOCX e TXT são gerados localmente com marca de demonstração e não representam relatórios oficiais nem garantia de conformidade.
- O anexo é um `input type="file"` real usado apenas como controle de entrada. Não há upload, persistência ou leitura de conteúdo.
- O estado da aplicação (diagnóstico, documentos, perfil, configurações e plano ativo) vive apenas em memória e volta ao inicial ao recarregar.
- A assinatura é simulada: não há pagamento, cobrança, contrato ou autorização real. Os planos Cresce e Escala liberam recursos apenas no estado local da demonstração.
- O bloqueio por plano é visual e de experiência; não substitui autorização de backend quando a Core API passar a validar o plano contratado.
- Não há test runner configurado; a verificação é manual + lint + build.
- Com `VITE_API_URL` preenchida, a leitura do histórico de diagnóstico ainda não está disponível na Core API; a tela apresenta estado vazio e oferece um novo diagnóstico.
- O token JWT da Core API fica apenas em memória por decisão de segurança; recarregar a página encerra a sessão até existir um desenho de persistência revisado.

---

## 18. Redesign 2026 — decisões vigentes

Esta seção documenta a iteração de redesign e prevalece sobre valores antigos deste guia quando houver conflito.

### 18.1 Tema e cores

- **Tema claro é o padrão.** O escuro é escolha explícita e não acompanha mais `prefers-color-scheme` na primeira visita.
- A identidade cromática é fixa: preto `#0A0A0A`, superfície escura `#161616`, azul institucional `#2563EB`, cinza intermediário `#777777`, texto secundário `#A0A0A0`, divisores `#CACACA` e branco `#FFFFFF`.
- O fundo claro é `#FFFFFF`, o texto principal é `#0A0A0A` e o card é `#FFFFFF`. O dark usa `#0A0A0A`, card `#161616` e texto `#FFFFFF`.
- O azul institucional é `#2563EB` e não deve ser trocado por outro tom. Tons de apoio são derivados por opacidade (`/10`, `/20`) ou pelas escalas neutras, nunca por novas famílias de cor.
- Não introduza verde, terracota, bege ou outra cor como identidade. Verde/amarelo/vermelho permanecem apenas como estados semânticos (sucesso, atenção, erro), sempre com ícone e texto.
- `--muted-foreground` usa preto/branco com opacidade para manter contraste AA; não use `#A0A0A0` em texto pequeno.

### 18.2 Tipografia

- Títulos `h1`/`h2` usam Fraunces Variable; interface e corpo usam Geist Variable.
- `text-display` é a classe canônica para H1 de página/hero; `text-section` para H2 de seção.
- `text-eyebrow` substitui a repetição de `text-xs uppercase tracking-[0.2em]`.
- O mínimo para metadados é `text-xs` (0,8125rem); textos essenciais usam `text-sm` ou maior.

### 18.3 Componentes e navegação

- `Button variant="brand"` usa `bg-blue-600` e `text-white`; CTAs de formulário não usam pílula. Pílula fica para chips.
- O header do produto usa rótulos a partir de `lg`; abaixo disso, usa o `Sheet` “Menu da conta” com os mesmos destinos e o plano atual.
- Não reintroduza os chips `CrossLinks` nas telas de produto; use o header e um único link de retorno.
- Cards estáticos não devem acumular borda + ring + sombra. Use superfície e divisores; `shadow-soft` fica para o plano recomendado e elementos flutuantes.

### 18.4 Dashboard

- O topo mostra situação, URL analisada, data e próxima ação antes do formulário.
- O índice usa “Adequado / Atenção / Crítico” e sempre traz a ressalva de que é demonstrativo, não certificação.
- “Comece por aqui” lista as pendências prioritárias com o próximo passo; o formulário de novo diagnóstico fica no fim da página.
- O dashboard não repete os atalhos em cards: a navegação já está no header e no footer.

### 18.5 Documentos e envio

- `/documents` separa “Analisar documento” e “Central de downloads” em abas acessíveis.
- Nenhum documento de exemplo vem selecionado por padrão; a análise só habilita após escolha explícita.
- A ação se chama “Simular análise” e o aviso de simulação permanece visível.
- Relatórios bloqueados mostram “Requer plano Cresce” antes do clique; o gate continua disponível.
- `/form` é um wizard de três etapas com stepper, arquivo customizado em pt-BR e revisão antes do envio.

### 18.6 Auth, planos e confiança

- Login oferece “Entrar na demonstração” e recuperação de senha explicitamente simulada.
- Cadastro exige consentimento com links para Termos e Privacidade e mostra checklist de senha.
- Planos têm um único banner de demonstração; o recomendado usa CTA sólido e os demais outline.
- “Explorar demonstração” libera o plano Cresce em memória, sem cobrança, antes de exigir assinatura.
- Páginas `/privacidade`, `/termos` e `/contato` são avisos honestos da demonstração, não políticas jurídicas; os dois rodapés linkam para elas.
- “Falar com o suporte” aponta para `/contato`, não para o formulário de documentos.
