import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode);
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(darkMode === 'dark' ? 'light' : 'dark')}>
      {darkMode === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default DarkModeToggle;