import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DashboardSection from './components/DashboardSection';
import CarbonIntelligence from './components/CarbonIntelligence';
import DigitalTwin from './components/DigitalTwin';
import AiInsightsSection from './components/AiInsightsSection';
import RecommendationsSection from './components/RecommendationsSection';
import ActionLedger from './components/ActionLedger';
import ReportsSection from './components/ReportsSection';
import DataIngestionSection from './components/DataIngestionSection';
import MultiSiteSection from './components/MultiSiteSection';
import SDGSection from './components/SDGSection';
import FutureScopeSection from './components/FutureScopeSection';
import Footer from './components/Footer';

import { 
  ENVIRONMENTAL_METRICS, 
  ACTIVITY_RECORDS, 
  ACTION_RECOMMENDATIONS, 
  ACTION_LEDGER_ENTRIES 
} from './data/mockData';

function App() {
  // Theme state: defaults to 'light' per Stitch design specifications (clean white and warm off-white)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Active platform tab: 'landing', 'dashboard', 'carbon', 'insights', 'digital-twin', 'actions', 'reports', 'ingestion', 'sites'
  const [activeTab, setActiveTab] = useState('landing');

  // Multi-Site scope: 'all', 'site-01', 'site-02', 'site-03'
  const [selectedSite, setSelectedSite] = useState('all');

  // Live platform state
  const [records, setRecords] = useState(ACTIVITY_RECORDS);
  const [recommendations, setRecommendations] = useState(ACTION_RECOMMENDATIONS);
  const [ledgerEntries, setLedgerEntries] = useState(ACTION_LEDGER_ENTRIES);

  // Sync theme to root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Determine current facility metrics
  const currentMetrics = selectedSite === 'all' 
    ? ENVIRONMENTAL_METRICS.consolidated 
    : ENVIRONMENTAL_METRICS[selectedSite] || ENVIRONMENTAL_METRICS.consolidated;

  // Add individual activity record from Data Ingestion
  const handleAddRecord = (newRecord) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  // Batch upload activity records from CSV
  const handleBatchUpload = (newRecords) => {
    setRecords(prev => [...newRecords, ...prev]);
  };

  // Update action recommendation status
  const handleUpdateActionStatus = (actionId, newStatus) => {
    setRecommendations(prev =>
      prev.map(rec => {
        if (rec.id === actionId) {
          return { ...rec, status: newStatus };
        }
        return rec;
      })
    );

    // Also sync to Action Ledger
    setLedgerEntries(prev => {
      const exists = prev.find(e => e.actionId === actionId);
      if (exists) {
        return prev.map(e => e.actionId === actionId ? { ...e, status: newStatus } : e);
      } else {
        const matchingRec = recommendations.find(r => r.id === actionId);
        if (matchingRec) {
          return [
            {
              id: `LEDGER-${Date.now().toString().slice(-4)}`,
              actionId,
              title: matchingRec.title,
              site: matchingRec.site,
              category: matchingRec.category,
              predictedSavingsTonnesCO2: matchingRec.carbonSavingsTonnesYr,
              measuredSavingsTonnesCO2: newStatus === 'Implemented' ? matchingRec.carbonSavingsTonnesYr : 0,
              variancePercent: newStatus === 'Implemented' ? '0% (Audited)' : 'Pending Verification',
              status: newStatus,
              verificationMethod: 'Smart Metrology & Sub-meter Ingress',
              verificationDate: newStatus === 'Implemented' ? new Date().toISOString().split('T')[0] : 'In Progress',
              auditor: 'Internal ESG Engineering',
              costBudgeted: matchingRec.costUSD,
              costActual: newStatus === 'Implemented' ? matchingRec.costUSD : Math.round(matchingRec.costUSD * 0.4)
            },
            ...prev
          ];
        }
        return prev;
      }
    });
  };

  // Promote an AI Insight to Action Recommendation & Ledger
  const handlePromoteInsightToAction = (newAction) => {
    setRecommendations(prev => [newAction, ...prev]);
    setActiveTab('actions');
  };

  // Quick Lifestyle Calculator Analysis (Preserved and enhanced from original project)
  const handleAnalyzeLifestyle = (formData) => {
    const dailyKWh = formData.electricity || 12;
    const dailyWater = formData.water || 120;
    const dailyWaste = formData.waste || 1.5;

    // Deterministic calculation
    const elecTonnesYr = (dailyKWh * 365 * 0.385) / 1000;
    const waterTonnesYr = (dailyWater * 365 * 0.344) / 1000;
    const wasteTonnesYr = (dailyWaste * 365 * 0.450) / 1000;

    const lifestyleRecord = {
      id: `REC-LS-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      site: 'Metro Innovation Campus (Commuter Survey)',
      scope: 'Scope 3',
      category: 'Employee Lifestyle & Commute',
      value: Math.round(dailyKWh * 30),
      unit: 'kWh / month',
      co2eTonnes: Number((elecTonnesYr / 12 + waterTonnesYr / 12 + wasteTonnesYr / 12).toFixed(2)),
      source: 'Interactive Commute Assessment',
      status: 'Estimated',
      confidence: '88%'
    };

    handleAddRecord(lifestyleRecord);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] dark:bg-[#0E1713] text-[#17251E] dark:text-[#F3F6F4]">
      
      {/* Universal Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: OVERVIEW / LANDING */}
          {activeTab === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HeroSection
                metrics={currentMetrics}
                onGetStarted={() => setActiveTab('ingestion')}
                onExplore={() => setActiveTab('dashboard')}
              />
              <FeaturesSection onSelectModule={(tab) => setActiveTab(tab)} />
              <SDGSection />
              <FutureScopeSection onExploreRoadmap={() => setActiveTab('reports')} />
            </motion.div>
          )}

          {/* TAB 2: MAIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardSection
                metrics={currentMetrics}
                selectedSite={selectedSite}
                setSelectedSite={setSelectedSite}
                onSimulate={() => setActiveTab('digital-twin')}
                onViewInsights={() => setActiveTab('insights')}
                onViewCarbon={() => setActiveTab('carbon')}
              />
              <RecommendationsSection
                recommendations={recommendations}
                onUpdateStatus={handleUpdateActionStatus}
                selectedSite={selectedSite}
              />
            </motion.div>
          )}

          {/* TAB 3: CARBON INTELLIGENCE ENGINE */}
          {activeTab === 'carbon' && (
            <motion.div
              key="carbon"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CarbonIntelligence
                records={records}
                selectedSite={selectedSite}
              />
            </motion.div>
          )}

          {/* TAB 4: AI INSIGHTS & PREDICTIVE ANALYTICS */}
          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AiInsightsSection
                onPromoteToAction={handlePromoteInsightToAction}
              />
            </motion.div>
          )}

          {/* TAB 5: SUSTAINABILITY DIGITAL TWIN */}
          {activeTab === 'digital-twin' && (
            <motion.div
              key="digital-twin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DigitalTwin />
            </motion.div>
          )}

          {/* TAB 6: ACTION LEDGER */}
          {activeTab === 'actions' && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ActionLedger
                ledgerEntries={ledgerEntries}
                selectedSite={selectedSite}
              />
            </motion.div>
          )}

          {/* TAB 7: REPORTS */}
          {activeTab === 'reports' && (
            <motion.div
              key="reports"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ReportsSection
                metrics={currentMetrics}
                selectedSite={selectedSite}
              />
            </motion.div>
          )}

          {/* TAB 8: DATA INGESTION ENGINE */}
          {activeTab === 'ingestion' && (
            <motion.div
              key="ingestion"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DataIngestionSection
                onAddRecord={handleAddRecord}
                onBatchUpload={handleBatchUpload}
                onAnalyzeLifestyle={handleAnalyzeLifestyle}
              />
            </motion.div>
          )}

          {/* TAB 9: MULTI-SITE / CAMPUSES */}
          {activeTab === 'sites' && (
            <motion.div
              key="sites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MultiSiteSection
                selectedSite={selectedSite}
                onSelectSite={(siteId) => {
                  setSelectedSite(siteId);
                  setActiveTab('dashboard');
                }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default App;
