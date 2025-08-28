import { useEffect, useState } from 'react';

export const useTheme = () => {
  const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || getSystemTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
