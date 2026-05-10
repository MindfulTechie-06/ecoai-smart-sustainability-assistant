import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Droplet, Car, Trash2, Utensils, CheckCircle2 } from 'lucide-react';

const UserInputSection = ({ onAnalyze }) => {
  const [formData, setFormData] = useState({
    electricity: 10,
    water: 100,
    transport: 'public',
    waste: 5,
    food: 'mixed'
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleSliderChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      onAnalyze(formData);
    }, 1500);
  };

  return (
    <section id="input" className="py-24 relative bg-black/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-2">Data Input</h2>
          <h3 className="text-3xl font-bold text-white font-heading mb-4">
            Calculate Your Impact
          </h3>
          <p className="text-gray-400">
            Enter your daily consumption details to receive a personalized sustainability analysis.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Electricity */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Zap className="w-4 h-4 mr-2 text-amber-400" />
                  Electricity Usage (kWh/day)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="electricity"
                    min="1"
                    max="50"
                    value={formData.electricity}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                    {formData.electricity}
                  </span>
                </div>
              </div>

              {/* Water */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Droplet className="w-4 h-4 mr-2 text-cyan-400" />
                  Water Consumption (Liters/day)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="water"
                    min="10"
                    max="300"
                    step="10"
                    value={formData.water}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-md min-w-[4rem] text-center">
                    {formData.water}
                  </span>
                </div>
              </div>

              {/* Waste */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Trash2 className="w-4 h-4 mr-2 text-gray-400" />
                  Waste Generation (kg/day)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    name="waste"
                    min="0"
                    max="10"
                    value={formData.waste}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-white font-mono bg-white/10 px-3 py-1 rounded-md min-w-[3rem] text-center">
                    {formData.waste}
                  </span>
                </div>
              </div>

              {/* Transport */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Car className="w-4 h-4 mr-2 text-blue-400" />
                  Primary Transport Mode
                </label>
                <div className="relative">
                  <select
                    name="transport"
                    value={formData.transport}
                    onChange={handleSelectChange}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 appearance-none"
                  >
                    <option value="walk_bike" className="bg-dark-card">Walking / Bicycle</option>
                    <option value="public" className="bg-dark-card">Public Transport</option>
                    <option value="ev" className="bg-dark-card">Electric Vehicle</option>
                    <option value="gas_car" className="bg-dark-card">Gasoline Car</option>
                  </select>
                </div>
              </div>

              {/* Diet */}
              <div className="space-y-3 md:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-300">
                  <Utensils className="w-4 h-4 mr-2 text-orange-400" />
                  Dietary Habits
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['vegan', 'vegetarian', 'mixed', 'meat_heavy'].map((diet) => (
                    <label 
                      key={diet} 
                      className={`cursor-pointer rounded-lg border p-3 flex text-center justify-center transition-all ${
                        formData.food === diet 
                          ? 'border-emerald-500 bg-emerald-500/20 text-white' 
                          : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="food" 
                        value={diet} 
                        checked={formData.food === diet}
                        onChange={handleSelectChange}
                        className="sr-only" 
                      />
                      <span className="text-sm capitalize">{diet.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-center">
              <button
                type="submit"
                disabled={analyzing}
                className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {analyzing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing with AI...
                  </span>
                ) : analyzed ? (
                  <span className="flex items-center">
                    <CheckCircle2 className="mr-2 w-5 h-5" />
                    Analysis Updated
                  </span>
                ) : (
                  <span className="relative flex items-center">
                    Analyze Sustainability
                  </span>
                )}
              </button>
            </div>
            
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default UserInputSection;
