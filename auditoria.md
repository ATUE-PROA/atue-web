# Auditoria ATUE — Produto, UI/UX e Direção de Redesign

> **Nota de implementação (11/11/2026):** a paleta alternativa sugerida na Etapa 5 **não foi autorizada**. A identidade cromática permanece fixa em `#0A0A0A`, `#161616`, `#2563EB`, `#777777`, `#A0A0A0`, `#CACACA` e `#FFFFFF`. O redesign implementado preserva essa paleta e concentra as melhorias em hierarquia, tipografia, composição, acessibilidade e fluxos. Ver “Acompanhamento de implementação” ao final.

**Escopo real da análise:** naveguei pelas 10 rotas do SPA, em desktop (1440×900), mobile (390×844) e 320px, nos temas claro e escuro. Testei login, escolha de plano, gate de assinatura, dashboard, envio de diagnóstico, Central de Documentos, análise simulada, progresso, resultado, menu de download e bloqueio de download por plano. Também inspecionei o código dos fluxos que dependem de dados ou permissões.

**Contexto importante:** o working tree atual já contém uma iteração de redesign não commitada — fotos locais, escala base de 120%, tema claro e nova landing. Parte do feedback da professora já foi endereçada. O problema é que **a iteração introduziu um bug que esconde justamente a seção de benefícios** e ainda não resolve a percepção de produto genérico. A auditoria abaixo avalia o estado atual, não o commit antigo.

---

## ETAPA 1 — Diagnóstico executivo

| Dimensão                     |       Nota | Leitura                                                                                                                                                                                                   |
| ---------------------------- | ---------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI Design                    | **5,5/10** | Tipografia confortável e fotos ajudam, mas a identidade ainda é o shadcn/Tailwind padrão: azul `blue-600`, branco puro, cartões com borda e sombra.                                                       |
| UX                           | **4,5/10** | Os fluxos existem e os estados foram tratados, mas a hierarquia decisória está invertida, o produto é bloqueado antes de gerar valor e há ações duplicadas.                                               |
| Acessibilidade               | **7,0/10** | Base semântica boa: landmarks, labels, foco visível, contraste, `aria-*`, redução de movimento. Perde por overflow em 320px, navegação só por ícones, ausência de skip link e ausência de páginas legais. |
| Clareza da proposta de valor | **3,0/10** | A primeira dobra não responde “o que é, para quem e por que confiar”. A seção que deveria responder isso está invisível por 80 segundos.                                                                  |
| **Geral**                    | **5,0/10** | Produto com boa base técnica e potencial real, mas ainda percebido como protótipo acadêmico em vários momentos.                                                                                           |

### Os cinco maiores problemas

**1. A seção de benefícios e a foto de captura ficam invisíveis por 80 segundos — P0**
`FeatureStrip.tsx:26` e `DomainCapture.tsx:73` passam `delay={80}` para o GSAP. O GSAP interpreta `delay` em **segundos**, não milissegundos. Medi a opacidade dos quatro itens de “Benefícios” 2,5 s depois de entrar na seção: **0**. O bloco ocupa altura, mas está vazio. O link “Benefícios” do menu leva a uma seção em branco. A foto da seção “Avaliar” tem o mesmo problema: o lado direito fica vazio. Isso, sozinho, explica boa parte do “não entendi a proposta” e do “site frio”.

**2. A primeira dobra não diz o que o ATUE é, para quem é e o que resolve — P0**
O H1 é “É possível perder um contrato mesmo após conquistar o cliente.” É uma frase de consequência, não de produto. O subhead fala em “riscos e oportunidades” e “problemas de conformidade”, mas não menciona **LGPD**, **pequenas e médias empresas**, **evidências** ou **comprovação**. A única CTA é “Conheça o ATUE”, que rola para um formulário de domínio. O visitante precisa interpretar demais — exatamente o que a professora apontou.

**3. O produto esconde a informação que gera decisão — P0/P1**
No dashboard, o primeiro bloco é “Analisar um site”; o score e os achados ficam abaixo da dobra. O score aparece como “72/100 — Atenção” sem explicar como foi calculado, qual URL foi analisada ou o que fazer com aquilo. Na análise de documento, o score 84 recebe o rótulo verde **“Conforme”** enquanto existem achados de severidade média e baixa. Além disso, cada achado não tem dono, prazo, status ou ação de resolução. O usuário entende o problema, mas não sabe o próximo passo.

**4. Falta infraestrutura de confiança para um produto de LGPD — P0/P1**
O rodapé público e o da área logada não têm Política de Privacidade, Termos de Uso, canal do DPO ou contato. O cadastro não tem consentimento. O site não tem escolha de cookies. O botão “Falar com o suporte” leva para `/form`, um formulário de envio de documentos. O CTA “Avaliar meu site agora” leva para `/register`, não para uma avaliação. Para uma plataforma que vende conformidade, isso é grave: a própria ATUE não demonstra o que pede ao cliente.

**5. O sistema visual é o padrão de mercado, não uma marca — P1**
`--primary` é `oklch(0.546 0.245 262.881)`, exatamente o `blue-600` do Tailwind. O fundo é branco puro, o texto é quase preto, todos os cartões são brancos com borda azulada e `shadow-sm`. O corpo é Geist, sem contraste tipográfico. O resultado é competente, mas parece um template shadcn. A identidade não tem cor própria, textura, gesto ou voz. As fotos ajudam, mas são stock genérico e não explicam o produto. Em 320px, o header do produto quebra: a marca colapsa para **0px** e a navegação estoura para **333px** em uma tela de 320px.

### Riscos para a percepção do produto

- **Risco de demo:** o avaliador abre a landing, rola até “Benefícios” e encontra um vazio. A demo perde força no primeiro scroll.
- **Risco de credibilidade:** “Conforme”, “Seja aprovado” e “certificados de conformidade” soam como promessa de conformidade legal, contradizendo os avisos de demonstração.
- **Risco de paywall:** login → planos → gate antes de qualquer valor. O avaliador pode concluir que o produto é uma tela de planos com um dashboard atrás.
- **Risco de mobile:** 320px quebra o header; títulos de 43px em uma coluna de 272px geram uma palavra por linha.
- **Risco de comoditização:** com azul padrão, cartões e fotos de banco de imagens, o ATUE pode ser confundido com qualquer SaaS de compliance.

---

## ETAPA 2 — Inventário do site

| Rota               | Finalidade                       | O que foi explorado                                                                           | Observações                                                           |
| ------------------ | -------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `/`                | Landing pública                  | Desktop claro/escuro, 390, 320, âncoras `#beneficios`, `#como-funciona`, `#sobre`, `#avaliar` | Hero, benefícios, como funciona, sobre, captura de domínio, footer.   |
| `/login`           | Autenticação                     | Layout, estados de campo, links                                                               | Sem recuperação de senha; sem acesso de demonstração.                 |
| `/register`        | Cadastro                         | Layout desktop/mobile, domínio vindo da landing                                               | Sem consentimento; sem feedback de força de senha.                    |
| `/plans` e `/plan` | Planos e assinatura simulada     | Layout, comparação, cards, seleção, modal de assinatura                                       | Três CTAs com o mesmo peso visual no tema claro.                      |
| `/form`            | Envio de dados e documentos      | Layout, campos, input de arquivo                                                              | Formulário longo, layout desequilibrado, input nativo em inglês.      |
| `/dashboard`       | Diagnóstico e visão geral        | Com plano, sem plano, request de diagnóstico, mobile, 320, dark                               | Score e achados abaixo do formulário; gate inconsistente.             |
| `/documents`       | Análise de documento e downloads | Documento de exemplo, análise, progresso, resultado, menu de download, gate de relatório      | Três trabalhos em uma página; lock de plano invisível.                |
| `/profile`         | Perfil da conta                  | Layout, cards, ações                                                                          | Dois botões de salvar para o mesmo formulário.                        |
| `/settings`        | Preferências                     | Layout, switches, integrações, zona de risco                                                  | Salvar no fim da página; domínio read-only com aparência de editável. |
| `*`                | 404                              | Layout e atalhos                                                                              | Funcional; chips redundantes.                                         |
| Modal de plano     | Gate de acesso e assinatura      | Abrir, assinar, “Agora não”, dismiss                                                          | “Agora não” deixa o usuário dentro da área logada sem plano.          |

**Fluxos testados de ponta a ponta:** login → planos → assinatura simulada → dashboard; dashboard → gerar diagnóstico; documentos → selecionar exemplo → analisar → resultado → abrir menu de download → bloquear relatório no plano Início.
**Fluxos apenas inspecionados no código:** cadastro completo, envio de `/form`, upload real de arquivo, salvamento de perfil, troca de foto, integrações, exclusão de conta, estados de erro dos mocks.

### Limitações de acesso e de ambiente

- Autenticação e plano vivem **apenas em memória**: recarregar a página derruba a sessão e reabre o gate. Testar navegação por URL direta sempre mostra “Sem plano ativo”.
- Os mocks **nunca falham naturalmente**; os caminhos de erro existem no código, mas não são exercitáveis sem gatilho de teste. Não foi possível validar a UX real de erro de rede.
- Nenhum arquivo é lido, enviado ou processado por IA real. A análise é determinística e baseada em metadados e catálogo.
- Não houve teste com leitor de tela real, dispositivo físico, Safari ou Firefox.
- As fotos e a escala de 120% estão no working tree, **não commitadas**. Um build a partir da `main` não terá nem as fotos nem a tipografia atual.
- Não executei lint/build/testes porque não houve alteração de código nesta etapa.

---

## ETAPA 3 — Auditoria detalhada

### 3.1 Problemas visuais

**Paleta e identidade**

- O azul primário é o `blue-600` padrão do Tailwind. Não há cor de marca proprietária; o logo é monocromático e a interface não dialoga com ele.
- A combinação branco puro + quase preto + azul cria exatamente a percepção “azul, preto e branco” apontada pela professora.
- O tema escuro é quase preto (`#0a0a0a` de fundo, `#171717` de card). É um dark de ferramenta de desenvolvedor, não de produto de conformidade para PMEs. Como o padrão segue `prefers-color-scheme`, quem usa o sistema escuro vê essa versão na primeira visita.
- As fotos trazem cor e humanidade, mas são stock genérico: pessoas jovens sorrindo em reuniões, sem relação visível com LGPD, evidências ou auditoria. A foto do hero não explica o produto.
- Há excesso de bordas finas azuladas e sombras discretas. Quase tudo é um cartão branco sobre fundo branco; a hierarquia depende de contornos, não de superfícies.

**Tipografia**

- A escala base de 120% (19,2px) resolveu a queixa de “fontes pequenas” no desktop. O corpo é confortável e os títulos têm presença.
- Em 320px, porém, o H1 de 43,2px em uma coluna de 272px quebra em uma palavra por linha (“É possível / perder um / contrato / mesmo / após / conquistar o / cliente.”). O mobile ficou **grande demais**, não pequeno demais.
- O texto auxiliar de 14,4px (`text-xs`) é usado em metadados, ajuda de campos e descrições de status. Em alguns casos é informação essencial, não decoração.
- O eyebrow em caixa alta com `tracking-[0.2em]` aparece em quase todas as seções. Vira ruído e não hierarquia.
- A fonte Geist é neutra e boa para UI, mas não dá personalidade editorial. O produto não tem contraste entre uma fonte de display e a fonte de interface.

**Layout e composição**

- A landing tem ritmo editorial melhor que a área logada: grids alternados, fotos, seções amplas. O problema é que duas seções estão quebradas.
- O dashboard é uma pilha de cartões: formulário, atalhos, score, achados. A primeira dobra é dominada por um formulário, não pelo resultado.
- O formulário de `/form` tem uma coluna esquerda com título e três bullets e **cerca de 600px de vazio** ao lado de um card de 10 campos. O desequilíbrio parece descuido.
- As páginas de produto têm quatro camadas de navegação: header, chips de atalho, link “Voltar” e footer. Isso compete com o conteúdo.
- A comparação de planos no mobile vira um cartão por **recurso**, não por plano, o que dificulta comparar.

**Componentes**

- Botões: `brand` e `inverse` convivem com raios diferentes (`rounded-lg` vs `rounded-full`). No tema claro, os três planos têm CTAs azuis idênticos; o “Recomendado” é apenas um badge.
- Inputs: bons no foco e no erro; altura e contraste adequados. O input nativo de arquivo em `/form` mostra “Choose Files / No file chosen” no ambiente testado e não segue o design system.
- Cards: `Card` usa `ring-1` + `shadow-sm`; quase todo conteúdo vira card, inclusive blocos estáticos que poderiam ser separados por espaço e divisores.
- Tabelas: a comparação de planos é legível no desktop, com bom uso de `TableCaption`; no mobile perde a comparação.
- Navegação: o header público não indica a página atual; o header do produto fica só com ícones abaixo de 768px; em 320px a marca desaparece.
- Modais: o gate e o modal de assinatura são claros, acessíveis e bem focados. O problema é de **momento**, não de componente.
- Badges de status: usam cor + ícone + texto, o que é correto. O problema é o rótulo “Conforme” para um resultado com pendências.
- Score: o gauge é bonito e legível, mas é um número sem contexto. Falta “como calculamos”, “última análise” e “o que este score não significa”.

**Movimento**

- As animações de entrada são discretas e respeitam `prefers-reduced-motion`.
- O padrão de esconder conteúdo com `opacity: 0` e depender do ScrollTrigger é frágil. O bug dos 80 segundos é a prova. Conteúdo essencial não deve começar invisível.

### 3.2 Problemas de UX

Respondendo às dez perguntas do briefing:

1. **Entende imediatamente o que é o produto?** Parcialmente. Entende “conformidade” e “risco”, mas não “LGPD para PMEs”, “evidências” ou “comprovação”.
2. **Entende o que precisa fazer?** Não na landing. A CTA “Conheça o ATUE” não descreve a ação; o formulário de domínio promete uma avaliação e entrega um cadastro.
3. **Sabe por onde começar?** O caminho é login → planos → gate → dashboard. É um começo burocrático, não um onboarding.
4. **Compreende os resultados?** Vê score e achados, mas não sabe a metodologia, a URL analisada ou o que o score significa.
5. **Identifica problemas e como resolvê-los?** Identifica; não consegue agir. Cada achado tem explicação e recomendação, mas não status, responsável ou ação.
6. **Sabe o que cada indicador representa?** Não. “Score de Conformidade” não tem definição, faixa ou fonte.
7. **Distingue verificado de pendente?** Os badges “Fictício” e os avisos de demonstração ajudam, mas “Conforme” com achados médios confunde.
8. **Entende os próximos passos?** Fraco. O dashboard tem dois CTAs no topo e nenhum ligado ao achado prioritário.
9. **Transmite segurança em informações jurídicas/técnicas?** A copy é sóbria, mas a ausência de políticas legais e os rótulos absolutos reduzem a confiança.
10. **Há etapa de confusão/frustração?** Sim: o gate antes do valor, os dois “Salvar” no perfil, as três tarefas na Central de Documentos e o formulário de 10 campos.

**Carga cognitiva**

- `/form` pede CNPJ, URL, empresa, e-mail, DPO, e-mail do DPO, finalidades, documentos e observações em uma única tela, sem etapas, sem explicar por que cada dado é necessário.
- `/documents` mistura anexar, escolher exemplo, analisar, ler resultado, baixar relatório e baixar modelo. São três jornadas em uma página.
- O dashboard exige que o usuário decida entre “Enviar documentos” e “Central de Documentos” no topo, sem explicar a diferença.

**Feedback e prevenção de erros**

- Loading, sucesso e erro estão implementados com texto e `aria-busy`; isso é um ponto forte.
- O documento de exemplo já vem selecionado por padrão, então “Analisar com IA” nasce habilitado. O usuário pode gerar um resultado sem escolher nada e sem entender que aquilo é fictício.
- O bloqueio de plano só aparece **depois** do clique em “Baixar”. Não há cadeado, badge ou aviso prévio.
- O gate pode ser fechado com “Agora não” e o usuário continua no dashboard sem plano, usando o formulário de diagnóstico. A copy “Assine um plano para entrar na área logada” fica falsa.

**Onboarding e descoberta**

- Não há onboarding. O primeiro contato com o produto é uma tela de planos.
- Funcionalidades importantes estão enterradas: o resultado da análise, os downloads e o significado do score.
- O suporte não é um canal: é um link para o formulário de documentos.

### 3.3 Problemas de acessibilidade

**O que está bom**

- Landmarks semânticos, um `h1` por página, labels visíveis, `aria-describedby`, erros com `role="alert"`, foco visível, `aria-label` em ícones, `aria-pressed` em seleção, `aria-busy` em formulários.
- Contraste: `muted-foreground` sobre fundo claro ≈ 5,7:1; branco sobre azul ≈ 5,2:1; textos de status com ícone e rótulo.
- `prefers-reduced-motion` é respeitado nas animações e no scroll da análise.
- Tabelas têm `TableCaption` em `sr-only`; o gauge tem resumo textual.

**O que falta**

- **Skip link** ausente. Em uma página longa com header sticky, o usuário de teclado tabula por toda a navegação antes do conteúdo.
- **320px:** header do produto com overflow horizontal (333px) e marca com largura 0. Isso é falha de responsividade e de identificação da marca.
- **Navegação só por ícones** abaixo de 768px. Os `aria-label` existem, mas usuários de baixa visão ou pouco familiarizados com os ícones não têm rótulo visível.
- **Input de arquivo nativo** em inglês no ambiente testado, sem associação visual ao design system.
- **Sem páginas legais** acessíveis: o usuário não consegue revisar privacidade/termos antes de criar conta.
- **Sem consentimento** no cadastro, o que é incoerente com o discurso de privacidade.
- **“Conforme”** é um rótulo absoluto que pode ser lido como atestado legal, além de não ser uma descrição de estado acessível o suficiente para quem não vê a cor.

### 3.4 Problemas de comunicação

| Onde          | Texto atual                                                      | Problema                                                            | Direção                                              |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| Landing       | “É possível perder um contrato mesmo após conquistar o cliente.” | Medo sem contexto de produto.                                       | Usar como subhead; H1 com promessa clara.            |
| Landing       | “Conheça o ATUE”                                                 | CTA vaga; não diz o que acontece.                                   | “Fazer diagnóstico gratuito” ou “Ver como funciona”. |
| Como funciona | “Seja aprovado”                                                  | Promete aprovação, algo que o ATUE não controla.                    | “Comprove o que já está organizado”.                 |
| Domínio       | “Avaliar meu site agora” → `/register`                           | Promessa de avaliação imediata; entrega cadastro.                   | “Começar diagnóstico” + expectativa de conta.        |
| Planos        | “Nenhum valor, recurso ou condição comercial é real.” repetido   | Defensivo; quebra a ilusão de produto.                              | Um único banner de demonstração no topo.             |
| Planos        | “Falar com o suporte” → `/form`                                  | Canal errado.                                                       | Canal real de contato ou formulário de suporte.      |
| Dashboard     | “Score de Conformidade”                                          | Anglicismo e jargão; não explica.                                   | “Índice de conformidade” + “Como calculamos”.        |
| Dashboard     | “Bem-vindo(a)!”                                                  | Genérico; não usa empresa nem contexto.                             | “Olá, [nome]. Última análise em [data].”             |
| Documentos    | “Analisar com IA” + “A IA é uma simulação local”                 | A CTA promete IA; o aviso desmente.                                 | “Simular análise” ou “Analisar documento (demo)”.    |
| Análise       | “Conforme” com achados médios                                    | Contradição semântica e risco legal.                                | “Bom, com pendências” / “Atenção” / “Crítico”.       |
| Perfil        | “Salvar dados” e “Salvar perfil”                                 | Dois botões, mesmo formulário; parece que salvam coisas diferentes. | Um único “Salvar alterações”.                        |
| Perfil        | “Certificados de conformidade”                                   | Sugere certificação que não existe.                                 | “Relatórios e comprovantes”.                         |
| Configurações | “Gerais da conta”                                                | Português pouco natural.                                            | “Preferências da conta”.                             |
| Gate          | “O recurso ‘Área logada’ faz parte do plano Início”              | “Área logada” não é recurso.                                        | “O painel faz parte do plano Início”.                |

### 3.5 Inconsistências entre páginas

- **Eyebrow:** em Documentos/Planos/Cadastro fica acima do H1; em Perfil/Configurações fica abaixo. Isso muda a leitura da hierarquia.
- **Navegação:** páginas públicas têm 2 camadas; páginas de produto têm header + chips + voltar + footer. O usuário tem quatro caminhos para o mesmo destino.
- **CTAs:** botões de formulário usam `rounded-lg`; CTAs de marketing usam pílula; planos usam pílula em todos os cards. Não há uma regra clara.
- **Planos no claro vs escuro:** `inverse` resolve para o azul primário no claro e para o branco no escuro; os três planos parecem iguais no claro e desiguais no escuro.
- **Arquivos:** a Central de Documentos usa um input escondido e um botão customizado; `/form` usa o input nativo. Duas linguagens visuais para a mesma ação.
- **Nomes:** “Painel de Controle” no H1, “Painel” no header, “Painel de controle” no footer. “Central de Documentos” no H1, “Documentos” no header.
- **Rodapés:** o público tem navegação e copyright; o da área logada tem “Nenhum dado é persistido” e links de produto. Nenhum dos dois tem legal/DPO/contato.
- **Planos:** “Início” tem nota “para quem está começando”; “Cresce” é recomendado; “Escala” é “para operações”. Mas os três CTAs têm o mesmo peso e a mesma cor.

---

## ETAPA 4 — Benchmarking

| Referência         | O que resolve bem                                                                   | O que adaptar ao ATUE (sem copiar)                                                                       |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Stripe**         | Promessa explícita, artefato de produto na primeira dobra, documentação como prova. | Hero com um card real de diagnóstico (score, URL, 3 pendências) em vez de foto genérica. CTA específico. |
| **Vanta / Drata**  | Conformidade como sistema de evidências, trust center, frameworks e status.         | “O que avaliamos”, status de evidência, relatório compartilhável. Sem badges ou certificações falsas.    |
| **Linear**         | Hierarquia calma, densidade controlada, uma ação primária.                          | Dashboard com uma ação principal e navegação enxuta. Não copiar o dark-first de ferramenta dev.          |
| **Notion / Deel**  | Tom humano, onboarding, estados vazios que orientam.                                | Microcopy próxima, empty states com uma ação, fotos com função narrativa.                                |
| **Ramp / Mercury** | Neutros quentes, tipografia confiante, números bem apresentados.                    | Paleta de papel + tinta + um acento; tipografia de display; score com contexto.                          |
| **Apple**          | Uma mensagem por tela; produto como herói.                                          | Remover seções e ruído; cada viewport com uma ideia.                                                     |

**Padrões que fazem sentido para o ATUE**

- Produto na primeira dobra, não foto de banco de imagens.
- Uma promessa, uma CTA primária, uma secundária.
- Prova de método no lugar de prova social inventada.
- Dados com contexto: URL, data, fonte, faixa, limitação.
- Navegação com uma camada clara; sem breadcrumbs falsos.
- Tom humano sem infantilizar: “você não precisa fazer tudo agora”.

**O que não recomendo copiar**

- Dark mode como identidade padrão de produto de compliance.
- Jargão enterprise (“framework”, “control mapping”, “audit-ready”) sem tradução.
- Grades infinitas de features e cards de planos idênticos.
- Logos de clientes ou selos de certificação sem lastro.

---

## ETAPA 5 — Nova direção visual

### A. Direção criativa

**Conceito:** _Clareza que protege._
Uma plataforma editorial, calma e precisa — o oposto de “segurança baseada em medo”. O ATUE deve parecer o colega experiente que organiza o caos, não o software que audita a empresa.

**Personalidade:** calmo, competente, próximo, transparente, sem alarmismo.
**Sensação:** alívio e controle; “eu sei o que falta e sei como provar o que já tenho”.
**Direção estética:** papel quente, tinta escura, verde-petróleo, terracota, tipografia serifada nos títulos e Geist na interface; fotografia natural e específica; menos cartões, mais estrutura; dados em superfícies brancas.

**Referências visuais:** Mercury e Stripe pela clareza; Notion e Deel pela proximidade; Vanta e Drata pela lógica de evidências; Apple pela economia de mensagem.

**Preservar**

- O logo monocromático e o símbolo.
- Os três pilares: avaliar, organizar, comprovar.
- A honestidade sobre simulação e ausência de garantia legal.
- A fotografia de pessoas reais (editar, não substituir por robôs/ilustrações de IA).
- A base de componentes, tokens, foco visível e acessibilidade.
- Geist como fonte de interface.

**Reformular**

- O azul `blue-600` como cor de marca.
- O branco puro/preto puro como base.
- O dark mode como padrão.
- O excesso de cartões com borda + sombra.
- O eyebrow em caixa alta em todas as seções.
- As CTAs em pílula em formulários.
- As fotos genéricas sem função narrativa.
- A duplicação de navegação e de ações.

### B. Design System proposto

#### Paleta

| Token         | HEX       | Uso                                   | Justificativa                                                                                               |
| ------------- | --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `paper`       | `#F7F3EA` | Fundo da página                       | Papel quente; reduz o brilho do branco puro e aproxima a marca de algo editorial/humano.                    |
| `surface`     | `#FFFDF8` | Cards e superfícies de dados          | Branco levemente quente; mantém legibilidade e separa do fundo sem excesso de sombra.                       |
| `ink`         | `#1D211E` | Texto principal                       | Quase preto com subtom verde; menos duro que `#0A0A0A`. Contraste 14,7:1 no paper.                          |
| `muted`       | `#5D6159` | Texto secundário                      | Cinza esverdeado; 5,7:1 no paper, atende AA para texto normal.                                              |
| `line`        | `#E3DDD1` | Bordas e divisores                    | Neutro quente; substitui o azul-acinzentado atual.                                                          |
| `brand`       | `#14524C` | Ações primárias, links, foco          | Verde-petróleo: confiança e segurança sem o azul padrão de SaaS. Branco sobre ele = 9:1.                    |
| `brand-hover` | `#0F3E39` | Hover/pressed                         | Mantém a profundidade sem mudar de família.                                                                 |
| `brand-soft`  | `#E3EFEA` | Fundos de seleção, chips, destaque    | Permite estados selecionados sem preencher o card inteiro.                                                  |
| `accent`      | `#B85C3E` | Detalhes, eyebrows, destaques grandes | Terracota: calor humano e contraste com o petróleo. 4,1:1 no paper — usar só em textos grandes/decorativos. |
| `accent-text` | `#96422A` | Texto pequeno de acento               | Versão mais escura para AA (6,1:1).                                                                         |
| `accent-soft` | `#F6E5DC` | Chips e superfícies de acento         | Acolhe sem competir com estados.                                                                            |
| `success`     | `#15734A` | Conforme/positivo                     | Verde distinto do brand; 5,3:1 no paper.                                                                    |
| `warning`     | `#A85A0A` | Atenção                               | Âmbar escuro; 4,6:1 no paper. Sempre com ícone + texto.                                                     |
| `danger`      | `#B3261E` | Erro/crítico                          | Vermelho sóbrio; 5,9:1 no paper.                                                                            |
| `info`        | `#1B5E7E` | Informação                            | Azul-petróleo para informação, não para marca. 6,4:1.                                                       |

**Modo escuro (opcional, nunca padrão):** `#161815` de fundo, `#1F221E` de superfície, `#F3EFE5` de texto, `#7BC0B4` de brand. Um dark quente, não preto. Recomendo **claro como padrão** e escuro como escolha explícita.

#### Tipografia

- **Display:** Fraunces Variable (ou Source Serif 4) para H1/H2, pesos 500/600, `optical sizing`. Se não houver aprovação para nova dependência, usar `Georgia` como fallback e manter Geist no resto.
- **Interface e corpo:** Geist Variable (já instalado).
- **Escala:**
  - H1: `clamp(2rem, 5vw, 3.75rem)` — 32px a 72px na base de 120%.
  - H2: `clamp(1.75rem, 3vw, 2.5rem)` — 33,6px a 48px.
  - H3: `1.5rem` (28,8px).
  - Corpo: `1rem` (19,2px), `line-height: 1.6`.
  - Apoio: `0.9375rem` (18px).
  - Label: `0.875rem` (16,8px).
  - Metadado: `0.8125rem` (15,6px) no mínimo.
  - Eyebrow: `0.75rem` (14,4px), caixa alta, `tracking` 0,12em, no máximo uma vez por seção.
- **Regras:** máximo 3 níveis de título por seção; `font-semibold`, não `bold`; `tracking-tight` só em títulos grandes; números tabulares no score.

#### Espaçamento, grid e raios

- Escala de 4/8px; seções `py-20`/`py-24`; cards `p-6`/`p-8`.
- Container `max-w-6xl`; hero em grid 7/5; produto em 8/4; leitura em `max-w-2xl`.
- `--radius: 0.75rem`; botões 10px; cards 14px; fotos 18px; chips em pílula. **Não misturar pílula e retângulo no mesmo nível de ação.**
- Sombra: apenas para elementos flutuantes (dropdown, dialog). Cards estáticos usam `surface` + `line`; não usar borda + ring + sombra ao mesmo tempo.

#### Componentes

- **Botões:** primário `brand` sólido; secundário `outline` com `line`; terciário `ghost`. Uma única ação primária por viewport. Altura 48px no mobile, 44px no desktop. Sem pílula em submits.
- **Inputs:** 48px; label visível; ajuda em 15,6px; erro com ícone + texto; foco 2px `brand` + offset 2px. Input de arquivo customizado em pt-BR.
- **Cards:** usar para conteúdo interativo/agrupado. Conteúdo estático usa divisores e espaço. Um nível de aninhamento, no máximo.
- **Tabelas:** 16,8px; cabeçalho fixo em listas longas; no mobile, comparação por **plano**, não por recurso.
- **Navegação:** header público com estado ativo; header de produto com rótulos a partir de 640px e menu rotulado abaixo disso; uma única camada de atalhos; remover chips de breadcrumb.
- **Status:** ícone + rótulo + cor; “Adequado”, “Atenção”, “Crítico”; nunca “Conforme” sozinho. Tooltip/popover “Como calculamos”.
- **Estados vazios:** explicar o que é, por que está vazio e qual é a única próxima ação.
- **Movimento:** conteúdo visível por padrão; animar só transform/opacity de elementos não essenciais; 150–250ms para UI, 600ms para entrada; respeitar `prefers-reduced-motion`.

### C. Redesign por página

| Página            | Problema atual                                                                                                           | Por que é problema                                                                             | Solução recomendada                                                                                                                                       | Como deveria ficar                                                                                            | Componentes                                                                                                                                                          | Prioridade |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Landing**       | Headline retórica, sem categoria/para quem; benefícios e foto invisíveis; CTA rola; sem prova; rodapé sem legal.         | O visitante não responde “o que é / para quem / e daí?” e vê seções vazias.                    | Hero com promessa explícita + artefato de produto; CTA de diagnóstico; três pilares; como funciona com artefatos; FAQ; CTA final; rodapé legal.           | Papel quente, H1 serifado, card branco com score e 3 pendências, foto humana abaixo, um único botão petróleo. | `LandingHero`, novo `ProductPreview`, `TrustStrip`, `FeatureStrip` (corrigir delay), `HowItWorks`, `BuildSection`, `DomainCapture` (corrigir delay), `PublicFooter`. | **P0**     |
| **Login**         | Card isolado, sem recuperação, sem demo, sem contexto.                                                                   | Parece protótipo e não ajuda quem esqueceu a senha.                                            | Coluna de prova/benefício + formulário; “Esqueci minha senha” simulado; “Entrar na demonstração”; links legais.                                           | Split 5/5 com foto sóbria ou card de produto; um CTA primário.                                                | `AuthLayout`, `LoginForm`, novo `DemoAccess`.                                                                                                                        | **P1**     |
| **Cadastro**      | Sem consentimento, domínio sem explicação, sem feedback de senha, foto só desktop.                                       | Produto de privacidade não pede consentimento; usuário não entende por que informar o domínio. | 2 passos (conta → empresa/domínio), consentimento com links, checklist de senha, chip de domínio, próximo passo “diagnóstico”.                            | Split mantido, card mais curto, foto específica de trabalho real.                                             | `CadastroForm`, `AuthBrandPanel`, novo `PasswordChecklist`/`Consent`.                                                                                                | **P1**     |
| **Planos**        | Três CTAs iguais, disclaimers repetidos, comparação mobile por recurso, suporte errado.                                  | Não há hierarquia de escolha; a página parece um template de pricing.                          | Recomendado em destaque; outros outline; um banner de demo; features agrupadas; “Falar com especialista” real; “Explorar demonstração”; mobile por plano. | Um card elevado, dois discretos, preço com âncora, uma única nota de demonstração.                            | `PlanCard`, `PlanComparison`, `PlanBenefits`, `SupportCard`, `SubscriptionPrompt`.                                                                                   | **P1**     |
| **`/form`**       | 10 campos, sem etapas, coluna esquerda vazia, input nativo em inglês, layout público.                                    | Carga cognitiva alta e aparência de formulário inacabado.                                      | Wizard de 3 etapas (Empresa → Contato/DPO → Documentos), dropzone customizado, resumo, CTA contextual; `ProductHeader` se logado.                         | Uma coluna central ou 2 colunas equilibradas, stepper visível, menos texto.                                   | `DocumentForm`, `FormBrandPanel`, novo `Stepper`/`FileDropzone`/`ReviewStep`.                                                                                        | **P1**     |
| **Dashboard**     | Formulário primeiro, score/achados abaixo; sem URL/metodologia; “Conforme” com pendências; sem ação.                     | O usuário não vê o valor nem sabe o que fazer.                                                 | Visão geral com empresa/URL/data; score explicado; “Próximo passo”; achados acionáveis; “Novo diagnóstico” em dialog; remover atalhos.                    | Topo com score + resumo, uma lista priorizada, um CTA primário, cartões só para grupos interativos.           | `ScoreGauge`, `FindingsList`, `DiagnosticRequestForm` (dialog), novo `MethodologyPopover`/`NextActionCard`.                                                          | **P0/P1**  |
| **Documentos**    | Três trabalhos em uma página; exemplo pré-selecionado; “IA” + disclaimer; locks invisíveis; resultado duplica dashboard. | Longo, repetitivo e com promessa ambígua.                                                      | Tabs “Analisar” / “Relatórios” / “Modelos”; nenhum default; lock badges; um banner de demo; resultado com próximo passo.                                  | Página curta, uma tarefa por aba, downloads separados.                                                        | `DocumentIntakeCard`, `DocumentsList`, `AnalysisProgress`, `DocumentAnalysisResult`, `DownloadCenter`.                                                               | **P1**     |
| **Perfil**        | Dois saves, eyebrow abaixo, quatro navegações, foto sem função.                                                          | Usuário não sabe qual botão salva o quê; navegação compete com o formulário.                   | Um save sticky; eyebrow acima do H1; remover chips; explicar DPO/foto.                                                                                    | Duas colunas, uma barra de ação, menos cards.                                                                 | `Profile`, seções, remover `CrossLinks`, `Button`.                                                                                                                   | **P2**     |
| **Configurações** | Longa, save no fim, domínio read-only com cara de editável, locks invisíveis, danger zone.                               | O usuário pode perder alterações e não entende o que está bloqueado.                           | Tabs (Conta, Notificações, Segurança, Integrações), save sticky, domínio como valor read-only, lock badges, danger zone em subpágina.                     | Quatro seções com navegação lateral e uma ação primária.                                                      | `Settings`, seções, `Tabs`.                                                                                                                                          | **P2**     |
| **404**           | Chips redundantes.                                                                                                       | Nada grave.                                                                                    | Manter; remover chips e oferecer suporte.                                                                                                                 | Simples, com uma CTA.                                                                                         | `NotFoundPage`.                                                                                                                                                      | **P3**     |
| **Gate de plano** | Antes do valor; copy falsa; “Agora não” deixa dentro; sem demo.                                                          | O avaliador pode desistir antes de ver o produto.                                              | “Explorar demonstração” em login/planos; gate apenas para saídas pagas; copy consistente; redirecionar ou fechar com clareza.                             | Um modal honesto, com caminho de demo em destaque.                                                            | `SubscriptionPrompt`, `AppRoot`, `PlanProvider`.                                                                                                                     | **P0/P1**  |

### D. Humanização

1. **Hero com produto real, não stock.** Um card de diagnóstico com score, URL e três pendências reais (demo) ao lado de uma foto de uma equipe pequena. A foto conecta pessoa e contexto; o card explica o produto.
2. **Copy de acompanhamento.** “Você não precisa resolver tudo hoje. Comece pela política de privacidade.” A função é reduzir paralisia, não decorar.
3. **Estados vazios que ensinam.** “Nenhum diagnóstico ainda. Informe seu site para ver os três primeiros pontos de atenção.” Uma ação, um exemplo.
4. **Progresso visível.** “3 de 8 evidências organizadas” + próximo passo. A função é dar sensação de avanço.
5. **Fotografia com função.** Landing, cadastro e suporte; não no meio de tabelas e scores. Pessoas trabalhando em contextos reais, luz natural, sem pose publicitária.
6. **Uma assinatura humana.** “Fale com uma pessoa” no suporte e nos planos, com canal real. Proximidade sem prometer o que não existe.
7. **Linguagem.** “Índice de conformidade”, “pontos de atenção”, “evidências”, “o que já está organizado”. Evitar “score”, “achados”, “framework”, “audit-ready” sem tradução.
8. **Paleta e tipografia.** Papel quente, petróleo, terracota e uma serifa de display. A função é tirar o produto do azul/preto/branco de template.

---

## ETAPA 6 — Plano de ação

### Fase 0 — Antes de qualquer redesign (P0, 1–2 dias)

| #    | Ação                                                                                                                                          | Impacto                                                                    | Esforço                           | Dependência          |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------- | -------------------- |
| F0.1 | Corrigir `delay={80}` para `0.08` em `FeatureStrip` e `DomainCapture`; revisar a API de `Reveal` para deixar claro que o valor é em segundos. | Elimina seções vazias na landing e no link “Benefícios”.                   | **S** (15 min)                    | Nenhuma              |
| F0.2 | Tornar o tema claro o padrão; dark como escolha explícita. Aquecer o dark (não usar `#0A0A0A`).                                               | Muda a primeira impressão de “ferramenta dev” para “produto de confiança”. | **S** (0,5 dia)                   | Decisão de marca     |
| F0.3 | Corrigir o header do produto em 320px: marca `shrink-0`, menu rotulado, sem overflow.                                                         | Elimina quebra de layout no celular.                                       | **S** (0,5 dia)                   | Nenhuma              |
| F0.4 | Revisar a copy da landing: H1 com promessa, subhead com LGPD/PMEs, CTA específico; mover a frase atual para subhead.                          | Responde “o que é, para quem, por quê” na primeira dobra.                  | **M** (1–2 dias)                  | Copy/posicionamento  |
| F0.5 | Adicionar rodapé legal real (Política de Privacidade, Termos, DPO, contato) e corrigir “Falar com o suporte”.                                 | Confiança institucional; coerência com o discurso de LGPD.                 | **M** (1 dia + conteúdo jurídico) | Políticas reais      |
| F0.6 | Criar caminho de demonstração: “Explorar demonstração” em login/planos; gate consistente.                                                     | O avaliador vê o produto antes de decidir.                                 | **S** (0,5 dia)                   | Decisão de produto   |
| F0.7 | Reescrever status do score: “Adequado / Atenção / Crítico”, com “Como calculamos” e URL/data no resultado.                                    | Remove contradição “Conforme” com pendências; aumenta confiança.           | **M** (1–2 dias)                  | Metodologia do score |

### Fase 1 — Semana 1 (P1)

| #     | Ação                                                                                             | Impacto                                               | Esforço          | Dependência      |
| ----- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ---------------- | ---------------- |
| F1.1  | Reordenar o dashboard: visão geral + score + próximo passo antes do formulário.                  | O valor aparece na primeira dobra.                    | **M** (1 dia)    | F0.7             |
| F1.2  | Transformar achados em lista acionável (status, responsável, ação).                              | O usuário passa de “entendi” para “consigo resolver”. | **M** (2 dias)   | Regra de negócio |
| F1.3  | Separar Documentos em abas Analisar / Relatórios / Modelos; remover seleção padrão; lock badges. | Reduz carga cognitiva e promessa ambígua.             | **L** (1–2 dias) | Nenhuma          |
| F1.4  | Wizard de 3 etapas em `/form` + dropzone pt-BR.                                                  | Reduz abandono e aparência de formulário inacabado.   | **L** (2 dias)   | Nenhuma          |
| F1.5  | Um único “Salvar” no perfil, sticky; remover chips de navegação.                                 | Elimina ambiguidade de ação.                          | **S** (2–4h)     | Nenhuma          |
| F1.6  | Hierarquia de planos: recomendado em destaque, outros outline, uma única nota de demo.           | Ajuda a escolher; reduz cara de template.             | **M** (1 dia)    | Nenhuma          |
| F1.7  | “Esqueci minha senha” e acesso de demonstração no login.                                         | Fecha lacuna básica de conta.                         | **S** (4h)       | Nenhuma          |
| F1.8  | Consentimento no cadastro + checklist de senha.                                                  | Coerência legal e menor erro.                         | **S** (4h)       | Políticas        |
| F1.9  | Substituir “Seja aprovado”, “Conforme” e “certificados” por linguagem de evidência.              | Reduz risco de promessa de conformidade.              | **S** (2h)       | Revisão de copy  |
| F1.10 | Navegação móvel com rótulos ou menu rotulado; remover ícones órfãos.                             | Descoberta e acessibilidade.                          | **S** (0,5 dia)  | Nenhuma          |

### Fase 2 — Semana 2 (P2)

| #    | Ação                                                                                | Impacto                                           | Esforço             | Dependência              |
| ---- | ----------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------- | ------------------------ |
| F2.1 | Migrar tokens para a paleta papel/petróleo/terracota; introduzir serifa de display. | Identidade própria e percepção de produto maduro. | **L** (3 dias + QA) | Aprovação de marca/fonte |
| F2.2 | Reduzir cartões: usar superfície, divisores e espaço; um único nível de sombra.     | Menos poluição visual, mais hierarquia.           | **M** (1–2 dias)    | F2.1                     |
| F2.3 | Reestruturar Configurações em abas + save sticky + domínio read-only.               | Menos rolagem e perda de alterações.              | **M** (1 dia)       | Nenhuma                  |
| F2.4 | Comparação de planos no mobile por plano, não por recurso.                          | Comparação real.                                  | **S** (4h)          | Nenhuma                  |
| F2.5 | Skip link + varredura de foco/teclado + corrigir 320px.                             | Acessibilidade AA e responsividade.               | **S** (4h)          | Nenhuma                  |
| F2.6 | Editar fotografia: 3 imagens fortes em vez de 6 genéricas; `srcset`/WebP.           | Humanização com função, não decoração.            | **M** (1 dia)       | Direção de arte          |
| F2.7 | `clamp` no H1 para 320px; remover eyebrows redundantes; padronizar posição.         | Legibilidade mobile e consistência.               | **S** (4h)          | Nenhuma                  |

### Fase 3 — Polimento (P3)

- Meta description, Open Graph e `theme-color`.
- Padronizar raios de CTA (pílula só para chips).
- Reduzir duplicação de links no footer.
- Revisar skeleton para refletir o layout final.
- Adicionar “Fale com uma pessoa” no 404.

### Métricas de sucesso

- **Teste de 5 segundos:** ≥80% dos entrevistados dizem o que o ATUE faz e para quem.
- **Primeiro diagnóstico:** usuário chega ao resultado em ≤2 minutos após criar conta.
- **Mobile:** `scrollWidth === clientWidth` em 320, 390, 768, 1024 e 1440.
- **Acessibilidade:** fluxo completo por teclado; axe/Lighthouse ≥95; nenhum texto essencial abaixo de 15,6px.
- **Demo:** avaliador chega ao dashboard em ≤2 cliques após login, sem pagar.

---

## ETAPA 7 — Recomendações finais

### O que precisa mudar imediatamente

1. **Corrigir o bug dos 80 segundos.** É a mudança de menor esforço e maior impacto de todas. Sem ela, a landing continua parecendo quebrada.
2. **Tema claro como padrão.** O avaliador não deve depender da configuração do sistema operacional para ver a versão acolhedora.
3. **Reescrever a primeira dobra.** Promessa clara, público explícito, CTA específico e um artefato de produto.
4. **Publicar rodapé legal e corrigir o suporte.** Para um produto de LGPD, isso é parte do produto, não um detalhe de site.
5. **Oferecer demonstração antes do paywall.** O valor precisa vir antes da escolha de plano.
6. **Corrigir o header em 320px e o H1 mobile.** A demo pode ser vista no celular.
7. **Trocar “Conforme” por um estado honesto e explicar o score.** A confiança é o ativo principal.

### O que pode esperar

- Migração completa da paleta e da tipografia (Fase 2), desde que a decisão de marca esteja aprovada.
- Reestruturação de Configurações em abas.
- Comparação de planos no mobile.
- Substituição das fotos por um ensaio mais específico.
- Microinterações e polimento de skeleton.

### O que não deve ser alterado

- **A honestidade sobre a simulação.** Não remova os avisos; consolide-os em um banner por tela. O produto ganha mais confiança sendo claro sobre o que não faz.
- **Os três pilares** (avaliar, organizar, comprovar). Eles são a espinha dorsal da narrativa.
- **A fronteira de serviços e mocks.** Mantenha a arquitetura tipada; não espalhe dados fictícios em componentes.
- **Os primitivos acessíveis.** `FormField`, foco visível, labels, `aria-*`, redução de movimento e contraste já estão em bom nível.
- **O logo e a direção fotográfica de pessoas reais.** Edite, não troque por robôs, circuitos ou ilustrações de IA.
- **A ausência de provas falsas.** Não adicione logos de clientes, selos ou depoimentos inventados. Use metodologia, transparência e demonstração.

### Minha visão para o ATUE profissional

O ATUE não deve ser percebido como “um dashboard que mostra um score”. Deve ser percebido como **o sistema operacional da confiança da pequena empresa**: o lugar onde ela entende o que falta, organiza o que já tem e comprova o que faz.

Isso implica três superfícies de produto:

1. **Meu painel:** o que precisa da minha atenção agora, com uma ação por pendência.
2. **Minhas evidências:** o que já está organizado, a validade e a origem de cada evidência.
3. **Minha comprovação:** relatórios e um “trust center” compartilhável com clientes, com data, escopo e limitações.

O score deixa de ser um número e vira um **índice explicável**: dimensões, peso, data, fonte e o que ele não garante. A IA deixa de ser um selo e vira uma **simulação declarada** que ajuda a organizar o trabalho. A linguagem deixa de ser “auditoria” e passa a ser “o que falta para você conseguir provar”.

Para o Demoday, a narrativa de 3 minutos deveria ser: **domínio → diagnóstico → uma pendência prioritária → evidência adicionada → relatório gerado**. Isso mostra, em sequência, os três pilares e o valor comercial. Hoje a demo mostra login, planos e um dashboard; a história do produto fica escondida atrás do gate.

**Nenhum arquivo do projeto foi alterado nesta etapa.** Quando você autorizar, começo pela Fase 0 — correção do bug, tema claro, header 320, primeira dobra, rodapé legal e modo demonstração —, que é o conjunto que mais muda a percepção do produto no Demoday.

---

## Acompanhamento de implementação — 11/11/2026

### Concluído

- Corrigido o bug de `delay` do GSAP que deixava a seção de benefícios e a foto de captura invisíveis por 80 segundos. `Reveal` e `Stagger` não usam mais `opacity: 0` em conteúdo essencial e têm fallback de posição.
- Primeira dobra reescrita: promessa, público, LGPD, CTAs explícitas e artefato de produto demonstrativo ao lado da copy.
- Landing reorganizada com trust strip, benefícios, como funciona, sobre, FAQ e captura de domínio; nenhuma promessa de aprovação/certificação.
- Tema claro como padrão; dark permanece como escolha explícita.
- Header do produto refeito para mobile com menu rotulado; sem overflow em 320/390/768/1024.
- Dashboard reordenado: situação, URL, data, score explicado e “Comece por aqui” antes do formulário.
- Rótulo “Conforme” substituído por “Adequado”; score agora traz ressalva de demonstração e dimensões consideradas.
- Gate de plano ganhou “Explorar demonstração”, liberando o plano Cresce em memória antes de exigir assinatura.
- `/documents` dividido em abas “Analisar documento” e “Central de downloads”; sem documento pré-selecionado; locks de plano visíveis antes do clique.
- `/form` transformado em wizard de três etapas com stepper, revisão, input de arquivo customizado em pt-BR e validação por etapa.
- Login com “Esqueci minha senha” simulado, “Entrar na demonstração” e links legais.
- Cadastro com consentimento obrigatório e checklist de senha em tempo real.
- Planos com hierarquia de CTA (recomendado sólido, demais outline), um único banner de demonstração e comparação mobile por plano.
- Perfil com um único “Salvar” e sem chips de navegação; Configurações com domínio read-only e locks de integração.
- Páginas `/privacidade`, `/termos` e `/contato`, links nos dois rodapés e correção de “Falar com o suporte”.
- Skip link, `id="conteudo"` nas páginas, meta description/OG e `theme-color`.
- Identidade cromática restaurada para a paleta fixa; tokens semânticos centralizados em `src/index.css`.

### Verificações executadas

- `npm run lint`: sem problemas.
- `npx tsc -p tsconfig.app.json --noEmit`: sem erros.
- `npm run format:check`: aprovado.
- Playwright/Chromium: rotas públicas e logadas em 320, 390, 768, 1024 e 1440; sem overflow horizontal; um `h1` por página; skip link recebe foco no primeiro Tab; upload de arquivo abre o seletor; gate de demonstração leva ao dashboard; locks de plano aparecem no plano Início.
- Não foi executado `npm run build`, conforme a diretriz da tarefa.

### Pendências e limites

- Configurações ainda não foram divididas em abas; o salvamento permanece no fim da página.
- A validação foi feita em Chromium headless, sem leitor de tela real, dispositivo físico, Safari ou Firefox.
- O backend continua ausente; autenticação, plano, contato e análise são simulados em memória.
- As fotos são arquivos locais de demonstração e ainda não têm `srcset`/AVIF.
- A matriz completa de contraste com ferramenta dedicada (axe/Lighthouse) ainda precisa ser rodada no CI ou manualmente.
