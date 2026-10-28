# Spec Delta

## Purpose

Define a tela de cadastro do ATUE, o aproveitamento do domínio recebido da landing, a validação acessível do formulário e o início de sessão simulado que encaminha o usuário ao painel.

## ADDED Requirements

### Requirement: Cadastro em superfície escura consistente com a landing

A rota `/cadastro` SHALL renderizar uma tela de autenticação em tema escuro, com marca ATUE, caminho de volta para `/`, identificação da finalidade da tela e formulário de criação de conta. A tela SHALL compartilhar a linguagem visual da landing: fundo `neutral-950`, texto claro, texto secundário `neutral-400`, bordas `white/10`, destaque azul e foco visível. O cabeçalho SHALL reutilizar o mesmo contêiner e posicionamento da marca da landing e SHALL permanecer fixo no topo.

#### Scenario: Abertura direta do cadastro

- **WHEN** o usuário acessa `/cadastro` diretamente
- **THEN** a tela de cadastro é exibida sem erro
- **AND** há um único `h1` identificando a criação da conta
- **AND** existe um caminho visível de volta para `/`

#### Scenario: Layout em telas largas

- **WHEN** a tela é aberta em viewport a partir de `lg`
- **THEN** o conteúdo é organizado em duas colunas, com apresentação institucional e card de formulário
- **AND** a leitura e a ordem de foco permanecem coerentes

#### Scenario: Cabeçalho alinhado com a landing

- **WHEN** o usuário alterna entre `/` e `/cadastro` em uma viewport larga
- **THEN** a marca ATUE ocupa a mesma posição horizontal nas duas telas
- **AND** o cabeçalho permanece visível no topo ao rolar a página de cadastro

### Requirement: Domínio recebido é exibido de forma defensiva

Quando o state da rota contiver um domínio válido no contrato `{ domain: string }`, a tela SHALL exibir o domínio no contexto do cadastro. Quando o state estiver ausente, inválido ou a página for recarregada, a tela SHALL continuar funcional, sem erro e sem inventar um domínio.

#### Scenario: Domínio vindo da landing

- **WHEN** o usuário chega a `/cadastro` após enviar `exemplo.com.br` na landing
- **THEN** o domínio `exemplo.com.br` é exibido na tela
- **AND** o formulário permanece utilizável

#### Scenario: Cadastro sem domínio

- **WHEN** o usuário acessa `/cadastro` diretamente ou recarrega a página
- **THEN** nenhum domínio é exibido
- **AND** a tela continua funcional

### Requirement: Formulário valida dados e senha forte

O formulário SHALL solicitar nome, e-mail, nome da empresa e senha. A validação SHALL usar React Hook Form com schema Zod, exigir nome com pelo menos 3 caracteres, e-mail válido, empresa com pelo menos 2 caracteres e senha com pelo menos 8 caracteres contendo letra e número. Entradas inválidas SHALL exibir mensagem acessível junto ao campo, preservar os valores digitados e impedir o envio.

#### Scenario: Envio com dados válidos

- **WHEN** o usuário preenche todos os campos com dados válidos e envia
- **THEN** o cadastro é processado
- **AND** nenhuma mensagem de validação é exibida

#### Scenario: Envio com campos inválidos

- **WHEN** o usuário envia o formulário com nome curto, e-mail inválido, empresa vazia ou senha fraca
- **THEN** mensagens de erro são exibidas junto aos campos afetados
- **AND** o envio não ocorre
- **AND** os valores digitados são preservados

#### Scenario: Erro associado ao campo

- **WHEN** um campo está inválido
- **THEN** ele recebe indicação de erro acessível
- **AND** a mensagem é associada ao campo por `aria-describedby`
- **AND** a informação não depende apenas de cor

### Requirement: Cadastro simulado inicia sessão e encaminha ao painel

Ao enviar dados válidos, a aplicação SHALL simular a criação da conta por meio do boundary de mocks, com atraso determinístico, gravar o `UserToken` no `AuthContext` em memória e navegar para `/dashboard`. A interface SHALL deixar explícito que a conta é de demonstração e SHALL NOT afirmar que houve cadastro real ou verificação de conformidade.

#### Scenario: Cadastro concluído

- **WHEN** o usuário envia dados válidos
- **THEN** a operação simulada é executada
- **AND** o token é gravado na sessão em memória
- **AND** o usuário é encaminhado para `/dashboard`
- **AND** a mensagem de sucesso informa que se trata de uma conta de demonstração

#### Scenario: Envio duplicado

- **WHEN** o usuário aciona o botão de envio novamente durante o processamento
- **THEN** um novo envio não é disparado
- **AND** o controle permanece desabilitado até o término

### Requirement: Estados de carregamento, sucesso e erro são explícitos

A tela SHALL comunicar o estado de processamento, o sucesso simulado e a falha. Em caso de falha, SHALL exibir mensagem acessível, preservar os dados preenchidos e permitir nova tentativa. Detalhes internos de erro SHALL NOT ser expostos ao usuário.

#### Scenario: Processamento em andamento

- **WHEN** o formulário é enviado
- **THEN** o botão indica carregamento
- **AND** o controle fica desabilitado durante a operação

#### Scenario: Falha no cadastro

- **WHEN** a operação simulada falha
- **THEN** uma mensagem amigável é exibida com `role="alert"`
- **AND** os dados do formulário permanecem preenchidos
- **AND** o usuário pode tentar novamente

### Requirement: Interface acessível e responsiva

A tela SHALL ser utilizável a partir de 320px de largura, sem rolagem horizontal, com rótulos visíveis, nomes acessíveis, foco visível, ordem de tabulação lógica e hierarquia de títulos coerente. O controle de exibir/ocultar senha SHALL ter nome acessível e informar seu estado.

#### Scenario: Tela de 320px

- **WHEN** a tela é aberta com 320px de largura
- **THEN** o conteúdo permanece legível
- **AND** não há rolagem horizontal
- **AND** todos os campos e o botão continuam utilizáveis

#### Scenario: Uso por teclado

- **WHEN** o usuário percorre a tela apenas com Tab e Shift+Tab
- **THEN** a ordem de foco é lógica
- **AND** o foco é visível em cada controle
- **AND** o botão de mostrar/ocultar senha pode ser acionado por teclado
