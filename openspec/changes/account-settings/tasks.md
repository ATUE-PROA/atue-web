# Tasks

## 1. Contratos, conteúdo e serviços

- [x] 1.1 Criar `src/types/settings.types.ts` com preferências, domínio, integrações, payload de senha e retorno da exclusão simulada.
- [x] 1.2 Criar `src/content/settings.ts` com copy em pt-BR, opções de relatório e textos de estado.
- [x] 1.3 Criar `src/lib/settings.ts` com schemas Zod de preferências e alteração de senha, além do formatador da última verificação.
- [x] 1.4 Criar `src/mocks/settings.ts` com dados determinísticos e operações simuladas de leitura, salvamento, senha, conexão e exclusão.
- [x] 1.5 Criar `src/services/settings.ts` como fronteira de acesso e `src/services/diagnostic.ts` para o dashboard.
- [x] 1.6 Migrar o dashboard de `mocks/api` para `services/diagnostic.ts`.

## 2. Primitives compartilhados

- [x] 2.1 Criar `src/components/ui/switch.tsx` com Radix, tokens, foco visível e estados desabilitado/checado.
- [x] 2.2 Criar `src/components/ui/native-select.tsx` com estilos de input, chevron decorativo e estados de erro.
- [x] 2.3 Criar `src/components/ui/alert-dialog.tsx` com overlay, conteúdo, cabeçalho, rodapé, cancelar e ação.
- [x] 2.4 Ampliar `FormAlert` com o tom `info` usando a receita de informação do DESIGN.
- [x] 2.5 Adicionar `to` opcional ao `BrandLink` sem alterar o comportamento padrão.

## 3. Cabeçalho e página de configurações

- [x] 3.1 Criar `src/components/layout/product-header.tsx` com links de painel/configurações, ícone de engrenagem, estado ativo e `ThemeToggle`.
- [x] 3.2 Criar `src/components/settings/SettingsSection.tsx` com variação `danger`.
- [x] 3.3 Criar as seções de notificações, segurança, zona de risco, domínio, relatórios e integrações.
- [x] 3.4 Criar `src/pages/Settings.tsx` com carregamento, erro, retry, formulário principal, salvamento e estados.
- [x] 3.5 Adicionar a rota `/settings` em `src/routes.tsx`.
- [x] 3.6 Atualizar `src/pages/Dashboard.tsx` para usar `ProductHeader`, o service de diagnóstico e estados de carregamento/erro.

## 4. Acessibilidade e responsividade

- [x] 4.1 Verificar um único `h1`, hierarquia de títulos, landmarks e associação de rótulos em todos os controles.
- [x] 4.2 Verificar foco visível, ordem de tabulação, acionamento por teclado de switches, selects, botões e diálogo.
- [x] 4.3 Verificar estados de erro/sucesso/informação sem depender apenas de cor.
- [x] 4.4 Verificar o layout em 320px, 375px, 768px, 1024px e 1440px, sem rolagem horizontal.

## 5. Documentação e verificação

- [x] 5.1 Atualizar `DESIGN.md` com ProductHeader, Switch, NativeSelect, AlertDialog, FormAlert informativo, receita da tela de configurações e dívidas.
- [x] 5.2 Atualizar `AGENTS.md` com os novos primitives, a regra de confirmação destrutiva e a fronteira de services.
- [x] 5.3 Atualizar `README.md` com a área de configurações e a migração do dashboard para services.
- [x] 5.4 Rodar `npm run lint`, `npm run format:check` e `npm run build`; corrigir regressões. (Lint e build passam. O `format:check` do repositório ainda falha por arquivos CRLF pré-existentes; os arquivos alterados passam com `prettier --end-of-line auto --check`.)
- [x] 5.5 Revisar o diff final e garantir que apenas arquivos relacionados foram alterados.
- [ ] 5.6 Criar a branch `feat/account-settings`, publicar e abrir PR para revisão de Matheus Coletti.
