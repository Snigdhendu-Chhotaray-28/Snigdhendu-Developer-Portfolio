import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import './HeroSection.css';

/* ─────────────────────────────────────────────
   MarqueeRow — Infinite scrolling text, continuous chain.
   Uses 3 copies of the text block for seamless looping.
   ───────────────────────────────────────────── */
function MarqueeRow({ text, id, repeatCount = 30, reverse = false, duration = 80 }) {
  const singleBlock = (text + '   ').repeat(repeatCount);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const blockWidth = track.children[0]?.offsetWidth || 0;

      if (reverse) {
        gsap.set(track, { x: -blockWidth });
        tweenRef.current = gsap.to(track, {
          x: 0,
          ease: "none",
          duration: duration,
          repeat: -1
        });
      } else {
        gsap.set(track, { x: 0 });
        tweenRef.current = gsap.to(track, {
          x: -blockWidth,
          ease: "none",
          duration: duration,
          repeat: -1
        });
      }
    });

    return () => ctx.revert();
  }, [reverse, duration]);

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.play();
  };

  return (
    <div
      className="marquee-track"
      id={id}
      ref={trackRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="marquee-text">{singleBlock}</span>
      <span className="marquee-text">{singleBlock}</span>
      <span className="marquee-text">{singleBlock}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HeroSection
   ───────────────────────────────────────────── */
export default function HeroSection({ loaded = false, isDarkMode = false }) {
  const heroRef = useRef(null);
  const [time, setTime] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isTooltipClosed, setIsTooltipClosed] = useState(false);

  /* ══════ Image reveal animation ══════ */
  useLayoutEffect(() => {
    gsap.set('.hero-main-img', {
      clipPath: 'inset(100% 0% 0% 0%)'
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    gsap.to('.hero-main-img', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.6,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: () => {
        gsap.set('.hero-main-img', { clearProps: 'clipPath' });
      }
    });
  }, [loaded]);

  /* ═══════ Robust Indian Standard Time (IST) Clock ═══════ */
  useEffect(() => {
    function tick() {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setTime(formatter.format(now).replace(/:/g, '.'));
      } catch (err) {
        // Fallback calculation for legacy environments
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istDate = new Date(utc + (19800 * 1000));
        const str = istDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(/:/g, '.');
        setTime(str);
      }
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="hero"
      id="hero"
      ref={heroRef}
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* ── Hidden Person Schema Entity Tags ── */}
      <meta itemprop="name" content="Snigdhendu Chhotaray" />
      <meta itemprop="jobTitle" content="Frontend Developer & Freelancer" />
      <meta itemprop="url" content="https://snigdhendu-developer-portfolio.netlify.app/" />

      {/* ── SEO: Primary H1 (visually hidden, fully accessible to search bots) ── */}
      <h1 className="sr-only" itemprop="name">
        Snigdhendu Chhotaray — Frontend Developer &amp; Freelancer in India
      </h1>

      {/* ── Background Layer ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', width: '100%', height: '100%' }} />

      {/* ── Person Image Wrapper ── */}
      <div className="hero-card-wrapper">
        <div className="hero-image-container">
          {/* Experience Badge */}
          <div
            className="experience-badge"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
            onFocus={() => setIsTooltipVisible(true)}
            onBlur={() => setIsTooltipVisible(false)}
            tabIndex={0}
            role="button"
            aria-label="5 plus years of experience badge. Hover or focus to view description."
          >
            <div className="badge-triangle" aria-hidden="true" />
            <span className="badge-text">5+</span>

            <div
              className={`experience-tooltip ${isTooltipVisible && !isTooltipClosed ? 'visible' : ''}`}
              role="tooltip"
            >
              <button
                type="button"
                className="tooltip-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTooltipClosed(true);
                  setIsTooltipVisible(false);
                }}
                aria-label="Close experience details tooltip"
              >
                &times;
              </button>
              Over 5 years of experience building modern frontend applications and cloud deployments.
            </div>
          </div>

          {/* Background block & Hero Image */}
          <div className="hero-image-bg" aria-hidden="true" />
          <img
            src="/hero-img.png"
            alt="Snigdhendu Chhotaray — Frontend Developer and Freelancer in India"
            className={`hero-main-img${isHovered ? ' color' : ''}`}
            width="600"
            height="800"
            fetchPriority="high"
            decoding="async"
            itemProp="image"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
      </div>

      {/* ── Row 1: FRONTEND DEVELOPER ── */}
      <div className="marquee-row marquee-row-1" aria-hidden="true">
        <MarqueeRow text="FRONTEND DEVELOPER" id="row1" duration={160} />
      </div>

      {/* ── Row 2: UX/UI DESIGNER ── */}
      <div className="marquee-row marquee-row-2" aria-hidden="true">
        <MarqueeRow text="UX/UI DESIGNER" id="row2" reverse={true} duration={160} />
      </div>

      {/* ── Row 3: CREATIVE ── */}
      <div className="marquee-row marquee-row-3" aria-hidden="true">
        <MarqueeRow text="CREATIVE" id="row3" duration={80} />
      </div>

      {/* ── Bottom Bar ── */}
      <div className="hero-bottom-bar" role="status" aria-label="Location, Indian time and work availability">
        <div
          className="hero-bottom-left"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span className="bottom-label">BASED IN</span>
          <span className="bottom-location" itemProp="addressCountry">INDIA</span>
          <meta itemprop="addressLocality" content="Bhubaneswar" />
          <meta itemprop="addressRegion" content="Odisha" />
          <span className="bottom-time" aria-label={`Current time in India: ${time}`}> • {time}</span>
        </div>
        <div className="hero-bottom-right">
          <span className="status-dot" aria-hidden="true"></span>
          <span className="status-text">OPEN TO WORK</span>
        </div>
      </div>
    </section>
  );
}