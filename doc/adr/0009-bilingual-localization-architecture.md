# ADR-0009: Zero-Dependency Type-Safe Bilingual Localization Architecture

- **Status**: `ACCEPTED` (Signed off at Human Approval Gate)
- **Deciders**: KulturIT System Architect, Lead Engineer, Domain Expert, Human Stakeholder
- **Date**: 2026-10-08
- **Technical Story / Ticket**: [`specs/009-bilingual-norwegian-english/plan.md`](file:///home/oyvind/code/homepage/specs/009-bilingual-norwegian-english/plan.md)

---

## 1. Context and Problem Statement

The personal executive portfolio of Øyvind Volden—Lead Architect & Tech Lead, Head of Architect Group at KulturIT—serves two distinct stakeholder demographics:

1. **Domestic Norwegian Enterprise & Public Sector Stakeholders**: Norwegian IT executives, museum and archive leadership, public sector procurement committees (e.g. Statens vegvesen, Nasjonalbiblioteket, Arkivverket, KulturIT), and domestic engineering peers who expect authoritative, natural Norwegian Bokmål terminology (*faggruppeledelse*, *regelforvaltning*, *digital kulturarv*, *arkitekturguvernans*, *hendelsesstyrt arkitektur*).
2. **International Engineering Peers, Consortiums & Global Recruiters**: International conference committees, European archival consortiums (E-ARK, Europeana, IIIF Consortium), cloud platform partners, and international tech recruiters who evaluate technical leadership and architectural achievements in idiomatic English.

The stakeholder has requested:
> *"Kan du lage en knapp for å velge mellom norsk og engelsk, og oversette innholdet så det er tilgjengelig på begge språk ?"*
> (*"Can you make a button to choose between Norwegian and English, and translate the content so it is accessible in both languages?"*)

We must establish an architectural solution for bilingual localization (`no` and `en`) that delivers:
- Frictionless, instantaneous switching ($< 16\text{ms}$, single render frame, zero page reload or flash of unlocalized content).
- Zero Cumulative Layout Shift (CLS = 0.00).
- Persistent user preference (`localStorage`) with intelligent first-visit browser locale detection (`navigator.language`).
- Full accessibility (WCAG 2.1/2.2 AA) and SEO compliance, including dynamic `<html lang="...">` DOM synchronization and screen-reader accessible toggle controls.
- Strict compliance with KulturIT KISS principles and zero runtime dependency bloat.

---

## 2. Decision Drivers

- **Zero Bundle Bloat & Zero External Runtime Dependencies**: Standard web i18n libraries (`i18next`, `react-i18next`, `react-intl`, `@formatjs/intl`) introduce 40–80 KB of minified runtime parsing code, interpolation engines, and polyfills. For a curated two-language executive portfolio, introducing third-party runtime dependencies violates the KulturIT KISS principle.
- **100% Compile-Time Type Safety & Parity**: Translation dictionary keys must be strictly enforced by TypeScript 5.6. A missing key, misspelled property, or structural mismatch between Norwegian and English must trigger a compile-time error (`tsc -b`), guaranteeing 100% localization parity before code hits production.
- **Instantaneous Latency ($< 16\text{ms}$)**: Localization switching must execute synchronously in memory without asynchronous network fetches, JSON bundle waterfalls, or React Suspense loading states.
- **Pure Domain Calculators & Testability**: Algorithmic decisions (locale fallback resolution, browser detection, toggle calculations, dynamic ARIA label formatting) must be isolated in a pure calculator (`LanguageCalculator`) subjected to mutation testing ($\ge 80\%$ threshold via Stryker).
- **Zustand State Synergy**: Seamless integration with the existing lightweight Zustand store (`usePortfolioStore`), managing language alongside theme and drawer modal states.
- **Universal Accessibility (WCAG 2.1/2.2 AA)**: Synchronizing the DOM root `<html lang="no|en">` attribute for assistive technology voice synthesizers and search engine indexers, coupled with high-contrast accessible toggle buttons ($\ge 44 \times 44\text{px}$ touch targets, visible focus rings, dynamic `aria-label`).

---

## 3. Considered Options

### Option 1: Zero-Dependency Compile-Time Type-Safe Localization Engine (Selected)
- **Architecture**: A bespoke, lightweight localization module located in `src/i18n/`:
  - `types.ts`: Strict TypeScript contract (`PortfolioContentDictionary`) defining the exact schema for all sections.
  - `dictionaries/` (`no.ts`, `en.ts`): Fully typed immutable dictionaries representing Norwegian Bokmål and English content.
  - `LanguageCalculator.ts`: Pure, deterministic calculator handling locale detection, toggling, and ARIA labels.
  - `useTranslation.ts`: Lightweight React hook binding Zustand `language` state to the active dictionary.
  - `LanguageToggle.tsx`: Accessible interactive toggle control integrated into Navbar and Mobile Drawer.
  - Store slice in `src/shared/store.ts`: `language: 'no' | 'en'`, `setLanguage`, `toggleLanguage`, `localStorage` persistence, and `<html lang>` synchronization.
- **Pros**:
  - Exactly 0 KB external library overhead.
  - 100% type-safe: TypeScript compiler guarantees that every key in English exists in Norwegian.
  - Instantaneous in-memory switching (< 16ms, single React re-render).
  - Clean KulturIT architecture: package-by-feature layout, pure calculators, mutation testable with Stryker.
- **Cons**:
  - Requires authoring content dictionaries in TypeScript files rather than loose external JSON files (which is actually an advantage for type safety).

### Option 2: Third-Party i18n Ecosystem (`i18next` + `react-i18next`)
- **Architecture**: Standard React i18n ecosystem with translation files loaded dynamically via HTTP backend or bundled JSON.
- **Pros**:
  - Industry-standard pattern with pluralization rules and interpolation syntax.
- **Cons**:
  - Adds 50+ KB of runtime dependencies and configuration boilerplate (`i18n.init()`, provider wrappers, suspense boundaries).
  - Translation keys are typically loose strings (`t('hero.title')`) requiring complex schema plugins to achieve compile-time safety.
  - Overkill for a two-language portfolio with known, static copy. Violates KulturIT KISS guidelines.

### Option 3: URL Pathname / Multi-Page Static Routing (`/no/` and `/en/`)
- **Architecture**: Separate HTML entry points or client-side router with path prefixes.
- **Pros**:
  - Clean URL-based language separation.
- **Cons**:
  - Requires introducing a client-side routing library (`react-router`) or changing the Vite single-page build configuration.
  - Causes full page remounts or reloads when switching languages, degrading the fluid single-page portfolio experience.
  - Adds complexity to hosting and deployment (nginx rewrites, GitHub Pages redirects).

### Option 4: Client-Side Runtime Translation Widget (Google Translate / DeepL API)
- **Architecture**: Dynamic third-party machine translation script injected into the DOM.
- **Pros**:
  - Zero translation effort upfront.
- **Cons**:
  - Clumsy, inaccurate translations of specialized Norwegian architectural terminology (*faggruppeledelse*, *regelforvaltning*, *arkitekturpraksis*).
  - Severe CSP (Content Security Policy) issues and external third-party script tracking.
  - Flash of unstyled/untranslated text and broken layout. Completely unacceptable for an executive portfolio.

---

## 4. Decision Outcome

**Selected Option**: **Option 1: Zero-Dependency Compile-Time Type-Safe Localization Engine**.

We will build a native, type-safe bilingual localization engine inside `src/i18n/` and integrate it directly with the existing Zustand store and Tailwind design system.

### Detailed Architectural Specifications:

1. **State Store Integration (`src/shared/store.ts`)**:
   - Add `language: 'no' | 'en'` to `PortfolioState`.
   - Initial state resolved by `LanguageCalculator.resolveInitialLanguage(localStorage.getItem('portfolio-language'), navigator.languages)`.
   - Actions: `setLanguage(lang: Language)` and `toggleLanguage()`.
   - Automatic side effects:
     - Persist choice to `localStorage.setItem('portfolio-language', lang)`.
     - Synchronize DOM root: `document.documentElement.lang = lang`.
2. **Pure Calculator (`src/i18n/LanguageCalculator.ts`)**:
   - Deterministic, side-effect-free methods:
     - `resolveInitialLanguage(saved: string | null, browserLanguages: readonly string[]): Language`
     - `toggle(current: Language): Language`
     - `getLanguageMeta(lang: Language): LanguageMeta`
     - `formatAriaLabel(targetLang: Language): string`
   - Verified by Stryker mutation testing with $\ge 80\%$ threshold.
3. **Type-Safe Dictionary Schema (`src/i18n/types.ts`)**:
   - `PortfolioContentDictionary` interface encompassing:
     - `nav`: Navigation links, drawer labels, button texts, accessibility labels.
     - `hero`: Executive positioning, headline, bio paragraphs, verified metrics, quick CTAs.
     - `leadership`: Architecture philosophy, 4 core pillars (DDD, ADRs, Microservices, Guild), quote.
     - `experience`: Career milestones (KulturIT, Autosys, Regelforvaltning, etc.) and academic education.
     - `projects`: Search placeholder, category filter tabs, and 6 deep-dive case studies.
     - `skills`: 4-quadrant competency grid and proficiency level tags.
     - `contact`: Recruiter dock, availability indicator, clipboard toast messages.
     - `cv`: CV drawer modal copy, section headers, print engine actions.
4. **UI Components (`src/i18n/LanguageToggle.tsx`)**:
   - Co-located toggle button rendering a modern segmented pill (`NO | EN`).
   - Placed in `StickyNavbar` (desktop) and `NavbarMobileMenu` (mobile drawer).
   - Dynamic `aria-label`: `"Bytt språk til engelsk"` (when `no`) / `"Switch language to Norwegian"` (when `en`).
   - Touch targets $\ge 44 \times 44\text{px}$, visible focus ring (`focus-visible:ring-2 focus-visible:ring-cyan-500`).

---

## 5. Consequences & Compliance

### Positive Consequences
- **Absolute Minimal Footprint**: Adds 0 KB of third-party NPM dependencies. Production bundle remains ultra-lightweight.
- **Zero Runtime Translation Bugs**: TypeScript compiler validates 100% dictionary completeness across both languages at build time.
- **Optimal User Experience**: Instantaneous switching without reload, layout jitter (CLS = 0.00), or network delays.
- **Enhanced Accessibility**: Meets WCAG 2.1/2.2 AA standards with dynamic `<html lang>` sync, correct voice synthesizer pronunciation, and accessible interactive controls.
- **Executive Precision**: Content in Norwegian and English is meticulously crafted by domain experts, preserving nuanced architectural authority.

### Negative Consequences / Trade-offs
- Adding new content sections requires updating both `no.ts` and `en.ts` dictionaries (which is intentional to ensure complete bilingual parity).

---

## 6. Validation & Quality Gates

- **Unit Testing**: Co-located Vitest tests for `LanguageCalculator`, `LanguageToggle`, `useTranslation`, and store actions.
- **Mutation Testing**: Stryker Mutator executing against `LanguageCalculator.ts` verifying mutation score $\ge 80\%$.
- **Accessibility Audit**: Automated tests in `AccessibilityAudit.test.tsx` verifying keyboard navigation, ARIA states, and `<html lang>` synchronization.
- **Build Verification**: `npm run build` (`tsc -b && vite build`) and `npm test` verifying clean compilation and zero test failures.
