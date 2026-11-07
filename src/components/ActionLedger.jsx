import { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  ShieldCheck, 
  DollarSign, 
  Clock 
} from 'lucide-react';
import { ACTION_LEDGER_ENTRIES } from '../data/mockData';
import { exportToCSV } from '../utils/carbonEngine';

const ActionLedger = ({ ledgerEntries = ACTION_LEDGER_ENTRIES, selectedSite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter entries
  const filteredEntries = useMemo(() => {
    return ledgerEntries.filter(entry => {
      const matchSite = selectedSite === 'all' || entry.site.toLowerCase().includes(selectedSite.replace('site-0', 'site 0'));
      const matchStatus = statusFilter === 'All' || entry.status === statusFilter;
      const matchSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          entry.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSite && matchStatus && matchSearch;
    });
  }, [ledgerEntries, selectedSite, statusFilter, searchTerm]);

  // Aggregate totals
  const totals = useMemo(() => {
    return filteredEntries.reduce(
      (acc, entry) => {
        acc.predicted += entry.predictedSavingsTonnesCO2 || 0;
        acc.measured += entry.measuredSavingsTonnesCO2 || 0;
        acc.budget += entry.costBudgeted || 0;
        acc.actual += entry.costActual || 0;
        return acc;
      },
      { predicted: 0, measured: 0, budget: 0, actual: 0 }
    );
  }, [filteredEntries]);

  const handleExportCSV = () => {
    exportToCSV(`EchoAI_Action_Ledger_${new Date().toISOString().split('T')[0]}`, filteredEntries);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Verification Ledger Sub-Section Header */}
      <div className="w-full pb-5 border-b border-[#DCE8E0] dark:border-[#244538] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#0C956B] dark:bg-[#20B982] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#075B43] dark:text-[#8BE7BD] bg-[#EDF3EF] dark:bg-[#173329] px-2 py-0.5 rounded border border-[#DCE8E0] dark:border-[#244538]">
              Audited Double-Entry Ledger
            </span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#14251D] dark:text-[#F2F8F4]">
            Action Ledger & Verification Audit
          </h2>
          <p className="text-xs text-[#64766B] dark:text-[#9AB9A8]">
            Immutable operational audit trail strictly separating predicted impact from verified measured outcomes.
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#14251D] dark:text-[#F2F8F4] bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] hover:bg-[#EDF3EF] dark:hover:bg-[#173329] shadow-xs transition-all shrink-0 self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
        >
          <Download className="w-3.5 h-3.5 text-[#075B43] dark:text-[#20B982]" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      <div>

        {/* Separation of Predicted vs Measured Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="stitch-card p-5 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538]">
            <div className="flex items-center justify-between text-xs text-[#64766B] dark:text-[#9AB9A8] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Modeled Predicted Savings</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#14251D] dark:text-[#F2F8F4]">
                {totals.predicted}
              </span>
              <span className="text-xs text-[#64766B] dark:text-[#9AB9A8]">tCO₂e / yr</span>
            </div>
            <p className="text-xs text-[#64766B] dark:text-[#9AB9A8] mt-2">
              Ex-ante engineering models across {filteredEntries.length} projects.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#12271D] border border-[#0C956B]/40 dark:border-[#20B982]/40 bg-[#E5F5EC]/30 dark:bg-[#173329]/30">
            <div className="flex items-center justify-between text-xs text-[#075B43] dark:text-[#20B982] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Verified Measured Reductions</span>
              <ShieldCheck className="w-4 h-4 text-[#075B43] dark:text-[#20B982]" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#075B43] dark:text-[#20B982]">
                {totals.measured}
              </span>
              <span className="text-xs text-[#075B43] dark:text-[#20B982]">tCO₂e verified</span>
            </div>
            <p className="text-xs text-[#075B43] dark:text-[#8BE7BD] mt-2 font-medium">
              Empirically audited via smart meters & utility weight receipts.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538]">
            <div className="flex items-center justify-between text-xs text-[#64766B] dark:text-[#9AB9A8] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Allocated Capex Budget</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#14251D] dark:text-[#F2F8F4]">
                ${totals.budget.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#64766B] dark:text-[#9AB9A8] mt-2">
              Approved decarbonization capital.
            </p>
          </div>

          <div className="stitch-card p-5 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538]">
            <div className="flex items-center justify-between text-xs text-[#64766B] dark:text-[#9AB9A8] mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Actual Expenditure</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold font-heading text-[#14251D] dark:text-[#F2F8F4]">
                ${totals.actual.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#64766B] dark:text-[#9AB9A8] mt-2">
              Actual disbursed implementation costs.
            </p>
          </div>

        </div>

        {/* Ledger Table */}
        <div className="stitch-card p-5 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] space-y-4 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-[#64766B] dark:text-[#9AB9A8]">Status:</span>
              {['All', 'Verified', 'In Progress', 'Approved'].map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] ${
                    statusFilter === status 
                      ? 'bg-[#075B43] dark:bg-[#20B982] text-white dark:text-[#081710] font-semibold shadow-xs' 
                      : 'bg-[#F5F8F6] dark:bg-[#0C1D15] text-[#64766B] dark:text-[#9AB9A8] border border-[#DCE8E0] dark:border-[#244538]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="relative sm:w-64 text-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#87968C] dark:text-[#6E8D7D]" />
              <input
                type="text"
                placeholder="Search action entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538] text-[#14251D] dark:text-[#F2F8F4] placeholder-[#87968C] dark:placeholder-[#6E8D7D] focus:outline-none focus:border-[#075B43]"
              />
            </div>

          </div>

          <div className="overflow-x-auto rounded-xl border border-[#DCE8E0] dark:border-[#244538]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F8F6] dark:bg-[#0C1D15] text-[#64766B] dark:text-[#9AB9A8] uppercase font-semibold text-[10px] tracking-wider border-b border-[#DCE8E0] dark:border-[#244538]">
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
              <tbody className="divide-y divide-[#DCE8E0] dark:divide-[#244538] bg-white dark:bg-[#12271D]">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#EDF3EF]/60 dark:hover:bg-[#173329]/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-mono font-semibold text-[#14251D] dark:text-[#F2F8F4]">{entry.id}</div>
                      <div className="text-xs font-medium text-[#14251D] dark:text-[#F2F8F4]">{entry.title}</div>
                      <div className="text-[11px] text-[#64766B] dark:text-[#9AB9A8]">{entry.category}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#14251D] dark:text-[#F2F8F4]">
                      {entry.site}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        entry.status.includes('Verified') ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' :
                        entry.status.includes('Progress') ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300' :
                        'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-[#64766B] dark:text-[#9AB9A8]">
                      {entry.predictedSavingsTonnesCO2} t
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-[#075B43] dark:text-[#20B982]">
                      {entry.measuredSavingsTonnesCO2} t
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-[#14251D] dark:text-[#F2F8F4]">
                      {entry.variancePercent}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[#14251D] dark:text-[#F2F8F4]">{entry.auditor}</div>
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">{entry.verificationMethod}</div>
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
