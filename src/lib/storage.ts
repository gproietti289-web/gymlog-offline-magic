// Local storage utilities for offline-first workout tracking

export type SetType = "warm-up" | "working" | "drop" | "rest-pause";

export interface WorkoutSet {
  weight: number;
  reps: number;
  rir: number;
  completed: boolean;
  type: SetType;
}

export interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  exercises: Exercise[];
  lastUsed?: string;
}

const STORAGE_KEY = "workout-templates";

export const getTemplates = (): WorkoutTemplate[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultTemplates();
  } catch (error) {
    console.error("Error loading templates:", error);
    return getDefaultTemplates();
  }
};

export const saveTemplates = (templates: WorkoutTemplate[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error("Error saving templates:", error);
  }
};

export const getTemplate = (id: string): WorkoutTemplate | null => {
  const templates = getTemplates();
  return templates.find((t) => t.id === id) || null;
};

export const updateTemplate = (template: WorkoutTemplate) => {
  const templates = getTemplates();
  const index = templates.findIndex((t) => t.id === template.id);
  if (index !== -1) {
    templates[index] = { ...template, lastUsed: new Date().toISOString() };
    saveTemplates(templates);
  }
};

export const createTemplate = (name: string, exercises: { name: string; sets: number }[]): WorkoutTemplate => {
  const templates = getTemplates();
  const newId = (Math.max(0, ...templates.map(t => parseInt(t.id))) + 1).toString();
  
  const newTemplate: WorkoutTemplate = {
    id: newId,
    name,
    exercises: exercises.map((ex, index) => ({
      id: `${newId}-${index + 1}`,
      name: ex.name,
      sets: Array(ex.sets).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
    })),
  };
  
  templates.push(newTemplate);
  saveTemplates(templates);
  return newTemplate;
};

const getDefaultTemplates = (): WorkoutTemplate[] => [
  {
    id: "1",
    name: "Push Day",
    exercises: [
      {
        id: "1-1",
        name: "Bench Press",
      sets: Array(4).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "1-2",
        name: "Shoulder Press",
      sets: Array(3).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "1-3",
        name: "Tricep Dips",
      sets: Array(3).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
    ],
  },
  {
    id: "2",
    name: "Pull Day",
    exercises: [
      {
        id: "2-1",
        name: "Pull Ups",
      sets: Array(4).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "2-2",
        name: "Barbell Row",
      sets: Array(4).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "2-3",
        name: "Bicep Curls",
      sets: Array(3).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
    ],
  },
  {
    id: "3",
    name: "Leg Day",
    exercises: [
      {
        id: "3-1",
        name: "Squat",
        sets: Array(4).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "3-2",
        name: "Romanian Deadlift",
      sets: Array(3).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
      {
        id: "3-3",
        name: "Leg Press",
        sets: Array(3).fill({ weight: 0, reps: 0, rir: 0, completed: false, type: "working" }),
      },
    ],
  },
];
