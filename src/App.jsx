import React, { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  // Custom Cursor logic
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    };

    const handleMouseDown = () => cursor.classList.add('clicking');
    const handleMouseUp = () => cursor.classList.remove('clicking');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    let animationFrameId;
    const animRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      animationFrameId = requestAnimationFrame(animRing);
    };
    animRing();

    // Hover effect
    const handleMouseEnter = () => {
      cursor.classList.add('hovering');
      ring.classList.add('hovering');
    };
    const handleMouseLeave = () => {
      cursor.classList.remove('hovering');
      ring.classList.remove('hovering');
    };

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, .pcard, .skill-card-v3, .stat, .contact-link, .contact-submit-btn').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachHoverListeners();

    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [loading]);

  // Scroll Progress and Navbar Shrink logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const pct = (window.scrollY / totalScroll) * 100;
        setScrollProgress(pct);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Fade-in observer
  useEffect(() => {
    if (loading) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const attachObserver = () => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        obs.observe(el);
      });
    };

    attachObserver();

    const observer = new MutationObserver(attachObserver);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      observer.disconnect();
    };
  }, [loading]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loader onFinished={() => setLoading(false)} />
      ) : (
        <>
          {/* Custom Cursor */}
          <div className="cursor" ref={cursorRef}></div>
          <div className="cursor-ring" ref={ringRef}></div>

          {/* Scroll Progress Bar */}
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

          {/* Navigation Bar */}
          <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
              <a className="logo" href="#" onClick={closeMenu}>Madhumitha</a>
              <button 
                className={`hamburger ${menuOpen ? 'open' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <a href="#projects" onClick={closeMenu}>Projects</a>
                <a href="#about" onClick={closeMenu}>About</a>
                <a href="#skills" onClick={closeMenu}>Skills</a>
                <a href="#contact" onClick={closeMenu}>Contact</a>
              </div>
            </div>
          </nav>

          {/* Sections */}
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
}
