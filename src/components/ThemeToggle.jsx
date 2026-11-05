import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Clock } from 'lucide-react';
import { getIsNightByTime } from '../utils/themeUtils';

export default function ThemeToggle({
  theme,
  setTheme,
  toggleTheme,
  variant = 'compact', // 'compact', 'pill', 'full'
  className = ''
}) {
  const [localTimeStr, setLocalTimeStr] = useState('');
  const [isNightTime, setIsNightTime] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Keep live local time updated
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIsNightTime(getIsNightByTime());
      setLocalTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000); // every 30s
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === 'dark';

  // Toggle directly between Day and Night
  const handleToggle = () => {
    toggleTheme();
  };

  // Switch to specific mode
  const handleSelectMode = (mode) => {
    if (mode === 'auto') {
      const night = getIsNightByTime();
      setTheme(night ? 'dark' : 'light');
      localStorage.setItem('echo_theme_mode', 'auto');
    } else {
      setTheme(mode);
      localStorage.setItem('echo_theme_mode', mode);
    }
    setShowMenu(false);
  };

  // COMPACT VARIANT: Sleek sliding pill with micro-animations
  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={handleToggle}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowMenu(!showMenu);
          }}
          className={`relative flex items-center h-8 w-15 rounded-full p-1 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-[#006c49] dark:focus:ring-[#9af5c6] ${
            isDark 
              ? 'bg-[#152e22] border border-[#234b38] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]' 
              : 'bg-[#e1f2e7] border border-[#c2ded0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]'
          }`}
          title={isDark ? 'Switch to Day Mode (Currently Night)' : 'Switch to Night Mode (Currently Day)'}
          aria-label="Toggle Day and Night Mode"
        >
          {/* Background Ambient Glow & Icons */}
          <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none text-xs">
            {/* Sun Icon (Left) */}
            <Sun className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-30 text-[#8cc2ac]' : 'opacity-90 text-amber-500'}`} />
            {/* Moon Icon (Right) */}
            <Moon className={`w-3.5 h-3.5 transition-opacity duration-300 ${isDark ? 'opacity-90 text-[#9af5c6]' : 'opacity-30 text-[#404944]'}`} />
          </div>

          {/* Sliding Animated Thumb */}
          <motion.div
            layout
            transition={{
              type: 'spring',
              stiffness: 450,
              damping: 25
            }}
            className={`z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md ${
              isDark
                ? 'ml-auto bg-gradient-to-tr from-[#00392b] to-[#006c49] text-[#9af5c6] border border-[#9af5c6]/40'
                : 'mr-auto bg-white text-amber-500 border border-amber-200'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-3.5 h-3.5 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-3.5 h-3.5 fill-amber-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>

        {/* Long press / right click quick modal */}
        {showMenu && (
          <div className="absolute right-0 top-10 w-48 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] rounded-xl shadow-xl py-1.5 z-50 text-xs">
            <div className="px-3 py-1 text-[10px] uppercase font-semibold text-[#404944] dark:text-[#8cc2ac] border-b border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between">
              <span>Theme Schedule</span>
              <span>{localTimeStr}</span>
            </div>
            <button
              onClick={() => handleSelectMode('light')}
              className={`w-full text-left px-3 py-1.5 flex items-center space-x-2 hover:bg-[#e1f2e7] dark:hover:bg-[#1a382b] ${!isDark ? 'font-semibold text-[#006c49] dark:text-[#9af5c6]' : ''}`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Day Mode (Always Light)</span>
            </button>
            <button
              onClick={() => handleSelectMode('dark')}
              className={`w-full text-left px-3 py-1.5 flex items-center space-x-2 hover:bg-[#e1f2e7] dark:hover:bg-[#1a382b] ${isDark ? 'font-semibold text-[#006c49] dark:text-[#9af5c6]' : ''}`}
            >
              <Moon className="w-3.5 h-3.5 text-[#9af5c6]" />
              <span>Night Mode (Always Dark)</span>
            </button>
            <button
              onClick={() => handleSelectMode('auto')}
              className="w-full text-left px-3 py-1.5 flex items-center space-x-2 hover:bg-[#e1f2e7] dark:hover:bg-[#1a382b] text-[#404944] dark:text-[#8cc2ac]"
            >
              <Clock className="w-3.5 h-3.5 text-[#006c49]" />
              <span>Auto (By Local Time: 6pm - 6am)</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // PILL VARIANT: Includes label and current state
  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
          isDark
            ? 'bg-[#152e22] hover:bg-[#1a382b] text-[#9af5c6] border-[#285740]'
            : 'bg-[#e1f2e7] hover:bg-[#d6e7db] text-[#00392b] border-[#c2ded0]'
        } ${className}`}
        title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-[#9af5c6] fill-current" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          )}
        </div>
        <span>{isDark ? 'Night Mode' : 'Day Mode'}</span>
        {localTimeStr && (
          <span className="text-[10px] opacity-75 font-normal pl-1 border-l border-current/20">
            {localTimeStr}
          </span>
        )}
      </button>
    );
  }

  // FULL VARIANT: Rich card layout for Sidebar
  return (
    <div className={`flex items-center justify-between p-2 rounded-xl bg-[#00392b]/80 border border-[#1a5140] ${className}`}>
      <div className="flex items-center space-x-2.5">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
          isDark ? 'bg-[#1a5140] text-[#9af5c6]' : 'bg-[#1a5140]/60 text-amber-300'
        }`}>
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-semibold text-white">
              {isDark ? 'Night Theme' : 'Day Theme'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9af5c6] animate-pulse"></span>
          </div>
          <span className="text-[10px] text-[#9bd2bc] flex items-center space-x-1">
            <Clock className="w-2.5 h-2.5" />
            <span>{isNightTime ? 'Nighttime' : 'Daytime'} • {localTimeStr}</span>
          </span>
        </div>
      </div>

      {/* Interactive Sliding Toggle */}
      <button
        type="button"
        onClick={handleToggle}
        className={`relative flex items-center h-7 w-13 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
          isDark ? 'bg-[#1a5140] border border-[#9af5c6]/40' : 'bg-[#0e271e] border border-[#1a5140]'
        }`}
        title={isDark ? 'Switch to Day Theme' : 'Switch to Night Theme'}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`flex items-center justify-center w-5 h-5 rounded-full shadow-sm ${
            isDark
              ? 'ml-auto bg-[#9af5c6] text-[#00392b]'
              : 'mr-auto bg-amber-400 text-[#00392b]'
          }`}
        >
          {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
        </motion.div>
      </button>
    </div>
  );
}
