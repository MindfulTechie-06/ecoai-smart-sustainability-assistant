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
          <div className="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] text-[11px] text-[#404944] dark:text-[#8cc2ac] shadow-xs">
            <span className="font-semibold text-[#00392b] dark:text-white">Scoring Formula: </span>
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
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-[#00392b] text-white shadow-xs'
                  : 'bg-white dark:bg-[#13241c] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
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
                className="stitch-card p-6 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] flex flex-col justify-between space-y-5"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center space-x-2 text-[11px] text-[#66756B] mb-1">
                        <span className="font-mono font-bold text-[#247A55]">{rec.id}</span>
                        <span>•</span>
                        <span>{rec.site}</span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {rec.scopeImpact}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#17251E] dark:text-white leading-snug">
                        {rec.title}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-[10px] uppercase font-bold text-[#66756B]">Priority Score</div>
                      <div className="text-xl font-mono font-extrabold text-[#247A55] dark:text-[#38C48B]">
                        {rec.priorityScore}
                        <span className="text-xs font-normal text-[#66756B]">/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Problem & Explanation */}
                  <div className="space-y-2 text-xs text-[#66756B] dark:text-[#96A59C] leading-relaxed mb-4">
                    <p><strong className="text-[#17251E] dark:text-gray-200">Problem Identified:</strong> {rec.problemIdentified}</p>
                    <p><strong className="text-[#17251E] dark:text-gray-200">Proposed Action:</strong> {rec.explanation}</p>
                  </div>

                  {/* Metrics Badge Grid */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] text-center">
                    <div className="p-2 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Carbon Cut</div>
                      <div className="text-xs font-bold text-[#247A55] dark:text-[#38C48B]">
                        -{rec.carbonSavingsTonnesYr} t/yr
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Cost / Capex</div>
                      <div className="text-xs font-bold text-[#17251E] dark:text-white">
                        ${(rec.costUSD || 0).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Payback</div>
                      <div className="text-xs font-bold text-amber-600">
                        {rec.paybackYears} yrs
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Feasibility</div>
                      <div className="text-xs font-bold text-blue-600">
                        {rec.feasibility}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Controls */}
                <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[#66756B] text-[11px]">Current Status:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isImplemented ? 'bg-emerald-100 text-emerald-800' :
                      isInProgress ? 'bg-blue-100 text-blue-800' :
                      isApproved ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {rec.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {rec.status === 'Proposed' && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(rec.id, 'Approved')}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onUpdateStatus(rec.id, 'Rejected')}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-all"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {rec.status === 'Approved' && (
                      <button
                        onClick={() => onUpdateStatus(rec.id, 'In Progress')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center space-x-1"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Start Work</span>
                      </button>
                    )}

                    {rec.status === 'In Progress' && (
                      <button
                        onClick={() => onUpdateStatus(rec.id, 'Implemented')}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] transition-all flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Implemented</span>
                      </button>
                    )}

                    {rec.status === 'Implemented' && (
                      <span className="text-xs font-semibold text-[#247A55] flex items-center">
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
