# DESIGN.md — Guia de Design do ATUE Web

Este documento é a fonte de verdade para decisões visuais e de interação do frontend do ATUE. Ele complementa o `AGENTS.md` e deve ser consultado antes de criar ou alterar telas, componentes e estilos.

**Princípio central:** o ATUE é uma plataforma B2B de conformidade. A interface deve transmitir confiança, organização e maturidade operacional. Priorize hierarquia, legibilidade e previsibilidade. Evite efeitos decorativos que competem com os dados.

**Regra de manutenção:** todo padrão novo, ou alteração de padrão existente, deve atualizar este arquivo no mesmo pull request. Se a implementação divergir do guia, uma das duas precisa mudar antes do merge.

---

## 1. Superfícies e temas

O projeto tem duas superfícies visuais. Elas compartilham tipografia, espaçamento, raios e acessibilidade, mas usam fundos diferentes.

### 1.1 Superfície pública e de autenticação (escura)

Usada em landing page, cadastro, login futuro e páginas institucionais.

| Papel                      | Classes canônicas                                                   |
| -------------------------- | ------------------------------------------------------------------- |
| Fundo da página            | `bg-neutral-950 text-neutral-50`                                    |
| Texto secundário           | `text-neutral-400`                                                  |
| Texto auxiliar/caption     | `text-neutral-500`                                                  |
| Borda padrão               | `border-white/10`                                                   |
| Borda de campo             | `border-white/15`                                                   |
| Superfície elevada         | `bg-white/5`                                                        |
| Superfície em destaque     | `bg-gradient-to-br from-white/10 via-neutral-900/60 to-neutral-950` |
| Destaque de marca          | `text-blue-400`                                                     |
| Ação primária              | `bg-blue-600 text-white hover:bg-blue-500`                          |
| Ação invertida (marketing) | `bg-white text-neutral-950 hover:bg-neutral-200`                    |

### 1.2 Superfície de produto (clara)

Usada na área logada, como o dashboard. Deriva dos tokens shadcn definidos em `src/index.css`.

| Papel            | Classes canônicas                    |
| ---------------- | ------------------------------------ |
| Fundo            | `bg-background text-foreground`      |
| Card             | `bg-card text-card-foreground`       |
| Texto secundário | `text-muted-foreground`              |
| Borda            | `border-border`                      |
| Ação primária    | `bg-primary text-primary-foreground` |
| Erro             | `text-destructive`                   |

**Dívida conhecida:** a autenticação é escura e o dashboard é claro. A convergência das superfícies deve ser tratada em uma change própria; não aplique `.dark` globalmente para resolver isso.

---

## 2. Cores

### 2.1 Paleta escura

- `neutral-950`: fundo principal.
- `neutral-900`: superfícies e gradientes.
- `neutral-800`: elementos decorativos.
- `neutral-700` a `neutral-600`: detalhes discretos.
- `neutral-500`: texto auxiliar de baixa ênfase.
- `neutral-400`: texto secundário.
- `neutral-200`: texto de apoio com mais contraste.
- `white`: títulos, CTAs invertidos e textos de maior ênfase.
- `blue-400`: ícones, eyebrows e foco.
- `blue-500`: hover de ações de marca.
- `blue-600`: ação primária.

### 2.2 Paleta de produto

Use os tokens semânticos (`background`, `foreground`, `card`, `muted`, `primary`, `accent`, `destructive`, `border`, `ring`) em vez de cores soltas. Não crie variações locais sem necessidade.

### 2.3 Cores de estado

Estados nunca devem depender apenas de cor. Sempre combine cor, ícone e texto.

| Estado     | Fundo              | Texto             | Borda                  |
| ---------- | ------------------ | ----------------- | ---------------------- |
| Sucesso    | `bg-green-500/10`  | `text-green-300`  | `border-green-500/30`  |
| Erro       | `bg-red-500/10`    | `text-red-300`    | `border-red-500/30`    |
| Alerta     | `bg-yellow-500/10` | `text-yellow-200` | `border-yellow-500/30` |
| Informação | `bg-blue-500/10`   | `text-blue-200`   | `border-blue-500/30`   |

Para status operacionais no dashboard, use também um rótulo textual: “Conforme”, “Atenção”, “Crítico”. Não use verde/amarelo/vermelho sozinhos.

### 2.4 Contraste

- Texto principal deve atender WCAG AA no tamanho em que é usado.
- `text-neutral-400` é para apoio, não para textos longos de leitura.
- Não use `text-neutral-500` para informação essencial.
- Verifique contraste de estados e placeholders.

### 2.5 Tokens globais (`src/index.css`)

| Token                                | Uso                                                    |
| ------------------------------------ | ------------------------------------------------------ |
| `--background` / `--foreground`      | Página na superfície clara.                            |
| `--card` / `--card-foreground`       | Cards e superfícies elevadas.                          |
| `--muted` / `--muted-foreground`     | Superfície discreta e texto secundário.                |
| `--primary` / `--primary-foreground` | Ação primária da superfície clara.                     |
| `--secondary` / `--accent`           | Hover e seleção.                                       |
| `--destructive`                      | Erro e ações destrutivas.                              |
| `--border`, `--input`, `--ring`      | Bordas, campos e foco.                                 |
| `--radius`                           | Raio base de `0.625rem`; os demais raios derivam dele. |
| `--chart-1` a `--chart-5`            | Séries de gráficos.                                    |
| `--sidebar-*`                        | Navegação lateral do produto.                          |

A classe `.dark` existe no CSS, mas não é aplicada globalmente. A superfície pública/auth escura usa utilitários Tailwind; não ative `.dark` no documento para resolver uma tela isolada.

---

## 3. Tipografia

- **Fonte:** Geist Variable, carregada em `src/index.css`.
- **Família:** `font-sans` em todo o app.
- **Títulos:** `font-semibold tracking-tight`.
- **Rótulos:** `text-sm font-medium`.
- **Corpo:** `text-sm` ou `text-base`, com `leading-relaxed` em blocos longos.
- **Eyebrow:** `text-xs font-medium uppercase tracking-[0.2em] text-blue-400` na superfície escura.

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
- **Container padrão:** `mx-auto w-full max-w-6xl px-6`.
- **Largura de leitura:** `max-w-xl` ou `max-w-2xl` para textos longos.
- **Cabeçalho:** `h-16`.
- **Seções de marketing:** `py-16 sm:py-20 lg:py-24`.
- **Gap entre blocos:** `gap-6` a `gap-12`.
- **Cards:** `p-6` ou `p-8`.
- **Formulários:** `space-y-4` entre campos; `space-y-6` entre grupos.

### Breakpoints

Use mobile-first. Os breakpoints usados no projeto são `sm`, `md`, `lg`.

Verifique sempre: 320px, 375px, 768px, 1024px e 1440px. Não permita rolagem horizontal.

O `html` reserva `scrollbar-gutter: stable` para que contêineres centralizados não mudem de posição entre páginas curtas e longas. Páginas de superfície escura marcam o elemento raiz com `data-page-surface="dark"` para que o gutter acompanhe o fundo.

---

## 5. Raios, bordas e sombras

- Base do tema: `--radius: 0.625rem`.
- **Inputs e botões de formulário:** `rounded-lg`.
- **Cards e blocos:** `rounded-xl`; o card principal de autenticação usa `rounded-2xl`.
- **Shells e containers grandes:** `rounded-2xl`.
- **CTAs de marketing:** `rounded-full`.
- **Badges/chips:** `rounded-full`.
- **Bordas:** `border-white/10` na superfície escura; `border-border` na clara.
- **Sombras:** `shadow-sm` em cards; `shadow-2xl` apenas em elementos decorativos. Não use sombras coloridas fora de gradientes decorativos.

---

## 6. Componentes e receitas

### 6.1 Botões

Use o componente `Button` de `src/components/ui/button.tsx`. Não recrie botões com `<button>` estilizado sem motivo.

Variantes disponíveis:

- `default`: ação neutra baseada em tokens.
- `brand`: ação primária na superfície escura (`bg-blue-600 text-white hover:bg-blue-500`).
- `inverse`: CTA de marketing em pílula (`bg-white text-neutral-950 hover:bg-neutral-200`).
- `outline`, `secondary`, `ghost`, `destructive`, `link`: variações shadcn.

Regras:

- Use `size="xl"` (altura `h-11`) para ações principais de formulário.
- Sempre forneça `type="button"` em botões que não enviam formulário.
- Botões de ícone precisam de `aria-label`.
- Desabilite durante operações assíncronas e comunique o estado com texto.

### 6.2 Links

- Na superfície escura: `text-neutral-400 hover:text-white transition-colors`.
- Foco: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950`.
- Use `<Link>` para navegação interna e `<a>` para âncoras.
- Use `<button>` para ações.

### 6.3 Inputs

- Altura: `h-11` em formulários de autenticação.
- Superfície escura: `rounded-lg border-white/15 bg-white/5 text-white placeholder:text-neutral-500`.
- Foco: `focus-visible:border-blue-400 focus-visible:ring-blue-400/40`.
- Erro: `aria-invalid` + borda/anel destrutivo.
- Sempre use `Label` visível associado por `htmlFor`/`id`.
- Use `autoComplete` adequado: `name`, `email`, `organization`, `new-password`.

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

- Superfície escura: `rounded-xl border border-white/10 bg-white/5 p-6`.
- Card principal de autenticação: `rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8`.
- Superfície clara: `rounded-xl border bg-card p-6 shadow-sm`.
- Título do card: `text-lg font-semibold`.
- Não aninhe mais de dois níveis de card.

### 6.7 Badges e chips

- `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium`.
- Use cor + ícone + texto.
- Para domínio conectado: `Globe` + texto do domínio em `font-mono` ou `font-medium`.

### 6.8 Alertas de estado

- Estrutura: `div` com `role="alert"` (erro) ou `role="status"` (sucesso), ícone, título curto e descrição.
- Use `FormAlert` (`src/components/ui/form-alert.tsx`) para os alertas de sucesso e erro de formulários.
- Não use apenas `bg-green-100`/`bg-red-100`; use as receitas da seção 2.3.
- Em sucesso simulado, diga explicitamente que a conta é de demonstração.

### 6.9 AuthLayout

Use `src/components/auth/AuthLayout.tsx` como layout base de telas de autenticação.

- Duas colunas em `lg`; coluna única abaixo disso.
- Recebe o painel institucional como `aside` (no cadastro, `AuthBrandPanel`).
- Recebe o formulário como `children`.
- Card de formulário à direita.
- Cabeçalho via `SiteHeader` e `BrandLink`, com caminho de volta.
- O painel institucional pode incluir elementos decorativos com gradientes e `aria-hidden`.
- Não replique esse layout em páginas de produto.

### 6.10 SiteHeader

Use `src/components/layout/site-header.tsx` como cabeçalho das páginas públicas.

- `SiteHeader` concentra `sticky top-0`, borda, fundo e o contêiner `max-w-6xl px-6`.
- `BrandLink` concentra a marca ATUE e deve ser usado em todas as páginas públicas.
- Landing e autenticação devem compartilhar esses componentes; não replique a estrutura do cabeçalho.
- O logo mantém a mesma posição horizontal entre páginas, inclusive quando apenas uma delas tem barra de rolagem.

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
- Ilustrações devem ser construídas com CSS/gradientes e `aria-hidden`, sem URLs externas não revisadas.

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

- Reutilize `Button`, `Input`, `Label`, `FormField`, `FormAlert`, `PasswordInput`, `AuthLayout`, `SiteHeader` e `BrandLink`.
- Use `max-w-6xl px-6` para páginas.
- Use as receitas de superfície e estado deste guia.
- Valide em mobile antes de desktop.
- Teste teclado, foco e leitor de tela básico.
- Atualize este guia ao criar padrão novo.

### Don't

- Não use cores arbitrárias ou hex inline.
- Não crie um segundo botão primário com estilo próprio.
- Não use `.dark` global para resolver uma tela.
- Não use sombras pesadas, gradientes chamativos ou animações gratuitas.
- Não esconda estados de erro.
- Não registre dados sensíveis no console.
- Não copie textos de concorrentes ou prometa conformidade automática.

---

## 15. Checklist de PR de design

- [ ] A tela usa uma das superfícies definidas (escura pública/auth ou clara de produto).
- [ ] Cores, raios, sombras e espaçamentos seguem as receitas deste guia.
- [ ] Componentes compartilhados foram reutilizados.
- [ ] Há um único `h1` e hierarquia de títulos coerente.
- [ ] Inputs têm rótulo visível e `autoComplete`.
- [ ] Erros são acessíveis e associados ao campo.
- [ ] Loading, sucesso, erro e vazio estão tratados.
- [ ] Foco é visível e a ordem de tabulação é lógica.
- [ ] Layout funciona em 320px sem rolagem horizontal.
- [ ] Copy está em pt-BR, sem promessas indevidas.
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

- A landing usa utilitários hardcoded para a paleta escura; a tokenização global de marca fica para uma change própria.
- O dashboard permanece na superfície clara; a convergência visual com auth/landing precisa de decisão de produto.
- O mock de cadastro não falha naturalmente; o caminho de erro existe, mas não é exercitável sem gatilho de teste.
- Não há test runner configurado; a verificação é manual + lint + build.
