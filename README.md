# NoOps Studios

> **"We automate what slows you down."**
> Premium Tech Agency — Enterprise DevOps, Cloud & AI Automation.

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Framework   | Next.js 14 (App Router)                        |
| Styling     | Tailwind CSS 3.4                               |
| Animations  | Framer Motion 11                               |
| Icons       | Lucide React                                   |
| Language    | TypeScript 5                                   |
| Fonts       | Syne 800 · DM Sans 300/400/500 · DM Mono 400  |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

---

## Available Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start dev server (localhost:3000)    |
| `npm run build` | Production build                     |
| `npm run start` | Run production build locally         |
| `npm run lint`  | ESLint check                         |
| `npm run type-check` | TypeScript type check (no emit) |

---

## Project Structure

```
noops-studios/
├── app/                        # Next.js App Router
│   ├── globals.css             # CSS tokens · resets · keyframes
│   ├── layout.tsx              # Root layout (fonts, metadata, Nav, Footer)
│   ├── page.tsx                # Homepage (all sections)
│   ├── services/page.tsx       # /services — expanded service detail
│   ├── works/page.tsx          # /works — portfolio grid
│   ├── about/page.tsx          # /about — team, mission, stats
│   └── contact/page.tsx        # /contact — form, availability, FAQ
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # Sticky nav — 64px, glass morphism, mobile drawer
│   │   └── Footer.tsx          # 4-column footer + bottom bar
│   ├── sections/               # Homepage section components
│   │   ├── Hero.tsx            # Full-viewport hero with mesh gradient
│   │   ├── Services.tsx        # Bento grid, 5 glass cards
│   │   ├── Process.tsx         # 4-step horizontal timeline
│   │   ├── TechStack.tsx       # Dual marquee tech ticker
│   │   ├── Testimonials.tsx    # 3-col testimonial cards
│   │   └── CTA.tsx             # Full-width gradient CTA
│   └── ui/                     # Reusable primitive components
│       ├── Button.tsx          # primary / ghost / outline variants
│       ├── Badge.tsx           # Pill label (blue / teal / violet)
│       ├── GlassCard.tsx       # Glass morphism card base
│       ├── GradientText.tsx    # Brand gradient text wrapper
│       └── SectionLabel.tsx    # "/ SECTION NAME" monospace label
│
├── lib/
│   └── utils.ts                # cn() · stagger() · clamp() · formatMailto()
│
├── public/
│   ├── icons/                  # Logo SVGs, favicons, social icons
│   ├── images/                 # OG image, trusted-by logos
│   └── robots.txt
│
├── tailwind.config.ts          # Design tokens, custom theme extension
├── next.config.ts              # Images, security headers, experimental
├── tsconfig.json               # TypeScript config with path aliases
├── postcss.config.js           # Tailwind + autoprefixer
└── .eslintrc.json              # Next.js ESLint config
```

---

## Design Tokens

All tokens are defined as CSS custom properties in `app/globals.css` and mirrored in `tailwind.config.ts`.

```
Backgrounds:  --bg-base (#070910) · --bg-surface (#0d1117) · --bg-elevated (#111827)
Accents:      --accent-blue (#4f7dff) · --accent-violet (#7c5cfc) · --accent-teal (#00d4aa)
Text:         --text-primary (#f1f5f9) · --text-secondary (#8b95a8) · --text-muted (#3d4a5c)
```

---

## Build Order

Components are implemented in this sequence (one per session turn):

```
1.  globals.css + layout.tsx      ← fonts, CSS vars, root layout
2.  Nav.tsx                       ← sticky nav, mobile drawer
3.  Hero.tsx                      ← hero section
4.  Services.tsx                  ← bento grid
5.  Process.tsx                   ← timeline
6.  TechStack.tsx                 ← marquee ticker
7.  Testimonials.tsx              ← card grid
8.  CTA.tsx                       ← CTA section
9.  Footer.tsx                    ← footer
10. UI primitives                 ← Button, Badge, GlassCard, etc.
11. /services page                ← expanded services
12. /works page                   ← portfolio
13. /about page                   ← team + stats
14. /contact page                 ← form + FAQ
```

Type **"Start Homepage"** to begin building, then **"Next"** after each component to continue.

---

## Path Aliases

```ts
@/*              → ./
@/components/*   → ./components/*
@/lib/*          → ./lib/*
@/app/*          → ./app/*
```

---

## Accessibility

- All colour contrast ≥ 4.5:1
- Focus rings: `2px solid #4f7dff` on all interactive elements
- Skip-to-main-content link at document top
- `prefers-reduced-motion` disables all animations
- All touch targets ≥ 44×44px
- Semantic HTML throughout (`<header>` `<nav>` `<main>` `<section>` `<footer>`)

---

© 2025 NoOps Studios. All rights reserved.
