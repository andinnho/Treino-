
import React from 'react';
import { WorkoutDay, ProgressState } from '../types';

interface WorkoutCardProps {
  day: WorkoutDay;
  progress: ProgressState;
  onWeightChange: (exerciseId: string, newWeight: number) => void;
  onOpenChart: (exerciseId: string, name: string) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ day, progress, onWeightChange, onOpenChart }) => {
  return (
    <div className={`bg-gray-900 rounded-2xl overflow-hidden border-t-4 ${day.color} shadow-2xl transition-all hover:scale-[1.01]`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">{day.title}</h2>
            <p className="text-xs text-gray-400 mt-1">{day.description}</p>
          </div>
          {day.cardio && (
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
              Cardio: {day.cardio}
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-12 text-[10px] text-gray-500 font-bold uppercase tracking-widest px-2">
            <div className="col-span-6 text-left">Exercício</div>
            <div className="col-span-2 text-center">S/R</div>
            <div className="col-span-2 text-center">Kg</div>
            <div className="col-span-2 text-center">Trend</div>
          </div>

          {day.exercises.map((ex) => {
            const history = progress[ex.id] || [];
            const currentWeight = history.length > 0 ? history[history.length - 1].weight : 0;
            const previousWeight = history.length > 1 ? history[history.length - 2].weight : 0;
            
            let trend = 'same';
            if (currentWeight > previousWeight && previousWeight !== 0) trend = 'up';
            if (currentWeight < previousWeight) trend = 'down';

            return (
              <div key={ex.id} className="grid grid-cols-12 items-center bg-gray-800/50 rounded-xl p-3 border border-gray-700/50 hover:bg-gray-800 transition-colors">
                <div 
                  className="col-span-6 cursor-pointer group"
                  onClick={() => onOpenChart(ex.id, ex.name)}
                >
                  <p className="text-sm font-semibold text-gray-200 group-hover:text-emerald-400 transition-colors">{ex.name}</p>
                  <p className="text-[10px] text-gray-500">{ex.sets} séries</p>
                </div>
                
                <div className="col-span-2 text-center">
                  <span className="text-xs text-gray-300 font-medium">{ex.reps}</span>
                </div>

                <div className="col-span-2 flex justify-center">
                  <input
                    type="number"
                    value={currentWeight || ''}
                    placeholder="0"
                    onChange={(e) => onWeightChange(ex.id, parseFloat(e.target.value) || 0)}
                    className="w-12 h-8 bg-gray-700 text-white rounded-lg text-center text-xs focus:ring-2 focus:ring-emerald-500 outline-none transition-shadow border border-gray-600"
                  />
                </div>

                <div className="col-span-2 text-center">
                  {trend === 'up' && <span className="text-emerald-500 font-bold">↑</span>}
                  {trend === 'down' && <span className="text-red-500 font-bold">↓</span>}
                  {trend === 'same' && <span className="text-gray-600 font-bold">=</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
