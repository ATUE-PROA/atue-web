## Context

A `landing-page` entregou a rota `/` em tema escuro, com utilitários `neutral-950`, `neutral-400`, bordas `white/10`, destaque `blue-400`/`blue-600` e call-to-action em pílula. O domínio validado na landing chega a `/cadastro` pelo state da rota, e `readDomainState` (`src/lib/domain.ts`) já lê esse contrato de forma defensiva. `AuthProvider` e `useAuth` existem e passam a ser consumidos pelo cadastro. `src/mocks/api.ts` expõe `mockSignUp` e `mockGetDiagnostic` para a camada de services.

A tela atual de `/cadastro` é um card claro com inputs HTML puros, sem associação de rótulos e erros, com `console.log` de dados e sem sessão. Não há frame visual anexado a esta change; a referência adotada é o padrão escuro da landing, confirmado com o responsável.

Motivação: `proposal.md`. Requisitos: `specs/auth-dashboard/spec.md`. Restrições: `AGENTS.md` (Tailwind, acessibilidade, tipagem estrita, mock-first, sem inventar backend) e `BACKLOG.md` (React Hook Form + Zod, responsividade desde 320px, sem `any`).

## Goals / Non-Goals

**Goals:**

- Entregar `/cadastro` em tema escuro, responsivo e coerente com a landing.
- Criar um guia de design compartilhado (`DESIGN.md`) e primitives reutilizáveis para as próximas telas.
- Validar o formulário no cliente, iniciar sessão mockada em memória e encaminhar ao painel.
- Explicitar estados de carregamento, sucesso simulado e erro, sem afirmar cadastro real.

**Non-Goals:**

- Login, recuperação de senha, confirmação de e-mail e autenticação real.
- Refatoração visual do dashboard ou de outras rotas.
- Persistência de sessão em storage ou cookies.
- Tokenização global de cores em `src/index.css`.
- Test runner, deploy, CI ou chamadas de rede.

## Decisions

### Superfície escura por utilitários, sem alterar tokens globais

A tela de autenticação usa o mesmo vocabulário da landing: contêiner `bg-neutral-950 text-neutral-50`, texto secundário `neutral-400`, bordas `white/10`, superfícies `white/5`, destaque `blue-400`/`blue-600` e foco `ring-blue-400/60`. Não alteramos os tokens globais shadcn, porque eles são a base do dashboard claro e de componentes compartilhados. Alternativa descartada: aplicar `.dark` no documento ou reescrever tokens — vazaria para telas fora do escopo.

A única intervenção em `src/index.css` é o `scrollbar-gutter: stable` e o fundo do gutter para páginas escuras. Isso impede que o contêiner centralizado mude de posição entre a landing, que rola, e o cadastro, que pode caber na viewport. A mudança não tokeniza cores nem ativa `.dark` globalmente.

O `DESIGN.md` documenta a coexistência de duas superfícies: pública/autenticação escura e produto claro. A convergência visual do dashboard fica registrada como dívida, não como mudança silenciosa.

### Layout de autenticação decomposto em primitives reutilizáveis

`src/pages/Cadastro.tsx` apenas lê o state da rota e compõe a tela: `<AuthLayout aside={<AuthBrandPanel domain={domain} />}>` com `CadastroForm` como conteúdo. O layout fica em `src/components/auth/AuthLayout.tsx`; o painel institucional em `AuthBrandPanel.tsx`, que compõe `AuthBenefits` e `AuthPreview`; o formulário em `CadastroForm.tsx`; os alertas de estado em `FormAlert` (`src/components/ui/form-alert.tsx`). Campos usam `FormField` (`src/components/ui/form-field.tsx`) e `PasswordInput` (`src/components/ui/password-input.tsx`).

`FormField` concentra rótulo visível, `useId`, `aria-invalid`, `aria-describedby`, texto de ajuda e mensagem de erro. O controle é passado por render prop, sem `cloneElement`, para manter a associação ARIA explícita. `PasswordInput` encapsula o botão de mostrar/ocultar senha com nome acessível e `aria-pressed`. Alternativa descartada: repetir a estrutura de campo e os atributos ARIA em cada input — mais código, mais chance de divergência.

### Cabeçalho público compartilhado

`src/components/layout/site-header.tsx` concentra `SiteHeader` e `BrandLink`. A landing e o `AuthLayout` usam os mesmos componentes, com o mesmo contêiner `max-w-6xl px-6`, altura `h-16`, marca e comportamento `sticky`. O `AuthLayout` mantém o caminho de volta como conteúdo do cabeçalho. Alternativa descartada: duplicar as classes da marca em cada tela — foi a origem da divergência de posição entre a landing e o cadastro.

### Conteúdo centralizado e tipado

Textos da tela ficam em `src/content/cadastro.ts` com `as const`, seguindo o padrão de `src/content/landing.ts`. `src/types/cadastro.types.ts` contém apenas o contrato do formulário, sem tipos espelhando a copy. Textos de uma lista intrinsecamente visual, como os benefícios do painel, ficam junto do componente que os renderiza. Identificadores de código ficam em inglês; copy de interface em pt-BR.

### React Hook Form + Zod com senha forte

O schema fica em `src/lib/cadastro.ts`, com tipo explícito `CadastroFormValues` e `z.ZodType<CadastroFormValues, CadastroFormValues>`, como em `src/lib/domain.ts`. Regras: nome mínimo de 3 caracteres, e-mail válido, empresa mínima de 2 caracteres e senha com pelo menos 8 caracteres contendo letra e número. O formulário usa `noValidate`, validação no submit, revalidação após erro e foco no primeiro campo inválido.

Limitação conhecida: o backend futuro deve repetir a validação; a validação do cliente não é autoridade de segurança.

### Domínio recebido sem inventar estado persistente

A página lê `location.state` com `readDomainState`. Se houver domínio, exibe um chip de contexto no painel institucional; se não houver, a tela funciona normalmente. Recarregar a rota perde o state por definição do histórico do navegador, e isso é aceitável. Alternativa descartada: gravar o domínio em `localStorage` — persistência sem requisito e sem revisão de segurança.

### Cadastro mockado tipado e sessão em memória

`src/mocks/api.ts` expõe `mockSignUp(payload: CadastroFormValues): Promise<UserToken>` com atraso determinístico, derivando nome e e-mail do payload e mantendo `organizationId` mockado. `src/services/auth.ts` é a fronteira consumida pela tela; o componente não importa o mock diretamente. A tela usa `signIn` do `AuthProvider` e navega para `/dashboard` com `replace: true`.

A mensagem de sucesso diz explicitamente que a conta é de demonstração. O `mockLogin` sem payload foi removido por não ter consumidor; o cadastro usa apenas `mockSignUp`.

O caminho de erro permanece implementado com `try/catch` e `role="alert"`, mas o mock não falha naturalmente. Para não inventar um gatilho de produção, a verificação manual desse caminho fica documentada como limitação.

### Guia de design como fonte de verdade

`DESIGN.md` na raiz consolida princípios, cores, tipografia, espaçamento, raios, receitas de componentes, formulários, estados, acessibilidade, responsividade, conteúdo, ícones, gráficos, estrutura de arquivos, do/don't, checklist de PR e governança. `AGENTS.md` e `BACKLOG.md` apontam para o guia para que a adoção não dependa de memória ou de conversa informal.

## Risks / Trade-offs

- [Auth escuro e dashboard claro geram transição visual] → documentar as duas superfícies no `DESIGN.md` e registrar a convergência do dashboard como wave futura.
- [Sem frame de referência anexado] → adotar explicitamente o padrão da landing e documentar a decisão; validar em desktop e mobile.
- [Senha mais forte que a regra anterior pode surpreender] → exibir requisitos em texto de ajuda e mensagem objetiva junto ao campo.
- [Mock não falha naturalmente] → manter tratamento de erro e documentar que o caminho não é exercitável sem gatilho de teste.
- [State da rota é perdido ao recarregar] → tela funciona sem domínio e exibe o contexto apenas quando disponível.
- [Uso de muitas classes de cor hardcoded] → concentrar as receitas no `DESIGN.md` e nos primitives; tokenização global fica para uma change própria.
- [`scrollbar-gutter: stable` reserva espaço em páginas curtas] → aceito para manter o logo e o contêiner alinhados entre rotas; o gutter acompanha a superfície escura via `data-page-surface="dark"`.
- [Sessão apenas em memória] → comportamento aceito no MVP; persistência exige revisão de segurança e não entra nesta change.
