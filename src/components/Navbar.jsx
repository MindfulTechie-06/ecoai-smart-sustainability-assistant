import { useState } from 'react';
import { 
  Leaf, 
  BarChart3, 
  Cpu, 
  Sparkles, 
  Layers, 
  CheckSquare, 
  FileText, 
  UploadCloud, 
  Building2, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  selectedSite, 
  setSelectedSite, 
  theme, 
  toggleTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Leaf },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'carbon', label: 'Carbon Engine', icon: Layers },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'digital-twin', label: 'Digital Twin', icon: Cpu },
    { id: 'actions', label: 'Action Ledger', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'ingestion', label: 'Data Engine', icon: UploadCloud }
  ];

  const sites = [
    { id: 'all', name: 'All Facilities (Consolidated)' },
    { id: 'site-01', name: 'Metro Innovation Campus' },
    { id: 'site-02', name: 'North Logistics Center' },
    { id: 'site-03', name: 'East R&D Facility' }
  ];

  const currentSiteName = sites.find(s => s.id === selectedSite)?.name || 'All Facilities';

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 dark:bg-[#15221C]/90 backdrop-blur-md border-b border-[#E6ECE7] dark:border-[#23362C] transition-colors">
      {/* Top Banner Notice */}
      <div className="bg-[#DDF3E5] dark:bg-[#183827] px-4 py-1.5 text-xs text-[#17251E] dark:text-[#E8F5EE] border-b border-[#C8E8D3] dark:border-[#234A35] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#247A55] dark:bg-[#38C48B] animate-pulse"></span>
            <span className="font-semibold text-[#247A55] dark:text-[#38C48B]">DEMO MODE</span>
            <span className="hidden sm:inline text-[#66756B] dark:text-[#A7C9AF]">|</span>
            <span className="hidden sm:inline text-[#66756B] dark:text-[#A7C9AF]">Sample Data — Simulated for Demonstration Purposes</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-[#66756B] dark:text-[#A7C9AF]">GHG Protocol & SBTi Aligned</span>
            <button 
              onClick={() => setActiveTab('reports')} 
              className="font-medium text-[#247A55] dark:text-[#38C48B] hover:underline"
            >
              Export ESG Summary →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-[#247A55] flex items-center justify-center text-white shadow-sm shadow-[#247A55]/20">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#17251E] dark:text-white">
                  Echo<span className="text-[#247A55] dark:text-[#38C48B]">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-[#DDF3E5] text-[#247A55] dark:bg-[#1E3626] dark:text-[#A7C9AF] rounded-md tracking-wider">
                  Enterprise
                </span>
              </div>
              <p className="text-[10px] text-[#66756B] dark:text-[#96A59C] hidden md:block">
                Sustainability Intelligence Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#F6F8F6] dark:bg-[#0E1713] p-1 rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-[#1A2A22] text-[#247A55] dark:text-[#38C48B] shadow-sm font-semibold'
                      : 'text-[#66756B] dark:text-[#96A59C] hover:text-[#17251E] dark:hover:text-white hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools: Facility Selector, Theme & CTA */}
          <div className="flex items-center space-x-3">
            
            {/* Site / Campus Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
                className="flex items-center space-x-2 text-xs font-medium bg-[#F6F8F6] dark:bg-[#0E1713] hover:bg-[#EEF2EE] dark:hover:bg-[#1A2A22] text-[#17251E] dark:text-white px-3 py-2 rounded-xl border border-[#E6ECE7] dark:border-[#23362C] transition-all"
              >
                <Building2 className="w-3.5 h-3.5 text-[#247A55] dark:text-[#38C48B]" />
                <span className="truncate max-w-[130px]">{currentSiteName}</span>
                <ChevronDown className="w-3 h-3 text-[#66756B]" />
              </button>

              <AnimatePresence>
                {isSiteDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#15221C] rounded-xl shadow-lg border border-[#E6ECE7] dark:border-[#23362C] py-1 z-50"
                  >
                    <div className="px-3 py-2 text-[11px] font-semibold text-[#66756B] uppercase tracking-wider border-b border-[#E6ECE7] dark:border-[#23362C]">
                      Switch Facility Scope
                    </div>
                    {sites.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => {
                          setSelectedSite(site.id);
                          setIsSiteDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22] ${
                          selectedSite === site.id
                            ? 'text-[#247A55] dark:text-[#38C48B] font-semibold bg-[#DDF3E5]/30'
                            : 'text-[#17251E] dark:text-gray-200'
                        }`}
                      >
                        <span>{site.name}</span>
                        {selectedSite === site.id && <span className="w-1.5 h-1.5 rounded-full bg-[#247A55]"></span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[#66756B] dark:text-[#96A59C] bg-[#F6F8F6] dark:bg-[#0E1713] hover:text-[#17251E] dark:hover:text-white border border-[#E6ECE7] dark:border-[#23362C] transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#247A55]" />}
            </button>

            {/* Quick Action Button */}
            <button
              onClick={() => setActiveTab('digital-twin')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Simulate Scenario</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#66756B] dark:text-[#96A59C] bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#E6ECE7] dark:border-[#23362C] bg-white dark:bg-[#15221C] px-4 pt-3 pb-6 space-y-2 shadow-lg"
          >
            <div className="mb-3">
              <label className="text-[11px] font-semibold text-[#66756B] uppercase tracking-wider block mb-1">
                Select Facility:
              </label>
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full text-xs p-2 rounded-lg bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white"
              >
                {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#DDF3E5] dark:bg-[#1E3626] text-[#247A55] dark:text-[#38C48B] font-semibold'
                        : 'text-[#66756B] dark:text-gray-300 hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
