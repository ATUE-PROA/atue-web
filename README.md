# ATUE Web

Frontend SPA do **ATUE**, uma plataforma de gestão de conformidade digital para pequenas e médias empresas.

O objetivo atual é sustentar a demonstração do MVP: telas claras, responsivas e com estados explícitos. A aplicação usa dados simulados; nenhuma conta real é criada.

## Requisitos

- Node 24 (versão definida em `.nvmrc`)
- npm

## Como rodar

```bash
npm ci
npm run dev
```

Acesse `http://localhost:5173`.

## Scripts

| Script                 | Descrição                                      |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                    |
| `npm run build`        | Type-check e build de produção                 |
| `npm run lint`         | ESLint                                         |
| `npm run format`       | Formata o código e a documentação com Prettier |
| `npm run format:check` | Verifica a formatação sem alterar arquivos     |
| `npm run preview`      | Pré-visualiza o build de produção              |

## Fluxo de dados

A direção da dependência é sempre:

```text
rota -> página -> componente de feature -> service -> mock ou API
```

- **Páginas** (`src/pages`): leem a rota e compõem a tela.
- **Componentes de feature** (`src/components/<feature>`): cuidam da interface e das interações daquela tela.
- **Services** (`src/services`): fronteira de acesso a dados. Hoje, `services/auth.ts` delega para mocks.
- **Mocks** (`src/mocks`): dados simulados, importados apenas pela camada de services.
- **Tipos** (`src/types`): contratos de domínio e de API.
- **Conteúdo** (`src/content`): copy revisável, em `as const`, sem tipos espelhados.

O dashboard ainda importa `mockGetDiagnostic` diretamente; a migração para `services/diagnostic.ts` é uma dívida conhecida e não faz parte da refatoração de auth.

## Estrutura

```text
src/
  components/
    auth/       layout, painel institucional, formulário de cadastro
    landing/    seções da landing
    layout/     cabeçalho público compartilhado
    ui/         primitives shadcn e componentes reutilizáveis
  content/      copy revisável
  contexts/     sessão em memória (AuthProvider + useAuth)
  lib/          schemas, validações e utilitários puros
  mocks/        dados simulados
  pages/        composição das rotas
  services/     fronteira de acesso a dados
  types/        contratos e tipos de domínio
```

## Cadastro

A rota `/cadastro` usa:

- `AuthLayout` para o frame escuro, cabeçalho compartilhado e coluna do formulário;
- `AuthBrandPanel` para a coluna institucional;
- `CadastroForm` para React Hook Form + Zod, estados de envio e sessão em memória;
- `services/auth.ts` como fronteira do cadastro simulado.

O fluxo válido cria uma sessão em memória e navega para `/dashboard`. O sucesso informa explicitamente que a conta é de demonstração.

## Design e convenções

- `DESIGN.md`: fonte de verdade de superfícies, cores, tipografia, espaçamento, componentes, estados e acessibilidade.
- `AGENTS.md`: regras de engenharia, tipagem, acessibilidade e fluxo de trabalho.
- `BACKLOG.md`: escopo e dívidas técnicas.

## Limitações atuais

- Sem backend real, autenticação persistente ou recuperação de senha.
- Sem test runner configurado; a validação é feita por lint, build e verificação manual.
- O dashboard ainda não consome a camada de services.
