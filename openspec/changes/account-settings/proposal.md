## Why

Depois do cadastro e da escolha de plano, a área logada não oferece um ponto de acesso às configurações da conta. A pessoa não consegue revisar notificações, preferências de relatório, domínio monitorado, integrações, segurança ou ações sensíveis em um só lugar. A referência visual fornecida para o Demoday mostra uma tela de configurações gerais da conta; o repositório ainda não possui rota, serviço, mocks ou componentes para esse fluxo.

## What Changes

- Criar a rota `/settings` com a tela de configurações gerais da conta.
- Adicionar um cabeçalho de produto compartilhado (`ProductHeader`) com navegação entre painel e configurações, incluindo um ícone de engrenagem com nome acessível.
- Criar a seção de notificações com interruptores acessíveis para alertas por e-mail, resumo semanal e alertas críticos.
- Criar a seção de segurança com alteração de senha validada, estados de envio e indicação honesta de que autenticação em dois fatores ainda não está disponível.
- Exibir o domínio monitorado em modo somente leitura, com estado de verificação e data da última verificação.
- Criar preferências de relatório com idioma e periodicidade.
- Listar integrações, simular a conexão de uma integração disponível e explicitar que a conexão é de demonstração.
- Criar a zona de risco com confirmação em diálogo acessível e solicitação de exclusão simulada, sem apagar dados reais.
- Centralizar o acesso a dados em `src/services/settings.ts` e mocks determinísticos em `src/mocks/settings.ts`.
- Migrar o dashboard para consumir `src/services/diagnostic.ts` e reutilizar o `ProductHeader`.
- Adicionar primitives reutilizáveis: `Switch`, `NativeSelect` e `AlertDialog`; ampliar `FormAlert` com o tom informativo.
- Atualizar `DESIGN.md`, `AGENTS.md`, `README.md` e os artefatos OpenSpec com os novos padrões e limitações.

Fora de escopo:

- Persistência real de configurações, senha ou integrações em backend.
- OAuth real, envio de e-mail, autenticação em dois fatores e exclusão real de conta.
- Recuperação de senha e confirmação de e-mail.
- Test runner automatizado, deploy ou alterações de CI.

## Capabilities

### New Capabilities

- `account-settings`: tela de configurações da conta acessível a partir da área logada, com preferências, segurança, domínio, integrações e zona de risco em fluxo simulado e acessível.

### Modified Capabilities

<!-- Nenhuma: o dashboard não possui requisito consolidado em openspec/specs/. A migração para services é uma melhoria de fronteira, não uma mudança de comportamento observável. -->

## Impact

- **Rotas:** nova rota `/settings`; `/dashboard` passa a usar o mesmo cabeçalho de produto e a camada de services.
- **Código:** novos tipos, conteúdo, lib, mocks, service, primitives (`src/components/ui`), componentes de feature (`src/components/settings`), página e cabeçalho de produto.
- **Estilo:** novos padrões para interruptor, select nativo, diálogo de confirmação e seção de configurações; documentados em `DESIGN.md`.
- **Documentação:** `AGENTS.md` passa a citar os novos primitives e a regra de confirmação para ações destrutivas; `README.md` descreve a área de configurações.
- **Risco:** a tela parece persistir dados, mas opera apenas em memória. A copy e os testes manuais devem deixar claro que é demonstração.
