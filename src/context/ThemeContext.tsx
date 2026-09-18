import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('ajs-theme') === 'dark'
  );

  useEffect(() => {
    // Colors live in globals.css under :root and [data-theme="dark"].
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ajs-theme', theme);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggleDark: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
