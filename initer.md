# Portfolio Site — Build Spec (Astro / GitHub Pages)

## Project Setup

```bash
npm create astro@latest portfolio -- --template minimal --typescript strict --no-git
cd portfolio
npx astro add sitemap
```

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://FernandoJRR.github.io',
  base: '/portfolio',
})
```

GitHub Actions — create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## File Structure

```
portfolio/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .github/
│   └── workflows/
│       └── deploy.yml
└── src/
    ├── pages/
    │   └── index.astro          ← page assembly
    ├── components/
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── HeroArt.astro        ← SVG geometric composition
    │   ├── StatsBand.astro
    │   ├── DomainIntro.astro    ← reusable section header
    │   ├── CardsGrid.astro      ← reusable grid wrapper
    │   ├── Card.astro           ← reusable experience card
    │   ├── GeoInterstitial.astro
    │   ├── EducationBand.astro
    │   ├── SkillsBand.astro
    │   └── Footer.astro
    ├── data/
    │   └── experience.ts
    └── styles/
        └── global.css
```

---

## Design System

### Color tokens — `src/styles/global.css`

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:    #12110f;
  --s1:    #181510;
  --s2:    #1f1c16;
  --s3:    #27231b;
  --cream: #e8e0cc;
  --terra: #c45c35;
  --teal:  #2d7b78;
  --teal2: #4aaba6;
  --amber: #c98b2a;
  --navy:  #1e2d45;
  --muted: #6a6255;
  --brd:   2px solid rgba(232, 224, 204, 0.13);
}

html { background: #12110f; }
body {
  background: var(--bg);
  color: var(--cream);
  font-family: system-ui, -apple-system, sans-serif;
}
button { font-family: inherit; cursor: pointer; border-radius: 0; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
```

### Typography
- All labels, tags, nav items: `text-transform: uppercase`, `letter-spacing: 0.18em+`, `font-size: 9–11px`
- Section titles: `text-transform: uppercase`, `font-size: clamp(28px, 4vw, 40px)`, `font-weight: 500`
- Hero name: `text-transform: uppercase`, `font-size: clamp(44px, 7vw, 64px)`, `font-weight: 500`, `line-height: 0.94`
- Body/bullets: `font-size: 11px`, `line-height: 1.75`, `color: var(--muted)`

### Rules
- No `border-radius` anywhere — hard edges only
- All section dividers: `var(--brd)` = `2px solid rgba(232, 224, 204, 0.13)`
- Dark backgrounds only — no light mode
- No external CSS frameworks or component libraries

---

## Data — `src/data/experience.ts`

```typescript
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
```

---

## Component Specs

### `Nav.astro`

```
Layout: flex row, full width
  background: var(--s1)
  border-bottom: var(--brd)

Left — brand mark:
  Flex row, align-items center, gap 10px, padding 12px 20px
  border-right: var(--brd)

  Dot glyph — CSS grid 3×3, 6px cells, 1.5px gap:
    Position [row,col]: (1,1)=teal2  (1,2)=empty  (1,3)=cream
                        (2,1)=empty  (2,2)=amber   (2,3)=empty
                        (3,1)=cream  (3,2)=empty   (3,3)=teal2
    Each dot: display block, 6px × 6px

  Name: "F. Rodríguez"
    font-size 11px, font-weight 500, letter-spacing 0.2em, uppercase

Right — nav links (margin-left auto):
  Flex row, list-style none
  Items: Work | About | Lab | Contact
  Each: padding 12px 16px, font-size 9px, letter-spacing 0.2em, uppercase
        color var(--muted), border-left var(--brd)
  Active item (Work): background var(--amber), color var(--bg)
  Hover: color var(--cream), background var(--s2), transition 120ms
```

---

### `Hero.astro`

```
Layout: CSS grid, grid-template-columns 5fr 3fr
  min-height: 320px
  border-bottom: var(--brd)

Left column:
  background: var(--s1)
  border-right: var(--brd)
  padding: 40px 28px 36px
  display flex, flex-direction column, justify-content space-between

  Top block:
    Eyebrow: "Senior AI Integration Engineer · GT"
      font-size 9px, letter-spacing 0.26em, uppercase, color var(--muted)
      margin-bottom 20px
      Flex row with prefix line:
        ::before — width 22px, height 1.5px, background var(--terra)

    h1 — hero name:
      font-size clamp(44px, 6vw, 52px), font-weight 500
      text-transform uppercase, line-height 0.94
      Line 1: "Fer" (cream) + "nan" (var(--terra))
      Line 2: "do" (var(--amber))
      Line 3: "Rodrí" (cream) + "guez" (var(--terra))
      Each colored segment wrapped in <span>

    Role paragraph:
      "Building production AI agents, fullstack systems, and cloud
       infrastructure. Based in Quetzaltenango, Guatemala."
      font-size 11px, color var(--muted), line-height 1.9
      margin-top 20px, max-width 280px

  Bottom block:
    Two buttons, flex row, gap 8px, margin-top 28px
    Primary "Get in touch →":
      background var(--amber), color var(--bg)
      padding 9px 20px, font-size 9px, letter-spacing 0.18em, uppercase
      border none
    Secondary "View projects":
      background transparent
      border 1px solid rgba(232,224,204,0.22)
      color var(--muted)
      same padding/font as primary

Right column:
  Renders <HeroArt /> filling full column height
  position relative, overflow hidden, background var(--navy)

  Label bar at bottom:
    position absolute, bottom 0, left 0, right 0
    padding 10px 16px
    font-size 8px, letter-spacing 0.2em, uppercase
    color rgba(232,224,204,0.3)
    border-top var(--brd)
    background rgba(18,17,15,0.4)
    Text: "Identity system · 2025"
```

---

### `HeroArt.astro`

```
Inline SVG, aria-hidden="true"
viewBox="0 0 340 320"
preserveAspectRatio="xMidYMid slice"
width="100%" height="100%"
style="display:block; position:absolute; inset:0"

Elements in paint order:
 1. <rect width="340" height="320" fill="#1e2d45"/>
 2. <rect x="0" y="0" width="170" height="160" fill="#12110f" opacity="0.55"/>
 3. <rect x="170" y="160" width="170" height="160" fill="#2d7b78" opacity="0.4"/>
 4. <circle cx="170" cy="160" r="105" fill="none" stroke="#e8e0cc" stroke-width="0.6" opacity="0.1"/>
 5. <circle cx="170" cy="160" r="72" fill="none" stroke="#e8e0cc" stroke-width="0.4" opacity="0.08"/>
 6. <circle cx="122" cy="130" r="68" fill="#c45c35" opacity="0.82"/>
 7. <circle cx="214" cy="188" r="68" fill="#2d7b78" opacity="0.72"/>
 8. <circle cx="168" cy="159" r="38" fill="#12110f" opacity="0.75"/>
 9. <circle cx="168" cy="159" r="20" fill="#c98b2a"/>
10. <circle cx="168" cy="159" r="7" fill="#1e2d45"/>
11. <line x1="0" y1="160" x2="340" y2="160" stroke="#e8e0cc" stroke-width="0.5" opacity="0.1"/>
12. <line x1="170" y1="0" x2="170" y2="320" stroke="#e8e0cc" stroke-width="0.5" opacity="0.1"/>
13. <circle cx="240" cy="72" r="7" fill="#e8e0cc" opacity="0.3"/>
14. <circle cx="90" cy="252" r="5" fill="#c98b2a" opacity="0.4"/>
15. <circle cx="300" cy="240" r="12" fill="none" stroke="#c98b2a" stroke-width="0.8" opacity="0.3"/>
```

---

### `StatsBand.astro`

```
Layout: CSS grid, grid-template-columns repeat(4, 1fr)
  border-bottom: var(--brd)

All cells: padding 20px, border-right var(--brd)
  Last cell: border-right none

Cell 1–3 — background var(--s1):
  Number: font-size 36px, font-weight 500, color var(--cream), line-height 1
    Superscript "+": font-size 14px, color var(--terra), vertical-align super
  Label: font-size 9px, letter-spacing 0.16em, uppercase, color var(--muted), margin-top 5px

  Values:
    Cell 1: "5+" / "Years experience"
    Cell 2: "12+" / "Projects shipped"
    Cell 3: "4+" / "AI agents in prod"

Cell 4 — background var(--s2):
  Status: "Open to work"
    font-size 13px, uppercase, letter-spacing 0.1em, color var(--amber), margin-top 6px
  Sub: "New projects · 2025"
    font-size 9px, color var(--muted)
```

---

### `DomainIntro.astro`

```
Props interface:
  number: string
  pipColor: string
  titleFirst: string
  titleSecond: string

Layout: padding 28px 28px 0, background var(--bg)

Eyebrow row — flex, align-items center, gap 10px, margin-bottom 6px:
  Pip: 8px × 8px square, background = pipColor (inline style)
  Label: "{number} — Domain"
    font-size 9px, letter-spacing 0.26em, uppercase, color var(--muted)

Title div:
  "{titleFirst}" in cream + " " + "{titleSecond}" in a <span opacity 0.45>
  font-size clamp(28px, 4vw, 40px), font-weight 500, uppercase, line-height 1.1
  padding-bottom 22px, border-bottom var(--brd)
```

---

### `CardsGrid.astro`

```
Props interface:
  cols: 2 | 3

Layout: CSS grid
  cols === 2 → grid-template-columns: 1fr 1fr
  cols === 3 → grid-template-columns: 1fr 1fr 1fr
  border-bottom: var(--brd)

Renders: <slot />
```

---

### `Card.astro`

```
Props interface:
  company: string
  role: string
  period: string
  bullets: string[]
  tech: TechTag[]
  index: number   ← passed by parent for alternating bg

Background:
  index % 2 === 0 → var(--s1)
  index % 2 === 1 → var(--s2)

Layout: padding 22px 24px 24px
  border-right: var(--brd)   (last-child gets border-right none via parent :last-child)
  border-top: var(--brd)

Elements:
  Company: font-size 9px, letter-spacing 0.18em, uppercase, var(--muted), margin-bottom 7px

  Role (h3): font-size 15px, font-weight 500, var(--cream), line-height 1.25, margin-bottom 5px

  Period: font-size 8px, letter-spacing 0.14em, uppercase, var(--terra), margin-bottom 14px

  Bullets (ul):
    Each li: font-size 11px, color var(--muted), line-height 1.75
      padding-left 14px, position relative, margin-bottom 1px
      ::before — content "—", position absolute, left 0
                 color var(--terra), font-size 9px, top 1px

  Tech tags (div, flex wrap, gap 4px, margin-top 14px):
    Each span: font-size 8px, letter-spacing 0.1em, uppercase
      padding 3px 8px, border 1px solid, no border-radius

    Level styles:
      default → border rgba(232,224,204,0.1), color var(--muted), bg var(--s3)
      hi      → border var(--amber), color var(--amber), bg rgba(201,139,42,0.07)
      mid     → border var(--teal), color var(--teal2), bg rgba(45,123,120,0.07)
      lo      → border var(--terra), color var(--terra), bg rgba(196,92,53,0.07)
```

---

### `GeoInterstitial.astro`

```
Props interface:
  variant: 'A' | 'B'

Layout: height 100px, overflow hidden, border-bottom var(--brd)

SVG: aria-hidden="true"
  viewBox="0 0 680 100"
  preserveAspectRatio="xMidYMid slice"
  width="100%" height="100%", display block

Variant A — background #1e2d45:
  <rect width="680" height="100" fill="#1e2d45"/>
  <circle cx="100" cy="50" r="60" fill="#c45c35" opacity="0.35"/>
  <circle cx="220" cy="50" r="60" fill="#2d7b78" opacity="0.3"/>
  <rect x="300" y="10" width="80" height="80" fill="#12110f" opacity="0.5"/>
  <circle cx="380" cy="50" r="40" fill="#c98b2a" opacity="0.25"/>
  <circle cx="520" cy="50" r="70" fill="#2d7b78" opacity="0.2"/>
  <rect x="600" y="20" width="60" height="60" fill="#c45c35" opacity="0.2"/>
  <line x1="0" y1="50" x2="680" y2="50" stroke="#e8e0cc" stroke-width="0.5" opacity="0.08"/>

Variant B — background #181510:
  <rect width="680" height="100" fill="#181510"/>
  <polygon points="340,0 500,100 180,100" fill="#1e2d45" opacity="0.4"/>
  <polygon points="340,0 440,100 240,100" fill="#2d7b78" opacity="0.25"/>
  <circle cx="340" cy="55" r="22" fill="#c45c35" opacity="0.6"/>
  <circle cx="340" cy="55" r="11" fill="#c98b2a" opacity="0.8"/>
  <circle cx="340" cy="55" r="4" fill="#12110f"/>
  <circle cx="340" cy="82" r="26" fill="#4aaba6" opacity="0.18"/>
  <line x1="340" y1="0" x2="240" y2="100" stroke="#e8e0cc" stroke-width="0.5" opacity="0.08"/>
  <line x1="340" y1="0" x2="440" y2="100" stroke="#e8e0cc" stroke-width="0.5" opacity="0.08"/>
```

---

### `EducationBand.astro`

```
Import: { education } from '../data/experience'

Layout: CSS grid, grid-template-columns 1fr 1fr
  border-bottom: var(--brd)

Each card: padding 20px 24px
  Card 1: background var(--s1), border-right var(--brd)
  Card 2: background var(--s2)

Inside each card:
  Label row — flex, align-items center, gap 8px, margin-bottom 10px:
    Square: 7px × 7px, background = labelColor (inline style)
    Text: education[n].label — 9px, letter-spacing 0.22em, uppercase, var(--muted)

  Degree: font-size 14px, font-weight 500, var(--cream), margin-bottom 4px
  Institution: font-size 10px, var(--muted)
  Period: font-size 8px, letter-spacing 0.14em, uppercase, var(--terra), margin-top 4px
```

---

### `SkillsBand.astro`

```
Import: { skills } from '../data/experience'

Layout: padding 24px 28px, border-bottom var(--brd), background var(--s2)

Label row — flex, align-items center, gap 8px, margin-bottom 14px:
  Square: 7px × 7px, background var(--amber)
  Text: "Technical skills" — 9px, letter-spacing 0.24em, uppercase, var(--muted)

Grid: CSS grid, grid-template-columns repeat(4, 1fr), gap 5px

Render all skills from data in order: hi → mid → lo → default
Each tag: same styles as Card tech tags but padding 7px 10px, font-size 9px
  Flex row, align-items center, gap 5px
  ::before — 4px × 4px square, background currentColor
```

---

### `Footer.astro`

```
Layout: CSS grid, grid-template-columns 1fr auto
  background: var(--teal)

Left: padding 22px 24px, border-right 2px solid rgba(232,224,204,0.18)
  Heading: "Let's build\nsomething."
    font-size 22px, font-weight 500, uppercase, var(--cream), line-height 1.05
    Use <br> for line break
  Sub: "fercitotron@gmail.com · github.com/FernandoJRR"
    font-size 9px, letter-spacing 0.2em, uppercase, rgba(232,224,204,0.45)
    margin-top 5px

Right — flex row of buttons, align-items stretch:
  "GitHub" → links to https://github.com/FernandoJRR
  "LinkedIn" → links to https://linkedin.com/in/fernando-rodriguez
  "Get in touch →" → mailto:fercitotron@gmail.com

  Render as <a> tags styled as buttons
  Default: padding 0 18px, font-size 9px, letter-spacing 0.18em, uppercase
    background rgba(0,0,0,0.25), color rgba(232,224,204,0.65)
    border-right 2px solid rgba(232,224,204,0.15)
    display flex, align-items center
    transition: background 120ms, color 120ms
    hover: background rgba(0,0,0,0.4), color var(--cream)

  Last button "Get in touch →":
    background var(--amber), color var(--bg), border-right none
    hover: background #b8791f
```

---

## Page Assembly — `src/pages/index.astro`

```astro
---
import '../styles/global.css'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
import StatsBand from '../components/StatsBand.astro'
import DomainIntro from '../components/DomainIntro.astro'
import CardsGrid from '../components/CardsGrid.astro'
import Card from '../components/Card.astro'
import GeoInterstitial from '../components/GeoInterstitial.astro'
import EducationBand from '../components/EducationBand.astro'
import SkillsBand from '../components/SkillsBand.astro'
import Footer from '../components/Footer.astro'
import { domains } from '../data/experience'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Fernando Rodríguez — Senior AI Integration Engineer. Portfolio of AI agents, fullstack systems, and research." />
    <title>Fernando Rodríguez — AI Engineer & Fullstack Developer</title>
  </head>
  <body>
    <main style="border: 2px solid rgba(232,224,204,0.17); max-width: 1200px; margin: 0 auto;">
      <Nav />
      <Hero />
      <StatsBand />

      {domains.map((domain, i) => (
        <>
          <DomainIntro
            number={domain.number}
            pipColor={domain.pipColor}
            titleFirst={domain.titleFirst}
            titleSecond={domain.titleSecond}
          />
          <CardsGrid cols={domain.cols}>
            {domain.cards.map((card, j) => (
              <Card
                company={card.company}
                role={card.role}
                period={card.period}
                bullets={card.bullets}
                tech={card.tech}
                index={j}
              />
            ))}
          </CardsGrid>
          {i < domains.length - 1 && (
            <GeoInterstitial variant={i === 0 ? 'A' : 'B'} />
          )}
        </>
      ))}

      <EducationBand />
      <SkillsBand />
      <Footer />
    </main>
  </body>
</html>
```

---

## Responsive Breakpoints

Add these to `global.css` after the base styles:

```css
@media (max-width: 768px) {
  /* Hero: stack columns */
  .hero { grid-template-columns: 1fr; }
  .hero-art { min-height: 220px; }

  /* Cards: all single column on mobile */
  .cards-grid-2,
  .cards-grid-3 { grid-template-columns: 1fr; }

  /* Stats: 2 cols on mobile */
  .stats-band { grid-template-columns: 1fr 1fr; }

  /* Education: stack */
  .edu-band { grid-template-columns: 1fr; }

  /* Skills: 2 cols on mobile */
  .skills-grid { grid-template-columns: 1fr 1fr; }

  /* Nav links: hide on very small screens or wrap */
  .nav-links { display: none; }

  /* Hero name: smaller */
  .hero-name { font-size: 36px; }

  /* Footer: stack */
  .footer { grid-template-columns: 1fr; }
  .ft-btns { border-top: var(--brd); }
  .ft-btns a { flex: 1; justify-content: center; }
}
```

Note: for the responsive classes to work, add the class names (`hero`, `cards-grid-2`, `cards-grid-3`, `stats-band`, etc.) to the corresponding component wrapper elements.

---

## Hover States

Add to `global.css`:

```css
.nav-links li { transition: color 120ms, background 120ms; }
.nav-links li:hover { color: var(--cream); background: var(--s2); }

.card { transition: background 120ms; }
.card:hover { background: var(--s3); }

.hbtn { transition: background 120ms, color 120ms; }
.hbtn.prim:hover { background: #b8791f; }
.hbtn.sec:hover { background: var(--s2); color: var(--cream); }
```

---

## Claude Code Prompt

Paste this as your opening message in Claude Code:

```
Read portfolio-spec-astro.md and build the project exactly as described.

Setup steps first:
1. npm create astro@latest . -- --template minimal --typescript strict --no-git
2. Create the file structure from the spec
3. Add global.css with all tokens
4. Create data/experience.ts with all content
5. Build components in this order:
   Nav → HeroArt → Hero → StatsBand → DomainIntro →
   Card → CardsGrid → GeoInterstitial →
   EducationBand → SkillsBand → Footer
6. Assemble index.astro
7. Create .github/workflows/deploy.yml

Rules:
- No border-radius anywhere
- Use exact hex values from the spec — do not substitute
- All SVG elements get aria-hidden="true"
- No external CSS frameworks
- Inline styles are acceptable for dynamic values (pipColor, labelColor)
- Keep all text-transform uppercase via CSS not content
```
