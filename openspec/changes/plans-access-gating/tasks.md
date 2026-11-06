# Tasks

## 1. Contratos, conteúdo e regras

- [x] 1.1 Criar `src/types/plans.types.ts` com `PlanId`, `PlanFeatureId`, `PlanFeatureDefinition`, `PlanGateRequest` e `PlanDefinition`.
- [x] 1.2 Adicionar `PLAN_FEATURES`, `PLAN_GATE_CONTENT` e o conteúdo do ambiente de teste em `src/content/plans.ts`.
- [x] 1.3 Criar `src/lib/plans.ts` com ranking de planos, `hasPlanAccess`, `getRequiredPlan` e `getPlanName`.

## 2. Estado e card de assinatura

- [x] 2.1 Criar `PlanContext`/`usePlan` e `PlanProvider` com plano ativo, modo de teste, gate e ações de assinatura.
- [x] 2.2 Montar `PlanProvider` em `src/main.tsx`.
- [x] 2.3 Criar `SubscriptionPrompt` com card superior, animação de entrada, fechamento por botão, X e Escape.
- [x] 2.4 Montar `SubscriptionPrompt` e o aviso de rota de produto sem plano no `AppRoot`.

## 3. Fluxo de planos

- [x] 3.1 Alterar login e cadastro para navegar a `/plans` e atualizar a copy de sucesso do cadastro.
- [x] 3.2 Atualizar `PlanCard` para exibir plano atual, ação autenticada e CTA público.
- [x] 3.3 Atualizar `Plans` para confirmar assinatura, liberar o ambiente de teste e exibir a opção discreta abaixo dos cards.

## 4. Bloqueio por plano

- [x] 4.1 Bloquear conexão de integrações no plano Início com pedido de assinatura.
- [x] 4.2 Bloquear download de relatórios gerados no plano Início com pedido de assinatura.
- [x] 4.3 Exibir o card ao acessar rotas de produto sem plano ativo.

## 5. Cabeçalhos e documentação

- [x] 5.1 Exibir chip de plano, ambiente de teste ou ausência de plano no `ProductHeader`.
- [x] 5.2 Ajustar `PublicHeader` e `AuthLayout` para apontar a “Planos” enquanto não houver plano ativo.
- [x] 5.3 Documentar o padrão em `DESIGN.md`, `README.md` e nos artefatos OpenSpec.

## 6. Validação

- [x] 6.1 Rodar `npm run lint` sem erros.
- [x] 6.2 Rodar `npm run build` com type-check e build de produção.
- [x] 6.3 Rodar `npm run format:check` e Prettier nos arquivos alterados.
- [ ] 6.4 Verificar manualmente o fluxo em navegador: login → planos → assinatura → painel, teste de ambiente, bloqueio de integrações e download, card por Escape e layout em 320px. _(Pendente: o ambiente não possui navegador automatizado nem Playwright; a verificação foi estática, com lint, type-check e build.)_
