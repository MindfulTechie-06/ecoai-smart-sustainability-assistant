import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Download, 
  Zap, 
  Droplet, 
  Trash2, 
  Car, 
  ArrowRight,
  Search,
  TrendingUp,
  TrendingDown,
  Building,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { calculateEmissions, exportToCSV } from '../utils/carbonEngine';
import { HISTORICAL_TRENDS, ACTIVITY_RECORDS } from '../data/mockData';
import PageHeader from './PageHeader';
import { useTheme } from '../context/ThemeContext';

export default function DataIngestionSection({ 
  records = ACTIVITY_RECORDS, 
  metrics,
  selectedSite = 'all',
  setSelectedSite,
  onAddRecord, 
  onBatchUpload, 
  onAnalyzeLifestyle 
}) {
  const { chartTheme, isDark } = useTheme();
  // Main view mode: 'analytics' | 'csv' | 'manual' | 'lifestyle'
  const [ingestionMode, setIngestionMode] = useState('analytics');

  // Resource Analytics Sub-view: 'energy' | 'water' | 'waste' | 'mobility'
  const [resourceSubTab, setResourceSubTab] = useState('energy');

  // Manual Form State
  const [manualForm, setManualForm] = useState({
    site: selectedSite === 'all' ? 'Metro Innovation Campus' : selectedSite,
    scope: 'Scope 2',
    category: 'Grid Electricity',
    value: 1450,
    unit: 'kWh',
    date: new Date().toISOString().split('T')[0],
    source: 'Schneider Electric ION9000 Meter #14',
    status: 'Measured',
    confidence: '99%',
    notes: 'Verified smart sub-meter interval read.'
  });

  // CSV Drag and Drop State
  const [parsedPreview, setParsedPreview] = useState(null);
  const [validationReport, setValidationReport] = useState(null);
  const [csvError, setCsvError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Lifestyle Form State (Preserved survey feature)
  const [lifestyleForm, setLifestyleForm] = useState({
    electricity: 14,
    water: 125,
    transport: 'public',
    waste: 1.5,
    food: 'mixed'
  });

  // Table State: Search, Filters, Sorting, Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [tableScopeFilter, setTableScopeFilter] = useState('All');
  const [tableCategoryFilter, setTableCategoryFilter] = useState('All');
  const [tableStatusFilter, setTableStatusFilter] = useState('All');
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Facilities list
  const facilities = [
    { id: 'all', name: 'Meridian Global (Consolidated)', code: 'HQ-GLOBAL' },
    { id: 'site-01', name: 'Metro Innovation Campus', code: 'FAC-01' },
    { id: 'site-02', name: 'North Logistics Center', code: 'FAC-02' },
    { id: 'site-03', name: 'East R&D Facility', code: 'FAC-03' }
  ];

  // Dynamic Emission factor for manual form calculation preview
  const previewFactor = useMemo(() => {
    const cat = manualForm.category.toLowerCase();
    if (cat.includes('elec')) return 0.385;
    if (cat.includes('gas')) return 2.02;
    if (cat.includes('water')) return 0.344;
    if (cat.includes('waste')) return 0.45;
    if (cat.includes('diesel') || cat.includes('fleet')) return 2.68;
    return 0.25;
  }, [manualForm.category]);

  const previewEmissions = useMemo(() => {
    return calculateEmissions(manualForm.value, previewFactor);
  }, [manualForm.value, previewFactor]);

  // Handle Manual Record Submit
  const handleManualSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      date: manualForm.date,
      site: manualForm.site,
      scope: manualForm.scope,
      category: manualForm.category,
      value: manualForm.value,
      unit: manualForm.unit,
      co2eTonnes: previewEmissions,
      source: manualForm.source,
      status: manualForm.status,
      confidence: manualForm.confidence,
      notes: manualForm.notes
    };

    if (onAddRecord) onAddRecord(newRecord);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3500);
    setIngestionMode('analytics');
  };

  // CSV Parsing with Robust Validation
  const processCSVFile = (file) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
      setCsvError("Invalid file type. Please upload an RFC-4180 standard CSV file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setCsvError("File exceeds 5MB size limit. Please upload smaller batches.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      try {
        const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          throw new Error("CSV file is empty or missing data rows.");
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^["']|["']$/g, ''));
        const requiredHeaders = ['date', 'site', 'scope', 'category', 'value', 'unit'];
        const missingHeaders = requiredHeaders.filter(rh => !headers.includes(rh));

        if (missingHeaders.length > 0) {
          throw new Error(`Missing required CSV columns: ${missingHeaders.join(', ')}. Please use the downloadable template.`);
        }

        const dateIdx = headers.indexOf('date');
        const siteIdx = headers.indexOf('site');
        const scopeIdx = headers.indexOf('scope');
        const categoryIdx = headers.indexOf('category');
        const valueIdx = headers.indexOf('value');
        const unitIdx = headers.indexOf('unit');

        const validRows = [];
        const invalidRows = [];
        const seenKeys = new Set();
        let duplicateCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const rawCols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
          if (rawCols.length < headers.length) {
            invalidRows.push({ rowNumber: i + 1, reason: "Insufficient columns in row", data: lines[i] });
            continue;
          }

          const dateVal = rawCols[dateIdx];
          const siteVal = rawCols[siteIdx];
          const scopeVal = rawCols[scopeIdx];
          const catVal = rawCols[categoryIdx];
          const numVal = parseFloat(rawCols[valueIdx]);
          const unitVal = rawCols[unitIdx];

          // Validations
          if (!dateVal || isNaN(Date.parse(dateVal))) {
            invalidRows.push({ rowNumber: i + 1, reason: `Invalid date format: "${dateVal}"`, data: lines[i] });
            continue;
          }
          if (isNaN(numVal) || numVal < 0) {
            invalidRows.push({ rowNumber: i + 1, reason: `Value must be a positive number: "${rawCols[valueIdx]}"`, data: lines[i] });
            continue;
          }
          if (!catVal) {
            invalidRows.push({ rowNumber: i + 1, reason: "Missing resource category", data: lines[i] });
            continue;
          }

          // Duplicate detection
          const dedupKey = `${dateVal}|${siteVal}|${catVal}|${numVal}`;
          if (seenKeys.has(dedupKey)) {
            duplicateCount++;
          }
          seenKeys.add(dedupKey);

          // Calculate deterministic CO2e
          let efVal = 0.385;
          const lowCat = catVal.toLowerCase();
          if (lowCat.includes('gas')) efVal = 2.02;
          else if (lowCat.includes('water')) efVal = 0.344;
          else if (lowCat.includes('waste')) efVal = 0.45;
          else if (lowCat.includes('diesel')) efVal = 2.68;

          validRows.push({
            id: `ING-${Date.now().toString().slice(-4)}-${i}`,
            date: dateVal,
            site: siteVal || 'Consolidated Operations',
            scope: scopeVal || 'Scope 2',
            category: catVal,
            value: numVal,
            unit: unitVal || 'kWh',
            co2eTonnes: calculateEmissions(numVal, efVal),
            source: 'Bulk Batch CSV Ingress',
            status: 'Validated',
            confidence: '95%'
          });
        }

        setParsedPreview(validRows);
        setValidationReport({
          totalRows: lines.length - 1,
          validCount: validRows.length,
          invalidCount: invalidRows.length,
          duplicateCount,
          errors: invalidRows
        });
        setCsvError(null);
      } catch (err) {
        setCsvError(err.message);
        setParsedPreview(null);
        setValidationReport(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmCSVBatch = () => {
    if (parsedPreview && parsedPreview.length) {
      if (onBatchUpload) onBatchUpload(parsedPreview);
      setUploadSuccess(true);
      setParsedPreview(null);
      setValidationReport(null);
      setTimeout(() => setUploadSuccess(false), 3500);
      setIngestionMode('analytics');
    }
  };

  const downloadSampleCSV = () => {
    const sample = `date,site,scope,category,value,unit\n2026-04-29,Metro Innovation Campus,Scope 2,Grid Electricity,4200,kWh\n2026-04-29,North Logistics Center,Scope 1,Natural Gas,580,m3\n2026-04-28,East R&D Facility,Scope 3,Municipal Water,95,kL\n2026-04-28,Metro Innovation Campus,Scope 3,Landfill Waste,410,kg\n2026-04-27,North Logistics Center,Scope 1,Fleet Diesel,1250,L`;
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EchoAI_Sample_Activity_Ingestion_Template.csv';
    a.click();
  };

  // Filtered Activity Records for the interactive table
  const filteredRecords = useMemo(() => {
    return records.filter(rec => {
      const matchSearch = searchTerm === '' || 
        rec.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (rec.source && rec.source.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchScope = tableScopeFilter === 'All' || rec.scope === tableScopeFilter;
      const matchCategory = tableCategoryFilter === 'All' || rec.category.toLowerCase().includes(tableCategoryFilter.toLowerCase());
      const matchStatus = tableStatusFilter === 'All' || (rec.status && rec.status.toLowerCase() === tableStatusFilter.toLowerCase());
      const matchSite = selectedSite === 'all' || rec.site.toLowerCase().includes(selectedSite.replace('site-0', 'site 0'));

      return matchSearch && matchScope && matchCategory && matchStatus && matchSite;
    });
  }, [records, searchTerm, tableScopeFilter, tableCategoryFilter, tableStatusFilter, selectedSite]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage]);

  return (
    <div className="w-full space-y-6 pb-12 font-sans text-[#101e18] dark:text-[#edfdf2] transition-colors">
      
      {/* 1. STANDARDIZED PAGE HEADER WITH MODE CONTROLS */}
      <PageHeader
        badge="Continuous Metrology Feeds • Active Ingress"
        title="Resource Analytics & Data Ingestion"
        description="Connect, import and analyse energy, water, waste, fleet and operational activity data across facilities."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Facility Selector */}
            {setSelectedSite && (
              <div className="relative">
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="appearance-none bg-white dark:bg-[#13241c] pl-8 pr-7 py-1.5 rounded-xl text-xs font-semibold text-[#101e18] dark:text-white border border-[#dcece1] dark:border-[#1e382c] shadow-xs focus:outline-none cursor-pointer"
                >
                  {facilities.map(fac => (
                    <option key={fac.id} value={fac.id}>
                      {fac.name}
                    </option>
                  ))}
                </select>
                <Building className="w-3.5 h-3.5 text-[#006c49] dark:text-[#9af5c6] absolute left-2.5 top-2.5 pointer-events-none" />
                <span className="material-symbols-outlined text-[#404944] dark:text-[#8cc2ac] text-xs absolute right-2 top-2.5 pointer-events-none">
                  expand_more
                </span>
              </div>
            )}

            {/* Ingress Mode Switcher */}
            <div className="flex items-center space-x-1 bg-white dark:bg-[#13241c] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c] text-xs shadow-xs">
              <button
                type="button"
                onClick={() => setIngestionMode('analytics')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  ingestionMode === 'analytics'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                Analytics & Ledger
              </button>
              <button
                type="button"
                onClick={() => setIngestionMode('csv')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  ingestionMode === 'csv'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                CSV Batch Ingress
              </button>
              <button
                type="button"
                onClick={() => setIngestionMode('manual')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  ingestionMode === 'manual'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                Log Meter Reading
              </button>
              <button
                type="button"
                onClick={() => setIngestionMode('lifestyle')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  ingestionMode === 'lifestyle'
                    ? 'bg-[#00392b] text-white shadow-xs'
                    : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                }`}
              >
                Commuter Intake
              </button>
            </div>

          </div>
        }
      />

      {/* Success Notification Alert */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3.5 rounded-xl bg-emerald-50 dark:bg-[#132d20] border border-emerald-200 dark:border-[#276648] text-emerald-800 dark:text-[#9af5c6] text-xs font-semibold flex items-center space-x-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#9af5c6] shrink-0" />
            <span>Activity records successfully validated, calculated, and committed to enterprise ledger!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODE 1: ANALYTICS & OVERVIEW (Default Dashboard View) */}
      {/* ========================================================================= */}
      {ingestionMode === 'analytics' && (
        <div className="space-y-6">
          
          {/* 2. RESOURCE PERFORMANCE OVERVIEW (6 KPI Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
            
            {/* KPI 1: Total Energy */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Gross Energy</span>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-[#101e18] dark:text-white">
                  {metrics?.energy?.totalMWh || 192.7}
                </span>
                <span className="text-xs text-[#707974] font-medium">MWh</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>{metrics?.energy?.deltaPercent || -4.2}% YoY Efficiency</span>
              </div>
            </div>

            {/* KPI 2: Renewable Share */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Renewable Mix</span>
                <span className="material-symbols-outlined text-emerald-600 text-sm">solar_power</span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-emerald-700 dark:text-[#9af5c6]">
                  {metrics?.energy?.renewableSharePercent || 28.0}%
                </span>
                <span className="text-xs text-[#707974] font-medium">Share</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+5.8% Solar + PPA</span>
              </div>
            </div>

            {/* KPI 3: Water Intake */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Water Intake</span>
                <Droplet className="w-3.5 h-3.5 text-sky-500" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-[#101e18] dark:text-white">
                  {(metrics?.water?.totalKiloLiters || 1420).toLocaleString()}
                </span>
                <span className="text-xs text-[#707974] font-medium">kL</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>{metrics?.water?.deltaPercent || -8.1}% Recycled</span>
              </div>
            </div>

            {/* KPI 4: Waste Generated */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Solid Waste</span>
                <Trash2 className="w-3.5 h-3.5 text-purple-500" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-[#101e18] dark:text-white">
                  {metrics?.waste?.totalTonnes || 18.6}
                </span>
                <span className="text-xs text-[#707974] font-medium">Tonnes</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>-2.4% Mass Reduction</span>
              </div>
            </div>

            {/* KPI 5: Landfill Diversion */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Diversion Rate</span>
                <span className="material-symbols-outlined text-purple-600 text-sm">recycling</span>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-purple-700 dark:text-purple-400">
                  {metrics?.waste?.diversionRatePercent || 60.2}%
                </span>
                <span className="text-xs text-[#707974] font-medium">TRUE</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+4.2% Composted</span>
              </div>
            </div>

            {/* KPI 6: Fleet Fuel Consumption */}
            <div className="stitch-card p-4 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] shadow-xs relative overflow-hidden group">
              <div className="flex items-center justify-between text-xs text-[#707974] dark:text-[#8cc2ac] mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[10px]">Fleet Fuel</span>
                <Car className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-extrabold font-heading text-[#101e18] dark:text-white">
                  28,420
                </span>
                <span className="text-xs text-[#707974] font-medium">L Diesel</span>
              </div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>-11.0% EV Conversion</span>
              </div>
            </div>

          </div>

          {/* 3. DEDICATED RESOURCE CONSUMPTION ANALYTICS (4 Sub-Views) */}
          <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Resource Telemetry Vector Analytics
                </h3>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                  Interval consumption trends, physical resource intensity metrics, and efficiency benchmarks.
                </p>
              </div>

              {/* Sub-view switcher tabs */}
              <div className="flex items-center space-x-1 bg-[#f8fdf9] dark:bg-[#0e1713] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c] text-xs">
                <button
                  type="button"
                  onClick={() => setResourceSubTab('energy')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    resourceSubTab === 'energy'
                      ? 'bg-[#00392b] text-white shadow-xs'
                      : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                  }`}
                >
                  Energy Analytics
                </button>
                <button
                  type="button"
                  onClick={() => setResourceSubTab('water')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    resourceSubTab === 'water'
                      ? 'bg-[#00392b] text-white shadow-xs'
                      : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                  }`}
                >
                  Water Analytics
                </button>
                <button
                  type="button"
                  onClick={() => setResourceSubTab('waste')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    resourceSubTab === 'waste'
                      ? 'bg-[#00392b] text-white shadow-xs'
                      : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                  }`}
                >
                  Waste Analytics
                </button>
                <button
                  type="button"
                  onClick={() => setResourceSubTab('mobility')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    resourceSubTab === 'mobility'
                      ? 'bg-[#00392b] text-white shadow-xs'
                      : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b] dark:hover:text-white'
                  }`}
                >
                  Mobility & Fleet
                </button>
              </div>
            </div>

            {/* TAB CONTENT: Energy Analytics */}
            {resourceSubTab === 'energy' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Energy Intensity</span>
                    <span className="text-xl font-mono font-bold text-[#00392b] dark:text-white mt-1 block">
                      24.1 kWh / sq ft
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">18% below ASHRAE 90.1 standard</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">On-Site Solar Yield</span>
                    <span className="text-xl font-mono font-bold text-amber-600 dark:text-amber-400 mt-1 block">
                      54.0 MWh / Month
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Monitored via Enphase Envoy Metrology</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Gross Grid Draw</span>
                    <span className="text-xl font-mono font-bold text-[#101e18] dark:text-white mt-1 block">
                      138.7 MWh
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">78% RE100 certified green tariff</span>
                  </div>
                </div>

                <div className="h-64 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={HISTORICAL_TRENDS} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} opacity={0.7} />
                      <XAxis dataKey="month" stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
                      <YAxis stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} tickFormatter={(v) => `${v} MWh`} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: chartTheme.tooltipBg, 
                          borderRadius: '12px', 
                          border: `1px solid ${chartTheme.tooltipBorder}`, 
                          color: chartTheme.tooltipText, 
                          fontSize: '12px',
                          boxShadow: chartTheme.tooltipShadow
                        }} 
                        itemStyle={{ color: chartTheme.tooltipText }}
                        labelStyle={{ color: chartTheme.tooltipText, fontWeight: 600 }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px', color: chartTheme.text }} />
                      <Area type="monotone" dataKey="energyMWh" stroke={chartTheme.energy} fill={chartTheme.energy} fillOpacity={0.15} name="Total Energy (MWh)" />
                      <Area type="monotone" dataKey="renewable" stroke={chartTheme.renewable} fill={chartTheme.renewable} fillOpacity={0.35} name="Renewable Generation (MWh)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Water Analytics */}
            {resourceSubTab === 'water' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Water Intensity</span>
                    <span className="text-xl font-mono font-bold text-sky-700 dark:text-sky-400 mt-1 block">
                      14.2 L / Employee-Day
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">12% below regional tech median</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Closed-Loop Reclaimed</span>
                    <span className="text-xl font-mono font-bold text-sky-600 dark:text-sky-300 mt-1 block">
                      280 kL / Month
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Greywater cooling & landscape</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Freshwater Reliance</span>
                    <span className="text-xl font-mono font-bold text-[#101e18] dark:text-white mt-1 block">
                      1,140 kL
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Direct municipal utility feed</span>
                  </div>
                </div>

                <div className="h-64 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HISTORICAL_TRENDS} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} opacity={0.7} />
                      <XAxis dataKey="month" stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
                      <YAxis stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} tickFormatter={(v) => `${v} kL`} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: chartTheme.tooltipBg, 
                          borderRadius: '12px', 
                          border: `1px solid ${chartTheme.tooltipBorder}`, 
                          color: chartTheme.tooltipText, 
                          fontSize: '12px',
                          boxShadow: chartTheme.tooltipShadow
                        }} 
                        itemStyle={{ color: chartTheme.tooltipText }}
                        labelStyle={{ color: chartTheme.tooltipText, fontWeight: 600 }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px', color: chartTheme.text }} />
                      <Bar dataKey="waterKL" fill={chartTheme.water} radius={[4, 4, 0, 0]} maxBarSize={32} name="Total Water Consumption (kL)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Waste Analytics */}
            {resourceSubTab === 'waste' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Diversion Target</span>
                    <span className="text-xl font-mono font-bold text-purple-700 dark:text-purple-400 mt-1 block">
                      60.2% / 90% TRUE
                    </span>
                    <span className="text-[10px] text-purple-600 font-semibold">Zero-Waste certification in progress</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Diverted from Landfill</span>
                    <span className="text-xl font-mono font-bold text-purple-600 dark:text-purple-300 mt-1 block">
                      11.2 Tonnes / Mo
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Recycled + On-site composting</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Residual Landfill Mass</span>
                    <span className="text-xl font-mono font-bold text-[#101e18] dark:text-white mt-1 block">
                      7.4 Tonnes
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Weighed via certified hauler manifests</span>
                  </div>
                </div>

                <div className="h-64 pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={HISTORICAL_TRENDS} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} opacity={0.7} />
                      <XAxis dataKey="month" stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} />
                      <YAxis stroke={chartTheme.axis} tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={{ stroke: chartTheme.grid }} tickLine={false} tickFormatter={(v) => `${v} T`} />
                      <RechartsTooltip 
                        contentStyle={{ 
                          backgroundColor: chartTheme.tooltipBg, 
                          borderRadius: '12px', 
                          border: `1px solid ${chartTheme.tooltipBorder}`, 
                          color: chartTheme.tooltipText, 
                          fontSize: '12px',
                          boxShadow: chartTheme.tooltipShadow
                        }} 
                        itemStyle={{ color: chartTheme.tooltipText }}
                        labelStyle={{ color: chartTheme.tooltipText, fontWeight: 600 }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px', color: chartTheme.text }} />
                      <Bar dataKey="wasteT" fill={chartTheme.waste} radius={[4, 4, 0, 0]} maxBarSize={32} name="Total Waste Generated (Tonnes)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Mobility & Fleet */}
            {resourceSubTab === 'mobility' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Fleet Electrification</span>
                    <span className="text-xl font-mono font-bold text-emerald-700 dark:text-[#9af5c6] mt-1 block">
                      32.0% EV Share
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">18 of 56 delivery vans fully electric</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Transit / EV Commute Split</span>
                    <span className="text-xl font-mono font-bold text-[#00392b] dark:text-white mt-1 block">
                      76.0% Low-Carbon
                    </span>
                    <span className="text-[10px] text-[#707974] dark:text-[#8cc2ac]">Employee commuter survey verified</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                    <span className="text-[10px] uppercase font-bold text-[#707974] dark:text-[#8cc2ac] block">Transport Intensity</span>
                    <span className="text-xl font-mono font-bold text-[#101e18] dark:text-white mt-1 block">
                      171 g CO₂e / p-km
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-[#9af5c6] font-semibold">-14% vs national corporate baseline</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-emerald-600" />
                    <span>Depot Smart EV Charger Bank: <strong>14 Dual-Port Level 2 + 2 DC Fast Chargers Active</strong></span>
                  </div>
                  <span className="font-mono text-emerald-700 dark:text-[#9af5c6] font-semibold">
                    12,480 kWh Off-Peak Charging Displaced
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* 7. DATA QUALITY AND PROVENANCE OVERVIEW */}
          <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Data Quality, Provenance & Metrology Trust Scorecard
                </h3>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                  Traceability breakdown across hardware sub-meters, automated EDI invoices, and verified proxy calculation models.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2.5 py-1 rounded-full border border-[#dcece1] dark:border-[#1e382c]">
                96.4% Metrology Trust Score
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00392b] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Measured Records
                  </span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">74.2%</span>
                </div>
                <div className="w-full bg-[#dcece1] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '74.2%' }} />
                </div>
                <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                  Smart electric meters, digital water flowmeters, and certified weighbridge scale tickets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00392b] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    Calculated Records
                  </span>
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-400">21.3%</span>
                </div>
                <div className="w-full bg-[#dcece1] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '21.3%' }} />
                </div>
                <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                  Utility provider billing statements, fuel cards, and supplier environmental product declarations (EPD).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#00392b] dark:text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Estimated Proxies
                  </span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">4.5%</span>
                </div>
                <div className="w-full bg-[#dcece1] dark:bg-[#1e382c] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '4.5%' }} />
                </div>
                <p className="text-[11px] text-[#707974] dark:text-[#8cc2ac]">
                  Employee commuting survey estimations and spend-based Scope 3 supply chain proxies.
                </p>
              </div>
            </div>

            {/* Ingress Gateway Feeds */}
            <div className="pt-2 border-t border-[#dcece1] dark:border-[#1e382c] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center space-x-2 text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Siemens Desigo CC • <strong>Connected (Live Ingress)</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Schneider EcoStruxure • <strong>Sub-meters Synced</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SAP S/4HANA ESG Gateway • <strong>Audited Integration</strong></span>
              </div>
            </div>
          </div>

          {/* 8. RESOURCE ACTIVITY DATA TABLE */}
          <div className="stitch-card p-6 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dcece1] dark:border-[#1e382c]">
              <div>
                <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                  Ingested Operational Activity Records Ledger
                </h3>
                <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                  Real-time telemetry records with exact emission factors, metrology sources, and mathematical provenance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => exportToCSV(`EchoAI_Resource_Records_${selectedSite}_${new Date().toISOString().split('T')[0]}`, filteredRecords)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] text-[#006c49] dark:text-[#9af5c6] border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] shadow-xs transition-colors shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Ledger CSV</span>
              </button>
            </div>

            {/* Filter Toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Search input */}
              <div className="flex-1 min-w-[200px] relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  placeholder="Search records by ID, facility, category, source..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white placeholder-[#707974] focus:outline-none focus:ring-1 focus:ring-[#006c49]"
                />
                <Search className="w-3.5 h-3.5 text-[#707974] absolute left-2.5 top-2.5 pointer-events-none" />
              </div>

              {/* Scope filter */}
              <select
                value={tableScopeFilter}
                onChange={(e) => { setTableScopeFilter(e.target.value); setCurrentPage(1); }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Scopes</option>
                <option value="Scope 1">Scope 1 (Direct)</option>
                <option value="Scope 2">Scope 2 (Electricity)</option>
                <option value="Scope 3">Scope 3 (Supply / Waste)</option>
              </select>

              {/* Category filter */}
              <select
                value={tableCategoryFilter}
                onChange={(e) => { setTableCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Electricity">Electricity</option>
                <option value="Gas">Natural Gas</option>
                <option value="Water">Water</option>
                <option value="Waste">Waste</option>
                <option value="Diesel">Diesel / Fleet</option>
              </select>

              {/* Status filter */}
              <select
                value={tableStatusFilter}
                onChange={(e) => { setTableStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Measured">Measured (Hardware)</option>
                <option value="Calculated">Calculated</option>
                <option value="Estimated">Estimated</option>
              </select>

              <span className="text-xs text-[#707974] dark:text-[#8cc2ac] self-center ml-auto">
                Showing {filteredRecords.length} records
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8fdf9] dark:bg-[#0e1713] text-[#404944] dark:text-[#8cc2ac] uppercase text-[10px] font-bold tracking-wider border-b border-[#dcece1] dark:border-[#1e382c]">
                  <tr>
                    <th className="px-3.5 py-3">Record ID</th>
                    <th className="px-3.5 py-3">Date</th>
                    <th className="px-3.5 py-3">Facility</th>
                    <th className="px-3.5 py-3">Category</th>
                    <th className="px-3.5 py-3">Activity Volume</th>
                    <th className="px-3.5 py-3">Scope</th>
                    <th className="px-3.5 py-3">Calculated CO₂e</th>
                    <th className="px-3.5 py-3">Status</th>
                    <th className="px-3.5 py-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c] text-[#101e18] dark:text-[#edfdf2]">
                  {paginatedRecords.length > 0 ? (
                    paginatedRecords.map((row) => {
                      const isExpanded = expandedRowId === row.id;
                      return (
                        <tr key={row.id} className="hover:bg-[#f8fdf9] dark:hover:bg-[#15221c] transition-colors">
                          <td className="px-3.5 py-3 font-mono font-semibold text-[#006c49] dark:text-[#9af5c6]">
                            {row.id}
                          </td>
                          <td className="px-3.5 py-3">{row.date}</td>
                          <td className="px-3.5 py-3 font-medium truncate max-w-[150px]">{row.site}</td>
                          <td className="px-3.5 py-3">{row.category}</td>
                          <td className="px-3.5 py-3 font-mono font-semibold">
                            {row.value.toLocaleString()} {row.unit}
                          </td>
                          <td className="px-3.5 py-3">
                            <span className="text-[10px] font-semibold bg-[#e1f2e7] dark:bg-[#162d22] text-[#006c49] dark:text-[#9af5c6] px-1.5 py-0.5 rounded">
                              {row.scope}
                            </span>
                          </td>
                          <td className="px-3.5 py-3 font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">
                            {row.co2eTonnes} t
                          </td>
                          <td className="px-3.5 py-3">
                            <span className="text-[10px] font-bold text-emerald-800 dark:text-[#9af5c6] bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-[#276648]">
                              {row.status || 'Measured'}
                            </span>
                          </td>
                          <td className="px-3.5 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setExpandedRowId(isExpanded ? null : row.id)}
                              className="text-[#006c49] dark:text-[#9af5c6] hover:underline inline-flex items-center space-x-1"
                            >
                              <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-8 text-[#707974] dark:text-[#8cc2ac]">
                        No matching activity records found. Try adjusting your search or scope filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-[#707974] dark:text-[#8cc2ac]">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded-lg border border-[#dcece1] dark:border-[#1e382c] disabled:opacity-40 hover:bg-[#e1f2e7]"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 rounded-lg border border-[#dcece1] dark:border-[#1e382c] disabled:opacity-40 hover:bg-[#e1f2e7]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: BULK CSV ACTIVITY INGESTION */}
      {/* ========================================================================= */}
      {ingestionMode === 'csv' && (
        <div className="stitch-card p-6 md:p-8 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#dcece1] dark:border-[#1e382c]">
            <div>
              <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
                Bulk CSV Activity Record Ingestion
              </h3>
              <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
                Upload bulk electricity, gas, water, waste, or fleet logs. The engine calculates tCO₂e deterministically.
              </p>
            </div>
            <button
              type="button"
              onClick={downloadSampleCSV}
              className="text-xs font-semibold text-[#006c49] dark:text-[#9af5c6] hover:underline flex items-center space-x-1 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Sample Template</span>
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) processCSVFile(file);
            }}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors relative ${
              isDragOver 
                ? 'border-[#006c49] bg-[#e1f2e7]/40 dark:bg-[#162d22]' 
                : 'border-[#a7c9af] dark:border-[#234a35] bg-[#f8fdf9] dark:bg-[#0e1713] hover:bg-[#f2faf4]'
            }`}
          >
            <input
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processCSVFile(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <UploadCloud className="w-12 h-12 text-[#006c49] dark:text-[#9af5c6] mx-auto mb-3" />
            <h4 className="font-heading font-bold text-sm text-[#00392b] dark:text-white mb-1">
              Drag & Drop Activity CSV file here, or click to browse
            </h4>
            <p className="text-xs text-[#707974] dark:text-[#8cc2ac]">
              Required schema: <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6]">date, site, scope, category, value, unit</span> (Max 5MB)
            </p>
          </div>

          {/* Error Message */}
          {csvError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900/40 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{csvError}</span>
            </div>
          )}

          {/* Validation & Ingestion Preview */}
          {validationReport && parsedPreview && (
            <div className="space-y-4 pt-2">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                  <span className="text-[10px] text-[#707974] block uppercase font-bold">Total Rows</span>
                  <span className="text-lg font-mono font-bold text-[#101e18] dark:text-white">{validationReport.totalRows}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#e1f2e7] dark:bg-[#162d22] border border-[#dcece1] dark:border-[#1e382c]">
                  <span className="text-[10px] text-[#006c49] dark:text-[#9af5c6] block uppercase font-bold">Valid & Calculable</span>
                  <span className="text-lg font-mono font-bold text-[#00392b] dark:text-[#9af5c6]">{validationReport.validCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                  <span className="text-[10px] text-[#707974] block uppercase font-bold">Duplicate Rows</span>
                  <span className="text-lg font-mono font-bold text-amber-600">{validationReport.duplicateCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c]">
                  <span className="text-[10px] text-[#707974] block uppercase font-bold">Invalid / Skipped</span>
                  <span className="text-lg font-mono font-bold text-rose-600">{validationReport.invalidCount}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs text-[#00392b] dark:text-white">
                  Validated Ingress Preview ({parsedPreview.length} entries ready for commit)
                </h4>
                <button
                  type="button"
                  onClick={handleConfirmCSVBatch}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-all"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm & Ingest Records</span>
                </button>
              </div>

              {/* Preview Table */}
              <div className="overflow-x-auto rounded-xl border border-[#dcece1] dark:border-[#1e382c]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fdf9] dark:bg-[#0e1713] text-[#404944] dark:text-[#8cc2ac] uppercase text-[10px] tracking-wider border-b border-[#dcece1] dark:border-[#1e382c]">
                    <tr>
                      <th className="px-3.5 py-2.5">Date</th>
                      <th className="px-3.5 py-2.5">Site</th>
                      <th className="px-3.5 py-2.5">Category</th>
                      <th className="px-3.5 py-2.5">Activity Volume</th>
                      <th className="px-3.5 py-2.5">Calculated CO₂e</th>
                      <th className="px-3.5 py-2.5">Validation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcece1] dark:divide-[#1e382c]">
                    {parsedPreview.slice(0, 5).map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#f8fdf9] dark:hover:bg-[#15221c]">
                        <td className="px-3.5 py-2.5">{row.date}</td>
                        <td className="px-3.5 py-2.5 font-medium">{row.site}</td>
                        <td className="px-3.5 py-2.5">{row.category}</td>
                        <td className="px-3.5 py-2.5 font-mono">{row.value} {row.unit}</td>
                        <td className="px-3.5 py-2.5 font-mono font-bold text-emerald-700 dark:text-[#9af5c6]">{row.co2eTonnes} t</td>
                        <td className="px-3.5 py-2.5 text-emerald-700 font-semibold">✓ Verified</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: MANUAL STRUCTURED METER RECORD */}
      {/* ========================================================================= */}
      {ingestionMode === 'manual' && (
        <form onSubmit={handleManualSubmit} className="stitch-card p-6 md:p-8 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-6">
          <div className="pb-4 border-b border-[#dcece1] dark:border-[#1e382c]">
            <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
              Log Structured Operational Activity Record
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
              Input verified smart meter readings, utility invoices, or certified waste consignment manifests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Target Facility</label>
              <select
                value={manualForm.site}
                onChange={(e) => setManualForm({ ...manualForm, site: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#006c49]"
              >
                <option value="Metro Innovation Campus">Metro Innovation Campus</option>
                <option value="North Logistics Center">North Logistics Center</option>
                <option value="East R&D Facility">East R&D Facility</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Operational Scope</label>
              <select
                value={manualForm.scope}
                onChange={(e) => setManualForm({ ...manualForm, scope: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#006c49]"
              >
                <option value="Scope 1">Scope 1 (Stationary / Fleet Combustion)</option>
                <option value="Scope 2">Scope 2 (Purchased Electricity)</option>
                <option value="Scope 3">Scope 3 (Water, Waste, Logistics)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Resource Category</label>
              <select
                value={manualForm.category}
                onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#006c49]"
              >
                <option value="Grid Electricity">Grid Electricity</option>
                <option value="Natural Gas">Natural Gas (Heating)</option>
                <option value="Municipal Water">Municipal Water</option>
                <option value="Landfill Waste">Landfill Waste</option>
                <option value="Fleet Diesel">Fleet Diesel</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Activity Volume & Unit</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={manualForm.value}
                  onChange={(e) => setManualForm({ ...manualForm, value: parseFloat(e.target.value) || 0 })}
                  className="flex-1 p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none font-mono"
                  placeholder="Volume..."
                  required
                />
                <input
                  type="text"
                  value={manualForm.unit}
                  onChange={(e) => setManualForm({ ...manualForm, unit: e.target.value })}
                  className="w-24 p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Measurement Date</label>
              <input
                type="date"
                value={manualForm.date}
                onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#101e18] dark:text-white block mb-1">Meter Serial / Ingress Source</label>
              <input
                type="text"
                value={manualForm.source}
                onChange={(e) => setManualForm({ ...manualForm, source: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none"
                placeholder="e.g. Sub-meter #4, Utility Invoice #9482"
              />
            </div>
          </div>

          {/* Real-time Calculation Preview */}
          <div className="p-4 rounded-xl bg-[#e1f2e7] dark:bg-[#162d22] border border-[#dcece1] dark:border-[#1e382c] flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-[#00392b] dark:text-[#9af5c6] block">
                Deterministic Carbon Conversion Preview
              </span>
              <span className="text-[11px] text-[#404944] dark:text-[#8cc2ac]">
                Formula: {manualForm.value} {manualForm.unit} × {previewFactor} EF / 1000
              </span>
            </div>
            <span className="text-xl font-mono font-extrabold text-[#00392b] dark:text-[#9af5c6]">
              {previewEmissions} tCO₂e
            </span>
          </div>

          <div className="pt-2 border-t border-[#dcece1] dark:border-[#1e382c] flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIngestionMode('analytics')}
              className="px-4 py-2 rounded-xl border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] text-xs font-semibold text-[#404944]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Save & Commit Record</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: QUICK COMMUTER & LIFESTYLE INTAKE */}
      {/* ========================================================================= */}
      {ingestionMode === 'lifestyle' && (
        <div className="stitch-card p-6 md:p-8 bg-white dark:bg-[#13241c] border border-[#dcece1] dark:border-[#1e382c] space-y-6">
          <div className="pb-4 border-b border-[#dcece1] dark:border-[#1e382c]">
            <h3 className="font-heading font-bold text-base text-[#00392b] dark:text-white">
              Employee Commute & Lifestyle Intake
            </h3>
            <p className="text-xs text-[#404944] dark:text-[#8cc2ac] mt-0.5">
              Preserved interactive survey for employee Scope 3 Category 7 (Commuting) assessments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center text-[#101e18] dark:text-white">
                  <Zap className="w-4 h-4 text-amber-500 mr-1.5" />
                  Electricity (kWh/day)
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded">
                  {lifestyleForm.electricity} kWh
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={lifestyleForm.electricity}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, electricity: parseFloat(e.target.value) })}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center text-[#101e18] dark:text-white">
                  <Droplet className="w-4 h-4 text-sky-500 mr-1.5" />
                  Water (Liters/day)
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded">
                  {lifestyleForm.water} L
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={lifestyleForm.water}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, water: parseFloat(e.target.value) })}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold flex items-center text-[#101e18] dark:text-white">
                  <Trash2 className="w-4 h-4 text-purple-500 mr-1.5" />
                  Waste (kg/day)
                </span>
                <span className="font-mono font-bold text-[#006c49] dark:text-[#9af5c6] bg-[#e1f2e7] dark:bg-[#162d22] px-2 py-0.5 rounded">
                  {lifestyleForm.waste} kg
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={lifestyleForm.waste}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, waste: parseFloat(e.target.value) })}
                className="w-full h-2 bg-[#e1f2e7] dark:bg-[#1a382b] rounded-lg appearance-none cursor-pointer accent-[#006c49]"
              />
            </div>

            <div className="space-y-2">
              <span className="font-semibold flex items-center text-[#101e18] dark:text-white">
                <Car className="w-4 h-4 text-emerald-600 mr-1.5" />
                Primary Commuting Mode
              </span>
              <select
                value={lifestyleForm.transport}
                onChange={(e) => setLifestyleForm({ ...lifestyleForm, transport: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#f8fdf9] dark:bg-[#0e1713] border border-[#dcece1] dark:border-[#1e382c] text-[#101e18] dark:text-white focus:outline-none"
              >
                <option value="walk_bike">Walking / Cycling (0 kg CO₂e)</option>
                <option value="public">Public Rapid Transit (~0.04 kg/km)</option>
                <option value="ev">Electric Vehicle (~0.05 kg/km)</option>
                <option value="gas_car">Gasoline Passenger Car (~0.17 kg/km)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#dcece1] dark:border-[#1e382c] flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIngestionMode('analytics')}
              className="px-4 py-2 rounded-xl border border-[#dcece1] dark:border-[#1e382c] hover:bg-[#e1f2e7] text-xs font-semibold text-[#404944]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (onAnalyzeLifestyle) onAnalyzeLifestyle(lifestyleForm);
                setUploadSuccess(true);
                setTimeout(() => setUploadSuccess(false), 3500);
                setIngestionMode('analytics');
              }}
              className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006c49] hover:bg-[#1a5140] shadow-xs transition-all"
            >
              <span>Calculate & Update Survey Ingress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
