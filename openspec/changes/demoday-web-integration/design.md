## Context

O `atue-web` é a SPA de apresentação do ATUE. O `AGENTS.md` exige mock-first, tipagem estrita, nenhuma promessa de conformidade real e nenhum fallback silencioso de produção para mock. O `DESIGN.md` define superfícies, score, estados e receitas de componentes.

A Core API local ainda é um esqueleto (`Program.cs` sem controllers de autenticação ou diagnóstico). Por isso, a integração é preparada com contratos explícitos e só é ativada por `VITE_API_URL`.

## Goals

- Centralizar HTTP em um único cliente tipado, com token em memória e erros amigáveis.
- Permitir que login, cadastro e diagnóstico usem a API real sem reescrever a interface.
- Melhorar a leitura do diagnóstico com agrupamento por severidade e aviso de resultado degradado.
- Alimentar o relatório local com os dados institucionais informados.

## Non-Goals

- Implementar os endpoints na Core API.
- Persistir sessão ou perfil.
- Ler, enviar ou processar arquivos reais.
- Publicar o app de demonstração na Vercel (DEV-690), que depende de outro repositório e de acesso de deploy.

## Decisions

### Cliente HTTP com parse explícito

`requestJson` recebe uma função de parse em vez de usar type assertion. Cada service valida o payload com narrowing (`src/lib/api.ts`). Falhas de rede, respostas vazias, JSON inválido e `ProblemDetails` viram `HttpError`, sem expor detalhes internos.

### Token em memória

O token JWT fica em variável de módulo (`setAuthToken`/`getAuthToken`) e é limpo no `signOut`. O `AGENTS.md` exige revisão de segurança antes de usar `localStorage`; a tarefa do Jira pedia storage, mas a decisão registrada prioriza a regra do projeto.

### Mock apenas quando a API não está configurada

`isApiConfigured()` controla a escolha. Com `VITE_API_URL` vazia, os services usam mocks. Com a variável preenchida, uma falha real vira erro na interface — nunca uma resposta simulada.

### Leitura do histórico indisponível

`getDiagnostic` retorna `null` quando a API está configurada, porque a Core API ainda não expõe um endpoint de leitura. O painel mostra estado vazio e mantém o formulário como caminho para um novo diagnóstico, em vez de exibir score `0`.

### Score e achados como componentes

`ScoreGauge` concentra o Recharts e expõe o resultado em texto. `FindingsList` agrupa por severidade e usa `details`/`summary` nativos, mantendo o mesmo componente no painel e no resultado da análise.

### Dados institucionais em memória

O envio grava `InstitutionalProfile` em `mocks/organization.ts` após o sucesso do submit. O relatório local passa a mostrar organização, CNPJ, DPO e finalidades informados. Nada é enviado.

## Risks / Trade-offs

- [Contrato real divergente] → o parse falha de forma explícita e a interface mostra erro; o contrato fica em `types/api.ts` para reconciliação com a Core API.
- [Token em memória encerra a sessão ao recarregar] → aceito até existir desenho de persistência revisado.
- [Dados institucionais só existem em memória] → o relatório é gerado na mesma sessão e a limitação está documentada.
