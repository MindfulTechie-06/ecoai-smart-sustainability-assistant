import { useState } from 'react';
import { 
  Download, 
  Printer
} from 'lucide-react';
import { exportToCSV } from '../utils/carbonEngine';
import { ORGANIZATIONS } from '../data/mockData';

const ReportsSection = ({ metrics, selectedSite = 'all' }) => {
  const [reportingPeriod, setReportingPeriod] = useState('2026-Q1');
  const org = ORGANIZATIONS[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const reportData = [
      { Indicator: 'Total Carbon Emissions', Value: metrics.carbon.totalTonnes, Unit: 'tCO₂e', Reporting_Period: reportingPeriod },
      { Indicator: 'Scope 1 Emissions', Value: metrics.carbon.scope1, Unit: 'tCO₂e', Reporting_Period: reportingPeriod },
      { Indicator: 'Scope 2 Emissions', Value: metrics.carbon.scope2, Unit: 'tCO₂e', Reporting_Period: reportingPeriod },
      { Indicator: 'Scope 3 Emissions', Value: metrics.carbon.scope3, Unit: 'tCO₂e', Reporting_Period: reportingPeriod },
      { Indicator: 'Gross Energy Consumption', Value: metrics.energy.totalMWh, Unit: 'MWh', Reporting_Period: reportingPeriod },
      { Indicator: 'Renewable Electricity Share', Value: metrics.energy.renewableSharePercent, Unit: '%', Reporting_Period: reportingPeriod },
      { Indicator: 'Municipal Water Intake', Value: metrics.water.totalKiloLiters, Unit: 'kL', Reporting_Period: reportingPeriod },
      { Indicator: 'Water Recycled Share', Value: metrics.water.recycledSharePercent, Unit: '%', Reporting_Period: reportingPeriod },
      { Indicator: 'Waste Generated', Value: metrics.waste.totalTonnes, Unit: 'Tonnes', Reporting_Period: reportingPeriod },
      { Indicator: 'Landfill Diversion Rate', Value: metrics.waste.diversionRatePercent, Unit: '%', Reporting_Period: reportingPeriod },
      { Indicator: 'Mobility Emissions', Value: metrics.mobility.totalTonnesCO2, Unit: 'tCO₂e', Reporting_Period: reportingPeriod }
    ];
    exportToCSV(`EchoAI_ESG_Report_${reportingPeriod}_${new Date().toISOString().split('T')[0]}`, reportData);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Section Header Controls (Hidden on print) */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#00392b] dark:text-white">
                Sustainability & ESG Disclosure Reports
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mt-1">
              Automated corporate disclosures aligned with GHG Protocol and CSRD reporting indicators.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={reportingPeriod}
              onChange={(e) => setReportingPeriod(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="2026-Q1">Q1 2026 (Jan - Mar)</option>
              <option value="2025-FY">Full Year 2025 Annual</option>
              <option value="Trailing-12M">Trailing 12 Months</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* The Printable Executive Report Document */}
        <div className="stitch-card p-8 md:p-12 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] shadow-md space-y-8">
          
          {/* Report Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-[#17251E] dark:border-white gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-[#247A55] dark:text-[#38C48B] mb-1">
                Corporate Environmental Disclosure
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#17251E] dark:text-white">
                {org.name}
              </h1>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-1">
                Headquarters: {org.headquarters} • Industry: {org.industry} • Scope: {selectedSite === 'all' ? 'Consolidated All Sites' : selectedSite} • Reporting Period: {reportingPeriod}
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-xs font-mono font-semibold text-[#17251E] dark:text-white">REPORT REF: ESG-2026-Q1</div>
              <div className="text-[11px] text-[#66756B] mt-0.5">Generated: {new Date().toLocaleDateString()}</div>
              <span className="mt-2 inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#DDF3E5] text-[#247A55]">
                GHG Protocol Verified
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#17251E] dark:text-white">
              1. Executive Summary & Science-Based Targets
            </h3>
            <p className="text-xs leading-relaxed text-[#66756B] dark:text-[#96A59C]">
              During the active reporting period, {org.name} generated a consolidated gross carbon footprint of{' '}
              <strong className="text-[#17251E] dark:text-white">{metrics.carbon.totalTonnes} metric tonnes CO₂e</strong>,
              representing a <strong className="text-[#247A55]">{Math.abs(metrics.carbon.deltaPercent)}% reduction</strong>{' '}
              against the historical operational baseline. The organization remains on track to achieve its SBTi-aligned
              target of {org.targetReduction}.
            </p>
          </div>

          {/* Table: Five Core Environmental Indicators */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#17251E] dark:text-white">
              2. Consolidated Environmental Indicators Scorecard
            </h3>

            <div className="overflow-x-auto rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F6] dark:bg-[#0E1713] text-[#66756B] uppercase font-semibold text-[10px] tracking-wider border-b border-[#E6ECE7] dark:border-[#23362C]">
                  <tr>
                    <th className="px-4 py-2.5">Indicator Domain</th>
                    <th className="px-4 py-2.5">Primary Reading</th>
                    <th className="px-4 py-2.5">Clean / Recycled Share</th>
                    <th className="px-4 py-2.5">Period Movement</th>
                    <th className="px-4 py-2.5">Data Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6ECE7] dark:divide-[#23362C]">
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#17251E] dark:text-white">1. Carbon Footprint</td>
                    <td className="px-4 py-2.5 font-mono">{metrics.carbon.totalTonnes} tCO₂e</td>
                    <td className="px-4 py-2.5 text-[#66756B]">Scope 1: {metrics.carbon.scope1}t | Scope 2: {metrics.carbon.scope2}t | Scope 3: {metrics.carbon.scope3}t</td>
                    <td className="px-4 py-2.5 text-[#247A55] font-semibold">{metrics.carbon.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-emerald-700">High (97%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#17251E] dark:text-white">2. Energy Consumption</td>
                    <td className="px-4 py-2.5 font-mono">{metrics.energy.totalMWh} MWh</td>
                    <td className="px-4 py-2.5 text-amber-700 font-medium">{metrics.energy.renewableSharePercent}% On-Site Solar</td>
                    <td className="px-4 py-2.5 text-[#247A55] font-semibold">{metrics.energy.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-emerald-700">High (99%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#17251E] dark:text-white">3. Water Intake</td>
                    <td className="px-4 py-2.5 font-mono">{metrics.water.totalKiloLiters} kL</td>
                    <td className="px-4 py-2.5 text-blue-700 font-medium">{metrics.water.recycledSharePercent}% Process Recycling</td>
                    <td className="px-4 py-2.5 text-[#247A55] font-semibold">{metrics.water.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-blue-700">Moderate (94%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#17251E] dark:text-white">4. Waste Generation</td>
                    <td className="px-4 py-2.5 font-mono">{metrics.waste.totalTonnes} Tonnes</td>
                    <td className="px-4 py-2.5 text-purple-700 font-medium">{metrics.waste.diversionRatePercent}% Landfill Diversion</td>
                    <td className="px-4 py-2.5 text-amber-700 font-semibold">{metrics.waste.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-blue-700">Moderate (91%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#17251E] dark:text-white">5. Mobility Emissions</td>
                    <td className="px-4 py-2.5 font-mono">{metrics.mobility.totalTonnesCO2} tCO₂e</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-medium">{metrics.mobility.evSharePercent}% Clean EV / Public Transit</td>
                    <td className="px-4 py-2.5 text-[#247A55] font-semibold">{metrics.mobility.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-amber-700">Survey Model (86%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Methodology & Disclosures */}
          <div className="p-4 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] space-y-2 text-[11px] text-[#66756B] dark:text-[#96A59C] leading-relaxed">
            <div className="font-semibold text-[#17251E] dark:text-white uppercase tracking-wider">
              3. Standards & Verification Disclosures
            </div>
            <p>
              Calculations adhere strictly to the <strong>GHG Protocol Corporate Standard (Revised Edition)</strong>.
              Scope 2 emissions utilize location-based factors from EPA eGRID 2024. All activity logs are audited against
              utility metrology and invoice ledgers. Demonstration values are simulated for testing scenarios and are not
              third-party regulatory statements.
            </p>
          </div>

          {/* Signoff / Footer */}
          <div className="pt-6 border-t border-[#E6ECE7] dark:border-[#23362C] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#66756B] gap-2">
            <div>
              <span>Platform: Echo AI Sustainability Intelligence System</span>
            </div>
            <div>
              <span>Auditor Signoff: EcoGlobal Corporate ESG Steering Committee</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ReportsSection;
