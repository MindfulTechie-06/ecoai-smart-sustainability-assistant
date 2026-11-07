import { 
  Building2, 
  MapPin, 
  Plus
} from 'lucide-react';
import { ORGANIZATIONS } from '../data/mockData';
import PageHeader from './PageHeader';

const MultiSiteSection = ({ selectedSite, onSelectSite }) => {
  const org = ORGANIZATIONS[0];

  const roles = [
    { role: 'Chief Sustainability Officer (CSO)', access: 'Full Read/Write, Scenario Approval, Audit Export', scope: 'Enterprise-Wide (All Sites)', count: 2 },
    { role: 'Facility Operations Manager', access: 'Site Telemetry Read/Write, Sensor Config', scope: 'Site-Specific (Assigned Facility)', count: 6 },
    { role: 'Third-Party GHG Auditor', access: 'Read-Only Audit Trail & Raw Metrology', scope: 'Read-Only Ledger & Emission Factors', count: 3 },
    { role: 'Department Sustainability Viewer', access: 'Scorecard Views & Recommendations', scope: 'Read-Only Executive Summary', count: 45 }
  ];

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      {/* Standardized Page Header */}
      <PageHeader
        badge="Global Entity Hierarchy"
        title="Operating Campuses"
        description="Hierarchical campus management, facility-level data boundaries, and role-based access control across global portfolios."
        actions={
          <button 
            type="button"
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#075B43] hover:bg-[#0C956B] dark:bg-[#20B982] dark:hover:bg-[#0C956B] dark:text-[#081710] shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075B43]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register New Facility</span>
          </button>
        }
      />

      <div className="space-y-6">

        {/* Organization Overview Card */}
        <div className="stitch-card p-6 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#075B43] dark:text-[#20B982]">
                  Corporate Entity
                </span>
                <span className="text-xs text-[#64766B] dark:text-[#9AB9A8]">• Primary Tenant</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#14251D] dark:text-[#F2F8F4]">
                {org.name}
              </h3>
              <p className="text-xs text-[#64766B] dark:text-[#9AB9A8] mt-1">
                {org.headquarters} • Industry: {org.industry} • Target: {org.targetReduction}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-medium text-[#14251D] dark:text-[#F2F8F4]">
              <div className="p-3 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] text-center border border-[#DCE8E0] dark:border-[#244538]">
                <div className="text-lg font-bold text-[#075B43] dark:text-[#20B982]">3</div>
                <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Active Sites</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] text-center border border-[#DCE8E0] dark:border-[#244538]">
                <div className="text-lg font-bold text-[#14251D] dark:text-[#F2F8F4]">200k</div>
                <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Total Sq Ft</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F5F8F6] dark:bg-[#0C1D15] text-center border border-[#DCE8E0] dark:border-[#244538]">
                <div className="text-lg font-bold text-[#0C956B] dark:text-[#20B982]">1,210</div>
                <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Staff Count</div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities List Grid */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-base text-[#14251D] dark:text-[#F2F8F4]">
            Operational Facilities & Campuses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {org.sites.filter(s => s.id !== 'all').map((site) => {
              const isSelected = selectedSite === site.id;
              return (
                <div
                  key={site.id}
                  onClick={() => onSelectSite(site.id)}
                  className={`stitch-card p-6 cursor-pointer transition-all border ${
                    isSelected
                      ? 'border-[#075B43] dark:border-[#20B982] ring-2 ring-[#075B43]/20 dark:ring-[#20B982]/20 shadow-md bg-white dark:bg-[#12271D]'
                      : 'border-[#DCE8E0] dark:border-[#244538] bg-white dark:bg-[#12271D] hover:border-[#0C956B]/40 dark:hover:border-[#20B982]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#E5F5EC] text-[#075B43] dark:bg-[#173329] dark:text-[#20B982] border border-[#DCE8E0] dark:border-[#244538]">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-[#075B43] dark:bg-[#20B982] text-white dark:text-[#081710]' 
                        : 'bg-[#EDF3EF] dark:bg-[#173329] text-[#64766B] dark:text-[#9AB9A8] border border-[#DCE8E0] dark:border-[#244538]'
                    }`}>
                      {isSelected ? 'Active Scope' : 'Select Facility'}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#14251D] dark:text-[#F2F8F4] mb-1">
                    {site.name}
                  </h4>
                  <div className="flex items-center text-xs text-[#64766B] dark:text-[#9AB9A8] mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#075B43] dark:text-[#20B982]" />
                    <span>{site.city}</span>
                    <span className="mx-2">•</span>
                    <span>{site.type}</span>
                  </div>

                  <div className="pt-3 border-t border-[#DCE8E0] dark:border-[#244538] grid grid-cols-2 gap-2 text-xs text-center">
                    <div className="p-2 rounded-lg bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Floor Area</div>
                      <div className="font-semibold text-[#14251D] dark:text-[#F2F8F4]">{site.floorArea}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5F8F6] dark:bg-[#0C1D15] border border-[#DCE8E0] dark:border-[#244538]">
                      <div className="text-[10px] text-[#64766B] dark:text-[#9AB9A8]">Personnel</div>
                      <div className="font-semibold text-[#14251D] dark:text-[#F2F8F4]">{site.headCount} users</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role-Based Access Control (RBAC) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#12271D] border border-[#DCE8E0] dark:border-[#244538] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#14251D] dark:text-[#F2F8F4]">
                Multi-Tenant Access Control & Permissions (RBAC)
              </h3>
              <p className="text-xs text-[#64766B] dark:text-[#9AB9A8]">
                Strict cryptographic data boundaries enforcing facility-level segregation.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E5F5EC] dark:bg-[#173329] text-[#075B43] dark:text-[#20B982] border border-[#DCE8E0] dark:border-[#244538]">
              Zero-Trust Architecture
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#DCE8E0] dark:border-[#244538]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F8F6] dark:bg-[#0C1D15] text-[#64766B] dark:text-[#9AB9A8] uppercase text-[10px] tracking-wider border-b border-[#DCE8E0] dark:border-[#244538]">
                <tr>
                  <th className="px-4 py-3">Role Designation</th>
                  <th className="px-4 py-3">Operational Permissions</th>
                  <th className="px-4 py-3">Data Isolation Scope</th>
                  <th className="px-4 py-3 text-right">Active Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE8E0] dark:divide-[#244538] bg-white dark:bg-[#12271D]">
                {roles.map((r, i) => (
                  <tr key={i} className="hover:bg-[#EDF3EF]/60 dark:hover:bg-[#173329]/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#14251D] dark:text-[#F2F8F4]">
                      {r.role}
                    </td>
                    <td className="px-4 py-3 text-[#64766B] dark:text-[#9AB9A8]">
                      {r.access}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#E5F5EC] dark:bg-[#173329] text-[#075B43] dark:text-[#20B982] border border-[#DCE8E0] dark:border-[#244538] text-[10px] font-semibold">
                        {r.scope}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium text-[#14251D] dark:text-[#F2F8F4]">
                      {r.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MultiSiteSection;
