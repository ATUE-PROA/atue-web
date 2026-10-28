# Tasks

## 1. Alinhamento e artefatos

- [x] 1.1 Revisar `proposal.md`, `specs/auth-dashboard/spec.md` e `design.md`; confirmar que login, backend real, refatoração do dashboard e tokenização global permanecem fora do escopo.
- [ ] 1.2 Validar a change com `openspec validate auth-dashboard --strict`; corrigir qualquer requisito ou cenário inconsistente. _(Bloqueado: o CLI `openspec` não está instalado neste ambiente; a estrutura foi revisada manualmente.)_

## 2. Fundação de design

- [x] 2.1 Criar `DESIGN.md` na raiz com princípios, superfícies, cores, tipografia, espaçamento, raios, receitas de componentes, formulários, estados, acessibilidade, responsividade, conteúdo, ícones, gráficos, estrutura, do/don't, checklist de PR e governança.
- [x] 2.2 Criar `src/types/cadastro.types.ts` e `src/content/cadastro.ts` com o contrato do formulário e a copy revisável da tela.
- [x] 2.3 Criar `src/components/ui/form-field.tsx` com rótulo visível, `useId`, ajuda, erro e associação ARIA; verificar uso em campo simples e inválido.
- [x] 2.4 Criar `src/components/ui/password-input.tsx` com botão de mostrar/ocultar senha e nome acessível; verificar acionamento por teclado.
- [x] 2.5 Criar `src/components/auth/AuthShell.tsx` e `src/components/auth/AuthBrandPanel.tsx` com o layout escuro responsivo e o domínio opcional.
- [x] 2.6 Adicionar variantes `brand` e `inverse` ao `Button` sem alterar as variantes existentes; verificar `npm run build`.

## 3. Estrutura visual do cadastro

- [x] 3.1 Reescrever `src/pages/Cadastro.tsx` para ler o state com `readDomainState` e compor o `AuthShell` com o formulário.
- [x] 3.2 Criar `src/components/auth/CadastroForm.tsx` com nome, e-mail, empresa e senha, usando `FormField` e `PasswordInput`.
- [x] 3.3 Implementar a hierarquia de títulos, landmarks, marca ATUE e caminho de volta para `/`; verificar que existe um único `h1`.
- [x] 3.4 Verificar o layout em 320px, 768px, 1024px e 1440px; garantir ausência de rolagem horizontal e empilhamento correto.
- [x] 3.5 Extrair `SiteHeader` e `BrandLink` em `src/components/layout/site-header.tsx`, reutilizar na landing e no `AuthShell` e verificar o alinhamento da marca com e sem barra de rolagem, além do comportamento sticky.

## 4. Formulário, estados e sessão

- [x] 4.1 Criar `src/lib/cadastro.ts` com o schema Zod e as regras de senha forte; verificar manualmente os casos válidos e inválidos.
- [x] 4.2 Adicionar `mockSignUp` tipado em `src/mocks/api.ts`, derivando nome e e-mail do payload e mantendo atraso determinístico.
- [x] 4.3 Integrar React Hook Form + Zod ao formulário, com mensagens acessíveis, preservação dos valores e bloqueio de envio inválido.
- [x] 4.4 Implementar loading, prevenção de envio duplicado, sucesso explícito de demonstração, `signIn` no `AuthProvider` e navegação para `/dashboard`.
- [x] 4.5 Implementar o tratamento de falha com `role="alert"`, mensagem amigável e possibilidade de nova tentativa.
- [x] 4.6 Remover `console.log` de dados do formulário e qualquer exposição de token.

## 5. Acessibilidade e qualidade

- [x] 5.1 Percorrer a tela apenas com teclado; verificar ordem de foco, foco visível e acionamento do botão de senha.
- [x] 5.2 Verificar rótulos, `autoComplete`, `aria-invalid`, `aria-describedby`, `role="alert"` e contraste em todas as variações de estado.
- [x] 5.3 Rodar `npm run lint` e `npm run build`; corrigir qualquer regressão introduzida pela change.
- [x] 5.4 Revisar o diff final; garantir que dashboard e outras telas não relacionadas permaneçam intactas, exceto o cabeçalho compartilhado e o ajuste de gutter em `src/index.css`.

## 6. Documentação e encerramento

- [x] 6.1 Adicionar referência ao `DESIGN.md` no `AGENTS.md` e no checklist do `BACKLOG.md`.
- [x] 6.2 Atualizar o estado da DEV-56 no `BACKLOG.md` conforme o progresso real.
- [ ] 6.3 Arquivar a change após revisão e aprovação. _(Pendente: arquivamento só ocorre após o aceite final.)_

## 7. Refatoração de legibilidade

- [x] 7.1 Renomear `AuthShell` para `AuthLayout` e tornar a composição explícita com `aside` + `children`.
- [x] 7.2 Separar `AuthBenefits` e `AuthPreview` do `AuthBrandPanel`; remover o pareamento de ícones por índice.
- [x] 7.3 Simplificar `CadastroForm`, extrair `FormAlert` e trocar `cloneElement` do `FormField` por render prop.
- [x] 7.4 Remover tipos espelhando copy, limpar mocks mortos e introduzir `services/auth.ts`.
- [x] 7.5 Renomear `AuthProvider`, endurecer `useAuth` e adicionar Prettier + `format:check` ao CI.
- [x] 7.6 Repetir a verificação visual, de teclado e do fluxo de cadastro após a refatoração.
