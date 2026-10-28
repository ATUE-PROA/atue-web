# AGENTS.md — ATUE Web

## 1. Project Context

The `atue-web` repository contains the frontend SPA for **ATUE**, a B2B SaaS platform for digital compliance management, focused on LGPD and information security for small and medium-sized businesses.

The current objective is to build a visual, responsive, reliable MVP for a Demoday presentation. Prioritize clear information hierarchy, data readability, intuitive workflows, and usability for non-technical users.

The frontend must communicate trust, organization, and operational maturity. Avoid unnecessary complexity, decorative elements that compete with data, and features outside the agreed MVP scope.

## 2. Technology Stack

Instalado e verificado no repositório:

- **Framework:** React 19.
- **Language:** TypeScript 6 com `strict: true` em `tsconfig.app.json`.
- **Build tool:** Vite 8.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first, tokens em `src/index.css`), mais `@tailwindcss/typography`.
- **UI components:** shadcn/ui (Radix), em `src/components/ui`, com configuração em `components.json`.
- **Icons:** Lucide React.
- **Charts:** Recharts.
- **Routing:** React Router 7 (`createBrowserRouter` em `src/routes.tsx`).
- **HTTP:** Native Fetch API.
- **Architecture:** Single-page application (SPA).
- **Import alias:** `@/*` → `src/*`, configurado em `tsconfig.json`, `tsconfig.app.json` e `vite.config.ts`.
- **CI:** `.github/workflows/ci.yml` roda `npm ci`, `npm run lint`, `npm run format:check` e `npm run build` no Node 24 (`.nvmrc`).

Instalados e usados no projeto: `React Hook Form`, `Zod`, `@hookform/resolvers` e `Prettier`. Ainda não instalado: test runner. As pastas `src/services`, `src/contexts` e `src/types` seguem a organização do projeto para as próximas changes.

O guia de design do projeto está em `DESIGN.md` e deve ser consultado antes de criar ou alterar telas, componentes e estilos.

Before introducing dependencies, inspect `package.json`, the lockfile, and existing implementations. Reuse installed libraries and established project conventions whenever possible.

Do not replace existing dependencies, configuration, or architectural decisions without a concrete technical justification.

## 3. Engineering Principles

### 3.1. TypeScript and Type Safety

- Avoid `any`. Prefer explicit types, interfaces, discriminated unions, and `unknown` with proper narrowing when necessary.
- Define explicit types for component props, form payloads, service parameters, API responses, and domain entities.
- Do not use type assertions merely to suppress compiler errors.
- Handle nullable and optional values explicitly.
- Keep types consistent with actual runtime data.
- Use the project's existing TypeScript configuration and strictness settings.

### 3.2. Componentization

Build small, focused, reusable functional components.

Separate responsibilities into:

- **Application structure:** layout, navigation, sidebar, header, and page containers.
- **Feature components:** diagnostic forms, evidence lists, compliance indicators, pending tasks, and dashboards.
- **Shared UI:** buttons, dialogs, cards, tables, inputs, and other reusable primitives.
- **Services:** API access and external communication.
- **Types and domain models:** shared contracts and entities.

Keep business logic out of presentation components when extracting it improves clarity or testability. Do not abstract simple code merely to increase the number of files.

Prefer explicit composition over implicit element manipulation. For form controls, use the `FormField` render prop instead of `cloneElement` or similar magic. Keep page composition visible: the page should show which layout, aside, and form it renders.

Do not create types that merely mirror a copy object. Define copy with `as const` and let TypeScript infer it.

Follow the existing directory structure. If no clear structure exists, establish a minimal organization aligned with the features actually implemented.

### 3.3. Styling and Design

- Use Tailwind CSS utility classes for application styling.
- Prefer existing shadcn/ui components over custom implementations when they satisfy the requirement.
- Use Lucide React for interface icons.
- Maintain consistent spacing, typography, colors, borders, and interaction states.
- Follow `DESIGN.md` for surfaces, color roles, typography, spacing, radius, component recipes, states, and the design PR checklist.
- Reuse the shared primitives documented in `DESIGN.md` (for example `FormField`, `FormAlert`, `PasswordInput`, `AuthLayout`, `SiteHeader`, `BrandLink`) before creating local implementations.
- Ensure responsive behavior across mobile and desktop viewports.
- Avoid unnecessary inline styles, duplicated styling rules, and new CSS frameworks.
- Do not modify global design tokens or shared components to solve a local problem unless the change is intentional and compatible with other screens.
- Avoid arbitrary values when existing design tokens or utilities provide an adequate solution.

The interface should be professional, restrained, and appropriate for a B2B compliance platform. Prioritize usability and information density over visual effects.

### 3.4. State Management

- Prefer local React state (`useState`) and component composition.
- Lift state only when multiple components need to share it.
- Use React Context only when it solves a concrete cross-cutting requirement.
- Do not introduce Redux, Zustand, or another global state library without a demonstrated need.
- Avoid duplicating derived state when it can be calculated from existing data.
- Keep state transitions predictable and easy to follow.

### 3.5. API Integration and Mock-First Development

Backend availability must not block frontend development.

- Centralize API access in the existing service layer, preferably `src/services/<feature>.ts` when compatible with the repository structure.
- Keep HTTP requests out of presentational components.
- Use typed parameters, payloads, and response contracts.
- When an endpoint is unavailable, return structured, deterministic mock data through the same service boundary intended for the real implementation.
- Keep mock data separate from production service logic where practical.
- Import mocks only from services, not from components or pages. Migrate existing direct imports when the feature is touched.
- Do not scatter hardcoded sample data throughout components.
- Do not silently replace failed production requests with mock responses.
- Handle loading, success, empty, and error states explicitly.
- Keep API base URLs and environment-specific configuration outside application logic, using Vite environment variables where appropriate.
- Never commit secrets, API keys, access tokens, or credentials.

Mocks must reflect plausible domain entities and consistent relationships. Do not present simulated data as verified production data.

When the backend contract changes, update the corresponding types, services, and consuming components together.

### 3.6. Forms and Validation

- Associate every input with a visible label or an appropriate accessible label.
- Use semantic HTML and native form behavior where possible.
- Type form payloads explicitly.
- Validate required fields and relevant business constraints.
- Display actionable validation errors near the affected fields.
- Prevent duplicate submissions when appropriate.
- Provide clear submission, success, and failure feedback.
- Preserve user input when an operation fails, unless there is a specific reason not to.
- Do not report a successful save when the operation has only been simulated.

Use an existing validation library if one is already established in the project. Do not add one for a trivial form without justification.

### 3.7. Accessibility and Semantics

- Use semantic elements such as `<main>`, `<nav>`, `<section>`, `<article>`, and `<form>` where appropriate.
- Ensure interactive elements are keyboard accessible.
- Provide visible focus states.
- Use buttons for actions and links for navigation.
- Provide accessible names for icon-only controls.
- Do not rely exclusively on color to communicate status.
- Maintain readable contrast and meaningful heading hierarchy.
- Use appropriate ARIA attributes when native HTML semantics are insufficient.
- Ensure dialogs, menus, and other interactive components follow expected keyboard and focus behavior.

### 3.8. Charts and Data Visualization

When using Recharts:

- Provide explicitly typed chart data.
- Use clear labels, legends, units, and meaningful tooltips.
- Avoid misleading scales or visual representations.
- Handle empty datasets and unavailable values.
- Ensure charts remain usable within responsive containers.
- Provide an alternative textual representation when necessary for accessibility.
- Use charts only when they improve comprehension over a simpler indicator or table.

## 4. Product and Domain Constraints

ATUE helps businesses organize and demonstrate their compliance posture. The frontend should support workflows such as:

- Understanding the current compliance status.
- Identifying gaps and outstanding tasks.
- Organizing evidence associated with compliance requirements.
- Tracking evidence freshness and pending updates.
- Presenting relevant information clearly for internal review and external assessments.

Treat these as domain context, not as confirmation that every feature or endpoint already exists.

Do not invent backend capabilities, completed assessments, verified compliance statuses, or integrations that have not been implemented.

Do not claim that using ATUE automatically makes an organization LGPD-compliant or guarantees compliance with security requirements.

Keep business terminology understandable to non-technical users. Explain technical concepts through concise interface copy rather than unnecessary jargon.

Implement only features that are requested, specified, or necessary for an agreed workflow.

## 5. OpenSpec Workflow

OpenSpec is used to structure meaningful changes through explicit proposals, specifications, technical decisions, and implementation tasks.

For non-trivial features, architectural changes, multi-component workflows, API contract changes, or changes involving persistence and security:

1. Inspect the existing implementation and relevant project conventions.
2. Identify the affected capabilities and dependencies.
3. Create or update an OpenSpec change using the configured OpenCode integration.
4. Define observable requirements and acceptance scenarios.
5. Document relevant technical decisions and implementation tasks.
6. Review the proposed scope before implementation.
7. Implement the approved change incrementally.
8. Run the applicable checks and verify the acceptance criteria.
9. Update task status and archive the completed change according to the OpenSpec workflow.

Use the commands and syntax supported by the installed OpenSpec version and OpenCode integration.

For small, isolated fixes, follow the existing workflow without creating unnecessary specification overhead.

Do not modify approved requirements or broaden scope silently. If implementation reveals a meaningful change in requirements, document and review that change before proceeding.

## 6. Development Workflow

Before making changes:

1. Inspect the relevant source files and repository structure.
2. Read `package.json` and identify available scripts.
3. Review existing components, types, services, and styling conventions.
4. Check the current Git diff and avoid overwriting unrelated work.
5. Identify the smallest implementation that satisfies the requirement.

During implementation:

1. Make focused, incremental changes.
2. Reuse existing components and utilities.
3. Preserve unrelated functionality.
4. Avoid speculative refactors and unnecessary dependencies.
5. Keep the implementation aligned with existing API contracts and domain types.
6. Do not introduce unrelated formatting changes or regenerate files unnecessarily.

After implementation:

1. Run the relevant linting and TypeScript checks available in the project.
2. Run `npm run format:check`.
3. Run the production build.
4. Run relevant tests if configured.
5. Fix regressions introduced by the change.
6. Inspect the final diff for unintended modifications.
7. Report what changed, what was verified, and any remaining limitations.

Use the actual scripts defined in `package.json`. Do not assume that a test runner, linter, or type-check script exists.

## 7. Security and Reliability

- Never expose secrets or sensitive credentials in client-side code.
- Treat all external data as untrusted.
- Avoid unsafe HTML injection and unnecessary use of `dangerouslySetInnerHTML`.
- Do not store sensitive authentication data in browser storage without an explicitly reviewed security design.
- Do not assume frontend validation replaces backend validation.
- Do not expose internal error details to end users.
- Handle network failures and unexpected response formats safely.
- Avoid logging tokens, credentials, or sensitive user data.
- Do not introduce authorization assumptions that the backend cannot enforce.

## 8. Scope Control and Dependency Management

- Prefer the simplest solution that satisfies the documented requirement.
- Do not add a library for functionality already supported by the current stack.
- Do not migrate frameworks, change the build tool, or introduce a new state-management architecture without explicit justification.
- Do not modify unrelated screens, routes, shared tokens, or configuration.
- Preserve existing public interfaces unless the change explicitly requires a compatible migration.
- Never remove existing functionality simply to make a new implementation easier.
- Do not conceal incomplete functionality behind misleading UI states.

## 9. Definition of Done

A change is complete when all applicable conditions are met:

- [ ] The requested behavior is implemented.
- [ ] Acceptance criteria are satisfied.
- [ ] TypeScript types are explicit and consistent.
- [ ] Loading, empty, error, and success states are handled where relevant.
- [ ] The interface is responsive and accessible.
- [ ] API integration or mocks follow the established service boundary.
- [ ] No unrelated functionality has been modified.
- [ ] Relevant lint, format, type, test, and build checks pass.
- [ ] OpenSpec tasks and specifications reflect the final implementation when applicable.
- [ ] Remaining limitations are documented honestly.

## 10. Agent Communication

Keep implementation reports concise, specific, and verifiable.

When completing a task, report:

- **Implemented:** the behavior and files changed.
- **Validation:** checks executed and their actual results.
- **Limitations:** missing backend functionality, incomplete tests, or unresolved decisions.
- **Next steps:** only actions necessary to complete or unblock the requested work.

Never claim that tests passed, a feature works, or an endpoint exists unless the available evidence supports that statement.

When requirements are ambiguous and the ambiguity affects architecture, security, data integrity, or significant implementation cost, identify the uncertainty and request clarification or present explicit alternatives before committing to a consequential design decision.
