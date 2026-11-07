import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import EchoLogo from './EchoLogo';

export default function Navbar({
  setActiveTab,
  theme,
  setTheme,
  toggleTheme
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-[#081710]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(20,37,29,0.04)] dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)] border-b border-[#DCE8E0]/80 dark:border-[#244538]/80 transition-colors">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button 
          type="button"
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] dark:focus-visible:ring-[#20B982] rounded-lg text-left"
        >
          <EchoLogo variant="adaptive" textClassName="text-xl sm:text-2xl" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-[#64766B] dark:text-[#9AB9A8]">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="hover:text-[#075B43] dark:hover:text-[#F2F8F4] transition-colors"
          >
            Platform
          </button>
          <button 
            onClick={() => setActiveTab('carbon')} 
            className="hover:text-[#075B43] dark:hover:text-[#F2F8F4] transition-colors"
          >
            Solutions
          </button>
          <button 
            onClick={() => setActiveTab('digital-twin')} 
            className="hover:text-[#075B43] dark:hover:text-[#F2F8F4] transition-colors"
          >
            Technology
          </button>
          <button 
            onClick={() => setActiveTab('insights')} 
            className="hover:text-[#075B43] dark:hover:text-[#F2F8F4] transition-colors"
          >
            Research
          </button>
          <button 
            onClick={() => setActiveTab('reports')} 
            className="hover:text-[#075B43] dark:hover:text-[#F2F8F4] transition-colors"
          >
            Resources
          </button>
        </nav>

        {/* Right Tools: Day/Night Mode, Sign In, Get Started, Avatar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Day / Night Mode Segmented Switcher */}
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
            variant="compact"
          />

          {/* Sign In (Opens Dashboard) */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="text-xs sm:text-sm font-semibold text-[#64766B] dark:text-[#9AB9A8] hover:text-[#075B43] dark:hover:text-[#F2F8F4] px-2 py-1 transition-colors"
          >
            Sign In
          </button>

          {/* Get Started CTA */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="bg-[#075B43] hover:bg-[#0C956B] text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_1px_3px_rgba(20,37,29,0.05),0_10px_25px_-5px_rgba(7,91,67,0.15)] transition-all duration-200 flex items-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setActiveTab('dashboard')}
            title="Executive Portal"
            className="focus:outline-none rounded-full"
          >
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0C956B]/30 hover:ring-[#075B43] dark:ring-[#20B982]/30 dark:hover:ring-[#20B982] transition-all" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6SeRBDk3ANGlfd1Ab4gYYX5RDqzQFf5Hew2hsYfZnBmslz2nCkU4T0b1zzGm1ZqNTAUF97-gozP4riKS1T5wkqQWfD0yFoQH2VGmZdBZn4aPl-TQP1xondZ9njx8Er3XiQhGAD-_SHj8a0zAOs1_OaV4wojd_puyebH7anYeNASnesszLzNoVtSvNP9-ieW8lJ4ex28vXs1W9wqFTxklICKGefeDd_XXfRCgumyK"
            />
          </button>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-[#64766B] dark:text-[#9AB9A8] hover:text-[#14251D] dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-[#081710] border-b border-[#DCE8E0] dark:border-[#244538] px-6 py-4 space-y-3"
          >
            <button 
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#075B43] dark:text-[#20B982] py-2"
            >
              Platform (Executive Dashboard)
            </button>
            <button 
              onClick={() => { setActiveTab('carbon'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#075B43] dark:text-[#20B982] py-2"
            >
              Solutions (Carbon Intelligence)
            </button>
            <button 
              onClick={() => { setActiveTab('digital-twin'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#075B43] dark:text-[#20B982] py-2"
            >
              Technology (Digital Twin)
            </button>
            <button 
              onClick={() => { setActiveTab('insights'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#075B43] dark:text-[#20B982] py-2"
            >
              Research (AI Insights)
            </button>
            <button 
              onClick={() => { setActiveTab('reports'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#075B43] dark:text-[#20B982] py-2"
            >
              Resources (Regulatory Filings)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
