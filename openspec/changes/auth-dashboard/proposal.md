## Why

A rota `/cadastro` existe apenas para o fluxo da landing não terminar em 404. A tela atual usa o tema claro dos tokens shadcn, não segue o padrão visual escuro da landing, ignora o domínio recebido no state da rota, não associa rótulos e erros de forma acessível, registra dados do formulário no console e não inicia sessão. A DEV-56 precisa de uma tela de cadastro confiável para o Demoday e de um guia de design compartilhado para que as próximas telas não repitam decisões isoladas.

## What Changes

- Substituir a tela de `/cadastro` por um layout de autenticação escuro, responsivo e consistente com a landing page.
- Criar o guia `DESIGN.md` na raiz com princípios, tokens, receitas de componentes, acessibilidade, responsividade e checklist de contribuição.
- Criar primitives reutilizáveis de formulário e layout de autenticação em `src/components/ui` e `src/components/auth`.
- Compartilhar o cabeçalho público (`SiteHeader`/`BrandLink`) entre a landing e o cadastro, mantendo a marca alinhada com ou sem barra de rolagem.
- Ler o domínio recebido no state da rota com `readDomainState` e exibi-lo de forma defensiva, sem quebrar o acesso direto a `/cadastro`.
- Validar o formulário com React Hook Form + Zod, incluindo senha forte e mensagens acessíveis junto aos campos.
- Simular a criação da conta por meio de um mock tipado, gravar o token no `AuthContext` e redirecionar para `/dashboard`.
- Cobrir os estados de carregamento, sucesso e erro, deixando explícito que o cadastro é uma simulação de demonstração.
- Documentar o padrão adotado no `AGENTS.md` e no `BACKLOG.md` para orientar outros colaboradores.

Fora de escopo:

- Login real, recuperação de senha, confirmação de e-mail e integração com backend.
- Refatoração visual do dashboard ou de outras telas.
- Persistência de sessão em `localStorage`/`sessionStorage` ou cookies.
- Tokenização global de cores em `src/index.css`.
- Test runner automatizado, deploy e alterações de CI.

## Capabilities

### New Capabilities

- `auth-dashboard`: cadastro de conta com domínio recebido da landing, validação acessível, sessão mockada e encaminhamento ao painel.

### Modified Capabilities

<!-- Nenhuma: a rota `/cadastro` era temporária e não possuía requisito consolidado em openspec/specs/. -->

## Impact

- **Rotas:** `/cadastro` mantém o caminho e passa a entregar a tela definitiva de cadastro; `/dashboard` permanece inalterada.
- **Código:** `src/pages/Cadastro.tsx`, novos componentes em `src/components/auth`, `src/components/layout` e `src/components/ui`, tipos em `src/types`, conteúdo em `src/content` e schema em `src/lib`.
- **Sessão:** `src/contexts/AuthContext.tsx` e `src/contexts/auth-context.ts` passam a ser consumidos pela tela.
- **Mocks:** `src/mocks/api.ts` ganha uma operação de cadastro tipada, mantendo o boundary de mock-first.
- **Estilo:** utilitários Tailwind na tela de autenticação; `src/index.css` recebe apenas `scrollbar-gutter: stable` e o fundo do gutter para a superfície escura, sem tokenização global de cores.
- **Documentação:** novo `DESIGN.md` na raiz, com referências em `AGENTS.md` e `BACKLOG.md`.
- **Risco:** a superfície escura de autenticação convive com o dashboard claro; a convergência visual do produto fica registrada como dívida conhecida.
