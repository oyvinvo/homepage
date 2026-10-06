# ADR-0001: Interactive 3D AGV Portfolio Architecture and Technology Stack

- **Status**: ACCEPTED
- **Deciders**: KulturIT System Architect, Domain Expert, Lead Engineer
- **Date**: 2026-09-13
- **Technical Story / Ticket**: [specs/001-agv-homepage/spec.md](file:///home/oyvind/code/homepage/specs/001-agv-homepage/spec.md)

---

## 1. Context and Problem Statement

Engineering portfolios must strike a balance between showcasing advanced technical craftsmanship (interactive 3D simulation, spatial UI, real-time kinematics) and delivering a frictionless, highly accessible experience for time-constrained recruiters, hiring managers, and visitors with diverse accessibility needs.

Traditional 3D web applications often suffer from:
1. Bloated bundle sizes (>10MB) resulting in sluggish time-to-interactive on mobile networks.
2. Disorienting camera motion causing vestibular discomfort or nausea.
3. Intrusive autoplaying audio that violates user etiquette.
4. Total opacity to screen readers and keyboard-only users, violating WCAG AA compliance.
5. Brittle tight coupling between 3D scene rendering, simulation state, and 2D DOM overlays.

We need an architecture that delivers a high-performance 60 FPS industrial AGV/forklift simulation while guaranteeing WCAG 2.1/2.2 AA accessibility, zero-motion-sickness follow camera damping, polite procedural Web Audio, and modular package-by-feature maintainability.

---

## 2. Decision Drivers

- **Rendering Performance & Frame Rate**: Rock-solid 60 FPS on desktop and ≥ 30–60 FPS on mobile devices with strict draw call budget (< 60 draw calls).
- **Universal Accessibility (WCAG 2.1/2.2 AA)**: 100% keyboard and screen-reader accessibility for all portfolio information, bypassing 3D navigation via Recruiter Pass HUD.
- **KISS & Technology Over Vendor**: Prioritize open web standards, modular TypeScript libraries, and zero proprietary lock-in.
- **Package-by-Feature Modularity**: Strict isolation of business domains (`vehicle/`, `cargo/`, `shipping/`, `navigation/`, `audio/`, `manifest/`, `telemetry/`).
- **Transient State Performance**: Decoupling high-frequency 60 FPS rendering updates (vehicle position, wheel rotation, camera lerping) from React reconciliation to prevent frame drops.
- **Audio Politeness**: Procedural sound synthesis defaulting to muted, eliminating heavy audio asset downloads and respecting browser autoplay restrictions.
- **Testability & Mutation Coverage**: Deterministic kinematic and business logic testable in headless Node/Vitest environments with ≥ 80% mutation score.

---

## 3. Considered Options

1. **Option 1: React 19 / Vite + React Three Fiber (R3F) + Drei + Zustand + Web Audio API + Tailwind CSS**
   - Use React 19 and Vite for fast modern bundling.
   - Declarative 3D scene graph via React Three Fiber and Three.js with Drei helpers.
   - Lightweight un-opinionated state store via Zustand, enabling transient per-frame subscriptions (`getState()`, `subscribeWithSelector`) without re-rendering React trees.
   - Web Audio API for synthetic retro-industrial sound synthesis without audio files.
   - Tailwind CSS for responsive, high-contrast, accessible 2D UI overlays.

2. **Option 2: Vanilla Three.js + Imperative Canvas + Vanilla HTML/CSS**
   - Single canvas with handwritten Three.js render loop without React.
   - 2D UI managed via standard DOM queries (`document.querySelector`) and manual event listeners.
   - Custom event emitter for state coordination.

3. **Option 3: Babylon.js + SolidJS or Vue 3**
   - Use Babylon.js full-featured game engine with SolidJS or Vue for the UI.
   - Built-in physics engines (Havok / Ammo.js) and sound managers.

4. **Option 4: Unity WebGL / Godot 4 WebAssembly (WASM)**
   - Compile a complete C# or C++ game engine build to WASM and WebGL canvas.
   - HTML DOM embedded via canvas bridges.

---

## 4. Decision Outcome

Chosen option: **Option 1: React 19 / Vite + React Three Fiber (R3F) + Drei + Zustand + Web Audio API + Tailwind CSS**, because:

1. **Seamless 2D/3D Co-existence**: React Three Fiber bridges Three.js declarative scene graphs with React's component lifecycle, allowing 2D DOM HUDs (Tailwind CSS) and 3D meshes to share identical Zustand reactive state seamlessly.
2. **Transient Updates without React Overhead**: Zustand allows high-frequency kinematic updates (60-120 ticks/sec in `useFrame`) to bypass React reconciliation via transient subscriptions, completely eliminating garbage collection stutter.
3. **Accessibility Parity**: React simplifies creating fully accessible semantic HTML trees (`<nav>`, `<main>`, `<dialog>`, ARIA attributes, focus trapping) layered cleanly over the canvas.
4. **Lightweight Procedural Footprint**: Web Audio API generates industrial motor hums, hydraulic pitch sweeps, and stamp thuds synthetically in <5KB of JavaScript, achieving instantaneous load times without MP3/WAV asset downloads.
5. **KulturIT Compliance**: Vite + React + Zustand represents standard modern web technology, easily containerized via multi-stage Docker and verified with Vitest + Stryker mutation testing.

### Positive Consequences:
- Rapid bundle initialization (<2.5s on 4G) thanks to Vite code splitting and procedural geometry/audio.
- Full unit testability of vehicle kinematics, latching state machines, and manifest calculators in Vitest without requiring a WebGL context.
- Consistent styling and strict WCAG 2.1/2.2 AA contrast compliance using Tailwind CSS utility classes.
- Zero-cost transient state reads inside R3F `useFrame` loops using Zustand's `usePortfolioStore.getState()`.

### Negative Consequences & Trade-offs:
- React Three Fiber introduces an abstraction layer over Three.js; developers must adhere to R3F best practices (e.g., mutating refs directly in `useFrame` rather than triggering React state updates).
- *Mitigation*: Strictly enforce clean separation between continuous 3D transforms (managed via direct Three.js `Object3D` ref mutations) and discrete domain events (committed to Zustand).

---

## 5. Pros and Cons of the Options

### Option 1: React 19 / Vite + R3F + Drei + Zustand + Web Audio + Tailwind CSS (Selected)
- **Good**: Declarative scene graph composability; easy integration of accessible 2D HTML modals.
- **Good**: Zero-overhead 60 FPS animation via Zustand transient selectors and Three.js direct ref mutations.
- **Good**: Procedural Web Audio eliminates audio asset network requests and licensing constraints.
- **Good**: Rapid developer feedback loop via Vite HMR; co-located Vitest unit tests.
- **Bad**: Requires knowledge of both React lifecycle and Three.js scene graph memory management.

### Option 2: Vanilla Three.js + Imperative Canvas
- **Good**: Minimal library dependencies; direct control over render loop.
- **Bad**: Extreme boilerplate for managing complex UI states, modals, accessibility focus traps, and responsive layouts.
- **Bad**: Reinvents state synchronization between DOM and 3D objects, violating KISS and team maintainability.

### Option 3: Babylon.js + Vue/Solid
- **Good**: Robust built-in game mechanics and physics.
- **Bad**: Significantly larger core bundle size (>3MB base), slower initial page load on mobile.
- **Bad**: Diverges from KulturIT frontend standards (React ecosystem).

### Option 4: Unity WebGL / Godot WASM
- **Good**: Complete GUI and visual scene editor.
- **Bad**: Massive download footprint (>25MB WASM binary), slow startup time (>8-12 seconds).
- **Bad**: Hostile to accessibility; screen readers cannot parse canvas text, violating WCAG AA requirements.

---

## 6. Human Review & Approval

- **Architect Signature**: KulturIT System Architect
- **Human Reviewer**: ___________________
- **Decision**: `[ ] ACCEPTED`   `[ ] REJECTED`   `[x] PROPOSED`
- **Date**: ___________________
- **Notes / Modifications**: Awaiting human approval gate before transitioning to `ACCEPTED`.
