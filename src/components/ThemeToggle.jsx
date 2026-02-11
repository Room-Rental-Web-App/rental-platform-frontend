import React, {useEffect } from 'react';
import { Sun, Moon } from "lucide-react";
import '../css/themeToggle.css';

const ThemeToggle = ({theme, setTheme}) => {
  // 1. Initialize state with 'light' or check localStorage

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
  <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === "dark" ? (
        <>
          <Sun size={16} />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={16} />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;