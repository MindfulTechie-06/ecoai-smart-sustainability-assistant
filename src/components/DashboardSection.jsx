import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, Target, Leaf, TrendingUp, Zap, Droplets, Car, Trash2, Utensils } from 'lucide-react';

const DashboardSection = ({ score = 78, userData }) => {
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
    if (s >= 80) return { color: '#10b981', twColor: 'text-emerald-500', bgGlow: 'rgba(16,185,129,0.3)', status: 'Eco Warrior', label: 'Eco Friendly', desc: 'Your sustainability habits are excellent! Reducing transport emissions could yield a perfect score.' };
    if (s >= 60) return { color: '#f59e0b', twColor: 'text-amber-500', bgGlow: 'rgba(245,158,11,0.3)', status: 'Climate Conscious', label: 'Moderate', desc: 'Your habits are above average. Switch to LED lighting and public transport to boost your score.' };
    return { color: '#ef4444', twColor: 'text-red-500', bgGlow: 'rgba(239,68,68,0.3)', status: 'Sustainability Starter', label: 'Needs Improvement', desc: 'High environmental impact detected. Check the AI recommendations below for quick wins.' };
  };

  const details = getScoreDetails(score);

  // SVG Circular Meter Calculation
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-cyan-500 dark:text-cyan-400 font-semibold tracking-wide uppercase text-sm mb-2">AI Analytics Dashboard</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-heading">
              Sustainability Overview
            </h3>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-black/20 px-4 py-2 rounded-full border border-[var(--border-color)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Sync Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Score Card (Left Column) */}
          <div className="space-y-8 lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden glass-card-hover"
              style={{ boxShadow: `0 15px 40px -10px ${details.bgGlow}` }}
            >
              <div className="absolute top-0 right-0 p-6">
                <Target className="w-5 h-5 text-[var(--text-muted)] opacity-50" />
              </div>
              
              {/* Eco Status Badge */}
              <div className={`mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-${details.color.replace('#', '')} bg-white/5`} style={{ borderColor: details.color, color: details.color }}>
                <Leaf className="w-3 h-3" />
                {details.status}
              </div>

              <h4 className="text-lg font-medium text-[var(--text-muted)] mb-6">Overall Score</h4>
              
              {/* Animated SVG Meter */}
              <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                  <circle
                    cx="70" cy="70" r={radius}
                    stroke="var(--border-color)" strokeWidth="12" fill="transparent"
                  />
                  <motion.circle
                    cx="70" cy="70" r={radius}
                    stroke={details.color} strokeWidth="12" fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 8px ${details.color})` }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-6xl font-bold font-heading ${details.twColor}`}>
                    {score}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-muted)] mt-1">{details.label}</span>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)] max-w-[220px]">
                {details.desc}
              </p>
            </motion.div>

            {/* Weekly Eco Report Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden"
            >
               <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h4 className="font-semibold">AI Weekly Report</h4>
               </div>
               <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                 Based on your latest inputs, your carbon footprint is estimated at <strong className="text-[var(--text-main)]">{totalCarbon} kg CO₂e</strong> this week. 
                 {score >= 60 ? " You've shown a consistent trend of sustainable choices. Keep it up!" : " We've identified key areas like electricity and transport where you can significantly lower your impact."}
               </p>
            </motion.div>
          </div>

          {/* Charts Area (Right Column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 glass-card-hover"
              >
                <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Carbon Footprint</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold font-heading">{totalCarbon} <span className="text-lg text-[var(--text-muted)] font-normal">kg</span></h4>
                  <span className="flex items-center text-emerald-500 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded-md">
                    <ArrowDownRight className="w-4 h-4 mr-1" /> 8%
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 glass-card-hover"
              >
                <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Progress vs Target</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-bold text-cyan-500 font-heading">85%</h4>
                  <span className="text-xs text-[var(--text-muted)]">towards monthly goal</span>
                </div>
                <div className="w-full bg-[var(--border-color)] rounded-full h-1.5 mt-4 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-cyan-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  ></motion.div>
                </div>
              </motion.div>
            </div>

            {/* Lower Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Pie Chart: Emissions Breakdown */}
               <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6 h-[300px] flex flex-col"
              >
                <h4 className="text-sm font-medium text-[var(--text-muted)] mb-2">Emissions Breakdown</h4>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                        itemStyle={{ color: 'var(--text-main)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center text-xs text-[var(--text-muted)]">
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
                className="glass-card rounded-2xl p-6 h-[300px] flex flex-col"
              >
                <h4 className="text-sm font-medium text-[var(--text-muted)] mb-2">Score History</h4>
                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="var(--text-muted)" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--text-main)' }}
                        cursor={{ fill: 'var(--border-color)' }}
                      />
                      <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                        {monthlyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : entry.score >= 60 ? '#f59e0b' : '#ef4444'} />
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
              className="glass-card rounded-2xl p-6 h-[300px]"
            >
              <h4 className="text-sm font-medium text-[var(--text-muted)] mb-4">Carbon vs Water Usage Trend</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" stroke="var(--text-muted)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-main)' }}
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
