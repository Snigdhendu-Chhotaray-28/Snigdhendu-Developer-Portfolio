import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import CertAndStripsSection from './components/CertAndStripsSection';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StaggeredMenu from './components/StaggeredMenu';
import LoadingScreen from './components/LoadingScreen';
import NetworkBackground from './components/NetworkBackground';
import { Sun, Moon } from 'lucide-react';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'Projects', ariaLabel: 'View featured projects', link: '#projects' },
  { label: 'About', ariaLabel: 'Learn about Snigdhendu', link: '#about' },
  { label: 'Journey', ariaLabel: 'View education and work experience', link: '#journey' },
  { label: 'Achievements', ariaLabel: 'View achievements and certifications', link: '#achievements' },
  { label: 'Contact', ariaLabel: 'Get in touch with Snigdhendu', link: '#contact' }
];

const socialItems = [
  { label: 'X (Twitter)', link: 'https://x.com/Snigdhendu_28' },
  { label: 'GitHub', link: 'https://github.com/Snigdhendu-Chhotaray-28' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/snigdhendu-chhotaray' }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loadingDone, setLoadingDone] = useState(false);

  /* ── Hydrate dark mode preference from localStorage or system standard ── */
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  /* ── Smooth / lazy scroll via Lenis (Respects prefers-reduced-motion) ── */
  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  /* ── IntersectionObserver for Active Section Tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    const sections = ['home', 'projects', 'about', 'journey', 'achievements', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Schema.org Entity Graph for AI Answer Engines ── */
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://snigdhenduchhotaray.com/#person',
        'name': 'Snigdhendu Chhotaray',
        'jobTitle': 'Frontend Developer & UI/UX Specialist',
        'url': 'https://snigdhenduchhotaray.com',
        'sameAs': socialItems.map(s => s.link),
        'knowsAbout': [
          'React.js',
          'JavaScript',
          'Tailwind CSS',
          'Three.js',
          'GSAP Animations',
          'UI/UX Design',
          'Frontend Engineering'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://snigdhenduchhotaray.com/#website',
        'url': 'https://snigdhenduchhotaray.com',
        'name': 'Snigdhendu Chhotaray — Portfolio',
        'publisher': { '@id': 'https://snigdhenduchhotaray.com/#person' }
      }
    ]
  };

  return (
    <>
      {/* ── Schema.org Structured Data Injection ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <NetworkBackground isDarkMode={isDarkMode} />
      
      {/* ─── Loading Screen ─── */}
      <LoadingScreen onComplete={() => setLoadingDone(true)} />

      {/* ─── Skip to Content (Accessibility) ─── */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* ─── Desktop Header & Navbar ─── */}
      <header className="nav" aria-label="Primary site navigation">
        <div className="nav-logo">
          <span>SNIGDHENDU</span>
          <span>CHHOTARAY</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <nav className="nav-links" aria-label="Main menu">
            <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <a
                  href="#home"
                  className={activeSection === 'home' ? 'active' : ''}
                  aria-current={activeSection === 'home' ? 'page' : undefined}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={activeSection === 'projects' ? 'active' : ''}
                  aria-current={activeSection === 'projects' ? 'page' : undefined}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={activeSection === 'about' ? 'active' : ''}
                  aria-current={activeSection === 'about' ? 'page' : undefined}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#journey"
                  className={activeSection === 'journey' ? 'active' : ''}
                  aria-current={activeSection === 'journey' ? 'page' : undefined}
                >
                  Journey
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={activeSection === 'contact' ? 'active' : ''}
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Fix: camelCase for JSX inline style
              minWidth: '44px',
              minHeight: '44px',
            }}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun color="#ffffff" size={24} aria-hidden="true" />
            ) : (
              <Moon color="#000000" size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu Drawer ─── */}
      <div className="mobile-menu-wrapper">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor={isDarkMode ? '#ffffff' : '#000000'}
          openMenuButtonColor="#000000"
          changeMenuColorOnOpen={true}
          colors={['#1a1a1a', '#333333']}
          logoUrl="/hero-img.png"
          accentColor="#5227FF"
        />
      </div>

      {/* ─── Main Content Sections ─── */}
      <main id="main-content" aria-label="Portfolio sections" style={{ position: 'relative' }}>
        <section id="home" aria-label="Introduction and Hero">
          <HeroSection loaded={loadingDone} isDarkMode={isDarkMode} />
        </section>

        <section id="projects" aria-label="Featured Projects">
          <ProjectsSection />
        </section>

        <section id="about" aria-label="About Me and Certifications">
          <AboutSection />
          <CertAndStripsSection />
        </section>

        <section id="journey" aria-label="Education and Career Experience">
          <EducationSection />
        </section>

        <section id="contact" aria-label="Contact Information">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;