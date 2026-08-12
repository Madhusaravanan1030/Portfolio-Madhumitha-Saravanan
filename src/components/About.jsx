import React, { useEffect, useState, useRef } from 'react';

function StatCount({ target, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === "∞") return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        const isDecimal = target % 1 !== 0;
        const start = performance.now();
        
        let frameId;
        const update = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3); // cubic ease out
          const val = target * ease;
          
          setValue(isDecimal ? parseFloat(val.toFixed(2)) : Math.floor(val));
          
          if (p < 1) {
            frameId = requestAnimationFrame(update);
          } else {
            setValue(target);
          }
        };
        
        frameId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameId);
      }
    }, { threshold: 0.12 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration]);

  if (target === "∞") {
    return <div className="stat-value">∞</div>;
  }

  const isDecimal = target % 1 !== 0;
  const displayValue = isDecimal ? value.toFixed(2) : value + (target > 10 ? '' : '+');

  return (
    <div ref={ref} className="stat-value">
      {displayValue}
    </div>
  );
}

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-container">

        {/* TOP ROW: Photo Left | Story Right */}
        <div className="about-top-row">
          {/* Profile Photo Column */}
          <div className="about-anime-col fade-in">
            <div className="anime-frame">
              <div className="anime-ring-1"><div class="anime-ring-dot"></div></div>
              <div className="anime-ring-2"></div>
              <div className="anime-img-wrap">
                <img 
                  src="/my_photo.jpg" 
                  alt="Madhumitha Saravanan" 
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'260\' height=\'260\'%3E%3Ccircle cx=\'130\' cy=\'130\' r=\'130\' fill=\'%23FFF0F5\'/%3E%3Ctext x=\'130\' y=\'155\' font-size=\'90\' text-anchor=\'middle\'%3E👩‍💻%3C/text%3E%3C/svg%3E';
                  }} 
                />
              </div>
            </div>
            <div className="anime-greeting">
            </div>
          </div>

          {/* Story Column */}
          <div className="about-story-col fade-in fade-in-delay-1">
            <span className="section-label">The Story</span>
            <h2 className="section-title">About <em>Me</em></h2>
            <div className="about-text">
              <p>Hi there! I'm Madhumitha Saravanan, a passionate Computer Science student specialising in AI &amp; Data Science at Dr. N.G.P. Institute of Technology. I believe technology should solve real problems and that's exactly what drives me every day.</p>
              <p>I started with the fundamentals of machine learning and deep learning, then moved into NLP and computer vision to understand how machines interpret language and images. That foundation pulled me toward Generative AI, where I now explore RAG and agentic workflows to build AI systems that are genuinely useful, not just impressive demos.</p>
              <p>Whether it's developing OncoPhase (an AI cancer progression predictor), building a visual guide for the blind, or crafting data pipelines , I bring curiosity, grit, and a love for learning to everything I do.</p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Achievements Left | Stats Right */}
        <div className="about-bottom-row">
          {/* Achievements */}
          <div className="fade-in">
            <span className="section-label">Achievements</span>
            <div className="highlight-list">
              <div className="highlight-item">
                <span className="highlight-num">01</span>
                <span className="highlight-text">Presented a research paper, "AI in Human Resources," at an International Conference</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num">02</span>
                <span className="highlight-text">Developed a UPI Payment Solution for underage teens in a hackathon at MIT College</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num">03</span>
                <span className="highlight-text">Built the AI Breast Cancer Progression Predictor in a 24-hour hackathon hosted by Dr. N.G.P. Institute of Technology</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="fade-in fade-in-delay-1">
            <span className="section-label">By the Numbers</span>
            <div className="about-stats" style={{ marginTop: '1rem' }}>
              <div className="stat">
                <StatCount target={8.03} />
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat">
                <StatCount target={6} />
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <StatCount target={1} />
                <div className="stat-label">Internship</div>
              </div>
              <div className="stat">
                <StatCount target="∞" />
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
