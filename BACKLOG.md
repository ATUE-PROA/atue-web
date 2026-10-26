# Backlog — ATUE Web (Frontend React)

Este backlog é a fonte de trabalho do repositório frontend (Single Page Application - SPA) da plataforma ATUE. A arquitetura macro do projeto é firmemente baseada em microsserviços. O frontend atua **exclusivamente** como camada de apresentação e cliente HTTP. Não há, sob nenhuma hipótese, lógica de crawling de sites, varredura de vulnerabilidades, processamento de Inteligência Artificial ou acesso direto a bancos de dados neste repositório. Toda a inteligência reside nos microsserviços, e o `atue-web` os consome via contratos RESTful estritos.

Cada épico abaixo corresponde a uma change no OpenSpec (`openspec/changes/<épico>`). As histórias resumem os critérios de aceitação; a implementação segue as diretrizes do `AGENTS.md` e o checklist das changes.

## Changes e tasks (estado atual)

Cada épico corresponde a um agrupamento lógico das tarefas geridas no Jira. A tabela abaixo reflete o status de rastreamento do desenvolvimento frontend.

| Change (Épico Jira)  | Task Jira | Resumo da Tarefa                                    | Responsável             | Estado       | Prazo       |
| -------------------- | --------- | --------------------------------------------------- | ----------------------- | ------------ | ----------- |
| **project-setup**    | DEV-42    | Desenvolvimento (Setup Base e Infra Frontend)       | MATHEUS MARQUES COLETTI | Em andamento | 02/nov/2026 |
| **data-modeling-ts** | DEV-57    | Modelagem Inicial de Dados (Tipagem TS e Mocks)     | Larissa Coelho          | Em andamento | 30/out/2026 |
| **landing-page**     | DEV-58    | Implementação e Responsividade da Landing Page      | Gilvam Júnior           | Em revisão   | 25/out/2026 |
| **trust-center**     | DEV-59    | Pág. de Confiança e Testes de Usabilidade           | Liam Silva Pernambuco   | A fazer      | 28/out/2026 |
| **auth-dashboard**   | DEV-56    | Construção da Tela de Cadastro e Painel de Controle | Larissa Coelho          | A fazer      | 25/out/2026 |

_Progresso visível via `openspec list` e `openspec status --change "<nome>" --json`._

## Workflow de trabalho (skills OpenSpec)

Ciclo por change, na ordem de implementação do frontend:

- `/opsx-explore <change>` → Mapear fluxos de tela (UX), estados de componentes, contratos de payload da API e dependências de UI (sem escrever código React ainda).

- `/opsx-update <change>` → Incorporar decisões de roteamento, nomenclatura de estados e tipagem de interfaces TS nos artefatos de design.

- `/opsx-apply <change>` → Implementar os componentes no React, marcando o `tasks.md` (`[ ]` → `[x]`). Pausar se a task esbarrar em uma dependência de backend não mockada ou se a responsividade quebrar no Tailwind.

- `/opsx-archive` → Arquivar a change finalizada.

- `/opsx-sync-specs` → Sincronizar as definições de componentes para o repositório de specs.

_Definição de pronto por task:_ Componente renderizando no DOM, responsividade mobile/desktop garantida via Tailwind, tipagem estrita respeitada, `npm run lint` e _build_ rodando sem alertas.

## Decisões de arquitetura (fechadas)

- **Fundação Tecnológica:** React 19 provido pelo Vite 8. Rigor absoluto com TypeScript; a flag `strict: true` está habilitada no `tsconfig.app.json`. O uso do tipo `any` é proibido e falha o pipeline de CI/CD (`@typescript-eslint/no-explicit-any` como erro).

- **Estilização e Acessibilidade:** Uso exclusivo de Tailwind CSS v4 (Utility-First, via `@tailwindcss/vite`) com `@tailwindcss/typography`. Componentes base derivam do `shadcn/ui` (Radix UI), já inicializado em `src/components/ui`, para garantir acessibilidade (a11y) nativa, sem inchar o bundle com bibliotecas monolíticas (como Material-UI ou Ant Design).

- **Gerenciamento de Estado:** Redux está descartado por ser _overengineering_ para o escopo do MVP. O estado de autenticação global e o _Tenant_ atual residem na Context API. Estados de formulário e controle de interface residem localmente (`useState` / `useReducer`).

- **Comunicação de Rede:** Todas as requisições HTTP utilizam a Fetch API nativa, isoladas no diretório `src/services/` (criado na `project-setup`, ainda vazio). Nenhum componente React deve invocar URIs diretamente.

- **Desenvolvimento Mock-First:** Para não acoplar o progresso do frontend ao tempo de deploy dos microsserviços, todo contrato de API (Épico 1) nasce com uma implementação baseada em _Promises_ resolvidas localmente (Mocks) que retornam objetos aderentes às tipagens definidas no `DEV-57`.

- **Formulários e Validação:** Formulários de captura de domínio, login e cadastro utilizam `React Hook Form` orquestrado com validação de schemas em `Zod` (a instalar na change que criar o primeiro formulário). O frontend rejeita _payloads_ malformados antes de encostar na rede.

## Definition of Done (todas as histórias)

1. Lógica de UI isolada; o componente de apresentação não conhece a origem do dado (separa-se o _Container_ do _Componente Visual_ quando aplicável).

2. Tratamento ostensivo da tríade de estados de rede: `Loading` (Spinners/Skeletons), `Error` (Toasts/Alertas amigáveis) e `Success` (Renderização de dados).

3. Todas as props exportadas estão tipadas em arquivos `.types.ts` ou `d.ts`.

4. Renderização impecável desde telas _mobile_ (320px) até _ultrawide_, baseada nos breakpoints do Tailwind.

5. Comandos `npm run lint` e `npm run build` retornam status verde.

## Épico 1 — Fundação e Contratos (Changes: `project-setup`, `data-modeling-ts`)

Este épico estabelece o alicerce do repositório, garantindo que o frontend possua a estrutura de pastas correta e o vocabulário de dados (tipagens) que simularão as APIs dos microsserviços.

**1.1 Setup Base da Infraestrutura Frontend (DEV-42, Matheus Coletti)**

- Como desenvolvedor, quero um ambiente Vite+React+TS inicializado com Tailwind CSS e ESLint rigoroso, para ter uma fundação sólida de desenvolvimento.

- **Critérios:** Base Vite + React + TS com Tailwind CSS v4, shadcn/ui e ESLint rigoroso; rotas base (`react-router-dom`); pastas `components`, `pages`, `contexts`, `services`, `types` e `lib`.

**1.2 Modelagem de Contratos e Tipagem (DEV-57, Larissa Coelho)**

- Como desenvolvedor frontend, quero mapear as respostas esperadas dos microsserviços em Interfaces TypeScript, para garantir consistência em tempo de compilação.

- **Critérios:** Criar `UserToken.ts`, `Organization.ts`, `DiagnosticReport.ts`, `IssueCategory.ts`. O contrato de `DiagnosticReport` deve refletir o JSON do motor de regras (com score, vulnerabilidades HTTPS/Cookies, etc).

**1.3 Camada de Mocks Assíncronos (DEV-57, Larissa Coelho)**

- Como sistema em desenvolvimento paralelo, quero funções assíncronas que simulem o comportamento do backend, para destravar a construção de telas.

- **Critérios:** Implementar _delays_ artificiais (ex: `setTimeout` de 2s) no submit do domínio para simular o tempo de resposta do microsserviço de scanner, retornando o objeto tipado.

## Épico 2 — Aquisição e Confiança (Changes: `landing-page`, `trust-center`)

Focado na superfície de contato pública do ATUE. A UX deve focar em conversão e redução da ansiedade técnica do gestor da PME.

**2.1 Captura de Domínio e Hero Section (DEV-58, Gilvam Júnior)**

- Como visitante (decisor PME), quero visualizar a proposta de valor do ATUE e inserir o domínio do meu site, para iniciar imediatamente o diagnóstico.

- **Critérios:** Layout responsivo; o campo de input de URL deve possuir validação Regex (rejeitar formatos que não sejam URLs ou domínios válidos); submissão aciona o redirecionamento com a URL no state da rota.

**2.2 Página Institucional e Trust Center (DEV-59, Liam Silva Pernambuco)**

- Como visitante, quero acessar uma página de "Confiança/Segurança" detalhada, para entender como o ATUE trata meus dados empresariais antes de me cadastrar.

- **Critérios:** Rota estática `/trust-center`; uso intenso do plugin `@tailwindcss/typography` (`prose`) para legibilidade de textos jurídicos e exibição de componentes visuais de segurança (badges, ícones de cadeado).

**2.3 Ajustes de Usabilidade e UX Pública (DEV-59, Liam Silva Pernambuco)**

- Como equipe de produto, queremos refinar o fluxo de navegação baseado em heurísticas de usabilidade, para evitar drop-off (abandono) na página inicial.

- **Critérios:** Garantir que o foco por teclado (Tab) navegue logicamente entre o input de domínio e o botão CTA; aplicar _hover states_ distintos e garantir contraste WCAG AAA nas cores institucionais.

## Épico 3 — Core da Aplicação (Change: `auth-dashboard`)

Implementação da área restrita do _Tenant_. É onde o valor real da plataforma é entregue através do consumo de dados mockados (e futuramente reais).

**3.1 Fluxo de Cadastro e Onboarding (DEV-56, Larissa Coelho)**

- Como usuário que acabou de inserir o domínio, quero criar uma conta vinculando meu e-mail, senha e nome da empresa, para acessar os resultados do meu diagnóstico.

- **Critérios:** Formulário com `React Hook Form` e `Zod`. Validação de senha forte no client-side; simulação de recebimento de token JWT falso armazenado na sessão (Context API) após o submit.

**3.2 Layout do Painel de Controle (DEV-56, Larissa Coelho)**

- Como gestor logado, quero acessar um Dashboard com barra lateral (Sidebar) de navegação e cabeçalho, para me localizar no sistema.

- **Critérios:** Criação de layout de página com Grid/Flexbox; Sidebar colapsável no mobile com menu hamburguer; persistência da sessão em memória local para impedir redirecionamentos indevidos à rota pública.

**3.3 Visão de Diagnóstico e Score (DEV-56, Larissa Coelho)**

- Como gestor logado, quero visualizar o "Score de Conformidade" da minha URL e uma lista priorizada de pendências técnicas/jurídicas.

- **Critérios:** Integração da biblioteca `Recharts` para plotar um gráfico tipo _Donut/Gauge_ que exiba a nota (ex: 65/100). Abaixo, renderizar uma lista iterável (`Array.map`) consumindo a interface `IssueCategory.ts` provida pela DEV-57, exibindo tags de severidade (Alta, Média, Baixa) com cores de alerta no Tailwind (red-500, yellow-500, etc).
