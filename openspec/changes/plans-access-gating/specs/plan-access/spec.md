# Spec Delta

## Purpose

Define o destino pós-autenticação, a assinatura simulada, o ambiente de teste e o bloqueio de recursos por plano no ATUE.

## ADDED Requirements

### Requirement: Autenticação leva à escolha do plano

Login e cadastro bem-sucedidos SHALL navegar para `/plans` com substituição da entrada de histórico. A confirmação de sucesso do cadastro SHALL informar que o próximo passo é a escolha do plano. A área pública SHALL refletir que, sem plano ativo, o próximo destino da sessão é `/plans`.

#### Scenario: Login concluído

- **WHEN** uma pessoa entra com credenciais válidas
- **THEN** a sessão é iniciada em memória
- **AND** a rota `/plans` é exibida
- **AND** o botão de sessão no cabeçalho aponta para `/plans` enquanto não houver plano ativo

#### Scenario: Cadastro concluído

- **WHEN** uma pessoa conclui o cadastro de demonstração
- **THEN** a confirmação informa que ela será encaminhada para a escolha do plano
- **AND** após o intervalo de confirmação, a rota `/plans` é exibida

### Requirement: Escolha de plano exige confirmação simulada

Quando uma pessoa autenticada aciona o CTA de um plano diferente do ativo, a tela SHALL exibir um card vindo de cima para baixo solicitando a assinatura do plano. O card SHALL informar que a assinatura é simulada e não gera cobrança. O CTA de confirmação SHALL ativar o plano em memória e navegar para `/dashboard`. O card SHALL poder ser fechado sem alterar o plano.

#### Scenario: Plano diferente selecionado

- **WHEN** a pessoa autenticada aciona “Escolher Cresce” ou “Escolher Escala”
- **THEN** um card desce do topo com a confirmação “Assinar o plano {plano}?”
- **AND** a descrição informa que não há cobrança real
- **AND** a pessoa pode confirmar ou escolher “Agora não”

#### Scenario: Assinatura confirmada

- **WHEN** a pessoa confirma a assinatura no card
- **THEN** o plano escolhido fica ativo em memória
- **AND** o card é fechado
- **AND** a rota `/dashboard` é exibida

#### Scenario: Plano atual selecionado

- **WHEN** o plano acionado já é o plano ativo
- **THEN** o card de assinatura não é exibido
- **AND** a pessoa é encaminhada ao painel

### Requirement: Ambiente de teste é discreto e explícito

A página `/plans` SHALL oferecer, abaixo dos cards, uma opção discreta “Testar ambiente” que ative o plano Início em modo de teste e navegue para o painel. A opção SHALL informar que os dados são fictícios e que nenhuma cobrança é realizada. Sem sessão ativa, a opção SHALL encaminhar para `/login`.

#### Scenario: Teste do ambiente com sessão

- **WHEN** uma pessoa autenticada aciona “Testar ambiente”
- **THEN** o plano Início é ativado em modo de teste
- **AND** a rota `/dashboard` é exibida
- **AND** o cabeçalho de produto indica “Ambiente de teste”

#### Scenario: Teste do ambiente sem sessão

- **WHEN** uma pessoa sem sessão aciona “Entrar para testar”
- **THEN** a rota `/login` é exibida
- **AND** nenhum plano é ativado

### Requirement: Recursos de outros planos exibem pedido de assinatura

Recursos mapeados para planos superiores SHALL abrir o card de assinatura quando o plano ativo não os inclui. O acesso SHALL considerar o ranking Início < Cresce < Escala. O card SHALL identificar o recurso e o plano necessário. O recurso SHALL NOT simular sucesso enquanto o acesso não estiver liberado.

#### Scenario: Integrações no plano Início

- **WHEN** a pessoa tenta conectar uma integração estando no plano Início
- **THEN** a conexão simulada não é iniciada
- **AND** o card informa que o recurso faz parte do plano Cresce

#### Scenario: Download de relatório no plano Início

- **WHEN** a pessoa tenta baixar um relatório gerado na Central de Downloads estando no plano Início
- **THEN** o download não é preparado
- **AND** o card informa que o recurso faz parte do plano Cresce

#### Scenario: Recurso liberado

- **WHEN** a pessoa está no plano Cresce ou Escala e aciona integrações
- **THEN** a conexão simulada é executada normalmente
- **AND** o card de assinatura não é exibido

### Requirement: Rota de produto sem plano pede assinatura

Acessar `/dashboard`, `/documents`, `/profile` ou `/settings` sem plano ativo SHALL exibir o card de assinatura com caminho para `/plans`. A tela SHALL continuar visível e o card SHALL poder ser fechado sem alterar a rota.

#### Scenario: Acesso direto sem plano

- **WHEN** uma pessoa sem plano ativo abre `/dashboard`
- **THEN** o card “Assine um plano para entrar na área logada” é exibido
- **AND** o CTA leva a `/plans`
- **AND** a tela de painel permanece acessível após fechar o card

### Requirement: Cabeçalhos refletem o plano ativo

O `ProductHeader` SHALL exibir um link para `/plans` com o plano ativo, “Ambiente de teste” ou “Sem plano ativo”. `PublicHeader` e `AuthLayout` SHALL usar “Planos” enquanto não houver plano ativo e “Dashboard” depois da assinatura ou do teste.

#### Scenario: Cabeçalho sem plano

- **WHEN** a pessoa está autenticada sem plano ativo
- **THEN** o cabeçalho de produto mostra “Sem plano ativo”
- **AND** o link leva a `/plans`
- **AND** o cabeçalho público mostra “Planos”

#### Scenario: Cabeçalho em teste

- **WHEN** a pessoa ativa o ambiente de teste
- **THEN** o cabeçalho de produto mostra “Ambiente de teste”
- **AND** o link continua levando a `/plans`

### Requirement: Acessibilidade e honestidade da simulação

O card de assinatura SHALL ser acionável por teclado, ter foco visível, nome acessível no botão de fechar e fechamento por Escape. As animações SHALL respeitar `prefers-reduced-motion`. A copy SHALL estar em pt-BR e SHALL deixar explícito que não há cobrança, contrato ou persistência real.

#### Scenario: Fechamento por teclado

- **WHEN** o card está visível e a pessoa pressiona Escape
- **THEN** o card é fechado
- **AND** o foco permanece no fluxo da página

#### Scenario: Movimento reduzido

- **WHEN** a pessoa prefere movimento reduzido
- **THEN** o card aparece sem animação de entrada

#### Scenario: Simulação explícita

- **WHEN** o card de assinatura é exibido
- **THEN** a descrição informa que a assinatura é simulada e sem cobrança
- **AND** a interface não afirma que houve pagamento, contrato ou persistência
