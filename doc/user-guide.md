# User Guide: The Modern Minimalist Architect Portfolio (Zero-3D)

**Application**: The Modern Minimalist Architect Portfolio & Executive CV  
**Author / Subject**: Øyvind Volden (Lead Architect & Tech Lead • Head of Architect Group at KulturIT)  
**Target Audience**: Engineering Leaders, Technical Recruiters, Software Architects, and Developers  
**Version**: 6.1.0 (Feature 007 - KulturIT Real-World Technical Stack & Case Studies Enrichment)  
**Last Updated**: 2026-10-06  

---

## 1. Overview & Architecture Concept

The **Modern Minimalist Architect Portfolio** delivers an authoritative, high-precision digital portfolio and interactive curriculum vitae for Øyvind Volden, Lead Architect & Tech Lead and Head of the Architect Group at KulturIT.

Designed for senior leadership assessment and technical peer networking, the architecture completely eliminates 3D/WebGL runtime friction in favor of **content immediacy**, **lightweight performance**, and **flawless accessibility**:

```
+--------------------------------------------------------------------------------------------------+
|                                    Client Browser Viewport                                       |
|  - Semantic HTML5 Landmarks: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>     |
|  - Accessible Slide-Over CV Drawer: <dialog aria-modal="true"> with focus trapping & Escape key  |
+--------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+--------------------------------------------------------------------------------------------------+
|                                 Zero-3D Lightweight Frontend Stack                               |
|  - React 18 + TypeScript + Tailwind CSS (Zero Three.js / WebGL / Canvas runtime overhead)        |
|  - Reactive State & Actions via Zustand (store.ts)                                               |
|  - Deterministic Pure Calculators:                                                               |
|      • ProjectFilterCalculator: Category filtering (Distributed, Modernization, Web, Event-Driven) |
|      • ClipboardActionCalculator: Safe clipboard write with legacy fallback & mailto launcher    |
|      • ReadingTimeCalculator: Dynamic reading speed estimation (200 WPM)                         |
|  - Performance: ~70.6 kB total gzipped bundle (~21.3 kB app JS/CSS), LCP < 1.0s, CLS = 0.00      |
+--------------------------------------------------------------------------------------------------+
                                                 │
                                                 ▼
+--------------------------------------------------------------------------------------------------+
|                           Production Runtime & Container Architecture                            |
|  - Builder: node:22-alpine (npm ci -> tsc -b -> vite build)                                      |
|  - Runtime: nginxinc/nginx-unprivileged:alpine (Port 8080, non-root user nginx, UID 101)          |
|  - Hardened Nginx: Gzip compression, immutable /assets/ caching, SPA fallback, /health endpoint |
|  - Local Orchestration: docker-compose.yml (Frontend SPA + PostgreSQL 16 Alpine database)       |
+--------------------------------------------------------------------------------------------------+
```

### Core Performance & Architectural Metrics:
- **Zero 3D Overhead**: Zero WebGL context creation, zero Three.js dependencies, and zero continuous canvas render loops. Battery drain, GPU strain, and mobile thermal throttling are eliminated.
- **Ultra-Fast Asset Delivery**: Total production payload is **~70.6 kB gzipped** (59.6 kB application JS [15.6 kB gzipped], 27.8 kB CSS [5.7 kB gzipped], 154.9 kB vendor runtime [48.7 kB gzipped]), easily satisfying the `< 75 kB` threshold and guaranteeing Largest Contentful Paint (LCP) under 1.0 second.
- **12-Factor Containerization**: Non-root execution (`nginxinc/nginx-unprivileged:alpine`), deterministic multi-stage build, container health checks (`/health`), and 12-factor configuration compatibility.

---

## 2. Enriched Real-World Production Systems & Case Studies

The portfolio showcases Øyvind Volden's technical direction across flagship Norwegian public sector and national cultural heritage platforms:

### 2.1 VirtueltMuseum: 3D & 360° Interactive Heritage (vm/3d & vm/360)
- **Client & Context**: KulturIT & Nordic Museums (2021–Present).
- **Domain Scope**: Interactive visual discovery platform delivering Three.js & React Three Fiber (R3F) 3D artifact inspection, virtual 3D room experiences, and equirectangular multi-resolution 360° dome virtual exhibitions.
- **Technical Challenge**: Rendering complex 3D photogrammetry models and streaming ultra-high-resolution spherical dome panoramas (up to 8192x4096) across heterogeneous devices without GPU stalls or frame drops.
- **Architectural Solution**:
  - Architected `vm/3d` utilizing **Three.js** and **React Three Fiber (@react-three/fiber)** for real-time 3D model manipulation and spatial rooms.
  - Engineered `vm/360` with a concurrency-pooled client batch processor generating multi-resolution equirectangular dome assets.
  - Native migration of OpenSeadragon to the international **IIIF Image API 2.0/3.0** standard for gigapixel deep-zoom imagery.
- **Verified Metrics**:
  - `8192x4096` Multi-resolution spherical panoramas.
  - `R3F / Three.js` React Three Fiber & WebGL 3D rendering.
  - `IIIF 2.0/3.0` Open international deep-zoom protocol.
- **Technology Stack**: Three.js, React Three Fiber (R3F), WebGL, IIIF Image API, OpenSeadragon, React, TypeScript, Python Flask, PostgreSQL.

### 2.2 VirtueltMuseum: Scrollytelling & Educational Quizzes (vm/scrollytelling & vm/quiz)
- **Client & Context**: KulturIT & Nordic Museums (2022–Present).
- **Domain Scope**: Interactive cultural storytelling and visitor gamification modules enabling Nordic museums to publish curated narrative exhibitions and educational quizzes.
- **Technical Challenge**: Creating rich, immersive editorial narrative experiences and interactive quiz workflows that mount seamlessly inside both the VirtueltMuseum admin portal and public museum portals.
- **Architectural Solution**:
  - Designed `vm/scrollytelling` and `vm/quiz` as independent microfrontends in React and TypeScript.
  - Engineered smooth scroll-triggered step synchronization, media chapter transitions, and accessible multi-choice quiz progression backed by specialized Python Flask and PostgreSQL microservices.
- **Verified Metrics**:
  - `Microfrontends` Embeddable across museum portals.
  - `Scrollytelling` Scroll-driven multimedia chapters.
  - `Gamified` Interactive quizzes for all ages.
- **Technology Stack**: React, TypeScript, Microfrontends, Scrollytelling, Quiz Engine, Python Flask, PostgreSQL, REST APIs.

### 2.3 eKultur In-House Cookie Consent & Privacy Platform (cookie-consent-api)
- **Client & Context**: KulturIT AS (2023–Present).
- **Domain Scope**: Lightweight in-house GDPR & ePrivacy cookie consent management platform replacing costly external commercial vendors (OneTrust/Cookiebot) across 150+ Nordic cultural heritage web portals.
- **Technical Challenge**: Commercial consent management platforms charged exorbitant recurring multi-domain licensing fees, injected heavy tracking scripts, and lacked localized multi-language banner control and headless API access for custom cultural museum portals.
- **Architectural Solution**:
  - Architected and built `cookie-consent-api`—a high-performance, multi-tenant Python/FastAPI microservice backed by PostgreSQL.
  - Implemented `website_service` and `language_service` for localized privacy policies, category-based script blocking/release (strictly necessary, analytical, marketing), and centralized authorization integration with `authorization-api`.
- **Verified Metrics**:
  - `GDPR / ePrivacy` Strict opt-in consent enforcement.
  - `100% In-House` Eliminated commercial vendor licensing.
  - `150+` Cultural websites & digital archives powered.
- **Technology Stack**: Python 3.12, FastAPI, PostgreSQL, `cookie-consent-api`, `authorization-api`, Pydantic, GDPR Compliance, Poetry, Docker.

### 2.4 eKultur Domain APIs & In-House PostgreSQL Message Queue
- **Client & Context**: KulturIT AS (2018–Present).
- **Domain Scope**: Central microservices ecosystem powering 150+ Nordic cultural institutions with FastAPI, SQLAlchemy 2.0, and a custom in-house transactional message queue in PostgreSQL.
- **Technical Challenge**: Decoupling multi-tenant museum domain operations across hundreds of independent institutions while avoiding external broker operational complexity and ensuring absolute ACID consistency.
- **Architectural Solution**:
  - Engineered core domain APIs (`app-registry-api` for loop-free tenant routing, `broadcast-api` for Server-Sent Events with ETag caching, `museum-api`, `user-directory-sync` with MS Graph, `helpdesk-sync` with Freshservice).
  - Built a custom **transactional message queue directly in PostgreSQL**, eliminating external message brokers (no RabbitMQ) while guaranteeing transactionally safe task dispatch and asynchronous background processing.
- **Verified Metrics**:
  - `150+` Museums across Norway and Sweden.
  - `PostgreSQL` Custom transactional task queue.
  - `SSE / Push` Felles Meldingstjeneste real-time alerts.
- **Technology Stack**: Python 3.12, FastAPI, SQLAlchemy 2.0, PostgreSQL Message Queue, Server-Sent Events (SSE), Pydantic v2, Alembic, uv / Poetry.

### 2.4 eKultur Microfrontends & Shared Modules Monorepo (30+ Packages)
- **Client & Context**: KulturIT AS (2019–Present).
- **Domain Scope**: Comprehensive Turborepo monorepo publishing 30+ shared NPM packages, design systems, and microfrontends unifying the entire eKultur web application ecosystem.
- **Technical Challenge**: Maintaining consistent institutional branding, single sign-on (SSO) session states, and shared interactive components across dozens of standalone web applications developed over multiple decades.
- **Architectural Solution**:
  - Architected the `@ekultur/kit-modules` Turborepo monorepo.
  - Created `@ekultur/header-microfrontend` (universal top shell with app switching and live broadcast notices), `@ekultur/ekultur-mui` (Material UI v6/v7 design system), `@ekultur/authentication` (token proxies for Zitadel and Entra ID), `@ekultur/dms-uppy-upload` (resumable multi-file uploads), and standalone CloudFront CDN bundles.
- **Verified Metrics**:
  - `30+ Packages` Published to private GitLab registry.
  - `Header MFE` Universal shell mounted across all tenant apps.
  - `MUI v6/v7` Unified cultural institution UX.
- **Technology Stack**: React 19 / Next.js, TypeScript, Turborepo, Microfrontends, Material UI (MUI v6/v7), Uppy, Zitadel / Entra ID, AWS CloudFront.

### 2.5 eKultur Handover: E-ARK National Digital Preservation Pipeline
- **Client & Context**: KulturIT & Nasjonalbiblioteket (National Library of Norway) (2023–Present).
- **Domain Scope**: High-throughput, asynchronous legal deposit pipeline orchestrating the packaging, validation, and long-term digital preservation of Nordic cultural heritage masters.
- **Technical Challenge**: Packaging millions of high-resolution digital master assets and relational catalog records in strict compliance with the international E-ARK Archival Information Package (AIP) specification without service interruption, memory exhaustion, or bitrot risk.
- **Architectural Solution**:
  - Architected an **8-worker decoupled asynchronous processing mesh** coordinated via Python 3.12, FastAPI, and WebSockets.
  - Integrated a Java 25 microservice generating METS and Dublin Core XML schemas for strict E-ARK AIP compliance.
  - Direct streaming of multi-gigabyte archival packages to National Library cloud repositories via **AWS S3 multipart uploads**.
- **Verified Metrics**:
  - `10M+` Cultural records and media masters preserved.
  - `8 Workers` Asynchronous pipeline mesh.
  - `E-ARK AIP` METS / Dublin Core legal deposit standard.
- **Technology Stack**: Python 3.12, FastAPI, Java 25, WebSockets, AWS S3 Multipart, Docker, uv, PostgreSQL, E-ARK.

### 2.6 eKultur AI Vision: Automated Collection Enrichment & OCR
- **Client & Context**: KulturIT AS (2024–Present).
- **Domain Scope**: Asynchronous artificial intelligence and computer vision service automating optical character recognition (OCR), manuscript transcription, and semantic tagging for historical museum collections.
- **Technical Challenge**: Processing millions of digitized historical manuscripts, handwritten records, and photographic artifacts without overwhelming external API rate limits or blocking synchronous catalog workflows.
- **Architectural Solution**:
  - Asynchronous event-driven FastAPI microservice integrating **Google Cloud Vision API** with token-bucket rate limiting and backpressure.
  - Tasks dispatched through the in-house **PostgreSQL transactional task queue**.
  - Transcribed texts and AI semantic labels are indexed into **Apache Solr** and **PostgreSQL** for instant full-text discovery.
- **Verified Metrics**:
  - `Google Cloud Vision` Automated OCR and semantic tagging.
  - `Asynchronous` Event-driven backpressure pipeline.
  - `PostgreSQL Queue` Custom transactional task broker.
- **Technology Stack**: Python 3.12, FastAPI, Google Cloud Vision, Pillow, AWS S3, PostgreSQL, SQLAlchemy 2.0, PostgreSQL Queue, Poetry.

### 2.7 Autosys KSAK: National Vehicle Approvals Modernization
- **Client & Context**: Statens vegvesen (2016–2018).
- **Domain Scope**: Nationwide digital transformation of individual vehicle approvals and safety modifications for the Norwegian transport authority.
- **Technical Challenge**: Nationwide vehicle inspection stations relied on paper dossiers and terminal-based legacy mainframes, requiring weeks for vehicle certification.
- **Architectural Solution**:
  - Modern service-oriented architecture with **Spring Boot REST microservices** and Oracle Autosys database integration.
  - High-contrast, keyboard-optimized, accessible React web applications tailored for station inspectors.
- **Verified Metrics**:
  - `100k+` Annual commercial and private vehicle approvals.
  - `-70%` Inspection turnaround time reduced from weeks to hours.
  - `70+` Active nationwide inspection hubs.
- **Technology Stack**: Java, Spring Boot, React, Oracle Database, REST APIs, Enterprise Integration Patterns.

### 2.8 Statens vegvesen Automated Regulatory Rule Engine
- **Client & Context**: Statens vegvesen (2014–2016).
- **Domain Scope**: Mission-critical automated regulatory engine evaluating complex Norwegian road, transport, and vehicular legislation across nationwide registries.
- **Technical Challenge**: Over 11,000 regulatory legal rules with overlapping constraints and frequent legislative amendments required manual human inspection, creating massive administrative backlogs.
- **Architectural Solution**:
  - Deterministic, high-throughput legal decision engine using Java 8 streams and rule execution pipelines.
  - Paired with an enterprise React/Flux frontend for legal experts to model and audit rules.
- **Verified Metrics**:
  - `11,000+` Active statutory road rules evaluated.
  - `< 25ms` Decision latency per complex multi-rule evaluation.
  - `94%` Automated approval rate, eliminating manual review queues.
- **Technology Stack**: React, Flux, Java 8, RESTful Services, Deterministic Rule Engine, Oracle DB.

---

## 3. Content Navigation, Recruiter Dock & Peer Networking

### 3.1 Semantic Landmark Hierarchy
The application is structured into accessible landmarks allowing visitors, recruiters, and screen readers to scan Øyvind's career in seconds:
- **Skip Navigation Link**: Pressing `Tab` immediately on page load reveals the high-contrast skip link (`Skip to main content`), jumping past navigation chrome to `#main-content`.
- **Persistent Header (`<header role="banner">`)**: Sticky navigation with brand title (`Øyvind Volden // Lead Architect`) and direct section anchor links.
- **Hero Section (`#hero`)**: Executive summary, current title, availability badge, and 4 high-impact career metrics.
- **Leadership & Philosophy (`#leadership`)**: Exploration of Øyvind's role as Head of Architect Group at KulturIT and the 4 architecture tenets (DDD, ADRs, Microservices, Spec-Driven Engineering).
- **Experience Timeline (`#experience`)**: Chronological history with role mandates, technical stacks, and verified deliverables across KulturIT, Statens vegvesen, Ciber, and Mohive.
- **Featured Case Studies (`#projects`)**: Deep dives with interactive category filtering (`All`, `Distributed Systems`, `Modernization`, `Web & Cloud`, `Event-Driven`) and reading time calculation.
- **Core Competencies (`#skills`)**: 4-quadrant technical matrix (Architecture, Languages/Frameworks, Cloud/DevOps, Data/Messaging).
- **Recruiter & Peer-Networking Dock (`#contact`)**: Actionable contact cards with one-click utilities.

### 3.2 Recruiter & Peer-Networking Utilities
- **1-Click Copy Email**: Clicking `[Copy Email]` copies `oyvind.volden@gmail.com` to the clipboard via `ClipboardActionCalculator` and triggers a 3-second toast notification (`aria-live="polite"`). In restricted or non-secure contexts, it provides an automatic fallback to launch `mailto:oyvind.volden@gmail.com`.
- **Direct Phone Contact**: Accessible `tel:+4795977202` link.
- **Peer Networking & Profiles**: Verified links to LinkedIn (`https://www.linkedin.com/in/oyvindvolden`) and GitHub (`https://github.com/oyvinvo`) with `target="_blank"`, `rel="noopener noreferrer"`, and screen-reader accessibility announcements.
- **CV Manifest Drawer**: Accessible slide-over drawer (`<dialog aria-modal="true">`) rendering Øyvind's complete curriculum vitae, education, certifications, and chronology with keyboard focus trapping.

---

## 4. Recruiter 1-Click Print & PDF Export Instructions

The portfolio features an automated `@media print` stylesheet that transforms the web UI into a pristine, high-contrast, paper-optimized Curriculum Vitae:

```
[Screen Mode: Dark Minimalist UI]
              │
              ▼ Click [Download CV / Print] or press Ctrl+P / Cmd+P
[Browser Print Engine triggers @media print]
              │
              ├── Automatically hides: Header, Nav, Filter bars, CTAs, Toasts, Buttons
              ├── Re-formats typography: Crisp dark text (#0f172a) on white (#ffffff)
              ├── Applies page-break hygiene: `break-inside: avoid` on cards & milestones
              └── Appends destination URLs to printed links: e.g. "LinkedIn (https://...)"
              │
              ▼
[Output: Executive 2-to-3 Page A4 / Letter PDF Document]
```

### Step-by-Step PDF Export:
1. Click **`[Download CV / Print]`** in the Recruiter Dock, or click **`[Print / PDF]`** in the CV Manifest Drawer. Alternatively, press **`Ctrl+P`** (Windows/Linux) or **`Cmd+P`** (macOS).
2. In the browser print dialog:
   - **Destination**: Choose *"Save as PDF"*.
   - **Layout**: Portrait.
   - **Paper Size**: A4 or Letter.
   - **Margins**: Default or Minimum.
   - **Options**: Ensure *"Background graphics"* is enabled for subtle pill badges.
3. Click **Save**.

---

## 5. Accessibility & Vestibular Motion Safeguards

The application is engineered for **100% WCAG 2.1 & 2.2 Level AA compliance**:
- **Vestibular Safety**: Complete absence of continuous WebGL cameras, 3D orbits, or parallax scroll scrubbers. All CSS transitions honor `@media (prefers-reduced-motion: reduce)`.
- **Strict Color Contrast**: All text elements exceed the WCAG AA minimum contrast ratio of 4.5:1 (normal text) and 3.0:1 (large headings and interactive controls).
- **Keyboard Navigation**:
  - Focusable elements display a high-contrast amber ring (`ring-2 ring-amber-400`).
  - The CV Manifest Drawer (`<dialog>`) traps focus via `Tab` / `Shift+Tab` cycling.
  - Pressing `Escape` anywhere within the drawer closes it and returns focus to the calling element.
- **Screen Reader Announcements**:
  - Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
  - Category filter changes update `aria-pressed="true|false"` and announce active count.
  - Toast notifications utilize an `aria-live="polite"` status region.
- **Touch Target Sizing**: All interactive touch targets on mobile viewports measure $\ge 44 \times 44\text{px}$.

---

## 6. Local Development & Operational Commands

### 6.1 Prerequisites
- **Node.js**: v22 LTS (or v20+)
- **npm**: v10+
- **Docker & Docker Compose**: Docker Engine 24+ with Compose v2

### 6.2 Local Development Commands

```bash
# Install exact pinned dependencies
npm ci

# Start local development server (Vite with HMR)
npm run dev
# -> Local URL: http://localhost:5173

# Execute unit and integration test suite (Vitest - 39 tests)
npm test

# Run Vitest in interactive watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run ESLint validation
npm run lint

# Build production bundle (TypeScript typecheck + Vite production build)
npm run build
# -> Verifies gzipped bundle size remains under 75 kB

# Run Stryker mutation testing (threshold: >= 80%, current: 90.57%)
npm run test:mutation
# or directly:
npx stryker run
```

---

## 7. Docker Containerization & Production Deployment

The portfolio is packaged as a lightweight, unprivileged multi-stage container adhering to 12-factor principles:

### 7.1 Container Multi-Stage Design
- **Stage 1 (Builder)**: `node:22-alpine` installs dependencies deterministically (`npm ci`) and builds optimized production assets into `/app/dist`.
- **Stage 2 (Runtime)**: `nginxinc/nginx-unprivileged:alpine` serves static assets under the unprivileged `nginx` user (UID 101) on port `8080`.
- **Security Hardening**: Custom `nginx.conf` sets `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Health Check**: Native `/health` endpoint returning `200 OK` probed via `wget --spider http://localhost:8080/health`.

### 7.2 Running with Docker Compose (App + PostgreSQL)

```bash
# 1. Prepare environment variables from example template
cp .env.example .env

# 2. Build and launch services in detached mode
docker compose up --build -d

# 3. Check container status and health
docker compose ps

# 4. Inspect application logs
docker compose logs -f app

# 5. Verify the health endpoint
curl -i http://localhost:8080/health
# HTTP/1.1 200 OK
# Content-Type: text/plain
# OK

# 6. Stop containers and preserve database volume
docker compose down
```

The application is served at `http://localhost:8080`.

---

## 8. CI/CD & Automated Governance Workflows

The repository includes three automated GitHub Actions workflows under `.github/workflows/`:

1. **Continuous Integration (`.github/workflows/ci.yml`)**:
   - Triggers on push and pull requests to `main` / `master`.
   - Runs `npm ci`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:mutation` (Stryker).
   - Verifies Docker build via Docker Buildx dry run.

2. **Automated Semantic Releases (`.github/workflows/release.yml`)**:
   - Powered by Google Release Please (`release-please-config.json` and `.release-please-manifest.json`).
   - Automatically tracks Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`), bumps version numbers, maintains `CHANGELOG.md`, and creates GitHub releases.

3. **C4 PlantUML Wiki Sync (`.github/workflows/plantuml-wiki.yml`)**:
   - Triggers on modifications to `doc/**/*.puml`.
   - Automatically renders C4 architecture diagrams (`context.puml`, `container.puml`, `component.puml`) into high-resolution PNGs and pushes them to the repository GitHub Wiki.

---

## 9. Zero-Cost Visual Effects & Interactive Micro-Interactions

The portfolio incorporates tasteful, zero-overhead visual effects that elevate interactivity while preserving 100% performance, accessibility, and battery life:

1. **Interactive Cursor-Following Ambient Spotlight (`src/effects/AmbientSpotlight.tsx`)**:
   - Uses damped pointer coordinates bound to CSS variables (`--mouse-x`, `--mouse-y`) projecting an atmospheric radial light behind content.
   - Automatically adjusts luminance between Light and Dark themes to maintain invariant $\ge 4.5:1$ text contrast.

2. **Architectural Constellation Network (`src/effects/HeroConstellationSvg.tsx`)**:
   - Pure vector SVG illustrating distributed service nodes and pulsed data conduits.
   - Zero canvas elements, zero WebGL overhead, and 100% vector crispness across all retina displays.

3. **Tactile 3D Perspective Card Tilt & Glare (`src/effects/useCardTilt.ts` & Card Components)**:
   - Hardware-accelerated CSS 3D transforms (`perspective(1000px) rotateX(...) rotateY(...) scale3d(...)`) with dynamic radial specular glare.
   - **Touchscreen & Scroll-Over Reaction**: A passive scroll listener calculates card vertical position relative to viewport center, automatically applying dynamic 3D perspective pitch (`rotateX`) and a sweeping specular glare sheen as cards scroll into view, level out at center, and tilt forward as they leave.
   - **Direct Touch Gestures**: Supports direct finger touch tilting (`onTouchStart`, `onTouchMove`, `onTouchEnd`) for tactile responsiveness without interfering with native page scrolling.
   - Automatically disabled when `@media (prefers-reduced-motion: reduce)` is detected.

4. **3D Cursor & Touch Spark Trail (`src/effects/CursorTrail3D.tsx`)**:
   - Subtle, ambient micro-sparks rendered via lightweight 2D canvas with 3D perspective projection.
   - Responds passively to both cursor motion and touchscreen drag/scroll gestures.
   - Auto-sleeps when inactive for zero battery or GPU drain.


