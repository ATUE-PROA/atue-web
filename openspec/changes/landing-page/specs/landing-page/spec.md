# Spec Delta

## Purpose

Define a página pública de apresentação do ATUE e a captura inicial de domínio que inicia o fluxo de cadastro, sem executar diagnóstico, crawling ou chamadas de rede.

## ADDED Requirements

### Requirement: Raiz entrega a landing page

A rota `/` SHALL renderizar a landing page pública com cabeçalho, hero, faixa de benefícios, "Como funciona?", visão do produto, captura de domínio e rodapé, em tema escuro, sem reproduzir a área vazia e inacabada do frame do Figma.

#### Scenario: Abertura da raiz

- **WHEN** o visitante acessa `/`
- **THEN** todas as seções planejadas da landing são exibidas
- **AND** há um único `h1` com a manchete do hero

#### Scenario: Área não implementada

- **WHEN** a landing é renderizada
- **THEN** nenhum bloco vazio ou seção adicional é exibido além das seções planejadas

### Requirement: Cabeçalho oferece navegação e chamadas para ação

O cabeçalho SHALL exibir a marca ATUE, os links "Como funciona", "Benefícios", "Sobre" e "Contato", o acesso "Login" e a ação "Cadastre-se". Os links SHALL levar às seções correspondentes e "Cadastre-se" SHALL abrir `/cadastro`. Em telas estreitas, a navegação SHALL ser acessível por um controle de abertura com nome acessível e estado expandido.

#### Scenario: Navegação por âncora

- **WHEN** o visitante aciona "Como funciona"
- **THEN** a página rola até a seção "Como funciona?"
- **AND** o documento não é recarregado

#### Scenario: Menu mobile

- **WHEN** o visitante abre o menu em uma tela estreita
- **THEN** os links de navegação ficam visíveis
- **AND** o controle informa o estado expandido
- **AND** o menu pode ser fechado pelo teclado

#### Scenario: Ação de cadastro no cabeçalho

- **WHEN** o visitante aciona "Cadastre-se"
- **THEN** a rota `/cadastro` é exibida

### Requirement: Hero leva à captura de domínio

O botão "Conheça o ATUE" no hero SHALL levar o visitante à seção de captura de domínio, sem recarregar o documento.

#### Scenario: CTA do hero

- **WHEN** o visitante aciona "Conheça o ATUE"
- **THEN** a seção de captura de domínio entra na área visível
- **AND** o documento não é recarregado

### Requirement: Captura de domínio normaliza e valida a entrada

O formulário SHALL normalizar o domínio informado, removendo espaços, protocolo, `www`, caminho, consulta e fragmento, e convertendo para minúsculas. A entrada SHALL ser aceita apenas quando resultar em um hostname com ao menos um ponto. Entradas inválidas SHALL exibir uma mensagem acessível junto ao campo e preservar o valor digitado.

#### Scenario: Domínio válido

- **WHEN** o visitante informa ` https://www.Exemplo.com.br/contato `
- **THEN** a entrada é aceita como `exemplo.com.br`

#### Scenario: Domínio inválido

- **WHEN** o visitante informa um valor sem ponto ou com formato inválido
- **THEN** uma mensagem de erro acessível é exibida junto ao campo
- **AND** não há navegação
- **AND** o valor digitado é preservado

### Requirement: Envio válido inicia o cadastro com o domínio

Ao enviar um domínio válido, a aplicação SHALL navegar para `/cadastro` levando o domínio normalizado no state da rota como `{ domain: string }`, sem executar requisição de rede nem iniciar avaliação do site.

#### Scenario: Submissão válida

- **WHEN** o visitante envia `exemplo.com.br`
- **THEN** a rota `/cadastro` é exibida
- **AND** o state da rota contém `{ domain: "exemplo.com.br" }`
- **AND** nenhuma requisição de rede é disparada

#### Scenario: Submissão inválida não navega

- **WHEN** o visitante envia um domínio inválido
- **THEN** a landing permanece em `/`
- **AND** o erro é exibido junto ao campo

### Requirement: Cadastro temporário evita página não encontrada

A rota `/cadastro` SHALL exibir uma página temporária que informe que o cadastro será entregue pela change de autenticação. A página SHALL exibir o domínio recebido quando ele estiver presente no state e SHALL funcionar sem erro quando a rota for aberta diretamente, sem state.

#### Scenario: Cadastro com domínio no state

- **WHEN** o visitante chega a `/cadastro` após enviar um domínio válido
- **THEN** a página temporária é exibida
- **AND** o domínio recebido é mostrado

#### Scenario: Acesso direto ao cadastro

- **WHEN** o visitante acessa `/cadastro` diretamente
- **THEN** a página temporária é exibida sem erro
- **AND** há um caminho de volta para `/`

### Requirement: Interface responsiva e acessível

A landing page SHALL ser utilizável a partir de 320px de largura, sem rolagem horizontal, e SHALL oferecer landmarks semânticos, hierarquia de títulos coerente, rótulos visíveis, foco visível, ordem de tabulação lógica e nomes acessíveis para controles.

#### Scenario: Tela de 320px

- **WHEN** a landing é aberta com 320px de largura
- **THEN** o conteúdo permanece legível
- **AND** não há rolagem horizontal
- **AND** a navegação e o formulário continuam utilizáveis

#### Scenario: Uso por teclado

- **WHEN** o visitante percorre cabeçalho, menu, formulário e rodapé com Tab
- **THEN** a ordem de foco é lógica
- **AND** o foco é visível em cada controle
- **AND** o campo de domínio tem rótulo e o erro é associado a ele
