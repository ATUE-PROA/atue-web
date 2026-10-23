## Why

O repositório ainda é o scaffold padrão do Vite: CSS puro, sem roteamento, sem biblioteca de componentes e com `strict` desligado no TypeScript. `AGENTS.md` e `BACKLOG.md` descrevem uma fundação (React, Tailwind, shadcn/ui, Lucide, Recharts, roteamento, tipagem estrita) que não existe no código, então qualquer feature dos épicos seguintes partiria de uma base inconsistente. Esta change fecha a lacuna descrita em DEV-42 antes do início da `data-modeling-ts` e das telas.

## What Changes

- Habilitar `strict: true` no `tsconfig.app.json` e corrigir o que quebrar.
- Instalar e configurar Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first, sem `tailwind.config.js`) e `@tailwindcss/typography`.
- Inicializar shadcn/ui (Radix) com alias `@/*`, gerando os tokens de tema e o primeiro componente base.
- Instalar `lucide-react`, `recharts` e `react-router-dom`.
- Substituir o conteúdo de demonstração do Vite (`App.css`, assets do template, contador) por um app shell mínimo e limpo.
- Criar a estrutura de pastas acordada no backlog: `components`, `pages`, `contexts`, `services`, `types`.
- Configurar rotas base com `react-router-dom`: `/` renderiza um placeholder e rotas desconhecidas caem em uma página de não encontrado.
- Atualizar `AGENTS.md` e `BACKLOG.md` para refletir a stack efetivamente instalada.

Fora de escopo: telas reais (`landing-page`, `auth-dashboard`), contratos de API e mocks (`data-modeling-ts`), `React Hook Form`/`Zod` (entram com a primeira change que tiver formulário) e qualquer chamada de rede.

## Capabilities

### New Capabilities

- `app-shell`: comportamento da aplicação base — inicialização, roteamento raiz e fallback de rota inexistente.

### Modified Capabilities

<!-- Nenhuma capability existente: openspec/specs/ está vazio. -->

## Impact

- **Configuração:** `tsconfig.app.json`, `vite.config.ts`, `package.json`, `package-lock.json`, novo `components.json` e `src/index.css` (tokens Tailwind).
- **Código:** `src/App.tsx`, `src/main.tsx`; remoção de `src/App.css` e `src/assets/{hero.png,react.svg,vite.svg}`; novos `src/pages/*`, `src/components/ui/*`, `src/lib/utils.ts`.
- **Documentação:** `AGENTS.md` e `BACKLOG.md` passam a descrever a stack instalada.
- **CI:** nenhum passo novo; `npm run lint` e `npm run build` continuam sendo os portões e passam a validar código com `strict`.
- **Risco:** `strict` pode expor erros de tipo no código existente; a correção faz parte desta change.
