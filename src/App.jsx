import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import UserInputSection from './components/UserInputSection';
import DashboardSection from './components/DashboardSection';
import RecommendationsSection from './components/RecommendationsSection';
import SDGSection from './components/SDGSection';
import FutureScopeSection from './components/FutureScopeSection';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const [sustainabilityScore, setSustainabilityScore] = useState(78);
  const [userData, setUserData] = useState({
    electricity: 12,
    water: 120,
    transport: 'public',
    waste: 1.5,
    food: 'mixed'
  });
  const [analysisState, setAnalysisState] = useState('idle'); // 'idle', 'analyzing', 'completed'

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

  const handleAnalyze = (formData) => {
    setAnalysisState('analyzing');
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setUserData(formData);
      
      // Simple mock logic to change score based on input
      let newScore = 100;
      
      // Electricity penalty (assuming > 15 kWh is high)
      if (formData.electricity > 15) newScore -= (formData.electricity - 15) * 0.5;
      
      // Water penalty (> 150 L is high)
      if (formData.water > 150) newScore -= (formData.water - 150) * 0.1;
      
      // Transport
      if (formData.transport === 'gas_car') newScore -= 15;
      if (formData.transport === 'public') newScore -= 5;
      if (formData.transport === 'ev') newScore -= 2;
      // walk_bike is 0 penalty
      
      // Waste penalty
      if (formData.waste > 2) newScore -= (formData.waste - 2) * 2;
      
      // Diet
      if (formData.food === 'meat_heavy') newScore -= 12;
      if (formData.food === 'mixed') newScore -= 6;
      if (formData.food === 'vegetarian') newScore -= 2;
      
      // Cap score between 0 and 100
      setSustainabilityScore(Math.max(0, Math.min(100, Math.round(newScore))));
      setAnalysisState('completed');

      // Scroll to dashboard smoothly after rendering
      setTimeout(() => {
        document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handleReset = () => {
    setAnalysisState('idle');
    document.getElementById('input')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 selection:text-emerald-500">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <UserInputSection onAnalyze={handleAnalyze} analysisState={analysisState} />
        
        <AnimatePresence mode="wait">
          {analysisState === 'completed' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <DashboardSection score={sustainabilityScore} userData={userData} onReset={handleReset} />
              <RecommendationsSection userData={userData} />
            </motion.div>
          )}
        </AnimatePresence>
        <SDGSection />
        <FutureScopeSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
