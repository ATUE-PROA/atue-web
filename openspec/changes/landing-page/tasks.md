# Tasks

## 1. Escopo e dependências

- [ ] 1.1 Revisar `proposal.md`, `specs/landing-page/spec.md` e `design.md` com o responsável pela DEV-58; verificar que a área vazia do Figma, login real, trust center e backend permanecem fora do escopo.
- [x] 1.2 Instalar `react-hook-form`, `zod` e `@hookform/resolvers`; verificar com `npm ls` que não há peer dependency inválida e que `package-lock.json` foi atualizado.
- [x] 1.3 Confirmar que `src/index.css` e os tokens globais permanecem intocados; verificar com `git diff -- src/index.css` que não há alteração.

## 2. Componentes da landing

- [x] 2.1 Criar o módulo tipado de conteúdo da landing com títulos, descrições e itens revisáveis; verificar que nenhum texto promete conformidade automática ou resultado de diagnóstico.
- [x] 2.2 Implementar `LandingHeader` com marca, links "Como funciona", "Benefícios", "Sobre", "Contato", "Login" e "Cadastre-se"; verificar no navegador que as âncoras chegam às seções e que "Cadastre-se" abre `/cadastro`.
- [x] 2.3 Implementar o menu mobile com botão de abertura, `aria-expanded`, `aria-controls`, fechamento por Escape e retorno de foco; verificar por teclado em viewport estreito.
- [x] 2.4 Implementar `LandingHero` com botão "Conheça o ATUE" apontando para `#avaliar` e placeholder decorativo do prédio; verificar que o botão rola até a captura de domínio sem recarregar.
- [x] 2.5 Implementar `FeatureStrip`, `HowItWorksSection`, `VisionSection` e `LandingFooter` com os quatro itens, três cards, quatro bullets e links previstos; verificar que cada seção tem `id` de âncora e título de nível 2.
- [x] 2.6 Implementar `DomainCaptureSection` e `DomainForm` com rótulo visível, campo de domínio, botão "Avaliar meu site agora" e região de erro; verificar layout em desktop e mobile.
- [x] 2.7 Verificar que a landing não reproduz a área preta vazia do frame e que prédio e mockup usam apenas CSS/gradiente, sem URL externa.

## 3. Formulário e rotas

- [x] 3.1 Implementar `normalizeDomain` e o schema Zod com conversão para minúsculas, remoção de protocolo, `www`, caminho, consulta e fragmento; verificar manualmente `https://www.Exemplo.com.br/contato` → `exemplo.com.br`, `exemplo` inválido e `foo bar` inválido.
- [x] 3.2 Integrar React Hook Form ao schema, exibindo erro acessível com `aria-invalid` e `aria-describedby` junto ao campo; verificar que o valor digitado é preservado após erro.
- [x] 3.3 Encaminhar o domínio normalizado com `navigate('/cadastro', { state: { domain } })`; verificar no React DevTools ou no histórico que o state contém o domínio e que nenhuma requisição de rede é feita.
- [x] 3.4 Criar `CadastroPage` temporária que mostra o domínio recebido, informa que o cadastro pertence à `auth-dashboard` e oferece retorno para `/`; verificar acesso com state e recarregamento direto sem state.
- [x] 3.5 Atualizar `src/routes.tsx` para `/` → landing, `/cadastro` → página temporária e `*` → `NotFoundPage`; verificar as três rotas no servidor de desenvolvimento e no build de produção.

## 4. Qualidade e verificação final

- [x] 4.1 Testar a landing em 320px, 375px, 768px, 1024px e 1440px; verificar ausência de rolagem horizontal, legibilidade, menu mobile e empilhamento do formulário.
- [x] 4.2 Percorrer a página apenas com teclado; verificar foco visível, ordem lógica, nomes acessíveis dos controles, associação do erro ao campo, um único `h1` e landmarks semânticos.
- [x] 4.3 Rodar `npm run lint` e `npm run build`; verificar que ambos terminam com status zero e corrigir qualquer regressão introduzida pela change.
- [x] 4.4 Revisar o diff final; verificar que `openspec/specs/`, `src/index.css`, outras changes e telas não relacionadas permanecem intactos.
- [x] 4.5 Rodar `openspec validate landing-page --strict`; verificar que não há erro nem aviso.

## Workflow follow-up

- [ ] Arquivar a change após a revisão e a aprovação da entrega.
- [ ] Atualizar o estado da DEV-58 no `BACKLOG.md` somente quando a implementação estiver concluída.
