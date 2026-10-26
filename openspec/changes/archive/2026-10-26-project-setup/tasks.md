## 1. Dependências e estilos

- [x] 1.1 Instalar `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/typography`, `lucide-react`, `recharts` e `react-router-dom`; verificar com `npm ls` que todas resolvem sem erro de peer dependency.
- [x] 1.2 Registrar o plugin `@tailwindcss/vite` em `vite.config.ts` e substituir `src/index.css` pelos imports do Tailwind (`@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`) com os tokens do tema; verificar que `npm run build` gera CSS com utilitários aplicados.
- [x] 1.3 Configurar o alias `@/*` em `tsconfig.app.json` e em `vite.config.ts`; verificar importando `@/lib/utils` em um arquivo temporário e rodando `npm run build`.

## 2. Componentes e estrutura

- [x] 2.1 Inicializar shadcn/ui (`components.json`, `src/lib/utils.ts`, tokens de tema) e gerar o componente `button` como base; verificar que o arquivo existe em `src/components/ui/button.tsx` e que `npm run build` passa.
- [x] 2.2 Criar as pastas `src/components`, `src/pages`, `src/contexts`, `src/services` e `src/types`; verificar que cada uma existe no repositório.
- [x] 2.3 Remover o conteúdo de demonstração do Vite (`src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg` e o contador); verificar que `npm run lint` e `npm run build` continuam verdes.

## 3. Roteamento

- [x] 3.1 Criar `src/pages/HomePage.tsx` com um `h1` do produto e `src/pages/NotFoundPage.tsx` com `h1` e link "Voltar para o início" para `/`; verificar que ambos renderizam no navegador em `npm run dev`.
- [x] 3.2 Configurar `createBrowserRouter` e `RouterProvider` com as rotas `/` e `*`; verificar `/` e `/caminho-que-nao-existe` no dev server, incluindo recarregamento direto das duas URLs.
- [x] 3.3 Ajustar o `<title>` do `index.html` para o produto; verificar no navegador que a aba não exibe mais o título do template.

## 4. Tipagem estrita

- [x] 4.1 Ligar `"strict": true` em `tsconfig.app.json` e corrigir os erros apontados; verificar que `npm run build` (`tsc -b`) conclui sem erro.
- [x] 4.2 Confirmar que `@typescript-eslint/no-explicit-any` está como erro em `eslint.config.js`; se estiver como aviso, promover para erro e verificar com `npm run lint`.

## 5. Documentação e verificação final

- [x] 5.1 Atualizar `AGENTS.md` (seção 2 — stack instalada, com React 19, Tailwind v4, shadcn/ui, Lucide, Recharts, React Router e `strict` ligado) e `BACKLOG.md` (decisões de arquitetura e critério 1.1 da DEV-42); verificar lendo os dois arquivos e comparando com `package.json`.
- [x] 5.2 Rodar `npm run lint` e `npm run build`, depois `openspec validate project-setup --strict`; verificar que os três terminam sem erro.
- [x] 5.3 Commitar a change implementada com mensagem semântica e confirmar o CI verde no GitHub Actions para o commit enviado.
