import { motion } from 'framer-motion';
import { Lightbulb, ThermometerSun, Bus, Wind, Droplets, Zap } from 'lucide-react';

const RecommendationsSection = () => {
  const recommendations = [
    {
      title: 'Reduce AC Usage',
      description: 'Increasing your AC temperature by just 1°C can save up to 6% on cooling costs and reduce emissions.',
      icon: ThermometerSun,
      impact: 'High Impact',
      color: 'text-amber-400',
      bg: 'bg-amber-400/10'
    },
    {
      title: 'Use Public Transport',
      description: 'Switching 2 car trips a week to public transit can reduce your footprint by ~0.5 tons annually.',
      icon: Bus,
      impact: 'Medium Impact',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Reduce Plastic Waste',
      description: 'Opt for reusable bags and bottles. Avoid single-use plastics in your daily groceries.',
      icon: Wind,
      impact: 'Medium Impact',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Save Water Daily',
      description: 'Fixing leaks and taking shorter showers can save thousands of liters of water per year.',
      icon: Droplets,
      impact: 'High Impact',
      color: 'text-cyan-400',
      bg: 'bg-cyan-400/10'
    },
    {
      title: 'Use Renewable Energy',
      description: 'Consider switching to a green energy provider or installing solar panels if possible.',
      icon: Zap,
      impact: 'Very High Impact',
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    }
  ];

  return (
    <section className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              AI Assistant
            </h2>
            <h3 className="text-3xl font-bold text-white font-heading">
              Personalized Recommendations
            </h3>
          </div>
          <button className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors border border-white/10 px-4 py-2 rounded-full hover:bg-white/5">
            View All Tips
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 group cursor-pointer hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${rec.bg}`}>
                  <rec.icon className={`w-6 h-6 ${rec.color}`} />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border border-white/10 ${
                  rec.impact.includes('Very') ? 'text-emerald-400 bg-emerald-400/10' : 
                  rec.impact.includes('High') ? 'text-amber-400 bg-amber-400/10' : 
                  'text-blue-400 bg-blue-400/10'
                }`}>
                  {rec.impact}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{rec.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{rec.description}</p>
              
              <div className="mt-6 flex items-center text-sm font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Apply Suggestion <span className="ml-1">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
