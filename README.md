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

O dashboard consome `services/diagnostic.ts`, que delega para o mock de diagnóstico. Nenhum componente importa mocks diretamente.

## Estrutura

```text
src/
  components/
    auth/       layouts, painel institucional, formulários de cadastro e login
    landing/    seções da landing
    layout/     cabeçalho público e cabeçalho de produto compartilhados
    plans/      cards, comparação e FAQ de planos
    profile/    seções editáveis do perfil da conta
    settings/   seções da área de configurações
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

As rotas `/plans` e `/plan` apresentam uma comparação entre os planos Início, Cresce e Escala, cards ilustrativos e uma seção de ajuda com perguntas frequentes. A página está linkada no rodapé da landing e não há cobrança nesta demonstração.

## Configurações da conta

A rota `/settings` concentra as configurações gerais da conta e é acessada pelo ícone de engrenagem do `ProductHeader`, compartilhado com o `/dashboard` e o `/profile`.

- `services/settings.ts` é a fronteira de dados; `mocks/settings.ts` mantém o estado apenas em memória.
- A tela cobre notificações, segurança, zona de risco, domínio monitorado, preferências de relatório e integrações.
- Salvar preferências, alterar senha, conectar integrações e solicitar exclusão são simulações explicitamente identificadas.
- Autenticação em dois fatores e novas integrações aparecem como “Em breve”.
- A exclusão exige confirmação em `AlertDialog` e nunca apaga dados reais.

## Perfil da conta

A rota `/profile` reúne dados pessoais, contato, dados da empresa e responsável legal / DPO. É acessada pelo link “Perfil” do `ProductHeader`, ao lado de painel e configurações.

- `services/profile.ts` é a fronteira de dados; `mocks/profile.ts` mantém o estado apenas em memória.
- O formulário usa React Hook Form + Zod e reutiliza `isValidCnpj` e `isValidDomain`.
- “Salvar dados” e “Salvar perfil” enviam o mesmo payload simulado; o aviso de demonstração deixa claro que nada é persistido.
- “Alterar foto” exibe apenas uma prévia local (PNG, JPG ou WebP até 2 MB); nenhum arquivo é enviado ou salvo.
- Os cards de configurações e perfil compartilham o primitive `SectionCard` (`src/components/ui/section-card.tsx`).

## Design e convenções

- `DESIGN.md`: fonte de verdade de superfícies, cores, tipografia, espaçamento, componentes, estados e acessibilidade.
- `AGENTS.md`: regras de engenharia, tipagem, acessibilidade e fluxo de trabalho.
- `BACKLOG.md`: escopo e dívidas técnicas.

## Limitações atuais

- Sem backend real, autenticação persistente, recuperação de senha, 2FA ou integrações OAuth.
- Sem test runner configurado; a validação é feita por lint, build e verificação manual.
- As configurações da conta são simuladas e voltam ao estado inicial ao recarregar a página.
- O perfil da conta também é simulado: salvar altera apenas o estado em memória e a foto não é enviada nem persistida.
