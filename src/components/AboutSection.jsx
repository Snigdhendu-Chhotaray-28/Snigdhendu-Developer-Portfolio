import React from 'react';
import Lanyard from './Lanyard';
import BlurText from './BlurText';

import './AboutSection.css';

export default function AboutSection() {

  const handleHireMe = () => {
    window.location.href = `mailto:chhotaraysnigdhendu@gmail.com?subject=Hiring%20Inquiry%20%E2%80%93%20Frontend%20Developer%20%26%20DevOps%20Engineer&body=Hello,%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity%20with%20you.%0A%0AI'm%20interested%20in%20hiring%20you%20for%20a%20project%20or%20role%20that%20matches%20your%20expertise%20as%20a%20Frontend%20Developer%20and%20DevOps%20Engineer.%20Please%20let%20me%20know%20your%20availability,%20rates,%20and%20the%20best%20time%20to%20connect.%0A%0ALooking%20forward%20to%20hearing%20from%20you.`;
  };

  const blurFrom = { filter: 'blur(10px)', opacity: 0, y: 0 };
  const blurTo = [
    { filter: 'blur(5px)', opacity: 0.5, y: 0 },
    { filter: 'blur(0px)', opacity: 1, y: 0 }
  ];

  return (
    <section aria-labelledby="about-heading" className="about-section">


      <div className="about-header">
        <h2 id="about-heading">ABOUT <span className="highlight">ME</span></h2>
      </div>

      <div className="about-content">
        {/* ── Left: bio text ── */}
        <div className="about-text-column">
          <div className="about-text-heading">
            <h3>Hi, I'm Snigdhendu</h3>
          </div>
          <div className="about-description">
            <BlurText
              text="Over the last few years, I have developed a strong coding background and keep improving it day by day. I am passionate about creating responsive, beautiful, and interactive web experiences. My journey involves exploring cutting-edge technologies and blending design with logic."
              delay={20}
              animateBy="words"
              animationFrom={blurFrom}
              animationTo={blurTo}
              className="about-desc-paragraph"
            />
            <br />
            <BlurText
              text="Whether it's front-end aesthetics, 3D web graphics, or complex back-end architectures, I strive for excellence and innovation in every project I take on."
              delay={20}
              animateBy="words"
              animationFrom={blurFrom}
              animationTo={blurTo}
              className="about-desc-paragraph"
            />
          </div>

          <div className="about-actions">
            <button className="hire-btn" onClick={handleHireMe} aria-label="Send hiring inquiry email to Snigdhendu">Hire Me</button>
            <a href="/Resume.pdf" download className="resume-btn" target="_blank" rel="noopener noreferrer" aria-label="Download Snigdhendu's resume as PDF">
              View Resume
            </a>
          </div>
        </div>

        {/* ── Right: interactive Lanyard card ── */}
        <div className="about-lanyard-column">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent={true}
            frontImage="/hero-img.png"
            backImage="/logo-sgc.jpg"
          />
        </div>
      </div>
    </section>
  );
}
