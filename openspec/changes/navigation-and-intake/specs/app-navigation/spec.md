# Spec Delta

## Purpose

Define a navegação conectada entre as telas existentes do ATUE Web.

## ADDED Requirements

### Requirement: Todas as rotas são alcançáveis por navegação visível

Cada rota renderizada pelo SPA SHALL ser alcançável por pelo menos um link ou botão visível em outra tela. Rotas internas SHALL oferecer um caminho de volta. A rota `/form` SHALL deixar de ser acessível apenas pela barra de endereço.

#### Scenario: Descoberta de rotas públicas

- **WHEN** a pessoa visita a landing page
- **THEN** encontra links visíveis para planos, login, cadastro, envio de documentos e contato
- **AND** o rodapé público mantém os mesmos destinos principais

#### Scenario: Descoberta de rotas internas

- **WHEN** a pessoa está em uma rota da área logada
- **THEN** o cabeçalho oferece painel, documentos, perfil e configurações
- **AND** o rodapé oferece painel, documentos, envio, perfil, configurações, planos e site

#### Scenario: Envio de documentos

- **WHEN** a pessoa está no painel, na Central de Documentos ou no rodapé público
- **THEN** existe um controle visível para `/form`
- **AND** a página de envio permite voltar ao site, entrar, criar conta, ver planos e, após o sucesso, ir ao painel ou à Central de Documentos

### Requirement: Páginas internas usam atalhos contextuais

As páginas de painel, documentos, perfil e configurações SHALL usar componentes compartilhados de navegação. Os destinos SHALL ser mantidos em um único módulo de conteúdo. Atalhos contextuais SHALL usar uma `nav` com nome acessível e links com foco visível.

#### Scenario: Atalhos da central

- **WHEN** a pessoa abre `/documents`
- **THEN** há atalhos para painel, envio completo, preferências de relatório e planos
- **AND** o resultado da análise oferece links para o painel e para os downloads
- **AND** a Central de Downloads oferece link para as preferências de relatório

#### Scenario: Atalhos de conta

- **WHEN** a pessoa abre `/profile` ou `/settings`
- **THEN** há atalhos contextuais para documentos, a outra página de conta e planos
- **AND** o rodapé permanece disponível ao final da página

### Requirement: Página não encontrada orienta a continuidade

A rota curinga SHALL exibir uma página 404 com um título, uma explicação curta e links para início, painel, documentos, planos e login. A página SHALL NOT ser um beco sem saída.

#### Scenario: Endereço inválido

- **WHEN** a pessoa acessa um endereço inexistente
- **THEN** a página informa que o endereço não existe ou foi movido
- **AND** oferece caminhos visíveis para continuar a navegação

### Requirement: Navegação é acessível e responsiva

Links e atalhos SHALL ser acionáveis por teclado, com foco visível, nomes acessíveis e ordem de leitura coerente. Em telas estreitas, os links SHALL quebrar linha sem causar rolagem horizontal.

#### Scenario: Uso por teclado

- **WHEN** a pessoa percorre a página apenas com Tab e Shift+Tab
- **THEN** todos os links de navegação recebem foco visível
- **AND** a ordem segue a estrutura visual da página

#### Scenario: Tela estreita

- **WHEN** a página é exibida em 320px
- **THEN** os links quebram linha ou se empilham
- **AND** não há rolagem horizontal
