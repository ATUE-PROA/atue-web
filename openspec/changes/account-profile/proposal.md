## Why

A área logada já possui painel e configurações, mas não oferece um lugar para revisar os dados pessoais, de contato, da empresa e do encarregado de proteção de dados (DPO). A referência visual do Demoday mostra uma tela de perfil com esses dados e ações de salvamento. O repositório ainda não possui rota, serviço, mocks ou componentes para esse fluxo.

## What Changes

- Criar a rota `/profile` com a tela de perfil da conta.
- Adicionar o link “Perfil” ao `ProductHeader`, mantendo a navegação entre painel, perfil e configurações.
- Criar a seção de dados pessoais com nome completo, cargo, avatar com iniciais e prévia local de foto.
- Criar a seção de contato com e-mail e telefone.
- Criar a seção de dados da empresa com razão social, CNPJ, setor, endereço e site institucional.
- Criar a seção do responsável legal / DPO com nome, e-mail e nota informativa sobre a LGPD.
- Validar os campos com React Hook Form e Zod, reutilizando `isValidCnpj` e `isValidDomain`.
- Generalizar o card de seção em `SectionCard` para reutilização em configurações e perfil.
- Centralizar o acesso a dados em `src/services/profile.ts` e mocks determinísticos em `src/mocks/profile.ts`.
- Simular o salvamento do perfil com estados de carregamento, sucesso, erro e retry.
- Atualizar `DESIGN.md`, `AGENTS.md`, `README.md` e os artefatos OpenSpec com os novos padrões e limitações.

Fora de escopo:

- Persistência real de perfil, upload de foto ou integração com backend.
- Alteração de senha, autenticação, exclusão de conta ou permissões.
- Envio de e-mail, verificação de CNPJ em bases externas ou consulta de DPO.
- Test runner automatizado, deploy ou alterações de CI.

## Capabilities

### New Capabilities

- `account-profile`: tela de perfil da conta acessível a partir da área logada, com dados pessoais, contato, empresa e DPO em fluxo simulado e acessível.

### Modified Capabilities

<!-- Nenhuma: o perfil é uma nova tela. A generalização de SettingsSection em SectionCard é uma melhoria de reutilização, sem mudança de comportamento observável das configurações. -->

## Impact

- **Rotas:** nova rota `/profile`; `ProductHeader` passa a exibir também o link de perfil.
- **Código:** novos tipos, conteúdo, lib, mocks, service, componentes de feature (`src/components/profile`), página e generalização do card de seção.
- **Estilo:** novo padrão de avatar com iniciais, formulário de perfil e nota de DPO; documentados em `DESIGN.md`.
- **Documentação:** `AGENTS.md`, `DESIGN.md` e `README.md` passam a citar o perfil e o `SectionCard`.
- **Risco:** a tela parece salvar dados reais, mas opera apenas em memória. A copy, o alerta de demonstração e a prévia de foto devem deixar isso explícito.
