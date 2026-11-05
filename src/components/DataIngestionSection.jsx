import { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { parseActivityCSV, calculateEmissions } from '../utils/carbonEngine';

const DataIngestionSection = ({ onAddRecord, onBatchUpload, onAnalyzeLifestyle }) => {
  const [ingestionMode, setIngestionMode] = useState('csv'); // 'csv', 'manual', 'lifestyle'
  
  // Manual Form State
  const [manualForm, setManualForm] = useState({
    site: 'Metro Innovation Campus',
    scope: 'Scope 2',
    category: 'Grid Electricity',
    value: 1200,
    unit: 'kWh',
    date: new Date().toISOString().split('T')[0],
    source: 'Manual Smart Meter Read',
    status: 'Measured',
    confidence: '98%'
  });

  // CSV Drag and Drop State
  const [parsedPreview, setParsedPreview] = useState(null);
  const [csvError, setCsvError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Lifestyle Form State (Preserving original user input functionality)
  const [lifestyleForm, setLifestyleForm] = useState({
    electricity: 12,
    water: 120,
    transport: 'public',
    waste: 1.5,
    food: 'mixed'
  });

  // Handle Manual Submit
  const handleManualSubmit = (e) => {
    e.preventDefault();
    let co2eTonnes;
    if (manualForm.category.toLowerCase().includes('elec')) {
      co2eTonnes = calculateEmissions(manualForm.value, 0.385);
    } else if (manualForm.category.toLowerCase().includes('gas')) {
      co2eTonnes = calculateEmissions(manualForm.value, 2.02);
    } else if (manualForm.category.toLowerCase().includes('water')) {
      co2eTonnes = calculateEmissions(manualForm.value, 0.344);
    } else if (manualForm.category.toLowerCase().includes('waste')) {
      co2eTonnes = calculateEmissions(manualForm.value, 0.45);
    } else {
      co2eTonnes = calculateEmissions(manualForm.value, 0.25);
    }

    const newRecord = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      ...manualForm,
      co2eTonnes
    };

    onAddRecord(newRecord);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  // Handle CSV File Drag/Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      try {
        const records = parseActivityCSV(content);
        setParsedPreview(records);
        setCsvError(null);
      } catch (err) {
        setCsvError(err.message);
        setParsedPreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmCSVBatch = () => {
    if (parsedPreview && parsedPreview.length) {
      onBatchUpload(parsedPreview);
      setUploadSuccess(true);
      setParsedPreview(null);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const downloadSampleCSV = () => {
    const sample = `date,site,scope,category,value,unit\n2026-04-29,Metro Innovation Campus,Scope 2,Electricity,4200,kWh\n2026-04-29,North Logistics Center,Scope 1,Stationary Gas,580,m3\n2026-04-28,East R&D Facility,Scope 3,Municipal Water,95,kL\n2026-04-28,Metro Innovation Campus,Scope 3,Mixed Waste,410,kg`;
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EchoAI_Sample_Activity_Template.csv';
    a.click();
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#dcece1] dark:border-[#1e382c]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] dark:bg-[#9af5c6]"></span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#00392b] dark:text-white">
                Sustainability Data Ingestion Engine
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#404944] dark:text-[#8cc2ac] mt-1">
              Ingest operational activity records via batch CSV upload, structured forms, or lifestyle telemetry.
            </p>
          </div>

          {/* Ingestion Mode Switcher */}
          <div className="flex items-center space-x-1 bg-white dark:bg-[#13241c] p-1 rounded-xl border border-[#dcece1] dark:border-[#1e382c] text-xs shadow-sm">
            <button
              onClick={() => setIngestionMode('csv')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                ingestionMode === 'csv'
                  ? 'bg-[#00392b] text-white shadow-xs'
                  : 'text-[#404944] dark:text-[#8cc2ac] hover:text-[#00392b]'
              }`}
            >
              CSV Batch Upload
            </button>
            <button
              onClick={() => setIngestionMode('manual')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                ingestionMode === 'manual'
                  ? 'bg-white dark:bg-[#1A2A22] text-[#247A55] dark:text-[#38C48B] font-semibold shadow-sm'
                  : 'text-[#66756B]'
              }`}
            >
              Manual Activity Record
            </button>
            <button
              onClick={() => setIngestionMode('lifestyle')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                ingestionMode === 'lifestyle'
                  ? 'bg-white dark:bg-[#1A2A22] text-[#247A55] dark:text-[#38C48B] font-semibold shadow-sm'
                  : 'text-[#66756B]'
              }`}
            >
              Quick Lifestyle Intake
            </button>
          </div>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {uploadSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2 text-xs font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Activity records successfully validated, calculated and ingested into active ledger!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODE 1: CSV Upload */}
        {ingestionMode === 'csv' && (
          <div className="stitch-card p-6 md:p-8 bg-white dark:bg-[#15221C] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E6ECE7] dark:border-[#23362C]">
              <div>
                <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                  Bulk CSV Activity Record Ingestion
                </h3>
                <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                  Upload bulk energy, water, waste, or fleet logs. The engine calculates tCO₂e deterministically.
                </p>
              </div>
              <button
                onClick={downloadSampleCSV}
                className="text-xs font-semibold text-[#247A55] dark:text-[#38C48B] hover:underline flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sample Template</span>
              </button>
            </div>

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-[#A7C9AF] dark:border-[#234A35] rounded-2xl p-8 text-center bg-[#FBFBF9] dark:bg-[#0E1713] hover:bg-[#F6F8F6] transition-colors relative">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-[#247A55] dark:text-[#38C48B] mx-auto mb-3" />
              <h4 className="font-heading font-semibold text-sm text-[#17251E] dark:text-white mb-1">
                Drag & Drop Activity CSV file here, or click to browse
              </h4>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Columns required: <span className="font-mono">date, site, scope, category, value, unit</span>
              </p>
            </div>

            {/* Error Message */}
            {csvError && (
              <div className="p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{csvError}</span>
              </div>
            )}

            {/* Ingestion Preview Table */}
            {parsedPreview && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-semibold text-xs text-[#17251E] dark:text-white">
                    Validated Rows Preview ({parsedPreview.length} entries parsed)
                  </h4>
                  <button
                    onClick={handleConfirmCSVBatch}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm & Ingest Records</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#E6ECE7] dark:border-[#23362C]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F6F8F6] text-[#66756B] uppercase text-[10px] tracking-wider border-b border-[#E6ECE7]">
                      <tr>
                        <th className="px-3 py-2">Date</th>
                        <th className="px-3 py-2">Site</th>
                        <th className="px-3 py-2">Category</th>
                        <th className="px-3 py-2">Activity Volume</th>
                        <th className="px-3 py-2">Calculated CO₂e</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6ECE7]">
                      {parsedPreview.slice(0, 5).map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-3 py-2">{row.date}</td>
                          <td className="px-3 py-2 font-medium">{row.site}</td>
                          <td className="px-3 py-2">{row.category}</td>
                          <td className="px-3 py-2 font-mono">{row.value} {row.unit}</td>
                          <td className="px-3 py-2 font-mono font-bold text-[#247A55]">{row.co2eTonnes} t</td>
                          <td className="px-3 py-2 text-emerald-700">Validated</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}

        {/* MODE 2: Manual Entry Form */}
        {ingestionMode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="stitch-card p-6 md:p-8 bg-white dark:bg-[#15221C] space-y-6">
            <div className="pb-4 border-b border-[#E6ECE7] dark:border-[#23362C]">
              <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                Log Operational Activity Record
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Add verified meter readings, utility receipts, or waste consignment notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Target Facility</label>
                <select
                  value={manualForm.site}
                  onChange={(e) => setManualForm({ ...manualForm, site: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                >
                  <option value="Metro Innovation Campus">Metro Innovation Campus</option>
                  <option value="North Logistics Center">North Logistics Center</option>
                  <option value="East R&D Facility">East R&D Facility</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Operational Scope</label>
                <select
                  value={manualForm.scope}
                  onChange={(e) => setManualForm({ ...manualForm, scope: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                >
                  <option value="Scope 1">Scope 1 (Stationary / Fleet Combustion)</option>
                  <option value="Scope 2">Scope 2 (Purchased Electricity)</option>
                  <option value="Scope 3">Scope 3 (Water, Waste, Commuting)</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Resource Category</label>
                <select
                  value={manualForm.category}
                  onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                >
                  <option value="Grid Electricity">Grid Electricity</option>
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Municipal Water">Municipal Water</option>
                  <option value="Landfill Waste">Landfill Waste</option>
                  <option value="Fleet Diesel">Fleet Diesel</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Activity Volume</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={manualForm.value}
                    onChange={(e) => setManualForm({ ...manualForm, value: parseFloat(e.target.value) || 0 })}
                    className="flex-1 p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none font-mono"
                    placeholder="Volume..."
                    required
                  />
                  <input
                    type="text"
                    value={manualForm.unit}
                    onChange={(e) => setManualForm({ ...manualForm, unit: e.target.value })}
                    className="w-24 p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Measurement Date</label>
                <input
                  type="date"
                  value={manualForm.date}
                  onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-medium text-[#17251E] dark:text-white block mb-1">Data Provenance Source</label>
                <input
                  type="text"
                  value={manualForm.source}
                  onChange={(e) => setManualForm({ ...manualForm, source: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                  placeholder="e.g. Sub-meter #4, Utility Invoice #9482"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6ECE7] dark:border-[#23362C] flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Activity Record</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE 3: Interactive Quick Lifestyle Intake (Preserved from original project) */}
        {ingestionMode === 'lifestyle' && (
          <div className="stitch-card p-6 md:p-8 bg-white dark:bg-[#15221C] space-y-6">
            <div className="pb-4 border-b border-[#E6ECE7] dark:border-[#23362C]">
              <h3 className="font-heading font-semibold text-base text-[#17251E] dark:text-white">
                Daily Lifestyle & Commute Intake
              </h3>
              <p className="text-xs text-[#66756B] dark:text-[#96A59C]">
                Preserved interactive consumption model for employee commuting and personal habit assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center text-[#17251E] dark:text-white">
                    <Zap className="w-4 h-4 text-amber-500 mr-1.5" />
                    Electricity (kWh/day)
                  </span>
                  <span className="font-mono font-bold text-[#247A55] bg-[#DDF3E5] px-2 py-0.5 rounded">
                    {lifestyleForm.electricity} kWh
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={lifestyleForm.electricity}
                  onChange={(e) => setLifestyleForm({ ...lifestyleForm, electricity: parseFloat(e.target.value) })}
                  className="w-full h-2 bg-[#E6ECE7] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center text-[#17251E] dark:text-white">
                    <Droplet className="w-4 h-4 text-blue-500 mr-1.5" />
                    Water (Liters/day)
                  </span>
                  <span className="font-mono font-bold text-[#247A55] bg-[#DDF3E5] px-2 py-0.5 rounded">
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
                  className="w-full h-2 bg-[#E6ECE7] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center text-[#17251E] dark:text-white">
                    <Trash2 className="w-4 h-4 text-purple-500 mr-1.5" />
                    Waste (kg/day)
                  </span>
                  <span className="font-mono font-bold text-[#247A55] bg-[#DDF3E5] px-2 py-0.5 rounded">
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
                  className="w-full h-2 bg-[#E6ECE7] rounded-lg appearance-none cursor-pointer accent-[#247A55]"
                />
              </div>

              <div className="space-y-2">
                <span className="font-medium flex items-center text-[#17251E] dark:text-white">
                  <Car className="w-4 h-4 text-emerald-600 mr-1.5" />
                  Primary Commuting Mode
                </span>
                <select
                  value={lifestyleForm.transport}
                  onChange={(e) => setLifestyleForm({ ...lifestyleForm, transport: e.target.value })}
                  className="w-full p-2 rounded-xl bg-[#F6F8F6] dark:bg-[#0E1713] border border-[#E6ECE7] dark:border-[#23362C] text-[#17251E] dark:text-white focus:outline-none"
                >
                  <option value="walk_bike">Walking / Cycling (0 kg CO₂e)</option>
                  <option value="public">Public Rapid Transit (~0.04 kg/km)</option>
                  <option value="ev">Electric Vehicle (~0.05 kg/km)</option>
                  <option value="gas_car">Gasoline Passenger Car (~0.17 kg/km)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6ECE7] dark:border-[#23362C] flex justify-end">
              <button
                onClick={() => {
                  if (onAnalyzeLifestyle) onAnalyzeLifestyle(lifestyleForm);
                  setUploadSuccess(true);
                  setTimeout(() => setUploadSuccess(false), 3000);
                }}
                className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#247A55] hover:bg-[#1D6446] shadow-sm transition-all"
              >
                <span>Calculate & Update Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DataIngestionSection;
