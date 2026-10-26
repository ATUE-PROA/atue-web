## Context

A `project-setup` entregou React 19, TypeScript estrito, Tailwind v4, shadcn/ui, Lucide, React Router 7 e a fonte Geist. Hoje `/` renderiza `HomePage`, um shell mínimo, e `*` renderiza `NotFoundPage`; `src/services`, `src/contexts` e `src/types` continuam vazios. Não há biblioteca de formulários nem test runner, e o CI valida `npm run lint` e `npm run build`.

Motivação: `proposal.md`. Requisitos: `specs/landing-page/spec.md`. Restrições: AGENTS.md (Tailwind, acessibilidade, tipagem explícita, sem backend inventado) e BACKLOG.md (RHF + Zod, responsividade desde 320px, sem `any`).

O frame de referência é escuro, com fundo quase preto, texto branco e azul de destaque. Os textos de apoio têm baixa legibilidade na captura e há uma área preta vazia e inacabada que não deve ser implementada. Nenhum frame mobile foi fornecido; o comportamento responsivo é inferido.

## Goals / Non-Goals

**Goals:**

- Entregar a landing completa em `/`, com identidade escura e leitura confortável em desktop e mobile.
- Validar o domínio no cliente e encaminhar o valor normalizado para `/cadastro` pelo state da rota.
- Manter a mudança isolada da landing, sem alterar tokens globais ou telas de outras changes.

**Non-Goals:**

- Login, cadastro real, persistência de sessão, dashboard e chamadas de rede.
- Trust center, páginas jurídicas, imagens definitivas e SEO avançado.
- Testes automatizados ou novo test runner.
- Reproduzir a área vazia do Figma ou inventar seções não especificadas.

## Decisions

### Tema escuro escopado por utilitários, não por tokens globais

A landing usa um contêiner com `bg-neutral-950 text-white` e, internamente, `neutral-800` para bordas, `neutral-400` para texto secundário e `blue-500`/`blue-600` para destaque. Não aplicamos a classe `.dark` no documento nem alteramos `src/index.css`, porque os tokens shadcn são compartilhados e uma mudança global vazaria para a `auth-dashboard`. Alternativa descartada: criar tokens `landing-*` no tema global — acoplaria uma tela aos tokens de todas as outras.

### Componentes de landing separados e conteúdo centralizado

`src/pages/LandingPage.tsx` apenas compõe as seções: `LandingHeader`, `LandingHero`, `FeatureStrip`, `HowItWorksSection`, `VisionSection`, `DomainCaptureSection` e `LandingFooter`, todos em `src/components/landing/`. O formulário fica em `DomainForm` e os textos revisáveis em um módulo de conteúdo tipado da mesma pasta. Isso mantém apresentação e comportamento separados, permite revisar copy sem tocar em layout e evita um arquivo único de página com centenas de linhas. Alternativa descartada: uma única página monolítica — mais rápida no início, difícil de revisar e de substituir depois.

### React Hook Form + Zod com normalização em uma função pura

Instalamos `react-hook-form`, `zod` e `@hookform/resolvers`, como previsto no BACKLOG para o primeiro formulário. A entrada é tratada por `normalizeDomain`: `trim`, remoção de protocolo, `www.`, caminho/consulta/fragmento, ponto final e conversão para minúsculas. O schema Zod aplica essa normalização e valida o hostname resultante com ao menos um ponto e rótulos válidos. O tipo é inferido do schema, sem `any`; entrada e saída continuam sendo `{ domain: string }`.

O erro aparece junto ao campo, com `aria-invalid`, `aria-describedby` e texto — não apenas cor. O formulário usa validação no submit e revalidação após o primeiro erro, preservando o valor digitado. Alternativa descartada: validação manual com regex no `onSubmit` — menos declarativa, sem integração com o estado de erro do formulário e fora da decisão já registrada no backlog.

Limitação conhecida: domínios internacionalizados em Unicode e endereços IP não são aceitos; o MVP trata hostnames ASCII/punycode com TLD alfabético.

### Contrato de state da rota explícito e tolerante

Ao validar, o formulário chama `navigate('/cadastro', { state: { domain } })`. O contrato `CadastroRouteState` fica em `src/types/` e a página de cadastro lê o state de forma defensiva: se não for um objeto com `domain` string, renderiza sem domínio em vez de quebrar. Recarregar `/cadastro` perde o state por definição do histórico do navegador; a página temporária precisa funcionar nesse caso. Alternativa descartada: query string — exporia o domínio na URL e não é o contrato pedido.

### Página `/cadastro` temporária, sem simular sucesso

`CadastroPage` informa que o cadastro será entregue pela `auth-dashboard`, mostra o domínio recebido quando disponível e oferece retorno para `/`. Não há formulário falso, spinner ou mensagem de sucesso. A rota existe apenas para o fluxo não terminar em 404 e será substituída pela change de autenticação sem alterar o contrato de state.

### Rotas: `/` landing, `/cadastro` temporária e `*` inalterada

`src/routes.tsx` passa a apontar `/` para `LandingPage` e ganha `/cadastro`. A rota `*` continua em `NotFoundPage`, então caminhos desconhecidos não são capturados pela landing. A antiga `HomePage` deixa de ser usada; sua remoção ou reaproveitamento será decidido na implementação, sem manter código morto.

### Navegação por âncoras nativas e menu mobile com disclosure

Os links de seção usam `href="#..."` para âncoras reais (`#beneficios`, `#como-funciona`, `#sobre`, `#contato`) e `scroll-mt-*` para compensar o cabeçalho fixo; o CTA do hero aponta para `#avaliar`. Isso preserva histórico, foco e comportamento nativo do navegador. O menu mobile usa um botão com `aria-expanded`/`aria-controls`, painel de links, fechamento por Escape e retorno de foco ao gatilho. Alternativa descartada: navegação apenas com `scrollIntoView` em JavaScript — desnecessária e pior para acessibilidade.

O link "Login" aponta provisoriamente para `/cadastro`, pois não existe rota de login nesta change; a `auth-dashboard` substituirá esse destino. O texto do placeholder deixa claro que cadastro e acesso ainda serão implementados.

### Placeholders visuais em CSS

A imagem de prédio do hero e o mockup de laptop de "Como funciona?" são representados por blocos com gradientes, bordas e ícones, marcados como decorativos (`aria-hidden`). Nenhuma URL externa é usada. Alternativa descartada: assets provisórios de terceiros — risco de licença, peso e dependência de rede.

### Conteúdo aproximado centralizado para revisão

Os títulos e descrições de baixa legibilidade são reescritos de forma concisa e plausível, sem promessas de conformidade automática nem resultados de diagnóstico. Ficam em um módulo de conteúdo para revisão de produto. A área preta vazia do frame não vira seção, espaçador ou placeholder.

## Risks / Trade-offs

- [Textos do Figma ilegíveis geram copy aproximada] → centralizar em um único módulo de conteúdo, revisar com produto antes do Demoday e evitar afirmações de conformidade garantida.
- [Novas dependências de formulário aumentam o bundle e podem conflitar com React 19] → instalar versões compatíveis, conferir `npm ls` e validar `lint`/`build` no CI.
- [State da rota é perdido ao recarregar `/cadastro`] → placeholder funciona sem state e oferece retorno à landing; a `auth-dashboard` decidirá persistência definitiva.
- [Login provisório em `/cadastro` pode confundir] → copy do placeholder explica que o acesso será implementado; destino será corrigido pela `auth-dashboard`.
- [Tema escuro por utilitários pode divergir entre seções] → concentrar cores no contêiner e reutilizar um pequeno conjunto de classes; não criar tokens globais.
- [Placeholders podem parecer inacabados] → são intencionais e decorativos; a prioridade é hierarquia, contraste e responsividade, não fidelidade visual à imagem.
- [Âncoras com cabeçalho fixo podem esconder títulos] → usar `scroll-mt-*` e testar em 320px, desktop e zoom.
- [Validação aceitar entradas indesejadas ou rejeitar domínios válidos] → função de normalização pura com casos manuais documentados na task; sem test runner nesta change.
