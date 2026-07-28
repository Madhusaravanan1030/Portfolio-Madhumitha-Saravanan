import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', or ''
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // Replace with your Web3Forms Access Key
  const accessKey = "b6c1bbe7-3562-47ce-8d26-e3e20f57e09f"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to connect. Please check your internet connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonMouseMove = (e) => {
    const btn = e.currentTarget;
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.35;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px,${y}px) translateY(-3px)`;
  };

  const handleButtonMouseLeave = (e) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner fade-in">
        <span className="section-label">Get In Touch</span>
        <h2>Let's <em>Talk</em></h2>
        <p>I'm actively looking for internship opportunities and eager to learn from experienced professionals. If you have opportunities, feedback, or just want to connect — I'd love to hear from you.</p>
        
        {/* Contact info links */}
        <div className="contact-links">
          <a 
            href="mailto:madhusaravanan326@gmail.com" 
            className="contact-link"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
          >
            <span>📧 Email</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/madhumitha-saravanan-27657339b" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
          >
            <span>💼 LinkedIn</span>
          </a>
          <a 
            href="https://github.com/Madhusaravanan1030" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
          >
            <span>💻 GitHub</span>
          </a>
          <a 
            href="tel:+916369141715" 
            className="contact-link"
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
          >
            <span>📱 +91 63691 41715</span>
          </a>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <label htmlFor="form-name">Name</label>
            <input
              type="text"
              id="form-name"
              name="name"
              className="contact-form-input"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="form-email">Email Address</label>
            <input
              type="email"
              id="form-email"
              name="email"
              className="contact-form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>
          <div className="contact-form-group">
            <label htmlFor="form-message">Message</label>
            <textarea
              id="form-message"
              name="message"
              className="contact-form-input contact-form-textarea"
              placeholder="How can I help you?"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="contact-submit-btn"
            disabled={loading}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
          >
            <span>{loading ? 'Sending...' : 'Send Message'}</span>
          </button>

          {status.message && (
            <div className={`form-status ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>

      </div>
    </section>
  );
}
