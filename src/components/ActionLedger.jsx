import { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  ShieldCheck, 
  Clock, 
  DollarSign
} from 'lucide-react';
import { ACTION_LEDGER_ENTRIES } from '../data/mockData';
import { exportToCSV } from '../utils/carbonEngine';
import PageHeader from './PageHeader';

const ActionLedger = ({ ledgerEntries = ACTION_LEDGER_ENTRIES, selectedSite }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = useMemo(() => {
    return ledgerEntries.filter(entry => {
      const matchStatus = statusFilter === 'All' || entry.status.toLowerCase().includes(statusFilter.toLowerCase());
      const matchSite = selectedSite === 'all' || entry.site.toLowerCase().includes(selectedSite.replace('site-0', 'site 0'));
      const matchSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSite && matchSearch;
    });
  }, [ledgerEntries, statusFilter, selectedSite, searchTerm]);

  // Aggregate stats separating predicted vs measured
  const totals = useMemo(() => {
    const predicted = filteredEntries.reduce((sum, e) => sum + (e.predictedSavingsTonnesCO2 || 0), 0);
    const measured = filteredEntries.reduce((sum, e) => sum + (e.measuredSavingsTonnesCO2 || 0), 0);
    const budget = filteredEntries.reduce((sum, e) => sum + (e.costBudgeted || 0), 0);
    const actual = filteredEntries.reduce((sum, e) => sum + (e.costActual || 0), 0);
    return {
      predicted: Number(predicted.toFixed(1)),
      measured: Number(measured.toFixed(1)),
      budget,
      actual
    };
  }, [filteredEntries]);

  const handleExportCSV = () => {
    exportToCSV(`EchoAI_Action_Ledger_${new Date().toISOString().split('T')[0]}`, filteredEntries);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Standardized Section Header */}
      <PageHeader
        badge="Audited Double-Entry Ledger"
        title="Action Ledger & Verification Audit"
        description="Immutable operational audit trail strictly separating predicted impact from verified measured outcomes."
        actions={
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
            <span>Export Ledger CSV</span>
          </button>
        }
      />

      <div>

        {/* Separation of Predicted vs Measured Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Modeled Predicted Savings</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                {totals.predicted}
              </span>
              <span className="text-xs text-[#66756B]">tCO₂e / yr</span>
            </div>
            <p className="text-xs text-[#66756B] mt-2">
              Ex-ante engineering models across {filteredEntries.length} projects.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#247A55]/40 bg-[#DDF3E5]/10">
            <div className="flex items-center justify-between text-xs text-[#247A55] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Verified Measured Reductions</span>
              <ShieldCheck className="w-4 h-4 text-[#247A55]" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#247A55] dark:text-[#38C48B]">
                {totals.measured}
              </span>
              <span className="text-xs text-[#247A55]">tCO₂e verified</span>
            </div>
            <p className="text-xs text-[#247A55] mt-2 font-medium">
              Empirically audited via smart meters & utility weight receipts.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Allocated Capex Budget</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                ${totals.budget.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#66756B] mt-2">
              Approved decarbonization capital.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
            <div className="flex items-center justify-between text-xs text-[#66756B] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Actual Expenditure</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#17251E] dark:text-white">
                ${totals.actual.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#66756B] mt-2">
              Actual disbursed implementation costs.
            </p>
          </div>

        </div>

        {/* Ledger Table */}
        <div className="stitch-card p-5 bg-white dark:bg-[#15221C] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-[#66756B]">Status:</span>
              {['All', 'Verified', 'In Progress', 'Approved'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    statusFilter === status 
                      ? 'bg-[#247A55] text-white font-semibold' 
                      : 'bg-[#F6F8F6] dark:bg-[#0E1713] text-[#66756B]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative sm:w-64 text-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#66756B]" />
              <input
                type="text"
                placeholder="Search action entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
              />
            </div>

          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F8F6] dark:bg-[#0E1713] text-[#66756B] dark:text-[#96A59C] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E6ECE7] dark:border-[#23362C]">
                <tr>
                  <th className="px-4 py-3">Action ID & Initiative</th>
                  <th className="px-4 py-3">Facility</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Predicted (tCO₂e)</th>
                  <th className="px-4 py-3 text-right">Measured (tCO₂e)</th>
                  <th className="px-4 py-3 text-right">Variance</th>
                  <th className="px-4 py-3">Verification Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6ECE7] dark:divide-[#23362C] bg-white dark:bg-[#15221C]">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22] transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold text-[#17251E] dark:text-white">{entry.id}</div>
                      <div className="text-xs font-medium text-[#17251E] dark:text-gray-200">{entry.title}</div>
                      <div className="text-[11px] text-[#66756B]">{entry.category}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#17251E] dark:text-white">
                      {entry.site}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        entry.status.includes('Verified') ? 'bg-emerald-100 text-emerald-800' :
                        entry.status.includes('Progress') ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-[#66756B]">
                      {entry.predictedSavingsTonnesCO2} t
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[#247A55] dark:text-[#38C48B]">
                      {entry.measuredSavingsTonnesCO2} t
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs">
                      {entry.variancePercent}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[#17251E] dark:text-gray-200">{entry.auditor}</div>
                      <div className="text-[10px] text-[#66756B]">{entry.verificationMethod}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActionLedger;
