## Context

`/plans` já apresenta comparação, cards, FAQ e suporte, mas não participa do fluxo de autenticação. `LoginForm` e `CadastroForm` navegam para `/dashboard`, e as rotas de produto não possuem noção de plano contratado. A área logada tem `ProductHeader` compartilhado e a página de documentos concentra análise simulada e downloads; configurações expõem integrações.

A change introduz estado de plano em memória, sem backend de assinatura. O objetivo é demonstrar a escolha de plano e o bloqueio de recursos de planos superiores de forma honesta.

## Goals / Non-Goals

**Goals:**

- Levar login e cadastro para `/plans`.
- Permitir escolher um plano com confirmação simulada em `AlertDialog`.
- Bloquear recursos dos planos Cresce e Escala quando o acesso ativo é o Início.
- Refletir o plano ativo nos cabeçalhos e manter caminhos de volta.
- Preservar acessibilidade, responsividade e a natureza simulada do fluxo.

**Non-Goals:**

- Cobrança, gateway de pagamento, nota fiscal ou contrato.
- Persistência de plano, sessão ou autorização real.
- Alterar preços, nomes ou escopo comercial dos planos.
- Criar painel administrativo de assinaturas.
- Testes automatizados.

## Decisions

### Estado de plano em memória com ranking explícito

`PlanProvider` mantém `activePlan` e o diálogo pendente. O ranking `start < growth < scale` fica em `src/lib/plans.ts`, junto de `hasPlanAccess`, `getRequiredPlan` e `getPlanName`. O contexto oferece `canAccess`, `requestFeature`, `requestSubscription`, `subscribe` e `dismissGate`.

Alternativa descartada: persistir em `localStorage`. Não há requisito de persistência e a assinatura é simulada; armazenar estado comercial no navegador sugeriria uma contratação que não existe.

### Login e cadastro levam à escolha do plano

Os formulários navegam para `/plans` com `replace: true` e chamam `resetPlan` para que uma nova sessão sempre comece sem plano ativo. A copy de sucesso do cadastro também aponta para a escolha do plano. `PublicHeader` e `AuthLayout` trocam o botão de sessão para “Planos” enquanto não houver plano ativo, evitando que o atalho de dashboard pule a etapa.

### AlertDialog para assinatura e bloqueio

`SubscriptionPrompt` é montado no `AppRoot` e usa o `AlertDialog` de `src/components/ui/alert-dialog.tsx` com `open={gate !== null}`. O diálogo cobre dois casos:

1. **Assinatura:** a pessoa escolhe um plano autenticada. O CTA “Assinar {plano}” ativa o plano em memória e navega ao painel.
2. **Recurso bloqueado:** integrações e downloads detalhados chamam `requestFeature`. O CTA leva a `/plans`.

O diálogo é modal: overlay escuro, foco preso e retorno de foco ao fechar. “Agora não” (`AlertDialogCancel`), Escape e clique fora chamam `dismissGate`. Ao mudar de rota, o diálogo é fechado; em rotas de produto sem plano, o guarda do `AppRoot` reabre o pedido de acesso.

### Bloqueio de recursos representativos

O mapa `PLAN_FEATURES` cobre:

- `product-access` → Início, para rotas de produto sem plano.
- `detailed-reports` → Cresce, para download de relatórios gerados.
- `integrations` → Cresce, para conexão de integrações.

O bloqueio é visual e de experiência. Quando a Core API validar plano, a autorização real deve continuar no backend.

### Acesso direto a rotas de produto

`AppRoot` observa `/dashboard`, `/documents`, `/profile` e `/settings`. Sem plano ativo, abre o diálogo de assinatura. A tela permanece visível atrás do overlay para que a pessoa entenda o recurso e encontre o caminho para `/plans`.

## Risks / Trade-offs

- [A assinatura parece real] → copy explícita de simulação e ausência de cobrança no diálogo e no `DESIGN.md`.
- [Estado some ao recarregar] → aceito no MVP; documentado em `README.md`, `DESIGN.md` e na seção de dívidas.
- [Bloqueio apenas no frontend] → aceito para demonstração; a autorização real deve ser aplicada pelo backend.
- [Diálogo modal interrompe a navegação] → fechamento por “Agora não”, Escape e clique fora; o caminho para `/plans` fica no CTA principal.
- [Escolher plano diretamente pode pular a leitura] → o diálogo resume que a assinatura é simulada e o plano pode ser revisto em `/plans`.
