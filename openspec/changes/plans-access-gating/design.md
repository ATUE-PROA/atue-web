## Context

`/plans` já apresenta comparação, cards, FAQ e suporte, mas não participa do fluxo de autenticação. `LoginForm` e `CadastroForm` navegam para `/dashboard`, e as rotas de produto não possuem noção de plano contratado. A área logada tem `ProductHeader` compartilhado e a página de documentos concentra análise simulada e downloads; configurações expõem integrações.

A change introduz estado de plano em memória, sem backend de assinatura. O objetivo é demonstrar a escolha de plano, o teste do ambiente e o bloqueio de recursos de planos superiores de forma honesta.

## Goals / Non-Goals

**Goals:**

- Levar login e cadastro para `/plans`.
- Permitir escolher um plano com confirmação simulada em card superior.
- Oferecer um ambiente de teste discreto abaixo dos cards.
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

`PlanProvider` mantém `activePlan`, `isDemo` e o card pendente. O ranking `start < growth < scale` fica em `src/lib/plans.ts`, junto de `hasPlanAccess`, `getRequiredPlan` e `getPlanName`. O contexto oferece `canAccess`, `requestFeature`, `requestSubscription`, `startDemo`, `subscribe` e `dismissGate`.

Alternativa descartada: persistir em `localStorage`. Não há requisito de persistência e a assinatura é simulada; armazenar estado comercial no navegador sugeriria uma contratação que não existe.

### Login e cadastro levam à escolha do plano

Os formulários navegam para `/plans` com `replace: true` e chamam `resetPlan` para que uma nova sessão sempre comece sem plano ativo. A copy de sucesso do cadastro também aponta para a escolha do plano. `PublicHeader` e `AuthLayout` trocam o botão de sessão para “Planos” enquanto não houver plano ativo, evitando que o atalho de dashboard pule a etapa.

### Card superior para assinatura e bloqueio

`SubscriptionPrompt` é montado no `AppRoot` e usa `fixed inset-x-0 top-16 z-40`. O card desce do topo com `animate-in fade-in slide-in-from-top-4`, respeitando `motion-reduce`. Ele cobre dois casos:

1. **Assinatura:** a pessoa escolhe um plano autenticada. O CTA “Assinar {plano}” ativa o plano em memória e navega ao painel.
2. **Recurso bloqueado:** integrações e downloads detalhados chamam `requestFeature`. O CTA leva a `/plans`.

Fechar por “Agora não”, botão `X` ou Escape. O card não é modal: a página permanece visível para contextualizar o recurso, e o foco não é sequestrado. Ao mudar de rota, o card é fechado; em rotas de produto sem plano, o guarda do `AppRoot` reabre o pedido de acesso.

### Ambiente de teste libera o plano Início

“Testar ambiente” fica abaixo dos cards, usa `Button variant="ghost"` com `FlaskConical` e chama `startDemo`, que ativa `start` com `isDemo = true`. A opção exige sessão: sem usuário, leva a `/login`.

### Bloqueio de recursos representativos

O mapa `PLAN_FEATURES` cobre:

- `product-access` → Início, para rotas de produto sem plano.
- `detailed-reports` → Cresce, para download de relatórios gerados.
- `integrations` → Cresce, para conexão de integrações.

O bloqueio é visual e de experiência. Quando a Core API validar plano, a autorização real deve continuar no backend.

### Acesso direto a rotas de produto

`AppRoot` observa `/dashboard`, `/documents`, `/profile` e `/settings`. Sem plano ativo, abre o card de assinatura. A tela continua acessível para que a pessoa entenda o recurso e encontre o caminho para `/plans`.

## Risks / Trade-offs

- [A assinatura parece real] → copy explícita de simulação e ausência de cobrança no card e no `DESIGN.md`.
- [Estado some ao recarregar] → aceito no MVP; documentado em `README.md`, `DESIGN.md` e na seção de dívidas.
- [Bloqueio apenas no frontend] → aceito para demonstração; a autorização real deve ser aplicada pelo backend.
- [Card fixo pode competir com o conteúdo] → largura `max-w-3xl`, posição abaixo do cabeçalho e fechamento fácil.
- [Escolher plano diretamente pode pular a leitura] → o card resume que a assinatura é simulada e o plano pode ser revisto em `/plans`.
