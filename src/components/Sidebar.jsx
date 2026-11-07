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
        className={`app-sidebar fixed left-0 top-0 bottom-0 h-screen w-[280px] lg:w-[var(--sidebar-width)] bg-[#00392b] text-white z-50 flex flex-col shadow-[0_4px_12px_rgba(23,37,30,0.12),0_20px_32px_-8px_rgba(26,81,64,0.18)] border-r border-[#1a5140] transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Sidebar Navigation"
      >
        {/* 1. Top Brand Bar - Fixed height matching top navigation */}
        <div className="h-[var(--topbar-height)] px-4 flex items-center justify-between border-b border-[#1a5140]/80 bg-[#00392b] shrink-0">
          <button 
            type="button"
            onClick={() => { setActiveTab('landing'); setIsMobileOpen(false); }}
            className="flex items-center text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]/60 rounded-lg p-1 -ml-1 transition-colors"
            title="Return to Public Overview"
          >
            <EchoLogo variant="dark" showText={true} />
          </button>

          {/* Close Mobile Button */}
          <button 
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#9bd2bc] hover:text-white hover:bg-[#1a5140] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]"
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
              className="w-full bg-[#133f32] hover:bg-[#1a5140] border border-[#235845] hover:border-[#387e65] px-3 py-2 rounded-xl flex items-center justify-between text-white text-left transition-all duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]/60 shadow-xs"
              aria-expanded={isSiteDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#1a5140] group-hover:bg-[#235845] flex items-center justify-center shrink-0 border border-[#2e6e56] transition-colors">
                  <span className="material-symbols-outlined text-[#9af5c6] text-base">
                    corporate_fare
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] text-[#9bd2bc] font-bold uppercase tracking-wider leading-tight">
                    Scope Entity
                  </span>
                  <span className="text-xs font-semibold text-white truncate max-w-[130px]">
                    {currentFacility.name}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#9bd2bc] group-hover:text-white text-lg shrink-0 transition-colors">
                unfold_more
              </span>
            </button>

            {/* Facility Dropdown Menu */}
            {isSiteDropdownOpen && (
              <div 
                className="absolute left-0 right-0 mt-1.5 bg-[#0b291f] border border-[#235845] rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                role="listbox"
              >
                <div className="px-3 py-1.5 text-[9px] text-[#9bd2bc] font-bold uppercase tracking-wider border-b border-[#1a5140] bg-[#00392b]/50">
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
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1a5140] transition-colors ${
                        isSelected ? 'bg-[#1a5140] text-[#9af5c6] font-semibold' : 'text-white/90'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <div className="truncate font-medium">{fac.name}</div>
                        <div className="text-[10px] text-[#9bd2bc]/80">{fac.code}</div>
                      </div>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9af5c6] shrink-0" />
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
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9bd2bc]/70 select-none">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]/60 ${
                      isActive
                        ? 'bg-[#1a5140] text-white font-semibold shadow-xs'
                        : 'text-[#9bd2bc] hover:bg-[#1a5140]/50 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {/* Left Accent indicator for active item */}
                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#9af5c6] rounded-r-full" />
                    )}

                    <div className="flex items-center space-x-2.5 min-w-0 pl-0.5">
                      <span 
                        className={`material-symbols-outlined text-[19px] shrink-0 transition-colors ${
                          isActive ? 'text-[#9af5c6]' : 'text-[#9bd2bc] group-hover:text-white'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9af5c6] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 4. Public Editorial Shortcut (Pinned above profile) */}
        <div className="px-3 py-2 border-t border-[#1a5140]/80 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveTab('landing');
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#9bd2bc] hover:bg-[#1a5140]/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]/60 group"
          >
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-base group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span>Editorial Platform</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-[#9af5c6] bg-[#1a5140] px-1.5 py-0.5 rounded border border-[#2e6e56]">
              Public
            </span>
          </button>
        </div>

        {/* 5. Footer Theme Toggle & User Profile (Fixed bottom, never covering nav) */}
        <div className="p-3 bg-[#0b291f]/95 border-t border-[#1a5140] m-2 rounded-xl space-y-2.5 shrink-0">
          {/* Day / Night Time-Aware Toggle Widget */}
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
            variant="full"
          />

          {/* User Profile Card */}
          <div className="flex items-center justify-between pt-1 border-t border-[#1a5140]/60">
            <div className="flex items-center space-x-2.5 min-w-0">
              <img 
                alt="Profile of Elena Rostova" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#9af5c6]/40 shrink-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6SeRBDk3ANGlfd1Ab4gYYX5RDqzQFf5Hew2hsYfZnBmslz2nCkU4T0b1zzGm1ZqNTAUF97-gozP4riKS1T5wkqQWfD0yFoQH2VGmZdBZn4aPl-TQP1xondZ9njx8Er3XiQhGAD-_SHj8a0zAOs1_OaV4wojd_puyebH7anYeNASnesszLzNoVtSvNP9-ieW8lJ4ex28vXs1W9wqFTxklICKGefeDd_XXfRCgumyK"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-white truncate max-w-[125px]">
                  Elena Rostova
                </span>
                <span className="text-[10px] text-[#9bd2bc] truncate">
                  VP Sustainability
                </span>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setActiveTab('landing')}
              title="Return to Public Overview"
              className="text-[#9bd2bc] hover:text-white hover:bg-[#1a5140] p-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9af5c6]"
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
