'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('cmyk');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'cmyk';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const toggle = document.querySelector('.theme-controller');
    if (toggle) {
      console.log(theme);
      toggle.checked = theme === 'dracula';
      toggle.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dracula' : 'cmyk';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
