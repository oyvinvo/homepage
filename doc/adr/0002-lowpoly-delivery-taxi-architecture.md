# ADR-0002: Custom Arcade Vehicle Physics Over Heavyweight WASM Physics Engines

- **Status**: ACCEPTED
- **Deciders**: KulturIT System Architect, Lead Engineer, Domain Expert
- **Date**: 2026-09-13
- **Technical Story / Ticket**: [specs/002-delivery-taxi-homepage/spec.md](file:///home/oyvind/code/homepage/specs/002-delivery-taxi-homepage/spec.md)

---

## 1. Context and Problem Statement

The **Low-Poly Delivery Taxi Portfolio** requires responsive, tactile arcade vehicle handling reminiscent of classic arcade games like *Crazy Taxi*. The player's taxi rover must support linear acceleration, high-speed speed caps, dynamic rolling friction, centrifugal suspension lean (chassis roll), turbo boost pads, inclined ramp jumping with vertical ballistic flight arcs, and underdamped harmonic landing bounces.

Modern 3D web applications often default to general-purpose rigid-body physics engines such as **Rapier 3D (WASM)** or **Cannon-es**. However, general-purpose rigid-body solvers introduce significant architectural costs in portfolio web applications:
1. **Massive WASM Binary Overhead**: Importing Rapier (`@dimforge/rapier3d-compat`) adds 2.0–3.5 MB of uncompressed WASM code, drastically inflating initial page load times and compromising the < 2.5 MB gzipped total bundle budget on mobile 4G connections.
2. **Asynchronous WASM Initialization & Memory Bridging**: WASM physics loops run across memory boundaries, requiring serialization and asynchronous initialization that complicates React lifecycle mounting and server-side/static prerendering.
3. **Simulation Jitter & Floatiness**: Realistic rigid-body solvers struggle with arcade vehicle dynamics. Tuning rigid-body raycast vehicle suspensions in Rapier often produces erratic flipping, unstable ground penetrations, or floaty low-gravity trajectories rather than snappy arcade controls.
4. **Testing Obstacles in Headless Environments**: Running Vitest and Stryker mutation testing against WASM bindings in headless Node.js environments requires polyfills, WebAssembly runtimes, and significantly slows down mutation testing cycles.

We must decide whether to import a heavyweight WASM/JS rigid-body physics engine or build a lightweight, custom, deterministic arcade kinematics and ballistics simulation in pure TypeScript.

---

## 2. Decision Drivers

- **Deterministic Performance & 60 FPS Mobile Guarantees**: Flawless 60 FPS on standard desktop GPUs and sustained 30–60 FPS on mid-tier mobile smartphones without thermal throttling or garbage collection stutter.
- **Zero-Bundle Bloat & Fast Load Times**: Total gzipped portfolio bundle must remain strictly under 2.5 MB, achieving Time to Interactive (TTI) < 2.0s on mobile 4G networks.
- **Snappy Arcade Driving Feel**: Instantaneous acceleration response, non-flipping vehicle stability, predictable ramp launch trajectories, and controlled centrifugal suspension roll.
- **Seamless React & Three.js Integration**: Continuous transforms mutate Three.js `Object3D` instances directly in high-frequency R3F `useFrame` loops, while discrete domain events commit to Zustand without WASM memory copy overhead.
- **Headless Unit & Mutation Testability**: 100% of mathematical calculators and domain boundary checks must run synchronously in Vitest and achieve a Stryker mutation testing score ≥ 80%.
- **KISS & Technology Over Vendor**: Simple, readable TypeScript code over complex external physics abstractions.

---

## 3. Considered Options

### Option 1: Custom Arcade Raycast/Kinematic & Ballistic Physics in TypeScript (Selected)
- Implement pure TypeScript mathematical calculators:
  - `TaxiKinematicsCalculator`: Speed clamping ($12.0\text{ m/s}$ normal, $21.6\text{ m/s}$ boost), speed-dependent steering attenuation, rolling friction decay ($6.0\text{ m/s}^2$), and centrifugal suspension roll ($k_{\text{roll}} = 0.08$).
  - `TaxiJumpBallisticsCalculator`: Incline launch impulse ($v_y = v \sin\theta + 2.5\text{ m/s}$), gravity integration ($g = 25.0\text{ m/s}^2$), aerial pitch alignment, and harmonic landing rebound ($\zeta = 0.7$, $\omega_n = 18.0\text{ rad/s}$).
  - `TownCollisionCalculator`: 2D AABB bounding box collision resolution with slide response against buildings and town borders.
- Zero external dependencies beyond Three.js math vectors.

### Option 2: Rapier 3D (WASM) via `@react-three/rapier`
- Rust-based physics engine compiled to WebAssembly.
- Features multi-body raycast vehicle controllers, continuous collision detection, and rigid-body dynamics.
- Managed declaratively using `@react-three/rapier` React components.

### Option 3: Cannon-es via `@react-three/cannon`
- Pure JavaScript port of Cannon.js.
- Web worker-based physics stepping with RaycastVehicle simulation.

### Option 4: Full Game Engine Port (Godot 4 Web / PlayCanvas)
- Author the entire diorama and vehicle physics in Godot or PlayCanvas, compiling to WebGL canvas.

---

## 4. Decision Outcome

Chosen option: **Option 1: Custom Arcade Raycast/Kinematic & Ballistic Physics in TypeScript**, because:

1. **Zero Bundle Bloat**: The custom kinematics and ballistic calculator implementation compiles to **< 15 KB of minified JavaScript**, compared to **> 2.5 MB** for Rapier WASM. This preserves mobile bandwidth and guarantees sub-2-second TTI.
2. **Arcade Precision Without Tuning Instabilities**: Rigid-body physics engines require tedious friction, suspension stiffness, and damping tuning that frequently breaks during high-speed collisions or ramp launches. Custom kinematics guarantees the taxi will never flip upside down, jitter on road seams, or tunnel through terrain.
3. **Headless Vitest & Stryker Mutation Testing**: Because all mathematical calculations reside in pure TypeScript functions with zero DOM or WASM dependencies, test suites execute in milliseconds. Stryker can mutate boundary operators (`+`, `-`, `<`, `>`) directly, guaranteeing assertion strength and achieving the required ≥ 80% mutation score.
4. **Seamless 60 FPS React Integration**: R3F components mutate Three.js `Object3D` refs synchronously in the `useFrame` render loop. There is no asynchronous worker serialization, no WASM shared memory buffer allocation, and no garbage collection overhead.
5. **KISS Principle & Complete Maintainability**: The entire simulation code is self-contained within `src/taxi/` and `src/town/`, cleanly readable and maintainable by any TypeScript engineer without specialized game physics engine expertise.

### Positive Consequences:
- Predictable, snappy vehicle handling tuned specifically for a delightful portfolio experience.
- Instant page load on mobile and desktop without asynchronous WASM downloading or compiling delays.
- Full test coverage and mutation testing compliance in standard CI pipelines without complex headless browser setups.
- Effortless integration with the Recruiter Speedrun Pass HUD, as vehicle coordinates can be interpolated or glided smoothly without fighting rigid-body velocity states.

### Negative Consequences & Trade-offs:
- Complex multi-body dynamic collisions (e.g. realistic vehicle crashes scattering building debris or tumbling barrels) are not supported.
- *Mitigation*: Multi-body destructive destruction is an explicit Non-Goal (Section 1.3 of the Specification). Low-poly diorama aesthetic prioritizes cozy exploration, waypoint sliding, and milestone celebrations over vehicular destruction.

---

## 5. Pros and Cons of the Options

### Option 1: Custom Arcade Kinematic Physics in TypeScript (Selected)
- **Good**: Tiny footprint (<15 KB minified vs 2.5 MB WASM).
- **Good**: Deterministic 60 FPS performance on all mobile devices with zero GC pauses.
- **Good**: Instant headless test execution with Vitest and 100% mutation testing coverage.
- **Good**: Perfect arcade feel: responsive drifting, suspension lean, predictable ramp jumps, and no erratic flipping.
- **Bad**: Must manually implement collision geometry math (AABB overlap and slide response).

### Option 2: Rapier 3D (WASM)
- **Good**: Full-featured 3D physics with continuous collision detection and joint constraints.
- **Bad**: Massive binary overhead (2.0–3.5 MB WASM), violating bundle size budget.
- **Bad**: Asynchronous WASM instantiation delays initial scene render.
- **Bad**: Prone to rigid-body vehicle flipping and floatiness unless meticulously tuned.
- **Bad**: Complex to run in headless CI environments during fast mutation testing cycles.

### Option 3: Cannon-es
- **Good**: Pure JavaScript, avoids WebAssembly initialization steps.
- **Bad**: Still adds ~350 KB to bundle; relies on Web Workers which introduce frame latency across postMessage queues.
- **Bad**: Less active maintenance and occasional numerical instability on low-framerate devices.

### Option 4: Full Game Engine (Godot 4 / PlayCanvas)
- **Good**: Visual editor and built-in vehicle physics rigs.
- **Bad**: Massive 15–30 MB download footprint; initial startup exceeds 8–12 seconds on mobile.
- **Bad**: Hostile to accessibility (WCAG AA); screen readers cannot parse canvas text, violating KulturIT standards.

---

## 6. Human Review & Approval

- **Architect Signature**: KulturIT System Architect
- **Human Reviewer**: ___________________
- **Decision**: `[ ] ACCEPTED`   `[ ] REJECTED`   `[x] PROPOSED`
- **Date**: ___________________
- **Notes / Modifications**: Awaiting human approval gate before transitioning to `ACCEPTED`.
