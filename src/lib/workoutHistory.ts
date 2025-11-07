// Workout history storage for tracking completed workouts

export interface CompletedWorkout {
  id: string;
  templateId: string;
  templateName: string;
  completedAt: string;
  totalSets: number;
  completedSets: number;
  exercises: {
    name: string;
    sets: {
      weight: number;
      reps: number;
      rir: number;
      completed: boolean;
    }[];
  }[];
}

const HISTORY_KEY = "workout-history";

export const getWorkoutHistory = (): CompletedWorkout[] => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading workout history:", error);
    return [];
  }
};

export const saveCompletedWorkout = (workout: Omit<CompletedWorkout, "id">) => {
  try {
    const history = getWorkoutHistory();
    const newWorkout: CompletedWorkout = {
      ...workout,
      id: Date.now().toString(),
    };
    history.unshift(newWorkout);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving workout history:", error);
  }
};

export const getTotalStats = () => {
  const history = getWorkoutHistory();
  
  const totalWorkouts = history.length;
  const totalSets = history.reduce((acc, w) => acc + w.completedSets, 0);
  const totalVolume = history.reduce((acc, w) => {
    return acc + w.exercises.reduce((exAcc, ex) => {
      return exAcc + ex.sets.reduce((setAcc, set) => {
        return set.completed ? setAcc + (set.weight * set.reps) : setAcc;
      }, 0);
    }, 0);
  }, 0);

  return {
    totalWorkouts,
    totalSets,
    totalVolume,
  };
};
