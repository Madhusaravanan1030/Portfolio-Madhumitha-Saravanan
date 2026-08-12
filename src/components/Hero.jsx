import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);
  const [activeWord, setActiveWord] = useState('');

  // Three.js particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 3;

    let w = canvas.parentElement.offsetWidth;
    let h = canvas.parentElement.offsetHeight;

    function resize() {
      if (!canvas.parentElement) return;
      w = canvas.parentElement.offsetWidth;
      h = canvas.parentElement.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xC97A9A,
      size: 0.025,
      transparent: true,
      opacity: 0.55
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Lines between close particles
    const lineMat = new THREE.LineBasicMaterial({ color: 0xF2C4D4, transparent: true, opacity: 0.12 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.8) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04 + mouseX;
      points.rotation.x = t * 0.02 - mouseY;
      lines.rotation.y = t * 0.04 + mouseX;
      lines.rotation.x = t * 0.02 - mouseY;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  // Typed Text Effect
  useEffect(() => {
    const words = ['AI Systems', 'ML Models', 'IoT Solutions', 'Web Apps', 'Smart Algorithms'];
    let wi = 0, ci = 0, deleting = false;
    let typeTimeout;

    function type() {
      const word = words[wi];
      if (!deleting) {
        setActiveWord(word.slice(0, ++ci));
        if (ci === word.length) {
          deleting = true;
          typeTimeout = setTimeout(type, 1400);
          return;
        }
      } else {
        setActiveWord(word.slice(0, --ci));
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      typeTimeout = setTimeout(type, deleting ? 55 : 90);
    }

    const startTimeout = setTimeout(type, 1900);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(typeTimeout);
    };
  }, []);

  // Magnetic Button Effect
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
    <>
      <section className="hero">
        <canvas id="hero-canvas" ref={canvasRef}></canvas>
        <div className="hero-inner">
          <div className="hero-avatar-wrap">
            <div className="orbit"><div className="orbit-dot"></div></div>
            <div className="orbit-2"></div>
            <div className="hero-avatar">
              <img src="/avatar.jpg" alt="Madhumitha Saravanan" />
            </div>
          </div>
          <h1><span className="glitch" data-text="Madhumitha">Madhumitha</span> <em>Saravanan</em></h1>
          <div className="typed-wrap">
            I build <span className="typed" id="typed-text">{activeWord}</span><span className="typed-cursor"></span>
          </div>
          <div className="hero-divider"></div>
          <p>Final Year AI and DS Student at Dr. N.G.P. Institute of Technology · CGPA 8.3 · Passionate about building intelligent systems that solve real problems from IoT to transformers.</p>
          <div className="hero-buttons">
            <a 
              href="https://drive.google.com/file/d/1GNsfeQ8kB0oXEszQUGYW3pqPaJVD3gBp/view?usp=sharing" 
              className="btn btn-primary" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
            >
              <span>Download Resume</span>
            </a>
            <a 
              href="#projects" 
              className="btn btn-secondary"
              onMouseMove={handleButtonMouseMove}
              onMouseLeave={handleButtonMouseLeave}
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="experience-section">
        <div className="exp-inner">
          <div className="exp-track" id="exp-track">
            {[
              "MERN Stack Developer", "Data Analyst", "AI Engineer", 
              "Dr. N.G.P. Institute of Technology", "Internship · Digitoad Technologies", "CGPA 8.3"
            ].map((item, i) => (
              <div key={`item-${i}`} className="exp-item"><div className="exp-dot"></div>{item}</div>
            ))}
            {[
              "MERN Stack Developer", "Data Analyst", "AI Engineer", 
              "Dr. N.G.P. Institute of Technology", "Internship · Digitoad Technologies", "CGPA 8.3"
            ].map((item, i) => (
              <div key={`dup-${i}`} className="exp-item"><div className="exp-dot"></div>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
