# ADR-0006: Zero-3D Modern Minimalist Executive Portfolio Architecture

- **Status**: `ACCEPTED` (Approved by user on 2026-10-06)
- **Deciders**: KulturIT System Architect, Lead Engineer, Domain Expert
- **Date**: 2026-10-06
- **Technical Story / Ticket**: [`specs/006-clean-architect-portfolio/plan.md`](file:///home/oyvind/code/homepage/specs/006-clean-architect-portfolio/plan.md)

---

## 1. Context and Problem Statement

Following direct user feedback—*"Let's start over. Can you create a more simple home page for me without any 3d"*—we are executing a fundamental architectural pivot for Øyvind Volden's portfolio.

Previous iterations of the portfolio featured complex 3D WebGL scenes, Three.js canvas graphs, camera orbit controllers, and simulated physical artifacts. While visually experimental, 3D graphics introduce significant real-world friction for an executive engineering leadership portfolio:

1. **Recruiter & Executive Impedance**: Executive recruiters, hiring managers, enterprise clients, and conference committees need to evaluate architectural authority, technical leadership, and production track records within 30 to 60 seconds. Heavy 3D viewports, canvas controls, loading spinners, and camera motion obstruct immediate content discovery.
2. **Device Battery & Resource Overhead**: WebGL contexts force high-power GPU utilization, drain mobile batteries, trigger laptop fan noise, and introduce over $2.5\text{ MB}$ of third-party JavaScript dependencies (`three`, `@react-three/fiber`, `@react-three/drei`).
3. **Accessibility (a11y) Barriers**: WebGL canvases are fundamentally non-semantic black boxes to screen readers (NVDA, VoiceOver, JAWS) unless completely mirrored by an off-screen DOM tree. Camera motions can also trigger vestibular discomfort for sensitive users.
4. **Poor Printing / PDF Export**: Canvas-based sites cannot be cleanly converted to a paper or PDF resume via the browser's native print pipeline.

We must decide on a new architectural foundation that completely eliminates 3D/WebGL overhead while delivering instantaneous loading, world-class typography, universal accessibility, and an ink-friendly print engine.

---

## 2. Decision Drivers

- **Instantaneous Time-to-Content (LCP $< 1.0\text{s}$)**: Content must render immediately on the initial paint without waiting for 3D shaders, WebGL context initialization, or large asset downloads.
- **Zero Runtime 3D Overhead**: Complete elimination of WebGL rendering contexts, animation loops, Three.js dependencies, and GPU memory allocations.
- **Executive Scannability**: Clear visual hierarchy showcasing Øyvind's role as **Lead Architect & Tech Lead • Head of Architect Group at KulturIT**, core impact metrics (15+ yrs, 11,000+ rules, 100k+ approvals, 10M+ artifacts), and flagship case studies.
- **Universal Accessibility (100% WCAG 2.1 / 2.2 AA Compliance)**: Full semantic HTML5 landmarks, visible focus rings, complete keyboard operability, modal focus trapping, and screen-reader announcements via `aria-live`.
- **1-Click Clean Print & PDF Engine (`@media print`)**: Ability to generate a pristine, high-contrast, multi-page curriculum vitae directly from the browser's native print dialog without UI chrome or background colors.
- **Strict Package-by-Feature Structure & Pure Calculator Rigor**: Clean codebase adhering to KulturIT standards, featuring pure deterministic calculators tested with Stryker mutation testing ($\ge 80\%$ score threshold).

---

## 3. Considered Options

### Option 1: Zero-3D Modern Minimalist Semantic SPA (React 18 + Tailwind CSS + Zustand + Pure Calculators) - [SELECTED]
- **Architecture**: Single-page application built with React 18 and Tailwind CSS, completely removing Three.js, R3F, and Drei.
- **Layout & Design**: Nordic/Swiss editorial design with high-contrast typography, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`), and accessible skip link.
- **State & Logic**: Minimal Zustand store for active section indicator, category filter state, CV modal drawer, and toast notifications. Domain calculations (filtering, clipboard strategies, text metrics) isolated into pure calculators.
- **Print**: Dedicated `@media print` layout rendering a formatted, ink-friendly 2-3 page curriculum vitae.
- **Bundle**: Tiny production footprint ($< 150\text{ KB}$ gzipped).

### Option 2: Retain WebGL with a Simplified Low-Poly 3D Canvas
- Maintain a reduced Three.js canvas in the background with fewer draw calls and no camera orbital motion.
- *Rejection Rationale*: Fails to satisfy the explicit user requirement ("without any 3d"). Still requires several megabytes of Three.js runtime libraries, consumes GPU cycles, and adds no value to executive scannability.

### Option 3: Static Site Generator (Astro / Hugo / Next.js Static Export)
- Generate a purely static multi-page HTML site.
- *Rejection Rationale*: Introduces tooling churn and framework migration overhead away from the established React/Vite/Vitest ecosystem in the workspace, while losing dynamic client-side capabilities such as interactive category filtering, focus-trapped CV drawer modals, and clipboard toast interactions.

### Option 4: Static PDF Resume Hosting
- Replace the interactive portfolio with a simple landing page hosting a static downloadable PDF file.
- *Rejection Rationale*: Lacks interactive storytelling, deep case study filtering, mobile responsiveness, and modern web presence suitable for a Principal/Lead Systems Architect.

---

## 4. Decision Outcome

Chosen option: **Option 1: Zero-3D Modern Minimalist Semantic SPA (React 18 + Tailwind CSS + Zustand + Pure Calculators)**.

### Rationale:
1. **Immediate Fulfillment of User Intent**: Completely removes all 3D graphics, WebGL contexts, and Three.js libraries, replacing them with a crisp, modern, editorial aesthetic.
2. **Exceptional Performance & Core Web Vitals**: Eliminating Three.js reduces bundle size from $> 2.5\text{ MB}$ to $< 150\text{ KB}$ gzipped, cutting LCP to $< 1.0\text{s}$ and guaranteeing zero GPU overhead.
3. **Flawless Universal Accessibility**: Semantic HTML5 ensures 100% crawlability by search bots and effortless navigation by screen-reader users, with full keyboard focus management and WCAG AA color contrast ($\ge 4.5:1$).
4. **Seamless Recruiter Workflow**: Quick CTA buttons, 1-click clipboard email copy with visual/accessible toast feedback, and an integrated `@media print` CV generator empower recruiters to capture Øyvind's qualifications in seconds.
5. **Architectural Purity & KulturIT Alignment**: Adheres strictly to the Package-by-Feature layout, KISS principle, technology over vendor abstractions, and pure domain calculators with Stryker mutation score $\ge 80\%$.

---

## 5. Consequences

### Positive:
- **Zero GPU / Battery Drain**: Mobile devices and laptops operate at baseline efficiency with zero fan noise or battery consumption.
- **Instantaneous Page Loads**: Sub-second rendering across broadband and mobile networks.
- **100% SEO & Assistive Tech Compatibility**: All headings, metrics, and case studies are standard DOM elements immediately indexed by search engines and screen readers.
- **Maintenance Simplicity**: No 3D scene graphs, canvas resizing handlers, shader bugs, or WebGL context loss recovery.
- **Native Print Pipeline**: Produces professional PDF resumes directly via `window.print()` without requiring third-party PDF generation services.

### Negative / Trade-offs:
- **Loss of 3D Visual Novelty**: The visual wow-factor of interactive WebGL shaders and 3D exploded assemblies is surrendered in favor of typographic clarity and performance. (Mitigated by sophisticated editorial layout, subtle CSS micro-interactions, and authoritative content structure).

---

## 6. Compliance with KulturIT Engineering Standards

- **Package-by-Feature Layout**: Features are partitioned into domain directories under `src/` (`hero/`, `leadership/`, `experience/`, `projects/`, `skills/`, `contact/`, `manifest/`, `navigation/`, `shared/`).
- **Clean Code & Naming Conventions**: Standard KulturIT pattern suffixes (`..Calculator`, `..Service`, `..Model`, `..Store`, `..Card`, `..Modal`).
- **Declarative React Components**: Render methods are short, composable, and free of synchronous business calculations.
- **Mutation Testing Gate**: Pure calculators (`ProjectFilterCalculator`, `ClipboardActionCalculator`, `ReadingTimeCalculator`) and store mutators are covered by Vitest suites enforcing Stryker mutation score $\ge 80\%$.
- **Operational Deliverables**: Supported by multi-stage Dockerfile, docker-compose, CI/CD GitHub Actions, and Release Please.
