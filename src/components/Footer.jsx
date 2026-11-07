import EchoLogo from './EchoLogo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-[#e7f8ec] dark:bg-[#0e1b15] py-16 border-t border-[#dcece1] dark:border-[#1e382c] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div>
            <button 
              type="button"
              className="mb-4 text-left focus:outline-none" 
              onClick={() => onNavigate('landing')}
              title="Return to Landing Page"
            >
              <EchoLogo variant="light" textClassName="text-lg font-bold" />
            </button>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
              Institutional-grade climate intelligence, environmental digital twins, and autonomous carbon accounting engines.
            </p>
          </div>

          {/* Platform Col */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#00392b] dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#404944] dark:text-[#8cc2ac]">
              <li>
                <button onClick={() => onNavigate('carbon')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Carbon Intelligence
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ingestion')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Resource Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('digital-twin')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Environmental Digital Twin
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('actions')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Decarbonization Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Governance Col */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#00392b] dark:text-white mb-4">
              Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-[#404944] dark:text-[#8cc2ac]">
              <li>
                <button onClick={() => onNavigate('actions')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Action Ledger & Audit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reports')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Regulatory Filings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Methodology Papers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sites')} className="hover:text-[#006c49] dark:hover:text-white transition-colors">
                  Data Lineage & Campuses
                </button>
              </li>
            </ul>
          </div>

          {/* Enterprise Col */}
          <div>
            <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#00392b] dark:text-white mb-4">
              Enterprise
            </h4>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mb-3 leading-relaxed">
              Audit-verified greenhouse gas accounting for institutional operators.
            </p>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#e1f2e7] dark:bg-[#162d22] text-[#00392b] dark:text-[#9af5c6] text-xs font-semibold border border-[#dcece1] dark:border-[#1e382c]">
              <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-sm">verified</span>
              <span>GHG Protocol Compliant</span>
            </span>
          </div>

        </div>

        {/* Bottom Legal / Assurance Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#dcece1] dark:border-[#1e382c] text-xs text-[#404944] dark:text-[#8cc2ac] gap-4">
          <span>© {new Date().getFullYear()} Echo AI Technologies Inc. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-6">
            <span>Confidential Computing</span>
            <span>SOC2 Type II Certified</span>
            <span>ISAE 3410 Assured</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
