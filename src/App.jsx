import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import HeroSection from './components/HeroSection';
import DashboardSection from './components/DashboardSection';
import CarbonIntelligence from './components/CarbonIntelligence';
import DigitalTwin from './components/DigitalTwin';
import AiInsightsSection from './components/AiInsightsSection';
import RecommendationsSection from './components/RecommendationsSection';
import ActionLedger from './components/ActionLedger';
import ReportsSection from './components/ReportsSection';
import DataIngestionSection from './components/DataIngestionSection';
import MultiSiteSection from './components/MultiSiteSection';
import Footer from './components/Footer';

import { 
  ENVIRONMENTAL_METRICS, 
  ACTIVITY_RECORDS, 
  ACTION_RECOMMENDATIONS, 
  ACTION_LEDGER_ENTRIES 
} from './data/mockData';
import { getIsNightByTime } from './utils/themeUtils';

export default function App() {
  // Theme state: 'light' or 'dark' (day/night mode with time detection)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('echo_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
      // Auto time-based default (6pm - 6am Night, 6am - 6pm Day)
      return getIsNightByTime() ? 'dark' : 'light';
    }
    return 'light';
  });

  // Active platform tab: 'landing', 'dashboard', 'carbon', 'insights', 'digital-twin', 'actions', 'reports', 'ingestion', 'sites'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) return tabParam;
    }
    return 'landing';
  });

  // Mobile sidebar state for dashboard
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
    localStorage.setItem('echo_theme', theme);
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

  // Quick Lifestyle Calculator Analysis
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

  // 1. PUBLIC EDITORIAL LANDING PAGE (Stitch Screen 1)
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-[#edfdf2] dark:bg-[#0c1611] text-[#101e18] dark:text-[#edfdf2] transition-colors">
        {/* Authoritative Glassmorphic Landing Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          toggleTheme={toggleTheme}
        />

        {/* Full 9-Section Editorial Landing Showcase */}
        <main className="flex-1 pt-20">
          <HeroSection
            onGetStarted={() => setActiveTab('carbon')}
            onExplore={() => setActiveTab('dashboard')}
            onSelectModule={(tab) => setActiveTab(tab)}
          />
        </main>

        {/* Editorial Landing Footer */}
        <Footer onNavigate={(tab) => setActiveTab(tab)} />
      </div>
    );
  }

  // 2. INTERNAL OPERATIONAL PLATFORM / DASHBOARD (Stitch Screen 2)
  return (
    <div className="min-h-screen flex bg-[#edfdf2] dark:bg-[#0c1611] text-[#101e18] dark:text-[#edfdf2] transition-colors">
      
      {/* Persistent Left Operational Rail (w-72, deep jade) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSite={selectedSite}
        setSelectedSite={setSelectedSite}
        theme={theme}
        setTheme={setTheme}
        toggleTheme={toggleTheme}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area with standardized 264px sidebar offset */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[264px]">
        
        {/* Top Executive Header */}
        <DashboardHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          setTheme={setTheme}
          toggleTheme={toggleTheme}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onExportReport={() => setActiveTab('reports')}
        />

        {/* Dynamic Route View with standardized enterprise container and spacing */}
        <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1536px] w-full mx-auto">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: EXECUTIVE DASHBOARD (Stitch Screen 2) */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <DashboardSection
                  metrics={currentMetrics}
                  selectedSite={selectedSite}
                  setSelectedSite={setSelectedSite}
                  onSimulate={() => setActiveTab('digital-twin')}
                  onViewInsights={() => setActiveTab('insights')}
                  onViewCarbon={() => setActiveTab('carbon')}
                  records={records}
                />
              </motion.div>
            )}

            {/* TAB 2: CARBON INTELLIGENCE ENGINE */}
            {activeTab === 'carbon' && (
              <motion.div
                key="carbon"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <CarbonIntelligence
                  records={records}
                  selectedSite={selectedSite}
                />
              </motion.div>
            )}

            {/* TAB 3: AI INSIGHTS & PREDICTIVE ANALYTICS */}
            {activeTab === 'insights' && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AiInsightsSection
                  onPromoteToAction={handlePromoteInsightToAction}
                />
              </motion.div>
            )}

            {/* TAB 4: SUSTAINABILITY DIGITAL TWIN */}
            {activeTab === 'digital-twin' && (
              <motion.div
                key="digital-twin"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <DigitalTwin />
              </motion.div>
            )}

            {/* TAB 5: ACTION ENGINE & LEDGER */}
            {activeTab === 'actions' && (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <RecommendationsSection
                  recommendations={recommendations}
                  onUpdateStatus={handleUpdateActionStatus}
                  selectedSite={selectedSite}
                />
                <ActionLedger
                  ledgerEntries={ledgerEntries}
                  selectedSite={selectedSite}
                />
              </motion.div>
            )}

            {/* TAB 6: REPORTS & REGULATORY FILINGS */}
            {activeTab === 'reports' && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ReportsSection
                  metrics={currentMetrics}
                  selectedSite={selectedSite}
                />
              </motion.div>
            )}

            {/* TAB 7: RESOURCE ANALYTICS & INGESTION */}
            {activeTab === 'ingestion' && (
              <motion.div
                key="ingestion"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <DataIngestionSection
                  onAddRecord={handleAddRecord}
                  onBatchUpload={handleBatchUpload}
                  onAnalyzeLifestyle={handleAnalyzeLifestyle}
                />
              </motion.div>
            )}

            {/* TAB 8: OPERATING CAMPUSES */}
            {activeTab === 'sites' && (
              <motion.div
                key="sites"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
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
      </div>
    </div>
  );
}
