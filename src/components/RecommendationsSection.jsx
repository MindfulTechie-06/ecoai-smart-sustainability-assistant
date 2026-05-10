import { motion } from 'framer-motion';
import { Lightbulb, ThermometerSun, Bus, Wind, Droplets, Zap, Leaf, ShieldAlert } from 'lucide-react';

const RecommendationsSection = ({ userData }) => {
  // Generate dynamic recommendations based on user data
  const generateRecommendations = () => {
    const recs = [];

    // Electricity
    if (userData?.electricity > 15) {
      recs.push({
        title: 'Reduce AC Usage',
        description: 'Your electricity usage is high. Increasing your AC temperature by just 1°C can save up to 6% on cooling costs and reduce emissions.',
        icon: ThermometerSun,
        impact: 'High Impact',
        color: '#f59e0b', // amber-500
        bgGlow: 'rgba(245, 158, 11, 0.1)'
      });
    } else {
      recs.push({
        title: 'Optimize Lighting',
        description: 'Switch to LED lighting. They use 75% less energy and last 25 times longer than incandescent lighting.',
        icon: Zap,
        impact: 'Quick Improvement',
        color: '#10b981', // emerald-500
        bgGlow: 'rgba(16, 185, 129, 0.1)'
      });
    }

    // Transport
    if (userData?.transport === 'gas_car') {
      recs.push({
        title: 'Use Public Transport',
        description: 'Switching 2 car trips a week to public transit can reduce your footprint by ~0.5 tons annually.',
        icon: Bus,
        impact: 'High Impact',
        color: '#ef4444', // red-500
        bgGlow: 'rgba(239, 68, 68, 0.1)'
      });
    }

    // Waste
    if (userData?.waste > 2) {
      recs.push({
        title: 'Reduce Plastic Waste',
        description: 'You generate more waste than average. Opt for reusable bags and avoid single-use plastics.',
        icon: Wind,
        impact: 'Medium Impact',
        color: '#8b5cf6', // purple-500
        bgGlow: 'rgba(139, 92, 246, 0.1)'
      });
    }

    // Water
    if (userData?.water > 150) {
      recs.push({
        title: 'Save Water Daily',
        description: 'Fixing leaks and taking shorter showers can save thousands of liters of water per year.',
        icon: Droplets,
        impact: 'High Impact',
        color: '#0ea5e9', // sky-500
        bgGlow: 'rgba(14, 165, 233, 0.1)'
      });
    }

    // Diet
    if (userData?.food === 'meat_heavy') {
      recs.push({
        title: 'Plant-Based Meals',
        description: 'Swapping to a vegetarian diet for just two days a week significantly reduces methane emissions.',
        icon: Leaf,
        impact: 'Medium Impact',
        color: '#84cc16', // lime-500
        bgGlow: 'rgba(132, 204, 22, 0.1)'
      });
    }

    // Default catch-all if they score perfect
    if (recs.length < 3) {
      recs.push({
        title: 'Use Renewable Energy',
        description: 'Consider switching to a green energy provider or installing solar panels if possible.',
        icon: Zap,
        impact: 'Very High Impact',
        color: '#10b981',
        bgGlow: 'rgba(16, 185, 129, 0.1)'
      });
    }

    return recs;
  };

  const recommendations = generateRecommendations();

  return (
    <section className="py-24 relative overflow-hidden bg-[var(--bg-main)]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-emerald-500 font-semibold tracking-wide uppercase text-sm mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              AI Assistant Engine
            </h2>
            <h3 className="text-3xl font-bold font-heading">
              Personalized AI Recommendations
            </h3>
          </div>
          <button className="hidden md:block text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors border border-[var(--border-color)] px-4 py-2 rounded-full hover:bg-[var(--bg-card)]">
            View All AI Insights
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
              className="glass-card rounded-2xl p-6 group cursor-pointer transition-all duration-300 relative overflow-hidden"
              style={{ '--hover-glow': rec.color }}
            >
              {/* Animated hover gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                style={{ background: `radial-gradient(circle at top right, ${rec.bgGlow}, transparent 70%)` }}
              ></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl backdrop-blur-sm border border-[var(--border-color)]" style={{ backgroundColor: rec.bgGlow }}>
                    <rec.icon className="w-6 h-6" style={{ color: rec.color }} />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ borderColor: rec.color, color: rec.color, backgroundColor: rec.bgGlow }}>
                    {rec.impact}
                  </span>
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-[var(--text-main)] transition-colors">{rec.title}</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{rec.description}</p>
                
                <div className="mt-6 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0" style={{ color: rec.color }}>
                  Apply AI Suggestion <span className="ml-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
