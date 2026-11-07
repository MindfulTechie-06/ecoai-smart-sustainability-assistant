import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import EchoLogo from './EchoLogo';

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedSite,
  setSelectedSite,
  theme,
  setTheme,
  toggleTheme,
  isMobileOpen,
  setIsMobileOpen
}) {
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Grouped Navigation for Enterprise Architecture
  const navGroups = [
    {
      groupTitle: 'Core & Telemetry',
      items: [
        { id: 'dashboard', label: 'Overview', icon: 'dashboard', hint: 'Real-time ESG' },
        { id: 'carbon', label: 'Carbon Intelligence', icon: 'co2', hint: 'Scopes 1-3' },
        { id: 'ingestion', label: 'Resource Analytics', icon: 'monitoring', hint: 'Ingress & Telemetry' },
      ]
    },
    {
      groupTitle: 'Intelligence & Simulation',
      items: [
        { id: 'insights', label: 'AI Insights', icon: 'psychology', hint: 'Predictive Models' },
        { id: 'digital-twin', label: 'Digital Twin', icon: 'hub', hint: 'Scenario Sandbox' },
        { id: 'actions', label: 'Action Engine & Ledger', icon: 'bolt', hint: 'Decarbonization ROI' },
      ]
    },
    {
      groupTitle: 'Governance & Campuses',
      items: [
        { id: 'reports', label: 'Reports & Filings', icon: 'assessment', hint: 'CSRD & SEC ESG' },
        { id: 'sites', label: 'Operating Campuses', icon: 'apartment', hint: 'Facility Portfolios' },
      ]
    }
  ];

  const facilities = [
    { id: 'all', name: 'Meridian Global (Consolidated)', code: 'HQ-GLOBAL' },
    { id: 'site-01', name: 'Metro Innovation Campus', code: 'FAC-01' },
    { id: 'site-02', name: 'North Logistics Center', code: 'FAC-02' },
    { id: 'site-03', name: 'East R&D Facility', code: 'FAC-03' }
  ];

  const currentFacility = facilities.find(f => f.id === selectedSite) || facilities[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSiteDropdownOpen(false);
      }
    }
    if (isSiteDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSiteDropdownOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Shell Container (Standardized Enterprise Rail) */}
      <aside 
        className={`app-sidebar fixed left-0 top-0 bottom-0 h-screen w-[280px] lg:w-[var(--sidebar-width)] bg-white dark:bg-[#081710] text-[#14251D] dark:text-[#F2F8F4] z-50 flex flex-col shadow-[0_4px_12px_rgba(20,37,29,0.04),0_20px_32px_-8px_rgba(20,37,29,0.08)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5),0_20px_32px_-8px_rgba(0,0,0,0.6)] border-r border-[#DCE8E0] dark:border-[#244538] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* 1. Top Brand Bar - Fixed height matching top navigation */}
        <div className="h-[var(--topbar-height)] px-4 flex items-center justify-between border-b border-[#DCE8E0] dark:border-[#244538] bg-white dark:bg-[#081710] shrink-0">
          <button 
            type="button"
            onClick={() => { setActiveTab('landing'); setIsMobileOpen(false); }}
            className="flex items-center text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982] rounded-lg p-1 -ml-1 transition-colors"
            title="Return to Public Overview"
          >
            <EchoLogo variant="adaptive" showText={true} />
          </button>

          {/* Close Mobile Button */}
          <button 
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-white hover:bg-[#EDF3EF] dark:hover:bg-[#173329] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Scope Entity / Organization Selector (Pinned below brand bar) */}
        <div className="px-3 pt-3 pb-2 shrink-0" ref={dropdownRef}>
          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
              className="w-full bg-[#F5F8F6] dark:bg-[#12271D] hover:bg-[#EDF3EF] dark:hover:bg-[#173329] border border-[#DCE8E0] dark:border-[#244538] hover:border-[#0C956B]/40 dark:hover:border-[#20B982]/40 px-3 py-2 rounded-xl flex items-center justify-between text-[#14251D] dark:text-[#F2F8F4] text-left transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982] shadow-xs"
              aria-expanded={isSiteDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#E5F5EC] dark:bg-[#173329] group-hover:bg-[#C8F2DE] dark:group-hover:bg-[#1E4D3A] flex items-center justify-center shrink-0 border border-[#DCE8E0] dark:border-[#244538] transition-colors">
                  <span className="material-symbols-outlined text-[#075B43] dark:text-[#20B982] text-base">
                    corporate_fare
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-[#64766B] dark:text-[#9AB9A8] font-bold uppercase tracking-wider leading-tight">
                    Scope Entity
                  </span>
                  <span className="text-xs font-semibold text-[#14251D] dark:text-[#F2F8F4] truncate max-w-[130px]">
                    {currentFacility.name}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#87968C] dark:text-[#6E8D7D] group-hover:text-[#14251D] dark:group-hover:text-white text-lg shrink-0 transition-colors">
                unfold_more
              </span>
            </button>

            {/* Facility Dropdown Menu */}
            {isSiteDropdownOpen && (
              <div 
                className="absolute left-0 right-0 mt-1.5 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                role="listbox"
              >
                <div className="px-3 py-1.5 text-[9px] text-[#64766B] dark:text-[#9AB9A8] font-bold uppercase tracking-wider border-b border-[#DCE8E0] dark:border-[#244538] bg-[#F5F8F6] dark:bg-[#0C1D15]">
                  Select Operating Campus
                </div>
                {facilities.map((fac) => {
                  const isSelected = selectedSite === fac.id;
                  return (
                    <button
                      key={fac.id}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedSite(fac.id);
                        setIsSiteDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EDF3EF] dark:hover:bg-[#173329] transition-colors ${
                        isSelected 
                          ? 'bg-[#E5F5EC] dark:bg-[#173329] text-[#075B43] dark:text-[#20B982] font-semibold' 
                          : 'text-[#14251D] dark:text-[#F2F8F4]'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="truncate font-medium">{fac.name}</div>
                        <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">{fac.code}</div>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0C956B] dark:bg-[#20B982] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 3. Grouped Enterprise Navigation Links (Independently scrollable) */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-2 space-y-4 py-2">
          {navGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-0.5">
              {/* Section Header */}
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#87968C] dark:text-[#6E8D7D] select-none">
                {group.groupTitle}
              </div>

              {/* Section Items */}
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982] ${
                      isActive
                        ? 'bg-[#E5F5EC] dark:bg-[#173329] text-[#075B43] dark:text-[#20B982] font-semibold shadow-xs'
                        : 'text-[#64766B] dark:text-[#9AB9A8] hover:bg-[#EDF3EF] dark:hover:bg-[#173329]/60 hover:text-[#14251D] dark:hover:text-[#F2F8F4]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Left Accent indicator for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#0C956B] dark:bg-[#20B982] rounded-r-full" />
                    )}

                    <div className="flex items-center space-x-2.5 min-w-0 pl-0.5">
                      <span 
                        className={`material-symbols-outlined text-[19px] shrink-0 transition-colors ${
                          isActive 
                            ? 'text-[#0C956B] dark:text-[#20B982]' 
                            : 'text-[#87968C] dark:text-[#6E8D7D] group-hover:text-[#14251D] dark:group-hover:text-[#F2F8F4]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C956B] dark:bg-[#20B982] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 4. Public Editorial Shortcut (Pinned above profile) */}
        <div className="px-3 py-2 border-t border-[#DCE8E0] dark:border-[#244538] shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('landing');
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#64766B] dark:text-[#9AB9A8] hover:bg-[#EDF3EF] dark:hover:bg-[#173329]/60 hover:text-[#14251D] dark:hover:text-[#F2F8F4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982] group"
          >
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span>Editorial Platform</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-[#075B43] dark:text-[#20B982] bg-[#E5F5EC] dark:bg-[#173329] px-1.5 py-0.5 rounded border border-[#DCE8E0] dark:border-[#244538]">
              Public
            </span>
          </button>
        </div>

        {/* 5. Footer Dual Theme Switcher & User Profile (Fixed bottom) */}
        <div className="p-3 bg-[#F5F8F6] dark:bg-[#0C1D15] border-t border-[#DCE8E0] dark:border-[#244538] m-2 rounded-xl space-y-2.5 shrink-0">
          {/* Day / Night Segmented Dual Option Toggle */}
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
            variant="full"
          />

          {/* User Profile Card */}
          <div className="flex items-center justify-between pt-1 border-t border-[#DCE8E0] dark:border-[#244538]">
            <div className="flex items-center space-x-2.5 min-w-0">
              <img 
                alt="Profile of Elena Rostova" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#0C956B]/30 dark:ring-[#20B982]/40 shrink-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6SeRBDk3ANGlfd1Ab4gYYX5RDqzQFf5Hew2hsYfZnBmslz2nCkU4T0b1zzGm1ZqNTAUF97-gozP4riKS1T5wkqQWfD0yFoQH2VGmZdBZn4aPl-TQP1xondZ9njx8Er3XiQhGAD-_SHj8a0zAOs1_OaV4wojd_puyebH7anYeNASnesszLzNoVtSvNP9-ieW8lJ4ex28vXs1W9wqFTxklICKGefeDd_XXfRCgumyK"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-[#14251D] dark:text-[#F2F8F4] truncate max-w-[125px]">
                  Elena Rostova
                </span>
                <span className="text-[10px] text-[#64766B] dark:text-[#9AB9A8] truncate">
                  VP Sustainability
                </span>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setActiveTab('landing')}
              title="Return to Public Overview"
              className="text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-white hover:bg-[#EDF3EF] dark:hover:bg-[#173329] p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982]"
              aria-label="Return to Public Overview"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
