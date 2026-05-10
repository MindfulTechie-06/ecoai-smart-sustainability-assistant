import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';

const DashboardSection = ({ score = 78 }) => {
  // Sample Data for charts
  const weeklyData = [
    { name: 'Mon', carbon: 12.5, water: 150 },
    { name: 'Tue', carbon: 11.2, water: 140 },
    { name: 'Wed', carbon: 14.1, water: 160 },
    { name: 'Thu', carbon: 9.8, water: 130 },
    { name: 'Fri', carbon: 10.5, water: 135 },
    { name: 'Sat', carbon: 8.2, water: 120 },
    { name: 'Sun', carbon: 7.5, water: 110 },
  ];

  const categoryData = [
    { name: 'Transport', value: 45 },
    { name: 'Energy', value: 30 },
    { name: 'Food', value: 15 },
    { name: 'Waste', value: 10 },
  ];

  // Calculate dynamic colors based on score
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-emerald-400';
    if (s >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBg = (s) => {
    if (s >= 80) return 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]';
    if (s >= 60) return 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]';
    return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]';
  };

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-2">AI Analytics</h2>
            <h3 className="text-3xl font-bold text-white font-heading">
              Sustainability Dashboard
            </h3>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Data Sync Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Score Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden lg:col-span-1"
          >
            <div className="absolute top-0 right-0 p-6">
              <Target className="w-6 h-6 text-gray-400 opacity-50" />
            </div>
            <h4 className="text-lg font-medium text-gray-300 mb-6">Overall Sustainability Score</h4>
            
            {/* Circular Progress (CSS based) */}
            <div className={`relative w-48 h-48 rounded-full border-8 border-dark-bg flex items-center justify-center bg-white/5 backdrop-blur-md mb-6 transition-all duration-1000 ${getScoreBg(score)}`}>
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/10 animate-[spin_20s_linear_infinite]"></div>
              <div className="text-center z-10">
                <span className={`text-6xl font-bold font-heading ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className="block text-sm text-gray-400 mt-1">/ 100</span>
              </div>
            </div>

            <p className="text-sm text-gray-400 max-w-[200px]">
              {score >= 80 ? 'Excellent! You are an eco-warrior.' : score >= 60 ? 'Good, but there is room for improvement.' : 'Needs attention. Check AI recommendations.'}
            </p>
            
            <div className="mt-6 flex items-center text-emerald-400 text-sm font-medium bg-emerald-400/10 px-4 py-2 rounded-full">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +5% from last week
            </div>
          </motion.div>

          {/* Charts Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-sm font-medium text-gray-400 mb-1">Weekly Carbon Footprint</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold text-white font-heading">73.8 <span className="text-lg text-gray-500 font-normal">kg</span></h4>
                  <span className="flex items-center text-emerald-400 text-sm font-medium">
                    <ArrowDownRight className="w-4 h-4 mr-1" /> 12%
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="text-sm font-medium text-gray-400 mb-1">Green Impact</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold text-emerald-400 font-heading">68%</h4>
                  <span className="text-xs text-gray-500">of energy from renewables</span>
                </div>
                {/* Mini progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </motion.div>
            </div>

            {/* Main Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 h-[320px]"
            >
              <h4 className="text-sm font-medium text-gray-300 mb-6">Carbon vs Water Usage Trend</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#e5e7eb' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="carbon" stroke="#10b981" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Carbon (kg)" />
                  <Line yAxisId="right" type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} name="Water (L)" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
