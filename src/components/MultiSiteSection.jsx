import { 
  Building2, 
  MapPin, 
  Plus
} from 'lucide-react';
import { ORGANIZATIONS } from '../data/mockData';

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
      <div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#00392b] dark:text-white">
                Multi-Site & Organization Management
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mt-1">
              Hierarchical campus management, facility-level data boundaries, and role-based access control.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>Register New Facility</span>
            </button>
          </div>
        </div>

        {/* Organization Overview Card */}
        <div className="stitch-card p-6 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#247A55] dark:text-[#38C48B]">
                  Corporate Entity
                </span>
                <span className="text-xs text-[#66756B]">• Primary Tenant</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#17251E] dark:text-white">
                {org.name}
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C] mt-1">
                {org.headquarters} • Industry: {org.industry} • Target: {org.targetReduction}
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs font-medium text-[#17251E] dark:text-white">
              <div className="p-3 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] text-center border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="text-lg font-bold text-[#247A55]">3</div>
                <div className="text-[10px] text-[#66756B]">Active Sites</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] text-center border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="text-lg font-bold text-[#17251E] dark:text-white">200k</div>
                <div className="text-[10px] text-[#66756B]">Total Sq Ft</div>
              </div>
              <div className="p-3 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] text-center border border-[#E6ECE7] dark:border-[#23362C]">
                <div className="text-lg font-bold text-emerald-600">1,210</div>
                <div className="text-[10px] text-[#66756B]">Staff Count</div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities List Grid */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
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
                      ? 'border-[#247A55] ring-2 ring-[#247A55]/20 shadow-md bg-white dark:bg-[#15221C]'
                      : 'border-[#E6ECE7] dark:border-[#23362C] bg-white dark:bg-[#15221C] hover:border-[#A7C9AF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-[#DDF3E5] text-[#247A55] dark:bg-[#1E3626] dark:text-[#38C48B]">
                      <Building2 className="w-5 h-5" />
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#247A55] text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isSelected ? 'Active Scope' : 'Select Facility'}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#17251E] dark:text-white mb-1">
                    {site.name}
                  </h4>
                  <div className="flex items-center text-xs text-[#66756B] mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-[#247A55]" />
                    <span>{site.city}</span>
                    <span className="mx-2">•</span>
                    <span>{site.type}</span>
                  </div>

                  <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] grid grid-cols-2 gap-2 text-xs text-center">
                    <div className="p-2 rounded-lg bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Floor Area</div>
                      <div className="font-semibold text-[#17251E] dark:text-white">{site.floorArea}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F6F8F6] dark:bg-[#0E1713]">
                      <div className="text-[10px] text-[#66756B]">Personnel</div>
                      <div className="font-semibold text-[#17251E] dark:text-white">{site.headCount} users</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Role-Based Access Control (RBAC) */}
        <div className="stitch-card p-6 bg-white dark:bg-[#15221C]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                Multi-Tenant Access Control & Permissions (RBAC)
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Strict cryptographic data boundaries enforcing facility-level segregation.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DDF3E5] text-[#247A55]">
              Zero-Trust Architecture
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F6F8F6] dark:bg-[#0E1713] text-[#66756B] dark:text-[#96A59C] uppercase text-[10px] tracking-wider border-b border-[#E6ECE7] dark:border-[#23362C]">
                <tr>
                  <th className="px-4 py-3">Role Designation</th>
                  <th className="px-4 py-3">Operational Permissions</th>
                  <th className="px-4 py-3">Data Isolation Scope</th>
                  <th className="px-4 py-3 text-right">Active Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6ECE7] dark:divide-[#23362C]">
                {roles.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F6F8F6] dark:hover:bg-[#1A2A22] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#17251E] dark:text-white">
                      {r.role}
                    </td>
                    <td className="px-4 py-3 text-[#66756B] dark:text-gray-300">
                      {r.access}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                        {r.scope}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium">
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
