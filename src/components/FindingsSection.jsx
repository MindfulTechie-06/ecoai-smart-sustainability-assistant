import { motion } from 'framer-motion';
import { Car, Zap, Recycle, BrainCircuit, LineChart, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

const FindingsSection = () => {
  const findings = [
    {
      id: 1,
      title: 'Transport Impact',
      desc: 'Transport contributes to the majority of personal carbon emissions, especially frequent gas-car usage.',
      icon: <Car className="w-5 h-5 text-red-500" />,
      indicator: <TrendingUp className="w-4 h-4 text-red-500" />,
      stat: '+40%',
      statLabel: 'Emissions',
      color: 'border-red-500/20 bg-red-500/5',
      colSpan: 'col-span-1 md:col-span-2 lg:col-span-2'
    },
    {
      id: 2,
      title: 'Electricity Dependency',
      desc: 'High electricity usage strongly negatively affects the overall sustainability score.',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      indicator: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      stat: 'Critical',
      statLabel: 'Factor',
      color: 'border-amber-500/20 bg-amber-500/5',
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1'
    },
    {
      id: 3,
      title: 'Habit Optimization',
      desc: 'Small daily habit changes (like reducing meat or recycling) exponentially improve eco performance over time.',
      icon: <Recycle className="w-5 h-5 text-emerald-500" />,
      indicator: <TrendingDown className="w-4 h-4 text-emerald-500" />,
      stat: '-25%',
      statLabel: 'Footprint',
      color: 'border-emerald-500/20 bg-emerald-500/5',
      colSpan: 'col-span-1 md:col-span-1 lg:col-span-1'
    },
    {
      id: 4,
      title: 'AI Engagement',
      desc: 'Personalized AI recommendations drastically improve user awareness and actionable changes.',
      icon: <BrainCircuit className="w-5 h-5 text-purple-500" />,
      indicator: <CheckCircle2 className="w-4 h-4 text-purple-500" />,
      stat: 'High',
      statLabel: 'Impact',
      color: 'border-purple-500/20 bg-purple-500/5',
      colSpan: 'col-span-1 md:col-span-2 lg:col-span-2'
    },
    {
      id: 5,
      title: 'Visual Analytics',
      desc: 'Interactive visual analytics and data tracking increase long-term user retention and engagement.',
      icon: <LineChart className="w-5 h-5 text-cyan-500" />,
      indicator: <TrendingUp className="w-4 h-4 text-cyan-500" />,
      stat: '3x',
      statLabel: 'Retention',
      color: 'border-cyan-500/20 bg-cyan-500/5',
      colSpan: 'col-span-1 md:col-span-3 lg:col-span-3'
    }
  ];

  return (
    <section id="findings" className="py-24 relative overflow-hidden bg-white dark:bg-[#0B1120]">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full mb-6 border border-indigo-500/20"
            >
              <LineChart className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider uppercase">Research Insights</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-heading mb-4 text-gray-900 dark:text-white"
            >
              Key Findings & Discoveries
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Data-driven insights extracted from environmental impact analysis and user behavior patterns.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid Layout for Findings */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {findings.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ${item.colSpan} border border-gray-200 dark:border-white/10`}
            >
              {/* Subtle accent glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-50 transition-opacity duration-300 ${item.color}`}></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex items-center space-x-1.5 bg-white dark:bg-gray-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
                      {item.indicator}
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{item.stat}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold font-heading mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                   <span className="text-xs font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Insight Impact</span>
                   <span className="text-xs font-bold text-gray-900 dark:text-white">{item.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindingsSection;
