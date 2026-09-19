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
    // index.html applies the saved theme before first paint; this keeps it in sync after.
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ajs-theme', theme);
  }, [dark]);

  const toggleDark = () => {
    const root = document.documentElement;
    const swap = () => {
      // Read the theme when the swap runs (the callback is async), so quick repeat clicks each flip it.
      const next = root.getAttribute('data-theme') !== 'dark';
      // Every color flips in the same frame: element transitions are off while the theme changes.
      root.classList.add('theme-switching');
      root.setAttribute('data-theme', next ? 'dark' : 'light');
      void root.offsetWidth; // apply the new colors before transitions come back
      root.classList.remove('theme-switching');
      setDark(next);
    };
    // One crossfade for the whole page where supported. It only fades, so it stays for reduced motion.
    if (document.startViewTransition) {
      // A quick second toggle skips this crossfade, which rejects `ready`; the swap still runs.
      document.startViewTransition(swap).ready.catch(() => undefined);
    } else {
      swap();
    }
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
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
