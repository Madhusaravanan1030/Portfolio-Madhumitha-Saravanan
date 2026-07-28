import React, { useState, useEffect, useRef } from 'react';

function ProjectSlider({ screenshots, placeholder, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const total = screenshots ? screenshots.length : 0;

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (total <= 1 || isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isHovered]);

  if (!screenshots || screenshots.length === 0) {
    return (
      <div 
        className="pcard-placeholder-img" 
        style={{ background: placeholder?.gradient || 'linear-gradient(135deg,#1a2a2e,#1a1e3a)' }}
      >
        <div className="placeholder-icon">{placeholder?.icon || '👁️'}</div>
        <div className="placeholder-label">{placeholder?.label || title}</div>
      </div>
    );
  }

  return (
    <div 
      className="pcard-slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="pcard-slides" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {screenshots.map((src, idx) => (
          <img 
            key={idx} 
            className="pcard-slide" 
            src={src} 
            alt={`${title} Screenshot ${idx + 1}`} 
            onError={(e) => {
              const themeColor = title.includes('AgroSmart') ? '%231a2e1a' : (title.includes('OncoPhase') ? '%232e1a1a' : '%230d0d0d');
              const textColor = title.includes('AgroSmart') ? '%238f8' : (title.includes('OncoPhase') ? '%23f88' : '%23fff');
              e.currentTarget.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%25' height='100%25' fill='${themeColor}'/><text x='50%25' y='50%25' fill='${textColor}' font-size='24' text-anchor='middle' dy='.3em'>${title} Screenshot ${idx + 1}</text></svg>`;
            }}
          />
        ))}
      </div>

      {total > 1 && (
        <>
          <button className="pcard-arrow prev" onClick={handlePrev}>&#8592;</button>
          <button className="pcard-arrow next" onClick={handleNext}>&#8594;</button>
          <div className="pcard-dots">
            {screenshots.map((_, idx) => (
              <div 
                key={idx} 
                className={`pcard-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={(e) => handleDotClick(idx, e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const projectsData = [
  {
    id: 'cineiq',
    tag: 'ML & Full-Stack',
    title: 'CineIQ — AI Movie Recommender',
    desc: 'AI-powered movie recommendation platform using TF-IDF and Cosine Similarity. Features user authentication, watchlist management, trending movies, and intelligent content-based recommendations via TMDB API.',
    techs: ['React.js', 'Node.js', 'FastAPI', 'MongoDB', 'TMDB API'],
    links: [
      { text: 'Live Demo', url: 'https://cine-iq-omega.vercel.app/', type: 'primary' },
      { text: 'GitHub', url: 'https://github.com/Madhusaravanan1030/cineIQ', type: 'secondary' }
    ],
    screenshots: [
      '/cineIQ_screenshot/cineiq_1.png',
      '/cineIQ_screenshot/cineiq_2.png',
      '/cineIQ_screenshot/cineiq_3.png'
    ],
    delay: 'fade-in-delay-1'
  },
  {
    id: 'linksnap',
    tag: 'Full-Stack',
    title: 'LinkSnap — URL Shortener',
    desc: 'Full-stack URL shortener with click analytics, QR code generation, link management dashboard, expiry control, and JWT-based user authentication.',
    techs: ['React.js', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    links: [
      { text: 'GitHub', url: 'https://github.com/Madhusaravanan1030/linksnap', type: 'secondary' }
    ],
    screenshots: [
      '/linksnap_screenshot/link_1.png',
      '/linksnap_screenshot/link_2.png',
      '/linksnap_screenshot/link_3.png',
      '/linksnap_screenshot/link_4.png'
    ],
    delay: 'fade-in-delay-2'
  },
  {
    id: 'papertopodcast',
    tag: 'GenAI & Audio',
    title: 'Paper to Podcast',
    desc: 'AI-powered app that transforms research paper PDFs into engaging podcast episodes using Llama 3.3 70B and dual-voice TTS. Automates PDF extraction, script generation, and audio production.',
    techs: ['Llama 3.3', 'FastAPI', 'Python', 'TTS', 'PyPDF'],
    links: [
      { text: 'GitHub', url: 'https://github.com/Madhusaravanan1030/Paper-to-Podcast', type: 'secondary' }
    ],
    screenshots: [
      '/papertopodcast_screenshot/ptp_1.png',
      '/papertopodcast_screenshot/ptp_2.png',
      '/papertopodcast_screenshot/ptp_3.png'
    ],
    delay: 'fade-in-delay-3'
  },
  {
    id: 'agrosmart',
    tag: 'IoT & AI',
    title: 'AgroSmart — Smart Irrigation using IoT & AI',
    desc: 'IoT-enabled smart irrigation system with Arduino Uno, DHT11, and soil moisture sensors for real-time environmental monitoring and automated irrigation control via mobile app.',
    techs: ['Arduino', 'ESP8266', 'Python', 'Flutter'],
    links: [],
    screenshots: [
      '/agrosmart_screenshot/agro_1.png',
      '/agrosmart_screenshot/agro_2.png',
      '/agrosmart_screenshot/agro_3.png',
      '/agrosmart_screenshot/agro_4.png',
      '/agrosmart_screenshot/agro_5.png',
      '/agrosmart_screenshot/agro_6.png'
    ],
    delay: 'fade-in-delay-4'
  },
  {
    id: 'oncophase',
    tag: 'AI & Healthcare',
    title: 'OncoPhase — Breast Cancer Progression Predictor',
    desc: 'Advanced AI model using XGBoost Cox survival models with transformer networks. SHAP-based explainability provides transparent and interpretable clinical risk insights.',
    techs: ['XGBoost', 'Transformers', 'SHAP', 'Python'],
    links: [],
    screenshots: [
      '/oncophase_screenshot/screenshot_1.png',
      '/oncophase_screenshot/screenshot_2.png',
      '/oncophase_screenshot/screenshot_3.png',
      '/oncophase_screenshot/screenshot_4.png',
      '/oncophase_screenshot/screenshot_5.png',
      '/oncophase_screenshot/screenshot_6.png',
      '/oncophase_screenshot/screenshot_7.png',
      '/oncophase_screenshot/screenshot_8.png',
      '/oncophase_screenshot/screenshot_9.png'
    ],
    delay: 'fade-in-delay-1'
  },
  {
    id: 'secondsight',
    tag: 'Computer Vision',
    title: 'Second Sight — Visual Guide for Blind',
    desc: 'Smartphone-based AI app with real-time obstacle detection and OCR. Offline-capable Android application enhancing accessibility and independence for visually impaired users.',
    techs: ['Android', 'OpenCV', 'Deep Learning', 'Python'],
    links: [],
    placeholder: {
      gradient: 'linear-gradient(135deg,#1a2a2e,#1a1e3a)',
      icon: '👁️',
      label: 'Second Sight'
    },
    delay: 'fade-in-delay-2'
  }
];

export default function Projects() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
    card.style.transition = 'transform 0.1s ease';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-container">
        <div className="fade-in">
          <span className="section-label">Selected Work</span>
          <h2 className="section-title">Featured <em>Projects</em></h2>
          <p className="section-sub">AI, ML, IoT, and Full-Stack Applications</p>
        </div>
        <div className="projects-grid-v2">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className={`pcard fade-in ${project.delay}`} 
              data-index="0"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <ProjectSlider 
                screenshots={project.screenshots} 
                placeholder={project.placeholder} 
                title={project.title} 
              />
              <div className="pcard-body">
                <span className="pcard-tag">{project.tag}</span>
                <h3 className="pcard-title">{project.title}</h3>
                <p className="pcard-desc">{project.desc}</p>
                <div className="pcard-techs">
                  {project.techs.map((tech, idx) => (
                    <span key={idx} className="pcard-tech">{tech}</span>
                  ))}
                </div>
                {project.links && project.links.length > 0 && (
                  <div className="pcard-links">
                    {project.links.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`pcard-link ${link.type}`}
                      >
                        {link.text === 'Live Demo' ? '▶ ' : '</> '}{link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
