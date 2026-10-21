import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import DecryptedText from './DecryptedText';
import './ProjectsSection.css';

const projects = [
  {
    id: 1,
    title: 'Brainwave AI Landing Page',
    description: 'Created a fully responsive AI Chat landing page with interactive UI, gradient components, and optimized performance using React and Tailwind CSS.',
    image: '/proj-1.png',
    tags: ['React.js', 'Tailwind CSS', 'Vite'],
    category: 'AI LANDING PAGE',
    overview: 'Developed a modern, fully responsive AI Chat UI landing page featuring sections such as Hero, Features, Services, Roadmap, Pricing, and Footer with a clean, intuitive user experience. Implemented interactive parallax animations, bento-grid layouts, complex UI geometries, and gradient-based components to create a visually engaging and immersive interface. Built the project with a focus on responsive design, reusable code architecture, and scalable components, ensuring optimal performance across desktop, tablet, and mobile devices.',
    features: [
      'Modern Hero, Features, Services, Pricing, and Roadmap sections',
      'Interactive animations and gradient effects',
      'Reusable React components',
      'Fast performance with Vite'
    ],
    liveLink: 'https://brainwave-ai-wp.netlify.app/',
    githubLink: 'https://github.com/Snigdhendu-Chhotaray-28/Brainwave'
  },
  {
    id: 2,
    title: 'Interactive Birthday Celebration Website',
    description: 'Created an interactive birthday website featuring microphone-based candle blowing, dynamic animations, and real-time user-driven celebrations using JavaScript.',
    image: '/proj-2.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Web Audio API'],
    category: 'INTERACTIVE',
    overview: 'Developed an interactive Birthday Celebration Website that delivers a personalized birthday experience with dynamic greetings, animated decorations, and responsive user interactions. Implemented a microphone-based wind detection feature using JavaScript, allowing users to blow into their device\'s microphone to extinguish the birthday candle, triggering real-time animations and runtime UI updates based on user activity. Integrated event-driven programming, DOM manipulation, animation sequencing, and runtime state management to create an engaging, responsive, and immersive birthday celebration experience across desktop and mobile devices.',
    features: [
      'Microphone-based candle blowing',
      'Real-time user interaction',
      'Personalized birthday greeting',
      'Dynamic animations and visual effects'
    ],
    liveLink: 'https://wishmyfriend-by-snigdhendu.netlify.app/',
    githubLink: 'https://github.com/Snigdhendu-Chhotaray-28/Personalized-Birthday-Wishes-WP'
  },
  {
    id: 3,
    title: 'Coca-Cola E-commerce Store',
    description: 'Created a modern, responsive Coca-Cola eCommerce website with engaging product displays, animations, and seamless user interactions using JavaScript.',
    image: '/proj-3.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Swiper JS', 'Slider JS'],
    category: 'E-COMMERCE',
    overview: 'Developed a fully responsive Coca-Cola eCommerce Store using HTML, CSS, and JavaScript, featuring a modern UI with an engaging product showcase and intuitive navigation. Designed interactive product cards, promotional banners, smooth animations, and dynamic user interactions to enhance the shopping experience. Optimized the website for performance, responsiveness, and cross-browser compatibility, while maintaining clean, reusable, and well-structured code.',
    features: [
      'Interactive product showcase',
      'Smooth animations and transitions',
      'Product cards and promotional banners',
      'User-friendly navigation'
    ],
    liveLink: 'https://coca-cola-drinks-by-snigdhendu.netlify.app/',
    githubLink: 'https://github.com/Snigdhendu-Chhotaray-28/Coca-Cola-Cold-drinks-WP'
  },
  {
    id: 4,
    title: 'E-Commerce Watch Store',
    description: 'Created a fully responsive Watch Store website with interactive product showcases, smooth animations, and optimized performance using Swiper.js.',
    image: '/proj-4.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Swiper.js'],
    category: 'E-COMMERCE',
    overview: 'Developed a fully responsive Watch Store website using HTML, CSS, JavaScript, and Swiper.js with a modern and user-friendly interface. Implemented interactive product sliders, smooth animations, and dynamic UI elements to enhance user engagement and browsing experience. Optimized the website for responsiveness, performance, and cross-browser compatibility across desktop, tablet, and mobile devices.',
    features: [
      'Responsive product catalog',
      'Swiper.js product sliders',
      'Smooth scrolling and animations'
    ],
    liveLink: 'https://watch-timex-by-snigdhendu.netlify.app/',
    githubLink: 'https://github.com/Snigdhendu-Chhotaray-28/Wathc-Website-TimeX-FW'
  },
  {
    id: 5,
    title: 'Interactive Indian Clock & Calendar Visualizer',
    description: 'Built a real-time Indian clock with dynamic date-time visualization, using advanced JavaScript calculations, runtime updates, and interactive animations.',
    image: '/proj-5.png',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    category: 'UTILITY',
    overview: 'Developed a real-time Indian Clock & Calendar Visualizer featuring an analog clock alongside an interactive vertical strip display for hours, minutes, seconds, day, month, and year, synchronized with the system time. Implemented advanced JavaScript time manipulation, DOM updates, and runtime calculations to dynamically align scrolling number strips, with positioning and movement controlled entirely through JavaScript rather than CSS. Built the application using optimized JavaScript logic to ensure accurate Indian Standard Time (IST) representation, smooth animations, responsive layout, and consistent performance across modern browsers.',
    features: [
      'Analog clock with dynamic updates',
      'Animated vertical date and time display',
      'JavaScript-based runtime calculations',
      'Automatic synchronization with system time'
    ],
    liveLink: 'https://github.com/Snigdhendu-Chhotaray-28/Fancy-online-Clock-WP',
    githubLink: 'https://github.com/Snigdhendu-Chhotaray-28/Fancy-online-Clock-WP'
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const wrapperRef = useRef(null);
  const modalCloseBtnRef = useRef(null);
  const modalRef = useRef(null);
  const dragState = useRef({ isDragging: false, startX: 0, startProgress: 0, setWidth: 0 });

  /* ── Infinite auto-scroll via GSAP (Respects prefers-reduced-motion) ── */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setupTween = () => {
      const children = Array.from(track.children);
      const halfCount = children.length / 2;

      const setWidth =
        (children[halfCount]?.offsetLeft ?? 0) - (children[0]?.offsetLeft ?? 0);

      if (setWidth <= 0) return;

      dragState.current.setWidth = setWidth;

      if (tweenRef.current) tweenRef.current.kill();

      gsap.set(track, { x: 0 });

      if (!prefersReducedMotion) {
        tweenRef.current = gsap.to(track, {
          x: -setWidth,
          ease: 'none',
          duration: 25,
          repeat: -1,
        });
      }
    };

    setupTween();

    const resizeObserver = new ResizeObserver(() => setupTween());
    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  /* ── Manual drag-to-scroll (mouse + touch) ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const onStart = (e) => {
      const tween = tweenRef.current;
      if (!tween) return;
      tween.pause();
      dragState.current.isDragging = true;
      dragState.current.startX = getClientX(e);
      dragState.current.startProgress = tween.progress();
      wrapper.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!dragState.current.isDragging) return;
      const tween = tweenRef.current;
      if (!tween) return;

      const dx = getClientX(e) - dragState.current.startX;
      const progressDelta = -dx / (dragState.current.setWidth || 1);
      let newProgress = dragState.current.startProgress + progressDelta;

      newProgress = ((newProgress % 1) + 1) % 1;
      tween.progress(newProgress);
    };

    const onEnd = () => {
      if (!dragState.current.isDragging) return;
      dragState.current.isDragging = false;
      wrapper.style.cursor = '';
      tweenRef.current?.play();
    };

    wrapper.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    wrapper.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      wrapper.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      wrapper.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []);

  const pauseScroll = () => tweenRef.current?.pause();
  const resumeScroll = () => {
    if (!dragState.current.isDragging) tweenRef.current?.play();
  };

  const closeModal = useCallback(() => setSelectedProject(null), []);

  /* ── Keyboard Focus Trap & Escape Listener for Modal (WCAG AA) ── */
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }

      /* Modal Focus Trap */
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    const timer = setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [selectedProject, closeModal]);

  const doubled = [...projects, ...projects];

  return (
    <>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="projects-section"
        onMouseLeave={resumeScroll}
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <meta itemProp="name" content="Featured Frontend Projects by Snigdhendu Chhotaray" />
        <meta itemProp="description" content="A curated list of web development projects built by Snigdhendu Chhotaray, Frontend Developer and Freelancer in India." />

        <div className="projects-header">
          <h2 id="projects-heading">
            <DecryptedText
              text="FEATURED PROJECTS"
              animateOn="view"
              revealDirection="center"
              speed={50}
              maxIterations={15}
            />
          </h2>
          <div className="header-underline" aria-hidden="true" />
        </div>

        {/* ── Auto-scroll + manual drag viewport ── */}
        <div
          className="auto-scroll-wrapper"
          ref={wrapperRef}
          role="region"
          aria-label="Featured projects carousel — drag to scroll"
          tabIndex={0}
        >
          <div className="projects-track" ref={trackRef}>
            {doubled.map((project, index) => {
              const isDuplicate = index >= projects.length;
              return (
                <article
                  key={`${project.id}-${index}`}
                  className="project-card"
                  onMouseEnter={pauseScroll}
                  onMouseLeave={resumeScroll}
                  {...(isDuplicate
                    ? { 'aria-hidden': 'true' }
                    : {
                        itemScope: true,
                        itemType: 'https://schema.org/SoftwareApplication',
                        itemProp: 'itemListElement',
                      })}
                >
                  {!isDuplicate && (
                    <>
                      <meta itemProp="author" content="Snigdhendu Chhotaray" />
                      <meta itemProp="creator" content="Snigdhendu Chhotaray" />
                      <meta itemProp="applicationCategory" content="WebApplication" />
                      <meta itemProp="operatingSystem" content="Web Browser" />
                      <meta itemProp="url" content={project.liveLink} />
                    </>
                  )}

                  <div className="project-img-wrapper">
                    <img
                      src={project.image}
                      alt={`Snigdhendu Chhotaray — ${project.title} project screenshot`}
                      className="project-img"
                      loading="lazy"
                      width="400"
                      height="250"
                      {...(!isDuplicate && { itemProp: 'image' })}
                    />
                  </div>

                  <div className="project-content">
                    <h3 {...(!isDuplicate && { itemProp: 'name' })}>{project.title}</h3>
                    <p {...(!isDuplicate && { itemProp: 'description' })}>{project.description}</p>

                    <div
                      className="tags"
                      aria-label="Technologies used"
                      {...(!isDuplicate && { itemProp: 'keywords' })}
                    >
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="tag">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    <div className="card-actions">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn live-btn"
                        aria-label={`Live preview of ${project.title} by Snigdhendu Chhotaray`}
                        tabIndex={isDuplicate ? -1 : 0}
                      >
                        <span className="btn-text">Live &#8599;</span>
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn github-btn"
                        aria-label={`GitHub repository for ${project.title}`}
                        tabIndex={isDuplicate ? -1 : 0}
                        {...(!isDuplicate && { itemProp: 'codeRepository' })}
                      >
                        <span className="btn-text">GitHub</span>
                      </a>
                      <button
                        type="button"
                        className="details-btn"
                        onClick={() => setSelectedProject(project)}
                        aria-label={`View detailed case study for ${project.title}`}
                        aria-haspopup="dialog"
                        tabIndex={isDuplicate ? -1 : 0}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Project Details Modal ── */}
      {selectedProject && createPortal(
        <div
          className="modal-overlay"
          onClick={closeModal}
          data-lenis-prevent="true"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            ref={modalRef}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            itemScope
            itemType="https://schema.org/SoftwareApplication"
          >
            <meta itemProp="author" content="Snigdhendu Chhotaray" />
            <button
              ref={modalCloseBtnRef}
              className="modal-close"
              onClick={closeModal}
              aria-label="Close project details dialog"
              type="button"
            >
              &times;
            </button>

            <div className="modal-body">
              <div className="modal-left">
                <span className="modal-category" itemProp="applicationCategory">{selectedProject.category}</span>
                <h2 id="project-modal-title" itemProp="name">{selectedProject.title}</h2>

                <h4 className="modal-subtitle">PROJECT OVERVIEW</h4>
                <p className="modal-desc" itemProp="description">{selectedProject.overview}</p>

                <h4 className="modal-subtitle">KEY FEATURES</h4>
                <ul className="modal-features">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-right">
                <div className="modal-img-container">
                  <img
                    src={selectedProject.image}
                    alt={`Snigdhendu Chhotaray — detailed view of ${selectedProject.title}`}
                    className="modal-img"
                    loading="lazy"
                    width="600"
                    height="400"
                    itemProp="image"
                  />
                </div>

                <h4 className="modal-subtitle mt-4">TECHNOLOGIES USED</h4>
                <div className="modal-tags" itemProp="keywords">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="modal-tag">{tag}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn"
                    style={{ textDecoration: 'none', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    itemProp="url"
                  >
                    Live View &nbsp;&#8599;
                  </a>
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn"
                    style={{ textDecoration: 'none', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    itemProp="codeRepository"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}