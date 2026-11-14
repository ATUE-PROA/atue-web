# task_aiclient_fix.md — atue-web

**Parte do plano:** [`../task_aiclient_fix.md`](../task_aiclient_fix.md)
**Prazo:** 1 dia
**Objetivo:** alinhar os três contratos quebrados com o Core (`/api/v1`, `Idempotency-Key`, auth/registro) e consumir o `DiagnosticReport` que o Core passa a devolver. **Nenhum componente visual precisa mudar.**

---

## 0. Antes de começar

- [ ] `git status` e `git pull` na `main`.
- [ ] Ler `AGENTS.md` (atualizado nesta task).
- [ ] Confirmar que o Core está rodando em `http://localhost:8000` (ou a porta do `launchSettings.json`).

## 1. Rotas da API

Trocar `/v1/...` por `/api/v1/...`:

- [ ] `src/services/auth.ts`:
  - `POST /v1/auth/register` → `POST /api/v1/registration`
  - `POST /v1/auth/login` → `POST /api/v1/auth/login`
- [ ] `src/services/diagnostic.ts`:
  - `POST /v1/diagnostics` → `POST /api/v1/diagnostics`

Não altere `VITE_API_URL`; ele continua sendo só a base.

## 2. `Idempotency-Key` no diagnóstico

- [ ] Em `src/services/http.ts`, aceitar headers extras no `RequestOptions`:

```ts
interface RequestOptions {
  method?: HttpMethod
  body?: unknown
  signal?: AbortSignal
  headers?: Record<string, string>
}
```

- [ ] Aplicar esses headers no `fetch` sem sobrescrever `Accept`, `Content-Type` ou `Authorization`.
- [ ] Em `requestDiagnostic`, enviar:

```ts
headers: { 'Idempotency-Key': crypto.randomUUID() }
```

- [ ] Tratar `409` (chave repetida/limite) com a mensagem de `ProblemDetails` que já existe no `HttpError`.
- [ ] Não reutilizar a mesma chave entre tentativas da mesma URL? Para o Core, repetir a mesma chave + mesma URL devolve o mesmo resultado; isso é aceitável. O ideal é gerar uma chave por submissão e manter em caso de retry manual.

## 3. Cadastro com CNPJ e setor

O Core exige `cnpj` e `sector`; o formulário atual só tem nome, e-mail, empresa e senha.

- [ ] `src/types/cadastro.types.ts`: adicionar `cnpj: string` e `setor: string`.
- [ ] `src/lib/cadastro.ts`:
  - validar CNPJ com `isValidCnpj` de `src/lib/cnpj.ts`;
  - exigir `setor` com pelo menos 2 caracteres;
  - manter as regras de senha.
- [ ] `src/content/cadastro.ts`: adicionar `fields.cnpj` (`CNPJ`, placeholder `00.000.000/0000-00`, `autoComplete: 'off'`) e `fields.setor` (`Setor`, placeholder `Tecnologia`, `autoComplete: 'organization-title'`).
- [ ] `src/components/auth/CadastroForm.tsx`:
  - adicionar os dois `FormField`s;
  - usar `formatCnpj` no `onChange` do CNPJ, se já houver máscara no projeto;
  - manter o layout e a ordem: nome, e-mail, empresa, CNPJ, setor, senha.
- [ ] `src/types/api.ts` — `SignUpPayload`:

```ts
export interface SignUpPayload {
  name: string
  email: string
  organizationName: string
  cnpj: string
  sector: string
  password: string
}
```

- [ ] `src/services/auth.ts` — `signUp` monta o payload acima. `organizationName` continua vindo de `values.empresa`.

> O `consentimento` não vai para a API; ele é regra local.

## 4. Login

O Core passa a devolver exatamente:

```json
{
  "token": "jwt",
  "tokenType": "Bearer",
  "expiresAt": "...",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "organizationId": "..."
  }
}
```

- [ ] `src/lib/auth.ts` já lê `token`, `user.id`, `user.name`, `user.email`, `user.organizationId`. Não mudar.
- [ ] Se o Core ainda devolver `userId`/`personName`, **não adapte no web**: cobre no Core (task de lá).
- [ ] Testar login com o usuário seedado do Core.

## 5. Diagnóstico

O Core passa a devolver o contrato que o web já usa (`DiagnosticReport`):

```json
{
  "id": "...",
  "organizationId": "...",
  "score": 72,
  "createdAt": "...",
  "url": "...",
  "issues": [
    {
      "id": "missing_hsts",
      "name": "...",
      "severity": "alta",
      "description": "...",
      "explanation": "...",
      "recommendation": "..."
    }
  ],
  "degraded": false
}
```

- [ ] `src/lib/diagnostics.ts` (`parseDiagnosticReport`) já espera `issues[]`, `severity` e `score`. Não mudar.
- [ ] Exibir o aviso de `degraded` já existe no dashboard/documentos? Se não, usar o `FormAlert` existente e o texto de `src/content/diagnostics.ts`.
- [ ] Não criar um adapter no web para “consertar” o Core. O contrato é do Core.

## 6. O que continua mockado

Não mexer nesta task:

- [ ] `src/services/documents.ts` (documentos/downloads).
- [ ] `src/services/profile.ts`, `settings.ts`, `organization.ts`, `form.ts`.
- [ ] `src/mocks/*`.

A regra do `AGENTS.md` continua: mock só entra quando `VITE_API_URL` está vazio; falha real não vira mock silencioso.

## 7. Validação

```bash
npm run lint
npm run format:check
npx tsc -b
```

Manual, com `VITE_API_URL=http://localhost:8000`:

- [ ] Cadastro com CNPJ válido → login → dashboard.
- [ ] Cadastro com CNPJ inválido → erro no campo, sem request.
- [ ] Login com senha errada → mensagem do `ProblemDetails`.
- [ ] Diagnóstico com URL real → score, achados e resumo.
- [ ] Duplo clique no envio → uma única requisição (ou o Core devolve o mesmo resultado pela chave).
- [ ] Derrubar o AI Service → `degraded: true` visível, sem tela de erro genérica.
- [ ] Sem `VITE_API_URL` → mocks continuam funcionando.

## 8. Armadilhas

| Armadilha                                   | Efeito           | Correção                                                 |
| ------------------------------------------- | ---------------- | -------------------------------------------------------- |
| Esquecer `/api` nas rotas                   | 404              | Testar as três rotas                                     |
| `crypto.randomUUID()` em contexto inseguro  | erro             | Produção é HTTPS; local `localhost` é seguro             |
| CNPJ formatado vs dígitos                   | 400              | Enviar `normalizeCnpj` ou o formato; combinar com o Core |
| Token em `localStorage`                     | XSS              | Manter em memória, como o `AGENTS.md` manda              |
| `parseDiagnosticReport` com `issues` antigo | erro de contrato | O Core é quem muda                                       |

## 9. Critério de pronto

- [ ] `npm run lint` e `npx tsc -b` passam.
- [ ] Cadastro, login e diagnóstico funcionam contra o Core.
- [ ] `Idempotency-Key` é enviado.
- [ ] Nenhum componente visual foi refeito.
- [ ] Mocks de documentos/perfil/configurações continuam intactos.
- [ ] `AGENTS.md` atualizado.
