import { CareerMilestone } from '../shared/types';

export const experienceCatalog: CareerMilestone[] = [
  {
    id: 'kulturit',
    period: '2018–Present',
    role: 'Lead Architect & Tech Lead • Head of Architect Group',
    company: 'KulturIT AS',
    location: 'Lillehammer, Norway',
    badge: 'Current Leadership',
    summary:
      'Serving as Lead Architect establishing company-wide technical vision and heading the Architect Group. Leading cross-functional architectural governance, Domain-Driven Design (DDD), and modern microservice architectures safeguarding over 10 million digital cultural heritage records across Norway and Sweden.',
    architectureHighlights: [
      'Architect Group Governance: Instituted company-wide Architecture Decision Records (ADRs), cross-team architectural reviews, RFC workflows, and unified coding standards.',
      'National Preservation Pipeline: Architected the eKultur Handover asynchronous pipeline (FastAPI, 8-worker mesh, Java 25 E-ARK AIP generation, AWS S3 multipart streaming) transferring cultural records to Nasjonalbiblioteket.',
      'Multi-Tenant Gateway & Ingress: Deployed Ambassador / Envoy API Gateway across AWS EKS clusters (c03, c05, c06) with OpenTelemetry tracing, loop-free tenant resolution (app-registry-api), and SSE streaming (broadcast-api).',
      'Curated Digital Heritage (VirtueltMuseum): Architected the modular exhibition curation suite empowering Nordic museums to curate immersive exhibitions—authoring virtual 3D rooms (vm/3d), interactive 360° panoramic tours (vm/360), rich multimedia scrollytelling with diverse templates (vm/scrollytelling), and gamified educational quizzes (vm/quiz).',
      'eKultur APIs, Privacy & Auth: Designed and authored core multi-tenant domain APIs in FastAPI (app-registry-api, broadcast-api, museum-api), the central SSO OAuth2 suite (auths-backend, auths-frontend, authorization-api), our lightweight in-house cookie consent management platform (cookie-consent-api), and a custom in-house transactional message queue in PostgreSQL.',
    ],
    technologies: [
      'Python 3.12',
      'FastAPI',
      'React 19 / Next.js',
      'TypeScript',
      'Three.js / React Three Fiber',
      'AWS EKS',
      'Ambassador / Envoy',
      'E-ARK / Java 25',
      'Virtual 3D & 360 Curation',
      'PostgreSQL Message Queue',
      'cookie-consent-api',
      'OpenTelemetry',
    ],
  },
  {
    id: 'autosys-ksak',
    period: '2016–2018',
    role: 'Senior System Architect & Full-Stack Lead',
    company: 'Statens vegvesen (Norwegian Public Roads Administration)',
    location: 'Lillehammer, Norway',
    summary:
      'Architected the national individual vehicle approvals platform (Autosys KSAK), modernizing mission-critical transport infrastructure from legacy paper workflows into an automated high-throughput digital service.',
    architectureHighlights: [
      'High-Throughput Digitalization: Built core workflow handling 100,000+ national vehicle approvals and technical modifications annually.',
      'Resilient Enterprise Integration: Architected fault-tolerant integrations between modern Spring Boot backends and legacy Oracle Autosys databases.',
      'Modern Frontend Architecture: Designed responsive, keyboard-accessible React web interfaces used by nationwide vehicle inspectors.',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'Oracle Database', 'REST APIs', 'Enterprise Integration Patterns'],
  },
  {
    id: 'regelforvaltning',
    period: '2014–2016',
    role: 'Lead Architect & Tech Lead',
    company: 'Statens vegvesen',
    location: 'Oslo, Norway',
    summary:
      'Led the architecture and technical execution of Regelforvaltning, a mission-critical automated regulatory engine evaluating complex Norwegian road and vehicle laws across national vehicle registries.',
    architectureHighlights: [
      'High-Performance Rules Evaluation: Modeled and deployed an automated rule engine managing over 11,000+ complex regulatory road, vehicle, and safety laws.',
      'Reactive Client Architecture: Spearheaded early enterprise adoption of React and Flux architecture in the Norwegian public sector.',
      'Deterministic Processing: Streamlined complex legal dependencies into deterministic Java 8 rule processing pipelines.',
    ],
    technologies: ['React', 'Flux', 'Java 8', 'RESTful Services', 'Rules Engines', 'Domain Modeling'],
  },
  {
    id: 'ciber-cloud',
    period: '2013–2014',
    role: 'Senior Consultant & Team Leader',
    company: 'Ciber Norge',
    location: 'Oslo, Norway',
    summary:
      'Served as Senior Consultant combined with an administrative middle-management assignment—carrying direct personnel responsibility and employee follow-ups for a team of consultants alongside hands-on enterprise cloud architecture, containerization, and public sector modernization (N5D).',
    architectureHighlights: [
      'Administrative Team Leadership: Held administrative personnel responsibility for a dedicated team of consultants—overseeing consultant follow-ups, mentoring, and team development alongside active consulting engagements.',
      'Cloud Modernization: Designed and deployed Azure Kubernetes (AKS) and Docker container infrastructure for enterprise clients.',
      'CI/CD Automation: Introduced automated test pipelines and declarative infrastructure-as-code deployments.',
    ],
    technologies: ['Azure', 'Kubernetes', 'Docker', 'C#', '.NET Core', 'CI/CD Pipelines', 'Engineering Leadership'],
  },
  {
    id: 'noark-documentum',
    period: '2010–2013',
    role: 'System Architect & Integration Engineer',
    company: 'Ciber / Public Sector Archive Solutions',
    location: 'Oslo, Norway',
    summary:
      'Architected enterprise records management and archive platforms compliant with the national NOARK 5 archive standard and Riksarkivet regulations.',
    architectureHighlights: [
      'National Archive Compliance: Delivered NOARK 5 certified integration core utilizing EMC Documentum content repositories.',
      'High-Performance Search: Integrated Apache Solr indexing clusters handling multi-million record enterprise archive queries in under 50ms.',
      'Enterprise Messaging: Orchestrated asynchronous document routing and archiving pipelines via Java Message Service (JMS) and ActiveMQ.',
    ],
    technologies: ['EMC Documentum', 'Apache Solr', 'Java EE', 'ActiveMQ', 'JMS', 'NOARK 5'],
  },
  {
    id: 'mohive-saas',
    period: '2007–2010',
    role: 'Software Engineer & Architecture Lead',
    company: 'Mohive AS (now CrossKnowledge)',
    location: 'Oslo, Norway',
    summary:
      'Developed high-availability, multi-tenant e-Learning publishing SaaS platform deployed globally for Fortune 500 enterprises.',
    architectureHighlights: [
      'Global Multi-Tenant Cloud SaaS: Architected content authoring engine serving millions of enterprise learners worldwide.',
      'Cross-Platform Innovation: Engineered early native iOS media applications and distributed .NET content generation pipelines.',
    ],
    technologies: ['.NET', 'C#', 'SQL Server', 'iOS / Objective-C', 'SaaS Architecture'],
  },
];
