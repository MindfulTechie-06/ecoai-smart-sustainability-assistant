import { useState, useMemo, useEffect } from 'react';
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
  Save,
  Download,
  Copy,
  Trash,
  CheckCircle2,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { runDigitalTwinSimulation, getFacilityBaseline, exportToCSV } from '../utils/carbonEngine';
import PageHeader from './PageHeader';
import FacilityEnergyFlow from './FacilityEnergyFlow';
import { useTheme } from '../context/ThemeContext';

export default function DigitalTwin({
  selectedSite = 'all',
  setSelectedSite
}) {
  const { chartTheme, isDark } = useTheme();
  // Facility Baseline
  const facilityBaseline = useMemo(() => {
    return getFacilityBaseline(selectedSite);
  }, [selectedSite]);

  // Facilities List
  const facilities = [
    { id: 'all', name: 'Meridian Global (Consolidated)', code: 'HQ-GLOBAL' },
    { id: 'site-01', name: 'Metro Innovation Campus', code: 'FAC-01' },
    { id: 'site-02', name: 'North Logistics Center', code: 'FAC-02' },
    { id: 'site-03', name: 'East R&D Facility', code: 'FAC-03' }
  ];

  // Reporting Horizons
  const [targetHorizon, setTargetHorizon] = useState('2030');

  // Baseline Default Lever Settings
  const BASELINE_LEVERS = {
    solarAdoptionPercent: 0,
    energyEfficiencyPercent: 0,
    waterRecyclingPercent: 0,
    wasteDiversionPercent: 30,
    fleetElectrificationPercent: 0,
    cleanPowerProcurementPercent: 0
  };

  // Active Lever Settings (default to recommended balanced scenario)
  const [levers, setLevers] = useState({
    solarAdoptionPercent: 35,
    energyEfficiencyPercent: 18,
    waterRecyclingPercent: 25,
    wasteDiversionPercent: 75,
    fleetElectrificationPercent: 40,
    cleanPowerProcurementPercent: 30
  });

  // Track if current levers match a saved scenario or has unsaved edits
  const [activeScenarioId, setActiveScenarioId] = useState('preset-balanced');
  const [isCustomModified, setIsCustomModified] = useState(false);

  // Saved Scenarios in localStorage with enterprise defaults
  const [savedScenarios, setSavedScenarios] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('echo_saved_scenarios');
      if (stored) {
        try { return JSON.parse(stored); } catch { /* ignore */ }
      }
    }
    return [
      {
        id: 'scenario-01',
        name: 'High ROI Decarbonization (Phase 1)',
        site: 'all',
        description: 'Accelerated payback through building efficiency, zero-waste diversion, and rooftop solar.',
        createdAt: '2026-03-15',
        levers: {
          solarAdoptionPercent: 30,
          energyEfficiencyPercent: 22,
          waterRecyclingPercent: 20,
          wasteDiversionPercent: 80,
          fleetElectrificationPercent: 25,
          cleanPowerProcurementPercent: 40
        }
      },
      {
        id: 'scenario-02',
        name: 'Aggressive Net-Zero 2030 Horizon',
        site: 'all',
        description: 'Comprehensive transformation with 70% on-site solar, full fleet electrification, and 100% PPA.',
        createdAt: '2026-04-02',
        levers: {
          solarAdoptionPercent: 70,
          energyEfficiencyPercent: 32,
          waterRecyclingPercent: 50,
          wasteDiversionPercent: 92,
          fleetElectrificationPercent: 85,
          cleanPowerProcurementPercent: 100
        }
      }
    ];
  });

  // Modals & UI States
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState('');
  const [newScenarioDesc, setNewScenarioDesc] = useState('');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist saved scenarios
  useEffect(() => {
    localStorage.setItem('echo_saved_scenarios', JSON.stringify(savedScenarios));
  }, [savedScenarios]);

  // Execute first-principles physics and economic simulation
  const simulation = useMemo(() => {
    return runDigitalTwinSimulation(levers, facilityBaseline);
  }, [levers, facilityBaseline]);

  // Comparative chart data (Baseline vs Proposed)
  const comparisonData = [
    {
      metric: 'Gross Carbon (t)',
      Baseline: simulation.baseline.totalCarbonTonnes,
      Proposed: simulation.proposed.totalCarbonTonnes,
      Unit: 'tCO₂e'
    },
    {
      metric: 'Scope 1 (Direct)',
      Baseline: simulation.baseline.scope1,
      Proposed: simulation.proposed.scope1,
      Unit: 'tCO₂e'
    },
    {
      metric: 'Scope 2 (Power)',
      Baseline: simulation.baseline.scope2,
      Proposed: simulation.proposed.scope2,
      Unit: 'tCO₂e'
    },
    {
      metric: 'Scope 3 (Supply)',
      Baseline: simulation.baseline.scope3,
      Proposed: simulation.proposed.scope3,
      Unit: 'tCO₂e'
    }
  ];

  // Handlers for Levers
  const handleLeverChange = (key, val) => {
    setLevers(prev => ({ ...prev, [key]: val }));
    setIsCustomModified(true);
  };

  // Presets
  const applyPreset = (presetKey) => {
    if (presetKey === 'roi') {
      setLevers({
        solarAdoptionPercent: 25,
        energyEfficiencyPercent: 20,
        waterRecyclingPercent: 15,
        wasteDiversionPercent: 70,
        fleetElectrificationPercent: 20,
        cleanPowerProcurementPercent: 30
      });
      setActiveScenarioId('preset-roi');
    } else if (presetKey === 'aggressive') {
      setLevers({
        solarAdoptionPercent: 70,
        energyEfficiencyPercent: 30,
        waterRecyclingPercent: 50,
        wasteDiversionPercent: 90,
        fleetElectrificationPercent: 85,
        cleanPowerProcurementPercent: 100
      });
      setActiveScenarioId('preset-aggressive');
    } else if (presetKey === 'quickwins') {
      setLevers({
        solarAdoptionPercent: 10,
        energyEfficiencyPercent: 25,
        waterRecyclingPercent: 10,
        wasteDiversionPercent: 80,
        fleetElectrificationPercent: 15,
        cleanPowerProcurementPercent: 50
      });
      setActiveScenarioId('preset-quickwins');
    } else if (presetKey === 'reset') {
      setLevers(BASELINE_LEVERS);
      setActiveScenarioId('baseline');
    }
    setIsCustomModified(false);
  };

  // Load Saved Scenario
  const handleLoadScenario = (scenario) => {
    setLevers(scenario.levers);
    setActiveScenarioId(scenario.id);
    setIsCustomModified(false);
    showToast(`Loaded scenario: "${scenario.name}"`);
  };

  // Save Current Scenario
  const handleSaveScenarioSubmit = (e) => {
    e.preventDefault();
    if (!newScenarioName.trim()) return;

    const newScenario = {
      id: `scenario-${Date.now().toString().slice(-4)}`,
      name: newScenarioName.trim(),
      site: selectedSite,
      description: newScenarioDesc.trim() || 'Custom simulated operational scenario.',
      createdAt: new Date().toISOString().split('T')[0],
      levers: { ...levers }
    };

    setSavedScenarios(prev => [newScenario, ...prev]);
    setActiveScenarioId(newScenario.id);
    setIsCustomModified(false);
    setIsSaveModalOpen(false);
    setNewScenarioName('');
    setNewScenarioDesc('');
    showToast(`Scenario "${newScenario.name}" successfully saved!`);
  };

  // Duplicate Scenario
  const handleDuplicateScenario = (scenarioId) => {
    const target = savedScenarios.find(s => s.id === scenarioId);
    if (!target) return;
    const duplicated = {
      ...target,
      id: `scenario-${Date.now().toString().slice(-4)}`,
      name: `${target.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedScenarios(prev => [duplicated, ...prev]);
    showToast(`Duplicated scenario as "${duplicated.name}"`);
  };

  // Delete Scenario
  const handleDeleteScenario = (scenarioId) => {
    const target = savedScenarios.find(s => s.id === scenarioId);
    if (!target) return;
    if (window.confirm(`Are you sure you want to delete scenario "${target.name}"?`)) {
      setSavedScenarios(prev => prev.filter(s => s.id !== scenarioId));
      if (activeScenarioId === scenarioId) {
        setActiveScenarioId('preset-balanced');
      }
      showToast(`Deleted scenario "${target.name}".`);
    }
  };

  // Export Scenario Report to CSV
  const handleExportScenario = () => {
    const exportData = [
      {
        Section: "Scenario Metadata",
        Facility: facilityBaseline.facilityName,
        TargetHorizon: targetHorizon,
        Timestamp: new Date().toISOString(),
        Status: isCustomModified ? "Unsaved Simulation" : "Saved / Active Preset"
      },
      {
        Section: "Simulated Performance",
        BaselineGrossTonnes: simulation.baseline.totalCarbonTonnes,
        ProposedGrossTonnes: simulation.proposed.totalCarbonTonnes,
        NetCarbonSavedTonnes: simulation.impact.carbonSavedTonnes,
        ReductionPercent: `${simulation.impact.carbonReductionPercent}%`,
        EstimatedCapexUSD: simulation.impact.totalCapexUSD,
        AnnualGrossSavingsUSD: simulation.impact.annualCostSavingsUSD,
        AnnualMaintenanceUSD: simulation.impact.annualMaintenanceUSD,
        NetAnnualSavingsUSD: simulation.impact.netAnnualSavingsUSD,
        SimplePaybackYears: simulation.impact.paybackPeriodYears,
        TenYearNetSavingsUSD: simulation.impact.tenYearNetSavingsUSD
      },
      ...simulation.interventions.map(i => ({
        Section: "Intervention Breakdown",
        Intervention: i.name,
        Category: i.category,
        CurrentSetting: i.currentSetting,
        CarbonCutTonnes: i.carbonCutTonnes,
        ResourceImpact: i.resourceSaved,
        CapexUSD: i.capexUSD,
        AnnualSavingsUSD: i.annualSavingsUSD,
        Feasibility: i.feasibility,
        Confidence: i.confidence
      }))
    ];
    exportToCSV(`EchoAI_DigitalTwin_Scenario_${selectedSite}_${new Date().toISOString().split('T')[0]}`, exportData);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans text-[#101e18] dark:text-[#edfdf2] transition-colors">
      
      {/* 1. STANDARDIZED PAGE HEADER WITH INTEGRATED CONTROLS */}
      <PageHeader
        badge="Predictive Decarbonization Sandbox"
        title="Sustainability Digital Twin"
        description="Simulate operational decarbonization scenarios and evaluate environmental impact, resource savings and financial ROI before deploying changes."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Facility Selector */}
            {setSelectedSite && (
              <div className="relative">
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#13241c] pl-8 pr-7 py-1.5 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus:outline-none cursor-pointer"
                >
                  {facilities.map(fac => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
                <Building className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6] absolute left-2.5 top-2.5 pointer-events-none" />
                <span className="material-symbols-outlined text-[#404944] dark:text-[#8cc2ac] text-xs absolute right-2 top-2.5 pointer-events-none">
                  expand_more
                </span>
              </div>
            )}

            {/* Target Horizon Selector */}
            <div className="relative">
              <select
                value={targetHorizon}
                onChange={(e) => setTargetHorizon(e.target.value)}
                className="appearance-none bg-white dark:bg-[#13241c] pl-8 pr-7 py-1.5 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus:outline-none cursor-pointer"
              >
                <option value="2027">2027 Near-Term (3-Yr)</option>
                <option value="2030">2030 Paris Target (SBTi)</option>
                <option value="2035">2035 Deep Decarb</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6] absolute left-2.5 top-2.5 pointer-events-none" />
              <span className="material-symbols-outlined text-[#404944] dark:text-[#8cc2ac] text-xs absolute right-2 top-2.5 pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Save Scenario Button */}
            <button
              type="button"
              onClick={() => setIsSaveModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-xs transition-colors"
              title="Save current simulation scenario"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Scenario</span>
            </button>

            {/* Compare Scenarios Button */}
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-xs transition-colors"
              title="Compare saved scenarios side-by-side"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare ({savedScenarios.length})</span>
            </button>

            {/* Reset Simulation Button */}
            <button
              type="button"
              onClick={() => applyPreset('reset')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-400 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] hover:bg-rose-50 dark:hover:bg-rose-950/30 shadow-xs transition-colors"
              title="Reset all levers to historical baseline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Export Scenario Report */}
            <button
              type="button"
              onClick={handleExportScenario}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-colors"
              title="Export complete simulation audit ledger"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Scenario</span>
            </button>

          </div>
        }
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-[#132d20] border border-emerald-200 dark:border-[#276648] text-emerald-800 dark:text-[#9af5c6] text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#9af5c6] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Scenario Presets & Unsaved Edit Tracker Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#e1f2e7]/60 dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c]">
        <div className="flex items-center space-x-2 text-xs">
          <span className="font-semibold text-[#00392b] dark:text-white flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
            Simulation Presets:
          </span>
          <button
            type="button"
            onClick={() => applyPreset('roi')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeScenarioId === 'preset-roi' && !isCustomModified
                ? 'bg-[#00392b] text-white shadow-xs'
                : 'bg-white dark:bg-[#1a382b] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
            }`}
          >
            High ROI Fast-Payback
          </button>
          <button
            type="button"
            onClick={() => applyPreset('aggressive')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeScenarioId === 'preset-aggressive' && !isCustomModified
                ? 'bg-[#00392b] text-white shadow-xs'
                : 'bg-white dark:bg-[#1a382b] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
            }`}
          >
            Aggressive Net-Zero 2030
          </button>
          <button
            type="button"
            onClick={() => applyPreset('quickwins')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              activeScenarioId === 'preset-quickwins' && !isCustomModified
                ? 'bg-[#00392b] text-white shadow-xs'
                : 'bg-white dark:bg-[#1a382b] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
            }`}
          >
            Low-CapEx Quick Wins
          </button>
        </div>

        {/* State Badge */}
        <div className="flex items-center space-x-2 text-[11px]">
          {isCustomModified ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unsaved Simulation Tweaks
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-[#9af5c6] border border-emerald-200 dark:border-[#276648] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Aligned with Scenario Preset
            </span>
          )}
        </div>
      </div>

      {/* 2. SCENARIO PERFORMANCE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* KPI 1: Projected Carbon Reduction */}
        <div className="stitch-card p-5 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-bold uppercase tracking-wider text-[10px]">Projected Carbon Cut</span>
            <TrendingDown className="w-4 h-4 text-[#006c49] dark:text-[#9af5c6]" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold font-heading text-[#00392b] dark:text-[#9af5c6]">
              -{simulation.impact.carbonSavedTonnes}
            </span>
            <span className="text-xs text-[#707974] dark:text-[#8cc2ac] font-medium">tCO₂e / yr</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="text-emerald-700 dark:text-[#9af5c6] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded-full text-[11px]">
              -{simulation.impact.carbonReductionPercent}% vs Baseline
            </span>
            <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">
              Target: -45%
            </span>
          </div>
        </div>

        {/* KPI 2: Annual Utility Savings */}
        <div className="stitch-card p-5 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-bold uppercase tracking-wider text-[10px]">Annual Utility Savings</span>
            <DollarSign className="w-4 h-4 text-emerald-600 dark:text-[#9af5c6]" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold font-heading text-[#101e18] dark:text-white">
              ${simulation.impact.annualCostSavingsUSD.toLocaleString()}
            </span>
            <span className="text-xs text-[#707974] dark:text-[#8cc2ac] font-medium">/ year</span>
          </div>
          <div className="mt-2.5 text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between">
            <span>Power: ${Math.round(simulation.impact.utilityBreakdown.energySavingsUSD / 1000)}k</span>
            <span>•</span>
            <span>Water: ${Math.round(simulation.impact.utilityBreakdown.waterSavingsUSD / 1000)}k</span>
            <span>•</span>
            <span>Fleet: ${Math.round(simulation.impact.utilityBreakdown.fleetSavingsUSD / 1000)}k</span>
          </div>
        </div>

        {/* KPI 3: Estimated Capital Expenditure */}
        <div className="stitch-card p-5 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-bold uppercase tracking-wider text-[10px]">Estimated Capital Expenditure</span>
            <Cpu className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold font-heading text-[#101e18] dark:text-white">
              ${simulation.impact.totalCapexUSD.toLocaleString()}
            </span>
            <span className="text-xs text-[#707974] dark:text-[#8cc2ac] font-medium">Total CapEx</span>
          </div>
          <div className="mt-2.5 text-[11px] text-[#404944] dark:text-[#8cc2ac] truncate">
            Maint: ~${simulation.impact.annualMaintenanceUSD.toLocaleString()}/yr (2.2% Lifecycle)
          </div>
        </div>

        {/* KPI 4: Simple Payback Period */}
        <div className="stitch-card p-5 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-bold uppercase tracking-wider text-[10px]">Simple Payback Period</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold font-heading text-amber-600 dark:text-amber-400">
              {simulation.impact.paybackPeriodYears}
            </span>
            <span className="text-xs text-[#707974] dark:text-[#8cc2ac] font-medium">Years</span>
          </div>
          <div className="mt-2.5 text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between">
            <span>Net 10-Yr ROI:</span>
            <span className="font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
              +${simulation.impact.tenYearNetSavingsUSD.toLocaleString()}
            </span>
          </div>
        </div>

      </div>

      {/* 8. DIGITAL TWIN OPERATIONAL FLOW VISUALIZATION */}
      <FacilityEnergyFlow 
        levers={levers} 
        simulation={simulation} 
        facilityName={facilityBaseline.facilityName}
      />

      {/* 3 & 4. HYPOTHETICAL SCENARIO CONTROLS (LEFT) + COMPARATIVE RECHARTS BAR CHART (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scenario Controls Panel (5 cols) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] lg:col-span-5 space-y-5">
          <div className="pb-3 border-b border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                Hypothetical Scenario Controls
              </h3>
              <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                Adjust 6 decarbonization levers. Numerical outcomes update deterministically.
              </p>
            </div>
            <button
              type="button"
              onClick={() => applyPreset('reset')}
              className="p-1.5 rounded-lg text-xs text-[#707974] hover:text-[#00392b] dark:hover:text-white transition-colors"
              title="Reset sliders to baseline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Lever 1: On-site Solar PV Share */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-500" />
                  On-Site Solar PV Share
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.solarAdoptionPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                Rooftop and carport solar arrays displacing daytime marginal grid power.
              </p>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={levers.solarAdoptionPercent}
                onChange={(e) => handleLeverChange('solarAdoptionPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>0% (Grid only)</span>
                <span>40% (Rooftop capacity)</span>
                <span>80% (Solar + Carports)</span>
              </div>
            </div>

            {/* Lever 2: HVAC & Building Efficiency */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  HVAC & Building Efficiency
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.energyEfficiencyPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                Variable frequency drives (VFD), smart thermostats, and LED envelope retrofits.
              </p>
              <input
                type="range"
                min="0"
                max="40"
                step="2"
                value={levers.energyEfficiencyPercent}
                onChange={(e) => handleLeverChange('energyEfficiencyPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>0% (Baseline)</span>
                <span>20% (Controls + VFD)</span>
                <span>40% (Passive Envelope)</span>
              </div>
            </div>

            {/* Lever 3: Process Water Recirculation */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-sky-500" />
                  Process Water Recirculation
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.waterRecyclingPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                Greywater recycling, closed-loop cooling towers, and low-flow smart valves.
              </p>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={levers.waterRecyclingPercent}
                onChange={(e) => handleLeverChange('waterRecyclingPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>0% (Municipal only)</span>
                <span>30% (Greywater loop)</span>
                <span>60% (Full Circularity)</span>
              </div>
            </div>

            {/* Lever 4: Zero-Waste Landfill Diversion */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <Trash2 className="w-4 h-4 text-purple-500" />
                  Zero-Waste Landfill Diversion
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.wasteDiversionPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                On-site organics composting, packaging reduction, and certified material recycling.
              </p>
              <input
                type="range"
                min="30"
                max="95"
                step="5"
                value={levers.wasteDiversionPercent}
                onChange={(e) => handleLeverChange('wasteDiversionPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>30% (Current Landfill)</span>
                <span>65% (Mandatory Sort)</span>
                <span>95% (TRUE Zero-Waste)</span>
              </div>
            </div>

            {/* Lever 5: Fleet Electrification */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-500" />
                  Commercial Fleet Electrification
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.fleetElectrificationPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                Transition diesel delivery and logistics vehicles to battery electric with depot charging.
              </p>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={levers.fleetElectrificationPercent}
                onChange={(e) => handleLeverChange('fleetElectrificationPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>0% (Internal Comb.)</span>
                <span>50% (Urban Routes EV)</span>
                <span>100% (All-Electric Depot)</span>
              </div>
            </div>

            {/* Lever 6: Renewable Energy Procurement (PPA) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#101e18] dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  Clean Power Procurement (PPA)
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded text-xs border border-[#dcece1] dark:border-[#1e382c]">
                  {levers.cleanPowerProcurementPercent}%
                </span>
              </div>
              <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                Off-site Virtual Power Purchase Agreements (VPPA) covering residual grid draw.
              </p>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={levers.cleanPowerProcurementPercent}
                onChange={(e) => handleLeverChange('cleanPowerProcurementPercent', parseInt(e.target.value))}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
              <div className="flex justify-between text-[10px] text-[#707974] dark:text-[#8cc2ac]">
                <span>0% (Standard Grid)</span>
                <span>50% (Regional Wind PPA)</span>
                <span>100% (RE100 Certified)</span>
              </div>
            </div>

          </div>
        </div>

        {/* Comparative Chart Panel (7 cols) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Baseline vs Proposed Scenario Emissions
                </h3>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                  Deterministic physics simulation comparing certified baseline with active scenario.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] shrink-0">
                100% Deterministic Engine
              </span>
            </div>

            {/* Recharts Comparative Grouped Bar */}
            <div className="h-72 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 15, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} opacity={0.7} />
                  <XAxis 
                    dataKey="metric" 
                    stroke={chartTheme.axis} 
                    tick={{ fill: chartTheme.axis, fontSize: 11, fontWeight: 500 }} 
                    axisLine={{ stroke: chartTheme.grid }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke={chartTheme.axis} 
                    tick={{ fill: chartTheme.axis, fontSize: 11 }} 
                    axisLine={{ stroke: chartTheme.grid }} 
                    tickLine={false}
                    tickFormatter={(val) => `${val}t`}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: chartTheme.tooltipBg,
                      borderRadius: '12px',
                      border: `1px solid ${chartTheme.tooltipBorder}`,
                      color: chartTheme.tooltipText,
                      fontSize: '12px',
                      boxShadow: chartTheme.tooltipShadow
                    }}
                    itemStyle={{ color: chartTheme.tooltipText }}
                    labelStyle={{ color: chartTheme.tooltipText, fontWeight: 600 }}
                    formatter={(val) => [`${val} tCO₂e`, 'Emissions']}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px', color: chartTheme.text }} />
                  <Bar dataKey="Baseline" fill={chartTheme.baseline} radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Proposed" fill={chartTheme.proposed} radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Delta Comparison Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#dcece1] dark:border-[#1e382c]">
            <div className="text-center p-2 rounded-lg bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac] block uppercase font-bold">Scope 1 Cut</span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                -{Number((simulation.baseline.scope1 - simulation.proposed.scope1).toFixed(1))} t
              </span>
            </div>
            <div className="text-center p-2 rounded-lg bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac] block uppercase font-bold">Scope 2 Cut</span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                -{Number((simulation.baseline.scope2 - simulation.proposed.scope2).toFixed(1))} t
              </span>
            </div>
            <div className="text-center p-2 rounded-lg bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac] block uppercase font-bold">Scope 3 Cut</span>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                -{Number((simulation.baseline.scope3 - simulation.proposed.scope3).toFixed(1))} t
              </span>
            </div>
            <div className="text-center p-2 rounded-lg bg-[#e1f2e7] dark:bg-[#162d22] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] text-[#006c49] dark:text-[#9af5c6] block uppercase font-bold">Gross Cut</span>
              <span className="text-xs font-mono font-extrabold text-[#00392b] dark:text-white">
                -{simulation.impact.carbonSavedTonnes} t
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 5. SCENARIO IMPACT BREAKDOWN TABLE */}
      <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
              Granular Scenario Intervention Impact Matrix
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
              Specific emissions cut, resource savings, estimated CapEx, and payback by intervention vector.
            </p>
          </div>
          <span className="text-xs text-[#707974] dark:text-[#8cc2ac]">
            6 Operational Levers Evaluated
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fdf9] dark:bg-[#0e1713] text-[#404944] dark:text-[#8cc2ac] uppercase text-[10px] font-bold tracking-wider border-b border-[#dcece1] dark:border-[#1e382c]">
              <tr>
                <th className="px-4 py-3">Intervention Vector</th>
                <th className="px-4 py-3">Current Setting</th>
                <th className="px-4 py-3">Emissions Reduction</th>
                <th className="px-4 py-3">Resource Conserved</th>
                <th className="px-4 py-3">Estimated CapEx</th>
                <th className="px-4 py-3">Annual OpEx Savings</th>
                <th className="px-4 py-3">Feasibility</th>
                <th className="px-4 py-3">Model Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c] text-[#101e18] dark:text-[#edfdf2]">
              {simulation.interventions.map((item) => (
                <tr key={item.id} className="hover:bg-[#f8fdf9] dark:hover:bg-[#15221c] transition-colors">
                  <td className="px-4 py-3.5 font-semibold flex items-center space-x-2">
                    <span className="material-symbols-outlined text-base" style={{ color: item.color }}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                    {item.currentSetting}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                    -{item.carbonCutTonnes} tCO₂e/yr
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#404944] dark:text-[#8cc2ac]">
                    {item.resourceSaved}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-semibold">
                    ${item.capexUSD.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                    +${item.annualSavingsUSD.toLocaleString()}/yr
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c]">
                      {item.feasibility}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                    {item.confidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. FINANCIAL AND ENVIRONMENTAL ROI ECONOMICS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Economics Breakdown (7 cols) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] lg:col-span-7 space-y-4">
          <div className="pb-3 border-b border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                Scenario Financial & Environmental ROI Ledger
              </h3>
              <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                Deterministic 10-year cumulative economics accounting for maintenance and amortized investments.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
              Payback: {simulation.impact.paybackPeriodYears} Yrs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Gross CapEx</span>
              <span className="text-lg font-mono font-extrabold text-[#101e18] dark:text-white mt-1 block">
                ${simulation.impact.totalCapexUSD.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Equipment & EPC</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Annual Maintenance</span>
              <span className="text-lg font-mono font-extrabold text-[#101e18] dark:text-white mt-1 block">
                ${simulation.impact.annualMaintenanceUSD.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">2.2% Asset Lifecycle</span>
            </div>

            <div className="p-3 rounded-xl bg-[#e1f2e7] dark:bg-[#162d22] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#006c49] dark:text-[#9af5c6] block">Net Annual Savings</span>
              <span className="text-lg font-mono font-extrabold text-[#00392b] dark:text-[#9af5c6] mt-1 block">
                +${simulation.impact.netAnnualSavingsUSD.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#006c49] dark:text-[#9af5c6]">OpEx delta minus upkeep</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">10-Yr Net Value</span>
              <span className="text-lg font-mono font-extrabold text-emerald-700 dark:text-[#9af5c6] mt-1 block">
                +${simulation.impact.tenYearNetSavingsUSD.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Net of initial CapEx</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">10-Yr Carbon Cut</span>
              <span className="text-lg font-mono font-extrabold text-emerald-700 dark:text-[#9af5c6] mt-1 block">
                -{simulation.impact.tenYearCarbonCutTonnes} t
              </span>
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Cumulative avoidance</span>
            </div>

            <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Carbon Shadow Price</span>
              <span className="text-lg font-mono font-extrabold text-[#101e18] dark:text-white mt-1 block">
                $65.00
              </span>
              <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">per tCO₂e internal</span>
            </div>
          </div>
        </div>

        {/* Assumptions & Mathematical Integrity Panel (5 cols) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] lg:col-span-5 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#006c49] dark:text-[#9af5c6]">
            <Info className="w-4 h-4 text-[#006c49] dark:text-[#9af5c6]" />
            <span>Calculation Rules & Model Integrity</span>
          </div>
          <p className="text-xs text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
            All simulation values are calculated using certified physical formulas and commercial utility schedules. The platform prohibits generative hallucinations in quantitative balances.
          </p>
          <ul className="text-[11px] text-[#404944] dark:text-[#8cc2ac] space-y-1.5 list-disc list-inside pt-1">
            {simulation.assumptions.map((assump, idx) => (
              <li key={idx} className="leading-snug">
                {assump}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 7. SCENARIO MANAGEMENT DRAWER / SAVED SCENARIOS LIST */}
      <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
              Saved Enterprise Decarbonization Scenarios
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
              Compare alternatives, duplicate pipelines, and export audit dossiers for executive and stakeholder review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSaveModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-colors shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Current Scenario</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedScenarios.map(sc => {
            const scSim = runDigitalTwinSimulation(sc.levers, facilityBaseline);
            const isActive = activeScenarioId === sc.id && !isCustomModified;
            return (
              <div 
                key={sc.id} 
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  isActive 
                    ? 'bg-[#e1f2e7]/70 dark:bg-[#162d22] border-[#006c49] dark:border-[#9af5c6] ring-1 ring-[#006c49]'
                    : 'bg-[#f8fdf9] dark:bg-[#0e1713] border-[#dcece1] dark:border-[#1e382c] hover:border-[#006c49]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac]">
                      {sc.createdAt}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold uppercase text-[#006c49] dark:text-[#9af5c6] bg-white dark:bg-[#13241c] px-2 py-0.5 rounded-full border border-[#dcece1] dark:border-[#1e382c]">
                        Active Simulation
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#00392b] dark:text-white leading-snug">
                    {sc.name}
                  </h4>
                  <p className="text-[11px] text-[#404944] dark:text-[#8cc2ac] mt-1 line-clamp-2">
                    {sc.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#dcece1] dark:border-[#1e382c] grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac] block">Carbon Cut</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                      -{scSim.impact.carbonSavedTonnes} t ({scSim.impact.carbonReductionPercent}%)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac] block">Net Payback</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {scSim.impact.paybackPeriodYears} Yrs
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleLoadScenario(sc)}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-[#006c49] dark:text-[#9af5c6] hover:underline"
                  >
                    <span>Load Simulation</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => handleDuplicateScenario(sc.id)}
                      className="p-1 rounded text-[#707974] hover:text-[#00392b] dark:hover:text-white transition-colors"
                      title="Duplicate scenario"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteScenario(sc.id)}
                      className="p-1 rounded text-[#707974] hover:text-rose-600 transition-colors"
                      title="Delete scenario"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL: Save Scenario */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div className="flex items-center space-x-2">
                <Save className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Save Decarbonization Scenario
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="text-[#707974] hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveScenarioSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block text-[#101e18] dark:text-white mb-1">
                  Scenario Name *
                </label>
                <input
                  type="text"
                  required
                  value={newScenarioName}
                  onChange={(e) => setNewScenarioName(e.target.value)}
                  placeholder="e.g. Campus Solar & EV Fleet 2027"
                  className="w-full px-3 py-2 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#006c49]"
                />
              </div>

              <div>
                <label className="font-semibold block text-[#101e18] dark:text-white mb-1">
                  Description & Context
                </label>
                <textarea
                  rows="2"
                  value={newScenarioDesc}
                  onChange={(e) => setNewScenarioDesc(e.target.value)}
                  placeholder="e.g. Targets Scope 1 & 2 reductions for executive committee review."
                  className="w-full px-3 py-2 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#006c49]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#e1f2e7] dark:bg-[#162d22] text-[11px] text-[#00392b] dark:text-[#9af5c6] space-y-1">
                <span className="font-bold block">Simulation Snapshot to be Saved:</span>
                <div>Carbon Reduction: <strong>-{simulation.impact.carbonSavedTonnes} tCO₂e/yr (-{simulation.impact.carbonReductionPercent}%)</strong></div>
                <div>Estimated CapEx: <strong>${simulation.impact.totalCapexUSD.toLocaleString()}</strong></div>
                <div>Simple Payback: <strong>{simulation.impact.paybackPeriodYears} Years</strong></div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsSaveModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] text-[#404944] dark:text-[#8cc2ac] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#006c49] hover:bg-[#1a5140] text-white font-semibold shadow-xs"
                >
                  Confirm & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Compare Scenarios Side-by-Side */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] rounded-2xl p-6 max-w-4xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Multi-Scenario Decarbonization Comparison
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="text-[#707974] hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fdf9] dark:bg-[#0e1713] uppercase text-[10px] tracking-wider text-[#707974] dark:text-[#8cc2ac] border-b border-[#dcece1] dark:border-[#1e382c]">
                  <tr>
                    <th className="px-4 py-3">Metric</th>
                    <th className="px-4 py-3 bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] font-bold">
                      Active Simulation
                    </th>
                    {savedScenarios.map(s => (
                      <th key={s.id} className="px-4 py-3">{s.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c] text-[#101e18] dark:text-[#edfdf2]">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#707974]">Carbon Avoided</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700 dark:text-[#9af5c6] bg-[#e1f2e7]/40 dark:bg-[#162d22]/40">
                      -{simulation.impact.carbonSavedTonnes} t ({simulation.impact.carbonReductionPercent}%)
                    </td>
                    {savedScenarios.map(s => {
                      const sim = runDigitalTwinSimulation(s.levers, facilityBaseline);
                      return (
                        <td key={s.id} className="px-4 py-3 font-mono font-semibold">
                          -{sim.impact.carbonSavedTonnes} t ({sim.impact.carbonReductionPercent}%)
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#707974]">Estimated CapEx</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#101e18] dark:text-white bg-[#e1f2e7]/40 dark:bg-[#162d22]/40">
                      ${simulation.impact.totalCapexUSD.toLocaleString()}
                    </td>
                    {savedScenarios.map(s => {
                      const sim = runDigitalTwinSimulation(s.levers, facilityBaseline);
                      return (
                        <td key={s.id} className="px-4 py-3 font-mono">
                          ${sim.impact.totalCapexUSD.toLocaleString()}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#707974]">Net Annual Savings</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700 dark:text-[#9af5c6] bg-[#e1f2e7]/40 dark:bg-[#162d22]/40">
                      +${simulation.impact.netAnnualSavingsUSD.toLocaleString()}
                    </td>
                    {savedScenarios.map(s => {
                      const sim = runDigitalTwinSimulation(s.levers, facilityBaseline);
                      return (
                        <td key={s.id} className="px-4 py-3 font-mono">
                          +${sim.impact.netAnnualSavingsUSD.toLocaleString()}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#707974]">Simple Payback</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-600 dark:text-amber-400 bg-[#e1f2e7]/40 dark:bg-[#162d22]/40">
                      {simulation.impact.paybackPeriodYears} Years
                    </td>
                    {savedScenarios.map(s => {
                      const sim = runDigitalTwinSimulation(s.levers, facilityBaseline);
                      return (
                        <td key={s.id} className="px-4 py-3 font-mono">
                          {sim.impact.paybackPeriodYears} Years
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#707974]">Solar / Efficiency / EV</td>
                    <td className="px-4 py-3 font-mono text-xs bg-[#e1f2e7]/40 dark:bg-[#162d22]/40">
                      {levers.solarAdoptionPercent}% / {levers.energyEfficiencyPercent}% / {levers.fleetElectrificationPercent}%
                    </td>
                    {savedScenarios.map(s => (
                      <td key={s.id} className="px-4 py-3 font-mono text-xs">
                        {s.levers.solarAdoptionPercent}% / {s.levers.energyEfficiencyPercent}% / {s.levers.fleetElectrificationPercent}%
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#006c49] hover:bg-[#1a5140] text-white font-semibold text-xs shadow-xs"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
