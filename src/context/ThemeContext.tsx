import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export type Theme = 'light' | 'light-alt' | 'dark' | 'dark-alt' | 'dark-alt-2';
export const themeOrder: Theme[] = ['light', 'light-alt', 'dark', 'dark-alt', 'dark-alt-2'];

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && themeOrder.includes(storedTheme)) {
      return storedTheme;
    }
    return themeOrder[0];
  });

  useEffect(() => {
    const root = window.document.documentElement;
    console.log(`Applying theme: ${theme}`);

    // Remove all theme classes first
    root.classList.remove('theme-light-alt', 'theme-dark', 'theme-dark-alt', 'theme-dark-alt-2');
    // Add the appropriate theme class if not light (default)
    if (theme !== 'light') {
    root.classList.add(`theme-${theme}`);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (themeOrder.includes(newTheme)) {
      setThemeState(newTheme);
    } else {
      console.warn(`Attempted to set invalid theme: ${newTheme}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};