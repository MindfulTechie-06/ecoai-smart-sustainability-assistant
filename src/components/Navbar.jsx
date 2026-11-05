import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar({
  setActiveTab,
  theme,
  setTheme,
  toggleTheme
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoImgError, setLogoImgError] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#edfdf2]/90 dark:bg-[#0c1611]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(26,81,64,0.06)] border-b border-[#dcece1]/80 dark:border-[#1e382c]/80 transition-colors">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {!logoImgError ? (
            <img 
              alt="Echo AI Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1UbiGcp9i8WxjlGn8XHRYzTW9V0UWDpFETpEPPJ0jvo-7yI_4jIlsT3dNA_bPp-pNlPYOdlepvMXgWGrbvdV8yW7hMa-NuxJJzinQRa26u1knXI-YxTy82-7xxZfJrpVZEiV6RPhbo8QztOO-JPu3SHk4pJpyXBQ1b19a4Kb5YrIRZ0QM8pldV7QOYM2ubJbWc1dtSqQbCe0PTkNAnho_H5wzJJqHww-jV4OtSGqSJ5"
              onError={() => setLogoImgError(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold text-lg">
              E
            </div>
          )}
          <span className="font-heading text-xl sm:text-2xl font-bold text-[#00392b] dark:text-[#edfdf2] tracking-tight">
            Echo AI
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-[#404944] dark:text-[#8cc2ac]">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="hover:text-[#00392b] dark:hover:text-white transition-colors"
          >
            Platform
          </button>
          <button 
            onClick={() => setActiveTab('carbon')} 
            className="hover:text-[#00392b] dark:hover:text-white transition-colors"
          >
            Solutions
          </button>
          <button 
            onClick={() => setActiveTab('digital-twin')} 
            className="hover:text-[#00392b] dark:hover:text-white transition-colors"
          >
            Technology
          </button>
          <button 
            onClick={() => setActiveTab('insights')} 
            className="hover:text-[#00392b] dark:hover:text-white transition-colors"
          >
            Research
          </button>
          <button 
            onClick={() => setActiveTab('reports')} 
            className="hover:text-[#00392b] dark:hover:text-white transition-colors"
          >
            Resources
          </button>
        </nav>

        {/* Right Tools: Day/Night Mode, Sign In, Get Started, Avatar */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Day / Night Mode Animated Sliding Toggle */}
          <ThemeToggle
            theme={theme}
            setTheme={setTheme}
            toggleTheme={toggleTheme}
            variant="compact"
          />

          {/* Sign In (Opens Dashboard) */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="text-xs sm:text-sm font-semibold text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white px-2 py-1 transition-colors"
          >
            Sign In
          </button>

          {/* Get Started CTA */}
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="bg-[#006c49] hover:bg-[#1a5140] text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-[0_1px_3px_rgba(23,37,30,0.05),0_10px_25px_-5px_rgba(26,81,64,0.06)] transition-all duration-200 flex items-center space-x-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setActiveTab('dashboard')}
            title="Executive Portal"
            className="focus:outline-none"
          >
            <img 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#006c49]/20 hover:ring-[#006c49] transition-all" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP6SeRBDk3ANGlfd1Ab4gYYX5RDqzQFf5Hew2hsYfZnBmslz2nCkU4T0b1zzGm1ZqNTAUF97-gozP4riKS1T5wkqQWfD0yFoQH2VGmZdBZn4aPl-TQP1xondZ9njx8Er3XiQhGAD-_SHj8a0zAOs1_OaV4wojd_puyebH7anYeNASnesszLzNoVtSvNP9-ieW8lJ4ex28vXs1W9wqFTxklICKGefeDd_XXfRCgumyK"
            />
          </button>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white"
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
            className="lg:hidden bg-[#edfdf2] dark:bg-[#0c1611] border-b border-[#dcece1] dark:border-[#1e382c] px-6 py-4 space-y-3"
          >
            <button 
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#00392b] dark:text-[#9af5c6] py-2"
            >
              Platform (Executive Dashboard)
            </button>
            <button 
              onClick={() => { setActiveTab('carbon'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#00392b] dark:text-[#9af5c6] py-2"
            >
              Solutions (Carbon Intelligence)
            </button>
            <button 
              onClick={() => { setActiveTab('digital-twin'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#00392b] dark:text-[#9af5c6] py-2"
            >
              Technology (Digital Twin)
            </button>
            <button 
              onClick={() => { setActiveTab('insights'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#00392b] dark:text-[#9af5c6] py-2"
            >
              Research (AI Insights)
            </button>
            <button 
              onClick={() => { setActiveTab('reports'); setIsMobileMenuOpen(false); }} 
              className="block w-full text-left font-semibold text-sm text-[#00392b] dark:text-[#9af5c6] py-2"
            >
              Resources (Regulatory Filings)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
