import { useState, useMemo } from 'react';
import { 
  Cpu, 
  Sun, 
  Zap, 
  Droplet, 
  Trash2, 
  Car, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  RotateCcw,
  Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { runDigitalTwinSimulation } from '../utils/carbonEngine';
import { DIGITAL_TWIN_BASELINE } from '../data/mockData';
import PageHeader from './PageHeader';

const DigitalTwin = () => {
  const [levers, setLevers] = useState({
    solarAdoptionPercent: 35,
    energyEfficiencyPercent: 18,
    waterRecyclingPercent: 25,
    wasteDiversionPercent: 75,
    fleetElectrificationPercent: 40
  });

  const simulation = useMemo(() => {
    return runDigitalTwinSimulation(levers, DIGITAL_TWIN_BASELINE);
  }, [levers]);

  // Comparative chart data
  const comparisonData = [
    {
      metric: 'Carbon (tCO₂e)',
      Baseline: simulation.baseline.totalCarbonTonnes,
      Proposed: simulation.proposed.totalCarbonTonnes
    },
    {
      metric: 'Scope 1 (t)',
      Baseline: simulation.baseline.scope1,
      Proposed: simulation.proposed.scope1
    },
    {
      metric: 'Scope 2 (t)',
      Baseline: simulation.baseline.scope2,
      Proposed: simulation.proposed.scope2
    },
    {
      metric: 'Scope 3 (t)',
      Baseline: simulation.baseline.scope3,
      Proposed: simulation.proposed.scope3
    }
  ];

  // Presets
  const applyPreset = (preset) => {
    if (preset === 'aggressive') {
      setLevers({
        solarAdoptionPercent: 70,
        energyEfficiencyPercent: 30,
        waterRecyclingPercent: 50,
        wasteDiversionPercent: 90,
        fleetElectrificationPercent: 85
      });
    } else if (preset === 'roi') {
      setLevers({
        solarAdoptionPercent: 25,
        energyEfficiencyPercent: 20,
        waterRecyclingPercent: 15,
        wasteDiversionPercent: 65,
        fleetElectrificationPercent: 20
      });
    } else if (preset === 'reset') {
      setLevers({
        solarAdoptionPercent: 0,
        energyEfficiencyPercent: 0,
        waterRecyclingPercent: 0,
        wasteDiversionPercent: 50,
        fleetElectrificationPercent: 0
      });
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Standardized Page Header */}
      <PageHeader
        badge="Predictive Sandbox Simulation"
        title="Sustainability Digital Twin"
        description="Simulate operational decarbonization scenarios and evaluate financial ROI prior to capital deployment."
        actions={
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-[#404944] dark:text-[#8cc2ac]">Presets:</span>
            <button
              type="button"
              onClick={() => applyPreset('roi')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] text-[#101e18] dark:text-white transition-all shadow-xs"
            >
              High ROI
            </button>
            <button
              type="button"
              onClick={() => applyPreset('aggressive')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#e1f2e7] dark:bg-[#162d22] border border-[#dcece1] dark:border-[#1e382c] text-[#006c49] dark:text-[#9af5c6] transition-all"
            >
              Net-Zero 2030
            </button>
            <button
              type="button"
              onClick={() => applyPreset('reset')}
              className="p-2 rounded-xl text-xs font-medium text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white border border-[#dcece1] dark:border-[#1e382c] bg-white dark:bg-[#13241c] transition-colors"
              title="Reset Baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      <div>

        {/* Top Simulation KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#247A55]/30">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Projected Carbon Cut</span>
              <TrendingDown className="w-4 h-4 text-[#247A55]" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#247A55] dark:text-[#38C48B]">
                -{simulation.impact.carbonSavedTonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e / yr</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-[#247A55] dark:text-[#38C48B]">
              -{simulation.impact.carbonReductionPercent}% from baseline footprint
            </div>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Annual Utility Savings</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                ${simulation.impact.annualCostSavingsUSD.toLocaleString()}
              </span>
              <span className="text-xs text-[#66756B]">/ year</span>
            </div>
            <div className="mt-2 text-xs text-[#66756B]">
              -{simulation.impact.costReductionPercent}% operating expense reduction
            </div>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Estimated Capex</span>
              <Cpu className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                ${simulation.impact.totalCapexUSD.toLocaleString()}
              </span>
              <span className="text-xs text-[#66756B]">net</span>
            </div>
            <div className="mt-2 text-xs text-[#66756B]">
              Equipment, installation & grid tie-in
            </div>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Simple Payback</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-amber-600 dark:text-amber-400">
                {simulation.impact.paybackPeriodYears}
              </span>
              <span className="text-xs text-[#66756B]">Years</span>
            </div>
            <div className="mt-2 text-xs text-[#66756B]">
              Accelerated amortization model
            </div>
          </div>

        </div>

        {/* Main Workspace: Scenario Levers on Left, Comparative Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Levers Panel (5 columns) */}
          <div className="stitch-card p-6 bg-white dark:bg-[#15221C] lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                Hypothetical Scenario Controls
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-0.5">
                Adjust operational decarbonization levers to run immediate simulation.
              </p>
            </div>

            <div className="space-y-5">
              
              {/* Lever 1: Solar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#17251E] dark:text-white flex items-center">
                    <Sun className="w-4 h-4 text-amber-500 mr-2" />
                    On-Site Solar PV Share
                  </span>
                  <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B] bg-[#DDF3E5] dark:bg-[#1E3626] px-2 py-0.5 rounded">
                    {levers.solarAdoptionPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  step="5"
                  value={levers.solarAdoptionPercent}
                  onChange={(e) => setLevers({ ...levers, solarAdoptionPercent: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] dark:bg-[#23362C] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
                <div className="flex justify-between text-[10px] text-[#66756B]">
                  <span>0% (Grid only)</span>
                  <span>40% (Rooftop)</span>
                  <span>80% (Solar + Carports)</span>
                </div>
              </div>

              {/* Lever 2: Energy Efficiency */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#17251E] dark:text-white flex items-center">
                    <Zap className="w-4 h-4 text-amber-600 mr-2" />
                    HVAC & Building Efficiency
                  </span>
                  <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B] bg-[#DDF3E5] dark:bg-[#1E3626] px-2 py-0.5 rounded">
                    {levers.energyEfficiencyPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="2"
                  value={levers.energyEfficiencyPercent}
                  onChange={(e) => setLevers({ ...levers, energyEfficiencyPercent: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] dark:bg-[#23362C] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
                <div className="flex justify-between text-[10px] text-[#66756B]">
                  <span>Baseline</span>
                  <span>20% (LED + VFD)</span>
                  <span>40% (Smart Envelope)</span>
                </div>
              </div>

              {/* Lever 3: Water Recycling */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#17251E] dark:text-white flex items-center">
                    <Droplet className="w-4 h-4 text-blue-500 mr-2" />
                    Process Water Recirculation
                  </span>
                  <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B] bg-[#DDF3E5] dark:bg-[#1E3626] px-2 py-0.5 rounded">
                    {levers.waterRecyclingPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="5"
                  value={levers.waterRecyclingPercent}
                  onChange={(e) => setLevers({ ...levers, waterRecyclingPercent: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] dark:bg-[#23362C] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
                <div className="flex justify-between text-[10px] text-[#66756B]">
                  <span>0%</span>
                  <span>30% (Greywater)</span>
                  <span>60% (Full Loop)</span>
                </div>
              </div>

              {/* Lever 4: Waste Diversion */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#17251E] dark:text-white flex items-center">
                    <Trash2 className="w-4 h-4 text-purple-500 mr-2" />
                    Zero-Waste Landfill Diversion
                  </span>
                  <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B] bg-[#DDF3E5] dark:bg-[#1E3626] px-2 py-0.5 rounded">
                    {levers.wasteDiversionPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="95"
                  step="5"
                  value={levers.wasteDiversionPercent}
                  onChange={(e) => setLevers({ ...levers, wasteDiversionPercent: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] dark:bg-[#23362C] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
                <div className="flex justify-between text-[10px] text-[#66756B]">
                  <span>30%</span>
                  <span>65% (Composting)</span>
                  <span>95% (Zero-Waste)</span>
                </div>
              </div>

              {/* Lever 5: Fleet Electrification */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#17251E] dark:text-white flex items-center">
                    <Car className="w-4 h-4 text-emerald-600 mr-2" />
                    Fleet Electrification (EV)
                  </span>
                  <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B] bg-[#DDF3E5] dark:bg-[#1E3626] px-2 py-0.5 rounded">
                    {levers.fleetElectrificationPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={levers.fleetElectrificationPercent}
                  onChange={(e) => setLevers({ ...levers, fleetElectrificationPercent: parseInt(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] dark:bg-[#23362C] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
                <div className="flex justify-between text-[10px] text-[#66756B]">
                  <span>0% Diesel</span>
                  <span>50% Hybrid/EV</span>
                  <span>100% All-Electric</span>
                </div>
              </div>

            </div>
          </div>

          {/* Comparative Simulation Results (7 columns) */}
          <div className="stitch-card p-6 bg-white dark:bg-[#15221C] lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                  Baseline vs Proposed Decarbonization Scenario
                </h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#DDF3E5] text-[#247A55]">
                  Deterministic Math Model
                </span>
              </div>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Calculated emission changes across Scope 1, 2, and 3 based on current input parameters.
              </p>
            </div>

            {/* Recharts Bar Comparison */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E6ECE7" vertical={false} />
                  <XAxis dataKey="metric" stroke="#66756B" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#66756B" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E6ECE7',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                    }}
                    formatter={(val) => [`${val} tCO₂e`]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <Bar dataKey="Proposed" fill="#247A55" radius={[4, 4, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Assumptions & Limitations Explicit Banner */}
            <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#17251E] dark:text-white">
                <Info className="w-4 h-4 text-[#247A55]" />
                <span>Simulation Limitations & Provenance Disclaimer</span>
              </div>
              <ul className="text-[11px] text-[#66756B] dark:text-[#96A59C] space-y-1 list-disc list-inside">
                <li>Simulated outcomes are mathematical projections and are <strong>not certified historical reductions</strong>.</li>
                <li>Solar offset assumes 1,400 kWh/kWp regional irradiance and marginal daytime grid displacement.</li>
                <li>Financial payback assumes static commercial tariffs without demand-charge escalation.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DigitalTwin;
