# ADR-0005: High-End 3D Scrollytelling Architecture with Exploded Modular Computing Engine and Decoupled Semantic HTML DOM

- **Status**: `ACCEPTED` (Approved by Human Stakeholder on 2026-09-14)
- **Deciders**: KulturIT System Architect, Lead Engineer, Domain Expert
- **Date**: 2026-09-14
- **Technical Story / Ticket**: [`specs/005-scrollytelling-artifact/plan.md`](file:///home/oyvind/code/homepage/specs/005-scrollytelling-artifact/plan.md)

---

## 1. Context and Problem Statement

Senior technology leadership and enterprise software architecture are multi-dimensional disciplines spanning user interfaces, high-throughput microservice gateways, complex regulatory rule engines, and distributed cloud container infrastructures.

Traditional portfolio websites fall into two extremes:
1. **Flat Static Resumes**: Incapable of conveying systems thinking, front-end craftsmanship, or interactive depth.
2. **Tacky 3D "Showcase" WebGL Demos**: Many 3D portfolios trap text inside WebGL canvas textures or disorienting first-person cameras, breaking web search crawler indexing, destroying screen-reader accessibility, triggering motion sickness, and frustrating time-constrained executive recruiters.

To solve this, we require an architectural portfolio anchored by a central 3D artifact: **an abstract architectural computing engine / exploded modular computing core**.

We must decide on:
- How to structure the relationship between the 3D WebGL canvas and semantic HTML DOM to guarantee 100% crawlability, accessibility (WCAG AA), and copy-pasteability.
- How to govern scroll-driven choreographic animations without jarring jump-cuts, erratic frame drops, or motion-sickness triggers.
- How to visually structure the central computing engine to represent Øyvind Volden's career milestones and architectural depth across four engineering tiers.
- How to handle graceful fallback for users with vestibular sensitivities or `prefers-reduced-motion`.

---

## 2. Decision Drivers

- **Rule 1 - Decoupled Semantic HTML DOM**: Every technical milestone, metric, and case study narrative must exist as standard crawlable HTML elements (`<header>`, `<section>`, `<article>`, `<h1>`-`<h6>`, `<p>`). Assistive reading tech (NVDA, VoiceOver) and search crawlers (Googlebot) must access 100% of the content without executing WebGL.
- **Rule 2 - Continuous Spring Scrubbing vs. Triggering**: The 3D scene must respond directly to scroll progress with smooth continuous spring interpolation (`damp3` exponential decay lerp), eliminating jarring jump-cuts even during erratic wheel or touch scrubbing.
- **Rule 3 - Graceful Fallback & Vestibular Safety**: For visitors with `@media (prefers-reduced-motion: reduce)`, camera movement and layer explosions must be bypassed, rendering an elegant static isometric overview with zero parallax.
- **Buttery 60 FPS WebGL 2.0 Performance**: Geometry budget strictly $\le 45,000$ triangles, draw calls $\le 25$, and zero memory allocations in the animation render loop.
- **Lightweight Procedural Synthesis**: Procedural geometries, instanced circuit traces, and Web Audio API harmonic drones avoiding heavy external GLTF/GLB downloads or audio MP3s (bundle $< 2.2\text{ MB}$ gzipped).
- **Headless Unit & Mutation Testability**: 100% of spatial calculations, explosion factors, spline trajectories, and terminal commands must be pure functions testable in headless Node.js, verified with Stryker mutation score $\ge 80\%$.

---

## 3. Considered Options

### Option 1: Decoupled Semantic HTML DOM + Fixed R3F WebGL Canvas with Continuous Damp3 Spring Scrubbing (Selected)
- **Architecture**: Dual-layer architecture:
  - Fixed-viewport background WebGL Canvas (`position: fixed; inset: 0; pointer-events: none; z-index: 0; aria-hidden: true`).
  - Standard scrolling semantic HTML overlay (`position: relative; z-index: 10; pointer-events: auto`).
- **Kinematics**: Continuous normalized scroll progress $P_{\text{raw}} \in [0.0, 1.0]$ smoothed via Three.js / Drei `damp3` exponential spring lerp ($\tilde{P}_t = \text{lerp}(\tilde{P}_{t-1}, P_{\text{raw}}, 1 - e^{-\lambda \Delta t})$).
- **Visual Hierarchy**: 4-slab modular computing core (Presentation, API Gateway, Domain Rules Core, Cloud Infrastructure) with vertical displacement governed by Hermite `smoothstep` explosion factor $E(\tilde{P})$.
- **Fallback**: `@media (prefers-reduced-motion: reduce)` automatically pins camera to a static isometric overview and disables explosion kinematics.
- **Audio**: Web Audio API generates a subtle $110\text{ Hz}$ harmonic drone strictly defaulting to MUTED (`isSoundEnabled: false`).

### Option 2: Monolithic WebGL Canvas with 3D Text Meshes or Canvas-Texture Text
- All text and headings are rendered inside WebGL using Three.js `TextGeometry`, signed-distance-field (SDF) fonts (`troika-three-text`), or 2D canvas textures mapped onto 3D planes.
- Camera orbits freely around floating 3D text cards.

### Option 3: Hard-Triggered Timeline Animations (GSAP ScrollTrigger / ScrollMagic)
- Scroll milestones trigger rigid timeline animations (`timeline.play()`, `timeline.reverse()`).
- Step-based animations where scrolling a threshold starts an asynchronous multi-second tween.

### Option 4: Static 2D Documentation Portfolio
- Traditional multi-page static site with 2D diagrams and static PDF resume.

---

## 4. Decision Outcome

Chosen option: **Option 1: Decoupled Semantic HTML DOM + Fixed R3F WebGL Canvas with Continuous Damp3 Spring Scrubbing**, because:

1. **Uncompromised Accessibility & Universal SEO (Rule 1)**:
   By separating the visual 3D canvas from the semantic HTML document, 100% of the resume, career dates, client names, and production metrics are standard DOM nodes. Assistive technologies read the page linearly with proper landmark roles (`banner`, `main`, `region`), heading hierarchy (`<h1>`-`<h3>`), and skip links. Native browser text selection, `Ctrl+F` search, and copy-pasting function flawlessly.
2. **Organic Scrubbing vs. Jarring Triggers (Rule 2)**:
   Hard-triggered timelines (Option 3) fight user scroll input: when visitors flick the scroll wheel quickly or change scroll direction mid-animation, triggered tweens cause desynchronization, disorientation, or jumpiness. Scrubbed `damp3` continuous spring interpolation binds every degree of rotation, layer offset, and camera position directly to scroll progress with a gentle $125\text{ms}$ damping lag, guaranteeing fluid 60 FPS transitions.
3. **Exploded Modular 4-Slab Visual Hierarchy**:
   Structuring the central artifact into 4 distinct physical tiers provides an intuitive spatial metaphor for Øyvind Volden's full-stack architecture background:
   - **Layer 1 (Top)**: UI / Presentation & Design System (`#38BDF8`).
   - **Layer 2**: API Gateway & Service Mesh (`#10B981`).
   - **Layer 3**: Domain Core & Rule Engine (`#F59E0B`).
   - **Layer 4 (Bottom)**: Cloud Infrastructure & Persistence (`#8B5CF6`).
4. **Vestibular Safety & Inclusive Design (Rule 3)**:
   Option 1 natively integrates with `@media (prefers-reduced-motion: reduce)`. When active, camera splines and explosion kinematics are completely silenced, presenting a calm static isometric core while text scrolls normally.
5. **Headless Testability & Stryker Mutation Rigor**:
   All kinematic calculations (`LayerExplosionCalculator`, `Damp3SpringInterpolator`, `CameraTrajectoryCalculator`, `TerminalCommandEvaluator`) are pure TypeScript functions that execute in milliseconds under Vitest with zero canvas mocks, achieving the required Stryker mutation score $\ge 80\%$.

### Positive Consequences:
- High-end visual appeal that establishes immediate credibility with engineering leadership and executive recruiters.
- Exceptional performance ($\le 25$ draw calls, $\le 45,000$ triangles, 60 FPS).
- Fully accessible and crawlable without requiring canvas accessibility hacks.
- Seamless 1-click Print/PDF CV export for time-constrained recruiters.

### Negative Consequences & Trade-offs:
- Requires dual coordination: maintaining alignment between viewport scroll position and 3D camera focus.
- *Mitigation*: Managed via `MilestoneObserverService` using `IntersectionObserver` with discrete Zustand state updates, avoiding React render loops during high-speed scrolling.

---

## 5. Pros and Cons of the Options

### Option 1: Decoupled Semantic HTML DOM + Fixed R3F Canvas (Selected)
- **Good**: 100% SEO indexing, screen-reader accessibility, and effortless copy-pasteability.
- **Good**: Smooth continuous spring scrubbing eliminates jump-cuts and motion sickness.
- **Good**: Clean separation between visual representation and domain content.
- **Good**: Automatic vestibular safety fallback with `prefers-reduced-motion`.
- **Bad**: Requires precise CSS layout coordination to keep text readable over 3D background elements.

### Option 2: Monolithic WebGL Canvas with 3D Text Meshes
- **Good**: Deep visual integration of text in 3D space.
- **Bad**: Horrible for accessibility; screen readers cannot parse 3D geometry.
- **Bad**: Zero SEO indexing for WebGL rendered text buffers.
- **Bad**: Text selection and browser search (`Ctrl+F`) fail completely.

### Option 3: Hard-Triggered Timeline Animations (ScrollTrigger / GSAP)
- **Good**: Familiar timeline-based authoring.
- **Bad**: Fails Rule 2: erratic user scrolling creates desynchronization, rubber-banding, and visual hitching.
- **Bad**: Heavy commercial licensing restrictions and unnecessary bundle weight.

### Option 4: Static 2D Documentation Portfolio
- **Good**: Minimal implementation effort.
- **Bad**: Lacks visual distinction and fails to demonstrate advanced front-end systems craftsmanship.

---

## 6. Human Review & Approval

- **Architect Signature**: KulturIT System Architect
- **Human Reviewer**: ___________________
- **Decision**: `[ ] ACCEPTED`   `[ ] REJECTED`   `[x] PROPOSED`
- **Date**: ___________________
- **Notes / Modifications**: Awaiting human approval gate before transitioning to `ACCEPTED`.
