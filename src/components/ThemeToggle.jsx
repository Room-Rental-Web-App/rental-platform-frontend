import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // 1. Initialize state with 'light' or check localStorage
  const [theme, setTheme] = useState(() => {
    // Check if user previously selected a theme, otherwise default to light
    return localStorage.getItem('theme') || 'light';
  });

  // 2. Effect: Update the HTML attribute and localStorage whenever 'theme' changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. The Toggle Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      aria-label="Toggle Dark Mode"
    >
      {/* Show Sun icon if Dark, Moon icon if Light */}
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;