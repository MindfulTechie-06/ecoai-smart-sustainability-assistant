import { motion } from 'framer-motion';
import { 
  Layers, 
  Sparkles, 
  Cpu, 
  CheckSquare, 
  BarChart4, 
  ShieldCheck 
} from 'lucide-react';

const FeaturesSection = ({ onSelectModule }) => {
  const features = [
    {
      id: 'carbon',
      title: 'Deterministic Carbon Engine',
      description: 'Formal GHG Protocol calculation across Scope 1 direct fuel, Scope 2 location/market electricity, and Scope 3 supply chain.',
      icon: Layers,
      color: '#247A55',
      badge: 'GHG Protocol Aligned'
    },
    {
      id: 'digital-twin',
      title: 'Sustainability Digital Twin',
      description: 'Hypothetical scenario simulation engine comparing Baseline vs Proposed operations with real-time financial ROI and payback modeling.',
      icon: Cpu,
      color: '#0284C7',
      badge: 'Scenario Modeling'
    },
    {
      id: 'insights',
      title: 'Explainable AI Analytics',
      description: '5-point structured reasoning: What happened, root cause, supporting data, projected trajectory, and recommended next step.',
      icon: Sparkles,
      color: '#D97706',
      badge: 'Root-Cause AI'
    },
    {
      id: 'actions',
      title: 'Auditable Action Ledger',
      description: 'Strict architectural segregation between modeled predicted savings and empirically verified measured outcomes.',
      icon: CheckSquare,
      color: '#7C3AED',
      badge: 'Verification Log'
    },
    {
      id: 'dashboard',
      title: '5 Core Indicators Monitor',
      description: 'Unified telemetry tracking Carbon emissions, Energy consumption, Water intake, Waste diversion, and Clean Mobility.',
      icon: BarChart4,
      color: '#059669',
      badge: 'Real-Time Sync'
    },
    {
      id: 'reports',
      title: 'Enterprise Disclosures',
      description: 'Automated executive reporting with instant CSV export and print-ready PDF generation for ESG compliance.',
      icon: ShieldCheck,
      color: '#247A55',
      badge: 'Audit Ready'
    }
  ];

  return (
    <section className="py-20 bg-[#F6F8F6] dark:bg-[#0E1713] border-y border-[#E6ECE7] dark:border-[#23362C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#247A55] dark:text-[#38C48B] mb-2 block">
            Enterprise Architecture
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17251E] dark:text-white mb-4">
            From Resource Telemetry to Measured Action.
          </h2>
          <p className="text-sm text-[#66756B] dark:text-[#96A59C]">
            Engineered for chief sustainability officers, operations directors, and facility teams demanding mathematical precision.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectModule && onSelectModule(feat.id)}
                className="stitch-card p-6 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] hover:border-[#A7C9AF] cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: feat.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#DDF3E5] text-[#247A55] dark:bg-[#1E3626] dark:text-[#A7C9AF]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#17251E] dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#66756B] dark:text-[#96A59C] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] flex items-center text-xs font-semibold text-[#247A55] dark:text-[#38C48B]">
                  <span>Open Module</span>
                  <span className="ml-1.5">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
