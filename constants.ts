
import { WorkoutDay, ExerciseDatabase } from './types';

export const EXERCISE_DATABASE: ExerciseDatabase = {
  "peito": [
    { "nome": "Supino reto", "nivel": "iniciante", "equipamento": "barra", "observacoes": "Base para força e hipertrofia" },
    { "nome": "Supino inclinado", "nivel": "iniciante", "equipamento": "barra ou halteres", "observacoes": "Ênfase no peitoral superior" },
    { "nome": "Supino declinado", "nivel": "intermediario", "equipamento": "barra ou halteres", "observacoes": "Ênfase no peitoral inferior" },
    { "nome": "Crucifixo reto", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Isolamento muscular" },
    { "nome": "Crucifixo inclinado", "nivel": "intermediario", "equipamento": "halteres", "observacoes": "Maior alongamento" },
    { "nome": "Peck deck", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Isolamento seguro" },
    { "nome": "Crossover", "nivel": "intermediario", "equipamento": "polia", "observacoes": "Tensão contínua" },
    { "nome": "Flexão de braços", "nivel": "iniciante", "equipamento": "peso corporal", "observacoes": "Versátil e funcional" }
  ],
  "costas": [
    { "nome": "Puxada frente", "nivel": "iniciante", "equipamento": "polia", "observacoes": "Base dorsal" },
    { "nome": "Barra fixa", "nivel": "intermediario", "equipamento": "peso corporal", "observacoes": "Força e controle" },
    { "nome": "Remada curvada", "nivel": "intermediario", "equipamento": "barra", "observacoes": "Espessura dorsal" },
    { "nome": "Remada unilateral", "nivel": "iniciante", "equipamento": "halter", "observacoes": "Correção de desequilíbrios" },
    { "nome": "Remada baixa", "nivel": "iniciante", "equipamento": "polia", "observacoes": "Controle do movimento" },
    { "nome": "Levantamento terra", "nivel": "avancado", "equipamento": "barra", "observacoes": "Cadeia posterior completa" }
  ],
  "pernas": [
    { "nome": "Agachamento livre", "nivel": "intermediario", "equipamento": "barra", "observacoes": "Exercício global" },
    { "nome": "Agachamento guiado", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Maior estabilidade" },
    { "nome": "Leg press", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Volume e segurança" },
    { "nome": "Stiff", "nivel": "intermediario", "equipamento": "barra", "observacoes": "Posterior de coxa" },
    { "nome": "Avanço", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Unilateral" },
    { "nome": "Cadeira extensora", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Isolamento de quadríceps" },
    { "nome": "Cadeira flexora", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Isolamento posterior" },
    { "nome": "Panturrilha em pé", "nivel": "iniciante", "equipamento": "maquina", "observacoes": "Gastrocnêmio" }
  ],
  "ombros": [
    { "nome": "Elevação lateral", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Deltoide médio" },
    { "nome": "Elevação frontal", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Deltoide anterior" },
    { "nome": "Desenvolvimento", "nivel": "intermediario", "equipamento": "barra ou halteres", "observacoes": "Força global" },
    { "nome": "Arnold press", "nivel": "intermediario", "equipamento": "halteres", "observacoes": "Amplitude completa" },
    { "nome": "Face pull", "nivel": "iniciante", "equipamento": "polia", "observacoes": "Saúde dos ombros" }
  ],
  "biceps": [
    { "nome": "Rosca direta", "nivel": "iniciante", "equipamento": "barra", "observacoes": "Base do bíceps" },
    { "nome": "Rosca alternada", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Trabalho unilateral" },
    { "nome": "Rosca martelo", "nivel": "iniciante", "equipamento": "halteres", "observacoes": "Braquial" },
    { "nome": "Rosca Scott", "nivel": "intermediario", "equipamento": "barra ou maquina", "observacoes": "Isolamento" }
  ],
  "triceps": [
    { "nome": "Tríceps pulley", "nivel": "iniciante", "equipamento": "polia", "observacoes": "Base" },
    { "nome": "Tríceps testa", "nivel": "intermediario", "equipamento": "barra", "observacoes": "Força" },
    { "nome": "Tríceps francês", "nivel": "intermediario", "equipamento": "halter", "observacoes": "Cabeça longa" },
    { "nome": "Mergulho em paralelas", "nivel": "avancado", "equipamento": "peso corporal", "observacoes": "Alta intensidade" }
  ],
  "core": [
    { "nome": "Abdominal crunch", "nivel": "iniciante", "equipamento": "solo", "observacoes": "Base abdominal" },
    { "nome": "Prancha", "nivel": "iniciante", "equipamento": "peso corporal", "observacoes": "Estabilidade" },
    { "nome": "Elevação de pernas", "nivel": "intermediario", "equipamento": "barra", "observacoes": "Abdômen inferior" },
    { "nome": "Ab wheel", "nivel": "avancado", "equipamento": "roda", "observacoes": "Alta exigência" }
  ]
};

export const INITIAL_WORKOUTS: WorkoutDay[] = [
  {
    id: 'segunda',
    title: 'Peito & Tríceps',
    description: 'Foco em empurrar e extensão de cotovelo',
    color: 'border-red-500',
    cardio: '10–15 min',
    exercises: [
      { id: 'supino', name: 'Supino Reto', sets: 4, reps: '8-12', weight: 0 },
      { id: 'pulley', name: 'Tríceps Pulley', sets: 3, reps: '12', weight: 0 },
    ]
  },
  {
    id: 'terca',
    title: 'Costas & Bíceps',
    description: 'Foco em puxar e flexão de cotovelo',
    color: 'border-blue-500',
    exercises: [
      { id: 'puxada', name: 'Puxada Alta', sets: 4, reps: '8-12', weight: 0 },
      { id: 'rosca', name: 'Rosca Direta', sets: 3, reps: '12', weight: 0 },
    ]
  },
  {
    id: 'quarta',
    title: 'Pernas',
    description: 'Inferiores completos',
    color: 'border-green-500',
    exercises: [
      { id: 'agachamento', name: 'Agachamento livre', sets: 4, reps: '10', weight: 0 },
    ]
  },
  {
    id: 'quinta',
    title: 'Ombros & Core',
    description: 'Deltoides e estabilização',
    color: 'border-purple-500',
    exercises: [
      { id: 'lateral', name: 'Elevação lateral', sets: 4, reps: '12', weight: 0 },
    ]
  },
  {
    id: 'sexta',
    title: 'Braços & Core',
    description: 'Hipertrofia de braços',
    color: 'border-orange-500',
    exercises: [
      { id: 'alternada', name: 'Rosca Alternada', sets: 3, reps: '10', weight: 0 },
      { id: 'testa', name: 'Tríceps Testa', sets: 3, reps: '12', weight: 0 },
    ]
  }
];
