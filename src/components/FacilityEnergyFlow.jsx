export default function FacilityEnergyFlow({ levers, simulation, facilityName = "Consolidated Operations" }) {
  const {
    solarAdoptionPercent = 25,
    energyEfficiencyPercent = 15,
    waterRecyclingPercent = 20,
    wasteDiversionPercent = 65,
    fleetElectrificationPercent = 30,
    cleanPowerProcurementPercent = 0
  } = levers;

  return (
    <div className="stitch-card p-5 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-4">
      {/* Schematic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#9af5c6] animate-pulse" />
          <h4 className="font-heading font-semibold text-xs sm:text-sm text-[#00392b] dark:text-white uppercase tracking-wider">
            Operational Facility Resource & Energy Flow Architecture
          </h4>
        </div>
        <div className="text-[11px] text-[#404944] dark:text-[#8cc2ac] flex items-center space-x-2">
          <span className="font-semibold text-[#00392b] dark:text-white">{facilityName}</span>
          <span>•</span>
          <span className="text-emerald-700 dark:text-[#9af5c6] font-mono font-semibold">
            -{simulation.impact.carbonSavedTonnes} tCO₂e / yr Net Sink
          </span>
        </div>
      </div>

      {/* Interactive Vector Flow Canvas */}
      <div className="relative w-full overflow-hidden rounded-xl bg-[#f8fdf9] dark:bg-[#0a140f] p-4 border border-[#e1f2e7] dark:border-[#1a382b]">
        
        {/* Grid of 6 Operational Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* Node 1: Grid Ingress & PPA */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#006c49] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac]">
                Power Ingress
              </span>
              <span className="text-[10px] font-mono font-semibold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-1.5 py-0.5 rounded">
                {cleanPowerProcurementPercent}% Clean PPA
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                {simulation.proposed.energyMWh} <span className="text-[11px] font-normal text-[#707974]">MWh Grid</span>
              </div>
              <span className="text-[10px] text-[#404944] dark:text-[#8cc2ac]">
                Scope 2: {simulation.proposed.scope2} t
              </span>
            </div>
            <div className="w-full bg-[#e1f2e7] dark:bg-[#1a382b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-[#006c49] dark:bg-[#9af5c6] h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(10, 100 - cleanPowerProcurementPercent))}%` }}
              />
            </div>
          </div>

          {/* Node 2: Solar PV Array */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#eab308] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-amber-500 text-xs">solar_power</span>
                Rooftop Solar PV
              </span>
              <span className="text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                {solarAdoptionPercent}% Share
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                +{simulation.interventions[0]?.resourceSaved.split(' ')[0] || 0} <span className="text-[11px] font-normal text-[#707974]">MWh Gen</span>
              </div>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">
                -${Math.round((simulation.interventions[0]?.annualSavingsUSD || 0) / 1000)}k/yr
              </span>
            </div>
            <div className="w-full bg-amber-100 dark:bg-amber-950/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, solarAdoptionPercent * 1.25)}%` }}
              />
            </div>
          </div>

          {/* Node 3: Building & HVAC Loop */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-emerald-600 text-xs">hvac</span>
                HVAC & Envelope
              </span>
              <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-1.5 py-0.5 rounded">
                -{energyEfficiencyPercent}% Demand
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                {simulation.interventions[1]?.resourceSaved.split(' ')[0] || 0} <span className="text-[11px] font-normal text-[#707974]">MWh Saved</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">
                -{simulation.interventions[1]?.carbonCutTonnes || 0} tCO₂e
              </span>
            </div>
            <div className="w-full bg-[#e1f2e7] dark:bg-[#1a382b] h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-600 dark:bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, energyEfficiencyPercent * 2.5)}%` }}
              />
            </div>
          </div>

          {/* Node 4: Water Recirculation */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#0284c7] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-sky-500 text-xs">water_drop</span>
                Water Loop
              </span>
              <span className="text-[10px] font-mono font-semibold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-1.5 py-0.5 rounded">
                {waterRecyclingPercent}% Recycled
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                {simulation.proposed.waterKL.toLocaleString()} <span className="text-[11px] font-normal text-[#707974]">kL Intake</span>
              </div>
              <span className="text-[10px] text-sky-700 dark:text-sky-300 font-semibold">
                -{simulation.interventions[2]?.carbonCutTonnes || 0} tCO₂e
              </span>
            </div>
            <div className="w-full bg-sky-100 dark:bg-sky-950/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-sky-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, waterRecyclingPercent * 1.66)}%` }}
              />
            </div>
          </div>

          {/* Node 5: Zero-Waste Diversion */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#8b5cf6] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-purple-500 text-xs">recycling</span>
                Zero-Waste Depot
              </span>
              <span className="text-[10px] font-mono font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded">
                {wasteDiversionPercent}% Diverted
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                {simulation.proposed.wasteTonnes} <span className="text-[11px] font-normal text-[#707974]">T Landfill</span>
              </div>
              <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">
                -{simulation.interventions[3]?.carbonCutTonnes || 0} tCO₂e
              </span>
            </div>
            <div className="w-full bg-purple-100 dark:bg-purple-950/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, wasteDiversionPercent)}%` }}
              />
            </div>
          </div>

          {/* Node 6: Electric Fleet Depot */}
          <div className="p-3 rounded-xl bg-white dark:bg-[#112019] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group hover:border-[#10b981] transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#707974] dark:text-[#8cc2ac] flex items-center gap-1">
                <span className="material-symbols-outlined text-emerald-500 text-xs">electric_car</span>
                Fleet Depot
              </span>
              <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                {fleetElectrificationPercent}% EV
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-heading font-bold text-sm text-[#00392b] dark:text-white">
                {simulation.proposed.fleetLiters.toLocaleString()} <span className="text-[11px] font-normal text-[#707974]">L Diesel</span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">
                Scope 1: {simulation.proposed.scope1} t
              </span>
            </div>
            <div className="w-full bg-emerald-100 dark:bg-emerald-950/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, fleetElectrificationPercent)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Central Telemetry Summary Banner */}
        <div className="mt-3.5 pt-3 border-t border-[#dcece1] dark:border-[#1e382c] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#404944] dark:text-[#8cc2ac] gap-2">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-base text-[#006c49] dark:text-[#9af5c6]">
              hub
            </span>
            <span>Digital Twin Sensor Synchronizer: <strong>Active Telemetry Loop</strong></span>
          </div>
          <div className="flex items-center space-x-3 font-mono text-[11px]">
            <span>Baseline: <strong>{simulation.baseline.totalCarbonTonnes} tCO₂e</strong></span>
            <span>→</span>
            <span className="text-emerald-700 dark:text-[#9af5c6] font-bold">
              Simulated: <strong>{simulation.proposed.totalCarbonTonnes} tCO₂e (-{simulation.impact.carbonReductionPercent}%)</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

