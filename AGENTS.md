# AGENTS.md — ATUE Web

## 1. Product Context

`atue-web` is the main frontend SPA for **ATUE**, a B2B SaaS platform for digital compliance and information security, focused on LGPD for small and medium-sized businesses.

The current objective is a visual, responsive, reliable MVP for Demoday. Prioritize clear information hierarchy, data readability, intuitive workflows and usability for non-technical users. The interface must communicate trust, organization and operational maturity.

Treat the product as a demonstration environment unless a backend contract proves otherwise. Do not claim that ATUE guarantees LGPD compliance, certifies security or replaces a real audit.

## 2. Mandatory Reading Order

Before any change:

1. Read this file.
2. Read `DESIGN.md` **before any visual work** — new screens, components, styles, layout, copy hierarchy or interaction states.
3. Inspect `package.json` and the relevant source files.
4. Check the current Git diff and avoid overwriting unrelated work.

`DESIGN.md` is the official and shared ATUE identity guide. It is byte-identical to `atue-apresentation/DESIGN.md`. This `AGENTS.md` prevails on architecture, behavior and technical constraints; `DESIGN.md` prevails on visual and interaction decisions. If they conflict, fix the documentation before implementing.

## 3. Technology Stack

Installed and used in this repository:

- **Framework:** React 19.
- **Language:** TypeScript 6 with `strict: true` in `tsconfig.app.json`.
- **Build:** Vite 8 with `@vitejs/plugin-react`.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first, tokens in `src/index.css`) and `@tailwindcss/typography`.
- **UI primitives:** shadcn/ui on Radix, in `src/components/ui`, configured by `components.json`.
- **Icons:** Lucide React.
- **Charts:** Recharts (used by `ScoreGauge`).
- **Routing:** React Router 7 with `createBrowserRouter` in `src/routes.tsx`.
- **Forms:** React Hook Form, Zod and `@hookform/resolvers`.
- **Motion:** GSAP + ScrollTrigger (`Reveal`), `tw-animate-css` and `motion-reduce` utilities.
- **Fonts:** Fontsource Geist Variable and Fraunces Variable.
- **Formatting:** Prettier.
- **HTTP:** native Fetch API.
- **Import alias:** `@/*` → `src/*` in `tsconfig*.json` and `vite.config.ts`.
- **CI:** `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm run format:check` and `npm run build` on the Node version from `.nvmrc`.

There is **no test runner** configured. Do not claim tests passed unless a real command was executed.

Scripts:

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run format     # Prettier write
npm run format:check
npm run build      # tsc -b && vite build (CI only; not for routine validation)
npm run preview
```

## 4. Repository Structure

```text
src/
  components/
    auth/          authentication layouts and forms
    diagnostics/   diagnostic form, score gauge, priority actions
    documents/     intake, simulated analysis, findings, downloads
    form/          multi-step document submission wizard
    landing/       public landing sections
    layout/        app shell, headers, footers, theme, navigation, scroll
    plans/         plan cards, comparison, subscription gate
    profile/       profile sections and styles
    settings/      settings sections
    ui/            shared primitives (shadcn and ATUE-specific)
  content/         reviewable pt-BR copy
  contexts/        AuthProvider and PlanProvider
  lib/             pure logic, schemas, local generators (PDF/DOCX/TXT)
  mocks/           deterministic demonstration data
  pages/           route components (PascalCase)
  services/        API access and mock boundary
  types/           explicit domain and API contracts
  index.css        design tokens and global styles
  routes.tsx       route table
```

## 5. Routes and Features

| Route                     | Purpose                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `/`                       | Public landing page: hero, benefits, how it works, photography, FAQ, domain capture. |
| `/register`               | Simulated account creation with consent and password checklist.                      |
| `/login`                  | Simulated login, demo entry and simulated password recovery.                         |
| `/form`                   | Three-step document submission wizard with review before sending.                    |
| `/plans`, `/plan`         | Plan comparison, FAQ, support and simulated subscription.                            |
| `/dashboard`              | Demonstration compliance overview, score, priorities and new diagnostic form.        |
| `/documents`              | Tabs for document analysis and local download center.                                |
| `/profile`                | Editable profile with local-only avatar preview and simulated save.                  |
| `/settings`               | Notifications, reports, domain, integrations, security and danger zone.              |
| `/privacidade`, `/termos` | Honest demonstration notices, not legal policies.                                    |
| `/contato`                | Simulated contact form.                                                              |
| `*`                       | Not found page.                                                                      |

Every route must be reachable through a visible control on another screen and must offer a clear path back. Shared destinations live in `src/content/navigation.ts`.

## 6. Architecture and Data Boundaries

- The app is a client-side SPA. `AppRoot` mounts skip link, scroll restoration, plan gate and route outlet.
- `AuthProvider` owns the simulated session; `PlanProvider` owns the in-memory active plan and subscription gate.
- HTTP access is centralized in `src/services/`; components and pages must not call `fetch` directly.
- `VITE_API_URL` (see `.env.example`) selects the boundary:
  - empty: deterministic mocks from `src/mocks/`;
  - set: auth and diagnostic creation call the Core API.
- `getDiagnostic` deliberately returns `null` when `VITE_API_URL` is set because the Core API does not yet expose history reads. The dashboard then shows the empty state.
- Mocks are imported only by services, not by components or pages. Migrate direct imports when the feature is touched.
- The JWT stays in module memory only; reload ends the session. Do not move it to `localStorage` without a reviewed security design.
- Plan access is a visual/experience gate (dashboard, documents, profile, settings), not backend authorization.
- `/form` performs one real external request: CNPJ lookup via `https://api.opencnpj.org` with a 10s timeout in `src/services/cnpj.ts`. It is optional and failures are surfaced; do not describe the app as fully offline.
- Document analysis and report generation are local and deterministic. Generate PDF/DOCX/TXT in `src/lib/`; never upload file contents.
- Never silently replace a failed production request with mock data.

## 7. Main Flows

1. **Public → auth → plans:** landing and institutional pages lead to `/register` or `/login`; both continue to `/plans`; choosing a plan activates it in memory and opens `/dashboard`.
2. **Diagnostic:** `/dashboard` accepts a URL, validates it, calls the diagnostic service and renders score, status, indicators, findings and priority actions. Failures preserve the previous result.
3. **Documents:** `/documents` accepts a real file input for metadata only or a fictitious sample, runs a deterministic analysis, renders findings and exposes local downloads.
4. **Submission wizard:** `/form` collects company, contact/DPO and documents, reviews the data and submits through the service boundary.
5. **Profile and settings:** edits are simulated in memory; success, error and retry are explicit; reload restores demonstration data.
6. **Theme:** light is the default; `ThemeToggle` stores the choice in `localStorage` under `atue-theme`. The class is applied before first paint in `index.html`.

## 8. Engineering Conventions

### 8.1 TypeScript

- Avoid `any`. Use explicit types, discriminated unions and `unknown` with narrowing.
- Define explicit types for props, payloads, API responses and domain entities.
- Do not use assertions to hide compiler errors.
- Keep runtime data consistent with declared contracts.

### 8.2 Components

- Small, focused functional components; composition over magic.
- Page composition stays visible: layout, aside and form should be readable in the page file.
- Do not abstract trivial code into more files.
- Use the `FormField` render prop instead of `cloneElement`.
- Define copy objects with `as const` and let TypeScript infer; do not create mirror types for copy.
- Follow the existing naming and directory conventions.

### 8.3 Styling and Design

- Use Tailwind utilities and the tokens in `src/index.css`.
- Follow `DESIGN.md` for palette, typography, spacing, radii, surfaces, states, motion and accessibility.
- Reuse shared primitives before creating local implementations: `Button`, `Input`, `Label`, `FormField`, `FormAlert`, `PasswordInput`, `AuthLayout`, `SiteHeader`, `ProductHeader`, `ProductFooter`, `BrandLink`, `Switch`, `Select`, `AlertDialog`, `SectionCard`, `Card`, `Badge`, `Accordion`, `Sheet`, `Table`, `Avatar`, `Progress`, `Skeleton`, `Reveal`.
- Do not modify global tokens or shared primitives for a local problem unless the change is intentional and safe for every screen.
- Do not introduce another CSS framework or a second icon/chart library.
- Light theme is the default. Never encode a theme assumption in a page-specific palette.

### 8.4 State

- Prefer local state and composition.
- Use Context only for cross-cutting concerns; no Redux/Zustand without a demonstrated need.
- Do not duplicate derived state.

### 8.5 Forms

- Visible labels, explicit payload types, validation near the field, preserved input on failure, duplicate-submit protection.
- Use React Hook Form + Zod; do not add another validation library.
- Use `noValidate` on controlled forms.
- Destructive or irreversible actions require an accessible `AlertDialog` and must state when they are simulated.

### 8.6 Accessibility

- Semantic landmarks; one `h1` per page; logical heading order.
- Visible focus, keyboard access, accessible names for icon controls.
- Errors linked with `aria-describedby`; status not conveyed by color alone.
- Comfortable touch targets (at least 44px for primary mobile actions).
- Decorative content uses `aria-hidden="true"`.

### 8.7 Charts

- Typed data, honest scales, clear labels/tooltips, responsive container, textual alternative when essential.
- Use a chart only when it communicates better than a table or indicator.

## 9. Implementation Rules

- Implement only requested, specified or necessary behavior.
- Preserve unrelated functionality and avoid speculative refactors.
- Do not add dependencies for functionality already supported.
- Never remove functionality to simplify a new implementation.
- Do not hide incomplete behavior behind a misleading UI state.
- Do not read, upload or store user file contents without a real backend contract; metadata-only previews must say so.
- Do not report a simulated save as real persistence.
- Do not expose secrets, tokens or credentials in client code, storage or logs.
- Do not use `dangerouslySetInnerHTML` for untrusted content.
- Update types, services and consumers together when a contract changes.
- Keep generated documents professional, consistently formatted and marked as demonstration artifacts.
- Do not modify approved requirements or broaden scope silently.

## 10. Technical Constraints

- No backend is implemented in this repository.
- Only auth and diagnostic creation have real API paths; everything else is mock or local.
- External runtime network is limited to the configured Core API and the OpenCNPJ lookup.
- JWT remains in memory.
- No test runner; use lint, formatting and TypeScript/build checks plus manual validation.
- Production build is `tsc -b && vite build`; do not run it as a substitute for lint or type checks during routine edits.
- Browser storage is limited to the theme preference and demonstration state that explicitly requires it.
- Preserve the existing Vite/Tailwind/shadcn architecture.
- Keep the app usable at 320px without horizontal page scroll.

## 11. Testing and Validation

After implementation, run what exists:

```bash
npm run lint
npm run format:check
npx tsc -b
```

`npm run build` is available but is not the default validation command; use it only when a full artifact check is required.

Manual checks:

- Walk every route and confirm reachability and a path back.
- Test light and dark themes.
- Test 320px, 375px, 768px, 1024px and 1440px.
- Test keyboard navigation, focus visibility and dialog/menu focus return.
- Test `prefers-reduced-motion`.
- Test loading, success, error and empty states for async flows.
- Confirm generated PDF/DOCX/TXT open correctly and include the demonstration notice.
- Confirm no sensitive data appears in the console.
- Report the actual commands run and their actual results.

Never claim a test, endpoint or visual check passed without evidence.

## 12. Preservation Rules

Do not regress:

- Existing routes, destinations and navigation reachability.
- The public/auth/product layout split and the shared headers/footers.
- The simulated nature of auth, plans, diagnostics, document analysis, profile, settings and contact.
- Demonstration notices and the prohibition on claiming real compliance or audits.
- Plan gating behavior and its in-memory semantics.
- Mock contracts and deterministic results used by more than one screen.
- Local generation of PDF, DOCX and TXT without upload or persistence.
- Metadata-only handling of attached files.
- Theme behavior: light default, persisted explicit choice, no flash on load.
- Accessibility, reduced-motion support and mobile usability.
- The institutional palette and typography contract in `DESIGN.md`.

## 13. OpenSpec Workflow

For non-trivial features, architectural changes, multi-component workflows, API contract changes or changes involving persistence/security:

1. Inspect the implementation and conventions.
2. Identify affected capabilities.
3. Create or update an OpenSpec change.
4. Define observable requirements and acceptance scenarios.
5. Record technical decisions and tasks.
6. Review scope before implementation.
7. Implement incrementally.
8. Run checks and verify acceptance criteria.
9. Update task status and archive the change.

Small isolated fixes follow the normal workflow without unnecessary specification overhead.

## 14. Definition of Done

- [ ] Requested behavior is implemented.
- [ ] Acceptance criteria are satisfied.
- [ ] Types are explicit and consistent.
- [ ] Loading, empty, error and success states are handled.
- [ ] The interface is responsive and accessible.
- [ ] `DESIGN.md` was followed and, if a new pattern exists, updated in both copies.
- [ ] API/mocks respect the service boundary.
- [ ] No unrelated functionality was modified.
- [ ] Applicable lint, format and type checks pass.
- [ ] Remaining limitations are documented honestly.

## 15. Agent Communication

Keep reports concise and verifiable. State:

- **Implemented:** behavior and files changed.
- **Validation:** commands executed and actual results.
- **Limitations:** missing backend functionality, tests or unresolved decisions.
- **Next steps:** only what is necessary to finish or unblock the work.

When ambiguity affects architecture, security, data integrity or significant cost, surface it before committing to a consequential decision.
