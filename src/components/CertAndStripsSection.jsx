import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TechMarquee from './TechMarquee';
import CertificatesModal from './CertificatesModal';
import './CertAndStripsSection.css';

export default function CertAndStripsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const constraintsRef = useRef(null);

  const softSkills = [
    { label: "Drawing", top: "45%", left: "15%", rotate: -10 },
    { label: "Riding bikes", top: "50%", left: "40%", rotate: 8 },
    { label: "Cinematography", top: "75%", left: "30%", rotate: -5 },
    { label: "Badminton", top: "70%", left: "60%", rotate: -8 },
    { label: "Color grading", top: "15%", left: "55%", rotate: -6 },
    { label: "Cricket", top: "25%", left: "35%", rotate: -12 },
    { label: "Photography", top: "40%", left: "55%", rotate: -8 },
    { label: "Video editing", top: "15%", left: "15%", rotate: 8 },
    { label: "Sketching", top: "70%", left: "15%", rotate: 10 },
  ];

  const expertiseFields = [
    "Frontend Development",
    "AI / ML Integration",
    "Cloud Computing",
    "DevOps & CI/CD"
  ];

  return (
    <section
      aria-labelledby="skills-section-heading"
      className="cert-strips-section"
      id="skills"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Hidden Schema Meta to align with root Person entity */}
      <meta itemprop="name" content="Snigdhendu Chhotaray" />
      <meta itemprop="jobTitle" content="Frontend Developer" />

      <h2 id="skills-section-heading" className="sr-only">
        Technical Expertise, Certifications, and Work Experience of Snigdhendu Chhotaray
      </h2>

      <CertificatesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="cert-strips-container">

        {/* Left Column: Expertise + Certificates */}
        <div className="cert-column">
          {/* Expertise In */}
          <div className="exp-cert-card expertise-card cert-only-card">
            <h3>Expertise in</h3>
            <div className="expertise-list">
              {expertiseFields.map((skill, index) => (
                <div key={index} className="expertise-item" itemprop="knowsAbout">
                  <span className="expertise-num">{index + 1}</span>
                  <span className="expertise-text">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Button Trigger */}
          <button
            type="button"
            className="exp-cert-card certificates-card cert-only-card"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open technical certifications, badges, and academic credentials modal"
            aria-haspopup="dialog"
            style={{ cursor: 'pointer', textAlign: 'inherit' }}
          >
            <div className="cert-icon-wrapper" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <h3>Click to View Certificates</h3>
            <p>Explore my technical certifications, badges, and academic credentials.</p>
          </button>
        </div>

        {/* Right Column: Strips + Experienced From + Soft Skills */}
        <div className="strips-column">
          {/* Parallel Strips */}
          <div className="strips-box" aria-label="Core technological skills marquee">
            <TechMarquee className="parallel-strip" />
            <TechMarquee className="parallel-strip" reverse={true} />
          </div>

          {/* Experienced From */}
          <div className="exp-cert-card experienced-from-card cert-only-card">
            <h3>Experienced from</h3>
            <div className="companies-container" aria-label="Organizations and companies worked with">
              <div className="companies-track">
                {[1, 2, 3, 4, 5, 6].map(setIndex => {
                  const isDuplicate = setIndex > 1;
                  return (
                    <React.Fragment key={`comp-set-${setIndex}`}>
                      <div
                        className="company-badge"
                        {...(!isDuplicate && {
                          itemProp: 'worksFor',
                          itemScope: true,
                          itemType: 'https://schema.org/Organization',
                        })}
                        {...(isDuplicate && { 'aria-hidden': 'true' })}
                      >
                        <span className="company-icon" aria-hidden="true">💡</span>
                        <span {...(!isDuplicate && { itemProp: 'name' })}>Prodigy InfoTech</span>
                      </div>

                      <div
                        className="company-badge"
                        {...(!isDuplicate && {
                          itemProp: 'worksFor',
                          itemScope: true,
                          itemType: 'https://schema.org/Organization',
                        })}
                        {...(isDuplicate && { 'aria-hidden': 'true' })}
                      >
                        <span className="company-icon" aria-hidden="true">💻</span>
                        <span {...(!isDuplicate && { itemProp: 'name' })}>CodeTech IT Solutions</span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div className="exp-cert-card soft-skills-card cert-only-card">
            <div className="soft-skills-bg-text" aria-hidden="true">
              LIFE BEYOND<br />CODE
            </div>
            <p className="soft-skills-drag-text">Drag to explore my hobbies and interests</p>
            
            <div
              className="soft-skills-canvas"
              ref={constraintsRef}
              aria-label="Snigdhendu Chhotaray personal hobbies and interests"
            >
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="soft-skill-pill"
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.95, cursor: "grabbing" }}
                  style={{
                    top: skill.top,
                    left: skill.left,
                    rotate: skill.rotate,
                  }}
                  tabIndex={0}
                  aria-label={`Hobby: ${skill.label}`}
                >
                  {skill.label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}