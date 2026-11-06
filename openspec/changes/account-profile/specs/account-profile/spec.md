# Spec Delta

## Purpose

Define a tela de perfil da conta do ATUE, seu ponto de entrada na área logada e os fluxos simulados de dados pessoais, contato, empresa, DPO e prévia de foto.

## ADDED Requirements

### Requirement: Área logada oferece acesso ao perfil

A área logada SHALL oferecer um controle visível com nome acessível que leve à rota `/profile`. O controle SHALL indicar a página atual quando a rota estiver ativa. A rota `/profile` SHALL renderizar um único `h1` com o título “Perfil”, uma indicação de que se trata de dados pessoais e da empresa e um caminho para voltar ao site.

#### Scenario: Acesso pelo cabeçalho

- **WHEN** o usuário está em `/dashboard`, `/settings` ou `/profile`
- **THEN** há um controle “Perfil” com nome acessível no cabeçalho
- **AND** o controle leva a `/profile`
- **AND** o estado ativo é indicado quando a rota é `/profile`

#### Scenario: Perfil aberto diretamente

- **WHEN** o usuário acessa `/profile` diretamente
- **THEN** a tela de perfil é exibida sem erro
- **AND** há um único `h1` na página
- **AND** existe um caminho para voltar ao site

### Requirement: Tela apresenta as seções do perfil

A tela SHALL organizar os dados em seções de dados pessoais, contato, dados da empresa e responsável legal / DPO. Cada seção SHALL ter título `h2`, e os controles SHALL estar associados a rótulos visíveis. Em viewports largas, as seções SHALL ser distribuídas em duas colunas; em telas estreitas, SHALL ser empilhadas sem rolagem horizontal.

#### Scenario: Layout em telas largas

- **WHEN** a tela é aberta a partir do breakpoint `lg`
- **THEN** dados pessoais e contato ficam na coluna esquerda
- **AND** dados da empresa, DPO e a ação de salvar ficam na coluna direita
- **AND** a ordem de leitura e de foco permanece coerente

#### Scenario: Layout em telas estreitas

- **WHEN** a tela é aberta em 320px de largura
- **THEN** as seções são empilhadas
- **AND** não há rolagem horizontal
- **AND** todos os controles permanecem utilizáveis

### Requirement: Dados pessoais e contato são editáveis

A tela SHALL permitir editar nome completo, cargo, e-mail e telefone. Nome completo e e-mail SHALL ser obrigatórios. O cargo e o telefone SHALL ser opcionais, mas o telefone SHALL ser validado quando preenchido. A seção de dados pessoais SHALL exibir avatar com iniciais derivadas do nome e uma ação “Alterar foto”.

#### Scenario: Avatar com iniciais

- **WHEN** o nome completo é “Carlos Andrade”
- **THEN** o avatar exibe as iniciais “CA”
- **AND** o avatar é decorativo, enquanto o nome permanece disponível no campo rotulado

#### Scenario: Nome ou e-mail inválidos

- **WHEN** o usuário remove o nome ou informa um e-mail inválido
- **THEN** o salvamento é bloqueado
- **AND** mensagens acessíveis são exibidas junto aos campos

### Requirement: Prévia de foto é local e explícita

A ação “Alterar foto” SHALL abrir um seletor de imagem e permitir visualizar a imagem escolhida apenas localmente. A tela SHALL aceitar PNG, JPG ou WebP de até 2 MB, SHALL comunicar erro para arquivos inválidos e SHALL NOT afirmar que a foto foi enviada ou salva.

#### Scenario: Foto válida selecionada

- **WHEN** o usuário seleciona uma imagem válida
- **THEN** o avatar exibe a prévia local
- **AND** um aviso informa que a imagem não é enviada nem salva

#### Scenario: Arquivo inválido

- **WHEN** o usuário seleciona um arquivo que não é imagem aceita ou excede 2 MB
- **THEN** a prévia não é alterada
- **AND** uma mensagem acessível explica o formato e o limite aceitos

### Requirement: Dados da empresa e DPO são editáveis

A tela SHALL permitir editar razão social, CNPJ, setor, endereço e site institucional. Razão social, CNPJ e setor SHALL ser obrigatórios. O CNPJ SHALL ser validado com dígitos verificadores e o site SHALL ser validado quando preenchido. A seção de DPO SHALL permitir nome e e-mail opcionais, validando o e-mail quando preenchido, e SHALL exibir uma nota de que o DPO é o ponto de contato oficial para questões de LGPD.

#### Scenario: CNPJ inválido

- **WHEN** o usuário informa um CNPJ com dígitos verificadores inválidos
- **THEN** o salvamento é bloqueado
- **AND** uma mensagem acessível informa que o CNPJ é inválido

#### Scenario: Site institucional inválido

- **WHEN** o usuário informa um site que não é um domínio válido
- **THEN** o salvamento é bloqueado
- **AND** uma mensagem acessível indica o formato esperado

### Requirement: Salvamento é explícito e simulado

A tela SHALL oferecer “Salvar dados” no card de dados pessoais e “Salvar perfil” ao final do formulário. Ambos SHALL enviar o mesmo payload simulado, indicar carregamento, bloquear envios duplicados e comunicar sucesso ou falha no topo da página. A mensagem de sucesso SHALL informar que a alteração vale apenas para a demonstração e que nenhum dado foi persistido em servidor. Falhas SHALL preservar os valores editados e permitir nova tentativa.

#### Scenario: Salvamento concluído

- **WHEN** o usuário aciona qualquer uma das ações de salvamento com dados válidos
- **THEN** as duas ações ficam desabilitadas durante a operação
- **AND** o botão acionado indica carregamento
- **AND** uma confirmação informa que a alteração é de demonstração

#### Scenario: Falha no salvamento

- **WHEN** a operação simulada falha
- **THEN** uma mensagem com `role="alert"` é exibida
- **AND** os valores editados permanecem preenchidos
- **AND** o usuário pode tentar novamente

### Requirement: Estados, acessibilidade e conteúdo honesto

A tela SHALL tratar carregamento, sucesso, erro e dados ausentes. Todos os controles SHALL ser acessíveis por teclado, com foco visível, nomes acessíveis e status não comunicados apenas por cor. A copy SHALL estar em português do Brasil e SHALL deixar explícito que o perfil e a foto são simulações de demonstração.

#### Scenario: Carregamento

- **WHEN** a tela busca o perfil
- **THEN** um estado de carregamento é anunciado
- **AND** os controles não são exibidos como se os dados já estivessem disponíveis

#### Scenario: Falha ao carregar

- **WHEN** a busca do perfil falha
- **THEN** uma mensagem amigável com `role="alert"` é exibida
- **AND** existe uma ação para tentar novamente
- **AND** detalhes internos de erro não são expostos

#### Scenario: Uso por teclado

- **WHEN** o usuário percorre a tela apenas com Tab e Shift+Tab
- **THEN** a ordem de foco é lógica
- **AND** todos os campos, seletores, botões e o link de volta são acionáveis por teclado
- **AND** o foco é visível em cada controle
