import { PortfolioContentDictionary } from '../types';

export const enDictionary: PortfolioContentDictionary = {
  nav: {
    home: 'Home',
    leadership: 'Leadership',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Competencies',
    contact: 'Contact',
    openCv: 'View full CV / Resume',
    toggleMenu: 'Toggle navigation menu',
    closeMenu: 'Close navigation menu',
  },
  hero: {
    roleBadge: 'Lead Architect & Head of Architecture Group',
    statusBadge: 'Full-time @ KulturIT',
    location: 'Lillehammer, Norway',
    titleLead: 'Hi, I am',
    titleName: 'Øyvind Volden',
    headlineRole: 'Lead Architect & Tech Lead • Head of Architecture Group at KulturIT',
    bio1: 'Leading the architecture guild at KulturIT with strategic oversight over enterprise technology roadmaps, cloud modernization, and architectural governance across national digital platforms for museums and cultural heritage institutions.',
    bio2: 'Over 15 years of battle-tested engineering leadership delivering mission-critical distributed systems — ranging from rule engines evaluating 11,000+ legal vehicle rules for the Norwegian Public Roads Administration (Statens vegvesen) to cloud-native microservices and interactive 3D/IIIF heritage platforms.',
    bio3: 'Passionate about clean code, readability, and pragmatic Domain-Driven Design (DDD) — believing software should be crafted with clarity and simplicity so it is effortless to read, review, and evolve.',
    viewProjects: 'View Projects',
    experience: 'Experience',
    openCv: 'Open CV',
    contact: 'Contact',
    metrics: {
      experience: {
        value: '15+',
        label: 'Years Architecture Experience',
        detail: 'Lead architect, tech lead, and architecture group head for national shared services',
      },
      rules: {
        value: '11k+',
        label: 'Rules Evaluated in Real-Time',
        detail: 'High-throughput statutory rule engine for vehicle registration & homologation',
      },
      approvals: {
        value: '100k+',
        label: 'Annual Case Approvals',
        detail: 'Automated vehicle case management in Autosys KSAK with high availability',
      },
      heritage: {
        value: '100+',
        label: 'Cultural Institutions',
        detail: 'The eKultur platform manages national cultural heritage across Norway & Sweden',
      },
    },
  },
  leadership: {
    sectionBadge: 'Guild Leadership & Philosophy',
    title: 'Architecture Leadership & Principles',
    subtitle: 'How I cultivate shared technical direction, empower autonomous engineering teams, and ensure resilient system evolution.',
    pillars: {
      cleanCode: {
        title: 'Clean Code & Readability First',
        description: 'Code is communication between human engineers. I am passionate about writing clean, expressive, and easily readable code—prioritizing small single-purpose functions, self-documenting naming, and zero bloat so codebases are effortless to read, review, and maintain.',
      },
      domainDriven: {
        title: 'Domain-Driven Design (DDD)',
        description: 'Decomposing complex business domains into clear bounded contexts and ubiquitous language. Isolating domain entities from technical infrastructure to ensure long-term evolutionary maintainability.',
      },
      adrGovernance: {
        title: 'ADR Governance & RFC Workflows',
        description: 'Standardizing architectural decision-making via version-controlled Architecture Decision Records (ADRs). Fostering transparent design tradeoffs, collaborative RFC reviews, and peer consensus.',
      },
      eventDriven: {
        title: 'Event-Driven Distributed Systems',
        description: 'Architecting resilient asynchronous event streaming with transactional message queues and decoupled worker meshes. Ensuring eventual consistency, ACID transaction safety, and sub-50ms query performance.',
      },
      mentorship: {
        title: 'Architect Guild & Technical Mentorship',
        description: 'Leading the cross-functional architect group at KulturIT. Guiding senior and staff engineers, establishing company-wide standards, and bridging executive strategy with everyday engineering execution.',
      },
      simplicity: {
        title: 'Pragmatic Engineering & Simplicity (KISS)',
        description: 'Favoring straightforward, maintainable solutions over speculative complexity. Eliminating dead code, unnecessary technical layers, and bloated brokers in favor of clean architectures that solve real domain problems.',
      },
    },
    quote: {
      text: 'Great architecture is not about creating the most intricate diagrams; it is about making it easy for engineering teams to make the right technical choices every single day.',
      author: 'Øyvind Volden',
      role: 'Lead Architect & Head of Architecture Group, KulturIT',
    },
  },
  experience: {
    sectionBadge: 'Career Chronology',
    title: 'Experience & Key Roles',
    subtitle: 'Over 15 years of technical leadership, enterprise architecture, and large-scale system modernization.',
    present: 'Present',
    viewHighlights: 'View Highlights',
    hideHighlights: 'Hide Highlights',
    deliverablesLabel: 'Architectural Deliverables & Impact:',
    milestones: {
      kulturit: {
        id: 'kulturit',
        role: 'Lead Architect & Head of Architecture Group',
        organization: 'KulturIT',
        period: '2018 – Present',
        summary: 'Overall architectural stewardship for the eKultur enterprise portfolio serving 100+ museums and cultural heritage institutions across Norway and Sweden. Leading the cross-product architecture group and driving cloud modernization.',
        highlights: [
          'Founded and leading the architecture group across all engineering teams at KulturIT.',
          'Architected cloud migration to Azure Kubernetes Service (AKS), Docker containers, and micro frontend ecosystems.',
          'Technical leadership for 3D heritage discovery via Three.js, IIIF 2.0/3.0 gigapixel deep-zoom, and 360° virtual rooms.',
          'Standardized Architecture Decision Records (ADRs) and spec-driven engineering workflows.',
        ],
      },
      autosys: {
        id: 'autosys',
        role: 'Lead System Architect & Tech Lead (Autosys KSAK)',
        organization: 'Statens vegvesen / Ciber Norge',
        period: '2015 – 2018',
        summary: 'Principal architect responsible for the core vehicle case management system (KSAK) in Autosys — one of the largest public sector digitalization programs in Norway.',
        highlights: [
          'Architected core system automating 100,000+ statutory vehicle registrations annually.',
          'Migrated legacy mainframe systems (COBOL) to modern distributed Java/Spring microservices.',
          'Orchestrated asynchronous enterprise event flows with zero-downtime production cutovers.',
          'Rigorous automated performance and security testing against national mission-critical SLOs.',
        ],
      },
      regelforvaltning: {
        id: 'regelforvaltning',
        role: 'Solution Architect & Tech Lead (Statutory Rule Engine)',
        organization: 'Statens vegvesen / Ciber Norge',
        period: '2012 – 2015',
        summary: 'Architect for the statutory rules engine evaluating over 11,000 legal and technical rules governing national vehicle registration and compliance with Norwegian law and EU directives.',
        highlights: [
          'Engineered a sub-second rule evaluation engine spanning multi-decade legal rule trees.',
          'Established temporal versioning and historical timelines for statutory regulation changes over 30 years.',
          'Applied Domain-Driven Design (DDD) bridging legal specialists, case handlers, and software engineers.',
          'Built comprehensive regression testing harness guaranteeing 100% deterministic rule verification.',
        ],
      },
      ciber: {
        id: 'ciber',
        role: 'Senior Consultant & Team Leader Cloud N5D',
        organization: 'Ciber Norge AS',
        period: '2011 – 2015',
        summary: 'Enterprise architecture consulting for public sector and transportation clients. Specialist in early cloud infrastructure, enterprise messaging, and large-scale web architectures.',
        highlights: [
          'Architected N5D (NOARK 5 in the cloud) on early Microsoft Azure and hybrid data centers.',
          'Engineered resilient integration layers using REST, SOAP, and message brokers (RabbitMQ, ActiveMQ).',
          'Technical mentor and active contributor across Ciber’s international architecture network.',
        ],
      },
      noark5: {
        id: 'noark5',
        role: 'Architect & Senior Developer (NOARK 5 Documentum)',
        organization: 'Statens vegvesen / Ciber',
        period: '2008 – 2011',
        summary: 'Responsible for architecture and integration of statutory records management based on the NOARK 5 standard and EMC Documentum for the Norwegian Public Roads Administration.',
        highlights: [
          'Developed NOARK 5 compliant core repository adapter for Statens vegvesen.',
          'Optimized enterprise search across millions of records using Apache Solr and Documentum DFC.',
          'Engineered verified historical export and archival workflows to the National Archives of Norway.',
        ],
      },
      mohive: {
        id: 'mohive',
        role: 'Software Engineer (e-Learning SaaS)',
        organization: 'Mohive AS / CrossKnowledge',
        period: '2006 – 2008',
        summary: 'Development of enterprise e-learning authoring SaaS platform delivered to multinational corporate clients. Focus on rich browser interaction, media processing, and scale.',
        highlights: [
          'Engineered browser-based authoring environments and digital content rendering pipelines.',
          'Implemented clientside performance optimizations and high-volume media transformation tools.',
        ],
      },
      volden: {
        id: 'volden',
        role: 'Architect & Fullstack Engineer (Sole Proprietorship)',
        organization: 'Volden',
        period: '2023 – 2024',
        summary: 'Design and fullstack implementation of bekymringsmestring.no — a specialized digital health platform for psychological mastery of anxiety and chronic worry.',
        highlights: [
          'Designed and delivered a modern, responsive web application focused on calm aesthetics and universal accessibility.',
          'Optimized for instant loading (LCP < 1.0s), strong SEO, and 100% WCAG 2.1 AA compliance.',
          'Engineered with strict zero third-party tracking scripts for unconditional patient privacy.',
        ],
      },
    },
    education: {
      badge: 'Academic Foundation & Computer Science',
      degree: "Bachelor's Degree & Graduate Coursework (Hovedfagskurs) in Informatics",
      institution: 'University of Oslo (UiO)',
      subLocation: 'Institutt for informatikk (IFI) • Oslo, Norway',
      period: '2004–2008',
      description: "Formative university education at Norway's premier computer science faculty (IFI), focusing on object-oriented software engineering, distributed algorithms, relational databases, data structures, and computer architecture.",
      highlights: [
        'Informatics (IFI)',
        'Distributed Systems',
        'Algorithms & Data Structures',
        'Database Systems',
        'Object-Oriented Design',
        'Software Architecture',
      ],
    },
  },
  projects: {
    sectionBadge: 'Featured Case Studies',
    title: 'Architectural Flagship Projects',
    subtitle: 'A curated selection of complex production platforms where architecture choices created measurable value and lasting organizational impact.',
    searchPlaceholder: 'Search by technology, client, or architectural challenge...',
    categories: {
      all: 'All Projects',
      distributed: 'Distributed Systems',
      modernization: 'Modernization',
      web3d: 'Web & 3D',
      eventDriven: 'Event-Driven',
    },
    emptyTitle: 'No case studies found',
    emptyDesc: 'Try adjusting your search query or reset category filters to view all architectural projects.',
    resetFilter: 'Reset filters',
    caseStudies: {
      bekymringsmestring: {
        id: 'bekymringsmestring',
        title: 'Bekymringsmestring: Mental Health & Mindfulness Platform',
        client: 'Volden (Sole Proprietorship)',
        period: '2020 – Present',
        summary:
          'Full-stack digital mental health platform providing guided mindfulness audio meditations, national certified instructor directory with geo-mapping, psychoeducational resources, and automated book checkout.',
        challenge:
          'Delivering a responsive, zero-PII mental health platform with seamless mobile audio playback and interactive nationwide instructor mapping, while modernizing legacy serverless extensions into hardened, bot-protected Cloud Functions before platform deprecation deadlines.',
        architectureSolution:
          'Engineered a modern serverless SPA utilizing React, Material-UI, Leaflet geo-mapping, and Firebase. Implemented fine-grained Cloud Firestore security rules with custom claims (Admin/Instructor), migrated transactional email to HTTPS callable Cloud Functions on Node 22 with Google reCAPTCHA v3 bot protection, and integrated HTML5 Web Audio API for mindfulness tracks.',
        metrics: [
          { value: 'Serverless Firebase', label: 'Cloud Architecture' },
          { value: 'reCAPTCHA + HTTPS', label: 'Bot Defense & Mail' },
          { value: 'Audio & Leaflet', label: 'Interactive Features' },
        ],
      },
      vm3d: {
        id: 'vm-3d',
        title: 'VirtueltMuseum 3D: Curated Virtual 3D Rooms & Artifacts (vm/3d)',
        client: 'KulturIT & Nordic Museums',
        period: '2021 – Present',
        summary:
          'Interactive 3D heritage platform and exhibition curation suite enabling museums to curate virtual exhibitions in customizable 3D rooms and present high-fidelity 3D artifact scans with real-time lighting and spatial interaction.',
        challenge:
          'Empowering non-technical museum curators to compose immersive 3D exhibitions—arranging artifacts in spatial 3D rooms, configuring interactive annotation hotspots, and ensuring buttery-smooth 60 FPS WebGL rendering across heterogeneous devices and mobile browsers.',
        architectureSolution:
          'Architected the vm/3d platform utilizing Three.js and React Three Fiber (@react-three/fiber). Designed a declarative curation workflow where curators position 3D photogrammetry models inside virtual 3D gallery rooms, set up spatial hotspots, and craft narrative interpretation cards. Integrated with KulturIT Python microservices and PostgreSQL asset repositories for automated glTF/GLB optimization and progressive level-of-detail (LOD) streaming.',
        metrics: [
          { value: 'R3F / Three.js', label: '3D Stack' },
          { value: '3D Virtual Rooms', label: 'Exhibition Space' },
          { value: '60 FPS WebGL', label: 'Performance' },
        ],
      },
      vm360: {
        id: 'vm-360',
        title: 'VirtueltMuseum 360: Immersive 360° Panoramic Experiences (vm/360)',
        client: 'KulturIT & Nordic Museums',
        period: '2021 – Present',
        summary:
          'Immersive panoramic exhibition curation platform allowing museums to construct guided 360° virtual tours from high-resolution equirectangular spherical captures with interconnected room transitions and rich multimedia points of interest.',
        challenge:
          'Streaming ultra-high-resolution equirectangular spherical panoramas (up to 8192x4096) without memory bloat on mobile devices, while providing museum curators an intuitive authoring tool to link panoramic rooms and place interactive hotspots.',
        architectureSolution:
          'Engineered vm/360 featuring a concurrency-pooled client batch processor that automatically slices high-resolution equirectangular captures into multi-resolution spherical dome tiles. Implemented a comprehensive tour curation suite where museum professionals link multiple 360° rooms, define directional navigation portals, and embed curated audio guides, video clips, and interpretive text.',
        metrics: [
          { value: '8192x4096', label: 'Dome Resolution' },
          { value: 'Virtual 360 Tours', label: 'Curator Suite' },
          { value: 'Tiled Domes', label: 'Streaming Engine' },
        ],
      },
      vmScrollytellingQuiz: {
        id: 'vm-scrollytelling-quiz',
        title: 'VirtueltMuseum: Scrollytelling Exhibitions & Quizzes (vm/scrollytelling & vm/quiz)',
        client: 'KulturIT & Nordic Museums',
        period: '2022 – Present',
        summary:
          'Interactive cultural storytelling and visitor gamification modules enabling Nordic museums to curate and publish digital narrative exhibitions using versatile scrollytelling templates and educational quizzes.',
        challenge:
          'Empowering museum curators to design rich, immersive editorial narrative exhibitions with multiple presentation templates (split-screen, full-bleed media chapters, thematic timelines) and interactive quiz workflows that mount seamlessly into both admin curation portals and public museum portals.',
        architectureSolution:
          'Designed vm/scrollytelling and vm/quiz as independent microfrontends in React and TypeScript. Engineered a template-driven exhibition authoring system allowing curators to select layout structures, configure scroll-triggered step synchronization and media chapter transitions, and author accessible multi-choice quiz progression backed by specialized Python Flask and PostgreSQL microservices.',
        metrics: [
          { value: 'Multiple Formats', label: 'Curator Templates' },
          { value: 'Microfrontends', label: 'Modular Units' },
          { value: 'Gamified Quizzes', label: 'Engagement' },
        ],
      },
      ekulturCookieConsent: {
        id: 'ekultur-cookie-consent',
        title: 'eKultur In-House Cookie Consent & Privacy Platform (cookie-consent-api)',
        client: 'KulturIT AS',
        period: '2023 – Present',
        summary:
          'Lightweight in-house GDPR & ePrivacy cookie consent management platform replacing costly external commercial vendors (OneTrust/Cookiebot) across 150+ Nordic cultural heritage web portals.',
        challenge:
          'Commercial consent management platforms charged exorbitant recurring multi-domain licensing fees, injected heavy tracking scripts, and lacked localized multi-language banner control and headless API access for custom cultural museum portals.',
        architectureSolution:
          'Architected and built cookie-consent-api—a high-performance, multi-tenant Python/FastAPI microservice backed by PostgreSQL. Implemented website_service and language_service for localized privacy policies, category-based script blocking/release (strictly necessary, analytical, marketing), and centralized authorization integration with authorization-api.',
        metrics: [
          { value: 'GDPR / ePrivacy', label: 'Compliance' },
          { value: '100% In-House', label: 'Vendor Cost' },
          { value: '150+', label: 'Portals Powered' },
        ],
      },
      ekulturCoreApis: {
        id: 'ekultur-core-apis',
        title: 'eKultur Domain APIs & In-House PostgreSQL Message Queue',
        client: 'KulturIT AS',
        period: '2018 – Present',
        summary:
          'Central microservices ecosystem powering 150+ Nordic cultural institutions with FastAPI, SQLAlchemy 2.0, and a custom in-house transactional message queue in PostgreSQL.',
        challenge:
          'Decoupling multi-tenant museum domain operations across hundreds of independent institutions while avoiding external broker operational complexity and ensuring absolute ACID consistency.',
        architectureSolution:
          'Engineered core domain APIs (app-registry-api for loop-free tenant routing, broadcast-api for Server-Sent Events with ETag caching, museum-api, user-directory-sync with MS Graph, helpdesk-sync with Freshservice). Built a custom transactional message queue directly in PostgreSQL, eliminating external message brokers (no RabbitMQ) while guaranteeing transactionally safe task dispatch and asynchronous background processing.',
        metrics: [
          { value: '150+', label: 'Institutions' },
          { value: 'PostgreSQL', label: 'Message Queue' },
          { value: 'SSE / Push', label: 'Event Streaming' },
        ],
      },
      ekulturMfeMonorepo: {
        id: 'ekultur-mfe-monorepo',
        title: 'eKultur Microfrontends & Shared Modules Monorepo (30+ Packages)',
        client: 'KulturIT AS',
        period: '2019 – Present',
        summary:
          'Comprehensive Turborepo monorepo publishing 30+ shared NPM packages, design systems, and microfrontends unifying the entire eKultur web application ecosystem.',
        challenge:
          'Maintaining consistent institutional branding, single sign-on (SSO) session states, and shared interactive components across dozens of standalone web applications developed over multiple decades.',
        architectureSolution:
          'Architected the @ekultur/kit-modules Turborepo monorepo. Created @ekultur/header-microfrontend (universal top shell with app switching and live broadcast notices), @ekultur/ekultur-mui (Material UI v6/v7 design system), @ekultur/authentication (token proxies for Zitadel and Entra ID), @ekultur/dms-uppy-upload (resumable multi-file uploads), and standalone CloudFront CDN bundles.',
        metrics: [
          { value: '30+ Packages', label: 'Monorepo Scope' },
          { value: 'Header MFE', label: 'Universal Shell' },
          { value: 'MUI v6/v7', label: 'Design System' },
        ],
      },
      ekulturSsoAuth: {
        id: 'ekultur-sso-auth',
        title: 'eKultur Central SSO & OAuth2 Infrastructure',
        client: 'KulturIT AS',
        period: '2019 – Present',
        summary:
          'Centralized Single Sign-On (SSO) OAuth2 authentication and granular authorization ecosystem serving all eKultur applications across 150+ Nordic cultural institutions.',
        challenge:
          'Unifying authentication and user identity across diverse legacy and modern web applications while phasing out third-party cookies, ensuring strict CSRF protection, and orchestrating centralized multi-tenant organization authorization (RBAC).',
        architectureSolution:
          'Architected and implemented the central OAuth2 Authorization Code flow with auths-backend (Python) and auths-frontend (React on login.ekultur.org). Authored ADR 001 eliminating third-party cookies via SameSite refresh token cookies and partitioned token storage. Engineered authorization-api to enforce multi-tenant role-based access control (RBAC), organization-scoped permissions, and API key management across the entire ecosystem.',
        metrics: [
          { value: 'OAuth2 / OIDC', label: 'Protocol' },
          { value: 'First-Party Cookies', label: 'Security ADR (ADR 001)' },
          { value: 'RBAC Engine', label: 'Authorization' },
        ],
      },
      ekulturHandover: {
        id: 'ekultur-handover',
        title: 'eKultur Handover: E-ARK National Digital Preservation Pipeline',
        client: 'KulturIT & National Library of Norway',
        period: '2023 – Present',
        summary:
          'High-throughput, asynchronous digital preservation pipeline orchestrating the packaging, validation, and legal deposit transmission of Nordic cultural heritage to Nasjonalbiblioteket (National Library of Norway).',
        challenge:
          'Preserving millions of high-resolution digital master assets and relational catalog records in strict compliance with the international E-ARK Archival Information Package (AIP) specification without service interruption or data loss.',
        architectureSolution:
          'Architected an 8-worker decoupled asynchronous processing mesh coordinated via Python 3.12 / FastAPI and WebSockets. Integrated Java 25 E-ARK generation with METS and Dublin Core XML schemas, streaming multi-gigabyte archival packages directly to National Library storage via AWS S3 multipart uploads.',
        metrics: [
          { value: '10M+', label: 'Preserved Artifacts' },
          { value: '8 Workers', label: 'Worker Architecture' },
          { value: 'E-ARK AIP', label: 'Archival Standard' },
        ],
      },
      ekulturAiVision: {
        id: 'ekultur-ai-vision',
        title: 'eKultur AI Vision: Automated Museum Collection Enrichment & OCR',
        client: 'KulturIT AS',
        period: '2024 – Present',
        summary:
          'Asynchronous artificial intelligence and computer vision service automating optical character recognition (OCR), manuscript transcription, and semantic tagging for historical museum collections.',
        challenge:
          'Processing millions of digitized historical manuscripts, handwritten records, and photographic artifacts without overwhelming external API rate limits or blocking synchronous catalog workflows.',
        architectureSolution:
          'Designed an asynchronous event-driven FastAPI microservice integrating Google Cloud Vision API with rate-limiting backpressure, Pillow image pipeline optimization, and AWS S3/Boto3 storage. Queued and dispatched tasks using an in-house transactional message queue in PostgreSQL. Transcribed texts and AI semantic labels are indexed into Solr and PostgreSQL for instant full-text search.',
        metrics: [
          { value: 'Google Cloud Vision', label: 'Image Engine' },
          { value: 'Asynchronous', label: 'Processing Mode' },
          { value: 'PostgreSQL Queue', label: 'Queue Engine' },
        ],
      },
      autosysKsak: {
        id: 'autosys-ksak',
        title: 'Autosys KSAK: National Vehicle Approvals Modernization',
        client: 'Statens vegvesen',
        period: '2015 – 2018',
        summary:
          'Nationwide digital transformation of individual vehicle approvals and safety modifications for the Norwegian transport authority.',
        challenge:
          'Nationwide vehicle inspection stations relied on paper dossiers and terminal-based legacy mainframes, requiring weeks for vehicle certification.',
        architectureSolution:
          'Architected modern service-oriented architecture with Spring Boot REST microservices, Oracle Autosys database integration, and high-contrast, keyboard-optimized React web applications.',
        metrics: [
          { value: '100k+', label: 'Annual Approvals' },
          { value: '-70%', label: 'Inspection Cycle' },
          { value: '70+', label: 'Nationwide Stations' },
        ],
      },
      regelforvaltningEngine: {
        id: 'regelforvaltning-engine',
        title: 'Statens vegvesen Automated Regulatory Rule Engine',
        client: 'Statens vegvesen',
        period: '2012 – 2015',
        summary:
          'Mission-critical automated regulatory engine evaluating complex Norwegian road, transport, and vehicular legislation across nationwide registries.',
        challenge:
          'Over 11,000 regulatory legal rules with overlapping constraints and frequent legislative amendments required manual human inspection, creating massive administrative backlogs.',
        architectureSolution:
          'Engineered a deterministic, high-throughput legal decision engine using Java 8 streams and rule execution pipelines paired with an enterprise React/Flux frontend for legal experts.',
        metrics: [
          { value: '11,000+', label: 'Rules Evaluated' },
          { value: '< 25ms', label: 'Decision Latency' },
          { value: '94%', label: 'Automation Rate' },
        ],
      },
      ciberCloudN5d: {
        id: 'ciber-cloud-n5d',
        title: 'Ciber N5D: Cloud-Native Noark 5 & Modernization',
        client: 'Ciber Norge AS',
        period: '2013 – 2015',
        summary:
          'Cloud modernization and containerization of NOARK 5 enterprise recordkeeping solutions for Norwegian public sector organizations, combined with consultant team leadership.',
        challenge:
          'Traditional records management systems were monolithic on-premise installations with prolonged release cycles. The goal was to build a multi-tenant cloud offering (N5D) meeting strict National Archives standards.',
        architectureSolution:
          'Designed cloud infrastructure on Microsoft Azure using Docker and Kubernetes (AKS), automated CI/CD pipelines, and built integration adapters using REST, SOAP, and message queues for hybrid enterprise datacenters.',
        metrics: [
          { value: '-40%', label: 'TCO Reduction' },
          { value: '100%', label: 'Noark 5 Compliance' },
          { value: 'Daily', label: 'Automated CI/CD Releases' },
        ],
      },
      documentumNoark5: {
        id: 'documentum-noark5',
        title: 'Documentum NOARK 5: Core Recordkeeping Engine',
        client: 'Statens vegvesen / Ciber',
        period: '2008 – 2013',
        summary:
          'Architecture, integration core, and search infrastructure for Statens vegvesen enterprise records management platform based on the NOARK 5 standard and EMC Documentum.',
        challenge:
          'Managing tens of millions of public case records with strict legal compliance, security classifications, long-term preservation standards, and enterprise-wide sub-second search throughput.',
        architectureSolution:
          'Developed a certified NOARK 5 archive core interfacing EMC Documentum repository via DFC, deployed Apache Solr distributed search clusters for sub-50ms full-text retrieval, and engineered asynchronous message bus integrations with JMS/ActiveMQ.',
        metrics: [
          { value: '10M+', label: 'Archived Records' },
          { value: '< 50ms', label: 'Search Latency via Solr' },
          { value: '100%', label: 'NOARK 5 Certified' },
        ],
      },
    },
    labels: {
      challenge: 'Technical Challenge',
      solution: 'Architectural Solution',
      verifiedImpact: 'Verified Impact',
      techStack: 'Technology Stack',
      visitSystem: 'Visit System',
      exploreCode: 'Explore Code',
    },
  },
  skills: {
    sectionBadge: 'Technology Arsenal',
    title: 'Core Competencies & Methodology',
    subtitle: 'A structured matrix of architectural disciplines, programming paradigms, and infrastructure platforms applied in production.',
    quadrants: {
      architecture: {
        title: 'Architecture & Strategy',
        description: 'Strategic system design, architecture governance, Domain-Driven Design, and technical team leadership.',
      },
      languages: {
        title: 'Languages & Frameworks',
        description: 'Modern type-safe programming languages and robust frameworks for enterprise backend and frontend systems.',
      },
      cloud: {
        title: 'Cloud, Platforms & DevOps',
        description: 'Container orchestration, infrastructure as code, automated delivery pipelines, and cloud telemetry.',
      },
      data: {
        title: 'Data, Search & Messaging',
        description: 'Enterprise message brokers, search engines, relational persistence, and distributed event streams.',
      },
    },
    levels: {
      expert: 'Expert',
      advanced: 'Advanced',
      proficient: 'Proficient',
    },
  },
  contact: {
    sectionBadge: 'Get in Touch',
    title: 'Let’s Discuss Architecture',
    subtitle: 'Reach out for dialogue regarding systems architecture, technical leadership, or upcoming engineering opportunities.',
    availabilityBadge: 'Available for strategic advisory & dialogue',
    emailCardTitle: 'Direct Email',
    emailCardDesc: 'Send an inquiry directly to my inbox. Typically respond within 24 hours.',
    copyEmail: 'Copy Email Address',
    emailCopiedToast: 'Email copied to clipboard',
    copyFailedToast: 'Failed to copy email automatically',
    cvCardTitle: 'Comprehensive CV',
    cvCardDesc: 'Review complete career trajectory, technical certifications, and formal education.',
    openCvButton: 'Open Full CV',
    socialCardTitle: 'Professional Networks',
    socialCardDesc: 'Connect on LinkedIn or explore open-source engineering repositories on GitHub.',
    connectLinkedIn: 'LinkedIn Profile',
    exploreGitHub: 'GitHub Profile',
  },
  manifest: {
    modalTitle: 'Curriculum Vitae • Executive Summary',
    roleSubtitle: 'Lead Architect & Tech Lead • Head of Architect Group at KulturIT',
    location: 'Lillehammer, Norway',
    printCv: 'Print / PDF',
    printAriaLabel: 'Print or Save as PDF',
    saveAsPdf: 'Save as PDF',
    closeDrawer: 'Close CV Manifest Drawer',
    sections: {
      profileSummary: 'Executive Profile',
      careerChronology: 'Professional Experience',
      flagshipProjects: 'Key Architectural Case Studies',
      coreCompetencies: 'Core Competencies & Stack',
      academicFoundation: 'Education & Academic Foundation',
    },
    profileText: [
      'Lead Architect and Head of Architecture Group at KulturIT with over 15 years of technical leadership designing and scaling mission-critical IT solutions.',
      'Extensive background across Norwegian public and private sectors, including major modernization programs such as Autosys KSAK and national statutory rule engines for Statens vegvesen, as well as cloud-native heritage platforms for Nordic museums.',
      'Passionate advocate of clean code, pragmatic Domain-Driven Design, open standards, end-to-end type safety, and strong engineering communities.',
    ],
    educationTitle: 'Education',
    educationDegree: 'Cand.Mag. in Computer Science',
    educationSchool: 'University of Oslo (UiO)',
    educationPeriod: '2004 – 2008',
    educationDescription: 'Four-year university degree focusing on distributed systems, software architecture, algorithms, and relational databases.',
    printNotice: 'Exported from oyvind.volden.family • 1-click printer and PDF-friendly edition',
  },
};
