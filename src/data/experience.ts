export type TechTag = {
  label: string
  level: 'hi' | 'mid' | 'lo' | 'default'
}

export type Card = {
  company: string
  role: string
  period: string
  bullets: string[]
  tech: TechTag[]
}

export type ProjectLink = {
  label: string
  url: string
  variant: 'primary' | 'secondary'
}

export type Project = {
  id: string
  number: string
  pipColor: string
  titleFirst: string
  titleSecond: string
  name: string
  tagline: string
  why: string
  how: string
  tech: TechTag[]
  links: ProjectLink[]
}

export type Domain = {
  id: string
  number: string
  pipColor: string
  titleFirst: string
  titleSecond: string
  cols: 2 | 3
  cards: Card[]
}

export const domains: Domain[] = [
  {
    id: 'ai',
    number: '01',
    pipColor: 'var(--terra)',
    titleFirst: 'AI',
    titleSecond: 'Engineering',
    cols: 2,
    cards: [
      {
        company: 'Steamops · Remote',
        role: 'Senior AI Integration Engineer',
        period: 'July 2025 – Present',
        bullets: [
          'Built conversational AI bots as customer service agents over voice and chat',
          'Integrated external APIs into AI agents to interact with external systems',
          'Maintained AWS services: SES, Lambda, EC2',
        ],
        tech: [
          { label: 'Claude AI', level: 'hi' },
          { label: 'Python', level: 'hi' },
          { label: 'FastAPI', level: 'mid' },
          { label: 'AWS', level: 'default' },
        ],
      },
      {
        company: 'Freelance · Remote',
        role: 'AI Agent & Systems Developer',
        period: '2021 – Present',
        bullets: [
          'Full-stack bakery chain management app — NestJS + React, full ownership from UI to CI/CD',
          'Cinema backend microservices — SpringBoot + Apache Kafka for async event-driven workflows',
        ],
        tech: [
          { label: 'LangChain', level: 'hi' },
          { label: 'NestJS', level: 'mid' },
          { label: 'Kafka', level: 'default' },
          { label: 'SpringBoot', level: 'default' },
        ],
      },
    ],
  },
  {
    id: 'software',
    number: '02',
    pipColor: 'var(--teal2)',
    titleFirst: 'Software',
    titleSecond: 'Engineering',
    cols: 3,
    cards: [
      {
        company: 'Maxicompra · Remote',
        role: 'Fullstack Developer',
        period: 'May 2023 – June 2025',
        bullets: [
          'E-commerce modules for finance reporting, inventory, and sales management',
          'In-memory DB systems for product import pipelines',
          'CI/CD with Jenkins across multiple teams',
        ],
        tech: [
          { label: 'React/Next', level: 'mid' },
          { label: 'Laravel', level: 'default' },
          { label: 'Jenkins', level: 'default' },
        ],
      },
      {
        company: 'Pixela · Remote',
        role: 'Fullstack & DevOps Engineer',
        period: 'Jul – Oct 2025',
        bullets: [
          'CI/CD systems with GitHub Actions',
          'AWS: Elastic Beanstalk, RDS, Fargate, EC2',
        ],
        tech: [
          { label: 'AWS', level: 'mid' },
          { label: 'GH Actions', level: 'default' },
          { label: 'Docker', level: 'default' },
        ],
      },
      {
        company: 'CICS · CUNOC-USAC',
        role: 'Fullstack Dev & Designer',
        period: '2022 – Present',
        bullets: [
          'COMPDES platform — Java/SpringBoot + Nuxt 3, QR-based attendee tracking',
          'CICS-APP — Vue/Nuxt + NestJS with ACL, auth, and DB management',
          'Visual identity for School of Engineering',
        ],
        tech: [
          { label: 'Vue/Nuxt', level: 'mid' },
          { label: 'NestJS', level: 'default' },
          { label: 'Figma', level: 'default' },
        ],
      },
    ],
  },
  {
    id: 'research',
    number: '03',
    pipColor: '#6b92ef',
    titleFirst: 'Research',
    titleSecond: '& Academia',
    cols: 2,
    cards: [
      {
        company: 'DIGI · USAC',
        role: 'Medical Imaging Researcher',
        period: '2026',
        bullets: [
          'DICOM tomography refinement for 3D bone printing — Hospital Regional de Occidente',
          'Python + R pipelines for noise reduction and artifact refinement',
          '3D reconstruction with InVesalius 3 and Meshmixer',
        ],
        tech: [
          { label: 'Python', level: 'hi' },
          { label: 'R', level: 'default' },
          { label: 'DICOM', level: 'default' },
          { label: 'InVesalius', level: 'default' },
        ],
      },
      {
        company: 'CUNOC-USAC',
        role: 'Compilers Teaching Assistant',
        period: '2025',
        bullets: [
          'Designed learning projects covering lexical, syntax, and semantic analysis',
          'Developed methodology: slides, programming examples, and guided exercises',
        ],
        tech: [
          { label: 'Compiler Design', level: 'default' },
          { label: 'Jison', level: 'default' },
          { label: 'Java', level: 'default' },
        ],
      },
    ],
  },
]

export const skills = {
  hi:      ['Python', 'TypeScript', 'Claude AI', 'LangChain'],
  mid:     ['NestJS', 'FastAPI', 'Vue/Nuxt', 'React/Next'],
  lo:      ['AWS · GCP', 'Docker · Jenkins'],
  default: ['PostgreSQL · Redis', 'Java · PHP · Bash'],
}

export const education = [
  {
    degree: 'BSc Computer Science & Information Systems',
    institution: 'Universidad de San Carlos de Guatemala · CUNOC',
    period: '2020 – 2025 · Score: 80/100',
    labelColor: 'var(--amber)',
    label: 'Education',
  },
  {
    degree: 'MA Computer Science & Data Science',
    institution: 'Universidad de San Carlos de Guatemala',
    period: '2026 – Expected 2027',
    labelColor: 'var(--teal2)',
    label: 'Continuing',
  },
]

export const projects: Project[] = [
  {
    id: 'compdes',
    number: '04',
    pipColor: 'var(--terra)',
    titleFirst: 'COMPDES',
    titleSecond: 'Platform',
    name: 'COMPDES',
    tagline: 'Conference management platform · CUNOC 2025',
    why: 'The engineering faculty needed to move its annual conference off spreadsheets and paper sign-ins. Hundreds of attendees, multiple tracks, and certificate issuance had to be coordinated reliably in a single day.',
    how: 'Built a full-stack platform with SpringBoot + Nuxt 3 — QR-based check-in at entry, real-time session occupancy tracking, and automated certificate generation on attendance confirmation. Deployed and ran live for the 2025 event.',
    tech: [
      { label: 'SpringBoot', level: 'hi' },
      { label: 'Nuxt 3',     level: 'mid' },
      { label: 'Vue',        level: 'mid' },
      { label: 'PostgreSQL', level: 'default' },
    ],
    links: [{ label: 'Live site →', url: 'https://compdes.cunoc.edu.gt', variant: 'primary' }],
  },
  {
    id: 'cics',
    number: '05',
    pipColor: 'var(--teal2)',
    titleFirst: 'CICS',
    titleSecond: 'App',
    name: 'CICS App',
    tagline: 'Academic management system · CUNOC CS Dept.',
    why: 'The Computer Science department had no unified digital workspace — student records, club activity, and admin tasks lived in disconnected tools. Faculty and students needed a single platform with proper access control.',
    how: 'Designed and built the full stack with Vue/Nuxt on the frontend and NestJS on the backend, with a role-based ACL system covering three actor types (students, faculty, admins). Owns the visual identity of the department as well.',
    tech: [
      { label: 'NestJS',     level: 'hi' },
      { label: 'Vue/Nuxt',   level: 'mid' },
      { label: 'PostgreSQL', level: 'default' },
      { label: 'Figma',      level: 'default' },
    ],
    links: [{ label: 'Live site →', url: 'https://cics.cunoc.edu.gt/estudiantes/', variant: 'primary' }],
  },
  {
    id: 'archiver',
    number: '06',
    pipColor: 'var(--amber)',
    titleFirst: 'Archiver',
    titleSecond: 'RAG',
    name: 'Archiver RAG',
    tagline: 'Agent-agnostic knowledge memory via Obsidian + MCP',
    why: 'AI agents are stateless by default — every conversation starts cold. Existing memory solutions are either agent-specific or require a hosted service. The goal was persistent, queryable memory that any MCP-compatible agent can access without leaving its native interface.',
    how: 'Indexes an Obsidian vault into ChromaDB with a three-layer retrieval strategy: contextual embeddings, rich metadata filtering, and graph reranking by wikilink proximity. Exposes a standard MCP server so Claude Code, Cursor, or any compatible client gets semantic search, auto-linking, and vault health out of the box.',
    tech: [
      { label: 'Python',    level: 'hi' },
      { label: 'ChromaDB',  level: 'mid' },
      { label: 'MCP',       level: 'mid' },
      { label: 'Claude AI', level: 'default' },
    ],
    links: [{ label: 'GitHub →', url: 'https://github.com/FernandoJRR/archiver-rag', variant: 'secondary' }],
  },
]
