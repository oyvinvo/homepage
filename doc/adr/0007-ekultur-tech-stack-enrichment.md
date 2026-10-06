# ADR-0007: eKultur Real-World Technical Stack & Production Systems Enrichment

- **Status**: `ACCEPTED` (Approved by User at Gate 1)
- **Deciders**: KulturIT System Architect, Lead Engineer, Domain Expert
- **Date**: 2026-10-06
- **Technical Story / Ticket**: [`specs/007-ekultur-tech-enrichment/plan.md`](file:///home/oyvind/code/homepage/specs/007-ekultur-tech-enrichment/plan.md)

---

## 1. Context and Problem Statement

In previous iterations of the portfolio (`006-clean-architect-portfolio`), KulturIT was represented at a high conceptual level—citing generic microservices, Python, React, and RabbitMQ. However, deep technical inspection of actual production codebases (`~/code/vm` and `~/code/ekultur`) reveals an enterprise ecosystem of far greater architectural depth, where Øyvind Volden is the principal architect, primary designer, and designated author:

1. **`ekultur-handover`**: An 8-worker asynchronous digital preservation pipeline orchestrating Java 25 E-ARK Archival Information Package (AIP) generation, Python 3.12 / FastAPI coordination, WebSocket progress streaming, and verified legal deposit delivery to Nasjonalbiblioteket (National Library of Norway).
2. **`virtuelt-museum`**: Interactive cultural heritage discovery platform utilizing OpenSeadragon with IIIF Image API 2.0 to 3.0 migration, 360° equirectangular multi-resolution dome imaging (up to 8192x4096), concurrency-pooled batch processing, and a scrollytelling exhibition engine with WebGL 3D model inspection.
3. **`ekultur-core-gateway`**: Microservices fabric on AWS EKS (`c03`, `c05`, `c06`) utilizing Ambassador / Emissary API Gateway, custom Envoy filter routing, loop-free tenant resolution (`app-registry-api`), Server-Sent Events (SSE) streaming with ETag caching (`broadcast-api`), SQLAlchemy 2.0, Pydantic v2, and federated OIDC authentication via Zitadel and Microsoft Entra ID.
4. **`ekultur-ai-vision`**: Automated collection enrichment and OCR pipeline leveraging Google Cloud Vision API for historical manuscript transcription, entity extraction, and Solr/PostgreSQL full-text indexing.
5. **Frontend Monorepo & Tooling**: 30+ package Turborepo monorepo, `@ekultur/header-microfrontend`, `@ekultur/ekultur-mui` (MUI v6/v7 design system), and modern Python toolchains (uv / Poetry).

We must decide how to enrich the portfolio's domain models and catalogs to showcase this concrete technical authority without compromising the core architectural non-functional requirements: **zero 3D runtime overhead, instantaneous loading (LCP $< 1.0\text{s}$), universal accessibility (WCAG AA), and an authoritative, calm peer-networking voice**.

---

## 2. Decision Drivers

- **Verifiable Technical Authority**: Replace vague generalities with concrete production systems, real protocols (E-ARK, IIIF 2.0/3.0, Envoy, OTLP), and verifiable institutional partnerships (Nasjonalbiblioteket, Nordic Museums).
- **Strict Zero-3D Client-Side Invariant**: The portfolio homepage shell must remain 100% Zero-3D (zero Three.js, R3F, or WebGL canvas imports). The 3D and 360° dome capabilities of VirtueltMuseum must be documented textually as case study achievements.
- **Editorial Calm & Peer-Networking Tone**: Maintain a restrained, senior architectural voice. Avoid marketing buzzwords, countdowns, or aggressive recruiter funnels.
- **Schema Non-Breaking Compatibility**: The enrichment must conform strictly to the existing data contracts in `src/shared/types.ts` (`ProjectCategory`, `ProjectCaseStudy`, `MetricItem`, `SkillCategoryGroup`).
- **Pure Calculator Rigor & Test Invariants**: The pure domain calculator `ProjectFilterCalculator` must be validated against the enriched case studies with full Vitest coverage and Stryker mutation score $\ge 80\%$.

---

## 3. Considered Options

### Option 1: Enrich Domain Catalogs & Pure Calculator Tests with Concrete eKultur Systems (Zero-3D Shell) - [SELECTED]
- **Architecture**: Retain the high-performance React 18 / Tailwind CSS static SPA.
- **Data Enrichment**:
  - Update `projectsCatalog.ts` with 4 flagship eKultur case studies (*eKultur Handover*, *VirtueltMuseum*, *eKultur Distributed API Fabric*, *eKultur AI Vision*) alongside the preserved public sector systems (*Autosys KSAK* and *Regelforvaltning*).
  - Modernize `skillsCatalog.ts` with contemporary stack proficiencies (Python 3.12, FastAPI, SQLAlchemy 2.0, IIIF, E-ARK, AWS EKS, Ambassador/Envoy, OTLP, Google Cloud Vision API).
  - Update `experienceCatalog.ts` with detailed KulturIT deliverables.
- **Testing**: Add assertions in `ProjectFilterCalculator.test.ts` for real-world terms (`E-ARK`, `IIIF`, `Ambassador`, `FastAPI`, `Nasjonalbiblioteket`).
- **Bundle**: Maintains tiny footprint ($< 75\text{ KB}$ gzipped), LCP $< 1.0\text{s}$, zero WebGL contexts.

### Option 2: Embed Interactive WebGL / OpenSeadragon Viewers Directly in the Portfolio
- Embed an active OpenSeadragon canvas and WebGL 3D model viewer inside the VirtueltMuseum case study card.
- *Rejection Rationale*: Directly violates the explicit stakeholder directive ("start over without any 3d"). Re-introduces megabytes of canvas dependencies, strains mobile GPUs, degrades LCP/INP Core Web Vitals, and breaks print formatting.

### Option 3: Maintain Generic High-Level Descriptions
- Keep high-level references to general microservices, Python, and React without detailing specific internal platforms.
- *Rejection Rationale*: Fails to demonstrate the exceptional real-world technical depth, national legal deposit pipelines, and multi-tenant cloud engineering that Øyvind actually created and leads.

---

## 4. Decision Outcome

Chosen option: **Option 1: Enrich Domain Catalogs & Pure Calculator Tests with Concrete eKultur Systems (Zero-3D Shell)**.

### Rationale:
1. **Concrete Architectural Gravitas**: Demonstrates leadership over mission-critical public infrastructure (E-ARK legal deposit to Nasjonalbiblioteket, multi-tenant AWS EKS API fabric, IIIF gigapixel image streaming) rather than generic claims.
2. **Zero-3D Architecture Preserved**: Zero Three.js or canvas libraries are introduced. The portfolio delivers instant rendering, complete accessibility, and zero battery drain.
3. **KulturIT Clean Code Compliance**: Catalogs remain pure typed data structures (`src/projects/projectsCatalog.ts`, `src/skills/skillsCatalog.ts`, `src/experience/experienceCatalog.ts`), and filtering logic is cleanly isolated in `ProjectFilterCalculator`.
4. **Peer-Networking Tone**: Frames achievements around architectural tradeoffs, scalability, and domain resilience, reflecting a Lead Architect / Head of Architect Group persona.

---

## 5. Consequences

### Positive:
- **Maximum Credibility**: Technical peers, hiring executives, and enterprise partners immediately see deep domain mastery across archival standards, cloud infrastructure, computer vision, and distributed systems.
- **Enhanced Searchability**: Visitors and recruiters searching for specific technologies (e.g. `E-ARK`, `FastAPI`, `IIIF`, `Ambassador`, `PostgreSQL`) receive exact matches via `ProjectFilterCalculator`.
- **Zero Performance Regression**: The production bundle remains $< 75\text{ KB}$ gzipped, with LCP $< 1.0\text{s}$ and CLS $= 0.00$.
- **Clean Print Output**: All enriched case studies and competencies seamlessly format into the ink-friendly `@media print` resume.

### Negative / Trade-offs:
- **Information Density**: Adding 6 detailed case studies increases text volume. (Mitigated by clear category filtering tabs, live search input, and concise executive summary blocks).

---

## 6. Compliance with KulturIT Engineering Standards

- **Package-by-Feature Structure**: Maintained across `src/projects/`, `src/skills/`, `src/experience/`, `src/shared/`.
- **Pure Domain Calculators**: `ProjectFilterCalculator`, `ClipboardActionCalculator`, and `ReadingTimeCalculator` remain pure deterministic units.
- **Testing & Mutation Score Verification**: Vitest unit test suite expanded and mutation testing score maintained at $\ge 80\%$.
- **Universal Accessibility (WCAG 2.1/2.2 AA)**: Contrast ratios $\ge 4.5:1$, visible focus rings, full keyboard traversal, and accessible ARIA attributes.
