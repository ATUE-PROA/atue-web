# Tasks

## 1. Contratos, conteúdo e serviços

- [x] 1.1 Criar `src/types/profile.types.ts` com dados pessoais, contato, empresa, DPO, setor e perfil completo.
- [x] 1.2 Criar `src/content/profile.ts` com copy em pt-BR, opções de setor e textos de estado.
- [x] 1.3 Criar `src/lib/profile.ts` com schema Zod, validações de telefone, CNPJ, site e e-mail opcional.
- [x] 1.4 Criar `src/mocks/profile.ts` com dados determinísticos, CNPJ válido e operações simuladas de leitura e salvamento.
- [x] 1.5 Criar `src/services/profile.ts` como fronteira de acesso.

## 2. Card de seção compartilhado

- [x] 2.1 Criar `src/components/ui/section-card.tsx` com descrição opcional e variação `danger`.
- [x] 2.2 Migrar as seções de configurações de `SettingsSection` para `SectionCard` e remover o componente antigo.

## 3. Cabeçalho, página e seções do perfil

- [x] 3.1 Adicionar o link “Perfil” ao `ProductHeader` com nome acessível e estado ativo.
- [x] 3.2 Criar `src/components/profile/ProfileAvatar.tsx` com iniciais, seletor de foto e prévia local validada.
- [x] 3.3 Criar as seções de dados pessoais, contato, empresa e DPO com rótulos, validação e nota informativa.
- [x] 3.4 Criar `src/pages/Profile.tsx` com carregamento, erro, retry, formulário único, dois gatilhos de salvamento e estados.
- [x] 3.5 Adicionar a rota `/profile` em `src/routes.tsx`.

## 4. Acessibilidade e responsividade

- [x] 4.1 Verificar um único `h1`, hierarquia de títulos, landmarks e associação de rótulos em todos os controles.
- [x] 4.2 Verificar foco visível e ordem de tabulação em campos, seletores, botões e link de volta.
- [x] 4.3 Verificar estados de erro/sucesso/informação sem depender apenas de cor.
- [x] 4.4 Verificar o layout em 320px, 375px, 768px, 1024px e 1440px, sem rolagem horizontal.

## 5. Documentação e verificação

- [x] 5.1 Atualizar `DESIGN.md` com `SectionCard`, avatar, tela de perfil, salvamento duplicado e dívidas.
- [x] 5.2 Atualizar `AGENTS.md` com o `SectionCard` e as regras de prévia local de foto e simulação.
- [x] 5.3 Atualizar `README.md` com a área de perfil e a generalização do card.
- [x] 5.4 Rodar `npm run lint`, `npm run build` e Prettier nos arquivos alterados; corrigir regressões. (`npm run format:check` ainda falha em arquivos preexistentes com CRLF, fora deste escopo.)
- [x] 5.5 Revisar o diff final e garantir que apenas arquivos relacionados foram alterados.
- [ ] 5.6 Publicar a branch `feat/account-profile` e abrir PR para revisão de Matheus Coletti.
