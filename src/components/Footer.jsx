import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div
        className="footer-container"
        itemScope
        itemType="https://schema.org/Person"
      >
        <meta itemprop="jobTitle" content="Frontend Developer & Freelancer" />
        <meta itemprop="addressLocality" content="Bhubaneswar" />
        <meta itemprop="addressCountry" content="India" />

        {/* Left: Copyright & Author Schema */}
        <p className="copyright">
          © 2025–{currentYear}{' '}
          <span
            className="copyright-name"
            itemProp="copyrightHolder name"
          >
            Snigdhendu Chhotaray
          </span>
          . All rights reserved.
        </p>

        {/* Right: Verified Social Profiles for Google Entity Graph & AI Citation */}
        <div className="footer-socials" aria-label="Social media profiles">
          <a
            href="https://github.com/Snigdhendu-Chhotaray-28"
            target="_blank"
            rel="noopener noreferrer me"
            className="social-icon-btn github-btn"
            aria-label="Snigdhendu Chhotaray on GitHub"
            itemProp="sameAs"
          >
            <FaGithub size={18} aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/in/snigdhendu-chhotaray"
            target="_blank"
            rel="noopener noreferrer me"
            className="social-icon-btn linkedin-btn"
            aria-label="Snigdhendu Chhotaray on LinkedIn"
            itemProp="sameAs"
          >
            <FaLinkedinIn size={18} aria-hidden="true" />
          </a>

          <a
            href="https://x.com/Snigdhendu_28"
            target="_blank"
            rel="noopener noreferrer me"
            className="social-icon-btn x-btn"
            aria-label="Snigdhendu Chhotaray on X (Twitter)"
            itemProp="sameAs"
          >
            <XIcon />
          </a>
        </div>

      </div>
    </footer>
  );
}