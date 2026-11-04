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
- **Services** (`src/services`): fronteira de acesso a dados. `services/auth.ts` e `services/form.ts` delegam para mocks; `services/cnpj.ts` consulta a API pública OpenCNPJ.
- **Mocks** (`src/mocks`): dados simulados, importados apenas pela camada de services.
- **Tipos** (`src/types`): contratos de domínio e de API.
- **Conteúdo** (`src/content`): copy revisável, em `as const`, sem tipos espelhados.

O dashboard ainda importa `mockGetDiagnostic` diretamente; a migração para `services/diagnostic.ts` é uma dívida conhecida e não faz parte da refatoração de auth.

## Estrutura

```text
src/
  components/
    auth/       layouts, painel institucional, formulários de cadastro e login
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

## Autenticação

A rota `/register` usa:

- `AuthLayout` para o frame, cabeçalho compartilhado e coluna do formulário;
- `AuthBrandPanel` para a coluna institucional;
- `CadastroForm` para React Hook Form + Zod, estados de envio e sessão em memória;
- `services/auth.ts` como fronteira do cadastro simulado.

A rota `/login` usa `AuthCenteredLayout` e `LoginForm` para um único card centralizado, também com React Hook Form + Zod e `services/auth.ts` como fronteira do login simulado.

Os fluxos válidos criam uma sessão em memória e navegam para `/dashboard`. Os avisos informam explicitamente que a conta é de demonstração.

## Envio de documentos

A rota `/form` usa `AuthLayout`, `FormBrandPanel` e `DocumentForm` para coletar a URL do site, os dados da empresa e os documentos de conformidade.

- O CNPJ é validado localmente e consultado em `https://api.opencnpj.org` por `services/cnpj.ts`.
- Quando a consulta retorna dados, a razão social e o e-mail disponíveis preenchem os campos correspondentes; a pessoa pode revisar e editar.
- O envio dos dados e arquivos é simulado por `services/form.ts`. Nenhum arquivo é armazenado.

## Planos

A rota `/plans` apresenta três planos ilustrativos em cards e está linkada no rodapé da landing. Os CTAs encaminham para o cadastro ou para o envio de dados e documentos; não há cobrança nesta demonstração.

## Design e convenções

- `DESIGN.md`: fonte de verdade de superfícies, cores, tipografia, espaçamento, componentes, estados e acessibilidade.
- `AGENTS.md`: regras de engenharia, tipagem, acessibilidade e fluxo de trabalho.
- `BACKLOG.md`: escopo e dívidas técnicas.

## Limitações atuais

- Sem backend real, autenticação persistente ou recuperação de senha.
- Sem test runner configurado; a validação é feita por lint, build e verificação manual.
- O dashboard ainda não consome a camada de services.
