# INL261--Group4
a) Concept Overview
Project Purpose & Problem Being Solved
A common gap in IT education is that students often graduate without having contributed to a real world project for an actual client. While they may master technical skills like HTML, CSS, and JavaScript, these are typically learned in isolation, lacking the context of teamwork or practical application.
This initiative bridges that gap by tasking students with creating, developing, and launching a fully functional animated portfolio website for a lecturer at Belgium Campus. The project incorporates current industry standards, including:
- AI-supported development using Claude
- Collaborative team workflows
- Version control via GitHub
- Live hosting through GitHub Pages
By integrating these elements, students acquire hands-on experience that closely mirrors professional software development environments.
Chosen Lecturer
Lecturer Name: 
Reason for Selection:
The selected lecturer enjoys widespread respect among students and is recognized for exceptional teaching ability. Their commitment to student growth, combined with dynamic and interactive instruction methods, makes them a standout candidate. Their established academic presence and accomplishments further justify the creation of a dedicated portfolio site.
Target Audience
The website will serve three primary groups:
Students -To explore the lecturer’s courses and pedagogical approach
Employers - To assess academic credentials and professional competencies
Professional Network - To highlight achievements, qualifications, and contributions to the field


# INL261 — Group 4 · The Gardener: Vincent Ndlovu

> **Module:** INL261 Innovation & Leadership · Belgium Campus iTversity  
> **Assessment:** Milestone 2 — Animated Portfolio Website  
> **Live Site:** [https://mr-m-gavin.github.io/INL261--Group4/](https://mr-m-gavin.github.io/INL261--Group4/)

---

## 🌿 About This Project

An AI-assisted, fully animated portfolio website built for **Vincent Ndlovu** — the dedicated Campus Gardener at Belgium Campus iTversity, West Campus. The site was designed, built, and deployed as part of the INL261 Group Project using Claude AI (Claude Projects + Artifacts) and deployed live on GitHub Pages.

The site was built to honour Vincent's daily dedication to keeping the campus grounds beautiful, safe, and welcoming — a contribution that often goes unseen.

---

## 🔗 Live Site & QR Code

**URL:** `https://mr-m-gavin.github.io/INL261--Group4/`

Scan the QR code below (or use the PNG in this repo: `INL261-Milestone2-QRcode.png`) to access the live site directly on mobile.

---

## 📄 Pages

| File | Description |
|------|-------------|
| `index.html` | Main single-page portfolio — Hero, About, Stats, Fun Facts, Responsibilities, Quote Wall |
| `expertise.html` | **Modules & Expertise** — Scroll-triggered animated card grid, hover-to-flip, 8 competency areas |
| `services.html` | Services & Responsibilities — Animated flip card grid |
| `contact_1.html` | Contact / Connect — Animated CTA, office hours, appreciation counter |
| `project.html` | Alternate entry point using shared `style.css` and `script.js` |
| `404.html` | Custom GitHub Pages 404 error page |
| `script.js` | Shared JavaScript module (cursor, particles, carousel, sidebar, counters) |
| `style.css` | Shared stylesheet for `project.html` |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Claude.ai (free tier) | AI co-pilot — all code generated via Claude Artifacts |
| Claude Projects | Shared AI workspace with persistent system instructions |
| GitHub | Remote repository and version control |
| GitHub Pages | Free static hosting at `username.github.io` |
| Git CLI | `init`, `add`, `commit`, `push`, `pull`, `branch`, `merge` |
| VS Code | Local editing of Artifact-generated files |
| QR Code Generator | QR code pointing to live GitHub Pages URL |

---

## 🎨 Design System

```
Colour Palette:
  --moss:   #3a5a40  (dark forest green)
  --sage:   #588157  (mid green)
  --fern:   #a3b18a  (light sage)
  --cream:  #faf6ef  (warm white)
  --petal:  #d4a96a  (golden amber)
  --dark2:  #223d24  (deep forest panel)
  --dark3:  #111a12  (near-black background)

Typography:
  Display: Playfair Display (serif, italic headings)
  Body:    Lato (clean, readable)

Animations:
  - CSS particle canvas (floating ambient particles)
  - SVG avatar (float, wave, blink, bob keyframes)
  - Typewriter effect (hero subtitle)
  - Scroll-triggered milestone reveals (IntersectionObserver)
  - Animated stat counters (easeOut cubic)
  - 3D flip cards (CSS preserve-3d, backface-visibility)
  - Auto-rotating quote carousel
  - Custom dual-layer cursor (ring + dot)
```

---

## 👥 Team Roles — Group 4

| Role | Responsibility |
|------|---------------|
| Project Manager | GitHub repo ownership, merges, presentation lead |
| Content Leads (×2) | Social engineering interview with Vincent; all copy |
| UI / Animation Lead | CSS animations, SVG avatar design, colour palette |
| Dev Leads (×2) | JavaScript interactivity, carousel, counters |
| GitHub & Deployment Lead | Git operations, GitHub Pages setup, QR code |
| QA / Accessibility Lead | Cross-device testing, WCAG compliance checks |
| Documentation Lead | Milestone 1 report, reflection log, presentation deck |
| Ethics & Content Lead | AI output review, content verification with Vincent |

---

---

## 📋 Milestone 2 Checklist

- [x] Animated Hero (CSS particles, SVG avatar, typewriter)
- [x] About / Profile (animated bio card, glowing border, personality badges)
- [x] Fun Facts & Superpowers (interactive flip panel, emoji styling)
- [x] Quote Wall (auto-rotating carousel with controls)
- [x] Modules & Expertise (`expertise.html` — scroll-triggered flip card grid)
- [x] Contact / Connect (`contact_1.html` — animated CTA, office hours)
- [x] Services (`services.html` — hover-to-flip card grid)
- [x] Live GitHub Pages deployment
- [x] QR code generated and committed
- [x] Custom 404 page
- [x] Shared `script.js` module
- [x] Responsive — mobile, tablet, desktop

---

*© 2026 INL261 Group 4 · Belgium Campus iTversity*
