
import React, { useState } from 'react';
import { EXERCISE_DATABASE } from '../constants';
import { ExerciseTemplate } from '../types';

interface AddExerciseModalProps {
  onClose: () => void;
  onSelect: (template: ExerciseTemplate) => void;
}

// Helper para gerar um ícone/thumbnail visual para o exercício
const ExerciseThumbnail: React.FC<{ category: string }> = ({ category }) => {
  // Fix: replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error
  const icons: Record<string, React.ReactElement> = {
    peito: (
      <svg className="w-8 h-8 text-emerald-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="4" rx="1" />
        <path d="M6 10v6M18 10v6M4 18h16" />
      </svg>
    ),
    costas: (
      <svg className="w-8 h-8 text-blue-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4v16M20 4v16M4 12h16M8 12l4-4 4 4M8 12l4 4 4-4" />
      </svg>
    ),
    pernas: (
      <svg className="w-8 h-8 text-green-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 4h10M9 4v14l-4 3M15 4v14l4 3" />
      </svg>
    ),
    ombros: (
      <svg className="w-8 h-8 text-purple-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="7" r="4" />
        <path d="M5 21v-2a7 7 0 0114 0v2" />
      </svg>
    ),
    biceps: (
      <svg className="w-8 h-8 text-orange-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 14l-3-3m0 0l-3 3m3-3v10M3 7h18" />
      </svg>
    ),
    triceps: (
      <svg className="w-8 h-8 text-red-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M8 19l4 2 4-2" />
      </svg>
    ),
    core: (
      <svg className="w-8 h-8 text-cyan-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  };

  return (
    <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shrink-0 shadow-inner">
      {icons[category] || icons['peito']}
    </div>
  );
};

export const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ onClose, onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('peito');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden flex flex-col max-h-[85vh] shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-2xl font-black text-white">Adicionar Exercício</h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Selecione uma categoria abaixo</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Categorias */}
          <div className="w-32 border-r border-slate-800 overflow-y-auto no-scrollbar bg-slate-950/40">
            {Object.keys(EXERCISE_DATABASE).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full px-4 py-6 text-center text-[10px] font-black uppercase tracking-tighter transition-all relative ${
                  selectedCategory === cat 
                    ? 'text-emerald-400' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {selectedCategory === cat && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Lista de Exercícios */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-900">
            {(EXERCISE_DATABASE[selectedCategory] as ExerciseTemplate[]).map((ex, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(ex)}
                className="w-full text-left p-4 bg-slate-800/40 hover:bg-slate-800 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all group flex gap-4 items-center"
              >
                <ExerciseThumbnail category={selectedCategory} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors text-base">{ex.nome}</h3>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black border ${
                      ex.nivel === 'iniciante' ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/5' :
                      ex.nivel === 'intermediario' ? 'text-blue-500 border-blue-500/30 bg-blue-500/5' :
                      'text-red-500 border-red-500/30 bg-red-500/5'
                    }`}>
                      {ex.nivel}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide font-bold">Equipamento: {ex.equipamento}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 italic text-opacity-70">"{ex.observacoes}"</p>
                </div>
                
                <div className="p-2 text-slate-700 group-hover:text-emerald-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
