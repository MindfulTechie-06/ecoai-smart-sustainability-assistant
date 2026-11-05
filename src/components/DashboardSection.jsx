import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Activity, 
  Zap, 
  Droplets, 
  Car, 
  Trash2, 
  Cpu, 
  ArrowDownRight, 
  Building2, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { HISTORICAL_TRENDS } from '../data/mockData';

const DashboardSection = ({ 
  metrics, 
  selectedSite, 
  setSelectedSite, 
  onSimulate, 
  onViewInsights,
  onViewCarbon 
}) => {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Scope donut data
  const scopeData = [
    { name: 'Scope 1 (Direct)', value: metrics.carbon.scope1, color: '#247A55' },
    { name: 'Scope 2 (Electricity)', value: metrics.carbon.scope2, color: '#D97706' },
    { name: 'Scope 3 (Value Chain)', value: metrics.carbon.scope3, color: '#0284C7' }
  ];

  return (
    <section className="py-8 bg-[#FBFBF9] dark:bg-[#0E1713]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Top Control Bar: Title, Facility Switcher & Period Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E6ECE7] dark:border-[#23362C]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#247A55]"></span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#17251E] dark:text-white">
                Sustainability Executive Dashboard
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#66756B] dark:text-[#96A59C] mt-1">
              Consolidated carbon, energy, water, waste and mobility telemetry across facilities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Facility Selector */}
            <div className="flex items-center bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] rounded-xl px-3 py-1.5 shadow-sm text-xs">
              <Building2 className="w-3.5 h-3.5 text-[#247A55] mr-2" />
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="bg-transparent text-[#17251E] dark:text-white font-medium focus:outline-none"
              >
                <option value="all">All Facilities (Consolidated)</option>
                <option value="site-01">Metro Innovation Campus</option>
                <option value="site-02">North Logistics Center</option>
                <option value="site-03">East R&D Facility</option>
              </select>
            </div>

            {/* Date Range Selector */}
            <div className="flex items-center bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] rounded-xl px-3 py-1.5 shadow-sm text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#66756B] mr-2" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-[#17251E] dark:text-white font-medium focus:outline-none"
              >
                <option value="Last 30 Days">Last 30 Days (Rolling)</option>
                <option value="Q1 2026">Q1 2026 (Jan - Mar)</option>
                <option value="Trailing 12M">Trailing 12 Months</option>
                <option value="Year-to-Date">Year-to-Date (YTD)</option>
              </select>
            </div>

            {/* Simulate CTA */}
            <button
              onClick={onSimulate}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Simulate Digital Twin</span>
            </button>
          </div>
        </div>

        {/* Active AI Alert Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  AI Anomaly Alert Detected
                </span>
                <span className="text-[11px] text-[#66756B] dark:text-[#96A59C]">Confidence: 96%</span>
              </div>
              <p className="text-xs text-[#17251E] dark:text-gray-200 mt-0.5 font-medium">
                Weekend HVAC Baseload Leakage in Building B generating 0.21 tCO₂e avoidable draw.
              </p>
            </div>
          </div>
          <button
            onClick={onViewInsights}
            className="text-xs font-semibold text-amber-800 dark:text-amber-300 hover:underline shrink-0 bg-white dark:bg-[#15221C] px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-sm"
          >
            Review AI Diagnosis →
          </button>
        </motion.div>

        {/* 5 Core Indicators KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* 1. Total Carbon */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] hover:border-[#247A55] transition-all">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Carbon Emissions</span>
              <Activity className="w-4 h-4 text-[#247A55]" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {metrics.carbon.totalTonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[#247A55] font-semibold flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5 transform rotate-180 mr-0.5" />
                {Math.abs(metrics.carbon.deltaPercent)}% YoY
              </span>
              <span className="text-[#66756B] text-[11px]">Target: ≤160 t</span>
            </div>
          </div>

          {/* 2. Energy Consumption */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] hover:border-amber-500 transition-all">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Energy Consumption</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {metrics.energy.totalMWh}
              </span>
              <span className="text-xs text-[#66756B]">MWh</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                {metrics.energy.renewableSharePercent}% Clean Solar
              </span>
              <span className="text-[#66756B] text-[11px]">${(metrics.energy.costUSD || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* 3. Water Intake */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] hover:border-blue-500 transition-all">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Water Consumption</span>
              <Droplets className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {metrics.water.totalKiloLiters}
              </span>
              <span className="text-xs text-[#66756B]">kL</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {metrics.water.recycledSharePercent}% Reclaimed
              </span>
              <span className="text-[#66756B] text-[11px]">${(metrics.water.costUSD || 0).toLocaleString()}</span>
            </div>
          </div>

          {/* 4. Waste Generation */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] hover:border-purple-500 transition-all">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Waste Generation</span>
              <Trash2 className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {metrics.waste.totalTonnes}
              </span>
              <span className="text-xs text-[#66756B]">Tonnes</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                {metrics.waste.diversionRatePercent}% Diverted
              </span>
              <span className="text-[#66756B] text-[11px]">Landfill: {Math.round(metrics.waste.totalTonnes - (metrics.waste.divertedTonnes || 0))}t</span>
            </div>
          </div>

          {/* 5. Mobility Emissions */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] hover:border-emerald-500 transition-all">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Mobility Impact</span>
              <Car className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {metrics.mobility.totalTonnesCO2}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {metrics.mobility.evSharePercent}% Clean Fleet
              </span>
              <span className="text-[#66756B] text-[11px]">{Math.abs(metrics.mobility.deltaPercent)}% cut</span>
            </div>
          </div>

        </div>

        {/* Charts Row: Scope Breakdown & Historical / Forecast Trajectory */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Chart: Scope 1, 2, 3 Donut Chart */}
          <div className="stitch-card p-6 bg-white dark:bg-[#15221C] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                  Emissions by Scope
                </h3>
                <button
                  onClick={onViewCarbon}
                  className="text-xs text-[#247A55] dark:text-[#38C48B] hover:underline font-medium"
                >
                  Inspect Scopes →
                </button>
              </div>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C] mb-4">
                GHG Protocol operational boundaries
              </p>
            </div>

            <div className="h-60 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scopeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={88}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {scopeData.map((entry, index) => (
                      <Cell key={`scope-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E6ECE7',
                      fontSize: '12px',
                      color: '#17251E',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                    }}
                    formatter={(val) => [`${val} tCO₂e`, 'Emissions']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold font-heading text-[#17251E] dark:text-white">
                  {metrics.carbon.totalTonnes}
                </span>
                <span className="text-[11px] text-[#66756B] uppercase font-semibold">Total tCO₂e</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E6ECE7] dark:border-[#23362C] text-center">
              <div>
                <div className="text-[11px] text-[#66756B]">Scope 1</div>
                <div className="text-sm font-bold text-[#247A55]">{metrics.carbon.scope1} t</div>
                <div className="text-[10px] text-[#66756B]">Gas & Fleet</div>
              </div>
              <div>
                <div className="text-[11px] text-[#66756B]">Scope 2</div>
                <div className="text-sm font-bold text-amber-600">{metrics.carbon.scope2} t</div>
                <div className="text-[10px] text-[#66756B]">Purchased Grid</div>
              </div>
              <div>
                <div className="text-[11px] text-[#66756B]">Scope 3</div>
                <div className="text-sm font-bold text-blue-600">{metrics.carbon.scope3} t</div>
                <div className="text-[10px] text-[#66756B]">Waste & Water</div>
              </div>
            </div>
          </div>

          {/* Right Chart: Historical vs Forecast Trend */}
          <div className="stitch-card p-6 bg-white dark:bg-[#15221C] lg:col-span-2 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                    Resource Trajectory & 3-Month Forecast
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DDF3E5] text-[#247A55]">
                    AI Predictive Model
                  </span>
                </div>
                <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                  Historical verified telemetry (Nov-Apr) + ML predictive projection (May-Jul)
                </p>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#247A55]"></span>
                  <span className="text-[#66756B]">Carbon (tCO₂e)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[#66756B]">Energy (MWh)</span>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICAL_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECE7" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="#66756B" 
                    tick={{ fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#66756B" 
                    tick={{ fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    domain={[100, 180]}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#66756B" 
                    tick={{ fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    domain={[150, 240]}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E6ECE7',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="carbon" 
                    stroke="#247A55" 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 1.5, fill: '#FFFFFF' }}
                    activeDot={{ r: 6 }} 
                    name="Carbon (tCO₂e)" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="energyMWh" 
                    stroke="#D97706" 
                    strokeWidth={2} 
                    strokeDasharray="4 4"
                    dot={{ r: 3, strokeWidth: 1.5, fill: '#FFFFFF' }}
                    name="Energy (MWh)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C]">
              <span>* Months labelled (P) denote simulated autoregressive AI predictions with ±4.8% error boundary.</span>
              <span className="font-semibold text-[#247A55]">Net 2026 Trajectory: -24.8%</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardSection;
