import { useState } from 'react';
import { 
  Clock, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { AI_INSIGHTS } from '../data/mockData';
import PageHeader from './PageHeader';

const AiInsightsSection = ({ onPromoteToAction }) => {
  const [selectedInsight, setSelectedInsight] = useState(AI_INSIGHTS[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [promotedIds, setPromotedIds] = useState(new Set());

  const categories = ['All', 'Energy Anomaly', 'Efficiency Win', 'Logistics Optimization'];

  const filteredInsights = activeCategory === 'All' 
    ? AI_INSIGHTS 
    : AI_INSIGHTS.filter(i => i.category === activeCategory);

  const handlePromote = (insight) => {
    setPromotedIds(prev => new Set([...prev, insight.id]));
    if (onPromoteToAction) {
      onPromoteToAction({
        id: `ACT-FROM-${insight.id}`,
        title: insight.title,
        site: insight.site,
        category: insight.category,
        problemIdentified: insight.explanation.whatHappened,
        explanation: insight.explanation.recommendedStep,
        carbonSavingsTonnesYr: 3.5,
        costUSD: 4500,
        annualSavingsUSD: 2100,
        paybackYears: 2.1,
        feasibility: "High",
        confidence: insight.confidence,
        priorityScore: 89,
        status: "Proposed",
        scopeImpact: "Scope 2"
      });
    }
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Standardized Page Header */}
      <PageHeader
        badge="Deterministic Grounding"
        title="AI Insights & Predictive Analytics"
        description="Machine learning anomaly detection, predictive load analysis, and explainable diagnostic reasoning across operations."
        actions={
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'bg-white dark:bg-[#13241c] text-[#404944] dark:text-[#8cc2ac] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        }
      />

      <div>

        {/* Main Grid: Insights List on Left, 5-Point Explainability Dossier on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Insights Master List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredInsights.map((insight) => {
              const isSelected = selectedInsight.id === insight.id;
              const isPromoted = promotedIds.has(insight.id);
              return (
                <div
                  key={insight.id}
                  onClick={() => setSelectedInsight(insight)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white dark:bg-[#15221C] border-[#247A55] shadow-md ring-1 ring-[#247A55]/20'
                      : 'bg-white/70 dark:bg-[#15221C]/70 border-[#E6ECE7] dark:border-[#23362C] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      insight.severity === 'warning' ? 'bg-amber-100 text-amber-800' :
                      insight.severity === 'positive' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {insight.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {isPromoted && (
                        <span className="text-[10px] font-semibold text-[#247A55] bg-[#DDF3E5] px-1.5 py-0.5 rounded">
                          In Ledger
                        </span>
                      )}
                      <span className="text-[11px] text-[#66756B] flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {insight.timestamp}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-heading font-semibold text-sm text-[#17251E] dark:text-white mb-2 leading-snug">
                    {insight.title}
                  </h4>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E6ECE7] dark:border-[#23362C] text-xs text-[#66756B]">
                    <span>Facility: {insight.site}</span>
                    <span className="font-semibold text-[#247A55] dark:text-[#38C48B]">
                      Confidence: {insight.confidence}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5-Point Explainable AI Diagnosis Panel (7 cols) */}
          <div className="stitch-card p-6 md:p-8 bg-white dark:bg-[#15221C] lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Dossier Header */}
            <div className="pb-4 border-b border-[#E6ECE7] dark:border-[#23362C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2 text-xs text-[#66756B] mb-1">
                  <span className="font-mono font-semibold text-[#247A55]">{selectedInsight.id}</span>
                  <span>•</span>
                  <span>{selectedInsight.site}</span>
                </div>
                <h3 className="font-heading font-bold text-lg md:text-xl text-[#17251E] dark:text-white">
                  {selectedInsight.title}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DDF3E5] text-[#247A55] inline-block">
                  {selectedInsight.confidence} AI Confidence
                </span>
              </div>
            </div>

            {/* Structured 5-Point Explainability Breakdown */}
            <div className="space-y-4 text-xs leading-relaxed">
              
              {/* Point 1: What Happened */}
              <div className="p-3.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="font-semibold text-[#17251E] dark:text-white mb-1 flex items-center text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#247A55] text-white flex items-center justify-center text-[10px] mr-2">1</span>
                  What Happened
                </div>
                <p className="text-[#66756B] dark:text-[#96A59C] pl-7">
                  {selectedInsight.explanation.whatHappened}
                </p>
              </div>

              {/* Point 2: Why It Happened */}
              <div className="p-3.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="font-semibold text-[#17251E] dark:text-white mb-1 flex items-center text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#247A55] text-white flex items-center justify-center text-[10px] mr-2">2</span>
                  Why It May Have Happened (Root Cause)
                </div>
                <p className="text-[#66756B] dark:text-[#96A59C] pl-7">
                  {selectedInsight.explanation.whyHappened}
                </p>
              </div>

              {/* Point 3: Supporting Data */}
              <div className="p-3.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="font-semibold text-[#17251E] dark:text-white mb-1 flex items-center text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#247A55] text-white flex items-center justify-center text-[10px] mr-2">3</span>
                  Supporting Telemetry & Activity Data
                </div>
                <p className="text-[#66756B] dark:text-[#96A59C] pl-7 font-mono">
                  {selectedInsight.explanation.supportingData}
                </p>
              </div>

              {/* Point 4: Expected Future Trend */}
              <div className="p-3.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="font-semibold text-[#17251E] dark:text-white mb-1 flex items-center text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#247A55] text-white flex items-center justify-center text-[10px] mr-2">4</span>
                  Expected Future Trajectory (If Unaddressed)
                </div>
                <p className="text-[#66756B] dark:text-[#96A59C] pl-7">
                  {selectedInsight.explanation.futureTrend}
                </p>
              </div>

              {/* Point 5: Recommended Next Step */}
              <div className="p-3.5 rounded-xl bg-[#DDF3E5]/50 dark:bg-[#1E3626]/50 border border-[#C8E8D3] dark:border-[#234A35]">
                <div className="font-semibold text-[#247A55] dark:text-[#38C48B] mb-1 flex items-center text-xs">
                  <span className="w-5 h-5 rounded-full bg-[#247A55] text-white flex items-center justify-center text-[10px] mr-2">5</span>
                  Recommended Corrective Action
                </div>
                <p className="text-[#17251E] dark:text-gray-200 pl-7 font-medium">
                  {selectedInsight.explanation.recommendedStep}
                </p>
              </div>

            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#E6ECE7] dark:border-[#23362C] flex items-center justify-between">
              <span className="text-[11px] text-[#66756B]">
                Numerical source of truth anchored to sub-meter logs.
              </span>
              <button
                onClick={() => handlePromote(selectedInsight)}
                disabled={promotedIds.has(selectedInsight.id)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] disabled:opacity-60 transition-all shadow-sm"
              >
                {promotedIds.has(selectedInsight.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Added to Action Ledger</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Promote to Action Ledger →</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AiInsightsSection;
