import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "../CSS/themeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

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
