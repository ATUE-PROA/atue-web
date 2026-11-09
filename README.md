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

## Integração com a Core API

Os services de autenticação e diagnóstico usam `VITE_API_URL` como base da Core API:

```bash
cp .env.example .env.local
```

- Com `VITE_API_URL` vazia, a aplicação usa apenas dados de demonstração.
- Com `VITE_API_URL` preenchida, `signUp`, `signIn` e `requestDiagnostic` chamam a API real.
- O cliente HTTP fica em `src/services/http.ts`, injeta o token JWT em memória e converte falhas em `HttpError` com mensagem amigável.
- Requisições reais nunca caem silenciosamente para o mock: falhas são exibidas na interface.

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

O dashboard consome `services/diagnostic.ts`, que delega para `mocks/diagnostics.ts`. A Central de Documentos usa `services/documents.ts` e compartilha o mesmo estado de diagnóstico em memória. Nenhum componente importa mocks diretamente.

## Navegação e rotas

Todas as telas estão conectadas por links visíveis. Os destinos compartilhados ficam em `src/content/navigation.ts`; a área logada usa `ProductHeader` + `ProductFooter`, e as páginas internas usam `CrossLinks` para atalhos contextuais.

A navegação entre rotas começa no topo da tela. A landing page é a exceção: seus links de âncora rolam até as seções internas. O comportamento é centralizado em `ScrollToTop` e montado pelo `AppRoot` do React Router.

| Rota         | Superfície | Principais conexões                                                        |
| ------------ | ---------- | -------------------------------------------------------------------------- |
| `/`          | pública    | Planos, cadastro, login, envio de documentos e contato                     |
| `/register`  | pública    | Login, planos e site; sucesso leva à escolha do plano                      |
| `/login`     | pública    | Cadastro, planos e site; sucesso leva à escolha do plano                   |
| `/form`      | pública    | Site, login, cadastro, planos, painel e Central de Documentos após o envio |
| `/plans`     | pública    | Site, login, cadastro e envio de documentos                                |
| `/dashboard` | produto    | Documentos, envio, planos, perfil, configurações e site                    |
| `/documents` | produto    | Painel, envio, preferências de relatório, planos, perfil e configurações   |
| `/profile`   | produto    | Painel, documentos, configurações, planos e site                           |
| `/settings`  | produto    | Painel, documentos, perfil, planos e site                                  |
| 404          | pública    | Início, painel, documentos, planos e login                                 |

```text
src/
  content/navigation.ts      destinos compartilhados do rodapé e dos atalhos
  components/layout/         cabeçalho e rodapé compartilhados, CrossLinks
```

## Estrutura

```text
src/
  components/
    auth/       layouts, painel institucional, formulários de cadastro e login
    documents/  central de documentos, achados, análise simulada e downloads
    landing/    seções da landing
    layout/     cabeçalho público e cabeçalho de produto compartilhados
    plans/      cards, comparação e FAQ de planos
    profile/    seções editáveis do perfil da conta
    settings/   seções da área de configurações
    ui/         primitives shadcn e componentes reutilizáveis
  content/      copy revisável
  contexts/     sessão e acesso por plano em memória (AuthProvider + PlanProvider)
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

Os fluxos válidos criam uma sessão em memória e navegam para `/plans`, onde a pessoa escolhe um plano. Os avisos informam explicitamente que a conta é de demonstração.

## Envio de documentos

A rota `/form` usa `AuthLayout`, `FormBrandPanel` e `DocumentForm` para coletar a URL do site, os dados da empresa e os documentos de conformidade. É acessada pela landing, pelo rodapé público, pelo painel e pelo rodapé da área logada.

- O CNPJ é validado localmente e consultado em `https://api.opencnpj.org` por `services/cnpj.ts`.
- Quando a consulta retorna dados, a razão social e o e-mail disponíveis preenchem os campos correspondentes; a pessoa pode revisar e editar.
- O envio dos dados e arquivos é simulado por `services/form.ts`. Nenhum arquivo é armazenado.
- Após o sucesso, a pessoa recebe atalhos para o painel e para a Central de Documentos; login, cadastro e planos também estão disponíveis no formulário.

## Planos

As rotas `/plans` e `/plan` apresentam uma comparação entre os planos Início, Cresce e Escala, cards ilustrativos e uma seção de ajuda com perguntas frequentes. A página está linkada no rodapé da landing e não há cobrança nesta demonstração.

- Depois do login ou cadastro, a pessoa é encaminhada para `/plans`.
- Ao escolher um plano autenticada, um diálogo de confirmação (`AlertDialog`) é exibido. A assinatura é simulada e não gera cobrança.
- Recursos de outros planos, como integrações e download de relatórios detalhados, exibem o mesmo diálogo de assinatura ao serem acionados.
- O acesso por plano fica em `PlanProvider` (`src/contexts/PlanProvider.tsx`) e vive apenas em memória; recarregar a página volta ao estado sem plano.

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

## Central de Documentos

A rota `/documents` concentra o painel de achados, a análise simulada de documentos e a Central de Downloads. É acessada pelo link “Documentos” do `ProductHeader`, por atalhos no `/dashboard`, pelo `ProductFooter`, por `CrossLinks` na própria página e por links no perfil e nas configurações.

- `services/documents.ts` é a fronteira de dados; `mocks/documents.ts` mantém documentos, relatórios e modelos em memória.
- A entrada principal é o botão “Anexar documento”, que aciona um `input type="file"` apenas como controle de anexo. PDF, DOC, DOCX e TXT de até 10 MB são aceitos; o arquivo permanece no dispositivo e somente nome, tipo e tamanho são usados. Nenhum conteúdo é lido, enviado ou armazenado.
- Um `Select` e a lista lateral oferecem documentos fictícios como alternativa de demonstração. O campo de exemplo fica desabilitado enquanto houver arquivo anexado.
- “Analisar com IA” inicia a análise simulada; a tela informa que não há modelo real. `analyzeDocument` recebe um alvo tipado (arquivo local ou exemplo) e executa etapas determinísticas com atraso, devolvendo o progresso por callback. Ao iniciar, a página rola suavemente até o cartão de processamento (ou de forma imediata com `prefers-reduced-motion`), anuncia a etapa atual em uma região `aria-live` e bloqueia envios duplicados.
- Ao concluir, o resultado atualiza o diagnóstico compartilhado em `mocks/diagnostics.ts`; o `/dashboard` passa a exibir o mesmo score e os mesmos achados.
- Cada achado tem severidade, categoria, explicação simulada e recomendação, exibidas em um `Accordion` acessível.
- `src/lib/pdf.ts`, `src/lib/docx.ts` e `src/lib/text.ts` geram PDF, DOCX e TXT válidos no navegador a partir do mesmo contrato `DownloadContent`. O PDF tem capa, métricas em grade, cabeçalho, rodapé e paginação; o DOCX é um pacote OOXML/ZIP com estilos, numeração, tabela de métricas, cabeçalho e rodapé; o TXT usa 78 colunas, cabeçalho, métricas com pontilhado e seções sublinhadas.
- `src/lib/download.ts` centraliza a criação do `Blob`, a troca de extensão e o link temporário com revogação do object URL. Nenhum arquivo é armazenado.
- A Central de Downloads lista relatórios gerados e modelos fictícios. Cada item abre um menu acessível com PDF, DOCX e TXT. Todos os arquivos contêm aviso de demonstração e não têm validade legal.

## Design e convenções

- `DESIGN.md`: fonte de verdade de superfícies, cores, tipografia, espaçamento, componentes, estados e acessibilidade.
- `AGENTS.md`: regras de engenharia, tipagem, acessibilidade e fluxo de trabalho.
- `BACKLOG.md`: escopo e dívidas técnicas.

## Limitações atuais

- Sem backend real, autenticação persistente, recuperação de senha, 2FA ou integrações OAuth.
- Sem test runner configurado; a validação é feita por lint, build e verificação manual.
- As configurações da conta são simuladas e voltam ao estado inicial ao recarregar a página.
- O perfil da conta também é simulado: salvar altera apenas o estado em memória e a foto não é enviada nem persistida.
- A análise de documentos, os achados e a IA são simulações locais. O arquivo anexado permanece no dispositivo e somente metadados são usados; nenhum conteúdo real é lido, enviado ou armazenado.
- Os PDFs, DOCX e TXT são gerados no navegador com marca de demonstração e não representam relatórios oficiais nem garantia de conformidade.
