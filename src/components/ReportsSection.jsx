import { useState } from 'react';
import { 
  Download, 
  Printer
} from 'lucide-react';
import { exportToCSV } from '../utils/carbonEngine';
import { ORGANIZATIONS } from '../data/mockData';
import PageHeader from './PageHeader';

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

        {/* Standardized Page Header (Hidden on print) */}
        <PageHeader
          className="no-print"
          badge="CSRD & SEC Compliance"
          title="Reports & Filings"
          description="Automated corporate ESG disclosures aligned with GHG Protocol, CSRD ESRS E1, and SEC climate disclosure standards."
          actions={
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] text-[#14251D] dark:text-[#F2F8F4] focus:outline-none cursor-pointer shadow-xs focus:border-[#075B43]"
              >
                <option value="2026-Q1">Q1 2026 (Jan - Mar)</option>
                <option value="2025-FY">Full Year 2025 Annual</option>
                <option value="Trailing-12M">Trailing 12 Months</option>
              </select>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#14251D] dark:text-[#F2F8F4] bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] hover:bg-[#EDF3EF] dark:hover:bg-[#173329] shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
              >
                <Download className="w-3.5 h-3.5 text-[#075B43] dark:text-[#20B982]" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#075B43] hover:bg-[#0C956B] dark:bg-[#20B982] dark:hover:bg-[#0C956B] dark:text-[#081710] shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          }
        />

        {/* The Printable Executive Report Document */}
        <div className="stitch-card p-8 md:p-12 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] shadow-md space-y-8">
          
          {/* Report Masthead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-[#14251D] dark:border-[#244538] gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest font-extrabold text-[#075B43] dark:text-[#20B982] mb-1">
                Corporate Environmental Disclosure
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[#14251D] dark:text-[#F2F8F4]">
                {org.name}
              </h1>
              <p className="text-xs text-[#64766B] dark:text-[#9AB9A8] mt-1">
                Headquarters: {org.headquarters} • Industry: {org.industry} • Scope: {selectedSite === 'all' ? 'Consolidated All Sites' : selectedSite} • Reporting Period: {reportingPeriod}
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-xs font-mono font-semibold text-[#14251D] dark:text-[#F2F8F4]">REPORT REF: ESG-2026-Q1</div>
              <div className="text-[11px] text-[#64766B] dark:text-[#9AB9A8] mt-0.5">Generated: {new Date().toLocaleDateString()}</div>
              <span className="mt-2 inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E5F5EC] dark:bg-[#173329] text-[#075B43] dark:text-[#20B982] border border-[#DCE8E0] dark:border-[#244538]">
                GHG Protocol Verified
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#14251D] dark:text-[#F2F8F4]">
              1. Executive Summary & Science-Based Targets
            </h3>
            <p className="text-xs leading-relaxed text-[#64766B] dark:text-[#9AB9A8]">
              During the active reporting period, {org.name} generated a consolidated gross carbon footprint of{' '}
              <strong className="text-[#14251D] dark:text-[#F2F8F4]">{metrics.carbon.totalTonnes} metric tonnes CO₂e</strong>,
              representing a <strong className="text-[#075B43] dark:text-[#20B982]">{Math.abs(metrics.carbon.deltaPercent)}% reduction</strong>{' '}
              against the historical operational baseline. The organization remains on track to achieve its SBTi-aligned
              target of {org.targetReduction}.
            </p>
          </div>

          {/* Table: Five Core Environmental Indicators */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-[#14251D] dark:text-[#F2F8F4]">
              2. Consolidated Environmental Indicators Scorecard
            </h3>

            <div className="overflow-x-auto rounded-xl border border-[#DCE8E0] dark:border-[#244538]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F8F6] dark:bg-[#0C1D15] text-[#64766B] dark:text-[#9AB9A8] uppercase font-semibold text-[10px] tracking-wider border-b border-[#DCE8E0] dark:border-[#244538]">
                  <tr>
                    <th className="px-4 py-2.5">Indicator Domain</th>
                    <th className="px-4 py-2.5">Primary Reading</th>
                    <th className="px-4 py-2.5">Clean / Recycled Share</th>
                    <th className="px-4 py-2.5">Period Movement</th>
                    <th className="px-4 py-2.5">Data Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE8E0] dark:divide-[#244538] bg-white dark:bg-[#12271D]">
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#14251D] dark:text-[#F2F8F4]">1. Carbon Footprint</td>
                    <td className="px-4 py-2.5 font-mono text-[#14251D] dark:text-[#F2F8F4]">{metrics.carbon.totalTonnes} tCO₂e</td>
                    <td className="px-4 py-2.5 text-[#64766B] dark:text-[#9AB9A8]">Scope 1: {metrics.carbon.scope1}t | Scope 2: {metrics.carbon.scope2}t | Scope 3: {metrics.carbon.scope3}t</td>
                    <td className="px-4 py-2.5 text-[#075B43] dark:text-[#20B982] font-semibold">{metrics.carbon.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold">High (97%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#14251D] dark:text-[#F2F8F4]">2. Energy Consumption</td>
                    <td className="px-4 py-2.5 font-mono text-[#14251D] dark:text-[#F2F8F4]">{metrics.energy.totalMWh} MWh</td>
                    <td className="px-4 py-2.5 text-amber-700 dark:text-amber-400 font-medium">{metrics.energy.renewableSharePercent}% On-Site Solar</td>
                    <td className="px-4 py-2.5 text-[#075B43] dark:text-[#20B982] font-semibold">{metrics.energy.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold">High (99%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#14251D] dark:text-[#F2F8F4]">3. Water Intake</td>
                    <td className="px-4 py-2.5 font-mono text-[#14251D] dark:text-[#F2F8F4]">{metrics.water.totalKiloLiters} kL</td>
                    <td className="px-4 py-2.5 text-blue-700 dark:text-blue-400 font-medium">{metrics.water.recycledSharePercent}% Process Recycling</td>
                    <td className="px-4 py-2.5 text-[#075B43] dark:text-[#20B982] font-semibold">{metrics.water.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-blue-700 dark:text-blue-400 font-semibold">Moderate (94%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#14251D] dark:text-[#F2F8F4]">4. Waste Generation</td>
                    <td className="px-4 py-2.5 font-mono text-[#14251D] dark:text-[#F2F8F4]">{metrics.waste.totalTonnes} Tonnes</td>
                    <td className="px-4 py-2.5 text-purple-700 dark:text-purple-400 font-medium">{metrics.waste.diversionRatePercent}% Landfill Diversion</td>
                    <td className="px-4 py-2.5 text-amber-700 dark:text-amber-400 font-semibold">{metrics.waste.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-blue-700 dark:text-blue-400 font-semibold">Moderate (91%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 font-semibold text-[#14251D] dark:text-[#F2F8F4]">5. Mobility Emissions</td>
                    <td className="px-4 py-2.5 font-mono text-[#14251D] dark:text-[#F2F8F4]">{metrics.mobility.totalTonnesCO2} tCO₂e</td>
                    <td className="px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-medium">{metrics.mobility.evSharePercent}% Clean EV / Public Transit</td>
                    <td className="px-4 py-2.5 text-[#075B43] dark:text-[#20B982] font-semibold">{metrics.mobility.deltaPercent}%</td>
                    <td className="px-4 py-2.5 text-amber-700 dark:text-amber-400 font-semibold">Survey Model (86%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Methodology & Disclosures */}
          <div className="p-4 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538] space-y-2 text-[11px] text-[#64766B] dark:text-[#9AB9A8] leading-relaxed">
            <div className="font-semibold text-[#14251D] dark:text-[#F2F8F4] uppercase tracking-wider">
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
          <div className="pt-6 border-t border-[#DCE8E0] dark:border-[#244538] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#64766B] dark:text-[#9AB9A8] gap-2">
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
