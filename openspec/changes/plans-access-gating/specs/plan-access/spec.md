# Spec Delta

## Purpose

Define o destino pós-autenticação, a assinatura simulada e o bloqueio de recursos por plano no ATUE.

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

Quando uma pessoa autenticada aciona o CTA de um plano diferente do ativo, a tela SHALL exibir um `AlertDialog` solicitando a assinatura do plano. O diálogo SHALL informar que a assinatura é simulada e não gera cobrança. O CTA de confirmação SHALL ativar o plano em memória e navegar para `/dashboard`. O diálogo SHALL poder ser fechado sem alterar o plano.

#### Scenario: Plano diferente selecionado

- **WHEN** a pessoa autenticada aciona “Escolher Cresce” ou “Escolher Escala”
- **THEN** o diálogo exibe a confirmação “Assinar o plano {plano}?”
- **AND** a descrição informa que não há cobrança real
- **AND** a pessoa pode confirmar ou escolher “Agora não”

#### Scenario: Assinatura confirmada

- **WHEN** a pessoa confirma a assinatura no diálogo
- **THEN** o plano escolhido fica ativo em memória
- **AND** o diálogo é fechado
- **AND** a rota `/dashboard` é exibida

#### Scenario: Plano atual selecionado

- **WHEN** o plano acionado já é o plano ativo
- **THEN** o diálogo de assinatura não é exibido
- **AND** a pessoa é encaminhada ao painel

### Requirement: Recursos de outros planos exibem pedido de assinatura

Recursos mapeados para planos superiores SHALL abrir o diálogo de assinatura quando o plano ativo não os inclui. O acesso SHALL considerar o ranking Início < Cresce < Escala. O diálogo SHALL identificar o recurso e o plano necessário. O recurso SHALL NOT simular sucesso enquanto o acesso não estiver liberado.

#### Scenario: Integrações no plano Início

- **WHEN** a pessoa tenta conectar uma integração estando no plano Início
- **THEN** a conexão simulada não é iniciada
- **AND** o diálogo informa que o recurso faz parte do plano Cresce

#### Scenario: Download de relatório no plano Início

- **WHEN** a pessoa tenta baixar um relatório gerado na Central de Downloads estando no plano Início
- **THEN** o download não é preparado
- **AND** o diálogo informa que o recurso faz parte do plano Cresce

#### Scenario: Recurso liberado

- **WHEN** a pessoa está no plano Cresce ou Escala e aciona integrações
- **THEN** a conexão simulada é executada normalmente
- **AND** o diálogo de assinatura não é exibido

### Requirement: Rota de produto sem plano pede assinatura

Acessar `/dashboard`, `/documents`, `/profile` ou `/settings` sem plano ativo SHALL exibir o diálogo de assinatura com caminho para `/plans`. A tela SHALL permanecer visível atrás do overlay e o diálogo SHALL poder ser fechado sem alterar a rota.

#### Scenario: Acesso direto sem plano

- **WHEN** uma pessoa sem plano ativo abre `/dashboard`
- **THEN** o diálogo “Assine um plano para entrar na área logada” é exibido
- **AND** o CTA leva a `/plans`
- **AND** a tela de painel permanece acessível após fechar o diálogo

### Requirement: Cabeçalhos refletem o plano ativo

O `ProductHeader` SHALL exibir um link para `/plans` com o plano ativo ou “Sem plano ativo”. `PublicHeader` e `AuthLayout` SHALL usar “Planos” enquanto não houver plano ativo e “Dashboard” depois da assinatura.

#### Scenario: Cabeçalho sem plano

- **WHEN** a pessoa está autenticada sem plano ativo
- **THEN** o cabeçalho de produto mostra “Sem plano ativo”
- **AND** o link leva a `/plans`
- **AND** o cabeçalho público mostra “Planos”

### Requirement: Acessibilidade e honestidade da simulação

O diálogo de assinatura SHALL ser acionável por teclado, prender o foco enquanto aberto, devolvê-lo ao fechar e permitir fechamento por Escape, “Agora não” ou clique fora. As animações SHALL respeitar `prefers-reduced-motion`. A copy SHALL estar em pt-BR e SHALL deixar explícito que não há cobrança, contrato ou persistência real.

#### Scenario: Fechamento por teclado

- **WHEN** o diálogo está visível e a pessoa pressiona Escape
- **THEN** o diálogo é fechado
- **AND** o foco retorna ao elemento que abriu o diálogo

#### Scenario: Movimento reduzido

- **WHEN** a pessoa prefere movimento reduzido
- **THEN** o diálogo aparece sem animação de entrada

#### Scenario: Simulação explícita

- **WHEN** o diálogo de assinatura é exibido
- **THEN** a descrição informa que a assinatura é simulada e sem cobrança
- **AND** a interface não afirma que houve pagamento, contrato ou persistência
