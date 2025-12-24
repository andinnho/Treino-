
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: number;
  previousWeight?: number;
}

export interface WorkoutDay {
  id: string;
  title: string;
  description: string;
  exercises: Exercise[];
  cardio?: string;
  color: string;
}

export interface HistoryEntry {
  date: string;
  weight: number;
}

export interface ProgressState {
  [exerciseId: string]: HistoryEntry[];
}
