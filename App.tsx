
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WorkoutCard } from './components/WorkoutCard';
import { ProgressChart } from './components/ProgressChart';
import { INITIAL_WORKOUTS } from './constants';
import { ProgressState, HistoryEntry } from './types';
import { analyzeWorkoutProgress } from './services/geminiService';

const App: React.FC = () => {
  // Map JS getDay() to our IDs
  const getTodayId = () => {
    const days = ['segunda', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'segunda'];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const [activeDayId, setActiveDayId] = useState<string>(getTodayId());
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('workout_progress_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeChart, setActiveChart] = useState<{ id: string, name: string } | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    localStorage.setItem('workout_progress_v2', JSON.stringify(progress));
  }, [progress]);

  const handleWeightChange = useCallback((exerciseId: string, newWeight: number) => {
    setProgress((prev) => {
      const history = prev[exerciseId] || [];
      const today = new Date().toLocaleDateString();
      
      const existingTodayIndex = history.findIndex(h => h.date === today);
      let newHistory: HistoryEntry[];
      
      if (existingTodayIndex > -1) {
        newHistory = [...history];
        newHistory[existingTodayIndex] = { ...newHistory[existingTodayIndex], weight: newWeight };
      } else {
        newHistory = [...history, { date: today, weight: newWeight }];
        if (newHistory.length > 10) newHistory.shift();
      }

      return { ...prev, [exerciseId]: newHistory };
    });
  }, []);

  const runAiAnalysis = async () => {
    setLoadingAi(true);
    const result = await analyzeWorkoutProgress(INITIAL_WORKOUTS, progress);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  const activeWorkout = useMemo(() => 
    INITIAL_WORKOUTS.find(w => w.id === activeDayId) || INITIAL_WORKOUTS[0]
  , [activeDayId]);

  return (
    <div className="min-h-screen pb-24 px-4 md:px-8 bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="py-6 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Treino Semanal
          </h1>
          <p className="text-slate-500 text-sm font-medium">Evolução constante de carga</p>
        </div>
        
        <button 
          onClick={runAiAnalysis}
          disabled={loadingAi}
          className="group relative px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 overflow-hidden"
        >
          {loadingAi ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span>✨</span>
          )}
          Analisar IA
        </button>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Navigation Tabs */}
        <nav className="flex items-center justify-between mb-8 bg-slate-900/50 p-1.5 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
          {INITIAL_WORKOUTS.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeDayId === day.id 
                  ? 'bg-slate-800 text-emerald-400 shadow-lg shadow-black/20 ring-1 ring-slate-700' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              {day.id.slice(0, 3)}
            </button>
          ))}
        </nav>

        {/* AI Insight Box */}
        {aiAnalysis && (
          <div className="mb-8 p-5 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-500">
            <h3 className="text-indigo-300 font-bold mb-1 flex items-center gap-2 text-sm">
              <span>🤖</span> Feedback IA
            </h3>
            <p className="text-xs leading-relaxed text-indigo-100/80 italic">"{aiAnalysis}"</p>
          </div>
        )}

        {/* Selected Workout Card */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <WorkoutCard 
            day={activeWorkout}
            progress={progress}
            onWeightChange={handleWeightChange}
            onOpenChart={(id, name) => setActiveChart({ id, name })}
          />
        </div>
      </main>

      {/* Stats Modal */}
      {activeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md" onClick={() => setActiveChart(null)}>
          <div 
            className="w-full max-w-xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ProgressChart 
              data={progress[activeChart.id] || []}
              exerciseName={activeChart.name}
            />
            <button 
              className="mt-4 w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold border border-slate-700 transition-colors shadow-xl"
              onClick={() => setActiveChart(null)}
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs text-center pointer-events-none opacity-50">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-slate-950/80 py-2 rounded-full border border-slate-800 backdrop-blur-sm">
          Foco no progresso de hoje 🚀
        </p>
      </div>
    </div>
  );
};

export default App;
