import { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Database, 
  Calculator,
  ShieldCheck,
  AlertTriangle,
  TrendingDown,
  Lock,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  X
} from 'lucide-react';
import { EMISSION_FACTORS, ACTIVITY_RECORDS } from '../data/mockData';
import { exportToCSV } from '../utils/carbonEngine';
import PageHeader from './PageHeader';

const CarbonIntelligence = ({ records = ACTIVITY_RECORDS, selectedSite }) => {
  const [activeScopeTab, setActiveScopeTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [trajectoryMode, setTrajectoryMode] = useState('absolute'); // 'absolute' | 'revenue' | 'fte'
  const [showMunichAlert, setShowMunichAlert] = useState(true);
  const [showBmsModal, setShowBmsModal] = useState(false);

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter(rec => {
      const matchScope = activeScopeTab === 'All' || rec.scope === activeScopeTab;
      const matchSite = selectedSite === 'all' || rec.site.toLowerCase().includes(selectedSite.replace('site-0', 'site 0'));
      const matchStatus = statusFilter === 'All' || rec.status === statusFilter;
      const matchSearch = rec.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.site.toLowerCase().includes(searchTerm.toLowerCase());
      return matchScope && matchSite && matchStatus && matchSearch;
    });
  }, [records, activeScopeTab, selectedSite, statusFilter, searchTerm]);

  // Provenance metrics
  const totalTonnes = useMemo(() => {
    return Number(filteredRecords.reduce((acc, r) => acc + (r.co2eTonnes || 0), 0).toFixed(2));
  }, [filteredRecords]);

  const scope1Tonnes = useMemo(() => {
    return Number(filteredRecords.filter(r => r.scope === 'Scope 1').reduce((acc, r) => acc + (r.co2eTonnes || 0), 0).toFixed(2));
  }, [filteredRecords]);

  const scope2Tonnes = useMemo(() => {
    return Number(filteredRecords.filter(r => r.scope === 'Scope 2').reduce((acc, r) => acc + (r.co2eTonnes || 0), 0).toFixed(2));
  }, [filteredRecords]);

  const scope3Tonnes = useMemo(() => {
    return Number(filteredRecords.filter(r => r.scope === 'Scope 3').reduce((acc, r) => acc + (r.co2eTonnes || 0), 0).toFixed(2));
  }, [filteredRecords]);

  const handleExportCSV = () => {
    exportToCSV(`EchoAI_Activity_Records_${new Date().toISOString().split('T')[0]}`, filteredRecords);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans text-[#101e18] dark:text-[#edfdf2]">
      {/* Standardized Page Header */}
      <PageHeader
        badge="GHG Protocol Corporate Standard & ISO 14064-1"
        title="Carbon Intelligence & Emissions Accounting"
        description="Deterministic GHG Protocol accounting across Scope 1, Scope 2, and Scope 3 activity streams with cryptographic audit provenance."
        actions={
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6] mr-1.5 animate-pulse"></span>
              1.5°C SBTi Aligned
            </span>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Activity CSV</span>
            </button>
          </div>
        }
      />

      {/* 1. ANOMALY ALERT: MUNICH DC-02 FUGITIVE REFRIGERANT SPIKE (Stitch Screen b96af6) */}
      {showMunichAlert && (
        <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-[#201c10] border border-amber-200 dark:border-amber-900/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Telemetry Anomaly Detected
                </span>
                <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac]">14 mins ago</span>
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-[#00392b] dark:text-white">
                Munich DC-02 Fugitive Refrigerant Spike
              </h3>
              <p className="text-xs text-[#404944] dark:text-[#8cc2ac] max-w-2xl leading-relaxed">
                IoT sensor pressure differential detected potential R-410A leakage rate exceeding baseline by <strong className="text-amber-700 dark:text-amber-300">+340 kg CO₂e</strong> annualized in Chiller Loop 3.
              </p>
              <div className="inline-flex items-center space-x-2 text-xs pt-1">
                <span className="font-bold text-[#101e18] dark:text-white">Automated Action:</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold text-[11px]">
                  Work Order #WO-8911 Dispatched
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
            <button
              type="button"
              onClick={() => setShowMunichAlert(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#404944] dark:text-[#8cc2ac] hover:bg-amber-100/50 dark:hover:bg-amber-900/30 transition-colors"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={() => setShowBmsModal(true)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#00392b] dark:text-white bg-white dark:bg-[#13241c] border border-amber-300 dark:border-amber-800 hover:bg-amber-50 shadow-xs transition-colors"
            >
              Inspect BMS Trace
            </button>
          </div>
        </div>
      )}

      {/* BMS Trace Modal */}
      {showBmsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl max-w-lg w-full border border-[#dcece1] dark:border-[#1e382c] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#dcece1] dark:border-[#1e382c] pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  BMS Telemetry Diagnostic Trace
                </h3>
              </div>
              <button 
                onClick={() => setShowBmsModal(false)}
                className="p-1 rounded-lg hover:bg-[#edfdf2] dark:hover:bg-[#162d22] text-[#404944] dark:text-[#8cc2ac]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-[#404944] dark:text-[#8cc2ac]">
              <div className="p-3 bg-[#edfdf2] dark:bg-[#0c1611] rounded-xl space-y-1">
                <div className="font-bold text-[#101e18] dark:text-white">Sensor ID: BMS-MUC-LOOP3-P18</div>
                <div>Pressure Reading: <strong>14.2 bar</strong> (Nominal: 18.0 bar ± 0.5 bar)</div>
                <div>Calculated Refrigerant Loss: <strong>164 grams / 24h</strong></div>
                <div>GWP Factor (R-410A): <strong>2,088</strong></div>
                <div>Annualized Impact: <strong>342.4 kg CO₂e</strong></div>
              </div>
              <p>Work order #WO-8911 has notified on-site technician Hans Gruber. Pressure seals and compressor gaskets flagged for replacement.</p>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowBmsModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#006c49] text-white hover:bg-[#1a5140]"
              >
                Acknowledge Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 4 SCOPE SUMMARY CARDS (Stitch Screen b96af6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Footprint */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Gross Footprint (S1+S2)</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00392b]"></span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-bold font-heading text-[#00392b] dark:text-white">
              {Number((scope1Tonnes + scope2Tonnes).toFixed(2))}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
          </div>
          <div className="mt-2 text-[11px] text-[#006c49] dark:text-[#9af5c6] font-medium flex items-center justify-between">
            <span>-6.4% vs baseline</span>
            <span className="text-[#404944] dark:text-[#8cc2ac]">Primary Operations</span>
          </div>
        </div>

        {/* Card 2: Scope 1 Direct */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 1: Direct Combustion</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-bold font-heading text-[#00392b] dark:text-white">
              {scope1Tonnes}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
          </div>
          <div className="mt-2 text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between">
            <span>Stationary Gas & Fleet</span>
            <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">EPA Mandatory</span>
          </div>
        </div>

        {/* Card 3: Scope 2 Market */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 2: Purchased Power</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#1a5140]"></span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-bold font-heading text-[#00392b] dark:text-white">
              {scope2Tonnes}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
          </div>
          <div className="mt-2 text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between">
            <span>Grid Electricity (CAMX)</span>
            <span className="font-semibold text-amber-600">Market-Based</span>
          </div>
        </div>

        {/* Card 4: Scope 3 Value Chain */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 3: Value Chain & Waste</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#7ed8ab]"></span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-3xl font-bold font-heading text-[#00392b] dark:text-white">
              {scope3Tonnes}
            </span>
            <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
          </div>
          <div className="mt-2 text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center justify-between">
            <span>Water, Logistics & Commute</span>
            <span className="font-semibold text-blue-600">DEFRA 2024</span>
          </div>
        </div>
      </div>

      {/* 3. MULTI-SCOPE EMISSION TRAJECTORY & SBTI PATHWAY (Stitch Screen b96af6) */}
      <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading text-lg font-bold text-[#00392b] dark:text-white tracking-tight">
                Multi-Scope Emission Trajectory & SBTi Pathway
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                1.5°C Aligned
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-1">
              Historical verification against Science-Based Targets 2030 milestone & 2040 Net Zero commitment.
            </p>
          </div>

          {/* Chart Display Controls */}
          <div className="flex items-center bg-[#edfdf2] dark:bg-[#0c1611] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
            <button
              type="button"
              onClick={() => setTrajectoryMode('absolute')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                trajectoryMode === 'absolute' 
                  ? 'bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] shadow-xs' 
                  : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#101e18]'
              }`}
            >
              Absolute tCO₂e
            </button>
            <button
              type="button"
              onClick={() => setTrajectoryMode('revenue')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                trajectoryMode === 'revenue' 
                  ? 'bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] shadow-xs' 
                  : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#101e18]'
              }`}
            >
              tCO₂e / $M Rev
            </button>
            <button
              type="button"
              onClick={() => setTrajectoryMode('fte')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                trajectoryMode === 'fte' 
                  ? 'bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] shadow-xs' 
                  : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#101e18]'
              }`}
            >
              Intensity / FTE
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-[#dcece1] dark:border-[#1e382c]">
          <span className="flex items-center space-x-1.5 text-[#404944] dark:text-[#8cc2ac]">
            <span className="w-3 h-3 rounded-xs bg-[#00392b]"></span>
            <span>Scope 1 (Direct)</span>
          </span>
          <span className="flex items-center space-x-1.5 text-[#404944] dark:text-[#8cc2ac]">
            <span className="w-3 h-3 rounded-xs bg-[#006c49]"></span>
            <span>Scope 2 (Market)</span>
          </span>
          <span className="flex items-center space-x-1.5 text-[#404944] dark:text-[#8cc2ac]">
            <span className="w-3 h-3 rounded-xs bg-[#7ed8ab]"></span>
            <span>Scope 3 (Value Chain)</span>
          </span>
          <span className="flex items-center space-x-1.5 text-red-600 font-semibold">
            <span className="w-3 h-0.5 bg-red-500"></span>
            <span>SBTi 1.5°C Pathway</span>
          </span>
        </div>

        {/* Interactive Trajectory Chart Area */}
        <div className="relative w-full h-64 flex flex-col justify-end pt-4 pb-2 bg-[#edfdf2]/50 dark:bg-[#0c1611]/50 rounded-xl p-4">
          {/* Target Glidepath Line */}
          <div className="absolute inset-x-4 top-[45%] flex items-center z-10 pointer-events-none">
            <div className="w-full border-t border-dashed border-red-500/80"></div>
            <span className="absolute right-4 -top-3 text-red-600 text-[10px] font-bold bg-white dark:bg-[#13241c] px-1.5 py-0.5 rounded shadow-xs">
              SBTi 2024 Target: 40,200 MT
            </span>
          </div>

          {/* Bar Progression Grid */}
          <div className="grid grid-cols-6 h-full items-end gap-4 z-0 pt-6">
            {[
              { year: '2020', s1: 18.4, s2: 24.1, s3: 28.5, label: 'Pre-Initiative' },
              { year: '2021', s1: 16.9, s2: 22.0, s3: 26.2, label: 'Efficiency V1' },
              { year: '2022', s1: 15.2, s2: 19.8, s3: 24.0, label: 'PPA Contracts' },
              { year: '2023', s1: 13.8, s2: 17.5, s3: 21.6, label: 'Audit Baseline' },
              { year: '2024 YTD', s1: 12.4, s2: 14.8, s3: 18.2, label: 'Current Pace', current: true },
              { year: '2030 (SBTi)', s1: 6.2, s2: 4.5, s3: 10.1, label: '-50% Milestone', target: true }
            ].map((col) => (
              <div key={col.year} className="flex flex-col items-center h-full justify-end group relative">
                {col.current && (
                  <div className="absolute -top-6 px-1.5 py-0.5 rounded bg-[#006c49] text-white text-[10px] font-bold shadow-xs">
                    Current YTD
                  </div>
                )}
                <div 
                  className={`w-full max-w-[48px] flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300 group-hover:scale-y-105 origin-bottom ${
                    col.current 
                      ? 'shadow-md ring-2 ring-[#006c49]' 
                      : col.target 
                        ? 'border-2 border-dashed border-emerald-500/60 bg-emerald-50/20' 
                        : 'shadow-xs'
                  }`}
                >
                  <div style={{ height: `${col.s3 * 2.8}px` }} className="bg-[#7ed8ab]" title={`Scope 3: ${col.s3}k MT`}></div>
                  <div style={{ height: `${col.s2 * 2.8}px` }} className="bg-[#006c49]" title={`Scope 2: ${col.s2}k MT`}></div>
                  <div style={{ height: `${col.s1 * 2.8}px` }} className="bg-[#00392b]" title={`Scope 1: ${col.s1}k MT`}></div>
                </div>
                <span className={`text-[11px] mt-2 font-semibold ${col.current ? 'text-[#006c49] dark:text-[#9af5c6]' : 'text-[#404944] dark:text-[#8cc2ac]'}`}>
                  {col.year}
                </span>
                <span className="text-[9px] text-[#707974] dark:text-[#8cc2ac]/70">{col.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. TWO-COLUMN: SCOPE 3 CATEGORY COMPOSITION + FACTOR LINEAGE & CRYPTOGRAPHY (Stitch Screen b96af6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Scope 3 Category Composition (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h2 className="font-heading text-base sm:text-lg font-bold text-[#00392b] dark:text-white">
                Scope 3 Category Composition & Supplier Primary Coverage
              </h2>
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] font-semibold">
                  15 Categories Assessed
                </span>
                <span className="px-2 py-0.5 rounded bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] font-bold">
                  78.4% Primary Data
                </span>
              </div>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-4">
              Lineage breakdown across upstream and downstream boundaries per GHG Protocol Scope 3 Standard.
            </p>

            {/* Scope 3 Category Bars */}
            <div className="space-y-3">
              {[
                { cat: 'Cat 1: Purchased Goods & Services', pct: 58, mt: '24,830 MT', coverage: '84% Primary EPD', color: 'bg-[#00392b]' },
                { cat: 'Cat 4: Upstream Transportation & Dist.', pct: 22, mt: '9,418 MT', coverage: '94% Telematics', color: 'bg-[#006c49]' },
                { cat: 'Cat 2: Capital Goods (Machinery & IT)', pct: 8, mt: '3,424 MT', coverage: '68% Spend-Modelled', color: 'bg-[#336856]' },
                { cat: 'Cat 3: Fuel- & Energy-Related Activities', pct: 6, mt: '2,568 MT', coverage: '99% Sub-metered', color: 'bg-[#5ca87c]' },
                { cat: 'Cat 6: Business Travel', pct: 4, mt: '1,712 MT', coverage: '98% Corporate Card', color: 'bg-[#7ed8ab]' },
                { cat: 'Cat 7 & 11: Employee Commute & Product Use', pct: 2, mt: '856 MT', coverage: '72% Commuter Survey', color: 'bg-[#9bd2bc]' }
              ].map((item) => (
                <div key={item.cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#101e18] dark:text-white">{item.cat}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-[#00392b] dark:text-white">{item.mt}</span>
                      <span className="text-[#404944] dark:text-[#8cc2ac] text-[11px] w-8 text-right font-semibold">{item.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                  <div className="flex justify-end text-[10px] text-[#006c49] dark:text-[#9af5c6] font-medium">
                    <span>{item.coverage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac]">
            <span>Methodology: Hybrid Supplier-Specific + Quantified Activity Data</span>
            <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">ISO 14064-1 Compliant</span>
          </div>
        </div>

        {/* Right: Factor Lineage & Cryptography + Methodology Hierarchy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Factor Lineage & Cryptography Card */}
          <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-[#006c49] dark:text-[#9af5c6]" />
                <h3 className="font-heading text-base font-bold text-[#00392b] dark:text-white">
                  Factor Lineage & Cryptography
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                Audit Ready
              </span>
            </div>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac]">
              Every emission calculation is cryptographically pinned to verified public factor databases and ISO 14025 EPD documents.
            </p>

            {/* Cryptographic Lineage Records */}
            <div className="space-y-2">
              <div className="p-3 bg-[#edfdf2] dark:bg-[#0c1611] rounded-xl space-y-1 border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">DE Grid Residual Mix (BNetzA)</span>
                  <span className="font-mono text-[#006c49] dark:text-[#9af5c6] font-bold">0.284 kgCO₂e/kWh</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Version: 2024.1 • Released Q1 2024</span>
                  <span className="font-mono text-[#00392b] dark:text-emerald-400 font-semibold">Hash: 7a8f...904b</span>
                </div>
              </div>

              <div className="p-3 bg-[#edfdf2] dark:bg-[#0c1611] rounded-xl space-y-1 border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">DEFRA Freight Logistics (v1.2)</span>
                  <span className="font-mono text-[#006c49] dark:text-[#9af5c6] font-bold">0.082 kgCO₂e/t-km</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Well-To-Wheel Included (WTW)</span>
                  <span className="font-mono text-[#00392b] dark:text-emerald-400 font-semibold">Hash: e12b...449c</span>
                </div>
              </div>

              <div className="p-3 bg-[#edfdf2] dark:bg-[#0c1611] rounded-xl space-y-1 border border-[#dcece1] dark:border-[#1e382c]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#101e18] dark:text-white">Supplier EPD: Microchip Fab-Taiwan</span>
                  <span className="font-mono text-[#006c49] dark:text-[#9af5c6] font-bold">14.2 kgCO₂e/unit</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                  <span>Third-Party Assured: DNV GL</span>
                  <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">Verified EPD</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs">
              <span className="text-[#404944] dark:text-[#8cc2ac]">Merkle Root Sequence:</span>
              <span className="font-mono text-xs font-bold text-[#00392b] dark:text-[#9af5c6]">0x55dc...a199</span>
            </div>
          </div>

          {/* Methodology Hierarchy */}
          <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-[#00392b] dark:text-white">
                Methodology Hierarchy
              </h3>
              <span className="text-xs font-semibold text-[#404944] dark:text-[#8cc2ac]">GHG Tiers 1-3</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#101e18] dark:text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#00392b] mr-1.5"></span>
                    Direct Metered (IoT/BMS Telemetry)
                  </span>
                  <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6]">64.2%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="bg-[#00392b] h-full rounded-full" style={{ width: '64.2%' }}></div>
                </div>
                <p className="text-[10px] text-[#404944] dark:text-[#8cc2ac] mt-0.5">High precision: Smart utility revenue meters, building management APIs.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#101e18] dark:text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#006c49] mr-1.5"></span>
                    Supplier EPD & Invoices
                  </span>
                  <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6]">26.5%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="bg-[#006c49] h-full rounded-full" style={{ width: '26.5%' }}></div>
                </div>
                <p className="text-[10px] text-[#404944] dark:text-[#8cc2ac] mt-0.5">Medium precision: Tier-1 verified supplier attestations.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[#101e18] dark:text-white flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#7ed8ab] mr-1.5"></span>
                    Secondary Spend-Based
                  </span>
                  <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6]">9.3%</span>
                </div>
                <div className="w-full h-1.5 bg-[#e1f2e7] dark:bg-[#1e382c] rounded-full overflow-hidden">
                  <div className="bg-[#7ed8ab] h-full rounded-full" style={{ width: '9.3%' }}></div>
                </div>
                <p className="text-[10px] text-[#404944] dark:text-[#8cc2ac] mt-0.5">Estimated: EXIOBASE / DEFRA econometric spend factors.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. GRANULAR ACTIVITY RECORDS & SOURCE PROVENANCE (Stitch Screen b96af6) */}
      <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white">
              Granular Activity Records & Source Provenance
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac]">
              Filterable transaction ledger with real-time metering, factor attribution and audit status.
            </p>
          </div>

          {/* Scope Navigation Tabs */}
          <div className="flex items-center space-x-1 bg-[#edfdf2] dark:bg-[#0c1611] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
            {['All', 'Scope 1', 'Scope 2', 'Scope 3'].map((scope) => (
              <button
                key={scope}
                onClick={() => setActiveScopeTab(scope)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeScopeTab === scope
                    ? 'bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] font-bold shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#101e18]'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#404944] dark:text-[#8cc2ac]" />
            <input
              type="text"
              placeholder="Search records, categories, facilities, provenance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white placeholder-[#707974] focus:outline-none focus:border-[#006c49]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white text-xs font-semibold focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Measured">Measured (IoT/Smart Meter)</option>
              <option value="Calculated">Calculated (Invoices)</option>
              <option value="Estimated">Estimated (Survey/Model)</option>
            </select>
          </div>
        </div>

        {/* Activity Records Table */}
        <div className="overflow-x-auto rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#edfdf2]/70 dark:bg-[#0c1611]/70 text-[#404944] dark:text-[#8cc2ac] uppercase font-semibold text-[10px] tracking-wider border-b border-[#dcece1] dark:border-[#1e382c]">
              <tr>
                <th className="px-4 py-3">Record ID & Date</th>
                <th className="px-4 py-3">Facility</th>
                <th className="px-4 py-3">Scope & Category</th>
                <th className="px-4 py-3 text-right">Activity Volume</th>
                <th className="px-4 py-3 text-right">Calculated CO₂e</th>
                <th className="px-4 py-3">Provenance Source</th>
                <th className="px-4 py-3 text-center">Confidence</th>
                <th className="px-4 py-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-[#404944] dark:text-[#8cc2ac]">
                    No activity records found matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#edfdf2]/50 dark:hover:bg-[#162d22]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-[#101e18] dark:text-white">{rec.id}</div>
                      <div className="text-[11px] text-[#404944] dark:text-[#8cc2ac]">{rec.date}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#101e18] dark:text-white">
                      {rec.site}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mr-1.5 ${
                        rec.scope === 'Scope 1' ? 'bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]' :
                        rec.scope === 'Scope 2' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300' :
                        'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300'
                      }`}>
                        {rec.scope}
                      </span>
                      <span className="text-[#101e18] dark:text-gray-200">{rec.category}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium">
                      {rec.value.toLocaleString()} <span className="text-[#404944] dark:text-[#8cc2ac] text-[11px]">{rec.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6]">
                        {rec.co2eTonnes}
                      </span>{' '}
                      <span className="text-[#404944] dark:text-[#8cc2ac] text-[11px]">tCO₂e</span>
                    </td>
                    <td className="px-4 py-3 text-[#404944] dark:text-[#8cc2ac]">
                      {rec.source}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono font-bold text-xs text-[#006c49] dark:text-[#9af5c6]">
                        {rec.confidence}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        rec.status === 'Measured' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300' :
                        rec.status === 'Calculated' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300' :
                        'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                      }`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. EMISSION FACTORS LIBRARY REFERENCE */}
      <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl border border-[#dcece1] dark:border-[#1e382c] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
              Active Emission Factor Library
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac]">
              Configurable emission factors with geography, reporting year, and publisher metadata.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c]">
            EPA & DEFRA Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMISSION_FACTORS.map((ef) => (
            <div 
              key={ef.id}
              className="p-4 rounded-xl bg-[#edfdf2] dark:bg-[#0c1611] border border-[#dcece1] dark:border-[#1e382c]"
            >
              <div className="text-[10px] uppercase font-bold text-[#006c49] dark:text-[#9af5c6] mb-1">{ef.category}</div>
              <div className="font-bold text-xs text-[#101e18] dark:text-white mb-2">{ef.name}</div>
              <div className="text-lg font-mono font-bold text-[#00392b] dark:text-white mb-2">
                {ef.value}{' '}
                <span className="text-xs font-normal text-[#404944] dark:text-[#8cc2ac]">{ef.unit}</span>
              </div>
              <div className="pt-2 border-t border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                <span>Source: {ef.source}</span>
                <span>{ef.geography} ({ef.year})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default CarbonIntelligence;
