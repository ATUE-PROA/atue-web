## Context

O repositório é o scaffold do Vite 8 com React 19.3.1 e TypeScript 6.0.3. `tsconfig.app.json` já liga `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` e `noFallthroughCasesInSwitch`, mas não `strict`. `vite.config.ts` não tem alias. O CI (`.github/workflows/ci.yml`) roda `npm ci`, `lint` e `build` no Node 24 (`.nvmrc`). Não há camada de UI, roteamento, serviços nem testes automatizados.

Motivação: `proposal.md`. Requisitos: `specs/app-shell/spec.md`.

## Goals / Non-Goals

**Goals:**

- Base de estilo, componentes, roteamento e tipos pronta para receber `data-modeling-ts` e as telas dos épicos 2 e 3.
- Build e lint verdes com `strict` ligado, sem exceções por arquivo.

**Non-Goals:**

- Telas de produto, formulários, autenticação, mocks de API e chamadas de rede.
- Test runner: não há framework de teste instalado e esta change não adiciona um; a verificação é lint + build + inspeção manual das rotas.
- Configuração de deploy.

## Decisions

### Tailwind CSS v4 via `@tailwindcss/vite`, sem `tailwind.config.js`

Tailwind v4 lê a configuração do próprio CSS (`@import "tailwindcss"`, `@theme`). Isso elimina `tailwind.config.js` e `postcss.config.js`, e o plugin oficial do Vite dispensa a cadeia PostCSS. Alternativa descartada: Tailwind v3 com PostCSS — mais arquivos de configuração e já não é o caminho documentado para instalação nova. `@tailwindcss/typography` é declarado com `@plugin` no CSS, como exige o BACKLOG 2.2.

### shadcn/ui como código-fonte no repositório, com alias `@/*`

`shadcn init` gera `components.json`, `src/lib/utils.ts` e tokens em `src/index.css`; os componentes são copiados para `src/components/ui`, então não viram dependência de runtime. Requer o alias `@/*` em `tsconfig.app.json` e em `vite.config.ts` (via `resolve.alias`). Alternativa descartada: instalar Radix manualmente — mais trabalho para o mesmo resultado e fora do padrão do AGENTS.md.

### `createBrowserRouter` em vez de `BrowserRouter`

O router de dados do React Router 7 é o caminho documentado da versão e permite adicionar `loader`/`errorElement` por rota depois, sem reescrever o roteamento. Custo agora: um objeto de rotas e um `RouterProvider` em `main.tsx`. Alternativa descartada: `BrowserRouter` + `Routes` — mais simples hoje, migração garantida quando as telas passarem a carregar dados.

### Estrutura de pastas alinhada ao BACKLOG 1.1

`src/components` (com `src/components/ui` para shadcn), `src/pages`, `src/contexts`, `src/services`, `src/types`, `src/lib`. Pastas sem conteúdo ainda não entram com `index.ts` vazio; entram quando a primeira change precisar delas — exceto `services`/`contexts`/`types`, que são criadas vazias por serem contrato do épico.

### `strict: true` ligado ao final, depois da limpeza do scaffold

Ligar `strict` antes de remover o código de demonstração expõe erros que vão desaparecer de qualquer forma. A ordem das tasks garante build verde em cada passo.

### Remoção do conteúdo de demonstração do Vite

`src/App.css`, `src/assets/{hero.png,react.svg,vite.svg}` e o contador saem; `public/icons.svg` e `public/favicon.svg` permanecem (usados pelo `index.html`). O `index.html` mantém o favicon e tem título ajustado para o produto.

## Risks / Trade-offs

- [CLI do shadcn pode falhar por rede ou por peer deps com React 19] → rodar `shadcn init` com `--yes` e, se o registry falhar, criar `components.json` + `src/lib/utils.ts` manualmente e seguir sem o componente de exemplo.
- [`strict` expõe erros no código existente] → remover o scaffold antes de ligar a flag; `main.tsx` já usa `!` no `getElementById`, que será substituído por uma checagem explícita.
- [Tailwind v4 exige navegadores modernos] → aceitável para o MVP; sem suporte a IE.
- [Alias `@/*` divergente entre TS e Vite] → configurar nos dois arquivos na mesma task e validar com um import de `@/lib/utils` no build do CI.
- [`no-explicit-any` pode não estar como erro no ESLint atual] → verificar em `eslint.config.js` durante a implementação; se estiver como aviso, promover a erro, porque o BACKLOG proíbe `any` no CI.

## Migration Plan

Trabalho em um único PR para `main`, com CI como portão. Rollback: reverter o commit da change restaura o scaffold. Não há dados nem estado persistido a migrar.
