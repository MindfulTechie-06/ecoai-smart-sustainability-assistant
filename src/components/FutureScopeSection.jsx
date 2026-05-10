import { motion } from 'framer-motion';
import { Smartphone, Home, MessageSquare, Satellite } from 'lucide-react';

const FutureScopeSection = () => {
  const roadmap = [
    {
      quarter: 'Q3 2026',
      title: 'Mobile App Launch',
      description: 'Native iOS and Android applications for on-the-go tracking and real-time push notifications for eco-tips.',
      icon: Smartphone,
      status: 'upcoming'
    },
    {
      quarter: 'Q4 2026',
      title: 'Smart Home Integration',
      description: 'Direct API connections with smart thermostats, plugs, and meters for automated energy optimization.',
      icon: Home,
      status: 'upcoming'
    },
    {
      quarter: 'Q1 2027',
      title: 'AI Chatbot Assistant',
      description: 'A conversational AI interface allowing you to ask specific sustainability questions and get instant advice.',
      icon: MessageSquare,
      status: 'planned'
    },
    {
      quarter: 'Q2 2027',
      title: 'Real-time IoT Monitoring',
      description: 'Integration with custom environmental sensors to monitor local air quality and micro-climate data.',
      icon: Satellite,
      status: 'planned'
    }
  ];

  return (
    <section className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-purple-400 font-semibold tracking-wide uppercase text-sm mb-2">Roadmap</h2>
          <h3 className="text-3xl font-bold text-white font-heading mb-4">
            Future Scope & Vision
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We are constantly evolving. Here is a glimpse into what we are building next to make sustainable living effortless.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-dark-bg border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transform -translate-x-1/2 mt-[1.4rem] md:mt-0 z-10"></div>
                
                {/* Content */}
                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 w-full">
                  <div className={`glass-card p-6 rounded-2xl border ${item.status === 'upcoming' ? 'border-emerald-500/30' : 'border-white/10'} hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-emerald-400 font-mono text-sm font-semibold">{item.quarter}</span>
                      <item.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureScopeSection;
