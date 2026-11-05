import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function DashboardHeader({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  toggleTheme,
  onOpenMobileSidebar,
  onExportReport
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Map active tab to enterprise breadcrumb label and description
  const tabMetadata = {
    dashboard: {
      category: 'Core Telemetry',
      title: 'Carbon Footprint Overview',
    },
    carbon: {
      category: 'Accounting Engine',
      title: 'Carbon Intelligence Engine',
    },
    ingestion: {
      category: 'Data Feeds',
      title: 'Resource Analytics & Ingestion',
    },
    insights: {
      category: 'Predictive Models',
      title: 'AI Predictive Insights',
    },
    'digital-twin': {
      category: 'Simulations',
      title: 'Sustainability Digital Twin',
    },
    actions: {
      category: 'Decarbonization ROI',
      title: 'Action Engine & Ledger',
    },
    reports: {
      category: 'Compliance & Filings',
      title: 'ESG Reports & Filings',
    },
    sites: {
      category: 'Campus Portfolios',
      title: 'Operating Campuses',
    }
  };

  const currentMeta = tabMetadata[activeTab] || {
    category: 'Enterprise ESG',
    title: 'Executive Portal'
  };

  return (
    <header 
      className="app-topbar bg-[#edfdf2]/95 dark:bg-[#0c1611]/95 backdrop-blur-md border-b border-[#dcece1] dark:border-[#1e382c] shadow-[0_1px_3px_rgba(26,81,64,0.04)] px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors duration-200"
      aria-label="Application Top Header"
    >
      {/* Left: Mobile Trigger + Breadcrumbs + Global Search */}
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#101e18] dark:text-[#edfdf2] hover:bg-[#dcece1]/70 dark:hover:bg-[#1a382b]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006c49] transition-colors"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Enterprise Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-[#404944] dark:text-[#8cc2ac] min-w-0">
          <div className="hidden sm:flex items-center space-x-1 font-semibold uppercase tracking-wider text-[10px] text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded border border-[#dcece1] dark:border-[#1e382c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6] animate-pulse" />
            <span>{currentMeta.category}</span>
          </div>

          <span className="material-symbols-outlined text-xs text-[#707974] dark:text-[#8cc2ac]/60 hidden sm:inline select-none">
            chevron_right
          </span>

          <span className="text-[#101e18] dark:text-white font-semibold text-xs sm:text-sm truncate max-w-[160px] sm:max-w-none">
            {currentMeta.title}
          </span>
        </nav>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center bg-white dark:bg-[#13241c] pl-3 pr-2 py-1.5 rounded-lg border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus-within:border-[#006c49] dark:focus-within:border-[#9af5c6] focus-within:ring-1 focus-within:ring-[#006c49]/30 transition-all ml-3">
          <span className="material-symbols-outlined text-[#707974] dark:text-[#8cc2ac] text-base mr-2 shrink-0 select-none">
            search
          </span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emissions nodes, facilities, scopes..."
            className="bg-transparent text-xs text-[#101e18] dark:text-[#edfdf2] placeholder-[#707974] dark:placeholder-[#8cc2ac]/60 focus:outline-none w-44 lg:w-56 xl:w-72"
            aria-label="Search operational assets and metrics"
          />
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-[#707974] dark:text-[#8cc2ac] bg-[#f0f4f1] dark:bg-[#1a382b] border border-[#dcece1] dark:border-[#28503e] rounded font-mono select-none">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: Period, Export, Day/Night Toggle, Notifications, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        
        {/* Date Period Selector Pill */}
        <div 
          className="hidden sm:flex items-center bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1.5 rounded-lg space-x-1.5 text-xs font-semibold text-[#00392b] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] hover:border-[#b6eed7] dark:hover:border-[#285740] transition-colors cursor-pointer select-none"
          title="Active Reporting Window"
        >
          <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-sm">
            calendar_today
          </span>
          <span>Q3 2024 / YTD</span>
          <span className="material-symbols-outlined text-xs text-[#707974] dark:text-[#8cc2ac]/80">
            expand_more
          </span>
        </div>

        {/* Export Report CTA */}
        <button
          onClick={() => {
            if (onExportReport) onExportReport();
            else setActiveTab('reports');
          }}
          className="flex items-center space-x-1.5 bg-white dark:bg-[#13241c] hover:bg-[#e1f2e7] dark:hover:bg-[#1a382b] text-[#101e18] dark:text-[#edfdf2] px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#dcece1] dark:border-[#1e382c] shadow-xs hover:border-[#006c49]/30 dark:hover:border-[#9af5c6]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006c49]"
          type="button"
          title="Export Regulatory Audit Dossier"
        >
          <span className="material-symbols-outlined text-sm text-[#006c49] dark:text-[#9af5c6]">
            file_download
          </span>
          <span className="hidden sm:inline">Export Report</span>
        </button>

        {/* Day / Night Mode Animated Sliding Toggle */}
        <ThemeToggle
          theme={theme}
          setTheme={setTheme}
          toggleTheme={toggleTheme}
          variant="compact"
        />

        {/* Notifications Indicator */}
        <button
          type="button"
          className="relative p-2 rounded-lg bg-white dark:bg-[#13241c] text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006c49]"
          title="System Notifications (1 Active Alert)"
          aria-label="System Notifications"
        >
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#9af5c6] ring-2 ring-white dark:ring-[#13241c]" />
        </button>

        {/* User Profile Avatar */}
        <button
          type="button"
          onClick={() => setActiveTab('sites')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006c49] rounded-full"
          title="Elena Rostova • VP Sustainability"
        >
          <img 
            alt="Profile of Elena Rostova" 
            className="w-8 h-8 rounded-full object-cover ring-1.5 ring-[#006c49]/20 hover:ring-[#006c49] dark:ring-[#9af5c6]/30 dark:hover:ring-[#9af5c6] transition-all" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6SeRBDk3ANGlfd1Ab4gYYX5RDqzQFf5Hew2hsYfZnBmslz2nCkU4T0b1zzGm1ZqNTAUF97-gozP4riKS1T5wkqQWfD0yFoQH2VGmZdBZn4aPl-TQP1xondZ9njx8Er3XiQhGAD-_SHj8a0zAOs1_OaV4wojd_puyebH7anYeNASnesszLzNoVtSvNP9-ieW8lJ4ex28vXs1W9wqFTxklICKGefeDd_XXfRCgumyK"
          />
        </button>
      </div>
    </header>
  );
}
