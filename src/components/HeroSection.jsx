import { motion } from 'framer-motion';
import { ArrowRight, Activity, Globe, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[var(--bg-main)]">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="inline-flex items-center space-x-2 glass-card rounded-full px-4 py-2 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-[var(--text-muted)]">AI for Sustainable Development in the New Era</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6 text-[var(--text-main)]">
              Smart <span className="text-gradient">Sustainability</span> Assistant
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-muted)] mb-8 max-w-2xl leading-relaxed">
              Track, analyze, and reduce your carbon footprint with cutting-edge artificial intelligence. 
              Join the green revolution and make data-driven decisions for a better tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-emerald-500 rounded-full overflow-hidden transition-all hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative flex items-center">
                  Start Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-[var(--text-main)] glass-card glass-card-hover rounded-full">
                View Dashboard
              </button>
            </div>
          </motion.div>

          {/* Futuristic Illustration (Abstract CSS Art) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block h-[500px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[var(--border-color)]"
              />
              
              {/* Middle rotating ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/30"
              />

              {/* Core Brain/Earth sphere */}
              <div className="relative w-48 h-48 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center overflow-hidden z-10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
                <Globe className="w-24 h-24 text-white/90 animate-pulse" strokeWidth={1.5} />
              </div>

              {/* Floating feature icons */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 glass-card p-3 rounded-xl z-20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                <Activity className="w-6 h-6 text-emerald-500" />
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-10 glass-card p-3 rounded-xl z-20 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <Zap className="w-6 h-6 text-cyan-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
