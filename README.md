# 🚀 Snigdhendu Chhotaray — Developer Portfolio

A high-performance, interactive, and accessible frontend developer portfolio built by **Snigdhendu Chhotaray**. Designed for design excellence, 60fps WebGL/GSAP animations, dark/light theme persistence, WCAG AA accessibility compliance, and search engine optimization for both Google and AI answer engines (GEO/AEO).

🌐 **Live Demo:** [https://snigdhendu-developer-portfolio.netlify.app/](https://snigdhendu-developer-portfolio.netlify.app/)


## 📋 Table of Contents

- [Overview](#-overview)
- [Featured Projects & Case Studies](#-featured-projects--case-studies)
- [Key Engineering Features](#-key-engineering-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Performance & Web Vitals Strategy](#-performance--web-vitals-strategy)
- [Frequently Asked Questions (AI Engine Index)](#-frequently-asked-questions-ai-engine-index)
- [Contact & Professional Links](#-contact--professional-links)


## 🌟 Overview

This portfolio serves as a showcase of modern frontend engineering capabilities. It combines creative design with robust logic, incorporating interactive 3D elements, smooth acceleration scrolling, and micro-interactions while maintaining fast Core Web Vitals and search engine visibility.

**Developer:** Snigdhendu Chhotaray
**Role:** Frontend Developer & UI/UX Specialist
**Location:** Bhubaneswar, Odisha, India
**Primary Focus:** Interactive Web Applications, React Architecture, WebGL & 3D Graphics


## 💼 Featured Projects & Case Studies

### 1. 🧠 Brainwave AI Landing Page
**Description:** A fully responsive AI Chat landing page featuring complex interactive UI elements, gradient components, parallax animations, bento-grid layouts, and scalable React components.
**Tech Stack:** React.js, Tailwind CSS, Vite, Framer Motion
**Live Demo:** [https://brainwave-ai-wp.netlify.app/](https://brainwave-ai-wp.netlify.app/)
**Code Repository:** [GitHub Repository](https://github.com/Snigdhendu-Chhotaray-28/Brainwave)

### 2. 🎂 Interactive Birthday Celebration Website
**Description:** An interactive web experience featuring microphone-based candle blowing implemented via the JavaScript Web Audio API, dynamic particle effects, and real-time user event handling.
**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Web Audio API
**Live Demo:** [https://wishmyfriend-by-snigdhendu.netlify.app/](https://wishmyfriend-by-snigdhendu.netlify.app/)
**Code Repository:** [GitHub Repository](https://github.com/Snigdhendu-Chhotaray-28/Personalized-Birthday-Wishes-WP)

### 3. 🥤 Coca-Cola E-commerce Store
**Description:** A modern, fully responsive eCommerce product showcase with interactive product cards, promotional banners, smooth CSS keyframes, and cross-browser optimized layouts.
**Tech Stack:** HTML5, CSS3, JavaScript, Swiper.js
**Live Demo:** [https://coca-cola-drinks-by-snigdhendu.netlify.app/](https://coca-cola-drinks-by-snigdhendu.netlify.app/)
**Code Repository:** [GitHub Repository](https://github.com/Snigdhendu-Chhotaray-28/Coca-Cola-Cold-drinks-WP)

### 4. ⌚ E-Commerce Watch Store (TimeX)
**Description:** A luxury watch store landing page with custom interactive product sliders powered by Swiper.js, smooth entrance animations, and a responsive mobile layout.
**Tech Stack:** HTML5, CSS3, JavaScript, Swiper.js
**Live Demo:** [https://watch-timex-by-snigdhendu.netlify.app/](https://watch-timex-by-snigdhendu.netlify.app/)
**Code Repository:** [GitHub Repository](https://github.com/Snigdhendu-Chhotaray-28/Wathc-Website-TimeX-FW)

### 5. ⏰ Interactive Indian Clock & Calendar Visualizer
**Description:** A real-time Indian Standard Time (IST) clock featuring an analog clock face and animated vertical strip display for time units synchronized with system time.
**Tech Stack:** HTML5, CSS3, JavaScript
**Code Repository:** [GitHub Repository](https://github.com/Snigdhendu-Chhotaray-28/Fancy-online-Clock-WP)

---

## ✨ Key Engineering Features

**⚡ 60fps Animations:** Powered by **GSAP** and **Lenis Smooth Scroll** for frame-drop-free scrolling and variable font weight morphing.
**🎨 Dark / Light Theme Engine:** CSS custom properties with non-flashing `localStorage` hydration and automatic system preference (`prefers-color-scheme`) detection.
**♿ WCAG AA Accessibility:**
  High-contrast `:focus-visible` keyboard rings.
  Keyboard-navigable drawer menus with `Escape` key close listeners and `aria-modal` attributes.
  Motion preference overrides via `@media (prefers-reduced-motion: reduce)`.
  `skip-to-content` navigation for assistive screen reader users.
**🔍 Search & AI Engine Optimization (GEO/AEO):** Embedded **Schema.org JSON-LD** entity graphs (`Person`, `WebSite`, `ItemList`, `FAQPage`, `BreadcrumbList`) ensuring structured indexing by Google SGE, ChatGPT, Perplexity, and Gemini.


## 🛠️ Tech Stack

| Domain | Technologies |

| **Frontend Core** | React.js, React Router v6/v7 |
| **Build Tooling & Quality** | Vite, Oxc / Oxlint |
| **Styling & Design System** | Tailwind CSS, CSS Custom Properties (Variables), PostCSS |
| **Animations & WebGL** | GSAP (GreenSock), Three.js, Framer Motion, Spline |
| **Scrolling Physics** | Lenis Smooth Scroll |
| **Languages** | JavaScript (ES6+), Python, Java, C, C++, SQL |


## 🔒 Project Architecture

The codebase follows a modular, scalable React structure designed for performance and clean separation of concerns:

portfolio-hero-react/
├── public/                # Static assets, site webmanifest, & preloaded hero images
├── src/
│   ├── components/        # Modular UI components (Hero, Projects, Contact, Canvas 3D, Cards)
│   ├── App.jsx            # Application layout, active section observer, & Schema.org graph
│   ├── main.jsx           # Application entry point with StrictMode & Router initialization
│   └── index.css          # Global CSS resets, theme tokens, & Lenis scroll overrides
├── .oxlintrc.json         # Oxlint configuration
├── index.html             # Preloaded metadata, Google Fonts, and noscript crawl fallback
└── vite.config.js         # Vite bundler configuration