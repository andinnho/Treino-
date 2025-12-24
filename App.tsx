
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WorkoutCard } from './components/WorkoutCard';
import { ProgressChart } from './components/ProgressChart';
import { AddExerciseModal } from './components/AddExerciseModal';
import { INITIAL_WORKOUTS } from './constants';
import { ProgressState, HistoryEntry, WorkoutDay, ExerciseTemplate } from './types';

const App: React.FC = () => {
  const getTodayId = () => {
    const days = ['segunda', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'segunda'];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const [activeDayId, setActiveDayId] = useState<string>(getTodayId());
  
  // Estado dos Treinos (Estrutura personalizável)
  const [workouts, setWorkouts] = useState<WorkoutDay[]>(() => {
    const saved = localStorage.getItem('workouts_structure_v1');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUTS;
  });

  // Estado do Progresso (Pesos e histórico)
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('workout_progress_v2');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeChart, setActiveChart] = useState<{ id: string, name: string } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('workout_progress_v2', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('workouts_structure_v1', JSON.stringify(workouts));
  }, [workouts]);

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

  const handleDescriptionChange = (newDescription: string) => {
    setWorkouts(prev => prev.map(day => 
      day.id === activeDayId ? { ...day, description: newDescription } : day
    ));
  };

  const handleAddExercise = (template: ExerciseTemplate) => {
    const newId = `${template.nome.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`;
    setWorkouts(prev => prev.map(day => {
      if (day.id === activeDayId) {
        return {
          ...day,
          exercises: [...day.exercises, {
            id: newId,
            name: template.nome,
            sets: 3,
            reps: '12',
            weight: 0
          }]
        };
      }
      return day;
    }));
    setIsAddModalOpen(false);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    if (!confirm('Deseja remover este exercício do treino?')) return;
    setWorkouts(prev => prev.map(day => {
      if (day.id === activeDayId) {
        return {
          ...day,
          exercises: day.exercises.filter(ex => ex.id !== exerciseId)
        };
      }
      return day;
    }));
  };

  const activeWorkout = useMemo(() => 
    workouts.find(w => w.id === activeDayId) || workouts[0]
  , [activeDayId, workouts]);

  return (
    <div className="min-h-screen pb-24 px-4 md:px-8 bg-slate-950 text-slate-100">
      <header className="py-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent uppercase tracking-tighter">
            Treino Semanal
          </h1>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1">Evolução • Personalização • Carga</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <nav className="flex items-center justify-between mb-10 bg-slate-900/50 p-2 rounded-3xl border border-slate-800 overflow-x-auto no-scrollbar shadow-xl">
          {workouts.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={`flex-1 min-w-[85px] py-3.5 px-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeDayId === day.id 
                  ? 'bg-slate-800 text-emerald-400 shadow-2xl shadow-black/40 ring-1 ring-slate-700' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
              }`}
            >
              {day.id.slice(0, 3)}
            </button>
          ))}
        </nav>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <WorkoutCard 
            day={activeWorkout}
            progress={progress}
            onWeightChange={handleWeightChange}
            onOpenChart={(id, name) => setActiveChart({ id, name })}
            onRemoveExercise={handleRemoveExercise}
            onAddRequest={() => setIsAddModalOpen(true)}
            onDescriptionChange={handleDescriptionChange}
          />
        </div>
      </main>

      {/* Modais */}
      {isAddModalOpen && (
        <AddExerciseModal 
          onClose={() => setIsAddModalOpen(false)}
          onSelect={handleAddExercise}
        />
      )}

      {activeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setActiveChart(null)}>
          <div 
            className="w-full max-w-xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <ProgressChart 
              data={progress[activeChart.id] || []}
              exerciseName={activeChart.name}
            />
            <button 
              className="mt-6 w-full py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-[2rem] font-black uppercase tracking-widest border border-slate-700 transition-all shadow-2xl active:scale-95"
              onClick={() => setActiveChart(null)}
            >
              Voltar ao Treino
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xs text-center pointer-events-none z-10">
        <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.3em] bg-slate-950/90 py-3 rounded-full border border-slate-800 backdrop-blur-md shadow-2xl">
          Ajuste seu foco diário ⚡
        </p>
      </div>
    </div>
  );
};

export default App;
