export default function HeroSection({ onGetStarted, onExplore, onSelectModule }) {
  const handleNavigate = (tab) => {
    if (onSelectModule) {
      onSelectModule(tab);
    } else if (tab === 'dashboard' && onExplore) {
      onExplore();
    } else if (tab === 'carbon' && onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <div className="w-full flex flex-col font-sans text-[#101e18] dark:text-[#edfdf2] transition-colors">
      
      {/* 1. HERO SECTION: High-quality Environmental Photograph with dark green overlay */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#1A5140]">
        {/* Background Image with Dark Jade Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtoGEk1usYbjFx4vckS7_7W2ItcJ0ZSUzvM23wK_8YXUWJeVd8JSLMDFtfGg30j_XrDINh_Z6PbCT2l2al8imC2xVJP97v_yxUJ4F0kubgLxCa9Us5BZCIcRU6N0ciSboivdTmgS1WcIVPLDGhItM_vgqWzjn6GmKVrSnQL0-kbcUh1nE8Ose7fl4G_Scrn13Lel6lswHoHQqhAE1Sy3tOn6kgj_CMVe6MruU1RTbh')" 
          }}
        />
        {/* Dark green (#1A5140) 70% opacity overlay for pristine contrast */}
        <div className="absolute inset-0 bg-[#1A5140] opacity-75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#00392b] via-transparent to-[#00392b]/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 lg:pt-44 lg:pb-32 flex flex-col justify-between">
          
          {/* Top Tagline & Scope Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#006c49]/40 backdrop-blur-md text-[#9af5c6] text-xs font-semibold border border-[#9af5c6]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9af5c6] animate-pulse"></span>
              <span>ISAE 3410 & ISO 14064-1 COMPLIANT</span>
            </span>
            <span className="text-[#8cc2ac] text-xs font-semibold tracking-wider uppercase">
              Enterprise Environmental Operating System
            </span>
          </div>

          {/* Hero Typography & Direct Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                Measure Your Impact. <br />
                <span className="text-[#9af5c6]">Shape a Sustainable Future.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#8cc2ac] max-w-2xl leading-relaxed">
                Track your carbon footprint, understand your environmental impact and turn sustainability data into intelligent, auditable action.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleNavigate('carbon')}
                  className="group inline-flex items-center space-x-2 bg-[#006c49] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-[0_1px_3px_rgba(23,37,30,0.1),0_10px_25px_-5px_rgba(26,81,64,0.2)] hover:bg-[#9af5c6] hover:text-[#002113] transition-all duration-200"
                >
                  <span>Explore Carbon Intelligence</span>
                  <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
                </button>
                <a
                  href="#centerpiece-impact"
                  className="inline-flex items-center space-x-2 bg-[#1a5140]/60 hover:bg-[#1a5140] text-white px-6 py-3.5 rounded-xl font-semibold text-sm backdrop-blur-md transition-colors border border-[#8cc2ac]/30"
                >
                  <span>Discover Echo AI</span>
                  <span className="material-symbols-outlined text-lg text-[#9af5c6]">explore</span>
                </a>
              </div>
            </div>

            {/* Integrated Real-time Signal Preview Card */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white/95 dark:bg-[#12221b]/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20 text-[#101e18] dark:text-white">
                <div className="flex items-center justify-between pb-3 border-b border-[#e1f2e7] dark:border-[#1e382c]">
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                      <span className="material-symbols-outlined text-sm">hub</span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#404944] dark:text-[#8cc2ac]">
                      Live Telemetry
                    </span>
                  </div>
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6] animate-ping"></span>
                    <span>AI Inference Active</span>
                  </span>
                </div>

                {/* Metric Highlight */}
                <div className="pt-3">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-[#404944] dark:text-[#8cc2ac]">Fleet Runrate Decarbonization</span>
                    <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">-14.2% YoY</span>
                  </div>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-[#00392b] dark:text-white tracking-tight">
                      418,290
                    </span>
                    <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e YTD</span>
                  </div>
                </div>

                {/* Clean Sparkline SVG */}
                <div className="pt-2 pb-1">
                  <div className="w-full h-12 flex items-end">
                    <svg className="w-full h-full text-[#006c49] dark:text-[#9af5c6] stroke-current fill-none" preserveAspectRatio="none" viewBox="0 0 240 48">
                      <path d="M0,40 Q30,35 60,38 T120,24 T180,18 T240,6" strokeLinecap="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
                      <path d="M0,40 Q30,35 60,38 T120,24 T180,18 T240,6 L240,48 L0,48 Z" fill="currentColor" fillOpacity="0.1" stroke="none"></path>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center text-[#404944] dark:text-[#8cc2ac] text-[11px] pt-1">
                    <span>Q1 Target Baseline</span>
                    <span className="font-semibold text-[#006c49] dark:text-[#9af5c6]">Verified ISO 14064-1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CENTERPIECE SECTION: "YOUR ENVIRONMENTAL IMPACT, MADE VISIBLE" */}
      <section className="w-full py-20 lg:py-28 bg-[#edfdf2] dark:bg-[#0c1611] relative overflow-hidden" id="centerpiece-impact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] text-xs font-semibold mb-3 border border-[#dcece1] dark:border-[#1e382c]">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Planetary Carbon Telemetry</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00392b] dark:text-white tracking-tight">
              Your Environmental Impact, Made Visible.
            </h2>
            <p className="text-sm sm:text-base text-[#404944] dark:text-[#8cc2ac] mt-3 leading-relaxed">
              Understand where your emissions come from, track your environmental footprint and discover opportunities to reduce your impact.
            </p>
          </div>

          {/* Central Earth + Orbiting Telemetry Matrix */}
          <div className="relative w-full max-w-6xl mx-auto min-h-[640px] lg:min-h-[720px] flex items-center justify-center">
            
            {/* Ambient Jade Halo & Concentric Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#006c49]/15 blur-3xl"></div>
              <div className="w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] rounded-full bg-[#97f2c4]/20 blur-2xl"></div>
              <div className="absolute w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full border border-[#006c49]/20 border-dashed animate-[spin_120s_linear_infinite]"></div>
              <div className="absolute w-[600px] sm:w-[780px] h-[600px] sm:h-[780px] rounded-full border border-[#006c49]/15 hidden sm:block"></div>
              <div className="absolute w-[800px] sm:w-[940px] h-[800px] sm:h-[940px] rounded-full border border-[#c0c9c3]/20 hidden lg:block"></div>
            </div>

            {/* Central Earth Visual */}
            <div className="relative z-10 w-64 h-64 sm:w-88 sm:h-88 lg:w-[450px] lg:h-[450px] rounded-full shadow-[0_0_80px_rgba(40,135,96,0.35)] overflow-hidden flex items-center justify-center p-2 bg-gradient-to-b from-[#00392b]/30 to-[#006c49]/20 backdrop-blur-sm group">
              <img 
                alt="Photorealistic 3D Earth sculpted out of lush forest canopies with glowing emerald orbit rings" 
                className="w-full h-full object-contain rounded-full transition-transform duration-700 ease-out group-hover:scale-105" 
                src="/earth_canopy.png"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCl6kRK0tqTSIn9gH0GQztqQK3xU9AsEMga5sc3vgH9JyZ6Ypun6DUn9WImTu4_npFkGLLydwKUkpg2SulkcLCjAaEHlKIVIcsav9YlvdsVYDQCI7LIpoud5_GM_RjaAIj2c3N9CIqRtf5m0ksE8_0AQKjI5FgodDF3jj-aebpbvBAn3c5i2tTT8FKGzfLO2GPdUYTtNIRzsu4JVOitYCEXuVhbQ6cYNY5RrGtDvdDv";
                }}
              />
              {/* Central pulse marker */}
              <div className="absolute bottom-5 bg-[#1a5140]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold border border-[#9af5c6]/30 flex items-center space-x-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#9af5c6] animate-ping"></span>
                <span className="tracking-wide">Global Scope 1-3 Digital Twin</span>
              </div>
            </div>

            {/* 5 FLOATING METRIC CARDS AROUND EARTH */}
            
            {/* 1. Total Carbon Footprint (Top Left) */}
            <div className="lg:absolute lg:top-4 lg:left-4 w-full sm:w-72 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-[#006c49]/20 hover:border-[#006c49] transition-all my-2 lg:my-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                    <span className="material-symbols-outlined text-base">co2</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                    Total Carbon Footprint
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-semibold">
                  -14.2% YoY
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="font-heading text-2xl font-bold text-[#00392b] dark:text-white">42,810</span>
                <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs text-[#006c49] dark:text-[#9af5c6]">
                <span className="inline-flex items-center space-x-1 font-medium">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  <span>Downward Green Trend</span>
                </span>
                <span className="text-[#404944] dark:text-[#8cc2ac] text-[10px]">Automated GHG Ledger</span>
              </div>
            </div>

            {/* 2. Energy Emissions (Top Right) */}
            <div className="lg:absolute lg:top-4 lg:right-4 w-full sm:w-72 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-[#006c49]/20 hover:border-[#006c49] transition-all my-2 lg:my-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                    <span className="material-symbols-outlined text-base">bolt</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                    Energy Emissions
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-semibold">
                  -8.6% YoY
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="font-heading text-2xl font-bold text-[#00392b] dark:text-white">18,340</span>
                <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs">
                <span className="text-[#006c49] dark:text-[#9af5c6] font-medium">68% Renewable Mix</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] text-[10px]">ISO 50001 Matched</span>
              </div>
            </div>

            {/* 3. Water Footprint (Middle Left) */}
            <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-4 w-full sm:w-68 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-[#006c49]/20 hover:border-[#006c49] transition-all my-2 lg:my-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6]">
                    <span className="material-symbols-outlined text-base">water_drop</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                    Water Footprint
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-semibold">
                  -5.1% YoY
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="font-heading text-2xl font-bold text-[#00392b] dark:text-white">1.42M</span>
                <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">m³ Consumed</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs">
                <span className="text-[#006c49] dark:text-[#9af5c6] font-medium">42% Circular Index</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] text-[10px]">Aquifer Stress Low</span>
              </div>
            </div>

            {/* 4. Waste Impact (Middle Right) */}
            <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-4 w-full sm:w-68 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-[#006c49]/20 hover:border-[#006c49] transition-all my-2 lg:my-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6]">
                    <span className="material-symbols-outlined text-base">recycling</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                    Waste Impact
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#dcece1] dark:bg-[#1a5140] text-[#101e18] dark:text-[#9af5c6] text-[11px] font-semibold">
                  +3.2% vs Q2
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="font-heading text-2xl font-bold text-[#00392b] dark:text-white">12,450</span>
                <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">Tonnes</span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs">
                <span className="text-[#006c49] dark:text-[#9af5c6] font-medium">89.4% Zero-Waste</span>
                <span className="text-[#404944] dark:text-[#8cc2ac] text-[10px]">Diverted from Landfill</span>
              </div>
            </div>

            {/* 5. Mobility Emissions (Bottom Center) */}
            <div className="lg:absolute lg:bottom-2 lg:left-1/2 lg:-translate-x-1/2 w-full sm:w-80 bg-white/95 dark:bg-[#13241c]/95 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-[#006c49]/30 hover:border-[#006c49] transition-all my-2 lg:my-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="p-1 rounded bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6]">
                    <span className="material-symbols-outlined text-base">directions_car</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                    Mobility Emissions
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-[11px] font-semibold">
                  -19.8% YoY
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="flex items-baseline space-x-2">
                  <span className="font-heading text-2xl font-bold text-[#00392b] dark:text-white">3,890</span>
                  <span className="text-xs text-[#404944] dark:text-[#8cc2ac]">tCO₂e</span>
                </div>
                <span className="text-[#006c49] dark:text-[#9af5c6] text-xs font-medium">Fleet Transition Active</span>
              </div>
              <div className="w-full bg-[#e1f2e7] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full w-[80%]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL INTRODUCTION: Split Layout */}
      <section className="w-full py-20 bg-[#e7f8ec] dark:bg-[#0e1b15] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-px bg-[#006c49] dark:bg-[#9af5c6]"></span>
                <span className="text-xs tracking-widest uppercase text-[#006c49] dark:text-[#9af5c6] font-semibold">
                  The Infrastructure Challenge
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#00392b] dark:text-white leading-tight">
                Understand Your Impact. Engineer a Better Future.
              </h2>
              <p className="text-base text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
                Sustainability accounting is transitioning from static retrospective PDFs to live computational engineering. Organizations must synthesize billions of operational telemetry rows across energy contracts, facility BMS, transit fleets, and multi-tier supply networks.
              </p>
              <div className="pt-2 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6]">
                  <span className="material-symbols-outlined text-2xl">query_stats</span>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-[#00392b] dark:text-white">Zero Guesstimates</h4>
                  <p className="text-xs text-[#404944] dark:text-[#8cc2ac]">Deterministic activity data replacing spend-based industry proxies.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Intro Card 1 */}
              <div className="bg-white dark:bg-[#13241c] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#dcece1] dark:border-[#1e382c]">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-3xl mb-3">stream</span>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">Universal Ingestion</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
                  Connect over 340+ native enterprise connectors: SAP, Oracle, AWS, IoT smart meters, billing streams, and supplier EDI files with continuous lineage validation.
                </p>
              </div>

              {/* Intro Card 2 */}
              <div className="bg-white dark:bg-[#13241c] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#dcece1] dark:border-[#1e382c]">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-3xl mb-3">precision_manufacturing</span>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">Physics-Grounded AI</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
                  Deterministic thermodynamic formulas fused with modern transformer models to detect leakages, model grid emission variances, and predict thermodynamic load curves.
                </p>
              </div>

              {/* Intro Card 3 */}
              <div className="bg-white dark:bg-[#13241c] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#dcece1] dark:border-[#1e382c]">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-3xl mb-3">verified_user</span>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">Audit Defense Ready</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
                  Every data point maps to primary evidence receipts, emission factor versions (DEFRA, EPA, eGRID), and automated calculation proofs for Big Four assurance.
                </p>
              </div>

              {/* Intro Card 4 */}
              <div className="bg-white dark:bg-[#13241c] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#dcece1] dark:border-[#1e382c]">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-3xl mb-3">account_balance</span>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">Financial Alignment</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed">
                  Direct linkage between carbon abatement cost curves (MACC) and corporate CapEx planning to maximize both EBITDA margin and footprint reduction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC SUSTAINABILITY CATEGORY GALLERY */}
      <section className="w-full py-20 bg-[#edfdf2] dark:bg-[#0c1611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#006c49] dark:text-[#9af5c6] font-semibold">
                Impact Portfolios
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#00392b] dark:text-white mt-1">
                Sustainability Vectors in Practice
              </h2>
            </div>
            <p className="text-sm text-[#404944] dark:text-[#8cc2ac] max-w-md mt-2 md:mt-0">
              Targeted climate intelligence solutions tailored for multi-asset operational and natural capital domains.
            </p>
          </div>

          {/* Asymmetric Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* Card 1: Forest Conservation (Span 7) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#13241c] rounded-2xl p-6 shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between hover:shadow-md transition-all group">
              <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden mb-5 relative">
                <img 
                  src="/solar_canopy.png" 
                  alt="High-end editorial aerial photograph of lush emerald forest canopy transitioning into modern architectural solar arrays"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00392b]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#00392b]/80 backdrop-blur-md text-[#9af5c6] text-xs font-semibold border border-[#9af5c6]/30">
                    Satellite & Drone LiDAR Active
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-xs font-semibold">
                  Natural Capital
                </span>
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-2xl">forest</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">
                  Forest Conservation & Carbon Sequestration
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Satellite LiDAR and hyperspectral imaging coupled with biomass decay models provide continuous canopy health telemetry, verifying baseline carbon sinks and biodiversity integrity.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">
                <span>3.4M Hectares Under Active Observation</span>
                <span className="material-symbols-outlined text-base">arrow_outward</span>
              </div>
            </div>

            {/* Card 2: Renewable Energy (Span 5) */}
            <div className="lg:col-span-5 bg-white dark:bg-[#13241c] rounded-2xl p-6 shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-xs font-semibold">
                  Clean Generation
                </span>
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-2xl">solar_power</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">
                  Renewable Energy Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Automated 24/7 matching of corporate solar and wind assets with real-time grid marginal emissions, maximizing displacement and financial PPA yield.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">
                <span>99.8% PPA Lineage Attestation</span>
                <span className="material-symbols-outlined text-base">arrow_outward</span>
              </div>
            </div>

            {/* Card 3: Sustainable Agriculture (Span 4) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#13241c] rounded-2xl p-6 shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-xs font-semibold">
                  Bio-Systems
                </span>
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-2xl">psychology_alt</span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Sustainable Agriculture
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Soil organic carbon (SOC) telemetry, precision nitrogen application monitoring, and Scope 3 farm-gate supply chain verification.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c] text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">
                <span>Regenerative Soil Verification</span>
              </div>
            </div>

            {/* Card 4: Electric Mobility (Span 4) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#13241c] rounded-2xl p-6 shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-xs font-semibold">
                  Transit & Logistics
                </span>
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-2xl">electric_car</span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Electric Mobility Transition
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Battery lifecycle diagnostics, depot charging load scheduling, and multi-tier logistics fleet decarbonization tracking.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c] text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">
                <span>Depot Demand Shaving Active</span>
              </div>
            </div>

            {/* Card 5: Campus Decarbonization (Span 4) */}
            <div className="lg:col-span-4 bg-white dark:bg-[#13241c] rounded-2xl p-6 shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-[#97f2c4] dark:bg-[#1a5140] text-[#00714c] dark:text-[#9af5c6] text-xs font-semibold">
                  Smart Built Assets
                </span>
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-2xl">apartment</span>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Campus Decarbonization
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Integrated HVAC digital twins, microgrid orchestration, and continuous tenant submetering with automated CSRD reporting.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c] text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">
                <span>Net-Zero Campus Certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS: 4 Sequential Stages */}
      <section className="w-full py-20 bg-[#e7f8ec] dark:bg-[#0e1b15] transition-colors" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#006c49] dark:text-[#9af5c6] font-semibold">
              Continuous Decarbonization Loop
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#00392b] dark:text-white mt-1">
              Autonomous Execution in Four Steps
            </h2>
            <p className="text-sm sm:text-base text-[#404944] dark:text-[#8cc2ac] mt-2">
              From unorganized operational sensor pings to assured regulatory disclosures and automated facility interventions.
            </p>
          </div>

          {/* Process Track (4 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stage 1: Measure */}
            <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-3xl font-extrabold text-[#00392b]/20 dark:text-white/20 group-hover:text-[#006c49] dark:group-hover:text-[#9af5c6] transition-colors">
                    01
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#00392b] dark:text-[#9af5c6] group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">sensors</span>
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">Measure</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Collect high-velocity environmental and resource data across Scope 1 direct, Scope 2 electricity grid intensity, and Scope 3 supplier logistics.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c]">
                <span className="text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">99.4% Automated Capture</span>
              </div>
            </div>

            {/* Stage 2: Understand */}
            <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-3xl font-extrabold text-[#00392b]/20 dark:text-white/20 group-hover:text-[#006c49] dark:group-hover:text-[#9af5c6] transition-colors">
                    02
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#00392b] dark:text-[#9af5c6] group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">analytics</span>
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">Understand</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Contextualize greenhouse gas emissions, water aquifer stress, and baseline thermal efficiency against localized marginal emission curves.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c]">
                <span className="text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">Real-time Marginal Signals</span>
              </div>
            </div>

            {/* Stage 3: Predict */}
            <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-3xl font-extrabold text-[#00392b]/20 dark:text-white/20 group-hover:text-[#006c49] dark:group-hover:text-[#9af5c6] transition-colors">
                    03
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#00392b] dark:text-[#9af5c6] group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">model_training</span>
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">Predict</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Deploy computational digital twins to run generative what-if scenario simulations for grid switching, heat recovery, and supplier re-routing.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c]">
                <span className="text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">Probabilistic Monte Carlo</span>
              </div>
            </div>

            {/* Stage 4: Act */}
            <div className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm border border-[#dcece1] dark:border-[#1e382c] flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-3xl font-extrabold text-[#00392b]/20 dark:text-white/20 group-hover:text-[#006c49] dark:group-hover:text-[#9af5c6] transition-colors">
                    04
                  </span>
                  <span className="w-10 h-10 rounded-full bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#00392b] dark:text-[#9af5c6] group-hover:bg-[#006c49] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-xl">bolt</span>
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#00392b] dark:text-white mb-2">Act</h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Translate optimized models directly into facility BMS control setpoints, supplier contracts, and immutable blockchain ledger entries.
                </p>
              </div>
              <div className="pt-3 border-t border-[#e1f2e7] dark:border-[#1e382c]">
                <span className="text-xs text-[#006c49] dark:text-[#9af5c6] font-semibold">Closed-Loop Verification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLATFORM CAPABILITIES: Bento Showcase */}
      <section className="w-full py-20 bg-[#edfdf2] dark:bg-[#0c1611]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#006c49] dark:text-[#9af5c6] font-semibold">
                System Architecture
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#00392b] dark:text-white mt-1">
                Enterprise Platform Capabilities
              </h2>
            </div>
            <p className="text-sm text-[#404944] dark:text-[#8cc2ac] max-w-md mt-2 md:mt-0">
              Engineered for Chief Sustainability Officers, Risk Committees, and Infrastructure Engineering teams.
            </p>
          </div>

          {/* Bento Grid (3x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Carbon Intelligence */}
            <div 
              onClick={() => handleNavigate('carbon')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">cloud_done</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Carbon Intelligence Engine
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Continuous Scope 1, 2, and 3 accounting with automatic resolution of location-based vs. market-based electricity attributes and supplier factor propagation.
                </p>
              </div>
              <div className="bg-[#e7f8ec] dark:bg-[#162d22] p-3 rounded-xl">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-[#404944] dark:text-[#8cc2ac]">Scope 3 Data Lineage</span>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">98.2% Direct Supplier</span>
                </div>
                <div className="w-full bg-[#dcece1] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full w-[98%]"></div>
                </div>
              </div>
            </div>

            {/* 2. AI Predictive Analytics */}
            <div 
              onClick={() => handleNavigate('insights')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">psychology</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  AI Predictive Analytics
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Early detection of energy waste anomalies, baseline emission drifting, and dynamic power purchase contract price-to-carbon optimization.
                </p>
              </div>
              <div className="bg-[#e7f8ec] dark:bg-[#162d22] p-3 rounded-xl flex items-center space-x-3">
                <span className="material-symbols-outlined text-[#006c49] dark:text-[#9af5c6] text-xl">auto_graph</span>
                <div className="text-xs">
                  <span className="text-[#00392b] dark:text-white font-semibold">3.8x faster detection</span>
                  <span className="text-[#404944] dark:text-[#8cc2ac] block">of unmetered fugitive emissions</span>
                </div>
              </div>
            </div>

            {/* 3. Sustainability Digital Twin */}
            <div 
              onClick={() => handleNavigate('digital-twin')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">account_tree</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Sustainability Digital Twin
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Simulate high-CapEx infrastructure overhauls before capital allocation: heat pump retrofits, fleet EV migrations, and distributed solar installations.
                </p>
              </div>
              <div className="bg-[#e7f8ec] dark:bg-[#162d22] p-3 rounded-xl">
                <span className="text-xs text-[#404944] dark:text-[#8cc2ac] block mb-1">Scenario Sensitivity</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#00392b] dark:text-white font-medium">CAPEX vs. Net Zero 2030</span>
                  <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">Optimal Path Identified</span>
                </div>
              </div>
            </div>

            {/* 4. Intelligent Action Engine */}
            <div 
              onClick={() => handleNavigate('actions')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">tune</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Intelligent Action Engine
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Prioritized decarbonization measures ranked by marginal abatement cost ($/tCO₂e reduced) and organizational implementation velocity.
                </p>
              </div>
              <div className="flex items-center justify-between bg-[#e7f8ec] dark:bg-[#162d22] p-3 rounded-xl text-xs">
                <span className="text-[#404944] dark:text-[#8cc2ac]">Recommended Actions</span>
                <span className="text-[#006c49] dark:text-[#9af5c6] font-semibold">14 Ready for Review</span>
              </div>
            </div>

            {/* 5. Verifiable Action Ledger */}
            <div 
              onClick={() => handleNavigate('actions')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">fact_check</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Verifiable Action Ledger
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  Cryptographically stamped audit entries preserving every parameter change, source telemetry packet, and emission factor alteration over time.
                </p>
              </div>
              <div className="bg-[#e7f8ec] dark:bg-[#162d22] p-3 rounded-xl flex items-center justify-between text-xs">
                <span className="text-[#404944] dark:text-[#8cc2ac]">Merkle Tree Attested</span>
                <span className="text-[#00392b] dark:text-white font-semibold">Zero Discrepancies</span>
              </div>
            </div>

            {/* 6. Regulatory Filings Engine */}
            <div 
              onClick={() => handleNavigate('reports')}
              className="bg-white dark:bg-[#13241c] p-6 rounded-2xl shadow-sm flex flex-col justify-between border-t-4 border-[#006c49] dark:border-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] cursor-pointer hover:shadow-md transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e1f2e7] dark:bg-[#1a5140] flex items-center justify-center text-[#006c49] dark:text-[#9af5c6] mb-4">
                  <span className="material-symbols-outlined text-xl">description</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                  Automated Disclosures
                </h3>
                <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] leading-relaxed mb-6">
                  One-click export of compliance-ready formats for EU CSRD (ESRS E1), SEC Climate Disclosures, TCFD, and CDP questionnaires with full footnote tracking.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6] text-[11px] font-semibold">
                  CSRD E1
                </span>
                <span className="px-2 py-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6] text-[11px] font-semibold">
                  SEC 10-K
                </span>
                <span className="px-2 py-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6] text-[11px] font-semibold">
                  TCFD
                </span>
                <span className="px-2 py-1 rounded bg-[#e1f2e7] dark:bg-[#1a5140] text-[#00392b] dark:text-[#9af5c6] text-[11px] font-semibold">
                  GHG Protocol
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL-WORLD DEPLOYMENT (3 Case Studies with Imagery) */}
      <section className="w-full py-20 bg-[#e7f8ec] dark:bg-[#0e1b15] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#006c49] dark:text-[#9af5c6] font-semibold">
              Institutional Provenance
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#00392b] dark:text-white mt-1">
              Transforming Assets at Institutional Scale
            </h2>
            <p className="text-sm sm:text-base text-[#404944] dark:text-[#8cc2ac] mt-2">
              From living educational campuses to global supply lines and multi-trillion-dollar capital allocators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Case 1: Biophilic Campus */}
            <div className="bg-white dark:bg-[#13241c] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#dcece1] dark:border-[#1e382c]">
              <div className="h-48 relative overflow-hidden bg-[#1a5140]">
                <img 
                  alt="Modern sustainable architecture campus with lush rooftop flora" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBySacKvrw-GeuYNj0koBI67qDm0JSt_hEa5UoKs7AZxiiXQkiCWjk4fzuzjoc9QEmCFZSlrXPFg9xKWuyTriUg8hfu2tS7hPYF2pS17iYfNqNr9gC43ZTV3esCz4qvp2p3d-l2TkpUkee__UEbgwo-uMFZp-iqiSFmHs6WUaXgx_d9eCireSdSMKRYW3mYY5FzDicd8vjmkWaUD8q4FdFqJgoWSGmS4hBx0QCqObXf"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#13241c]/90 backdrop-blur-md text-[#00392b] dark:text-[#9af5c6] text-xs font-semibold">
                    Higher Education & Campuses
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                    Biophilic Microgrid & HVAC Orchestration
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mb-6 leading-relaxed">
                    Echo AI connected 1,400 smart BMS points across a 12-building sustainable university complex, running predictive thermal load balancing matched to onsite solar and hydro assets.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xl font-bold text-[#00392b] dark:text-white">-31.4%</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">Thermal Energy Waste</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-xl font-bold text-[#006c49] dark:text-[#9af5c6]">$1.82M</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">Annual Cost Savings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 2: Global Manufacturing */}
            <div className="bg-white dark:bg-[#13241c] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#dcece1] dark:border-[#1e382c]">
              <div className="h-48 relative overflow-hidden bg-[#1a5140]">
                <img 
                  alt="State-of-the-art smart industrial manufacturing facility" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnNy2DYowm2rEVOqX223Fa3sMmVoYQQJSm9yGYrhAz-C-VmnN7fuGH2KbfLb7_uGp4hvJtX3KWI3cOyl9RC5NhUi96PPxOyLh15V-9ZIaxIm-bPcHqa756WWGbXI7AB2Rk0_VZkAw9ttTZ6GnvckOi4ps--Z7sI7aMoBiaSerc_4NXm38GsGxXhypZbLzCF60-H37-Tb3aHM6BCjp6ziTTYJtjQOBbCyRaXFyCGD68"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#13241c]/90 backdrop-blur-md text-[#00392b] dark:text-[#9af5c6] text-xs font-semibold">
                    Global Manufacturing
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                    Scope 3 Multi-Tier Supplier Decarbonization
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mb-6 leading-relaxed">
                    Replaced generic spend-based calculations with automated primary bills of materials and logistics telematics across 840+ supplier plants across three continents.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xl font-bold text-[#00392b] dark:text-white">82,000</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">tCO₂e Abated in Y1</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-xl font-bold text-[#006c49] dark:text-[#9af5c6]">100%</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">CSRD Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Case 3: Infrastructure Portfolios */}
            <div className="bg-white dark:bg-[#13241c] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col border border-[#dcece1] dark:border-[#1e382c]">
              <div className="h-48 relative overflow-hidden bg-[#1a5140]">
                <img 
                  alt="Aerial view of institutional wind farms and battery storage facilities" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChcSDLByJQSEXvgb0ClG6s1YpiH0fzuK2-2RhZv2UZpzl6ZDXXkzmzr1uArsptt3iyYt8XQD8AqbIXhAJDmBIDqzqLlztFJTwauI5WDYw-n6uwGY_MW_ozX6nMWAgtzzdtsSYGPSuI1hBziFvyOVjzSjzBRWP2zb2Jea1sZTXxZqH2f_8E-R13vWblvJwuTbQRXP-aqSzMwpLwwY7WAfjrrwGZxGiaaxksedP5JCF4"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#13241c]/90 backdrop-blur-md text-[#00392b] dark:text-[#9af5c6] text-xs font-semibold">
                    Real Estate & Portfolios
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#00392b] dark:text-white mb-2">
                    Institutional Green Bond Covenant Assurance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mb-6 leading-relaxed">
                    Continuous audit validation across $4.2B in real estate debt covenants. Provided external auditors with immutable provenance trails for EU Taxonomy alignment.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#e1f2e7] dark:border-[#1e382c] flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xl font-bold text-[#00392b] dark:text-white">0 bps</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">Coupon Penalty Risk</span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-xl font-bold text-[#006c49] dark:text-[#9af5c6]">Big Four</span>
                    <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac] block">Pre-Assurance Cleared</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE DECISION MATRIX / DATA STRIP */}
      <section className="w-full py-12 bg-[#edfdf2] dark:bg-[#0c1611] border-y border-[#dcece1] dark:border-[#1e382c] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#00392b] dark:text-white">12.8M</span>
              <p className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Metric Tons Carbon Tracked
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#006c49] dark:text-[#9af5c6]">340+</span>
              <p className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Enterprise Data Connectors
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#00392b] dark:text-white">&lt; 0.05%</span>
              <p className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                Audit Variance Margin
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#006c49] dark:text-[#9af5c6]">100%</span>
              <p className="text-xs uppercase tracking-wider text-[#404944] dark:text-[#8cc2ac] font-semibold">
                GHG Protocol Verified
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL EDITORIAL CTA PANEL */}
      <section className="w-full py-20 lg:py-28 bg-[#1a5140] text-white relative overflow-hidden">
        {/* SVG Contour Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 C150,200 350,50 500,120 C650,190 750,80 800,100 L800,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            <path d="M0,150 C200,240 300,90 520,180 C680,250 720,120 800,150 L800,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            <path d="M0,220 C180,310 320,160 540,240 C700,310 740,190 800,220 L800,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
            <path d="M0,290 C220,380 340,230 560,300 C720,370 760,260 800,290 L800,400 L0,400 Z" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00392b]/60 backdrop-blur-md text-[#9af5c6] text-xs font-semibold mb-6 border border-[#9af5c6]/20">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Institutional Environmental Intelligence</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto mb-6 text-balance">
            Turn Sustainability Intelligence Into Real-World Action.
          </h2>
          <p className="text-base sm:text-lg text-[#8cc2ac] max-w-2xl mx-auto mb-10 leading-relaxed">
            Equip your organization with auditable telemetry, generative digital twin simulation, and closed-loop decarbonization engineering.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#006c49] text-white px-8 py-4 rounded-xl font-semibold text-sm shadow-xl hover:bg-[#9af5c6] hover:text-[#002113] transition-all"
            >
              <span>Explore Executive Dashboard</span>
              <span className="material-symbols-outlined text-lg">calendar_today</span>
            </button>
            <button
              onClick={() => handleNavigate('digital-twin')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-[#00392b]/80 hover:bg-[#00392b] text-white px-8 py-4 rounded-xl font-semibold text-sm border border-[#8cc2ac]/20 transition-all"
            >
              <span>Explore Sandbox Simulation</span>
              <span className="material-symbols-outlined text-lg">terminal</span>
            </button>
          </div>

          {/* Compliance Stamps */}
          <div className="mt-12 pt-6 border-t border-[#8cc2ac]/20 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs text-[#8cc2ac]">
            <span className="inline-flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#9af5c6] text-base">check_circle</span>
              <span>GHG Protocol Corporate Standard</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#9af5c6] text-base">check_circle</span>
              <span>ISO 14064-1 & ISO 14064-3</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#9af5c6] text-base">check_circle</span>
              <span>SOC 2 Type II Certified</span>
            </span>
            <span className="inline-flex items-center space-x-1.5">
              <span className="material-symbols-outlined text-[#9af5c6] text-base">check_circle</span>
              <span>EU CSRD & ESRS E1 Ready</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
