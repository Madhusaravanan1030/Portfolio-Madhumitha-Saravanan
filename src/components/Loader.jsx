import React, { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHide(true);
    }, 1800);

    const timer2 = setTimeout(() => {
      onFinished();
    }, 2600); // 1800ms + 800ms animation duration

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinished]);

  return (
    <div id="loader" className={hide ? 'hide' : ''}>
      <div id="loader-text">
        {"Madhumitha".split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${0.05 + index * 0.05}s` }}>
            {char}
          </span>
        ))}
      </div>
      <div id="loader-bar"></div>
    </div>
  );
}
