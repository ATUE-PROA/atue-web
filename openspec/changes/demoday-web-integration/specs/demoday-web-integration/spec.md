# Spec Delta

## Purpose

Definir a costura de integração com a Core API, os dados institucionais do relatório e o agrupamento de achados do `atue-web`.

## ADDED Requirements

### Requirement: Cliente HTTP configurável

O frontend SHALL ler a base da Core API de `VITE_API_URL` e SHALL usar um único cliente HTTP na camada de services. O cliente SHALL enviar `Authorization: Bearer` quando houver token em memória e SHALL converter falhas de rede, respostas vazias, JSON inválido e `ProblemDetails` em erro tipado com mensagem amigável.

#### Scenario: API não configurada

- **WHEN** `VITE_API_URL` está vazia
- **THEN** os services usam dados de demonstração
- **AND** nenhuma chamada de rede é disparada para a Core API

#### Scenario: API configurada e indisponível

- **WHEN** `VITE_API_URL` está preenchida e a requisição falha
- **THEN** a interface mostra erro com opção de nova tentativa
- **AND** nenhuma resposta simulada é exibida como se fosse real

### Requirement: Autenticação usa a Core API quando configurada

`signUp` e `signIn` SHALL chamar `POST /v1/auth/register` e `POST /v1/auth/login` quando a API estiver configurada, validar o `UserToken` recebido e manter o token apenas em memória. O `signOut` SHALL limpar o token.

#### Scenario: Login com sucesso

- **WHEN** a pessoa envia credenciais válidas com a API configurada
- **THEN** a sessão é iniciada e o painel é aberto
- **AND** o token fica disponível apenas para o cliente HTTP

### Requirement: Diagnóstico pode ser solicitado pela URL

O painel SHALL oferecer um formulário de URL validado por Zod, com estado de carregamento, sucesso e erro. Com a API configurada, a submissão SHALL chamar `POST /v1/diagnostics`; sem configuração, SHALL usar um mock determinístico derivado da URL.

#### Scenario: Diagnóstico sem histórico

- **WHEN** a API está configurada e não há diagnóstico carregado
- **THEN** o painel mostra estado vazio com instrução para gerar o primeiro diagnóstico
- **AND** não exibe score `0` como resultado real

#### Scenario: Resultado degradado

- **WHEN** o relatório retorna `degraded: true`
- **THEN** um aviso acessível informa que o resumo veio do catálogo de referência
- **AND** o mesmo aviso aparece no resultado da análise de documentos

### Requirement: Achados são agrupados por severidade

A lista de achados SHALL agrupar por severidade `alta`, `media` e `baixa`, com título e contagem por grupo. A severidade SHALL ser comunicada por texto e ícone, e cada achado SHALL manter explicação e recomendação expansíveis.

#### Scenario: Grupos visíveis

- **WHEN** o relatório possui achados de mais de uma severidade
- **THEN** cada severidade presente aparece como um grupo próprio
- **AND** a ordem é alta, média e baixa

### Requirement: Envio coleta dados institucionais

O formulário de envio SHALL coletar CNPJ, empresa, e-mail, DPO (nome e e-mail) e finalidades, com validação Zod. Após sucesso, os dados SHALL alimentar o relatório gerado localmente com organização, CNPJ, DPO e finalidades.

#### Scenario: Relatório com dados informados

- **WHEN** a pessoa conclui o envio com DPO e finalidades preenchidos
- **THEN** o relatório gerado cita a organização, o CNPJ, o DPO e as finalidades informadas
- **AND** o arquivo continua marcado como demonstração

## Out of scope

- Deploy do app de demonstração na Vercel (DEV-690).
- Leitura do histórico de diagnósticos na Core API.
- Persistência de sessão ou perfil institucional.
