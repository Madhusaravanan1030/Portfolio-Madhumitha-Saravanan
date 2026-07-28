import React from 'react';

const skillsData = [
  { category: 'Languages', skills: ['Python', 'Java', 'JavaScript'], delay: '' },
  { category: 'Databases', skills: ['SQL', 'DBMS', 'MongoDB'], delay: 'fade-in-delay-1' },
  { category: 'AI / ML', skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'], delay: 'fade-in-delay-2' },
  { category: 'Data Science', skills: ['Pandas', 'Scikit-learn', 'XGBoost', 'TensorFlow'], delay: 'fade-in-delay-3' },
  { category: 'Frontend', skills: ['React.js', 'HTML', 'CSS'], delay: '' },
  { category: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs', 'Python Backend'], delay: 'fade-in-delay-1' },
  { category: 'App Dev', skills: ['Streamlit', 'Flutter'], delay: 'fade-in-delay-2' },
  { category: 'Cloud & DevOps', skills: ['AWS', 'GCP', 'Docker', 'Kubernetes'], delay: 'fade-in-delay-3' },
  { category: 'Generative AI', skills: ['LLMs', 'Transformers'], delay: '' },
  { category: 'Tools & Design', skills: ['Figma'], delay: 'fade-in-delay-1' }
];

export default function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <div className="fade-in skills-header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">Skills &amp; <em>Technologies</em></h2>
          <p className="section-sub">A curated collection of tools and frameworks I use to bring ideas to life</p>
        </div>

        <div className="skills-cards-grid">
          {skillsData.map((categoryData, idx) => (
            <div key={idx} className={`skill-card-v3 fade-in ${categoryData.delay}`}>
              <div className="skill-card-inner">
                <div className="skill-card-title">{categoryData.category}</div>
                <div className="skill-pill-wrap">
                  {categoryData.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
