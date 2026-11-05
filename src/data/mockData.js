// Echo AI - Enterprise Sustainability Intelligence Mock Dataset
// Clearly marked: Demonstration sample data for realistic enterprise operations

export const DEMO_NOTICE = "Sample Data — Simulated for Demonstration Purposes";

export const ORGANIZATIONS = [
  {
    id: "org-01",
    name: "EcoGlobal Enterprises",
    headquarters: "San Francisco, CA",
    reportingYear: 2026,
    industry: "Technology & Operations",
    targetReduction: "45% by 2030 (SBTi aligned)",
    sites: [
      { id: "all", name: "All Facilities (Consolidated)", floorArea: "200,000 sq ft", headCount: 1210 },
      { id: "site-01", name: "Metro Innovation Campus", city: "San Francisco, CA", floorArea: "45,000 sq ft", headCount: 850, type: "Commercial Office" },
      { id: "site-02", name: "North Logistics Center", city: "Sacramento, CA", floorArea: "120,000 sq ft", headCount: 140, type: "Distribution Warehouse" },
      { id: "site-03", name: "East R&D Facility", city: "Austin, TX", floorArea: "35,000 sq ft", headCount: 220, type: "Laboratory & Tech" }
    ]
  }
];

export const EMISSION_FACTORS = [
  {
    id: "ef-grid-us",
    category: "Electricity (Scope 2)",
    name: "Grid Electricity (US CAMX / Regional)",
    value: 0.385,
    unit: "kg CO₂e / kWh",
    source: "EPA eGRID 2024",
    geography: "US-CA",
    year: 2024,
    confidence: "High (0.98)"
  },
  {
    id: "ef-gas",
    category: "Stationary Combustion (Scope 1)",
    name: "Natural Gas (Heating / Boilers)",
    value: 2.02,
    unit: "kg CO₂e / m³",
    source: "DEFRA / GHG Protocol 2024",
    geography: "Global / US",
    year: 2024,
    confidence: "High (0.97)"
  },
  {
    id: "ef-diesel",
    category: "Mobile Fleet (Scope 1)",
    name: "Diesel Commercial Fleet",
    value: 2.68,
    unit: "kg CO₂e / Liter",
    source: "EPA Mandatory Reporting",
    geography: "US National",
    year: 2024,
    confidence: "High (0.99)"
  },
  {
    id: "ef-water",
    category: "Water Supply (Scope 3)",
    name: "Municipal Water Supply & Treatment",
    value: 0.344,
    unit: "kg CO₂e / kL (m³)",
    source: "UK BEIS / Water UK",
    geography: "Regional Average",
    year: 2023,
    confidence: "Moderate (0.91)"
  },
  {
    id: "ef-waste-landfill",
    category: "Waste Disposal (Scope 3)",
    name: "Mixed Waste to Landfill",
    value: 0.450,
    unit: "kg CO₂e / kg waste",
    source: "IPCC Guidelines for National GHG",
    geography: "Global standard",
    year: 2023,
    confidence: "Moderate (0.89)"
  },
  {
    id: "ef-commute-ice",
    category: "Employee Commute (Scope 3)",
    name: "Gasoline Passenger Vehicle Commute",
    value: 0.171,
    unit: "kg CO₂e / passenger-km",
    source: "DEFRA 2024 Passenger Transport",
    geography: "US / EU",
    year: 2024,
    confidence: "High (0.95)"
  }
];

export const ENVIRONMENTAL_METRICS = {
  consolidated: {
    period: "Last 30 Days (Rolling)",
    carbon: {
      totalTonnes: 142.8,
      deltaPercent: -6.4,
      targetBudgetTonnes: 160.0,
      scope1: 28.4,
      scope2: 74.2,
      scope3: 40.2
    },
    energy: {
      totalMWh: 192.7,
      renewableMWh: 54.0,
      renewableSharePercent: 28.0,
      deltaPercent: -4.2,
      costUSD: 32759
    },
    water: {
      totalKiloLiters: 1420,
      recycledKiloLiters: 280,
      recycledSharePercent: 19.7,
      deltaPercent: -8.1,
      costUSD: 4970
    },
    waste: {
      totalTonnes: 18.6,
      divertedTonnes: 11.2,
      diversionRatePercent: 60.2,
      deltaPercent: +3.1,
      landfillCostUSD: 2325
    },
    mobility: {
      totalTonnesCO2: 34.5,
      evSharePercent: 32.0,
      transitSharePercent: 44.0,
      deltaPercent: -11.0,
      totalPassengerKm: 198400
    }
  },
  "site-01": {
    period: "Last 30 Days (Rolling)",
    carbon: { totalTonnes: 62.4, deltaPercent: -7.8, scope1: 6.2, scope2: 38.6, scope3: 17.6 },
    energy: { totalMWh: 100.2, renewableMWh: 38.0, renewableSharePercent: 37.9, deltaPercent: -5.4, costUSD: 17034 },
    water: { totalKiloLiters: 680, recycledKiloLiters: 190, recycledSharePercent: 27.9, deltaPercent: -10.2, costUSD: 2380 },
    waste: { totalTonnes: 7.2, divertedTonnes: 5.1, diversionRatePercent: 70.8, deltaPercent: -2.0, landfillCostUSD: 900 },
    mobility: { totalTonnesCO2: 18.2, evSharePercent: 42.0, transitSharePercent: 48.0, deltaPercent: -14.2, totalPassengerKm: 112000 }
  },
  "site-02": {
    period: "Last 30 Days (Rolling)",
    carbon: { totalTonnes: 54.8, deltaPercent: -3.2, scope1: 18.4, scope2: 24.2, scope3: 12.2 },
    energy: { totalMWh: 62.8, renewableMWh: 10.0, renewableSharePercent: 15.9, deltaPercent: -2.1, costUSD: 10676 },
    water: { totalKiloLiters: 420, recycledKiloLiters: 40, recycledSharePercent: 9.5, deltaPercent: -4.0, costUSD: 1470 },
    waste: { totalTonnes: 8.8, divertedTonnes: 4.6, diversionRatePercent: 52.2, deltaPercent: +8.4, landfillCostUSD: 1100 },
    mobility: { totalTonnesCO2: 11.8, evSharePercent: 20.0, transitSharePercent: 32.0, deltaPercent: -5.0, totalPassengerKm: 62000 }
  },
  "site-03": {
    period: "Last 30 Days (Rolling)",
    carbon: { totalTonnes: 25.6, deltaPercent: -8.9, scope1: 3.8, scope2: 11.4, scope3: 10.4 },
    energy: { totalMWh: 29.7, renewableMWh: 6.0, renewableSharePercent: 20.2, deltaPercent: -6.0, costUSD: 5049 },
    water: { totalKiloLiters: 320, recycledKiloLiters: 50, recycledSharePercent: 15.6, deltaPercent: -7.5, costUSD: 1120 },
    waste: { totalTonnes: 2.6, divertedTonnes: 1.5, diversionRatePercent: 57.6, deltaPercent: -1.2, landfillCostUSD: 325 },
    mobility: { totalTonnesCO2: 4.5, evSharePercent: 35.0, transitSharePercent: 50.0, deltaPercent: -12.0, totalPassengerKm: 24400 }
  }
};

export const HISTORICAL_TRENDS = [
  { month: "Nov 25", carbon: 168.4, energyMWh: 218, waterKL: 1620, wasteT: 21.0, renewable: 18 },
  { month: "Dec 25", carbon: 172.0, energyMWh: 226, waterKL: 1580, wasteT: 23.4, renewable: 19 },
  { month: "Jan 26", carbon: 164.2, energyMWh: 212, waterKL: 1510, wasteT: 19.8, renewable: 22 },
  { month: "Feb 26", carbon: 155.0, energyMWh: 204, waterKL: 1480, wasteT: 18.9, renewable: 24 },
  { month: "Mar 26", carbon: 148.6, energyMWh: 198, waterKL: 1440, wasteT: 19.2, renewable: 26 },
  { month: "Apr 26", carbon: 142.8, energyMWh: 192.7, waterKL: 1420, wasteT: 18.6, renewable: 28 },
  // Projected months
  { month: "May 26 (P)", carbon: 136.2, energyMWh: 185.0, waterKL: 1390, wasteT: 17.5, renewable: 32, isForecast: true },
  { month: "Jun 26 (P)", carbon: 131.0, energyMWh: 180.0, waterKL: 1360, wasteT: 16.8, renewable: 35, isForecast: true },
  { month: "Jul 26 (P)", carbon: 126.5, energyMWh: 174.0, waterKL: 1330, wasteT: 16.0, renewable: 38, isForecast: true }
];

export const ACTIVITY_RECORDS = [
  {
    id: "REC-2026-0491",
    date: "2026-04-28",
    site: "Metro Innovation Campus",
    scope: "Scope 2",
    category: "Grid Electricity",
    value: 3420,
    unit: "kWh",
    efId: "ef-grid-us",
    co2eTonnes: 1.317,
    source: "Smart Meter Gateway #3",
    status: "Measured",
    confidence: "99%"
  },
  {
    id: "REC-2026-0490",
    date: "2026-04-28",
    site: "North Logistics Center",
    scope: "Scope 1",
    category: "Stationary Combustion",
    value: 410,
    unit: "m³ Gas",
    efId: "ef-gas",
    co2eTonnes: 0.828,
    source: "Building Management System",
    status: "Measured",
    confidence: "98%"
  },
  {
    id: "REC-2026-0489",
    date: "2026-04-27",
    site: "North Logistics Center",
    scope: "Scope 1",
    category: "Fleet Logistics",
    value: 680,
    unit: "Liters Diesel",
    efId: "ef-diesel",
    co2eTonnes: 1.822,
    source: "Fuel Card Ledger (Fleet FleetOps)",
    status: "Calculated",
    confidence: "96%"
  },
  {
    id: "REC-2026-0488",
    date: "2026-04-27",
    site: "East R&D Facility",
    scope: "Scope 2",
    category: "Grid Electricity",
    value: 980,
    unit: "kWh",
    efId: "ef-grid-us",
    co2eTonnes: 0.377,
    source: "Substation Sub-Meter C",
    status: "Measured",
    confidence: "99%"
  },
  {
    id: "REC-2026-0487",
    date: "2026-04-26",
    site: "Metro Innovation Campus",
    scope: "Scope 3",
    category: "Municipal Water",
    value: 48,
    unit: "kL Water",
    efId: "ef-water",
    co2eTonnes: 0.017,
    source: "City Utility Meter Feed",
    status: "Measured",
    confidence: "95%"
  },
  {
    id: "REC-2026-0486",
    date: "2026-04-26",
    site: "Metro Innovation Campus",
    scope: "Scope 3",
    category: "Waste to Landfill",
    value: 520,
    unit: "kg Waste",
    efId: "ef-waste-landfill",
    co2eTonnes: 0.234,
    source: "Hauler Weight Ticket (Recology)",
    status: "Measured",
    confidence: "94%"
  },
  {
    id: "REC-2026-0485",
    date: "2026-04-25",
    site: "All Facilities",
    scope: "Scope 3",
    category: "Employee Commuting",
    value: 6400,
    unit: "passenger-km",
    efId: "ef-commute-ice",
    co2eTonnes: 1.094,
    source: "Q1 Commute Survey + Badge Ingress Model",
    status: "Estimated",
    confidence: "86%"
  }
];

export const AI_INSIGHTS = [
  {
    id: "INS-801",
    severity: "warning",
    category: "Energy Anomaly",
    title: "Weekend HVAC Baseload Leakage Detected in Building B",
    timestamp: "Yesterday at 04:15 UTC",
    confidence: "96%",
    site: "Metro Innovation Campus",
    explanation: {
      whatHappened: "Building B recorded an unexpected 38% electrical demand plateau during Saturday and Sunday off-peak hours (18.4 kWh/hr baseline vs. normal 7.2 kWh/hr).",
      whyHappened: "Zone 3 air handling unit (AHU-04) thermostat schedule defaulted to active occupied mode following a scheduled firmware patch on Friday evening.",
      supportingData: "Smart Meter #3 interval telemetry recorded 538 excess kWh between Friday 20:00 and Monday 06:00, generating 0.21 tCO₂e avoidable emissions.",
      futureTrend: "If uncorrected, recurrent off-schedule HVAC runs will accumulate 2.7 tCO₂e and $4,200 in avoidable utility penalties annually.",
      recommendedStep: "Re-sync BACnet scheduling table for AHU-04 to unoccupied weekend setback protocol."
    }
  },
  {
    id: "INS-802",
    severity: "positive",
    category: "Efficiency Win",
    title: "Rooftop Solar Offset Exceeded Projected Generation by 14.8%",
    timestamp: "3 days ago",
    confidence: "98%",
    site: "Metro Innovation Campus",
    explanation: {
      whatHappened: "Solar PV array produced 1,280 kWh on April 24, supplying 37.9% of daytime campus demand and displacing grid draw.",
      whyHappened: "Optimal solar irradiance (6.2 kWh/m²) combined with panel surface cleaning completed on April 18 restored inverter conversion efficiency.",
      supportingData: "Direct inverter telemetry validated 0.493 tCO₂e avoided on April 24 alone compared to regional marginal grid emissions.",
      futureTrend: "Seasonal daylight gains project May solar generation will displace an average of 42.0% of daytime Scope 2 electricity.",
      recommendedStep: "Schedule regular bi-monthly optical panel cleans to preserve the current 4.2% efficiency gain."
    }
  },
  {
    id: "INS-803",
    severity: "info",
    category: "Logistics Optimization",
    title: "Fleet Route Optimization Opportunity in Sacramento Delivery Corridor",
    timestamp: "5 days ago",
    confidence: "91%",
    site: "North Logistics Center",
    explanation: {
      whatHappened: "Diesel delivery vans experienced 22% excessive idle time during morning dispatch queues at Dock 4.",
      whyHappened: "Staggered loading dock assignment software created queue bottlenecks between 07:30 and 09:00 AM.",
      supportingData: "Fleet telematics registered 142 total idle hours over the last 14 days, consuming 380 Liters of diesel (1.02 tCO₂e).",
      futureTrend: "Transitioning to dynamic dock slotting can eliminate 85% of gate idle emissions without impacting delivery delivery windows.",
      recommendedStep: "Adopt dynamic dock queuing in warehouse WMS to smooth staging between 07:00 and 09:30."
    }
  }
];

export const ACTION_RECOMMENDATIONS = [
  {
    id: "ACT-101",
    title: "Deploy Smart Variable Frequency Drives (VFD) on Core Chillers",
    site: "Metro Innovation Campus",
    category: "Energy Efficiency",
    problemIdentified: "Chiller water pumps currently run at fixed full speed even during 40% thermal demand.",
    explanation: "Installing automated VFD controllers modulates motor speed dynamically to match actual cooling load.",
    carbonSavingsTonnesYr: 38.4,
    costUSD: 18500,
    annualSavingsUSD: 7200,
    paybackYears: 2.6,
    feasibility: "High",
    confidence: "95%",
    priorityScore: 92,
    status: "Proposed",
    scopeImpact: "Scope 2"
  },
  {
    id: "ACT-102",
    title: "Electrify Last-Mile Delivery Fleet (Phase 1: 12 EV Vans)",
    site: "North Logistics Center",
    category: "Mobility Fleet",
    problemIdentified: "High-mileage diesel cargo vans contribute 33% of Site-02 total Scope 1 emissions.",
    explanation: "Replacing 12 diesel vans with class-2 commercial electric vehicles charged via off-peak corporate solar.",
    carbonSavingsTonnesYr: 52.8,
    costUSD: 145000,
    annualSavingsUSD: 28400,
    paybackYears: 5.1,
    feasibility: "Medium",
    confidence: "92%",
    priorityScore: 88,
    status: "Approved",
    scopeImpact: "Scope 1"
  },
  {
    id: "ACT-103",
    title: "Install Closed-Loop Lab Process Water Recirculation",
    site: "East R&D Facility",
    category: "Water Conservation",
    problemIdentified: "Single-pass autoclave cooling discharges 18 kL of clean warm water daily into sewer.",
    explanation: "Re-circulating heat exchangers recover 85% of cooling water while capturing thermal energy for pre-heating.",
    carbonSavingsTonnesYr: 6.2,
    costUSD: 12000,
    annualSavingsUSD: 4600,
    paybackYears: 2.6,
    feasibility: "High",
    confidence: "94%",
    priorityScore: 84,
    status: "In Progress",
    scopeImpact: "Scope 3"
  },
  {
    id: "ACT-104",
    title: "Cafeteria Organic Waste Digestion & Biogas Conversion",
    site: "Metro Innovation Campus",
    category: "Waste Reduction",
    problemIdentified: "Food scraps represent 42% of campus landfill weight due to lack of on-site composting.",
    explanation: "An aerobic commercial biodigester converts organic food scraps into graywater and enriched fertilizer on-site.",
    carbonSavingsTonnesYr: 14.6,
    costUSD: 9500,
    annualSavingsUSD: 3100,
    paybackYears: 3.1,
    feasibility: "High",
    confidence: "90%",
    priorityScore: 81,
    status: "Implemented",
    scopeImpact: "Scope 3"
  }
];

export const ACTION_LEDGER_ENTRIES = [
  {
    id: "LEDGER-2026-01",
    actionId: "ACT-104",
    title: "Cafeteria Organic Waste Digestion & Biogas Conversion",
    site: "Metro Innovation Campus",
    category: "Waste Diversion",
    predictedSavingsTonnesCO2: 14.6,
    measuredSavingsTonnesCO2: 15.2,
    variancePercent: "+4.1%",
    status: "Verified & Complete",
    verificationMethod: "Audited Hauler Tonnage Slips & Metrology",
    verificationDate: "2026-03-31",
    auditor: "Internal Sustainability Taskforce",
    costBudgeted: 9500,
    costActual: 9150
  },
  {
    id: "LEDGER-2026-02",
    actionId: "ACT-103",
    title: "Install Closed-Loop Lab Process Water Recirculation",
    site: "East R&D Facility",
    category: "Water Conservation",
    predictedSavingsTonnesCO2: 6.2,
    measuredSavingsTonnesCO2: 3.8, // Partial progress
    variancePercent: "In Commissioning",
    status: "In Progress (60% milestone)",
    verificationMethod: "Sub-meter Flow Counter Telemetry",
    verificationDate: "2026-04-15",
    auditor: "Facilities Engineering Lead",
    costBudgeted: 12000,
    costActual: 7400
  },
  {
    id: "LEDGER-2026-03",
    actionId: "ACT-102",
    title: "Electrify Last-Mile Delivery Fleet (Phase 1)",
    site: "North Logistics Center",
    category: "Fleet Electrification",
    predictedSavingsTonnesCO2: 52.8,
    measuredSavingsTonnesCO2: 0.0,
    variancePercent: "Procurement Phase",
    status: "Approved — PO Issued",
    verificationMethod: "Vehicle Telematics & Charging Records",
    verificationDate: "Expected 2026-Q3",
    auditor: "Fleet Operations Management",
    costBudgeted: 145000,
    costActual: 28000
  }
];

export const DIGITAL_TWIN_BASELINE = {
  facilityName: "EcoGlobal Enterprises (Consolidated)",
  baselinePeriod: "Trailing 12 Months",
  annualElectricityMWh: 2310,
  gridEmissionFactorKgPerKWh: 0.385,
  annualNaturalGasM3: 48000,
  gasEmissionFactorKgPerM3: 2.02,
  annualWaterKiloLiters: 17040,
  waterEmissionFactorKgPerKL: 0.344,
  annualWasteTonnes: 223,
  wasteLandfillFactorKgPerKg: 0.45,
  annualFleetDieselLiters: 82000,
  dieselFactorKgPerL: 2.68,
  annualFleetKm: 780000,
  averageEnergyTariffUSDPerKWh: 0.17,
  averageWaterTariffUSDPerKL: 3.50,
  averageWasteTippingFeeUSDPerTonne: 125,
  averageDieselPriceUSDPerLiter: 1.15
};

