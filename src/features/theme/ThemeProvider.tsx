import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'light';

function isTheme(value: string): value is Theme {
  return value === 'light' || value === 'dark';
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [stored, setStored] = useLocalStorage(THEME_STORAGE_KEY, DEFAULT_THEME);
  const theme: Theme = isTheme(stored) ? stored : DEFAULT_THEME;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setStored(theme === 'light' ? 'dark' : 'light');
  }, [theme, setStored]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
