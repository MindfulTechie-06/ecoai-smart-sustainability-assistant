import { Building2, Recycle, TreePine } from 'lucide-react';

const SDGSection = () => {
  const sdgs = [
    {
      number: '11',
      title: 'Sustainable Cities & Communities',
      description: 'Make operational campuses inclusive, safe, resilient, and energy-neutral with localized clean microgrids.',
      icon: Building2,
      tag: 'Target 11.6: Air Quality & Waste'
    },
    {
      number: '12',
      title: 'Responsible Consumption & Production',
      description: 'Achieve zero-waste to landfill by implementing closed-loop process water recycling and commercial composting.',
      icon: Recycle,
      tag: 'Target 12.5: Substantial Waste Reduction'
    },
    {
      number: '13',
      title: 'Climate Action',
      description: 'Mitigate greenhouse gas emissions across corporate supply chains with transparent, verifiable carbon intelligence.',
      icon: TreePine,
      tag: 'Target 13.2: Climate Policy Integration'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#15221C] border-b border-[#E6ECE7] dark:border-[#23362C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#247A55] dark:text-[#38C48B] mb-2 block">
            Global Framework
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#17251E] dark:text-white mb-3">
            United Nations SDG Alignment
          </h2>
          <p className="text-xs sm:text-sm text-[#66756B] dark:text-[#96A59C]">
            Every verified initiative tracked in Echo AI directly maps to UN Sustainable Development Goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sdgs.map((sdg) => {
            const Icon = sdg.icon;
            return (
              <div
                key={sdg.number}
                className="p-6 rounded-2xl bg-[#FBFBF9] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#247A55] text-white flex items-center justify-center font-heading font-extrabold text-sm">
                    {sdg.number}
                  </div>
                  <Icon className="w-5 h-5 text-[#247A55] dark:text-[#38C48B]" />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-[#17251E] dark:text-white mb-1.5">
                    {sdg.title}
                  </h3>
                  <p className="text-xs text-[#66756B] dark:text-[#96A59C] leading-relaxed">
                    {sdg.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E6ECE7] dark:border-[#23362C] text-[11px] font-semibold text-[#247A55] dark:text-[#38C48B]">
                  {sdg.tag}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SDGSection;
