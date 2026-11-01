import React from 'react';
import './TechMarquee.css';
import { 
  SiC, SiCplusplus, SiPython, SiTailwindcss, SiReact, SiGit, SiGithub, SiVite, 
  SiGreensock 
} from 'react-icons/si';
import { FaJava, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa'; 

const techStacks = [
  { name: 'C', icon: <SiC color="#A8B9CC" aria-hidden="true" /> },
  { name: 'C++', icon: <SiCplusplus color="#00599C" aria-hidden="true" /> },
  { name: 'Python', icon: <SiPython color="#3776AB" aria-hidden="true" /> },
  { name: 'Java', icon: <FaJava color="#ED8B00" aria-hidden="true" /> },
  { name: 'SQL', icon: <FaDatabase color="#4479A1" aria-hidden="true" /> },
  { name: 'HTML5', icon: <FaHtml5 color="#E34F26" aria-hidden="true" /> },
  { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" aria-hidden="true" /> },
  { name: 'JavaScript', icon: <FaJs color="#F7DF1E" aria-hidden="true" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss color="#06B6D4" aria-hidden="true" /> },
  { name: 'React.js', icon: <SiReact color="#61DAFB" aria-hidden="true" /> },
  { name: 'Git', icon: <SiGit color="#F05032" aria-hidden="true" /> },
  { name: 'GitHub', icon: <SiGithub color="currentColor" aria-hidden="true" /> },
  { name: 'Vite', icon: <SiVite color="#646CFF" aria-hidden="true" /> },
  { 
    name: 'Spline', 
    icon: (
      <img 
        src="/spline-logo.png" 
        alt="" 
        width="24" 
        height="24" 
        loading="lazy" 
        decoding="async"
        aria-hidden="true"
        style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} 
      />
    ) 
  },
  { name: 'GSAP', icon: <SiGreensock color="#88CE02" aria-hidden="true" /> },
  { 
    name: 'Three.js', 
    icon: (
      <img 
        src="https://cdn.worldvectorlogo.com/logos/threejs-1.svg" 
        alt="" 
        width="24" 
        height="24" 
        loading="lazy" 
        decoding="async"
        aria-hidden="true"
        style={{ width: '24px', height: '24px', filter: 'invert(1)' }} 
      />
    ) 
  },
];

export default function TechMarquee({ className = '', reverse = false }) {
  const skillsList = techStacks.map(t => t.name).join(', ');

  return (
    <div className={`tech-marquee-container ${className}`.trim()}>
      {/* ── SEO & AI Engine Microdata (Schema.org / Screen Readers) ── */}
      <div 
        className="sr-only" 
        itemScope 
        itemType="https://schema.org/Person"
      >
        <p>
          Snigdhendu Chhotaray's Core Technical Skills and Software Technologies: 
          <span itemProp="knowsAbout">{skillsList}</span>.
        </p>
      </div>

      {/* ── Visual Animated Marquee Track ── */}
      <div className={`tech-marquee-track ${reverse ? 'reverse' : ''}`} aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="tech-marquee-content">
            {techStacks.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="tech-item">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}