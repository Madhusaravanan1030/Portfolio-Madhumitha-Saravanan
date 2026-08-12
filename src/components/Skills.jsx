import React from 'react';

const skillsData = [
  { category: 'Languages', skills: ['Python', 'SQL', 'Java', 'JavaScript'], delay: '' },
  { category: 'Machine Learning & NLP', skills: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'Clustering', 'Decision Trees', 'Ensemble Methods (XGBoost, Random Forest)', 'Survival Analysis (Cox Models)', 'Model Explainability (SHAP)'], delay: 'fade-in-delay-1' },
  { category: 'Generative AI & LLMs', skills: ['RAG', 'LLM Agentic Workflows', 'Prompt Engineering', 'Llama 3.3', 'Transformers'], delay: 'fade-in-delay-2' },
  { category: 'Computer Vision', skills: ['OCR', 'Real-time Object Detection', 'Image Classification', 'Feature Extraction'], delay: 'fade-in-delay-3' },
  { category: 'MLOps & Deployment', skills: ['CI/CD Pipelines', 'Git', 'REST API Deployment (FastAPI, Flask)'], delay: '' },
  { category: 'Cloud', skills: ['Microsoft Azure'], delay: 'fade-in-delay-1' },
  { category: 'Frontend & Backend', skills: ['MongoDB', 'SQL', 'Pandas', 'Node.js', 'Express.js', 'React.js'], delay: 'fade-in-delay-2' }
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
