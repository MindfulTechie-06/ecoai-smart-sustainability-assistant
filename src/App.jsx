import { useState, useEffect } from 'react';
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
  const [sustainabilityScore, setSustainabilityScore] = useState(78);

  const handleAnalyze = (formData) => {
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
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <UserInputSection onAnalyze={handleAnalyze} />
        <DashboardSection score={sustainabilityScore} />
        <RecommendationsSection />
        <SDGSection />
        <FutureScopeSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
