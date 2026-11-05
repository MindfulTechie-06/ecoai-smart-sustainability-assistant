import { useState, useMemo } from 'react';
import { 
  Search, 
  Download, 
  Database, 
  Calculator,
  ShieldCheck
} from 'lucide-react';
import { EMISSION_FACTORS, ACTIVITY_RECORDS } from '../data/mockData';
import { exportToCSV } from '../utils/carbonEngine';

const CarbonIntelligence = ({ records = ACTIVITY_RECORDS, selectedSite }) => {
  const [activeScopeTab, setActiveScopeTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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
    <div className="w-full space-y-6 pb-12 font-sans">
      <div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#00392b] dark:text-white">
                Carbon Intelligence Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mt-1">
              Deterministic GHG Protocol accounting across Scope 1, Scope 2, and Scope 3 activity streams.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
              <span>Export Activity CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Scope Summary Cards (Google Stitch Screen 2 Design Standard) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Gross Footprint */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Gross Footprint (S1+S2)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1a5140]"></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {Number((scope1Tonnes + scope2Tonnes).toFixed(2))}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-2 text-[11px] text-[#247A55] dark:text-[#38C48B] font-medium flex items-center justify-between">
              <span>-6.4% vs baseline</span>
              <span className="text-[#66756B]">Primary Operations</span>
            </div>
          </div>

          {/* Card 2: Scope 1 Direct */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 1: Direct Combustion</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#247A55]"></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {scope1Tonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-2 text-[11px] text-[#66756B] dark:text-[#96A59C] flex items-center justify-between">
              <span>Stationary Gas & Fleet</span>
              <span className="font-medium text-[#247A55]">EPA Mandatory</span>
            </div>
          </div>

          {/* Card 3: Scope 2 Market */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 2: Purchased Power</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {scope2Tonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-2 text-[11px] text-[#66756B] dark:text-[#96A59C] flex items-center justify-between">
              <span>Grid Electricity (CAMX)</span>
              <span className="font-medium text-amber-600">Market-Based</span>
            </div>
          </div>

          {/* Card 4: Scope 3 Value Chain */}
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] dark:text-[#96A59C] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Scope 3: Value Chain & Waste</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#7ed8ab]"></span>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {scope3Tonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e</span>
            </div>
            <div className="mt-2 text-[11px] text-[#66756B] dark:text-[#96A59C] flex items-center justify-between">
              <span>Water, Landfill & Logistics</span>
              <span className="font-medium text-blue-600">DEFRA 2024</span>
            </div>
          </div>
        </div>

        {/* Calculation Methodology & Provenance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase text-[#66756B] tracking-wider">Calculation Standard</span>
              <Calculator className="w-4 h-4 text-[#247A55]" />
            </div>
            <div className="text-base font-bold font-mono text-[#17251E] dark:text-white">
              CO₂e = Activity × Emission Factor
            </div>
            <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-2">
              Deterministic conversions per GHG Protocol Corporate Accounting Standard. No numerical hallucination.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase text-[#66756B] tracking-wider">Data Provenance Breakdown</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center space-x-3 text-xs font-semibold text-[#17251E] dark:text-white mt-1">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">68% Measured</span>
              <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded">22% Calculated</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">10% Estimated</span>
            </div>
            <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-2">
              Every data record maintains source traceability, uncertainty margins and metering logs.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase text-[#66756B] tracking-wider">Filtered Inventory Total</span>
              <Database className="w-4 h-4 text-[#247A55]" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {totalTonnes}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e ({filteredRecords.length} records)</span>
            </div>
            <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-2">
              Active ledger view reflects real-time activity filters and facility scope.
            </p>
          </div>
        </div>

        {/* Scope Tabs & Search Filter Controls */}
        <div className="stitch-card p-4 bg-white dark:bg-[#15221C] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Scope Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-[#F6F8F6] dark:bg-[#0E1713] p-1 rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
              {['All', 'Scope 1', 'Scope 2', 'Scope 3'].map((scope) => (
                <button
                  key={scope}
                  onClick={() => setActiveScopeTab(scope)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeScopeTab === scope
                      ? 'bg-white dark:bg-[#1A2A22] text-[#247A55] dark:text-[#38C48B] font-semibold shadow-sm'
                      : 'text-[#66756B] dark:text-[#96A59C] hover:text-[#17251E]'
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>

            {/* Search & Status Filters */}
            <div className="flex items-center space-x-3 text-xs">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#66756B]" />
                <input
                  type="text"
                  placeholder="Search records, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none focus:border-[#247A55]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Measured">Measured (IoT/Smart Meter)</option>
                <option value="Calculated">Calculated (Invoices)</option>
                <option value="Estimated">Estimated (Survey/Model)</option>
              </select>
            </div>

          </div>

          {/* Activity Records Table */}
          <div className="overflow-x-auto rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F8F6] dark:bg-[#0E1713] text-[#66756B] dark:text-[#96A59C] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E6ECE7] dark:border-[#23362C]">
                <tr>
                  <th className="px-4 py-3">Record ID & Date</th>
                  <th className="px-4 py-3">Facility</th>
                  <th className="px-4 py-3">Scope & Category</th>
                  <th className="px-4 py-3">Activity Volume</th>
                  <th className="px-4 py-3">Calculated CO₂e</th>
                  <th className="px-4 py-3">Provenance</th>
                  <th className="px-4 py-3">Data Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6ECE7] dark:divide-[#23362C] bg-white dark:bg-[#15221C]">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-[#66756B] dark:text-[#96A59C]">
                      No activity records found matching the active filters.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-mono font-semibold text-[#17251E] dark:text-white">{rec.id}</div>
                        <div className="text-[11px] text-[#66756B]">{rec.date}</div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#17251E] dark:text-white">
                        {rec.site}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold mr-1.5 ${
                          rec.scope === 'Scope 1' ? 'bg-[#DDF3E5] text-[#247A55]' :
                          rec.scope === 'Scope 2' ? 'bg-amber-100 text-amber-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.scope}
                        </span>
                        <span className="text-[#17251E] dark:text-gray-200">{rec.category}</span>
                      </td>
                      <td className="px-4 py-3 font-mono">
                        {rec.value.toLocaleString()} <span className="text-[#66756B]">{rec.unit}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-[#247A55] dark:text-[#38C48B]">
                          {rec.co2eTonnes}
                        </span>{' '}
                        <span className="text-[#66756B] text-[11px]">tCO₂e</span>
                      </td>
                      <td className="px-4 py-3 text-[#66756B] dark:text-[#96A59C]">
                        {rec.source}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          rec.status === 'Measured' ? 'bg-emerald-100 text-emerald-800' :
                          rec.status === 'Calculated' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {rec.status} ({rec.confidence})
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Emission Factors Library Reference */}
        <div className="stitch-card p-6 bg-white dark:bg-[#15221C]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                Active Emission Factor Library
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Configurable emission factors with geography, reporting year, and publisher metadata.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DDF3E5] text-[#247A55]">
              EPA & DEFRA Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMISSION_FACTORS.map((ef) => (
              <div 
                key={ef.id}
                className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]"
              >
                <div className="text-[10px] uppercase font-bold text-[#247A55] mb-1">{ef.category}</div>
                <div className="font-semibold text-xs text-[#17251E] dark:text-white mb-2">{ef.name}</div>
                <div className="text-lg font-mono font-bold text-[#17251E] dark:text-white mb-2">
                  {ef.value}{' '}
                  <span className="text-xs font-normal text-[#66756B]">{ef.unit}</span>
                </div>
                <div className="pt-2 border-t border-[#E6ECE7] dark:border-[#23362C] flex items-center justify-between text-[11px] text-[#66756B]">
                  <span>Source: {ef.source}</span>
                  <span>{ef.geography} ({ef.year})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarbonIntelligence;
