import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown, ChevronUp, FileText, Award, Shield } from 'lucide-react';
import './CertificatesModal.css';

export default function CertificatesModal({ isOpen, onClose }) {
  const [expandedSection, setExpandedSection] = useState('internships');
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (isOpen || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, lightboxImage]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="modal-overlay"
        onClick={onClose}
        data-lenis-prevent="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title-group">
              <div className="modal-icon" aria-hidden="true">
                <Award size={24} />
              </div>
              <div>
                <h2 id="cert-modal-title">CREDENTIALS & DOCUMENTS</h2>
                <p>VERIFIED ACADEMIC & CAREER RECORDS</p>
              </div>
            </div>
            <button
              className="close-btn"
              onClick={onClose}
              aria-label="Close credentials modal"
            >
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            {/* Section 1: Badges */}
            <div className="accordion-section">
              <button
                type="button"
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'badges' ? '' : 'badges')}
                aria-expanded={expandedSection === 'badges'}
                aria-controls="badges-content"
              >
                <div className="accordion-title">
                  <span className="icon" aria-hidden="true"><Shield size={18} /></span> BADGES & MICRO-CREDENTIALS
                </div>
                <div className="accordion-right">
                  <span className="item-count">0 Items</span>
                  {expandedSection === 'badges' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {expandedSection === 'badges' && (
                <div id="badges-content" className="accordion-content">
                  No badges yet.
                </div>
              )}
            </div>

            {/* Section 2: Certifications */}
            <div className="accordion-section">
              <button
                type="button"
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'certs' ? '' : 'certs')}
                aria-expanded={expandedSection === 'certs'}
                aria-controls="certs-content"
              >
                <div className="accordion-title">
                  <span className="icon" aria-hidden="true"><Award size={18} /></span> CERTIFICATIONS & COURSEWORK
                </div>
                <div className="accordion-right">
                  <span className="item-count">0 Items</span>
                  {expandedSection === 'certs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {expandedSection === 'certs' && (
                <div id="certs-content" className="accordion-content">
                  No certifications yet.
                </div>
              )}
            </div>

            {/* Section 3: Internships & LoR */}
            <div className="accordion-section">
              <button
                type="button"
                className="accordion-header"
                onClick={() => setExpandedSection(expandedSection === 'internships' ? '' : 'internships')}
                aria-expanded={expandedSection === 'internships'}
                aria-controls="internships-content"
              >
                <div className="accordion-title">
                  <span className="icon" aria-hidden="true"><FileText size={18} /></span> INTERNSHIPS & LETTER OF RECOMMENDATION
                </div>
                <div className="accordion-right">
                  <span className="item-count">2 Items</span>
                  {expandedSection === 'internships' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {expandedSection === 'internships' && (
                <div id="internships-content" className="accordion-content certificates-grid">

                  {/* Certificate 1: Web Dev Internship */}
                  <article
                    className="cert-card"
                    itemScope
                    itemType="https://schema.org/EducationalOccupationalCredential"
                  >
                    <meta itemprop="credentialCategory" content="Web Development Internship Certificate" />
                    <meta itemprop="validFrom" content="2025-07-01" />

                    <button
                      type="button"
                      className="cert-img-container"
                      onClick={() => setLightboxImage('/Certificate_page-0001.jpg')}
                      aria-label="View enlarged Web Development Internship Certificate for Snigdhendu Chhotaray"
                    >
                      <img
                        src="/Certificate_page-0001.jpg"
                        alt="Snigdhendu Chhotaray — Web Development Internship Certificate from Prodigy InfoTech"
                        className="cert-preview-img"
                        loading="lazy"
                        width="400"
                        height="280"
                        itemProp="image"
                      />
                      <div className="cert-img-overlay" aria-hidden="true">
                        <span className="view-btn">Click to View</span>
                      </div>
                    </button>

                    <div className="cert-info">
                      <div className="cert-info-header">
                        <h4 itemprop="name">Web Development Internship</h4>
                        <span className="cert-date">Jul 1, 2025 - Jul 31, 2025</span>
                      </div>

                      <p
                        className="cert-company"
                        itemProp="recognizedBy"
                        itemScope
                        itemType="https://schema.org/Organization"
                      >
                        <span itemProp="name">Prodigy Infotech</span>
                      </p>

                      <p className="cert-desc" itemprop="description">
                        A One Month Intensive Training program focused on in-demand web development skills.
                      </p>

                      <div className="cert-actions">
                        <a
                          href="https://prodigyinfotech.dev/verify?cin=PIT/JUL25/05314"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-tag"
                          style={{ textDecoration: 'none' }}
                          itemProp="url"
                          aria-label="Verify Prodigy InfoTech internship credential for Snigdhendu Chhotaray"
                        >
                          Verify →
                        </a>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setLightboxImage('/Certificate_page-0001.jpg'); }}
                          className="cert-link"
                          style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', padding: 0 }}
                        >
                          View Full Doc →
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* Certificate 2: Letter of Recommendation */}
                  <article
                    className="cert-card"
                    itemScope
                    itemType="https://schema.org/EducationalOccupationalCredential"
                  >
                    <meta itemprop="credentialCategory" content="Letter of Recommendation" />
                    <meta itemprop="validFrom" content="2025-08-02" />

                    <button
                      type="button"
                      className="cert-img-container"
                      onClick={() => setLightboxImage('/Letter of Recommendation_page-0001.jpg')}
                      aria-label="View enlarged Letter of Recommendation for Snigdhendu Chhotaray"
                    >
                      <img
                        src="/Letter of Recommendation_page-0001.jpg"
                        alt="Snigdhendu Chhotaray — Letter of Recommendation from Prodigy InfoTech"
                        className="cert-preview-img"
                        loading="lazy"
                        width="400"
                        height="280"
                        itemProp="image"
                      />
                      <div className="cert-img-overlay" aria-hidden="true">
                        <span className="view-btn">Click to View</span>
                      </div>
                    </button>

                    <div className="cert-info">
                      <div className="cert-info-header">
                        <h4 itemprop="name">Letter Of Recommendation</h4>
                        <span className="cert-date">Aug 2, 2025</span>
                      </div>

                      <p
                        className="cert-company"
                        itemProp="recognizedBy"
                        itemScope
                        itemType="https://schema.org/Organization"
                      >
                        <span itemProp="name">Prodigy Infotech</span>
                      </p>

                      <p className="cert-desc" itemprop="description">
                        Official Letter of Recommendation for outstanding performance during the Web Development Internship.
                      </p>

                      <div className="cert-actions">
                        <span className="cert-tag">LoR</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setLightboxImage('/Letter of Recommendation_page-0001.jpg'); }}
                          className="cert-link"
                          style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', padding: 0 }}
                        >
                          View Full Doc →
                        </button>
                      </div>
                    </div>
                  </article>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImage(null)}
          data-lenis-prevent="true"
          role="dialog"
          aria-label="Enlarged document preview"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
            aria-label="Close enlarged document view"
          >
            &times;
          </button>
          <img
            src={lightboxImage}
            alt="Snigdhendu Chhotaray — Enlarged credential document"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>,
    document.body
  );
}