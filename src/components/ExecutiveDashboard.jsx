import { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Download, 
  TrendingDown, 
  CheckCircle2, 
  ArrowUpRight, 
  Brain, 
  ShieldCheck, 
  Zap, 
  Droplets, 
  Trash2, 
  Car, 
  Sliders,
  ExternalLink,
  Plus
} from 'lucide-react';
import { exportToCSV } from '../utils/carbonEngine';

export default function ExecutiveDashboard({
  onNavigateToTab,
  onSelectSite,
  onExportReport
}) {
  const [activeMetricTab, setActiveMetricTab] = useState('absolute'); // 'absolute' | 'revenue' | 'fte'
  const [recalibrationDone, setRecalibrationDone] = useState(false);
  const [dispatchDone, setDispatchDone] = useState(false);
  const [facilityFilter, setFacilityFilter] = useState('all'); // 'all' | 'high-variance' | 'high-intensity'

  const handleExport = () => {
    if (onExportReport) {
      onExportReport();
      return;
    }
    const sampleAuditData = [
      { facility: 'Zurich Biophilic Campus', country: 'Switzerland', tCO2e: 4120, deltaYoY: '-18.4%', renewableMix: '92%', status: 'Verified (ISO 14064-3)' },
      { facility: 'Singapore Tech Hub', country: 'Singapore', tCO2e: 8940, deltaYoY: '-12.1%', renewableMix: '74%', status: 'Verified (ISO 14064-3)' },
      { facility: 'Austin Advanced Materials Center', country: 'United States', tCO2e: 14280, deltaYoY: '-4.5%', renewableMix: '58%', status: 'In Review' },
      { facility: 'Gothenburg Logistics Terminal', country: 'Sweden', tCO2e: 2870, deltaYoY: '-22.6%', renewableMix: '100%', status: 'Verified (ISO 14064-3)' }
    ];
    exportToCSV(`EchoAI_Executive_Audit_Package_${new Date().toISOString().split('T')[0]}`, sampleAuditData);
  };

  // Facility telemetry matrix data
  const facilitiesData = [
    {
      id: 'zurich',
      name: 'Zurich Biophilic Campus',
      location: 'Switzerland • Corporate R&D',
      emissions: '4,120 tCO₂e',
      delta: '-18.4%',
      isPositive: true,
      renewable: 92,
      uptime: '99.8% IoT uptime',
      status: 'Verified',
      highVariance: false,
      intensity: 8.2
    },
    {
      id: 'singapore',
      name: 'Singapore Tech Hub',
      location: 'Singapore • Cloud Infrastructure',
      emissions: '8,940 tCO₂e',
      delta: '-12.1%',
      isPositive: true,
      renewable: 74,
      uptime: '99.2% IoT uptime',
      status: 'Verified',
      highVariance: false,
      intensity: 12.8
    },
    {
      id: 'austin',
      name: 'Austin Advanced Materials Center',
      location: 'United States • Fabrication Hub',
      emissions: '14,280 tCO₂e',
      delta: '-4.5%',
      isPositive: true,
      renewable: 58,
      uptime: '94.1% IoT uptime',
      status: 'In Review',
      highVariance: true,
      intensity: 19.4
    },
    {
      id: 'gothenburg',
      name: 'Gothenburg Logistics Terminal',
      location: 'Sweden • Freight Distribution',
      emissions: '2,870 tCO₂e',
      delta: '-22.6%',
      isPositive: true,
      renewable: 100,
      uptime: '100% IoT uptime',
      status: 'Verified',
      highVariance: false,
      intensity: 4.1
    }
  ];

  const filteredFacilities = facilitiesData.filter(f => {
    if (facilityFilter === 'high-variance') return f.highVariance || f.delta.includes('-22');
    if (facilityFilter === 'high-intensity') return f.intensity > 10;
    return true;
  });

  return (
    <div className="w-full space-y-6 pb-12 font-sans text-[#101e18] dark:text-[#edfdf2]">
      
      {/* 1. EXECUTIVE WORKSPACE HEADER & CONTROL RIBBON (Stitch Screen c1ba93) */}
      <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] text-xs font-semibold border border-[#dcece1] dark:border-[#1e382c]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6] mr-1.5 animate-pulse" />
              LIVE AUDIT TELEMETRY ACTIVE
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              ISO 14064-3 CERTIFIED RUNTIME
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#00392b] dark:text-white tracking-tight">
            Good morning, Elena
          </h1>
          <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] max-w-2xl leading-relaxed">
            Here is your sustainability performance overview across 14 global operational facilities. Portfolio emissions tracking <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">14.2% below FY2023 baseline</span>.
          </p>
        </div>

        {/* Quick Control Ribbon */}
        <div className="flex flex-wrap items-center gap-2.5 bg-[#edfdf2] dark:bg-[#0c1611] p-2 rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
          <button 
            type="button"
            onClick={() => onNavigateToTab && onNavigateToTab('sites')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#13241c] hover:bg-[#e1f2e7] dark:hover:bg-[#162d22] text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
            <span>All Global Campuses (14)</span>
          </button>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#13241c] text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c]">
            <Calendar className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
            <span>YTD 2024 vs Baseline 2023</span>
          </div>

          <div className="hidden sm:flex items-center px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#13241c] text-xs font-medium text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c]">
            <span>USD ($) / MT CO₂e</span>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#006c49] hover:bg-[#1a5140] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Export Audit Package</span>
          </button>
        </div>
      </div>

      {/* 2. 5 PRIMARY SUSTAINABILITY KPIS (Stitch Screen c1ba93) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Total Carbon Footprint */}
        <div className="bg-white dark:bg-[#13241c] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              Total Carbon Footprint
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-bold">
              -14.2% YoY
            </span>
          </div>
          <div className="my-2">
            <div className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">42,810</div>
            <div className="text-xs text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between mt-0.5">
              <span>MT CO₂e gross</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">Target: 39,500</span>
            </div>
          </div>
          <div className="h-9 w-full">
            <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6]" preserveAspectRatio="none" viewBox="0 0 120 32">
              <defs>
                <linearGradient id="grad1-exec" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,24 Q18,26 32,18 T68,14 T95,10 T120,6 L120,32 L0,32 Z" fill="url(#grad1-exec)" />
              <path d="M0,24 Q18,26 32,18 T68,14 T95,10 T120,6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 2: Energy Demand */}
        <div className="bg-white dark:bg-[#13241c] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              Energy Demand
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-bold">
              -8.6% Target
            </span>
          </div>
          <div className="my-2">
            <div className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">184.2</div>
            <div className="text-xs text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between mt-0.5">
              <span>GWh consumed</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">68% Renewable</span>
            </div>
          </div>
          <div className="h-9 w-full">
            <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6]" preserveAspectRatio="none" viewBox="0 0 120 32">
              <defs>
                <linearGradient id="grad2-exec" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,20 Q20,10 42,22 T80,12 T105,16 T120,8 L120,32 L0,32 Z" fill="url(#grad2-exec)" />
              <path d="M0,20 Q20,10 42,22 T80,12 T105,16 T120,8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 3: Water Withdrawal */}
        <div className="bg-white dark:bg-[#13241c] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              Water Withdrawal
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-bold">
              -5.1% YoY
            </span>
          </div>
          <div className="my-2">
            <div className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">1.42M</div>
            <div className="text-xs text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between mt-0.5">
              <span>m³ water volume</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">42% Circular</span>
            </div>
          </div>
          <div className="h-9 w-full">
            <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6]" preserveAspectRatio="none" viewBox="0 0 120 32">
              <defs>
                <linearGradient id="grad3-exec" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,18 Q30,26 50,14 T90,20 T110,12 T120,10 L120,32 L0,32 Z" fill="url(#grad3-exec)" />
              <path d="M0,18 Q30,26 50,14 T90,20 T110,12 T120,10" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 4: Waste Diversion */}
        <div className="bg-white dark:bg-[#13241c] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              Waste Diversion
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-bold">
              +3.2% vs Q2
            </span>
          </div>
          <div className="my-2">
            <div className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">12,450</div>
            <div className="text-xs text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between mt-0.5">
              <span>Tonnes diverted</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">89.4% Zero-Waste</span>
            </div>
          </div>
          <div className="h-9 w-full">
            <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6]" preserveAspectRatio="none" viewBox="0 0 120 32">
              <defs>
                <linearGradient id="grad4-exec" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,28 Q25,20 50,22 T85,14 T105,12 T120,5 L120,32 L0,32 Z" fill="url(#grad4-exec)" />
              <path d="M0,28 Q25,20 50,22 T85,14 T105,12 T120,5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Card 5: Mobility & Fleet */}
        <div className="bg-white dark:bg-[#13241c] p-4 rounded-xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac]">
              Mobility & Fleet
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-bold">
              -19.8% YoY
            </span>
          </div>
          <div className="my-2">
            <div className="font-heading text-2xl font-bold text-[#00392b] dark:text-white tracking-tight">3,890</div>
            <div className="text-xs text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between mt-0.5">
              <span>MT CO₂e commute</span>
              <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">EV Shift Active</span>
            </div>
          </div>
          <div className="h-9 w-full">
            <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6]" preserveAspectRatio="none" viewBox="0 0 120 32">
              <defs>
                <linearGradient id="grad5-exec" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,22 Q30,24 60,18 T90,14 T110,8 T120,4 L120,32 L0,32 Z" fill="url(#grad5-exec)" />
              <path d="M0,22 Q30,24 60,18 T90,14 T110,8 T120,4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. PRIMARY ANALYTICS ROW: 65% / 35% TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Scope 1, 2 & 3 Trajectory vs SBTi 1.5°C Target (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#006c49] dark:bg-[#9af5c6]"></span>
                <h2 className="font-heading text-base sm:text-lg font-bold text-[#00392b] dark:text-white">
                  Scope 1, 2 & 3 Trajectory vs SBTi 1.5°C Target
                </h2>
              </div>
              <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-1">
                Monthly enterprise aggregation against Paris-aligned decarbonization pathway (Linear -4.2% p.a.)
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1 text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#00392b]"></span>
                <span>Scope 1</span>
              </div>
              <div className="flex items-center space-x-1 text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#006c49]"></span>
                <span>Scope 2</span>
              </div>
              <div className="flex items-center space-x-1 text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#9bd2bc]"></span>
                <span>Scope 3</span>
              </div>
              <div className="flex items-center space-x-1 text-red-600 font-medium">
                <span className="w-3 h-0.5 bg-red-500"></span>
                <span>SBTi 1.5°C</span>
              </div>
            </div>
          </div>

          {/* Interactive Stacked Bar Chart */}
          <div className="relative w-full h-72 flex flex-col justify-end pt-6 pb-2">
            
            {/* SBTi Threshold line */}
            <div className="absolute inset-x-0 top-[38%] flex items-center z-10 pointer-events-none">
              <div className="w-full border-t border-dashed border-red-500/80"></div>
              <span className="absolute right-0 -top-3 text-red-600 text-[10px] font-bold bg-white dark:bg-[#13241c] px-1.5 py-0.5 rounded shadow-xs border border-red-200 dark:border-red-900/50">
                SBTi Threshold: 38,000 MT
              </span>
            </div>

            {/* Axis grid ticks */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-[#707974]"></div>
              <div className="border-b border-[#707974]"></div>
              <div className="border-b border-[#707974]"></div>
              <div className="border-b border-[#707974]"></div>
              <div className="border-b border-[#707974]"></div>
            </div>

            {/* Stacked Bars Grid */}
            <div className="grid grid-cols-9 h-full items-end gap-2 sm:gap-3 z-0 pt-8">
              {[
                { month: 'Jan', s1: 16, s2: 20, s3: 14, current: false },
                { month: 'Feb', s1: 16, s2: 19, s3: 13, current: false },
                { month: 'Mar', s1: 15, s2: 18, s3: 12, current: false },
                { month: 'Apr', s1: 14, s2: 17, s3: 12, current: false },
                { month: 'May', s1: 13, s2: 16, s3: 11, current: false },
                { month: 'Jun', s1: 13, s2: 15, s3: 10, current: false },
                { month: 'Jul', s1: 12, s2: 14, s3: 9, current: true, forecast: false },
                { month: 'Aug', s1: 11, s2: 13, s3: 8, current: false, forecast: true },
                { month: 'Sep', s1: 10, s2: 12, s3: 8, current: false, forecast: true }
              ].map((item) => (
                <div key={item.month} className="flex flex-col items-center h-full justify-end group relative">
                  {item.current && (
                    <div className="absolute -top-7 px-1.5 py-0.5 rounded bg-[#006c49] text-white text-[10px] font-bold shadow-xs">
                      Current
                    </div>
                  )}
                  <div 
                    className={`w-full max-w-[38px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300 group-hover:scale-y-105 origin-bottom ${
                      item.current 
                        ? 'shadow-md ring-2 ring-[#006c49] ring-offset-1' 
                        : item.forecast ? 'opacity-60 border-2 border-dashed border-[#006c49]/40' : 'shadow-xs'
                    }`}
                  >
                    <div style={{ height: `${item.s3 * 3.5}px` }} className="bg-[#9bd2bc]" title={`Scope 3: ${item.s3}k MT`}></div>
                    <div style={{ height: `${item.s2 * 3.5}px` }} className="bg-[#006c49]" title={`Scope 2: ${item.s2}k MT`}></div>
                    <div style={{ height: `${item.s1 * 3.5}px` }} className="bg-[#00392b]" title={`Scope 1: ${item.s1}k MT`}></div>
                  </div>
                  <span className={`text-[11px] mt-2 font-medium ${item.current ? 'text-[#006c49] dark:text-[#9af5c6] font-bold' : 'text-[#404944] dark:text-[#8cc2ac]'}`}>
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-4 mt-4 border-t border-[#dcece1] dark:border-[#1e382c] text-xs">
            <div className="flex items-center space-x-1.5 text-[#404944] dark:text-[#8cc2ac]">
              <CheckCircle2 className="w-4 h-4 text-[#006c49] dark:text-[#9af5c6]" />
              <span>Audited through Q2 2024 via Bureau Veritas 3rd-party assurance</span>
            </div>
            <button 
              type="button"
              onClick={() => onNavigateToTab && onNavigateToTab('carbon')}
              className="text-[#006c49] dark:text-[#9af5c6] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Detailed Scope Matrix</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Operational Source Donut Visual (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-heading text-base sm:text-lg font-bold text-[#00392b] dark:text-white">
                Operational Source
              </h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6]">
                YTD Split
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-4">
              Distribution of carbon output across global production & real-estate assets.
            </p>

            {/* SVG Donut Chart */}
            <div className="flex items-center justify-center my-4 relative">
              <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#e1f2e7" strokeWidth="12"></circle>
                {/* Facility Electricity 42% */}
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#00392b" strokeDasharray="100.28 238.76" strokeDashoffset="0" strokeWidth="12"></circle>
                {/* Thermal Heating 24% */}
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#006c49" strokeDasharray="57.3 238.76" strokeDashoffset="-100.28" strokeWidth="12"></circle>
                {/* Logistics & Fleet 18% */}
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#336856" strokeDasharray="43.0 238.76" strokeDashoffset="-157.58" strokeWidth="12"></circle>
                {/* Purchased Goods 16% */}
                <circle cx="50" cy="50" fill="transparent" r="38" stroke="#9bd2bc" strokeDasharray="38.2 238.76" strokeDashoffset="-200.58" strokeWidth="12"></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-heading text-xl font-bold text-[#00392b] dark:text-white leading-none">
                  42,810
                </span>
                <span className="text-[10px] text-[#404944] dark:text-[#8cc2ac] uppercase font-semibold mt-0.5">
                  tCO₂e YTD
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#edfdf2]/60 dark:bg-[#0c1611]/60 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00392b]"></span>
                <span className="text-[#101e18] dark:text-white font-medium">Facility Electricity</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#101e18] dark:text-white">17,980 MT</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] w-8 text-right font-medium">42%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#edfdf2]/60 dark:bg-[#0c1611]/60 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                <span className="text-[#101e18] dark:text-white font-medium">Thermal Heating</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#101e18] dark:text-white">10,274 MT</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] w-8 text-right font-medium">24%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#edfdf2]/60 dark:bg-[#0c1611]/60 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#336856]"></span>
                <span className="text-[#101e18] dark:text-white font-medium">Logistics & Fleet</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#101e18] dark:text-white">7,705 MT</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] w-8 text-right font-medium">18%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#edfdf2]/60 dark:bg-[#0c1611]/60 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9bd2bc]"></span>
                <span className="text-[#101e18] dark:text-white font-medium">Upstream Goods</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#101e18] dark:text-white">6,851 MT</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] w-8 text-right font-medium">16%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. THREE INTELLIGENCE PANELS: AI ANOMALIES, DECARBONIZATION ACTIONS, ASSURANCE HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel 1: AI Insights & Anomaly Detection */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading text-base font-bold text-[#00392b] dark:text-white">
                  AI Insights & Anomalies
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                2 Actionable
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-4">
              Continuous sensor inference & telemetry anomaly identification.
            </p>

            <div className="space-y-3">
              {/* Anomaly 1: HVAC */}
              <div className="p-3 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-[#101e18] dark:text-white">HVAC Thermal Leak detected</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#006c49] dark:text-[#9af5c6]">98% Conf.</span>
                </div>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-1 leading-relaxed">
                  Zurich Biophilic Campus: +18% chill-water spike. Recommended automated damper recalibration.
                </p>
                <div className="mt-2 pt-2 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs">
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold text-[11px]">Potential: 14.2 MT CO₂e/mo</span>
                  <button
                    type="button"
                    disabled={recalibrationDone}
                    onClick={() => setRecalibrationDone(true)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      recalibrationDone 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-[#006c49] text-white hover:bg-[#1a5140]'
                    }`}
                  >
                    {recalibrationDone ? 'Dispatched' : 'Recalibrate'}
                  </button>
                </div>
              </div>

              {/* Anomaly 2: Solar */}
              <div className="p-3 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                    <span className="text-xs font-bold text-[#101e18] dark:text-white">Solar Inverter Optimization</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#006c49] dark:text-[#9af5c6]">94% Conf.</span>
                </div>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-1 leading-relaxed">
                  Singapore Tech Hub: Peak generation mismatch. Grid arbitrage battery dispatch plan available.
                </p>
                <div className="mt-2 pt-2 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs">
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold text-[11px]">Yield Gain: +$3,400/wk</span>
                  <button
                    type="button"
                    disabled={dispatchDone}
                    onClick={() => setDispatchDone(true)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                      dispatchDone 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
                    }`}
                  >
                    {dispatchDone ? 'Executed' : 'Dispatch Plan'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 flex items-center justify-between border-t border-[#dcece1] dark:border-[#1e382c] text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Sensor polling rate: 10s cadence</span>
            <button 
              type="button"
              onClick={() => onNavigateToTab && onNavigateToTab('insights')}
              className="text-[#006c49] dark:text-[#9af5c6] font-semibold hover:underline"
            >
              View Full Insights
            </button>
          </div>
        </div>

        {/* Panel 2: Decarbonization Action Tracker */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading text-base font-bold text-[#00392b] dark:text-white">
                  Decarbonization Actions
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#404944] dark:text-[#8cc2ac]">
                Active CapEx: $2.4M
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-4">
              Approved high-impact initiatives contributing to FY25 Net Zero milestones.
            </p>

            <div className="space-y-4">
              {/* Initiative 1 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">Heat Pump Electrification (Frankfurt)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[10px] font-bold">
                    Implemented
                  </span>
                </div>
                <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full w-full"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Verified Impact</span>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-bold">420 MT CO₂e saved/yr</span>
                </div>
              </div>

              {/* Initiative 2 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">VPPA Renewable Energy PPA</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1a5140] text-white text-[10px] font-bold">
                    In Progress (84%)
                  </span>
                </div>
                <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full w-[84%]"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Nordic Offsite Wind Farm</span>
                  <span className="font-semibold text-[#101e18] dark:text-white">Target: Nov 2024</span>
                </div>
              </div>

              {/* Initiative 3 */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">Fleet EV Transition Batch 2</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#d6e7db] text-[#101e18] text-[10px] font-bold">
                    Approved
                  </span>
                </div>
                <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full w-[25%]"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>120 Commercial Vans</span>
                  <span className="font-semibold text-[#101e18] dark:text-white">Scheduled Oct 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 flex items-center justify-between border-t border-[#dcece1] dark:border-[#1e382c] text-xs">
            <span className="text-[#404944] dark:text-[#8cc2ac]">Cumulative Savings: 2,190 MT</span>
            <button 
              type="button"
              onClick={() => onNavigateToTab && onNavigateToTab('actions')}
              className="text-[#006c49] dark:text-[#9af5c6] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Manage Actions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Panel 3: Data Quality & Assurance Health */}
        <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading text-base font-bold text-[#00392b] dark:text-white">
                  Assurance & Data Quality
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                Grade A+
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-4">
              ISO 14064-3 limited assurance compliance criteria and audit readiness index.
            </p>

            <div className="space-y-3">
              {/* Metered vs Estimated */}
              <div className="p-3 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">Primary Metered Data</span>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-extrabold">96.4%</span>
                </div>
                <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-2 rounded-full overflow-hidden flex">
                  <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full w-[96.4%]"></div>
                  <div className="bg-[#9bd2bc] h-full w-[3.6%]"></div>
                </div>
                <div className="flex justify-between items-center mt-1 text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Direct IoT & Ingress</span>
                  <span>3.6% Modelled / Est.</span>
                </div>
              </div>

              {/* Checkpoints */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#dcece1]/60 dark:border-[#1e382c]/60">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
                    <span className="text-[#101e18] dark:text-white font-medium">GHG Protocol Scope Coverage</span>
                  </div>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-bold">100% Validated</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#dcece1]/60 dark:border-[#1e382c]/60">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
                    <span className="text-[#101e18] dark:text-white font-medium">Anomaly Audit Cryptography</span>
                  </div>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-bold">SHA-256 Pinned</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
                    <span className="text-[#101e18] dark:text-white font-medium">CSRD Double-Materiality Sync</span>
                  </div>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-bold">Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 flex items-center justify-between border-t border-[#dcece1] dark:border-[#1e382c] text-xs">
            <span className="text-[#404944] dark:text-[#8cc2ac]">Audit Partner: Bureau Veritas</span>
            <button 
              type="button"
              onClick={() => onNavigateToTab && onNavigateToTab('reports')}
              className="text-[#006c49] dark:text-[#9af5c6] font-semibold hover:underline flex items-center space-x-0.5"
            >
              <span>Certificate</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* 5. OPERATIONAL FACILITY EMISSION MATRIX (Stitch Screen c1ba93) */}
      <div className="bg-white dark:bg-[#13241c] rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white">
              Operational Facility Emission Matrix
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac]">
              Live telemetry feeds from regional hubs and manufacturing campuses.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setFacilityFilter(facilityFilter === 'high-variance' ? 'all' : 'high-variance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                facilityFilter === 'high-variance'
                  ? 'bg-[#00392b] text-white border-[#00392b]'
                  : 'bg-white dark:bg-[#13241c] text-[#101e18] dark:text-white border-[#dcece1] dark:border-[#1e382c] hover:bg-[#edfdf2]'
              }`}
            >
              Filter: High Variance
            </button>
            <button
              type="button"
              onClick={() => setFacilityFilter(facilityFilter === 'high-intensity' ? 'all' : 'high-intensity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                facilityFilter === 'high-intensity'
                  ? 'bg-[#00392b] text-white border-[#00392b]'
                  : 'bg-white dark:bg-[#13241c] text-[#101e18] dark:text-white border-[#dcece1] dark:border-[#1e382c] hover:bg-[#edfdf2]'
              }`}
            >
              Sort: Carbon Intensity
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edfdf2]/70 dark:bg-[#0c1611]/70 text-[#404944] dark:text-[#8cc2ac] uppercase tracking-wider font-semibold text-[10px] border-b border-[#dcece1] dark:border-[#1e382c]">
                <th className="py-3 px-6">Facility & Location</th>
                <th className="py-3 px-6">Carbon Footprint</th>
                <th className="py-3 px-6">YoY Delta</th>
                <th className="py-3 px-6">Renewable Mix</th>
                <th className="py-3 px-6">Telemetry Health</th>
                <th className="py-3 px-6 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c]">
              {filteredFacilities.map((fac) => (
                <tr key={fac.id} className="hover:bg-[#edfdf2]/50 dark:hover:bg-[#162d22]/50 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-2 h-2 rounded-full ${fac.renewable > 80 ? 'bg-[#006c49] dark:bg-[#9af5c6]' : 'bg-[#1a5140]'}`}></span>
                      <div>
                        <div className="font-bold text-[#101e18] dark:text-white">{fac.name}</div>
                        <div className="text-[11px] text-[#404944] dark:text-[#8cc2ac]">{fac.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-[#00392b] dark:text-white">
                    {fac.emissions}
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-[#006c49] dark:text-[#9af5c6]">
                    {fac.delta}
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-[#e1f2e7] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full" style={{ width: `${fac.renewable}%` }}></div>
                      </div>
                      <span className="font-semibold">{fac.renewable}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center text-xs text-[#006c49] dark:text-[#9af5c6] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6] mr-1.5"></span>
                      {fac.uptime}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      fac.status === 'Verified' 
                        ? 'bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]' 
                        : 'bg-[#d6e7db] text-[#404944]'
                    }`}>
                      {fac.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#edfdf2]/40 dark:bg-[#0c1611]/40 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
          <span>Showing 4 of 14 global campus telemetry streams</span>
          <button 
            type="button"
            onClick={() => onNavigateToTab && onNavigateToTab('sites')}
            className="text-[#006c49] dark:text-[#9af5c6] font-semibold hover:underline flex items-center space-x-1"
          >
            <span>View All 14 Campuses</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}

