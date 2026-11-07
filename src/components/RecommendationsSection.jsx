import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  PlayCircle, 
  Check 
} from 'lucide-react';
import { ACTION_RECOMMENDATIONS } from '../data/mockData';
import PageHeader from './PageHeader';

const RecommendationsSection = ({ recommendations, onUpdateStatus, selectedSite }) => {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredRecs = (recommendations || ACTION_RECOMMENDATIONS).filter(rec => {
    const matchStatus = filterStatus === 'All' || rec.status === filterStatus;
    const matchSite = selectedSite === 'all' || rec.site.toLowerCase().includes(selectedSite.replace('site-0', 'site 0'));
    return matchStatus && matchSite;
  });

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Standardized Page Header */}
      <PageHeader
        badge="MACC Decarbonization Pipeline"
        title="Action Engine & Ledger"
        description="Deterministic priority ranking combining carbon savings, economic payback, and immutable audit verification across operations."
        actions={
          <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] text-[11px] text-[#64766B] dark:text-[#9AB9A8] shadow-xs">
            <span className="font-semibold text-[#14251D] dark:text-[#F2F8F4]">Scoring Formula: </span>
            0.40 × Carbon + 0.30 × Payback + 0.15 × Feasibility + 0.15 × Confidence
          </div>
        }
      />

      <div className="space-y-6">

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          {['All', 'Proposed', 'Approved', 'In Progress', 'Implemented'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43] ${
                filterStatus === status
                  ? 'bg-[#075B43] dark:bg-[#20B982] text-white dark:text-[#081710] shadow-xs'
                  : 'bg-white dark:bg-[#12271D] text-[#64766B] dark:text-[#9AB9A8] border border-[#DCE8E0] dark:border-[#244538] hover:bg-[#EDF3EF] dark:hover:bg-[#173329]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Recommendations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecs.map((rec) => {
            const isApproved = rec.status === 'Approved';
            const isInProgress = rec.status === 'In Progress';
            const isImplemented = rec.status === 'Implemented';

            return (
              <motion.div
                key={rec.id}
                layout
                className="stitch-card p-6 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] flex flex-col justify-between space-y-5 shadow-xs"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center space-x-2 text-[11px] text-[#64766B] dark:text-[#9AB9A8] mb-1">
                        <span className="font-mono font-bold text-[#075B43] dark:text-[#20B982]">{rec.id}</span>
                        <span>•</span>
                        <span>{rec.site}</span>
                        <span>•</span>
                        <span className="font-semibold text-[#075B43] dark:text-[#20B982] bg-[#E5F5EC] dark:bg-[#173329] px-1.5 py-0.5 rounded border border-[#DCE8E0] dark:border-[#244538]">
                          {rec.scopeImpact}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#14251D] dark:text-[#F2F8F4] leading-snug">
                        {rec.title}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-[10px] uppercase font-bold text-[#87968C] dark:text-[#6E8D7D]">Priority Score</div>
                      <div className="text-xl font-mono font-extrabold text-[#075B43] dark:text-[#20B982]">
                        {rec.priorityScore}
                        <span className="text-xs font-normal text-[#64766B] dark:text-[#9AB9A8]">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Problem & Explanation */}
                  <div className="space-y-2 text-xs text-[#64766B] dark:text-[#9AB9A8] leading-relaxed mb-4">
                    <p><strong className="text-[#14251D] dark:text-[#F2F8F4]">Problem Identified:</strong> {rec.problemIdentified}</p>
                    <p><strong className="text-[#14251D] dark:text-[#F2F8F4]">Proposed Action:</strong> {rec.explanation}</p>
                  </div>

                  {/* Metrics Badge Grid */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#DCE8E0] dark:border-[#244538] text-center">
                    <div className="p-2 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Carbon Cut</div>
                      <div className="text-xs font-bold text-[#075B43] dark:text-[#20B982]">
                        -{rec.carbonSavingsTonnesYr} t/yr
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Cost / Capex</div>
                      <div className="text-xs font-bold text-[#14251D] dark:text-[#F2F8F4]">
                        ${(rec.costUSD || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Payback</div>
                      <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                        {rec.paybackYears} yrs
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Feasibility</div>
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        {rec.feasibility}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Controls */}
                <div className="pt-3 border-t border-[#DCE8E0] dark:border-[#244538] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#64766B] dark:text-[#9AB9A8] text-[11px]">Current Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isImplemented ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300' :
                      isInProgress ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300' :
                      isApproved ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300' :
                      'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {rec.status === 'Proposed' && (
                      <>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(rec.id, 'Approved')}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#075B43] hover:bg-[#0C956B] dark:bg-[#20B982] dark:hover:bg-[#0C956B] dark:text-[#081710] transition-all"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(rec.id, 'Rejected')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {rec.status === 'Approved' && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(rec.id, 'In Progress')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center space-x-1"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Start Work</span>
                      </button>
                    )}

                    {rec.status === 'In Progress' && (
                      <button
                        type="button"
                        onClick={() => onUpdateStatus(rec.id, 'Implemented')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#075B43] hover:bg-[#0C956B] dark:bg-[#20B982] dark:hover:bg-[#0C956B] dark:text-[#081710] transition-all flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Implemented</span>
                      </button>
                    )}

                    {rec.status === 'Implemented' && (
                      <span className="text-xs font-semibold text-[#075B43] dark:text-[#20B982] flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Verified Complete
                      </span>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default RecommendationsSection;
