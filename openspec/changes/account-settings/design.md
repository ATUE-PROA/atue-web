## Context

A área logada possui apenas `/dashboard`, com cabeçalho próprio, `ThemeToggle` dentro do conteúdo e importação direta de `mockGetDiagnostic`. Não existe navegação de produto, rota de configurações, serviço de configurações, primitives de interruptor/select/diálogo, nem um padrão documentado para ações destrutivas. A referência visual do Demoday apresenta duas colunas com seções de notificações, segurança e zona de risco à esquerda; domínio, relatórios e integrações à direita; e uma ação primária de salvar.

Restrições: `AGENTS.md` (mock-first, services como fronteira, tipagem estrita, acessibilidade, sem promessas reais), `DESIGN.md` (tokens, receitas, foco visível, estados, checklist) e `BACKLOG.md` (MVP sem backend real).

## Goals / Non-Goals

**Goals:**

- Criar `/settings` como área de configurações da conta, acessível por um ícone de engrenagem no cabeçalho de produto.
- Implementar seções de notificações, segurança, zona de risco, domínio, relatórios e integrações com estados explícitos.
- Manter o fluxo mock-first, tipado e separado por services.
- Criar primitives reutilizáveis e documentar os novos padrões.
- Ser honesto sobre simulação, ausência de 2FA e exclusão real.

**Non-Goals:**

- Persistência real, backend, OAuth, envio de e-mail, 2FA ou exclusão real.
- Refatorar visualmente a landing, auth, planos ou formulário de documentos.
- Introduzir novo gerenciador de estado, biblioteca de formulários ou de UI.
- Test runner, deploy ou mudanças de CI.

## Decisions

### Cabeçalho de produto compartilhado e ícone de configurações

`src/components/layout/product-header.tsx` compõe `SiteHeader`, `BrandLink`, `NavLink` e `ThemeToggle`. O menu tem “Painel” e “Configurações”; em mobile, os nomes visuais são ocultados e os links mantêm nomes acessíveis. O ícone de engrenagem fica sempre visível e usa `aria-current` via `NavLink`. `BrandLink` ganha `to` opcional (padrão `/`) para que a marca leve ao painel na área logada. Alternativa descartada: duplicar o cabeçalho no dashboard e em configurações.

### Página composta por seções reutilizáveis

`src/components/settings/SettingsSection.tsx` concentra o card de seção (`rounded-xl border border-border bg-card p-6 shadow-sm`), título `h2`, descrição e variação `danger` com `text-destructive` e borda destrutiva. Cada seção de feature usa o componente; a página compõe a grade de duas colunas e o botão de salvar. Alternativa descartada: repetir classes de card em seis blocos.

### Formulário principal único com seções independentes

A página usa um único `<form>` para preferências de notificações e relatórios, com React Hook Form + Zod. As seções de segurança e zona de risco ficam dentro do formulário por composição visual, mas seus controles são `type="button"`; a segurança usa uma instância própria de React Hook Form e intercepta Enter nos campos para alterar a senha em vez de salvar preferências. Alternativa descartada: forms aninhados, que são inválidos em HTML.

### Serviço e mock com estado apenas em memória

`src/services/settings.ts` é a fronteira consumida pela página. `src/mocks/settings.ts` contém os dados determinísticos e um estado de módulo que permite que “salvar” e “conectar integração” alterem a resposta durante a sessão. Recarregar a página restaura o mock base. O dashboard passa a usar `src/services/diagnostic.ts`, removendo a importação direta de mock. Alternativa descartada: `localStorage`, que exigiria revisão de segurança e persistência sem requisito.

### Primitives: Switch, NativeSelect e AlertDialog

- `Switch` usa Radix (`radix-ui`) e tokens, com `data-[state=checked]:bg-blue-600`, foco visível e thumb branco.
- `NativeSelect` encapsula `<select>` nativo estilizado, com chevron decorativo. Evita adicionar o Select Radix para dois campos e mantém comportamento nativo acessível em mobile.
- `AlertDialog` usa Radix e segue as receitas de card, overlay e foco do DESIGN. É usado na zona de risco para confirmação explícita.
- `FormAlert` ganha o tom `info`, usando a receita de informação da seção 2.3 do DESIGN para avisos de demonstração.

### Copy e limitações explícitas

A copy fica em `src/content/settings.ts` com `as const`. Sucesso de salvamento, conexão de integração, alteração de senha e exclusão são sempre identificados como simulação. 2FA aparece como “Em breve”, sem botão inerte. Exclusão usa “Solicitar exclusão” no diálogo e informa que nenhuma conta foi apagada. Alternativa descartada: esconder a zona de risco; a referência visual a inclui e a confirmação acessível é um padrão útil.

## Risks / Trade-offs

- [A tela parece salvar de verdade] → mensagens explícitas de demonstração no salvamento, senha, integração e exclusão.
- [Estado de módulo não persiste após reload] → documentado como limitação; comportamento aceitável no MVP.
- [Enter nos campos de senha poderia salvar preferências] → interceptação explícita para acionar a alteração de senha.
- [Select nativo tem aparência diferente entre navegadores] → wrapper com chevron e tokens; comportamento nativo é preferível a um Select Radix para dois campos.
- [Integração “Conectar” não faz OAuth] → copy e alerta informam conexão simulada; OAuth fica fora de escopo.
- [Exclusão de conta é uma ação sensível] → diálogo obrigatório, ação destrutiva e mensagem de que nada foi apagado.
- [Novos primitives compartilhados] → documentar no DESIGN e validar dashboard, settings e builds.
