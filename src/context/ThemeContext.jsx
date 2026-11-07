import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  chartTheme: {}
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('echo_theme');
        if (saved === 'dark' || saved === 'light') {
          return saved;
        }
      } catch (e) {
        // Fallback if localStorage access is restricted
      }
    }
    // Day Mode is the default for first-time visitors per requirements
    return 'light';
  });

  // Apply theme to DOM and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    try {
      localStorage.setItem('echo_theme', theme);
    } catch (e) {}
  }, [theme]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    }
  };

  // Comprehensive Chart & Data Visualization Design Tokens
  const chartTheme = useMemo(() => {
    return {
      isDark,
      grid: isDark ? '#244538' : '#DCE8E0',
      axis: isDark ? '#9AB9A8' : '#64766B',
      text: isDark ? '#F2F8F4' : '#14251D',
      muted: isDark ? '#6E8D7D' : '#87968C',
      
      // Card & Surface
      cardBg: isDark ? '#12271D' : '#FFFFFF',
      cardElevated: isDark ? '#173329' : '#EDF3EF',
      border: isDark ? '#244538' : '#DCE8E0',

      // Tooltips
      tooltipBg: isDark ? '#12271D' : '#FFFFFF',
      tooltipBorder: isDark ? '#244538' : '#DCE8E0',
      tooltipText: isDark ? '#F2F8F4' : '#14251D',
      tooltipShadow: isDark 
        ? '0 8px 24px rgba(0, 0, 0, 0.55)' 
        : '0 8px 20px rgba(20, 37, 29, 0.08)',

      // Primary Scopes (Consistent across both themes)
      scope1: isDark ? '#20B982' : '#075B43',
      scope2: isDark ? '#8BE7BD' : '#0C956B',
      scope3: isDark ? '#9AB9A8' : '#64766B',

      // Scenario Modelling Levers (Baseline vs Proposed)
      baseline: isDark ? '#6E8D7D' : '#87968C',
      proposed: isDark ? '#20B982' : '#0C956B',
      target: isDark ? '#E26D6D' : '#D34D4D',

      // Resource Category Series
      energy: isDark ? '#20B982' : '#075B43',
      renewable: isDark ? '#8BE7BD' : '#0C956B',
      water: isDark ? '#38BDF8' : '#0284C7',
      waste: isDark ? '#A78BFA' : '#7C3AED',
      mobility: isDark ? '#34D399' : '#059669',

      // Sparklines & Accents
      sparkline: isDark ? '#20B982' : '#0C956B',
      accentPrimary: isDark ? '#20B982' : '#075B43',
      accentSecondary: isDark ? '#8BE7BD' : '#0C956B',

      // Status
      success: isDark ? '#20B982' : '#16865D',
      warning: isDark ? '#E5A83B' : '#C88718',
      error: isDark ? '#E26D6D' : '#D34D4D',
      info: isDark ? '#529CE8' : '#3478C7'
    };
  }, [isDark]);

  const value = useMemo(() => ({
    theme,
    isDark,
    toggleTheme,
    setTheme,
    chartTheme
  }), [theme, isDark, chartTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

