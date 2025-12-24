
import React from 'react';
import { WorkoutDay, ProgressState } from '../types';

interface WorkoutCardProps {
  day: WorkoutDay;
  progress: ProgressState;
  onWeightChange: (exerciseId: string, newWeight: number) => void;
  onOpenChart: (exerciseId: string, name: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
  onAddRequest: () => void;
  onDescriptionChange: (newDescription: string) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ 
  day, 
  progress, 
  onWeightChange, 
  onOpenChart, 
  onRemoveExercise,
  onAddRequest,
  onDescriptionChange
}) => {
  return (
    <div className={`bg-gray-900 rounded-3xl overflow-hidden border-t-8 ${day.color} shadow-2xl transition-all`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">{day.title}</h2>
            <input
              type="text"
              value={day.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Descreva o foco do treino..."
              className="w-full bg-transparent text-slate-400 text-sm mt-1 focus:text-emerald-400 outline-none border-b border-transparent focus:border-emerald-500/30 transition-all placeholder:text-slate-600"
            />
          </div>
          {day.cardio && (
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
              {day.cardio}
            </span>
          )}
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-12 text-[10px] text-slate-500 font-black uppercase tracking-widest px-4">
            <div className="col-span-6">Exercício</div>
            <div className="col-span-2 text-center">S/R</div>
            <div className="col-span-2 text-center">Kg</div>
            <div className="col-span-2 text-right"></div>
          </div>

          {day.exercises.map((ex) => {
            const history = progress[ex.id] || [];
            const currentWeight = history.length > 0 ? history[history.length - 1].weight : 0;
            
            return (
              <div key={ex.id} className="grid grid-cols-12 items-center bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30 hover:bg-slate-800/60 transition-all group">
                <div 
                  className="col-span-6 cursor-pointer"
                  onClick={() => onOpenChart(ex.id, ex.name)}
                >
                  <p className="text-sm font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">{ex.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{ex.sets} séries • Ver gráfico</p>
                </div>
                
                <div className="col-span-2 text-center">
                  <span className="text-xs text-slate-300 font-bold bg-slate-700/50 px-2 py-1 rounded-md">{ex.reps}</span>
                </div>

                <div className="col-span-2 flex justify-center">
                  <input
                    type="number"
                    value={currentWeight || ''}
                    placeholder="0"
                    onChange={(e) => onWeightChange(ex.id, parseFloat(e.target.value) || 0)}
                    className="w-14 h-9 bg-slate-900 text-white rounded-xl text-center text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all border border-slate-700 hover:border-slate-500"
                  />
                </div>

                <div className="col-span-2 flex justify-end">
                   <button 
                    onClick={() => onRemoveExercise(ex.id)}
                    className="p-2 text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>
                   </button>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={onAddRequest}
          className="w-full py-5 border-2 border-dashed border-slate-800 rounded-2xl text-slate-600 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-3 group"
        >
          <div className="bg-slate-800 p-1.5 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-xs font-black uppercase tracking-widest">Novo Exercício</span>
        </button>
      </div>
    </div>
  );
};
