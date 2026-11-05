import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  Activity, 
  Zap, 
  Droplet, 
  Trash2, 
  Car, 
  TrendingDown, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const HeroSection = ({ onGetStarted, onExplore, metrics }) => {
  const currentMetrics = metrics || {
    carbon: { totalTonnes: 142.8, deltaPercent: -6.4 },
    energy: { totalMWh: 192.7, renewableSharePercent: 28 },
    water: { totalKiloLiters: 1420, recycledSharePercent: 19.7 },
    waste: { totalTonnes: 18.6, diversionRatePercent: 60.2 },
    mobility: { totalTonnesCO2: 34.5, evSharePercent: 32 }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#FBFBF9] dark:bg-[#0E1713]">
      {/* Background Subtle Gradient & Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#DDF3E5]/40 dark:bg-[#1E3626]/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#A7C9AF]/20 dark:bg-[#183827]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Pill */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] px-4 py-1.5 rounded-full shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#247A55]"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#247A55] dark:text-[#38C48B]">
              Sustainability Intelligence Platform
            </span>
            <span className="text-xs text-[#66756B] dark:text-[#96A59C]">|</span>
            <span className="text-xs text-[#66756B] dark:text-[#96A59C]">Scope 1, 2 & 3 Accounting</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17251E] dark:text-white leading-[1.15] mb-6"
          >
            Make Every Sustainability <br className="hidden sm:block" />
            <span className="text-brand-gradient">Decision Count.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#66756B] dark:text-[#96A59C] leading-relaxed mb-10 max-w-2xl mx-auto font-normal"
          >
            Echo AI transforms everyday resource data into intelligent insights, predictive simulations and practical sustainability actions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm hover:shadow-md transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold text-[#17251E] dark:text-white bg-white dark:bg-[#15221C] hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22] border border-[#E6ECE7] dark:border-[#23362C] transition-all"
            >
              <span>Explore the Platform</span>
            </button>
          </motion.div>

          {/* Value Flow: Measure -> Understand -> Predict -> Act */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-[#66756B] dark:text-[#96A59C]"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
              <Layers className="w-3.5 h-3.5 text-[#247A55]" />
              <span>1. Measure Data</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>2. Understand Impact</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>3. Predict Scenarios</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF3E5] dark:bg-[#1E3626] border border-[#C8E8D3] dark:border-[#234A35] text-[#247A55] dark:text-[#38C48B] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>4. Deliver Actions</span>
            </div>
          </motion.div>
        </div>

        {/* Live Product Dashboard Preview (5 Environmental Indicators) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="stitch-card p-6 md:p-8 bg-white dark:bg-[#15221C] shadow-lg border border-[#E6ECE7] dark:border-[#23362C]"
        >
          {/* Preview Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E6ECE7] dark:border-[#23362C] gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#17251E] dark:text-white">
                  EcoGlobal Facilities — Executive Environmental Telemetry
                </h3>
              </div>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-0.5">
                Consolidated 5-Indicator Resource Monitor • Q2 2026 Reporting
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#DDF3E5] text-[#247A55] dark:bg-[#1E3626] dark:text-[#38C48B] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Provenance
              </span>
            </div>
          </div>

          {/* 5 Indicators Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Carbon */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] hover:border-[#247A55]/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#66756B] dark:text-[#96A59C] uppercase tracking-wider">Carbon Footprint</span>
                <span className="p-1.5 rounded-lg bg-[#247A55]/10 text-[#247A55] dark:text-[#38C48B]">
                  <Activity className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {currentMetrics.carbon.totalTonnes}
                </span>
                <span className="text-xs text-[#66756B]">tCO₂e</span>
              </div>
              <div className="mt-2 flex items-center text-xs font-medium text-[#247A55] dark:text-[#38C48B]">
                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                <span>{Math.abs(currentMetrics.carbon.deltaPercent)}% vs baseline</span>
              </div>
            </div>

            {/* 2. Energy */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] hover:border-amber-400/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#66756B] dark:text-[#96A59C] uppercase tracking-wider">Energy Intake</span>
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Zap className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {currentMetrics.energy.totalMWh}
                </span>
                <span className="text-xs text-[#66756B]">MWh</span>
              </div>
              <div className="mt-2 text-xs text-[#66756B] dark:text-[#96A59C]">
                <span className="font-semibold text-amber-600 dark:text-amber-400">{currentMetrics.energy.renewableSharePercent}%</span> Clean Solar
              </div>
            </div>

            {/* 3. Water */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] hover:border-blue-400/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#66756B] dark:text-[#96A59C] uppercase tracking-wider">Water Consumption</span>
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Droplet className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {currentMetrics.water.totalKiloLiters}
                </span>
                <span className="text-xs text-[#66756B]">kL</span>
              </div>
              <div className="mt-2 text-xs text-[#66756B] dark:text-[#96A59C]">
                <span className="font-semibold text-blue-600 dark:text-blue-400">{currentMetrics.water.recycledSharePercent}%</span> Reclaimed
              </div>
            </div>

            {/* 4. Waste */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] hover:border-purple-400/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#66756B] dark:text-[#96A59C] uppercase tracking-wider">Waste Generation</span>
                <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Trash2 className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {currentMetrics.waste.totalTonnes}
                </span>
                <span className="text-xs text-[#66756B]">Tonnes</span>
              </div>
              <div className="mt-2 text-xs text-[#66756B] dark:text-[#96A59C]">
                <span className="font-semibold text-purple-600 dark:text-purple-400">{currentMetrics.waste.diversionRatePercent}%</span> Diverted
              </div>
            </div>

            {/* 5. Mobility */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] hover:border-emerald-400/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#66756B] dark:text-[#96A59C] uppercase tracking-wider">Mobility Impact</span>
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Car className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {currentMetrics.mobility.totalTonnesCO2}
                </span>
                <span className="text-xs text-[#66756B]">tCO₂e</span>
              </div>
              <div className="mt-2 text-xs text-[#66756B] dark:text-[#96A59C]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">{currentMetrics.mobility.evSharePercent}%</span> EV & Transit
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
