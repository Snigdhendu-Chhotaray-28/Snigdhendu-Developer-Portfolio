import React, { useState } from 'react';
import { MapPin, Mail, Copy, Send, Check } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [result, setResult] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('chhotaraysnigdhendu@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for non-HTTPS or legacy browsers
      setCopied(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    const formPayload = new FormData(e.target);
    formPayload.append("access_key", "0a701485-6c76-4fbf-9baa-267a3e81ef59");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload
      });

      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully! Snigdhendu will get back to you soon.");
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setResult("Something went wrong. Please try emailing directly.");
      }
    } catch (error) {
      setResult("Submission error. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="contact-section"
      id="contact"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      {/* Header */}
      <div className="contact-header">
        <h2 id="contact-heading">CONTACT <span className="contact-highlight">ME</span></h2>
        <div className="contact-header-underline"></div>
      </div>

      <div className="contact-container">

        {/* Left Column: Info Box */}
        <div
          className="contact-info-box"
          itemScope
          itemType="https://schema.org/Person"
          itemProp="mainEntity"
        >
          <meta itemprop="name" content="Snigdhendu Chhotaray" />
          <meta itemprop="jobTitle" content="Frontend Developer & Freelancer" />

          <span className="contact-label">GET IN TOUCH</span>
          <h3 className="contact-title">LET'S BUILD SOMETHING EPIC TOGETHER</h3>
          <p className="contact-description">
            Have a project concept, work opportunity, or questions? Leave a message, and I'll respond as soon as possible.
          </p>

          <div className="contact-details">
            {/* Location Detail */}
            <div
              className="contact-detail-card"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              <div className="contact-icon-wrapper" aria-hidden="true">
                <MapPin size={18} />
              </div>
              <div className="contact-detail-text">
                <span className="detail-label">LOCATION</span>
                <span className="detail-value">
                  <span itemProp="addressLocality">Bhubaneswar</span>,{' '}
                  <span itemProp="addressRegion">Odisha</span>,{' '}
                  <span itemProp="addressCountry">India</span>
                </span>
              </div>
            </div>

            {/* Email Detail */}
            <div className="contact-detail-card">
              <div className="contact-icon-wrapper" aria-hidden="true">
                <Mail size={18} />
              </div>
              <div className="contact-detail-text">
                <span className="detail-label">EMAIL</span>
                <a
                  href="mailto:chhotaraysnigdhendu@gmail.com"
                  className="detail-value contact-email-link"
                  aria-label="Send email directly to Snigdhendu Chhotaray"
                  itemProp="email"
                >
                  chhotaraysnigdhendu@gmail.com
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="copy-email-btn"
            onClick={handleCopyEmail}
            aria-label={copied ? 'Email address copied to clipboard' : 'Copy email address chhotaraysnigdhendu@gmail.com to clipboard'}
          >
            {copied ? (
              <>
                <Check size={16} aria-hidden="true" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} aria-hidden="true" />
                Copy Email Address
              </>
            )}
          </button>
        </div>

        {/* Right Column: Form Box */}
        <div className="contact-form-box">
          <form id="contact-form" onSubmit={handleSubmit} aria-label="Contact Snigdhendu Chhotaray">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">FULL NAME <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL ADDRESS <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">MOBILE NUMBER <span>(optional)</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 90000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">SUBJECT <span className="required" aria-hidden="true">*</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Discussion"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="message">MESSAGE <span className="required" aria-hidden="true">*</span></label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Describe your project concept, timelines, or key questions..."
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              className="submit-message-btn"
              disabled={isSubmitting}
              aria-label={isSubmitting ? 'Submitting your message...' : 'Submit contact message to Snigdhendu Chhotaray'}
            >
              {isSubmitting ? 'SENDING...' : 'SUBMIT MESSAGE'}{' '}
              <Send size={16} className="btn-send-icon" aria-hidden="true" />
            </button>

            {result && (
              <p
                role="status"
                aria-live="polite"
                className="form-status-msg"
                style={{ marginTop: '14px', color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}
              >
                {result}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}