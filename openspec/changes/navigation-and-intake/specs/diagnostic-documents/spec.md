# Spec Delta

## REMOVED Requirements

### Requirement: Envio é fictício e não acessa arquivos do dispositivo

O requisito anterior proibia qualquer seletor de arquivos na Central de Documentos. Ele é substituído por um anexo local controlado, sem leitura de conteúdo ou upload.

**Reason:** o fluxo de produto agora pede um botão de anexo seguido da solicitação de análise.

**Migration:** a lista de documentos fictícios continua disponível como alternativa; o novo anexo usa apenas metadados e mantém os avisos de demonstração.

## ADDED Requirements

### Requirement: Documento pode ser anexado sem upload

A Central SHALL oferecer um botão “Anexar documento” que abre um seletor de arquivos. A entrada SHALL aceitar PDF, DOC, DOCX e TXT de até 10 MB, validar formato e tamanho e informar erros de forma acessível. O arquivo SHALL permanecer no dispositivo; nenhum conteúdo SHALL ser lido com `FileReader`, enviado ou armazenado. A interface SHALL informar que somente nome, tipo e tamanho são usados.

#### Scenario: Anexo válido

- **WHEN** a pessoa anexa um PDF de 2 MB
- **THEN** a tela exibe nome, tipo e tamanho do arquivo
- **AND** oferece ações para trocar ou remover o arquivo
- **AND** a ação de análise fica habilitada
- **AND** a cópia informa que o arquivo não foi enviado

#### Scenario: Formato inválido

- **WHEN** a pessoa tenta anexar um arquivo de formato não aceito
- **THEN** uma mensagem com `role="alert"` explica os formatos aceitos
- **AND** nenhum arquivo é mantido no estado
- **AND** a pessoa pode tentar novamente

#### Scenario: Arquivo acima do limite

- **WHEN** a pessoa tenta anexar um arquivo maior que 10 MB
- **THEN** uma mensagem explica o limite
- **AND** a análise não é habilitada para esse arquivo

#### Scenario: Remoção do anexo

- **WHEN** a pessoa remove o arquivo anexado
- **THEN** o cartão de anexo volta ao estado vazio
- **AND** a análise fica disponível apenas se houver documento de exemplo selecionado

### Requirement: Análise distingue arquivo anexado e documento de exemplo

A análise SHALL receber um alvo tipado que identifica a origem (`local` ou `sample`). A ação principal SHALL usar o rótulo “Analisar com IA”, SHALL ser bloqueada durante a execução e SHALL informar que a IA é uma simulação local. O resultado SHALL exibir a origem analisada e SHALL oferecer links para o painel e para os downloads.

#### Scenario: Análise de arquivo anexado

- **WHEN** a pessoa anexa um arquivo e aciona “Analisar com IA”
- **THEN** as etapas simuladas são exibidas
- **AND** a pessoa é avisada de que nenhum conteúdo foi lido ou enviado
- **AND** o resultado indica que a origem é um arquivo anexado neste dispositivo
- **AND** um relatório de demonstração é adicionado aos downloads

#### Scenario: Análise de documento de exemplo

- **WHEN** a pessoa seleciona um documento fictício e aciona a análise
- **THEN** o resultado indica que a origem é um documento de exemplo
- **AND** o documento recebe o selo de analisado nesta sessão
- **AND** o estado compartilhado do diagnóstico é atualizado

#### Scenario: Envio duplicado

- **WHEN** uma análise está em andamento
- **THEN** o botão permanece desabilitado
- **AND** outra seleção ou anexo não inicia uma segunda análise

### Requirement: Arquivos gerados têm estrutura profissional

Os geradores locais SHALL produzir PDF, DOCX e TXT a partir do mesmo contrato, com aviso de demonstração e sem validade legal. O PDF SHALL incluir capa, metadados, métricas, cabeçalho, rodapé e paginação. O DOCX SHALL ser um pacote OOXML válido com estilos, numeração, tabela de métricas, cabeçalho, rodapé e propriedades do documento. O TXT SHALL usar UTF-8, largura legível, cabeçalho, métricas e seções delimitadas.

#### Scenario: Download em PDF

- **WHEN** a pessoa escolhe PDF para um relatório ou modelo
- **THEN** o arquivo é gerado localmente
- **AND** contém capa, referência, métricas e paginação
- **AND** cada página informa que o documento é uma demonstração

#### Scenario: Download em DOCX

- **WHEN** a pessoa escolhe DOCX
- **THEN** o arquivo é um pacote OOXML válido
- **AND** usa estilos nomeados, lista com marcadores, tabela de métricas e campos de página no rodapé
- **AND** pode ser editado no Word ou no Google Docs

#### Scenario: Download em TXT

- **WHEN** a pessoa escolhe TXT
- **THEN** o arquivo usa UTF-8 e texto simples
- **AND** mantém cabeçalho, métricas com pontilhado, seções e aviso final
- **AND** o conteúdo permanece legível em 78 colunas

#### Scenario: Falha na geração

- **WHEN** a geração do arquivo falha
- **THEN** uma mensagem com `role="alert"` é exibida
- **AND** nenhum dado é alterado
- **AND** a pessoa pode tentar novamente
