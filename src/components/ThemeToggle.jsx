import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({
  theme: propTheme,
  setTheme: propSetTheme,
  toggleTheme: propToggleTheme,
  variant = 'compact', // 'compact' | 'full' | 'pill'
  className = ''
}) {
  const contextTheme = useTheme();
  
  // Support both direct props and ThemeContext consumption
  const theme = propTheme || contextTheme.theme;
  const setTheme = propSetTheme || contextTheme.setTheme;
  const toggleTheme = propToggleTheme || contextTheme.toggleTheme;

  const isDark = theme === 'dark';

  // COMPACT VARIANT: Segmented Dual-Button Pill for Topbars (Navbar & DashboardHeader)
  if (variant === 'compact') {
    return (
      <div 
        role="radiogroup" 
        aria-label="Select website theme"
        className={`relative inline-flex items-center p-0.5 rounded-full bg-[#EDF3EF] dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] shadow-xs select-none ${className}`}
      >
        {/* Day Mode Option Button */}
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          aria-label="Switch to Day Mode"
          title="Switch to Day Mode"
          onClick={() => setTheme('light')}
          className={`relative z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] ${
            !isDark 
              ? 'text-[#075B43]' 
              : 'text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-[#F2F8F4]'
          }`}
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-400' : 'text-[#87968C] dark:text-[#6E8D7D]'}`} />
          <span className="hidden sm:inline font-medium text-[11px]">Day</span>
        </button>

        {/* Night Mode Option Button */}
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          aria-label="Switch to Night Mode"
          title="Switch to Night Mode"
          onClick={() => setTheme('dark')}
          className={`relative z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20B982] ${
            isDark 
              ? 'text-[#20B982]' 
              : 'text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-[#F2F8F4]'
          }`}
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-[#20B982] fill-current' : 'text-[#87968C] dark:text-[#6E8D7D]'}`} />
          <span className="hidden sm:inline font-medium text-[11px]">Night</span>
        </button>

        {/* Sliding Active Pill Background */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 bottom-0.5 rounded-full shadow-sm ${
            !isDark 
              ? 'left-0.5 right-[50%] bg-white border border-[#DCE8E0]' 
              : 'left-[50%] right-0.5 bg-[#173329] border border-[#244538]'
          }`}
        />
      </div>
    );
  }

  // PILL VARIANT: Quick toggle button with current mode icon & label
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 select-none ${
          isDark
            ? 'bg-[#173329] hover:bg-[#1E4D3A] text-[#8BE7BD] border-[#244538]'
            : 'bg-white hover:bg-[#EDF3EF] text-[#075B43] border-[#DCE8E0] shadow-xs'
        } ${className}`}
      >
        {isDark ? (
          <>
            <Moon className="w-3.5 h-3.5 text-[#20B982] fill-current" />
            <span>Night Mode</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Day Mode</span>
          </>
        )}
      </button>
    );
  }

  // FULL VARIANT: Dual-Option Segmented Control for Sidebar
  return (
    <div className={`p-1 rounded-xl bg-[#EDF3EF] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538] select-none ${className}`}>
      <div 
        role="radiogroup" 
        aria-label="Select platform theme mode"
        className="relative grid grid-cols-2 gap-1 p-0.5"
      >
        {/* Day Mode Option */}
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          aria-label="Switch to Day Mode"
          title="Switch to Day Mode"
          onClick={() => setTheme('light')}
          className={`relative z-10 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] ${
            !isDark
              ? 'text-[#075B43]'
              : 'text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-[#F2F8F4]'
          }`}
        >
          <Sun className={`w-4 h-4 shrink-0 transition-transform ${!isDark ? 'text-amber-500 fill-amber-400 scale-110' : 'text-[#87968C] dark:text-[#6E8D7D]'}`} />
          <span className="font-semibold text-xs tracking-tight">Day Mode</span>
        </button>

        {/* Night Mode Option */}
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          aria-label="Switch to Night Mode"
          title="Switch to Night Mode"
          onClick={() => setTheme('dark')}
          className={`relative z-10 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#20B982] ${
            isDark
              ? 'text-[#20B982]'
              : 'text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-[#F2F8F4]'
          }`}
        >
          <Moon className={`w-4 h-4 shrink-0 transition-transform ${isDark ? 'text-[#20B982] fill-current scale-110' : 'text-[#87968C] dark:text-[#6E8D7D]'}`} />
          <span className="font-semibold text-xs tracking-tight">Night Mode</span>
        </button>

        {/* Sliding Indicator for Sidebar */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 bottom-0.5 rounded-lg shadow-sm ${
            !isDark
              ? 'left-0.5 right-[50%] bg-white border border-[#DCE8E0]'
              : 'left-[50%] right-0.5 bg-[#173329] border border-[#244538]'
          }`}
        />
      </div>
    </div>
  );
}
