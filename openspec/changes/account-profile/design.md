## Context

A área logada possui `/dashboard` e `/settings`. O `ProductHeader` já concentra navegação, ícone de configurações e `ThemeToggle`. As configurações usam `SettingsSection` para os cards e `services/settings.ts` como fronteira de dados. A referência visual do Demoday apresenta duas colunas: dados pessoais e contato à esquerda; dados da empresa, responsável legal / DPO e a ação de salvar à direita. O topo exibe a marca ATUE e um caminho de volta ao site.

Restrições: `AGENTS.md` (mock-first, services como fronteira, tipagem estrita, acessibilidade, sem promessas reais), `DESIGN.md` (tokens, receitas, foco visível, estados, checklist) e o escopo de MVP sem backend real.

## Goals / Non-Goals

**Goals:**

- Criar `/profile` com dados pessoais, contato, empresa e DPO editáveis.
- Reutilizar React Hook Form + Zod, `FormField`, `Input`, `NativeSelect`, `FormAlert` e `Button`.
- Manter o fluxo mock-first, tipado e separado por services.
- Oferecer prévia local de foto, sem upload real, com aviso explícito.
- Compartilhar o card de seção entre configurações e perfil.
- Ser honesto sobre simulação e ausência de persistência.

**Non-Goals:**

- Backend, upload de foto, verificação externa de CNPJ ou consulta de DPO.
- Alterar autenticação, permissões, senha ou exclusão de conta.
- Introduzir novo gerenciador de estado, biblioteca de formulários ou de UI.
- Test runner, deploy ou mudanças de CI.

## Decisions

### `SectionCard` compartilhado

O card de seção de configurações é generalizado em `src/components/ui/section-card.tsx` (`SectionCard`), com `description` opcional e variação `danger`. As seções de configurações passam a consumir esse primitive; o perfil usa o mesmo componente nos quatro cards. Alternativa descartada: duplicar classes de card no perfil.

### Formulário único com dois gatilhos de salvamento

A página usa um único `<form>` com React Hook Form + Zod. O botão “Salvar dados”, no card de dados pessoais, e o botão “Salvar perfil”, ao final da coluna direita, enviam o mesmo payload simulado. O feedback de sucesso ou erro aparece no topo da página, visível para os dois gatilhos. Ambos são desabilitados durante o envio, e o botão acionado exibe o estado de carregamento. Alternativa descartada: formulários separados, que criariam estados divergentes e ações parciais difíceis de explicar.

### Prévia local de foto

O botão “Alterar foto” abre um seletor de imagem escondido. A imagem escolhida é validada por tipo (PNG, JPG ou WebP) e tamanho (até 2 MB) e exibida por `URL.createObjectURL`, com revogação ao trocar ou desmontar. Nenhum arquivo é enviado ou salvo; um `FormAlert` informa que é apenas prévia local. Alternativa descartada: prometer upload ou salvar a imagem em `localStorage`, o que exigiria revisão de segurança e persistência sem requisito.

### Validação de CNPJ e site

O perfil reutiliza `isValidCnpj` e `isValidDomain` dos módulos existentes. O CNPJ do mock foi ajustado para um valor com dígitos verificadores válidos (`12.345.678/0001-95`), porque o valor ilustrativo da referência não passa na validação. Campos opcionais (cargo, telefone, endereço, site, nome e e-mail do DPO) aceitam vazio, mas são validados quando preenchidos.

### Cabeçalho e caminho de volta

`ProductHeader` ganha o link “Perfil” entre painel e configurações. A página de perfil exibe “Voltar ao site” no cabeçalho do conteúdo, alinhado à referência, sem alterar o cabeçalho compartilhado com uma ação extra. Alternativa descartada: criar um cabeçalho específico para o perfil.

### Mock e estado em memória

`src/services/profile.ts` é a fronteira consumida pela página. `src/mocks/profile.ts` mantém um estado de módulo com dados determinísticos; salvar altera esse estado durante a sessão e recarregar restaura o mock base. O service não substitui falhas reais por mocks silenciosamente.

## Risks / Trade-offs

- [Dois botões de salvamento parecem conflitar] → ambos enviam o mesmo payload, ficam desabilitados juntos e compartilham o feedback no topo.
- [A tela parece persistir dados] → aviso fixo de demonstração, alerta de sucesso explícito e limitação documentada.
- [Prévia de foto pode parecer upload] → validação local, aviso de que a imagem não é enviada nem salva e ausência de campo no mock.
- [CNPJ da referência é inválido] → mock ajustado para um CNPJ válido; a validação informa o formato esperado.
- [Dois caminhos de foco e leitura em duas colunas] → ordem de tabulação segue o DOM (esquerda e depois direita) e cada seção tem `h2`.
