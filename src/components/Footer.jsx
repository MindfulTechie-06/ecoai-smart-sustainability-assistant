import { Leaf, ShieldCheck } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#15221C] border-t border-[#E6ECE7] dark:border-[#23362C] pt-16 pb-12 text-[#66756B] dark:text-[#96A59C] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#247A55] text-white flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl text-[#17251E] dark:text-white">
                Echo<span className="text-[#247A55] dark:text-[#38C48B]">AI</span>
              </span>
            </div>

            <p className="text-xs leading-relaxed max-w-sm">
              "From fragmented resource data to intelligent, measurable sustainability action."
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-[#247A55] dark:text-[#38C48B]">
              <ShieldCheck className="w-4 h-4" />
              <span>GHG Protocol Corporate Standard & SBTi Aligned</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#17251E] dark:text-white mb-3">
              Platform Intelligence
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-[#247A55]">Executive Dashboard</button></li>
              <li><button onClick={() => onNavigate('carbon')} className="hover:text-[#247A55]">Scope 1, 2, 3 Accounting</button></li>
              <li><button onClick={() => onNavigate('digital-twin')} className="hover:text-[#247A55]">Digital Twin Simulator</button></li>
              <li><button onClick={() => onNavigate('insights')} className="hover:text-[#247A55]">Explainable AI Engine</button></li>
              <li><button onClick={() => onNavigate('actions')} className="hover:text-[#247A55]">Action Ledger & Audit</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#17251E] dark:text-white mb-3">
              Operations & Data
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('ingestion')} className="hover:text-[#247A55]">CSV Batch Upload</button></li>
              <li><button onClick={() => onNavigate('reports')} className="hover:text-[#247A55]">ESG Reporting Center</button></li>
              <li><button onClick={() => onNavigate('sites')} className="hover:text-[#247A55]">Multi-Campus Management</button></li>
              <li><button onClick={() => onNavigate('carbon')} className="hover:text-[#247A55]">Emission Factors Library</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-[#17251E] dark:text-white mb-3">
              Standards & Integrity
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-1">
                <span>EPA eGRID 2024</span>
              </li>
              <li><span>DEFRA 2024 Conversion Factors</span></li>
              <li><span>IPCC National Inventory Model</span></li>
              <li><span>ISO 14064-1 Compliance Support</span></li>
            </ul>
          </div>

        </div>

        {/* Legal & Demonstration Notice */}
        <div className="pt-8 border-t border-[#E6ECE7] dark:border-[#23362C] flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <p>
            © {new Date().getFullYear()} Echo AI Technologies Inc. All rights reserved. 
            All demonstration telemetry is simulated for operational benchmarking.
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[#247A55] font-medium">Privacy Policy</span>
            <span>•</span>
            <span className="text-[#247A55] font-medium">Data Provenance Charter</span>
            <span>•</span>
            <span className="text-[#247A55] font-medium">System Status: 99.98% Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
