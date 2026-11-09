## Why

O frontend já cobre diagnóstico simulado, achados, central de documentos e downloads locais. Faltam as costuras de integração com a Core API, os campos institucionais exigidos pelo relatório, o agrupamento de achados por severidade e os cenários prontos para a demonstração do Demoday.

## What Changes

- Adicionar `.env.example` e `src/services/http.ts` com cliente tipado, token em memória, `HttpError` e leitura de `ProblemDetails`.
- Ligar `signUp`, `signIn` e `requestDiagnostic` à Core API quando `VITE_API_URL` estiver preenchida, mantendo o mock apenas quando a variável estiver vazia.
- Adicionar formulário de URL ao painel, extrair `ScoreGauge` e tratar `degraded: true`.
- Agrupar achados por severidade com título e contagem por grupo.
- Coletar CNPJ, DPO e finalidades no envio de documentos e usar os dados no relatório gerado localmente.
- Adicionar três cenários fictícios, cartões acionáveis no painel e terminal simulado de 3 a 7 segundos.

## Impact

- Capacidades: `web-api-integration`, `diagnostic-documents`, `institutional-intake`, `demo-scenarios`.
- Rotas: `/dashboard` ganha cenários, formulário de diagnóstico e estado vazio; `/form` ganha campos de DPO e finalidades.
- Sem novas dependências. Sem persistência: token, perfil institucional e cenários vivem em memória.
- Endpoints esperados: `POST /v1/auth/register`, `POST /v1/auth/login` e `POST /v1/diagnostics`.
