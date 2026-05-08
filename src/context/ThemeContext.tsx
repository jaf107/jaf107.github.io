import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ dark: false, toggleDark: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => localStorage.getItem('ajs-theme') === 'dark');

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.setAttribute('data-theme', 'dark');
      html.style.setProperty('--accent', '#00d97e');
      html.style.setProperty('--accent-rgb', '0,217,126');
      html.style.setProperty('--accent-bg', 'rgba(0,217,126,0.1)');
      localStorage.setItem('ajs-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      html.style.setProperty('--accent', '#008a55');
      html.style.setProperty('--accent-rgb', '0,138,85');
      html.style.setProperty('--accent-bg', 'rgba(0,138,85,0.08)');
      localStorage.setItem('ajs-theme', 'light');
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
