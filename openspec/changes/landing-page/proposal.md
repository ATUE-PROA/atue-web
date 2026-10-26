## Why

A rota `/` ainda entrega apenas o shell mínimo criado na `project-setup`, sem proposta de valor, navegação pública ou captura de domínio. A DEV-58 precisa dessa superfície para que um visitante entenda o ATUE e inicie o fluxo de cadastro; sem ela, o épico de aquisição não tem porta de entrada e a `auth-dashboard` não tem de onde receber o domínio.

## What Changes

- Substituir o conteúdo de `/` por uma landing page única e responsiva com cabeçalho, hero, faixa de benefícios, "Como funciona?", visão do produto, captura de domínio e rodapé.
- Aplicar o tema escuro da landing por utilitários Tailwind (`neutral-950`, branco e azul), sem alterar os tokens globais de `src/index.css`.
- Criar formulário de captura de domínio com `React Hook Form` + `Zod` + `@hookform/resolvers`, normalizando a entrada e validando um hostname com ao menos um ponto.
- Ao enviar um domínio válido, navegar para `/cadastro` com o domínio normalizado no state da rota (`{ domain: string }`).
- Criar `/cadastro` como página temporária para o fluxo não terminar em 404; a tela definitiva pertence à `auth-dashboard`.
- Manter o roteamento existente para `/` e `*`; `/cadastro` entra como rota nova e `*` continua renderizando a página de não encontrado.
- Compor a interface com componentes de landing separados, ícones Lucide e placeholders visuais em CSS/gradiente para as imagens do Figma.
- Incluir menu mobile acessível, âncoras de navegação e hierarquia de títulos adequada.

Fora de escopo:

- Autenticação, login, cadastro funcional e dashboard (pertencem à `auth-dashboard`).
- Página de confiança/segurança (pertence à `trust-center`).
- Imagens reais, fotografias, mockups finais ou qualquer URL externa de asset.
- Backend, chamadas de rede, crawling, diagnóstico ou mocks de API.
- A área preta vazia e inacabada do frame do Figma.
- Alteração de tokens globais, de outros componentes compartilhados ou de outras changes.

## Capabilities

### New Capabilities

- `landing-page`: apresentação pública do ATUE na raiz, navegação por seções, captura e validação de domínio e início do fluxo de cadastro.

### Modified Capabilities

<!-- Nenhuma: a rota `/` deixa de ser placeholder, mas o requisito de shell em openspec/specs/app-shell/spec.md continua satisfeito pela nova landing. -->

## Impact

- **Dependências:** `react-hook-form`, `zod` e `@hookform/resolvers` em `package.json` e `package-lock.json`.
- **Rotas:** `src/routes.tsx` passa a apontar `/` para a landing e ganha `/cadastro`; `*` permanece com `NotFoundPage`.
- **Código:** novas páginas `src/pages/LandingPage.tsx` e `src/pages/CadastroPage.tsx`; novos componentes em `src/components/landing/`; contrato de state em `src/types/`.
- **Estilo:** apenas utilitários Tailwind na landing; `src/index.css` e os tokens globais não são modificados.
- **Conteúdo:** textos aproximados do frame de baixa resolução ficam centralizados para revisão posterior.
- **Risco:** a landing é a primeira change a instalar formulários; o lockfile e os peer deps com React 19 precisam ser verificados no build e no lint.
