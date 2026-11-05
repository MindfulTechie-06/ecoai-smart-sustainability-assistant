export default function EchoLogo({ 
  className = "h-8 w-auto", 
  showText = true, 
  textClassName = "text-base sm:text-lg",
  variant = "dark" // 'dark' (for green sidebar) or 'light' (for light/dark page topbars)
}) {
  const isDarkBg = variant === "dark";

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Precision SVG Brand Emblem */}
      <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00392b] via-[#006c49] to-[#1a5140] flex items-center justify-center shadow-xs border border-[#9af5c6]/30 shrink-0">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#9af5c6]"
        >
          {/* Orbital Telemetry Wave */}
          <circle 
            cx="12" 
            cy="12" 
            r="9.5" 
            stroke="currentColor" 
            strokeWidth="1.25" 
            strokeDasharray="2 3" 
            className="opacity-60"
          />
          {/* Planetary Leaf Core */}
          <path 
            d="M11 19A6.5 6.5 0 0 1 10 6.5C14.5 5.5 16 5 18 3c0.8 1.8 1.5 3.5 1.5 6.5 0 4.5-4 8.5-8.5 9.5Z" 
            fill="currentColor" 
            fillOpacity="0.25"
            stroke="currentColor" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M3.5 20.5c0-2.5 1.5-4.5 4.2-5 3.5-0.7 5.5-2 6.3-3" 
            stroke="currentColor" 
            strokeWidth="1.6" 
            strokeLinecap="round" 
          />
          {/* Active Sensor Node */}
          <circle cx="14" cy="12.5" r="1.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Wordmark & Scope Tag */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-heading font-extrabold tracking-tight leading-tight ${textClassName} ${
            isDarkBg ? 'text-white' : 'text-[#00392b] dark:text-white'
          }`}>
            Echo AI
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5 ${
            isDarkBg ? 'text-[#9bd2bc]' : 'text-[#006c49] dark:text-[#9af5c6]'
          }`}>
            Climate Core
          </span>
        </div>
      )}
    </div>
  );
}

