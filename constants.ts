
import { WorkoutDay } from './types';

export const INITIAL_WORKOUTS: WorkoutDay[] = [
  {
    id: 'segunda',
    title: 'Peito & Tríceps',
    description: 'Foco em empurrar e extensão de cotovelo',
    color: 'border-red-500',
    cardio: '10–15 min',
    exercises: [
      { id: 'supino', name: 'Supino Reto', sets: 4, reps: '8-12', weight: 0 },
      { id: 'inclinado', name: 'Supino Inclinado', sets: 3, reps: '10', weight: 0 },
      { id: 'crucifixo', name: 'Crucifixo', sets: 3, reps: '12', weight: 0 },
      { id: 'pulley', name: 'Tríceps Pulley', sets: 3, reps: '12', weight: 0 },
      { id: 'frances', name: 'Tríceps Francês', sets: 3, reps: '10', weight: 0 },
    ]
  },
  {
    id: 'terca',
    title: 'Costas & Bíceps',
    description: 'Foco em puxar e flexão de cotovelo',
    color: 'border-blue-500',
    exercises: [
      { id: 'puxada', name: 'Puxada Alta', sets: 4, reps: '8-12', weight: 0 },
      { id: 'remada', name: 'Remada Curvada', sets: 3, reps: '10', weight: 0 },
      { id: 'unilateral', name: 'Remada Unilateral', sets: 3, reps: '10', weight: 0 },
      { id: 'rosca', name: 'Rosca Direta', sets: 3, reps: '12', weight: 0 },
      { id: 'martelo', name: 'Rosca Martelo', sets: 3, reps: '10', weight: 0 },
    ]
  },
  {
    id: 'quarta',
    title: 'Pernas',
    description: 'Quadríceps, Isquiotibiais e Panturrilha',
    color: 'border-green-500',
    exercises: [
      { id: 'agachamento', name: 'Agachamento', sets: 4, reps: '10', weight: 0 },
      { id: 'legpress', name: 'Leg Press', sets: 3, reps: '12', weight: 0 },
      { id: 'extensora', name: 'Extensora', sets: 3, reps: '12', weight: 0 },
      { id: 'flexora', name: 'Flexora', sets: 3, reps: '12', weight: 0 },
      { id: 'panturrilha', name: 'Panturrilha', sets: 3, reps: '15', weight: 0 },
    ]
  },
  {
    id: 'quinta',
    title: 'Ombros & Trapézio',
    description: 'Deltoides e estabilizadores superiores',
    color: 'border-purple-500',
    exercises: [
      { id: 'lateral', name: 'Elevação Lateral', sets: 4, reps: '12', weight: 0 },
      { id: 'desenv', name: 'Desenvolvimento', sets: 3, reps: '10', weight: 0 },
      { id: 'frontal', name: 'Elevação Frontal', sets: 3, reps: '10', weight: 0 },
      { id: 'encolhimento', name: 'Encolhimento', sets: 3, reps: '12', weight: 0 },
      { id: 'facepull', name: 'Face Pull', sets: 3, reps: '12', weight: 0 },
    ]
  },
  {
    id: 'sexta',
    title: 'Braços & Core',
    description: 'Bíceps, Tríceps e Abdominal',
    color: 'border-orange-500',
    exercises: [
      { id: 'alternada', name: 'Rosca Alternada', sets: 3, reps: '10', weight: 0 },
      { id: 'testa', name: 'Tríceps Testa', sets: 3, reps: '12', weight: 0 },
      { id: 'concentrada', name: 'Rosca Concentrada', sets: 3, reps: '12', weight: 0 },
      { id: 'kickback', name: 'Tríceps Kickback', sets: 3, reps: '12', weight: 0 },
      { id: 'prancha', name: 'Prancha (s)', sets: 3, reps: '30s', weight: 0 },
    ]
  }
];
