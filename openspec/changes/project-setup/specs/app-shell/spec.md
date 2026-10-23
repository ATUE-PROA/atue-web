## Purpose

Define o comportamento observável da aplicação base do ATUE Web — inicialização do shell e roteamento raiz — servindo de ponto de partida para as telas das changes seguintes.

## ADDED Requirements

### Requirement: Raiz exibe o shell da aplicação

A aplicação SHALL renderizar um shell mínimo na rota `/`, contendo um título de nível 1 identificando o produto e sem qualquer conteúdo de demonstração do template do Vite.

#### Scenario: Abertura da raiz

- **WHEN** o usuário acessa `/`
- **THEN** a página renderiza um único `h1` com o nome do produto
- **AND** não há contador, logos ou links de documentação do template

#### Scenario: Recarregar a raiz

- **WHEN** o usuário recarrega `/` diretamente no navegador
- **THEN** a mesma página é servida pelo servidor de desenvolvimento e pelo build de produção

### Requirement: Rota inexistente exibe página de não encontrado

A aplicação SHALL responder a qualquer caminho não registrado com uma página de não encontrado que ofereça um caminho de volta para a raiz.

#### Scenario: Caminho desconhecido

- **WHEN** o usuário acessa `/caminho-que-nao-existe`
- **THEN** a página de não encontrado é exibida com um título de nível 1
- **AND** um link "Voltar para o início" aponta para `/`

#### Scenario: Retorno pela página de não encontrado

- **WHEN** o usuário aciona o link "Voltar para o início"
- **THEN** a rota `/` é exibida com o shell da aplicação

### Requirement: Navegação entre rotas é client-side

A troca de rotas SHALL ocorrer dentro da aplicação, sem recarregar o documento.

#### Scenario: Navegação sem reload

- **WHEN** o usuário navega da página de não encontrado para `/`
- **THEN** o documento não é recarregado pelo navegador
