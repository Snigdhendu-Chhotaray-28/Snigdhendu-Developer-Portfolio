import React from 'react';
import { Star } from 'lucide-react';
import './AchievementsSection.css';

const feedbacks = [
  {
    id: 1,
    quote: '"Translates design systems into responsive React with incredible accuracy. A true asset to any team."',
    initials: 'SR',
    color: '#3b82f6',
    name: 'Satyajit Rautaray',
    position: 'Software Engineer @ Equifax',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: 2,
    quote: '"Snigdhendu is a brilliant developer who brought our complex e-commerce interface to life. He delivered our WebGL landing page ahead of schedule, with..."',
    initials: 'SK',
    color: '#f43f5e',
    name: 'SK Imdad Hussain',
    position: 'Founder @ Golden Tree Enterprises',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: 3,
    quote: '"Working with him was a great experience. He is very consistent and delivers high quality results every time."',
    initials: 'HM',
    color: '#8b5cf6',
    name: 'Himanshu Mishra',
    position: 'Manager',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: 4,
    quote: '"Very dedicated and a very good developer. Always ready to learn new technology."',
    initials: 'PW',
    color: '#10b981',
    name: 'Physics Wallah',
    position: 'Client',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: 5,
    quote: '"Snigdhendu is a very friendly person and a very good fast learning developer. He is very consistent to his field of work."',
    initials: 'AT',
    color: '#0ea5e9',
    name: 'Amlan Tripathy',
    position: 'Associate Manager @ Sundaram Finance',
    linkedin: 'https://linkedin.com/'
  },
  {
    id: 6,
    quote: '"The video editing and website development for our channels were highly professional."',
    initials: 'CN',
    color: '#d946ef',
    name: 'Chandrakant N',
    position: 'Political Member',
    linkedin: 'https://linkedin.com/'
  }
];

export default function AchievementsSection() {
  const row1 = feedbacks.slice(0, 3);
  const row2 = feedbacks.slice(3, 6);

  const row1Set = [...row1, ...row1];
  const row2Set = [...row2, ...row2];

  return (
    <section
      className="achievements-section"
      id="achievements"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <meta itemprop="name" content="Client Testimonials and Endorsements for Snigdhendu Chhotaray" />
      <meta itemprop="description" content="Client feedbacks, recommendations, and reviews for Snigdhendu Chhotaray, Frontend Developer and Freelancer in India." />

      {/* Main Section Header */}
      <div className="section-main-header">
        <h2>ACHIEVEMENTS</h2>
        <div className="header-underline"></div>
      </div>

      <div className="achievements-container achievements-layout">

        {/* Right Column: Feedbacks */}
        <div className="achivement-collaboration">
          <div className="achievements-header">
            <span className="client-feedbacks-label">CLIENT FEEDBACKS</span>
            <h3 className="feedbacks-title">TRUSTED BY COLLABORATORS</h3>
          </div>

          <div className="feedbacks-marquee-wrapper">
            {/* ROW 1 */}
            <div className="feedbacks-marquee-track row-1">
              {[...row1Set, ...row1Set].map((feedback, index) => {
                const isDuplicate = index >= row1.length;
                return (
                  <article
                    className="feedback-card"
                    key={`r1-${feedback.id}-${index}`}
                    {...(isDuplicate
                      ? { 'aria-hidden': 'true' }
                      : {
                          itemScope: true,
                          itemType: 'https://schema.org/Review',
                          itemProp: 'itemListElement',
                        })}
                  >
                    {!isDuplicate && (
                      <>
                        <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Person">
                          <meta itemprop="name" content="Snigdhendu Chhotaray" />
                          <meta itemprop="jobTitle" content="Frontend Developer" />
                        </div>
                        <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemprop="ratingValue" content="5" />
                          <meta itemprop="bestRating" content="5" />
                        </div>
                      </>
                    )}

                    <div className="stars" aria-label="5 out of 5 stars rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#eab308" color="#eab308" aria-hidden="true" />
                      ))}
                    </div>

                    <p className="feedback-quote" {...(!isDuplicate && { itemProp: 'reviewBody' })}>
                      {feedback.quote}
                    </p>

                    <div className="feedback-author">
                      <div
                        className="author-avatar"
                        style={{ background: feedback.color }}
                        aria-hidden="true"
                      >
                        {feedback.initials}
                      </div>
                      <div
                        className="author-info"
                        {...(!isDuplicate && {
                          itemProp: 'author',
                          itemScope: true,
                          itemType: 'https://schema.org/Person',
                        })}
                      >
                        <a
                          href={feedback.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link"
                          aria-label={`LinkedIn profile of ${feedback.name}`}
                          tabIndex={isDuplicate ? -1 : 0}
                        >
                          <h4 {...(!isDuplicate && { itemProp: 'name' })}>{feedback.name}</h4>
                        </a>
                        <span {...(!isDuplicate && { itemProp: 'jobTitle' })}>{feedback.position}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ROW 2 (Slower Scroll) */}
            <div className="feedbacks-marquee-track row-2">
              {[...row2Set, ...row2Set].map((feedback, index) => {
                const isDuplicate = index >= row2.length;
                return (
                  <article
                    className="feedback-card"
                    key={`r2-${feedback.id}-${index}`}
                    {...(isDuplicate
                      ? { 'aria-hidden': 'true' }
                      : {
                          itemScope: true,
                          itemType: 'https://schema.org/Review',
                          itemProp: 'itemListElement',
                        })}
                  >
                    {!isDuplicate && (
                      <>
                        <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Person">
                          <meta itemprop="name" content="Snigdhendu Chhotaray" />
                          <meta itemprop="jobTitle" content="Frontend Developer" />
                        </div>
                        <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                          <meta itemprop="ratingValue" content="5" />
                          <meta itemprop="bestRating" content="5" />
                        </div>
                      </>
                    )}

                    <div className="stars" aria-label="5 out of 5 stars rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#eab308" color="#eab308" aria-hidden="true" />
                      ))}
                    </div>

                    <p className="feedback-quote" {...(!isDuplicate && { itemProp: 'reviewBody' })}>
                      {feedback.quote}
                    </p>

                    <div className="feedback-author">
                      <div
                        className="author-avatar"
                        style={{ background: feedback.color }}
                        aria-hidden="true"
                      >
                        {feedback.initials}
                      </div>
                      <div
                        className="author-info"
                        {...(!isDuplicate && {
                          itemProp: 'author',
                          itemScope: true,
                          itemType: 'https://schema.org/Person',
                        })}
                      >
                        <a
                          href={feedback.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linkedin-link"
                          aria-label={`LinkedIn profile of ${feedback.name}`}
                          tabIndex={isDuplicate ? -1 : 0}
                        >
                          <h4 {...(!isDuplicate && { itemProp: 'name' })}>{feedback.name}</h4>
                        </a>
                        <span {...(!isDuplicate && { itemProp: 'jobTitle' })}>{feedback.position}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}