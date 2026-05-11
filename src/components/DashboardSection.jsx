import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { ArrowDownRight, Target, Leaf, Zap, Droplets, Car, Trash2, Utensils, Sparkles, Activity, ShieldAlert } from 'lucide-react';

const DashboardSection = ({ score = 78, userData, onReset }) => {
  // Generate Pie Chart Data dynamically based on userData
  const pieData = [
    { name: 'Energy', value: (userData?.electricity || 12) * 0.85, color: '#f59e0b', icon: <Zap size={14} /> },
    { name: 'Water', value: (userData?.water || 120) * 0.1, color: '#06b6d4', icon: <Droplets size={14} /> },
    { name: 'Transport', value: userData?.transport === 'gas_car' ? 40 : userData?.transport === 'public' ? 15 : 5, color: '#8b5cf6', icon: <Car size={14} /> },
    { name: 'Waste', value: (userData?.waste || 1.5) * 5, color: '#ec4899', icon: <Trash2 size={14} /> },
    { name: 'Diet', value: userData?.food === 'meat_heavy' ? 30 : userData?.food === 'mixed' ? 15 : 5, color: '#10b981', icon: <Utensils size={14} /> },
  ];

  // Calculate total carbon from pie data
  const totalCarbon = pieData.reduce((acc, curr) => acc + curr.value, 0).toFixed(1);
  
  // Find largest factor
  const largestFactor = pieData.reduce((max, obj) => (obj.value > max.value ? obj : max), pieData[0]);

  // Mock weekly data for Line chart
  const weeklyData = [
    { name: 'Mon', carbon: 12.5, water: 150 },
    { name: 'Tue', carbon: 11.2, water: 140 },
    { name: 'Wed', carbon: 14.1, water: 160 },
    { name: 'Thu', carbon: 9.8, water: 130 },
    { name: 'Fri', carbon: 10.5, water: 135 },
    { name: 'Sat', carbon: 8.2, water: 120 },
    { name: 'Sun', carbon: 7.5, water: 110 },
  ];

  // Mock monthly score trend for Bar chart
  const monthlyData = [
    { name: 'Week 1', score: Math.max(0, score - 15) },
    { name: 'Week 2', score: Math.max(0, score - 8) },
    { name: 'Week 3', score: Math.max(0, score - 2) },
    { name: 'Week 4', score: score },
  ];

  // Status Logic
  const getScoreDetails = (s) => {
    if (s >= 90) return { color: '#10b981', twColor: 'text-emerald-500', bgGlow: 'rgba(16,185,129,0.3)', status: 'Eco Warrior', label: 'Excellent', desc: 'Outstanding environmental leadership. Keep up the phenomenal work!' };
    if (s >= 75) return { color: '#3b82f6', twColor: 'text-blue-500', bgGlow: 'rgba(59,130,246,0.3)', status: 'Green Citizen', label: 'Good', desc: 'Your habits are above average. Keep making sustainable choices.' };
    if (s >= 60) return { color: '#f59e0b', twColor: 'text-amber-500', bgGlow: 'rgba(245,158,11,0.3)', status: 'Sustainability Starter', label: 'Moderate', desc: 'You are on the right track, but there is room for significant improvement.' };
    return { color: '#ef4444', twColor: 'text-red-500', bgGlow: 'rgba(239,68,68,0.3)', status: 'Needs Improvement', label: 'Critical', desc: 'High environmental impact detected. Check the AI recommendations for quick wins.' };
  };

  const details = getScoreDetails(score);

  // SVG Circular Meter Calculation
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Animated Score Counter
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, score, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [score, count]);

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-transparent">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-4 py-2 rounded-full mb-4 border border-cyan-500/20"
            >
              <Activity className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wider uppercase">AI Analytics</span>
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white">
              Data Analysis & Results
            </h3>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button 
              onClick={onReset}
              className="px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/20 transition-colors flex items-center gap-2"
            >
              <Activity className="w-4 h-4" /> Run New Analysis
            </button>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-white/5 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Sync Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Score Card (Left Column) */}
          <div className="space-y-6 lg:col-span-1 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden flex-1 border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
              style={{ boxShadow: `0 15px 40px -10px ${details.bgGlow}` }}
            >
              <div className="absolute top-0 right-0 p-6">
                <Target className="w-5 h-5 text-gray-400 dark:text-gray-500 opacity-50" />
              </div>
              
              {/* Animated Eco Status Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mb-6 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 border bg-white dark:bg-[#0B1120] shadow-sm" 
                style={{ borderColor: details.color, color: details.color }}
              >
                <Leaf className="w-3.5 h-3.5" />
                {details.status}
              </motion.div>

              <h4 className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-8">Overall Score</h4>
              
              {/* Premium Animated Circular Meter */}
              <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                {/* Ambient Background Glow */}
                <div 
                  className="absolute inset-0 rounded-full blur-[30px] opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen transition-all duration-1000"
                  style={{ backgroundColor: details.color }}
                ></div>
                
                {/* Outer decorative ring */}
                <div className="absolute inset-2 rounded-full border border-gray-200 dark:border-gray-800 opacity-50"></div>
                
                <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 160 160">
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={details.color} />
                      <stop offset="100%" stopColor={details.color} stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="innerGlow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  
                  {/* Track */}
                  <circle
                    cx="80" cy="80" r={radius}
                    stroke="currentColor" 
                    className="text-gray-200 dark:text-gray-800"
                    strokeWidth="8" fill="transparent"
                  />
                  
                  {/* Progress Line */}
                  <motion.circle
                    cx="80" cy="80" r={radius}
                    stroke="url(#scoreGradient)" strokeWidth="12" fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                    filter="url(#innerGlow)"
                  />
                </svg>

                {/* Score Text */}
                <div className="absolute flex flex-col items-center justify-center z-20">
                  <motion.span 
                    className="text-7xl font-bold font-heading tracking-tighter drop-shadow-md"
                    style={{ color: details.color }}
                  >
                    {rounded}
                  </motion.span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1 tracking-wide">{details.label}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[240px]">
                {details.desc}
              </p>
            </motion.div>

            {/* AI Result Summary Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden border"
              style={{ borderColor: `${largestFactor.color}40`, backgroundColor: `${largestFactor.color}10` }}
            >
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl text-white shadow-lg" style={{ backgroundColor: largestFactor.color }}>
                    {largestFactor.icon}
                  </div>
                  <div>
                    <h4 className="font-bold tracking-wide" style={{ color: largestFactor.color }}>Top Risk Factor</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium capitalize">{largestFactor.name} Impact</p>
                  </div>
               </div>
               <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                 <span className="capitalize font-semibold">{largestFactor.name}</span> emissions are your highest environmental impact factor, contributing <strong style={{color: largestFactor.color}}>{largestFactor.value.toFixed(1)} kg CO₂</strong> daily. 
                 Review the AI suggestions below to mitigate this risk.
               </p>
            </motion.div>

            {/* Progress Insight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-5 border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10"
            >
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-full mt-1">
                    <ArrowDownRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 transform rotate-180" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Performance Insight</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Your sustainability score improved by <strong className="text-emerald-600 dark:text-emerald-400">18%</strong> compared to previous analysis. Excellent progress!
                    </p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Charts Area (Right Column) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-2">Daily CO₂ Impact</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                    <motion.span>{totalCarbon}</motion.span> <span className="text-base text-gray-400 dark:text-gray-500 font-normal">kg</span>
                  </h4>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-2">Monthly CO₂ Impact</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                    <motion.span>{(totalCarbon * 30).toFixed(0)}</motion.span> <span className="text-base text-gray-400 dark:text-gray-500 font-normal">kg</span>
                  </h4>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300 border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldAlert className="w-12 h-12" style={{ color: details.color }} />
                </div>
                <p className="text-xs font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400 mb-2">Risk Level</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-2xl font-bold font-heading" style={{ color: details.color }}>
                    {totalCarbon > 30 ? 'High' : totalCarbon > 15 ? 'Moderate' : 'Low'}
                  </h4>
                </div>
              </motion.div>
            </div>

            {/* Lower Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Pie Chart: Emissions Breakdown */}
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-3xl p-6 h-[320px] flex flex-col border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
              >
                <h4 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white mb-2">Emissions Breakdown</h4>
                <div className="flex-1 min-h-0 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#fff', fontWeight: 500 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full text-gray-500 dark:text-gray-400">
                       <Activity className="w-6 h-6" />
                     </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center text-[11px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                      <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Bar Chart: Score Trend */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-3xl p-6 h-[320px] flex flex-col border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
              >
                <h4 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white mb-4">Score History</h4>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-800" vertical={false} />
                      <XAxis dataKey="name" stroke="currentColor" className="text-gray-400" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="currentColor" className="text-gray-400" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ fill: 'currentColor', className: 'text-gray-100 dark:text-gray-800' }}
                      />
                      <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={40}>
                        {monthlyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.score >= 90 ? '#10b981' : entry.score >= 75 ? '#3b82f6' : entry.score >= 60 ? '#f59e0b' : '#ef4444'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Line Chart: Resources */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-6 h-[320px] flex flex-col border border-gray-100 dark:border-white/5 bg-white/60 dark:bg-[#1A233A]/60"
            >
              <h4 className="text-sm font-semibold tracking-wide text-gray-900 dark:text-white mb-4">Carbon vs Water Usage Trend</h4>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200 dark:text-gray-800" vertical={false} />
                    <XAxis dataKey="name" stroke="currentColor" className="text-gray-400" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" stroke="currentColor" className="text-gray-400" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="right" orientation="right" stroke="currentColor" className="text-gray-400" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', backdropFilter: 'blur(8px)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="carbon" stroke="#10b981" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6, strokeWidth: 0}} name="Carbon (kg)" />
                    <Line yAxisId="right" type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6, strokeWidth: 0}} name="Water (L)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
