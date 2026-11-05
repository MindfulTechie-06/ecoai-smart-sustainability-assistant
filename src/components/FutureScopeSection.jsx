import { Network, ShieldCheck, Globe2 } from 'lucide-react';

const FutureScopeSection = () => {
  const roadmap = [
    {
      quarter: 'Q3 2026',
      title: 'Direct IoT Telemetry Gateways',
      desc: 'Native bidirectional connector for BACnet, Modbus, and MQTT sub-meter hardware for automated real-time feeds.',
      icon: Network
    },
    {
      quarter: 'Q4 2026',
      title: 'Scope 3 Supply Chain Portal',
      desc: 'Direct supplier onboarding portal allowing Tier 1 and Tier 2 vendors to upload certified product carbon footprints (PCF).',
      icon: Globe2
    },
    {
      quarter: 'Q1 2027',
      title: 'Automated Regulatory Submissions',
      desc: 'One-click compliance export adhering to EU Corporate Sustainability Due Diligence Directive (CSDDD) and CSRD XBRL taxonomy.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-20 bg-[#FBFBF9] dark:bg-[#0E1713]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#247A55] dark:text-[#38C48B] mb-2 block">
            Platform Horizon
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#17251E] dark:text-white mb-3">
            Technology Roadmap & Future Integrations
          </h2>
          <p className="text-xs sm:text-sm text-[#66756B] dark:text-[#96A59C]">
            Continuously advancing sustainability intelligence with automated hardware integrations and supply chain connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmap.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="stitch-card p-6 bg-white dark:bg-[#15221C] border border-[#E6ECE7] dark:border-[#23362C] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF3E5] text-[#247A55] dark:bg-[#1E3626] dark:text-[#38C48B]">
                      {item.quarter}
                    </span>
                    <Icon className="w-5 h-5 text-[#247A55]" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#17251E] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#66756B] dark:text-[#96A59C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] text-[11px] font-semibold text-[#247A55] flex items-center">
                  <span>Planned Release</span>
                  <span className="ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FutureScopeSection;
