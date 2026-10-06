import { ProjectCaseStudy } from '../shared/types';

export const projectsCatalog: ProjectCaseStudy[] = [
  {
    id: 'vm-3d',
    title: 'VirtueltMuseum 3D: Curated Virtual 3D Rooms & Artifacts (vm/3d)',
    client: 'KulturIT & Nordic Museums',
    period: '2021–Present',
    category: 'web',
    summary:
      'Interactive 3D heritage platform and exhibition curation suite enabling museums to curate virtual exhibitions in customizable 3D rooms and present high-fidelity 3D artifact scans with real-time lighting and spatial interaction.',
    challenge:
      'Empowering non-technical museum curators to compose immersive 3D exhibitions—arranging artifacts in spatial 3D rooms, configuring interactive annotation hotspots, and ensuring buttery-smooth 60 FPS WebGL rendering across heterogeneous devices and mobile browsers.',
    architectureSolution:
      'Architected the vm/3d platform utilizing Three.js and React Three Fiber (@react-three/fiber). Designed a declarative curation workflow where curators position 3D photogrammetry models inside virtual 3D gallery rooms, set up spatial hotspots, and craft narrative interpretation cards. Integrated with KulturIT Python microservices and PostgreSQL asset repositories for automated glTF/GLB optimization and progressive level-of-detail (LOD) streaming.',
    metrics: [
      { label: '3D Stack', value: 'R3F / Three.js', detail: 'React Three Fiber & WebGL' },
      { label: 'Exhibition Space', value: '3D Virtual Rooms', detail: 'Spatial curation & artifact staging' },
      { label: 'Performance', value: '60 FPS WebGL', detail: 'Progressive glTF/GLB LOD streaming' },
    ],
    techStack: [
      'Three.js',
      'React Three Fiber (R3F)',
      'WebGL',
      '3D Room Curation',
      'glTF / GLB',
      'React',
      'TypeScript',
      'Python Flask',
      'PostgreSQL',
    ],
    links: [
      { label: 'Live 3D Rooms', url: 'https://digitaltmuseum.no/virtual-experiences?tags=vm-3droom' },
      { label: 'VirtueltMuseum', url: 'https://virtueltmuseum.no' },
    ],
  },
  {
    id: 'vm-360',
    title: 'VirtueltMuseum 360: Immersive 360° Panoramic Experiences (vm/360)',
    client: 'KulturIT & Nordic Museums',
    period: '2021–Present',
    category: 'web',
    summary:
      'Immersive panoramic exhibition curation platform allowing museums to construct guided 360° virtual tours from high-resolution equirectangular spherical captures with interconnected room transitions and rich multimedia points of interest.',
    challenge:
      'Streaming ultra-high-resolution equirectangular spherical panoramas (up to 8192x4096) without memory bloat on mobile devices, while providing museum curators an intuitive authoring tool to link panoramic rooms and place interactive hotspots.',
    architectureSolution:
      'Engineered vm/360 featuring a concurrency-pooled client batch processor that automatically slices high-resolution equirectangular captures into multi-resolution spherical dome tiles. Implemented a comprehensive tour curation suite where museum professionals link multiple 360° rooms, define directional navigation portals, and embed curated audio guides, video clips, and interpretive text.',
    metrics: [
      { label: 'Dome Resolution', value: '8192x4096', detail: 'Multi-resolution spherical panoramas' },
      { label: 'Curator Suite', value: 'Virtual 360 Tours', detail: 'Interconnected room transitions & hotspots' },
      { label: 'Streaming Engine', value: 'Tiled Domes', detail: 'Concurrency-pooled client batch processor' },
    ],
    techStack: [
      'React',
      'TypeScript',
      'WebGL',
      'Spherical Panoramas',
      '360 Tour Curation',
      'Batch Processing',
      'Python Flask',
      'PostgreSQL',
    ],
    links: [
      { label: 'Live 360 Experiences', url: 'https://digitaltmuseum.no/virtual-experiences?tags=vm-360' },
      { label: 'VirtueltMuseum', url: 'https://virtueltmuseum.no' },
    ],
  },
  {
    id: 'vm-scrollytelling-quiz',
    title: 'VirtueltMuseum: Scrollytelling Exhibitions & Quizzes (vm/scrollytelling & vm/quiz)',
    client: 'KulturIT & Nordic Museums',
    period: '2022–Present',
    category: 'web',
    summary:
      'Interactive cultural storytelling and visitor gamification modules enabling Nordic museums to curate and publish digital narrative exhibitions using versatile scrollytelling templates and educational quizzes.',
    challenge:
      'Empowering museum curators to design rich, immersive editorial narrative exhibitions with multiple presentation templates (split-screen, full-bleed media chapters, thematic timelines) and interactive quiz workflows that mount seamlessly into both admin curation portals and public museum portals.',
    architectureSolution:
      'Designed vm/scrollytelling and vm/quiz as independent microfrontends in React and TypeScript. Engineered a template-driven exhibition authoring system allowing curators to select layout structures, configure scroll-triggered step synchronization and media chapter transitions, and author accessible multi-choice quiz progression backed by specialized Python Flask and PostgreSQL microservices.',
    metrics: [
      { label: 'Curator Templates', value: 'Multiple Formats', detail: 'Full-bleed, split, & chapter scrollytelling' },
      { label: 'Modular Units', value: 'Microfrontends', detail: 'Embeddable across museum portals' },
      { label: 'Engagement', value: 'Gamified Quizzes', detail: 'Interactive quizzes for all ages' },
    ],
    techStack: [
      'React',
      'TypeScript',
      'Microfrontends',
      'Exhibition Curation',
      'Scrollytelling Templates',
      'Quiz Engine',
      'Python Flask',
      'PostgreSQL',
      'REST APIs',
    ],
    links: [
      { label: 'Live Scrollytellings', url: 'https://digitaltmuseum.no/virtual-experiences?tags=vm-story' },
      { label: 'VirtueltMuseum', url: 'https://virtueltmuseum.no' },
    ],
  },
  {
    id: 'ekultur-cookie-consent',
    title: 'eKultur In-House Cookie Consent & Privacy Platform (cookie-consent-api)',
    client: 'KulturIT AS',
    period: '2023–Present',
    category: 'web',
    summary:
      'Lightweight in-house GDPR & ePrivacy cookie consent management platform replacing costly external commercial vendors (OneTrust/Cookiebot) across 150+ Nordic cultural heritage web portals.',
    challenge:
      'Commercial consent management platforms charged exorbitant recurring multi-domain licensing fees, injected heavy tracking scripts, and lacked localized multi-language banner control and headless API access for custom cultural museum portals.',
    architectureSolution:
      'Architected and built cookie-consent-api—a high-performance, multi-tenant Python/FastAPI microservice backed by PostgreSQL. Implemented website_service and language_service for localized privacy policies, category-based script blocking/release (strictly necessary, analytical, marketing), and centralized authorization integration with authorization-api.',
    metrics: [
      { label: 'Compliance', value: 'GDPR / ePrivacy', detail: 'Strict opt-in consent enforcement' },
      { label: 'Vendor Cost', value: '100% In-House', detail: 'Eliminated commercial vendor licensing' },
      { label: 'Portals Powered', value: '150+', detail: 'Cultural websites & digital archives' },
    ],
    techStack: [
      'Python 3.12',
      'FastAPI',
      'PostgreSQL',
      'cookie-consent-api',
      'authorization-api',
      'Pydantic',
      'GDPR Compliance',
      'Poetry',
      'Docker',
    ],
    links: [{ label: 'eKultur Platform', url: 'https://ekultur.org' }],
  },
  {
    id: 'ekultur-core-apis',
    title: 'eKultur Domain APIs & In-House PostgreSQL Message Queue',
    client: 'KulturIT AS',
    period: '2018–Present',
    category: 'distributed',
    summary:
      'Central microservices ecosystem powering 150+ Nordic cultural institutions with FastAPI, SQLAlchemy 2.0, and a custom in-house transactional message queue in PostgreSQL.',
    challenge:
      'Decoupling multi-tenant museum domain operations across hundreds of independent institutions while avoiding external broker operational complexity and ensuring absolute ACID consistency.',
    architectureSolution:
      'Engineered core domain APIs (app-registry-api for loop-free tenant routing, broadcast-api for Server-Sent Events with ETag caching, museum-api, user-directory-sync with MS Graph, helpdesk-sync with Freshservice). Built a custom transactional message queue directly in PostgreSQL, eliminating external message brokers (no RabbitMQ) while guaranteeing transactionally safe task dispatch and asynchronous background processing.',
    metrics: [
      { label: 'Institutions', value: '150+', detail: 'Museums across Norway and Sweden' },
      { label: 'Message Queue', value: 'PostgreSQL', detail: 'Custom transactional task queue' },
      { label: 'Event Streaming', value: 'SSE / Push', detail: 'Felles Meldingstjeneste real-time alerts' },
    ],
    techStack: [
      'Python 3.12',
      'FastAPI',
      'SQLAlchemy 2.0',
      'PostgreSQL Message Queue',
      'Server-Sent Events (SSE)',
      'Pydantic v2',
      'Alembic',
      'uv / Poetry',
    ],
    links: [{ label: 'eKultur Platform', url: 'https://ekultur.org' }],
  },
  {
    id: 'ekultur-mfe-monorepo',
    title: 'eKultur Microfrontends & Shared Modules Monorepo (30+ Packages)',
    client: 'KulturIT AS',
    period: '2019–Present',
    category: 'distributed',
    summary:
      'Comprehensive Turborepo monorepo publishing 30+ shared NPM packages, design systems, and microfrontends unifying the entire eKultur web application ecosystem.',
    challenge:
      'Maintaining consistent institutional branding, single sign-on (SSO) session states, and shared interactive components across dozens of standalone web applications developed over multiple decades.',
    architectureSolution:
      'Architected the @ekultur/kit-modules Turborepo monorepo. Created @ekultur/header-microfrontend (universal top shell with app switching and live broadcast notices), @ekultur/ekultur-mui (Material UI v6/v7 design system), @ekultur/authentication (token proxies for Zitadel and Entra ID), @ekultur/dms-uppy-upload (resumable multi-file uploads), and standalone CloudFront CDN bundles.',
    metrics: [
      { label: 'Monorepo Scope', value: '30+ Packages', detail: 'Published to private GitLab registry' },
      { label: 'Universal Shell', value: 'Header MFE', detail: 'Mounted across all tenant apps' },
      { label: 'Design System', value: 'MUI v6/v7', detail: 'Unified cultural institution UX' },
    ],
    techStack: [
      'React 19 / Next.js',
      'TypeScript',
      'Turborepo',
      'Microfrontends',
      'Material UI (MUI v6/v7)',
      'Uppy',
      'Zitadel / Entra ID',
      'AWS CloudFront',
    ],
    links: [{ label: 'eKultur Platform', url: 'https://ekultur.org' }],
  },
  {
    id: 'ekultur-sso-auth',
    title: 'eKultur Central SSO & OAuth2 Infrastructure (auths-backend, auths-frontend, authorization-api)',
    client: 'KulturIT AS',
    period: '2019–Present',
    category: 'distributed',
    summary:
      'Centralized Single Sign-On (SSO) OAuth2 authentication and granular authorization ecosystem serving all eKultur applications across 150+ Nordic cultural institutions.',
    challenge:
      'Unifying authentication and user identity across diverse legacy and modern web applications while phasing out third-party cookies, ensuring strict CSRF protection, and orchestrating centralized multi-tenant organization authorization (RBAC).',
    architectureSolution:
      'Architected and implemented the central OAuth2 Authorization Code flow with auths-backend (Python) and auths-frontend (React on login.ekultur.org). Authored ADR 001 eliminating third-party cookies via SameSite refresh token cookies and partitioned token storage. Engineered authorization-api to enforce multi-tenant role-based access control (RBAC), organization-scoped permissions, and API key management across the entire ecosystem.',
    metrics: [
      { label: 'Protocol', value: 'OAuth2 / OIDC', detail: 'Central SSO authorization code flow' },
      { label: 'Security ADR', value: 'First-Party Cookies', detail: 'Phased out third-party cookies (ADR 001)' },
      { label: 'Authorization', value: 'RBAC Engine', detail: 'Multi-tenant organization permissions' },
    ],
    techStack: [
      'Python',
      'OAuth2 / OIDC',
      'React',
      'TypeScript',
      'authorization-api',
      'auths-backend',
      'auths-frontend',
      'PostgreSQL',
      'NGINX',
      'ADRs',
      'SameSite Cookies',
    ],
    links: [
      { label: 'login.ekultur.org', url: 'https://login.ekultur.org' },
      { label: 'eKultur Platform', url: 'https://ekultur.org' },
    ],
  },
  {
    id: 'ekultur-handover',
    title: 'eKultur Handover: E-ARK National Digital Preservation Pipeline',
    client: 'KulturIT & Nasjonalbiblioteket',
    period: '2023–Present',
    category: 'distributed',
    summary:
      'High-throughput, asynchronous digital preservation pipeline orchestrating the packaging, validation, and legal deposit transmission of Nordic cultural heritage to Nasjonalbiblioteket (National Library of Norway).',
    challenge:
      'Preserving millions of high-resolution digital master assets and relational catalog records in strict compliance with the international E-ARK Archival Information Package (AIP) specification without service interruption or data loss.',
    architectureSolution:
      'Architected an 8-worker decoupled asynchronous processing mesh coordinated via Python 3.12 / FastAPI and WebSockets. Integrated Java 25 E-ARK generation with METS and Dublin Core XML schemas, streaming multi-gigabyte archival packages directly to National Library storage via AWS S3 multipart uploads.',
    metrics: [
      { label: 'Preserved Artifacts', value: '10M+', detail: 'Cultural records and media masters' },
      { label: 'Worker Architecture', value: '8 Workers', detail: 'Asynchronous pipeline mesh' },
      { label: 'Archival Standard', value: 'E-ARK AIP', detail: 'METS / Dublin Core legal deposit' },
    ],
    techStack: [
      'Python 3.12',
      'FastAPI',
      'Java 25',
      'WebSockets',
      'AWS S3 Multipart',
      'Docker',
      'uv',
      'PostgreSQL',
      'E-ARK',
    ],
    links: [
      { label: 'Nasjonalbiblioteket', url: 'https://nb.no' },
      { label: 'KulturIT', url: 'https://kulturit.no' },
    ],
  },
  {
    id: 'ekultur-ai-vision',
    title: 'eKultur AI Vision: Automated Museum Collection Enrichment & OCR',
    client: 'KulturIT AS',
    period: '2024–Present',
    category: 'event-driven',
    summary:
      'Asynchronous artificial intelligence and computer vision service automating optical character recognition (OCR), manuscript transcription, and semantic tagging for historical museum collections.',
    challenge:
      'Processing millions of digitized historical manuscripts, handwritten records, and photographic artifacts without overwhelming external API rate limits or blocking synchronous catalog workflows.',
    architectureSolution:
      'Designed an asynchronous event-driven FastAPI microservice integrating Google Cloud Vision API with rate-limiting backpressure, Pillow image pipeline optimization, and AWS S3/Boto3 storage. Queued and dispatched tasks using an in-house transactional message queue in PostgreSQL. Transcribed texts and AI semantic labels are indexed into Solr and PostgreSQL for instant full-text search.',
    metrics: [
      { label: 'Image Engine', value: 'Google Cloud Vision', detail: 'Automated OCR & semantic labeling' },
      { label: 'Processing Mode', value: 'Asynchronous', detail: 'Event-driven backpressure pipeline' },
      { label: 'Queue Engine', value: 'PostgreSQL Queue', detail: 'Custom transactional task broker' },
    ],
    techStack: [
      'Python 3.12',
      'FastAPI',
      'Google Cloud Vision',
      'Pillow',
      'AWS S3',
      'PostgreSQL',
      'SQLAlchemy 2.0',
      'PostgreSQL Queue',
      'Poetry',
    ],
    links: [{ label: 'KulturIT AI Overview', url: 'https://kulturit.no' }],
  },
  {
    id: 'autosys-ksak',
    title: 'Autosys KSAK: National Vehicle Approvals Modernization',
    client: 'Statens vegvesen',
    period: '2016–2018',
    category: 'modernization',
    summary:
      'Nationwide digital transformation of individual vehicle approvals and safety modifications for the Norwegian transport authority.',
    challenge:
      'Nationwide vehicle inspection stations relied on paper dossiers and terminal-based legacy mainframes, requiring weeks for vehicle certification.',
    architectureSolution:
      'Architected modern service-oriented architecture with Spring Boot REST microservices, Oracle Autosys database integration, and high-contrast, keyboard-optimized React web applications.',
    metrics: [
      { label: 'Annual Approvals', value: '100k+', detail: 'Commercial & private vehicles' },
      { label: 'Inspection Cycle', value: '-70%', detail: 'Turnaround time reduced from weeks to hours' },
      { label: 'Nationwide Stations', value: '70+', detail: 'Active inspection hubs' },
    ],
    techStack: ['Java', 'Spring Boot', 'React', 'Oracle Database', 'REST APIs', 'Enterprise Integration'],
    links: [{ label: 'Statens vegvesen', url: 'https://vegvesen.no' }],
  },
  {
    id: 'regelforvaltning-engine',
    title: 'Statens vegvesen Automated Regulatory Rule Engine',
    client: 'Statens vegvesen',
    period: '2014–2016',
    category: 'event-driven',
    summary:
      'Mission-critical automated regulatory engine evaluating complex Norwegian road, transport, and vehicular legislation across nationwide registries.',
    challenge:
      'Over 11,000 regulatory legal rules with overlapping constraints and frequent legislative amendments required manual human inspection, creating massive administrative backlogs.',
    architectureSolution:
      'Engineered a deterministic, high-throughput legal decision engine using Java 8 streams and rule execution pipelines paired with an enterprise React/Flux frontend for legal experts.',
    metrics: [
      { label: 'Rules Evaluated', value: '11,000+', detail: 'Active regulatory road laws' },
      { label: 'Decision Latency', value: '< 25ms', detail: 'Per complex multi-rule evaluation' },
      { label: 'Automation Rate', value: '94%', detail: 'Eliminated manual review queues' },
    ],
    techStack: ['React', 'Flux', 'Java 8', 'RESTful Services', 'Deterministic Rule Engine', 'Oracle DB'],
    links: [{ label: 'Statens vegvesen', url: 'https://vegvesen.no' }],
  },
];
