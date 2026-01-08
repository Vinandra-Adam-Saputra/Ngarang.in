import React, { useState } from 'react';
import { WritingStyle, ReportState, GeneratedReport } from './types';
import { generateSection } from './services/gemini';
import { InputCard } from './components/InputCard';
import { OutputCard } from './components/OutputCard';
import { Sparkles, Loader2, FileText, Settings2, Trash2 } from 'lucide-react';
import { CustomModal } from './components/CustomModal';

const INITIAL_INPUTS: ReportState = {
  activity: '',
  learning: '',
  obstacle: ''
};

const App: React.FC = () => {
  const [style, setStyle] = useState<WritingStyle>(WritingStyle.FORMAL);
  const [inputs, setInputs] = useState<ReportState>(INITIAL_INPUTS);
  const [outputs, setOutputs] = useState<GeneratedReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState<(() => void) | null>(null);

  const handleInputChange = (field: keyof ReportState, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    const hasData = inputs.activity || inputs.learning || inputs.obstacle || outputs;

    if (!hasData) {
      setAlertMessage("Masih kosong kok, gak ada yang perlu dihapus bosku! 😉");
      setShowAlert(true);
      return;
    }

    setConfirmCallback(() => () => {
      setInputs(INITIAL_INPUTS);
      setOutputs(null);
      setError(null);
    });
    setShowConfirm(true);
  };

  const handleGenerate = async () => {
    // Basic validation to check if at least one field is filled
    if (!inputs.activity && !inputs.learning && !inputs.obstacle) {
      setError("Isi dulu minimal satu kolom biar bisa dikarangin.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputs(null);

    try {
      // Execute all 3 generations in parallel for speed
      const [activityRes, learningRes, obstacleRes] = await Promise.all([
        inputs.activity ? generateSection(inputs.activity, style, "Aktivitas Harian") : Promise.resolve(""),
        inputs.learning ? generateSection(inputs.learning, style, "Pelajaran Penting") : Promise.resolve(""),
        inputs.obstacle ? generateSection(inputs.obstacle, style, "Kendala/Hambatan") : Promise.resolve("")
      ]);

      setOutputs({
        activity: activityRes,
        learning: learningRes,
        obstacle: obstacleRes
      });
    } catch (err: any) {
      setError("Yah error. Cek koneksi internet kamu atau konfigurasi API Key nya ya.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const hasData = inputs.activity || inputs.learning || inputs.obstacle || outputs;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header / Config Section */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="Ngarang.in Logo" 
                className="h-18 w-auto object-contain max-w-[200px]" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Settings2 className="h-4 w-4 text-slate-500" />
                </div>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as WritingStyle)}
                  className="block w-full pl-10 pr-8 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-900 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm appearance-none shadow-sm cursor-pointer transition-all hover:bg-slate-800"
                >
                  {Object.values(WritingStyle).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">1</span>
              Tulis Poin-Poinnya Dulu
            </h2>
            <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 font-medium hidden sm:inline-block">
              Singkat-singkat aja, gak usah pusing
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputCard
              type="activity"
              value={inputs.activity}
              onChange={(val) => handleInputChange('activity', val)}
              disabled={isLoading}
            />
            <InputCard
              type="learning"
              value={inputs.learning}
              onChange={(val) => handleInputChange('learning', val)}
              disabled={isLoading}
            />
            <InputCard
              type="obstacle"
              value={inputs.obstacle}
              onChange={(val) => handleInputChange('obstacle', val)}
              disabled={isLoading}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-6">
          <button
            onClick={handleClear}
            disabled={isLoading}
            className={`
              flex items-center gap-2 px-6 py-4 rounded-full font-semibold bg-slate-900 border border-slate-800 
              transition-all shadow-sm hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-red-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!hasData 
                ? 'text-slate-600 hover:text-slate-500 cursor-pointer opacity-75' 
                : 'text-slate-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50 opacity-100'}
            `}
            title="Hapus semua isian"
          >
            <Trash2 className="w-5 h-5" />
            <span>Reset Semua</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`
              relative overflow-hidden group px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-900/20 transition-all transform hover:-translate-y-1 hover:shadow-2xl
              focus:outline-none focus:ring-4 focus:ring-indigo-500/20
              ${isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed w-64 border border-slate-700' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 w-full sm:w-auto sm:min-w-[240px]'
              }
            `}
          >
            <div className="flex items-center justify-center gap-3 relative z-10">
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Bentar, mikir...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Gasken Ngarang!</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Output Section */}
        {outputs && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
             <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-6">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-bold border border-indigo-800">2</span>
                  Hasil Karangan
                </h2>
                <span className="text-xs text-indigo-300 font-medium bg-indigo-950/50 px-3 py-1 rounded-full border border-indigo-900/50">
                  Minimal 100 kata per kolom
                </span>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {outputs.activity && (
                <OutputCard type="activity" content={outputs.activity} />
              )}
              {outputs.learning && (
                <OutputCard type="learning" content={outputs.learning} />
              )}
              {outputs.obstacle && (
                <OutputCard type="obstacle" content={outputs.obstacle} />
              )}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Ngarang.in</p>
        </div>
      </footer>

      {/* Custom Modals */}
      <CustomModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        type="alert"
        confirmText="OK"
      />

      <CustomModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        message="Yakin mau hapus semua isian dan hasil laporan? Nanti ilang loh."
        type="confirm"
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={() => {
          confirmCallback?.();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};

export default App;