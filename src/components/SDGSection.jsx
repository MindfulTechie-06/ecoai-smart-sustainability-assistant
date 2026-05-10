import { motion } from 'framer-motion';
import { Building2, Recycle, TreePine } from 'lucide-react';

const SDGSection = () => {
  const sdgs = [
    {
      number: '11',
      title: 'Sustainable Cities',
      description: 'Make cities and human settlements inclusive, safe, resilient, and sustainable.',
      icon: Building2,
      color: 'from-orange-500 to-amber-500',
      shadow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]'
    },
    {
      number: '12',
      title: 'Responsible Consumption',
      description: 'Ensure sustainable consumption and production patterns in our daily lives.',
      icon: Recycle,
      color: 'from-amber-500 to-yellow-500',
      shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.3)]'
    },
    {
      number: '13',
      title: 'Climate Action',
      description: 'Take urgent action to combat climate change and its devastating impacts.',
      icon: TreePine,
      color: 'from-emerald-500 to-green-600',
      shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]'
    }
  ];

  return (
    <section id="sdg" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[150px] -z-10 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-amber-400 font-semibold tracking-wide uppercase text-sm mb-2">Global Impact</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
            Aligned with UN Goals
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your actions on EcoAI directly contribute to the United Nations Sustainable Development Goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group h-full"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${sdg.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              <div className="relative h-full glass-card rounded-2xl p-8 border border-white/10 flex flex-col items-center text-center overflow-hidden">
                {/* Large Background Number */}
                <div className="absolute -top-6 -right-6 text-9xl font-black text-white/5 font-heading pointer-events-none select-none">
                  {sdg.number}
                </div>
                
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${sdg.color} ${sdg.shadow} text-white`}>
                  <sdg.icon className="w-8 h-8" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4">SDG {sdg.number}: {sdg.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {sdg.description}
                </p>
                
                <a href="#" className="inline-flex items-center text-sm font-semibold text-white/70 hover:text-white transition-colors group/link">
                  Learn More 
                  <span className="ml-2 inline-block transform group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SDGSection;
