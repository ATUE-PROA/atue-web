# Spec Delta

## Purpose

Define a área de configurações da conta do ATUE, seu ponto de entrada na área logada e os fluxos simulados de preferências, segurança, domínio, integrações e exclusão de conta.

## ADDED Requirements

### Requirement: Área logada oferece acesso às configurações da conta

A área logada SHALL oferecer um controle visível com ícone de engrenagem que leve à rota `/settings`. O controle SHALL ter nome acessível, foco visível e indicar a página atual quando a rota estiver ativa. A rota `/settings` SHALL renderizar um único `h1` com o título “Configurações” e uma indicação de que se trata das configurações gerais da conta.

#### Scenario: Acesso pelo painel

- **WHEN** o usuário está em `/dashboard`
- **THEN** há um controle com ícone de engrenagem e nome acessível para abrir as configurações
- **AND** o controle leva a `/settings`

#### Scenario: Configurações abertas diretamente

- **WHEN** o usuário acessa `/settings` diretamente
- **THEN** a tela de configurações é exibida sem erro
- **AND** existe um caminho para voltar ao painel
- **AND** há um único `h1` na página

### Requirement: Tela apresenta as seções de configurações gerais

A tela SHALL organizar as configurações em seções de notificações, segurança, zona de risco, domínio monitorado, preferências de relatório e integrações. Cada seção SHALL ter título e descrição compreensíveis, e os controles SHALL estar associados a rótulos visíveis. Em viewports largas, as seções SHALL ser distribuídas em duas colunas; em telas estreitas, SHALL ser empilhadas sem rolagem horizontal.

#### Scenario: Layout em telas largas

- **WHEN** a tela é aberta a partir do breakpoint `lg`
- **THEN** as seções são distribuídas em duas colunas
- **AND** a ordem de leitura e de foco permanece coerente

#### Scenario: Layout em telas estreitas

- **WHEN** a tela é aberta em 320px de largura
- **THEN** as seções são empilhadas
- **AND** não há rolagem horizontal
- **AND** todos os controles permanecem utilizáveis

### Requirement: Notificações e preferências de relatório são editáveis

A tela SHALL permitir ativar ou desativar alertas por e-mail, resumo semanal de conformidade e alertas de pendências críticas. SHALL permitir escolher o idioma dos relatórios e a periodicidade. Os controles SHALL usar React Hook Form com validação Zod e SHALL preservar os valores quando o salvamento falhar.

#### Scenario: Alteração de notificações

- **WHEN** o usuário alterna um interruptor
- **THEN** o estado visual do controle muda
- **AND** o novo valor é considerado no salvamento

#### Scenario: Preferências inválidas

- **WHEN** um valor de idioma ou periodicidade não pertence às opções permitidas
- **THEN** o salvamento é bloqueado
- **AND** uma mensagem acessível é exibida junto ao campo

### Requirement: Salvamento é explícito e simulado

Ao salvar as preferências, a tela SHALL indicar carregamento, bloquear envios duplicados e comunicar sucesso ou falha. A mensagem de sucesso SHALL informar que a alteração vale apenas para a demonstração e que nenhum dado foi persistido em servidor. Falhas SHALL preservar os valores editados e permitir nova tentativa.

#### Scenario: Salvamento concluído

- **WHEN** o usuário salva preferências válidas
- **THEN** o botão indica carregamento e fica desabilitado
- **AND** uma confirmação informa que a alteração é de demonstração

#### Scenario: Falha no salvamento

- **WHEN** a operação simulada falha
- **THEN** uma mensagem com `role="alert"` é exibida
- **AND** os valores editados permanecem preenchidos
- **AND** o usuário pode tentar novamente

### Requirement: Segurança permite alteração de senha validada

A seção de segurança SHALL solicitar senha atual e nova senha, validar senha com pelo menos 8 caracteres contendo letra e número, e impedir que a nova senha seja igual à atual. A alteração SHALL ser simulada, com estados de carregamento, sucesso e erro. A interface SHALL indicar que autenticação em dois fatores ainda não está disponível, sem apresentar um controle enganoso.

#### Scenario: Senha inválida

- **WHEN** o usuário informa nova senha curta, sem letra, sem número ou igual à senha atual
- **THEN** mensagens acessíveis são exibidas junto aos campos
- **AND** a alteração não é executada

#### Scenario: Alteração simulada

- **WHEN** o usuário informa dados válidos e aciona “Alterar senha”
- **THEN** a operação simulada é executada
- **AND** a confirmação deixa claro que nenhuma senha real foi alterada
- **AND** os campos de senha são limpos

### Requirement: Domínio monitorado é somente leitura

A tela SHALL exibir o domínio monitorado em campo somente leitura, com rótulo visível, estado de verificação comunicado por ícone e texto, e data da última verificação. A tela SHALL informar que a alteração do domínio depende do suporte e SHALL NOT permitir edição local do valor.

#### Scenario: Domínio verificado

- **WHEN** as configurações são carregadas com domínio verificado
- **THEN** o domínio é exibido em campo somente leitura
- **AND** o estado “Verificado” é comunicado por texto e ícone
- **AND** a última verificação é exibida

### Requirement: Integrações comunicam estado e conexão simulada

A tela SHALL listar as integrações disponíveis, diferenciar conectadas de disponíveis por texto e ícone, e permitir simular a conexão de uma integração disponível. A interface SHALL informar que a conexão é simulada e SHALL NOT afirmar que uma integração externa foi realmente autorizada.

#### Scenario: Integração disponível

- **WHEN** uma integração está disponível
- **THEN** a tela oferece a ação “Conectar”
- **AND** a ação comunica carregamento durante a simulação
- **AND** ao concluir, o estado muda para “Conectado” com aviso de demonstração

#### Scenario: Integração já conectada

- **WHEN** uma integração está conectada
- **THEN** a tela exibe o estado “Conectado” com texto e ícone
- **AND** não oferece a ação “Conectar” para essa integração

### Requirement: Zona de risco exige confirmação e não apaga dados reais

A seção de zona de risco SHALL alertar sobre ações irreversíveis e SHALL exigir confirmação em diálogo acessível antes de solicitar a exclusão da conta. A solicitação SHALL ser simulada e SHALL informar explicitamente que nenhuma conta ou dado foi excluído. O diálogo SHALL poder ser cancelado por teclado e SHALL devolver o foco ao controle de origem.

#### Scenario: Abertura da confirmação

- **WHEN** o usuário aciona “Excluir conta permanentemente”
- **THEN** um diálogo acessível apresenta o caráter irreversível e o contexto de demonstração
- **AND** o foco é movido para o diálogo
- **AND** existe a opção de cancelar

#### Scenario: Exclusão simulada

- **WHEN** o usuário confirma a solicitação
- **THEN** uma operação simulada é executada
- **AND** a tela informa que nenhuma conta ou dado foi excluído
- **AND** o foco retorna ao controle de origem ao fechar o diálogo

### Requirement: Estados, acessibilidade e conteúdo honesto

A tela SHALL tratar carregamento, sucesso, erro e dados ausentes. Todos os controles SHALL ser acessíveis por teclado, com foco visível, nomes acessíveis e status não comunicados apenas por cor. A copy SHALL estar em português do Brasil e SHALL deixar explícito que configurações, integrações, senha e exclusão são simulações de demonstração.

#### Scenario: Carregamento

- **WHEN** a tela busca as configurações
- **THEN** um estado de carregamento é anunciado
- **AND** os controles não são exibidos como se os dados já estivessem disponíveis

#### Scenario: Falha ao carregar

- **WHEN** a busca de configurações falha
- **THEN** uma mensagem amigável com `role="alert"` é exibida
- **AND** existe uma ação para tentar novamente
- **AND** detalhes internos de erro não são expostos

#### Scenario: Uso por teclado

- **WHEN** o usuário percorre a tela apenas com Tab e Shift+Tab
- **THEN** a ordem de foco é lógica
- **AND** todos os interruptores, selects, botões e o diálogo são acionáveis por teclado
- **AND** o foco é visível em cada controle
