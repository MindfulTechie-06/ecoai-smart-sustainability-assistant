import { useState } from 'react';
import { exportToCSV } from '../utils/carbonEngine';
import PageHeader from './PageHeader';
import ExecutiveDashboard from './ExecutiveDashboard';

export default function DashboardSection({ 
  metrics, 
  selectedSite, 
  setSelectedSite, 
  onSimulate, 
  onViewInsights,
  onViewCarbon,
  onNavigateToTab,
  records = []
}) {
  const [dashboardView, setDashboardView] = useState('executive'); // 'executive' | 'detailed'
  const [unitMode, setUnitMode] = useState('tCO2e'); // 'tCO2e' or 'kgCO2e'
  const [dateFilter, setDateFilter] = useState('Q3 2024 / YTD');

  const unitMultiplier = unitMode === 'kgCO2e' ? 1000 : 1;
  const unitLabel = unitMode === 'kgCO2e' ? 'kgCO₂e' : 'tCO₂e';

  // Format values according to unit
  const formatVal = (tonnes) => {
    const val = tonnes * unitMultiplier;
    return val >= 1000 ? val.toLocaleString(undefined, { maximumFractionDigits: 1 }) : val.toFixed(1);
  };

  // Facilities options
  const facilities = [
    { id: 'all', name: 'All Facilities (14)', location: 'Global Consolidated' },
    { id: 'site-01', name: 'Berlin Advanced Fab 01', location: 'Germany' },
    { id: 'site-02', name: 'Austin Logistics Hub HQ', location: 'United States' },
    { id: 'site-03', name: 'Incheon Distribution Center', location: 'South Korea' }
  ];

  // Base metrics from props with fallback
  const baseScope1 = metrics?.carbon?.scope1 || 12480;
  const baseScope2 = metrics?.carbon?.scope2 || 18340;
  const baseScope3 = metrics?.carbon?.scope3 || 68920;
  const baseGross = baseScope1 + baseScope2;

  // Handle Export CSV
  const handleExportCSV = () => {
    const exportData = records.length > 0 ? records : [
      { node: 'Berlin Advanced Fab 01', vector: 'Scope 2 • Grid High-Voltage', quantity: '14,280 MWh', factor: '0.385 kg/kWh', tCO2e: 5497.8, status: 'Verified (PwC)' },
      { node: 'Austin Logistics Hub HQ', vector: 'Scope 1 • Natural Gas Turbine', quantity: '62,400 MMBtu', factor: '53.06 kg/MMBtu', tCO2e: 3310.9, status: 'Verified (DNV)' },
      { node: 'Western Europe Fleet EV/ICE', vector: 'Scope 1 • Diesel & Fleet Draw', quantity: '420,000 Liters', factor: '2.687 kg/L', tCO2e: 1128.5, status: 'Automated Telemetry' },
      { node: 'Tier-1 Silicon Wafer Supply', vector: 'Scope 3 • Cat 1 Purchased Goods', quantity: '1,840,000 Units', factor: '0.012 t/u', tCO2e: 22080.0, status: 'Supplier Attestation' },
      { node: 'Incheon Distribution Center', vector: 'Scope 3 • Cat 5 Waste Generated', quantity: '320 Tonnes Solid', factor: '0.45 t/tonne', tCO2e: 144.0, status: 'Verified (Bureau Veritas)' }
    ];
    exportToCSV(`EchoAI_Audit_Ledger_${new Date().toISOString().split('T')[0]}`, exportData);
  };

  return (
    <div className="w-full space-y-6 font-sans text-[#101e18] dark:text-[#edfdf2] transition-colors pb-12">
      
      {/* PERSISTENT STITCH VIEW SWITCHER RIBBON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#13241c] p-2 sm:p-2.5 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs">
        <div className="flex items-center space-x-1.5 bg-[#edfdf2] dark:bg-[#0c1611] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
          <button
            type="button"
            onClick={() => setDashboardView('executive')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              dashboardView === 'executive'
                ? 'bg-[#00392b] text-white shadow-xs'
                : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            <span>Executive Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setDashboardView('detailed')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              dashboardView === 'detailed'
                ? 'bg-[#00392b] text-white shadow-xs'
                : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">view_list</span>
            <span>Carbon Footprint Ledger</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs text-[#404944] dark:text-[#8cc2ac] px-2">
          <span className="inline-flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">Stitch Project #12385580854362237636</span>
          </span>
          <span className="hidden md:inline text-[#707974]">•</span>
          <span className="hidden md:inline">Synced</span>
        </div>
      </div>

      {/* RENDER EXECUTIVE VIEW (STITCH SCREEN c1ba93) */}
      {dashboardView === 'executive' ? (
        <ExecutiveDashboard
          onNavigateToTab={(tab) => {
            if (tab === 'carbon') onViewCarbon?.();
            else if (tab === 'insights') onViewInsights?.();
            else if (tab === 'sites') setSelectedSite?.('all');
            else if (onNavigateToTab) onNavigateToTab(tab);
          }}
          onSelectSite={setSelectedSite}
          onExportReport={handleExportCSV}
        />
      ) : (
        /* RENDER DETAILED CARBON FOOTPRINT VIEW (STITCH SCREEN e7c3e0) */
        <div className="space-y-8">
      
      {/* 1. STANDARDIZED PAGE HEADER & TELEMETRY CONTROLS */}
      <PageHeader
        badge="Sample Demo Data • ISO 14064-1 Ingestion"
        title="Carbon Footprint Overview"
        description="Real-time enterprise emissions footprint, circular progress diagnostics, and decarbonization accounting across Meridian Global operations."
        actions={
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Facilities Selector */}
            <div className="relative">
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="appearance-none bg-white dark:bg-[#13241c] pl-9 pr-8 py-2 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus:outline-none cursor-pointer"
              >
                {facilities.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base absolute left-2.5 top-2.5 pointer-events-none">
                domain
              </span>
              <span className="material-symbols-outlined text-[#404944] dark:text-[#8cc2ac] text-xs absolute right-2.5 top-3 pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Date Selector */}
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-[#13241c] pl-9 pr-8 py-2 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus:outline-none cursor-pointer"
              >
                <option value="Q3 2024 / YTD">Q3 2024 / YTD</option>
                <option value="Trailing 12M">Trailing 12 Months</option>
                <option value="Annual 2024">Full Year 2024</option>
              </select>
              <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base absolute left-2.5 top-2.5 pointer-events-none">
                date_range
              </span>
              <span className="material-symbols-outlined text-[#404944] dark:text-[#8cc2ac] text-xs absolute right-2.5 top-3 pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Unit Toggle Buttons */}
            <div className="flex items-center bg-white dark:bg-[#13241c] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs">
              <button
                type="button"
                onClick={() => setUnitMode('tCO2e')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  unitMode === 'tCO2e'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                tCO2e
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('kgCO2e')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  unitMode === 'kgCO2e'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                kgCO2e
              </button>
            </div>

            {/* Export Audit Report Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-[#006c49] hover:bg-[#1a5140] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Export Audit Report</span>
            </button>
          </div>
        }
      />

      {/* 2. 4 PRIMARY EMISSION SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total CO2e (Gross Footprint) */}
        <div className="bg-white dark:bg-[#13241c] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dcece1] dark:border-[#1e382c]">
          <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-[#e7f8ec] dark:bg-[#1a5140]/30 rounded-full blur-xl group-hover:bg-[#97f2c4]/40 transition-colors"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
              Gross Footprint (S1 + S2)
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded-full font-semibold">
              <span className="material-symbols-outlined text-xs">arrow_downward</span> 14.2% YoY
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
              {formatVal(baseGross)}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac] font-medium">{unitLabel}</span>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Target pace: {formatVal(46200)} max</span>
            <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">On Target</span>
          </div>
          <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#006c49] dark:bg-[#9af5c6] rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* Scope 1: Direct */}
        <div className="bg-white dark:bg-[#13241c] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dcece1] dark:border-[#1e382c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a5140] dark:bg-[#9af5c6]"></span>
              <span className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Scope 1 • Direct
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded-full font-semibold">
              <span className="material-symbols-outlined text-xs">arrow_downward</span> 8.4% YoY
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
              {formatVal(baseScope1)}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac] font-medium">{unitLabel}</span>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Natural Gas & Fugitives</span>
            <span className="text-[#00392b] dark:text-[#9af5c6] font-semibold">29.1% of Gross</span>
          </div>
          <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#1a5140] dark:bg-[#7ed8ab] rounded-full" style={{ width: '29%' }}></div>
          </div>
        </div>

        {/* Scope 2: Market */}
        <div className="bg-white dark:bg-[#13241c] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dcece1] dark:border-[#1e382c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
              <span className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Scope 2 • Market
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded-full font-semibold">
              <span className="material-symbols-outlined text-xs">arrow_downward</span> 18.2% YoY
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
              {formatVal(baseScope2)}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac] font-medium">{unitLabel}</span>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Purchased Clean Grid</span>
            <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">78% RE100 mix</span>
          </div>
          <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#006c49] dark:bg-[#9af5c6] rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Scope 3: Value Chain */}
        <div className="bg-white dark:bg-[#13241c] p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border border-[#dcece1] dark:border-[#1e382c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7ed8ab] dark:bg-[#9bd2bc]"></span>
              <span className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Scope 3 • Value Chain
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded-full font-semibold">
              <span className="material-symbols-outlined text-xs">arrow_downward</span> 5.1% YoY
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
              {formatVal(baseScope3)}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac] font-medium">{unitLabel}</span>
          </div>
          <div className="mt-3 pt-2 flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Upstream Logistics + Tiers</span>
            <span className="text-[#101e18] dark:text-[#edfdf2] font-semibold">Cat 1 & Cat 4 Lead</span>
          </div>
          <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#7ed8ab] dark:bg-[#9bd2bc] rounded-full" style={{ width: '61%' }}></div>
          </div>
        </div>
      </div>

      {/* 3. CENTRAL PLANETARY BOUNDARY INDEX HUD & CIRCULAR EARTH GAUGES */}
      <div className="bg-white dark:bg-[#13241c] rounded-2xl shadow-sm p-6 lg:p-8 relative overflow-hidden border border-[#dcece1] dark:border-[#1e382c]">
        {/* Ambient Jade Aura Backdrop */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#97f2c4]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#dcece1]/30 dark:bg-[#1a5140]/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
          
          {/* Left: Context & Category Distribution */}
          <div className="xl:col-span-4 space-y-5">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#006c49] dark:text-[#9af5c6] font-semibold">
                Circular Planetary Telemetry
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight mt-1">
                Planetary Boundary Index
              </h2>
              <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mt-2 leading-relaxed">
                Multi-vector atmospheric carbon loading relative to the 1.5°C Paris Alignment pathway. Concentric rings demonstrate current budget utilization across operational vectors.
              </p>
            </div>

            {/* Category Breakdown Bars */}
            <div className="space-y-3 bg-[#e7f8ec] dark:bg-[#162d22] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
              {/* Energy */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#101e18] dark:text-[#edfdf2] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#1a5140] dark:bg-[#9af5c6]"></span>
                    Energy-Related Footprint
                  </span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">42%</span>
                </div>
                <div className="w-full h-1.5 bg-[#dcece1] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1a5140] dark:bg-[#9af5c6] rounded-full w-[42%]"></div>
                </div>
              </div>

              {/* Upstream */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#101e18] dark:text-[#edfdf2] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#7ed8ab]"></span>
                    Upstream Supply Chain
                  </span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">26%</span>
                </div>
                <div className="w-full h-1.5 bg-[#dcece1] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="h-full bg-[#006c49] dark:bg-[#7ed8ab] rounded-full w-[26%]"></div>
                </div>
              </div>

              {/* Freight */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#101e18] dark:text-[#edfdf2] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#7ed8ab] dark:bg-[#9bd2bc]"></span>
                    Transport & Freight Logistics
                  </span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">18%</span>
                </div>
                <div className="w-full h-1.5 bg-[#dcece1] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7ed8ab] dark:bg-[#9bd2bc] rounded-full w-[18%]"></div>
                </div>
              </div>

              {/* Waste */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-[#101e18] dark:text-[#edfdf2] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#336856]"></span>
                    Waste & Facility Operations
                  </span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">14%</span>
                </div>
                <div className="w-full h-1.5 bg-[#dcece1] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="h-full bg-[#336856] rounded-full w-[14%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#404944] dark:text-[#8cc2ac]">
              <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">
                energy_savings_leaf
              </span>
              <span>Carbon Intensity: <strong className="text-[#00392b] dark:text-white font-semibold">142.6 gCO2e / kWh eq</strong></span>
            </div>
          </div>

          {/* Center: Circular Earth Globe HUD & Multi-Ring Progress Gauges */}
          <div className="xl:col-span-5 flex flex-col items-center justify-center py-4">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* SVG Multi-Ring Dial Gauges */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 320 320">
                {/* Background Tracks */}
                <circle cx="160" cy="160" r="145" fill="none" stroke="#dcece1" strokeWidth="5" opacity="0.6" strokeDasharray="4 6"></circle>
                <circle cx="160" cy="160" r="132" fill="none" stroke="#dcece1" strokeWidth="7"></circle>
                <circle cx="160" cy="160" r="118" fill="none" stroke="#dcece1" strokeWidth="7"></circle>
                <circle cx="160" cy="160" r="104" fill="none" stroke="#dcece1" strokeWidth="7"></circle>

                {/* Outer Scope 3 Ring */}
                <circle cx="160" cy="160" r="104" fill="none" stroke="#7ed8ab" strokeWidth="7" strokeDasharray="653" strokeDashoffset="260" strokeLinecap="round"></circle>
                {/* Middle Scope 2 Ring */}
                <circle cx="160" cy="160" r="118" fill="none" stroke="#006c49" strokeWidth="7" strokeDasharray="741" strokeDashoffset="180" strokeLinecap="round"></circle>
                {/* Inner Scope 1 Ring */}
                <circle cx="160" cy="160" r="132" fill="none" stroke="#1a5140" strokeWidth="7" strokeDasharray="829" strokeDashoffset="310" strokeLinecap="round"></circle>
                {/* Outer Orbital Tick Track */}
                <circle cx="160" cy="160" r="152" fill="none" stroke="#97f2c4" strokeWidth="1.5" strokeDasharray="2 12"></circle>
              </svg>

              {/* Earth Globe Asset */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#00392b] to-[#97f2c4] shadow-2xl flex items-center justify-center group">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img 
                    alt="Photorealistic 3D high-resolution miniature Earth globe floating with lush emerald forests" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALb521DNuwSAnKdSUX9URR_eR-1e4aoVRbIDnQcljP-G0mlOsVLzaqxCc1dCKgMQsyGtcUVgymrUaTW21uFod9G4h-w1spuMXnjQ3zY8P1vijgOG1Na7uQ2tYILCptRRgShwYXYh-U4Qgi95zHXpyY2tSc9VYlzexutmrbswQUQMZepV9GfXWFB15ymi0HXM5529Vv4U4YYo2KLduWCRsBGJizLB-4k5aR_oFsgulY"
                  />
                  <div className="absolute inset-0 bg-[#00392b]/25 mix-blend-color"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00392b]/85 via-transparent to-transparent flex flex-col justify-end p-3 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-[#b6eed7] font-semibold">Net Balance</span>
                    <span className="font-heading text-lg font-bold text-white tracking-tight">42.8k t</span>
                  </div>
                </div>
              </div>

              {/* Floating Orbital Badge 1 */}
              <div className="absolute -top-1 -right-2 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-xs text-[#00392b] dark:text-[#9af5c6] font-semibold border border-[#dcece1] dark:border-[#1e382c]">
                <span className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
                <span>SBTi 1.5°C Aligned</span>
              </div>

              {/* Floating Orbital Badge 2 */}
              <div className="absolute -bottom-2 -left-2 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-xs text-[#00392b] dark:text-[#9af5c6] font-semibold border border-[#dcece1] dark:border-[#1e382c]">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-sm">verified</span>
                <span>Audit Ready 98.4%</span>
              </div>
            </div>

            {/* Ring Legend */}
            <div className="flex items-center gap-4 mt-6 text-xs text-[#404944] dark:text-[#8cc2ac]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#1a5140] dark:bg-[#9af5c6] rounded"></span>
                <span>Scope 1 (Direct)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#006c49] dark:bg-[#7ed8ab] rounded"></span>
                <span>Scope 2 (Power)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#7ed8ab] dark:bg-[#9bd2bc] rounded"></span>
                <span>Scope 3 (Chain)</span>
              </div>
            </div>
          </div>

          {/* Right: Real-Time Decarbonization Flight Plan */}
          <div className="xl:col-span-3 space-y-4 bg-[#e7f8ec] dark:bg-[#162d22] p-5 rounded-2xl border border-[#dcece1] dark:border-[#1e382c]">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Decarbonization Pacing
              </span>
              <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-lg">
                flight_takeoff
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white dark:bg-[#13241c] p-3 rounded-xl shadow-xs border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
                  <span>Annual Abatement Target</span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">-15.0%</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-[#101e18] dark:text-[#edfdf2]">
                  <span>Achieved YTD</span>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">-14.2%</span>
                </div>
              </div>

              <div className="bg-white dark:bg-[#13241c] p-3 rounded-xl shadow-xs border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
                  <span>Avoided Carbon (PPA + Solar)</span>
                  <span className="font-heading font-bold text-[#006c49] dark:text-[#9af5c6]">8,410 t</span>
                </div>
                <p className="text-[11px] text-[#404944] dark:text-[#8cc2ac] mt-1">Displaced utility coal & gas grid draw</p>
              </div>

              <div className="bg-white dark:bg-[#13241c] p-3 rounded-xl shadow-xs border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
                  <span>Carbon Offset Quality</span>
                  <span className="font-heading font-bold text-[#00392b] dark:text-white">Gold / Verra</span>
                </div>
                <p className="text-[11px] text-[#404944] dark:text-[#8cc2ac] mt-1">100% permanence-verified credits</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onSimulate}
              className="w-full py-2.5 bg-[#006c49] hover:bg-[#1a5140] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Explore Digital Twin Modeling</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. MONTHLY EMISSIONS TRAJECTORY (CHART & SBTi 1.5°C TARGET LINE) */}
      <div className="bg-white dark:bg-[#13241c] p-6 lg:p-8 rounded-2xl shadow-sm space-y-6 border border-[#dcece1] dark:border-[#1e382c]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#006c49] dark:text-[#9af5c6] font-semibold">
              Longitudinal Trend
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">
              Emissions Trajectory vs. SBTi 1.5°C Pathway
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-[#404944] dark:text-[#8cc2ac]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1a5140] dark:bg-[#9af5c6]"></span>
              <span>Actual Emissions (2024)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#7ed8ab]"></span>
              <span>2023 Baseline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#ba1a1a] border-dashed"></span>
              <span>SBTi 1.5°C Ceiling</span>
            </div>
          </div>
        </div>

        {/* Trajectory SVG Visual with Gradient Area */}
        <div className="relative w-full h-64">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 240">
            <defs>
              <linearGradient id="emissionsGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#1a5140" stopOpacity="0.25"></stop>
                <stop offset="100%" stopColor="#1a5140" stopOpacity="0.0"></stop>
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            <line x1="0" y1="40" x2="900" y2="40" stroke="#e1f2e7" strokeWidth="1"></line>
            <line x1="0" y1="100" x2="900" y2="100" stroke="#e1f2e7" strokeWidth="1"></line>
            <line x1="0" y1="160" x2="900" y2="160" stroke="#e1f2e7" strokeWidth="1"></line>
            <line x1="0" y1="220" x2="900" y2="220" stroke="#e1f2e7" strokeWidth="1"></line>

            {/* SBTi Target Line (Dashed red) */}
            <line x1="0" y1="90" x2="900" y2="150" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="6 4" opacity="0.8"></line>
            <text x="760" y="142" fill="#ba1a1a" fontFamily="Manrope" fontSize="11" fontWeight="600">
              1.5°C Target Ceiling
            </text>

            {/* 2023 Baseline Line (dashed sage) */}
            <line x1="0" y1="70" x2="900" y2="110" stroke="#7ed8ab" strokeWidth="2" strokeDasharray="4 4"></line>

            {/* Area Under Curve 2024 */}
            <path d="M 0,110 L 80,105 L 170,95 L 260,115 L 350,130 L 440,140 L 530,150 L 620,165 L 710,180 L 800,190 L 900,195 L 900,240 L 0,240 Z" fill="url(#emissionsGradient)"></path>

            {/* Actual 2024 Trajectory Path */}
            <path d="M 0,110 L 80,105 L 170,95 L 260,115 L 350,130 L 440,140 L 530,150 L 620,165 L 710,180 L 800,190 L 900,195" fill="none" stroke="#1a5140" strokeWidth="3" strokeLinecap="round"></path>

            {/* Trajectory Dots */}
            <circle cx="80" cy="105" r="4" fill="#006c49"></circle>
            <circle cx="170" cy="95" r="4" fill="#006c49"></circle>
            <circle cx="260" cy="115" r="4" fill="#006c49"></circle>
            <circle cx="350" cy="130" r="4" fill="#006c49"></circle>
            <circle cx="440" cy="140" r="4" fill="#006c49"></circle>
            <circle cx="530" cy="150" r="4" fill="#006c49"></circle>
            <circle cx="620" cy="165" r="4" fill="#006c49"></circle>
            <circle cx="710" cy="180" r="4" fill="#006c49"></circle>
            <circle cx="800" cy="190" r="4" fill="#006c49"></circle>
            <circle cx="900" cy="195" r="5" fill="#1a5140" stroke="#ffffff" strokeWidth="2"></circle>
          </svg>

          {/* X-Axis Labels */}
          <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac] text-xs pt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep (YTD)</span>
            <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">Oct (Est)</span>
            <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">Nov (Est)</span>
            <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">Dec (Target)</span>
          </div>
        </div>
      </div>

      {/* 5. 3 DETAILED CATEGORY DRILLDOWN CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Energy Drilldown */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between border border-[#dcece1] dark:border-[#1e382c]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6]">
                <span className="material-symbols-outlined text-xl">bolt</span>
              </span>
              <span className="text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-0.5 rounded-full font-semibold">
                -18.2% YoY
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mt-1">
              Energy-Related Footprint
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
                {formatVal(18340)}
              </span>
              <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">{unitLabel}</span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
              Covers utility electrical draw across 14 operational hub sites, chiller HVAC cycles, and clean microgrid offsets.
            </p>
          </div>
          <div className="space-y-1.5 bg-[#e7f8ec] dark:bg-[#162d22] p-3.5 rounded-xl text-xs">
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Grid Power Ingestion:</span>
              <span className="text-[#101e18] dark:text-white font-semibold">22,100 tCO2e</span>
            </div>
            <div className="flex justify-between text-[#006c49] dark:text-[#9af5c6]">
              <span>On-site Solar & PPA Offset:</span>
              <span className="font-semibold">-3,760 tCO2e</span>
            </div>
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>HVAC Smart Automation Gain:</span>
              <span className="text-[#00392b] dark:text-white font-semibold">-12.4% net load</span>
            </div>
          </div>
        </div>

        {/* Transport Drilldown */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between border border-[#dcece1] dark:border-[#1e382c]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6]">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </span>
              <span className="text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-0.5 rounded-full font-semibold">
                -11.5% YoY
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mt-1">
              Transport & Fleet Logistics
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
                {formatVal(3890)}
              </span>
              <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">{unitLabel}</span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
              Consolidated commercial fleet, mid-mile freight carrier telemetry, and GLEC Framework standardized distribution.
            </p>
          </div>
          <div className="space-y-1.5 bg-[#e7f8ec] dark:bg-[#162d22] p-3.5 rounded-xl text-xs">
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Commercial EV Transition:</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">64% Fleet Active</span>
            </div>
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Aviation Logistics Share:</span>
              <span className="text-[#101e18] dark:text-white font-semibold">1,120 tCO2e</span>
            </div>
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Intermodal Rail Shift:</span>
              <span className="text-[#00392b] dark:text-white font-semibold">+22% Ton-Miles</span>
            </div>
          </div>
        </div>

        {/* Waste Drilldown */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between border border-[#dcece1] dark:border-[#1e382c]">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6]">
                <span className="material-symbols-outlined text-xl">recycling</span>
              </span>
              <span className="text-xs text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-0.5 rounded-full font-semibold">
                -24.0% YoY
              </span>
            </div>
            <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mt-1">
              Circular Waste & Facilities
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-3xl font-bold text-[#00392b] dark:text-white">
                {formatVal(1420)}
              </span>
              <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">{unitLabel}</span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
              Scope 1 & 3 downstream solid/aqueous byproduct management, industrial composting, and closed-loop material recycling.
            </p>
          </div>
          <div className="space-y-1.5 bg-[#e7f8ec] dark:bg-[#162d22] p-3.5 rounded-xl text-xs">
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Landfill Diversion Rate:</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">89.4% (Zero Waste)</span>
            </div>
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Composted Organic Waste:</span>
              <span className="text-[#101e18] dark:text-white font-semibold">410 Tonnes</span>
            </div>
            <div className="flex justify-between text-[#404944] dark:text-[#8cc2ac]">
              <span>Secondary Packaging Closed:</span>
              <span className="text-[#00392b] dark:text-white font-semibold">94% Circular</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. GRANULAR CARBON ACTIVITY & LINEAGE AUDIT LEDGER */}
      <div className="bg-white dark:bg-[#13241c] rounded-2xl shadow-sm overflow-hidden border border-[#dcece1] dark:border-[#1e382c]">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e1f2e7] dark:border-[#1e382c]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#006c49] dark:text-[#9af5c6] font-semibold">
              Lineage & Ingestion Audit
            </span>
            <h2 className="font-heading text-xl font-bold text-[#00392b] dark:text-white tracking-tight">
              Granular Carbon Activity Ledger
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onViewCarbon}
              className="px-3.5 py-2 bg-[#e1f2e7] dark:bg-[#162d22] hover:bg-[#dcece1] dark:hover:bg-[#1a382b] rounded-xl text-xs font-semibold text-[#00392b] dark:text-[#9af5c6] transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filter Activity Vectors</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-[#00392b] hover:bg-[#1a5140] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>CSV Export</span>
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#e7f8ec] dark:bg-[#162d22] text-[#404944] dark:text-[#8cc2ac] uppercase tracking-wider font-semibold border-b border-[#dcece1] dark:border-[#1e382c]">
              <tr>
                <th className="py-3 px-5">Source Asset / Node</th>
                <th className="py-3 px-5">Activity Vector</th>
                <th className="py-3 px-5 text-right">Activity Quantity</th>
                <th className="py-3 px-5">Factor Applied</th>
                <th className="py-3 px-5 text-right">Calculated tCO2e</th>
                <th className="py-3 px-5 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1f2e7] dark:divide-[#1e382c] text-[#101e18] dark:text-[#edfdf2]">
              {/* Row 1 */}
              <tr className="hover:bg-[#e7f8ec]/50 dark:hover:bg-[#1a382b]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[#00392b] dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">factory</span>
                    <span>Berlin Advanced Fab 01</span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] px-2 py-0.5 rounded">
                    Scope 2 • Grid High-Voltage
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold">14,280 MWh</td>
                <td className="py-3.5 px-5 text-[#404944] dark:text-[#8cc2ac] font-mono text-[11px]">IEA-DE-2023: 0.385 kg/kWh</td>
                <td className="py-3.5 px-5 text-right font-heading font-bold text-[#00392b] dark:text-[#9af5c6]">
                  {formatVal(5497.8)}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="inline-flex items-center gap-1 text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#006c49]/20">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Verified (PwC)
                  </span>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-[#e7f8ec]/50 dark:hover:bg-[#1a382b]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[#00392b] dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">corporate_fare</span>
                    <span>Austin Logistics Hub HQ</span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] px-2 py-0.5 rounded">
                    Scope 1 • Natural Gas Turbine
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold">62,400 MMBtu</td>
                <td className="py-3.5 px-5 text-[#404944] dark:text-[#8cc2ac] font-mono text-[11px]">EPA-GHG-24: 53.06 kg/MMBtu</td>
                <td className="py-3.5 px-5 text-right font-heading font-bold text-[#00392b] dark:text-[#9af5c6]">
                  {formatVal(3310.9)}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="inline-flex items-center gap-1 text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#006c49]/20">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Verified (DNV)
                  </span>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-[#e7f8ec]/50 dark:hover:bg-[#1a382b]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[#00392b] dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">local_shipping</span>
                    <span>Western Europe Fleet EV/ICE</span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] px-2 py-0.5 rounded">
                    Scope 1 • Diesel & Fleet Draw
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold">420,000 Liters</td>
                <td className="py-3.5 px-5 text-[#404944] dark:text-[#8cc2ac] font-mono text-[11px]">DEFRA-2024: 2.687 kg/L</td>
                <td className="py-3.5 px-5 text-right font-heading font-bold text-[#00392b] dark:text-[#9af5c6]">
                  {formatVal(1128.5)}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="inline-flex items-center gap-1 text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#006c49]/20">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Automated Telemetry
                  </span>
                </td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-[#e7f8ec]/50 dark:hover:bg-[#1a382b]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[#00392b] dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">cloud_sync</span>
                    <span>Tier-1 Silicon Wafer Supply</span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] px-2 py-0.5 rounded">
                    Scope 3 • Cat 1 Purchased Goods
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold">1,840,000 Units</td>
                <td className="py-3.5 px-5 text-[#404944] dark:text-[#8cc2ac] font-mono text-[11px]">Supplier Primary EPD: 0.012 t/u</td>
                <td className="py-3.5 px-5 text-right font-heading font-bold text-[#00392b] dark:text-[#9af5c6]">
                  {formatVal(22080.0)}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="inline-flex items-center gap-1 text-[#404944] dark:text-[#8cc2ac] bg-[#dcece1] dark:bg-[#162d22] px-2.5 py-1 rounded-full text-[11px] font-semibold">
                    <span className="material-symbols-outlined text-xs">hourglass_empty</span> Supplier Attestation
                  </span>
                </td>
              </tr>

              {/* Row 5 */}
              <tr className="hover:bg-[#e7f8ec]/50 dark:hover:bg-[#1a382b]/40 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-[#00392b] dark:text-white">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-base">delete</span>
                    <span>Incheon Distribution Center</span>
                  </div>
                </td>
                <td className="py-3.5 px-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] px-2 py-0.5 rounded">
                    Scope 3 • Cat 5 Waste Generated
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right font-semibold">320 Tonnes Solid</td>
                <td className="py-3.5 px-5 text-[#404944] dark:text-[#8cc2ac] font-mono text-[11px]">EPA WARM v15: 0.45 t/tonne</td>
                <td className="py-3.5 px-5 text-right font-heading font-bold text-[#00392b] dark:text-[#9af5c6]">
                  {formatVal(144.0)}
                </td>
                <td className="py-3.5 px-5 text-center">
                  <span className="inline-flex items-center gap-1 text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1 rounded-full text-[11px] font-semibold border border-[#006c49]/20">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Verified (Bureau Veritas)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination / Facility Ingress Footer */}
        <div className="bg-[#e7f8ec] dark:bg-[#162d22] p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#404944] dark:text-[#8cc2ac] border-t border-[#dcece1] dark:border-[#1e382c]">
          <span>Showing 5 of 184 active ingestion nodes across 14 global operating facilities</span>
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              disabled 
              className="px-2.5 py-1 bg-white dark:bg-[#13241c] rounded-lg border border-[#dcece1] dark:border-[#1e382c] disabled:opacity-50 text-xs font-semibold"
            >
              Previous
            </button>
            <span className="text-[#00392b] dark:text-white font-semibold">Page 1 of 37</span>
            <button 
              type="button" 
              className="px-2.5 py-1 bg-white dark:bg-[#13241c] hover:bg-[#e1f2e7] dark:hover:bg-[#1a382b] rounded-lg border border-[#dcece1] dark:border-[#1e382c] text-xs font-semibold transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      </div>
      )}

    </div>
  );
}
