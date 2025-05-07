import React from 'react';
import { useTheme, Theme, themeOrder } from '../../context/ThemeContext';
// Import the icons
import { SunIcon, SparklesIcon, MoonIcon, LeafIcon, SunflowerIcon } from '../icons/ThemeIcons';

// Map themes to icons and labels for the toggle
const themeConfig: Record<Theme, { icon: React.FC<any>, label: string }> = {
  light: { icon: SunIcon, label: 'Light Theme' },
  'light-alt': { icon: SparklesIcon, label: 'Sparkle Theme' },
  dark: { icon: MoonIcon, label: 'Dark Theme' },
  'dark-alt': { icon: LeafIcon, label: 'Forest Theme' },
  'dark-alt-2': { icon: SunflowerIcon, label: 'Sunflower Theme' },
};

/**
 * A floating component allowing direct selection of themes.
 */
export const FloatingThemeToggle: React.FC = () => {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    // Fixed position at bottom right with z-index
    <div className="fixed bottom-6 right-6 z-50">
      {/* Container with semantic styles */}
      <div className="flex space-x-1 bg-card border border-border rounded-full shadow-lg p-1 transition-colors duration-300">
        {themeOrder.map((theme) => {
          const { icon: Icon, label } = themeConfig[theme];
          const isActive = currentTheme === theme;

          return (
            <button
              key={theme}
              onClick={() => setTheme(theme)} // Directly set the theme on click
              aria-label={`Switch to ${label}`}
              title={`Switch to ${label}`} // Tooltip for desktop
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none    focus:ring-offset-background ${
                isActive
                  ? 'bg-primary text-primary-foreground scale-110 shadow-sm' // Active state: primary bg, larger scale
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted' // Inactive state: muted text, hover effects
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};