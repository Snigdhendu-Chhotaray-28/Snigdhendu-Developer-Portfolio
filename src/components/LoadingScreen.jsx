import { useState, useEffect, useRef } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [hidden, setHidden] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep callback reference updated without triggering re-subscribes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const handleFinish = () => {
      setHidden(true);
      onCompleteRef.current?.();
    };

    // Check if the page is already fully loaded
    if (document.readyState === 'complete') {
      handleFinish();
      return;
    }

    window.addEventListener('load', handleFinish);

    // Safety fallback: Unmounts preloader after 3.5s if an external asset hangs
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 3500);

    return () => {
      window.removeEventListener('load', handleFinish);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="skeleton-loading-screen"
      role="status"
      aria-label="Loading Snigdhendu Chhotaray's Portfolio"
      aria-live="polite"
    >
      {/* Skeleton Navbar */}
      <div className="skeleton-nav" aria-hidden="true">
        <div className="skeleton-logo"></div>
        <div className="skeleton-links">
          <div className="skeleton-link"></div>
          <div className="skeleton-link"></div>
          <div className="skeleton-link"></div>
          <div className="skeleton-link"></div>
          <div className="skeleton-link"></div>
        </div>
      </div>

      {/* Skeleton Hero Layout */}
      <div className="skeleton-hero" aria-hidden="true">
        <div className="skeleton-marquee row1"></div>
        <div className="skeleton-marquee row2"></div>
        <div className="skeleton-marquee row3"></div>
      </div>
    </div>
  );
}