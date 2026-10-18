import React, { useRef, useLayoutEffect } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { Briefcase, Code, Monitor, GraduationCap, School, BookOpen, Server } from 'lucide-react';
import './EducationSection.css';

/* ── Data ──────────────────────────────────────────── */
const workData = [
  {
    id: 'w1',
    icon: Code,
    title: 'Web Developer Intern',
    company: 'Prodigy InfoTech',
    period: 'July 2025 – July 2025',
    points: [
      'Gained hands-on production experience building user-facing web pages and responsive layouts.',
      'Worked alongside design and engineering teams to transform UI wireframes into clean, standard code templates.',
      'Enhanced knowledge of version control systems, cross-browser compatibility, and modular codebase styling.',
    ],
  },
  {
    id: 'w2',
    icon: Briefcase,
    title: 'Web Developer Intern',
    company: 'CodeTech IT Solutions',
    period: 'August 2025 – Present',
    points: [
      'Gained hands-on production experience building user-facing web pages and responsive layouts.',
      'Worked alongside design and engineering teams to transform UI wireframes into clean, standard code templates.',
      'Enhanced knowledge of version control systems, cross-browser compatibility, and modular codebase styling.',
    ],
  }
];

const educationData = [
  {
    id: 'e0',
    icon: Server,
    degree: 'Post-Graduation (MCA)',
    institution: 'Veer Surendra Sai University of Technology',
    year: '1st Year (Present)',
    cgpa: null,
    note: 'Domain: DevOps Engineer',
    points: [
      'Currently pursuing Master of Computer Applications with a focus on DevOps engineering.',
      'Learning advanced system administration, continuous integration/continuous deployment (CI/CD) pipelines, and cloud infrastructure management.',
      'Building foundational skills for automation and scalable architecture deployments.',
    ],
  },
  {
    id: 'e1',
    icon: GraduationCap,
    degree: 'Graduation (BCA)',
    institution: 'College of Management and Technology',
    year: 'Completed in 2026',
    cgpa: '8.5 CGPA',
    note: null,
    points: [
      'Specialized in computer applications, programming paradigms, and software systems engineering.',
      'Gained hands-on experience in building relational databases, object-oriented software, and interactive web applications.',
      'Participated in practical code labs and collaborative projects to design digital interfaces and system frameworks.',
    ],
  },
  {
    id: 'e2',
    icon: School,
    degree: 'Senior Secondary (Class XII)',
    institution: 'Samanta Chandra Sekhar Higher Secondary School',
    year: 'Completed in 2023',
    cgpa: '57.8%',
    note: null,
    points: [
      'Graduated with an academic aggregate of 57.8%.',
      'Subject Combination: Physics, Chemistry, Math, Computer, English, Painting.',
      'Acquired early foundations in logical thinking, data arrays, science methodologies, and creative arts.',
    ],
  },
  {
    id: 'e3',
    icon: BookOpen,
    degree: 'Matriculation (Class X)',
    institution: 'Gangadhar Vidhya Niketan',
    year: 'Completed in 2021',
    cgpa: '88%',
    note: null,
    points: [
      'Graduated with an overall aggregate score of 88%.',
      'Engaged in science seminars, logic quizzes, and mathematical contests.',
      'Fostered essential analytical, computational, and problem-solving skills.',
    ],
  },
];

/* ── Animation variants ─────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: { duration: 0.38, delay: i * 0.15 + 0.2, ease: 'backOut' },
  }),
};

const colHeadVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Work card ─────────────────────────────────────── */
function WorkCard({ item, index }) {
  const ref = useRef(null);
  const activeRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isActive = useInView(activeRef, { margin: "10000px 0px -50% 0px" });

  return (
    <div className="jrn-card-row" ref={ref}>
      <motion.div
        ref={activeRef}
        className={`jrn-icon-node ${isActive ? 'active' : ''}`}
        custom={index}
        variants={dotVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {item.icon ? <item.icon size={16} /> : <Briefcase size={16} />}
      </motion.div>

      <motion.article
        className="jrn-card"
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        itemScope
        itemType="https://schema.org/EmployeeRole"
      >
        <div className="jrn-card-header">
          <h4 className="jrn-title" itemProp="roleName">{item.title}</h4>
          <span className="jrn-period">{item.period}</span>
        </div>

        <p
          className="jrn-company"
          itemProp="worksFor"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <span itemProp="name">{item.company}</span>
        </p>

        <ul className="jrn-points" itemProp="description">
          {item.points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
      </motion.article>
    </div>
  );
}

/* ── Education card ─────────────────────────────────── */
function EduCard({ item, index }) {
  const ref = useRef(null);
  const activeRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isActive = useInView(activeRef, { margin: "10000px 0px -50% 0px" });

  return (
    <div className="jrn-card-row" ref={ref}>
      <motion.div
        ref={activeRef}
        className={`jrn-icon-node ${isActive ? 'active' : ''}`}
        custom={index}
        variants={dotVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        aria-hidden="true"
      >
        {item.icon ? <item.icon size={16} /> : <GraduationCap size={16} />}
      </motion.div>

      <motion.article
        className="jrn-card"
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        itemScope
        itemType="https://schema.org/EducationalOccupationalCredential"
      >
        <div className="jrn-card-header">
          <h4 className="jrn-title" itemProp="credentialCategory">{item.degree}</h4>
          <span className="jrn-year-badge">{item.year}</span>
        </div>

        <div
          className="jrn-edu-meta"
          itemProp="recognizedBy"
          itemScope
          itemType="https://schema.org/EducationalOrganization"
        >
          <span className="jrn-institution" itemProp="name">{item.institution}</span>
          {item.cgpa && (
            <>
              <span className="jrn-sep" aria-hidden="true">·</span>
              <span className="jrn-cgpa">{item.cgpa}</span>
            </>
          )}
        </div>

        {item.note && <p className="jrn-note">{item.note}</p>}

        <ul className="jrn-points" itemProp="description">
          {item.points.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
      </motion.article>
    </div>
  );
}

/* ── Column with its own timeline ─────────────────── */
function TimelineColumn({ children }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="jrn-col-timeline" ref={containerRef}>
      <div className="jrn-vline-track" aria-hidden="true" />

      <motion.div
        className="jrn-vline-active"
        style={{ scaleY, transformOrigin: 'top center' }}
        aria-hidden="true"
      />

      <div className="jrn-col-cards">{children}</div>
    </div>
  );
}

/* ── Main section ───────────────────────────────────── */
export default function EducationSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  useLayoutEffect(() => {
    const syncHeights = () => {
      const cols = document.querySelectorAll('.jrn-col-cards');
      if (cols.length < 2) return;

      const workCards = cols[0].querySelectorAll('.jrn-card');
      const eduCards = cols[1].querySelectorAll('.jrn-card');

      workCards.forEach(card => card.style.minHeight = 'auto');
      eduCards.forEach(card => card.style.minHeight = 'auto');

      const maxLen = Math.max(workCards.length, eduCards.length);

      for (let i = 0; i < maxLen; i++) {
        const wCard = workCards[i];
        const eCard = eduCards[i];

        const wHeight = wCard ? wCard.getBoundingClientRect().height : 0;
        const eHeight = eCard ? eCard.getBoundingClientRect().height : 0;

        const maxHeight = Math.max(wHeight, eHeight);

        if (wCard) wCard.style.minHeight = `${maxHeight}px`;
        if (eCard) eCard.style.minHeight = `${maxHeight}px`;
      }
    };

    syncHeights();
    window.addEventListener('resize', syncHeights);

    const timeout = setTimeout(syncHeights, 100);

    return () => {
      window.removeEventListener('resize', syncHeights);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="journey"
      className="jrn-section"
      aria-labelledby="journey-heading"
      ref={sectionRef}
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemprop="name" content="Snigdhendu Chhotaray" />
      <meta itemprop="jobTitle" content="Frontend Developer & DevOps Engineer" />

      {/* Heading */}
      <motion.div
        className="jrn-heading"
        initial={{ opacity: 0, y: -28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -28 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="journey-heading">MY <span className="jrn-highlight">JOURNEY</span></h2>
      </motion.div>

      {/* 2-column grid */}
      <div className="jrn-grid">
        {/* ── Left: Work Experience ── */}
        <div className="jrn-col">
          <motion.h3
            className="jrn-col-title"
            variants={colHeadVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Work Experience
          </motion.h3>
          <TimelineColumn>
            {workData.map((item, i) => (
              <WorkCard key={item.id} item={item} index={i} />
            ))}
          </TimelineColumn>
        </div>

        {/* ── Right: Education ── */}
        <div className="jrn-col">
          <motion.h3
            className="jrn-col-title"
            variants={colHeadVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            Education
          </motion.h3>
          <TimelineColumn>
            {educationData.map((item, i) => (
              <EduCard key={item.id} item={item} index={i} />
            ))}
          </TimelineColumn>
        </div>
      </div>
    </section>
  );
}