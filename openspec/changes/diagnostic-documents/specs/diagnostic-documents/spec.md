# Spec Delta

## Purpose

Define a Central de Documentos simulada do ATUE, o painel de achados enriquecido e os downloads locais de relatórios e modelos em PDF.

## ADDED Requirements

### Requirement: Diagnóstico apresenta achados explicados

O diagnóstico SHALL exibir cada achado com nome, categoria, severidade, descrição curta e uma explicação simulada. A severidade SHALL ser comunicada por texto e ícone, não apenas por cor. A explicação SHALL ser acessível por teclado e indicar que foi gerada em uma demonstração.

#### Scenario: Achado com explicação

- **WHEN** o diagnóstico carrega com achados
- **THEN** cada achado exibe nome, categoria e severidade
- **AND** existe um controle expansível com explicação e recomendação
- **AND** a severidade é legível sem depender de cor

#### Scenario: Nenhum achado

- **WHEN** o diagnóstico não possui achados
- **THEN** uma mensagem explica que nada foi encontrado
- **AND** a tela não fica em branco

### Requirement: Área logada oferece acesso à Central de Documentos

A área logada SHALL oferecer um controle visível com nome acessível que leve à rota `/documents`. O controle SHALL indicar a página atual quando a rota estiver ativa. A rota `/documents` SHALL renderizar um único `h1` e as seções de envio, documentos, análise e downloads.

#### Scenario: Acesso pelo cabeçalho

- **WHEN** o usuário está em uma rota da área logada
- **THEN** há um controle “Documentos” com nome acessível no cabeçalho
- **AND** o controle leva a `/documents`
- **AND** o estado ativo é indicado quando a rota é `/documents`

### Requirement: Envio é fictício e não acessa arquivos do dispositivo

A Central SHALL permitir escolher um documento de exemplo e iniciar uma análise sem abrir o seletor de arquivos do sistema. A tela SHALL informar que nenhum arquivo do dispositivo é lido, enviado ou armazenado. A análise SHALL ser bloqueada enquanto outra estiver em andamento.

#### Scenario: Escolha de documento de exemplo

- **WHEN** o usuário abre a Central
- **THEN** há uma lista de documentos fictícios com nome, tipo e tamanho
- **AND** a copy informa que nenhum arquivo real será acessado
- **AND** a ação de análise fica disponível

#### Scenario: Envio duplicado

- **WHEN** uma análise está em andamento
- **THEN** a ação de iniciar outra análise fica desabilitada
- **AND** o estado de carregamento é visível

### Requirement: Análise simulada mostra etapas e resultado

A análise SHALL exibir etapas nomeadas, uma barra de progresso e a etapa atual em uma região com `aria-live`. Ao concluir, a tela SHALL exibir score, data, quantidade de achados e a lista de achados. A análise SHALL ser explicitamente fictícia e SHALL NOT afirmar que uma IA real leu o documento.

#### Scenario: Acompanhamento da análise

- **WHEN** o usuário inicia uma análise
- **THEN** as etapas são exibidas em sequência
- **AND** a tela rola até o cartão de processamento
- **AND** a rolagem é imediata quando o sistema solicita movimento reduzido
- **AND** a etapa atual é anunciada
- **AND** o botão permanece desabilitado até a conclusão

#### Scenario: Conclusão

- **WHEN** a análise simulada termina
- **THEN** um alerta informa que a análise foi concluída
- **AND** o score e os achados são exibidos
- **AND** um relatório fica disponível para download
- **AND** a copy informa que os dados são fictícios

#### Scenario: Falha simulada

- **WHEN** a análise falha
- **THEN** uma mensagem com `role="alert"` é exibida
- **AND** o usuário pode tentar novamente
- **AND** nenhum arquivo real é alterado

### Requirement: Central de Downloads gera arquivos locais em múltiplos formatos

A Central SHALL listar relatórios gerados e modelos de documentos. Cada item SHALL oferecer um menu acessível com os formatos PDF, DOCX e TXT, com uma descrição curta do uso de cada formato e uma ação com estado de carregamento. Os arquivos SHALL ser gerados localmente no navegador, SHALL conter aviso de demonstração e SHALL NOT ser armazenados em servidor. O DOCX SHALL ser um pacote OOXML válido e o TXT SHALL usar texto simples em UTF-8. Erros SHALL ser comunicados de forma acessível.

#### Scenario: Escolha do formato

- **WHEN** o usuário aciona a ação de download de um item
- **THEN** um menu exibe PDF, DOCX e TXT com uma descrição de uso para cada formato
- **AND** o menu pode ser operado por teclado
- **AND** o gatilho informa qual item será baixado

#### Scenario: Download de relatório

- **WHEN** o usuário escolhe um formato no menu
- **THEN** a ação indica o formato que está sendo gerado
- **AND** um arquivo fictício no formato escolhido é baixado
- **AND** a confirmação informa que o arquivo foi gerado localmente

#### Scenario: Central vazia

- **WHEN** ainda não há relatórios gerados
- **THEN** uma mensagem explica como gerar o primeiro relatório
- **AND** a seção de modelos permanece disponível

#### Scenario: Falha no download

- **WHEN** a geração do arquivo falha
- **THEN** uma mensagem com `role="alert"` é exibida
- **AND** o usuário pode tentar novamente

### Requirement: Interface acessível e responsiva

A Central SHALL ser utilizável apenas com teclado, com foco visível, nomes acessíveis e ordem de leitura coerente. Em viewports largas, as seções SHALL ser distribuídas em duas colunas; em telas estreitas, SHALL ser empilhadas sem rolagem horizontal. Animações SHALL respeitar `prefers-reduced-motion`.

#### Scenario: Uso por teclado

- **WHEN** o usuário percorre a tela apenas com Tab e Shift+Tab
- **THEN** o seletor, os botões, os `details` e os links são acionáveis
- **AND** o foco é visível em cada controle

#### Scenario: Tela estreita

- **WHEN** a tela é exibida em 320px
- **THEN** as seções são empilhadas
- **AND** não há rolagem horizontal
- **AND** os textos e botões permanecem utilizáveis

#### Scenario: Movimento reduzido

- **WHEN** o sistema solicita movimento reduzido
- **THEN** as animações decorativas não são executadas
- **AND** progresso, estados e conteúdos continuam compreensíveis
