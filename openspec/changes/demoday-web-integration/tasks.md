# Tasks

## 1. Integração HTTP

- [x] 1.1 Criar `.env.example` com `VITE_API_URL`.
- [x] 1.2 Criar `src/services/http.ts` com parse explícito, token em memória, `HttpError` e `ProblemDetails`.
- [x] 1.3 Criar helpers de narrowing em `src/lib/api.ts`.
- [x] 1.4 Ligar `signUp` e `signIn` a `/v1/auth/register` e `/v1/auth/login`.
- [x] 1.5 Limpar o token no `signOut` do `AuthProvider`.
- [x] 1.6 Ligar `requestDiagnostic` a `POST /v1/diagnostics` com fallback apenas quando a API não está configurada.

## 2. Diagnóstico no painel

- [x] 2.1 Criar `DiagnosticRequestForm` com Zod, estados de carregamento, sucesso e erro.
- [x] 2.2 Extrair `ScoreGauge` com `ResponsiveContainer` e resumo textual.
- [x] 2.3 Agrupar achados por severidade em `FindingsList`.
- [x] 2.4 Exibir aviso de `degraded: true` no painel e no resultado da análise.
- [x] 2.5 Cobrir o estado vazio sem diagnóstico carregado.
- [x] 2.6 Atualizar `getDiagnostic` para não devolver mock quando a API está configurada.

## 3. Dados institucionais

- [x] 3.1 Adicionar CNPJ, DPO e finalidades ao formulário e ao schema Zod.
- [x] 3.2 Criar `InstitutionalProfile` e armazenamento em memória.
- [x] 3.3 Usar os dados informados no relatório gerado localmente.
- [x] 3.4 Manter a consulta OpenCNPJ existente.

## 4. Demonstração

- [x] 4.1 Criar cenários fictícios de e-commerce, clínica e agência B2B.
- [x] 4.2 Expor cenários por service e aplicar ao estado de diagnóstico.
- [x] 4.3 Criar `DemoScenarioCards` com `aria-pressed` e aviso de ficção.
- [x] 4.4 Criar `ScanTerminal` com 3 a 7 segundos, `aria-live` e `motion-reduce`.

## 5. Documentação e verificação

- [x] 5.1 Atualizar `DESIGN.md` com o painel, os cenários e o terminal.
- [x] 5.2 Atualizar `README.md` com a integração via `VITE_API_URL`.
- [x] 5.3 Rodar `npm run lint`, `npm run format:check` e `npm run build`.
- [ ] 5.4 Validar manualmente no navegador os temas, os breakpoints e os estados.
- [ ] 5.5 Publicar o app de demonstração na Vercel (DEV-690), fora deste repositório.
