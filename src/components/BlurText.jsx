import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = 'p', // Allows rendering as h1, h2, h3, span, or p for semantic HTML SEO
  ...rest // Passes Schema microdata (itemProp, id, etc.) directly to the container tag
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <Component
      ref={ref}
      className={className}
      aria-label={text} // SEO & Accessibility: Ensures screen readers & search bots read unbroken text
      {...rest}
    >
      {/* Visual Animation Wrapper (Hidden from Screen Readers to prevent fragmented reading) */}
      <span aria-hidden="true" style={{ display: 'inline-block' }}>
        {elements.map((segment, index) => {
          const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

          const spanTransition = {
            duration: totalDuration,
            times,
            delay: (index * delay) / 1000
          };
          spanTransition.ease = easing;

          return (
            <motion.span
              className="will-change-[transform,filter,opacity]"
              style={{ display: 'inline-block', whiteSpace: 'pre-wrap' }}
              key={index}
              initial={fromSnapshot}
              animate={inView ? animateKeyframes : fromSnapshot}
              transition={spanTransition}
              onAnimationComplete={(index === elements.length - 1 && inView) ? onAnimationComplete : undefined}
            >
              {segment === ' ' ? '\u00A0' : segment}
              {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
            </motion.span>
          );
        })}
      </span>
    </Component>
  );
};

export default BlurText;