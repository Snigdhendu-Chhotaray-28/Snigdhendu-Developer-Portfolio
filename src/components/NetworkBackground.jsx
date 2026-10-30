import React, { useEffect, useRef } from 'react';

const NetworkBackground = ({ isDarkMode, positionMode = 'fixed' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;

    // Check system preference for reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const particles = [];
    const particleCount = 80; // Optimized density for smooth 60fps rendering
    const connectionDistance = 160;

    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1;
      }
      update(w, h) {
        if (prefersReducedMotion) return; // Keep positions static if reduced motion is requested
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(context, isDark) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
        context.fill();
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(width, height));
        }
      }
    };

    resize();

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        particles[i].update(width, height);
        particles[i].draw(ctx, isDarkMode);

        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - dist / connectionDistance;

            ctx.strokeStyle = isDarkMode
              ? `rgba(255, 255, 255, ${opacity * 0.6})`
              : `rgba(0, 0, 0, ${opacity * 0.85})`;
            ctx.lineWidth = isDarkMode ? 0.8 : 1.2;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Viewport Intersection Observer: Pauses animation when offscreen
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    viewportObserver.observe(canvas);

    if (prefersReducedMotion) {
      render(); // Render once statically
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    return () => {
      viewportObserver.disconnect();
      resizeObserver.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: positionMode,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: positionMode === 'fixed' ? -1 : 0,
        contain: 'strict', // CSS containment prevents Cumulative Layout Shift (CLS)
      }}
    />
  );
};

export default NetworkBackground;