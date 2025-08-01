import React from 'react';
import { useTheme } from '../../../contexts/Theme';

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};

export default DarkModeToggle;
