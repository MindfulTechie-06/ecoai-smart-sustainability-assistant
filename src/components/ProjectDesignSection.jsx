import { motion } from 'framer-motion';
import { User, Cpu, BarChart3, Activity, Lightbulb, ArrowRight, Database, Layout, Sparkles, Box } from 'lucide-react';

const ProjectDesignSection = () => {
  const workflowSteps = [
    { id: 1, title: 'User Input', icon: <User className="w-6 h-6" />, desc: 'Collects habit & utility data' },
    { id: 2, title: 'AI Processing', icon: <Cpu className="w-6 h-6" />, desc: 'Data structured for analysis' },
    { id: 3, title: 'Carbon Analysis', icon: <BarChart3 className="w-6 h-6" />, desc: 'Calculates footprint metrics' },
    { id: 4, title: 'Sustainability Score', icon: <Activity className="w-6 h-6" />, desc: 'Assigns eco-status & rating' },
    { id: 5, title: 'AI Recommendations', icon: <Lightbulb className="w-6 h-6" />, desc: 'Actionable green insights' },
  ];

  const techStack = [
    { name: 'React', icon: <Box className="w-6 h-6 text-cyan-400" />, desc: 'Frontend UI' },
    { name: 'Tailwind CSS', icon: <Layout className="w-6 h-6 text-teal-400" />, desc: 'Utility Styling' },
    { name: 'AI Logic', icon: <Sparkles className="w-6 h-6 text-purple-400" />, desc: 'Smart Analysis' },
    { name: 'Recharts', icon: <BarChart3 className="w-6 h-6 text-emerald-400" />, desc: 'Data Visualization' },
    { name: 'Local Storage', icon: <Database className="w-6 h-6 text-amber-400" />, desc: 'State Persistence' },
  ];

  return (
    <section id="system-design" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-transparent">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full mb-6 border border-emerald-500/20"
          >
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">System Architecture</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold font-heading mb-6"
          >
            System Design & Workflow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            A transparent view into how EcoAI processes your data to deliver actionable, intelligent sustainability insights.
          </motion.p>
        </div>

        {/* Workflow Diagram */}
        <div className="mb-24 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col lg:flex-row items-center w-full lg:w-auto relative group">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center text-center w-full lg:w-48 p-4 z-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {step.icon}
                  </div>
                  <h4 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>

                {/* Animated Arrow Connector (hidden on mobile, visible on desktop) */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center w-12 text-gray-300 dark:text-gray-600 z-0">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-6 h-6 text-emerald-500/50" />
                    </motion.div>
                  </div>
                )}

                {/* Mobile Connector */}
                {index < workflowSteps.length - 1 && (
                  <div className="lg:hidden h-8 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 text-emerald-500/50 transform rotate-90" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Background Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-24 right-24 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -z-10"></div>
        </div>

        {/* Technology Stack */}
        <div>
          <div className="text-center mb-10">
             <h3 className="text-2xl font-bold font-heading mb-2">Core Technology Stack</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">Powered by modern web technologies for optimal performance</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-white/5 rounded-2xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  {tech.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{tech.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDesignSection;
