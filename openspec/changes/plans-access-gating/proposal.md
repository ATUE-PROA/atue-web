## Why

Hoje login e cadastro levam direto ao painel. A página de planos existe, mas é apenas informativa: não há estado de plano ativo e recursos de planos superiores ficam disponíveis sem distinção. Para a demonstração do Demoday, o fluxo precisa deixar claro que a pessoa escolhe um plano antes de usar a área logada e que integrações e relatórios detalhados pertencem aos planos Cresce e Escala.

## What Changes

- Encaminhar login e cadastro para `/plans` em vez de `/dashboard`.
- Criar `PlanProvider` com plano ativo, verificação de acesso por recurso e solicitação de assinatura em memória.
- Adicionar confirmação de assinatura simulada em `AlertDialog` quando a pessoa escolhe um plano autenticada.
- Bloquear integrações e download de relatórios detalhados com o mesmo diálogo de assinatura.
- Abrir o diálogo de assinatura quando uma rota de produto for acessada sem plano ativo.
- Refletir o estado do plano no `ProductHeader`, `PublicHeader` e `AuthLayout`.
- Documentar o padrão em `DESIGN.md`, `README.md` e nos artefatos OpenSpec.

Fora de escopo:

- Pagamento, cobrança, contrato ou integração com gateway.
- Persistência de plano em backend, cookie ou storage.
- Autorização real na Core API.
- Novos planos, preços ou recursos comerciais.
- Test runner automatizado.

## Capabilities

### New Capabilities

- `plan-access`: escolha de plano após autenticação, assinatura simulada e bloqueio de recursos por plano.

### Modified Capabilities

<!-- Nenhuma mudança observável nas capabilities existentes além do destino pós-autenticação, coberto pela nova capability. -->

## Impact

- **Rotas:** login e cadastro passam a navegar para `/plans`; rotas de produto exibem diálogo de assinatura quando não há plano ativo.
- **Código:** novos tipos, conteúdo, lib, contexto `PlanProvider`, componente `SubscriptionPrompt` e ajustes em `PlanCard`, `Plans`, `AppRoot`, cabeçalhos, `IntegrationsSection` e `Documents`.
- **Estilo:** novo padrão de diálogo de assinatura (`AlertDialog`) e chip de plano no cabeçalho, documentado em `DESIGN.md`.
- **Risco:** a assinatura parece real. A copy deve informar que não há cobrança e que o estado vive apenas em memória.
