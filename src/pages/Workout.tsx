import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, Flame, Dumbbell, TrendingDown, Repeat } from "lucide-react";
import { getTemplate, updateTemplate, type WorkoutTemplate, type Exercise, type SetType } from "@/lib/storage";
import { saveCompletedWorkout } from "@/lib/workoutHistory";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Workout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<WorkoutTemplate | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (id) {
      const loadedTemplate = getTemplate(id);
      if (loadedTemplate) {
        setTemplate(loadedTemplate);
        setExercises(JSON.parse(JSON.stringify(loadedTemplate.exercises)));
      }
    }
  }, [id]);

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof typeof exercises[0]["sets"][0], value: number | boolean | SetType) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex] = {
      ...newExercises[exerciseIndex].sets[setIndex],
      [field]: value,
    };
    setExercises(newExercises);
  };

  const getSetTypeIcon = (type: SetType) => {
    switch (type) {
      case "warm-up":
        return <Flame className="h-4 w-4" />;
      case "working":
        return <Dumbbell className="h-4 w-4" />;
      case "drop":
        return <TrendingDown className="h-4 w-4" />;
      case "rest-pause":
        return <Repeat className="h-4 w-4" />;
    }
  };

  const getSetTypeColor = (type: SetType) => {
    switch (type) {
      case "warm-up":
        return "text-orange-500";
      case "working":
        return "text-primary";
      case "drop":
        return "text-purple-500";
      case "rest-pause":
        return "text-blue-500";
    }
  };

  const completeWorkout = () => {
    if (template) {
      const updatedTemplate = { ...template, exercises };
      updateTemplate(updatedTemplate);
      
      const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
      const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter((s) => s.completed).length, 0);
      
      saveCompletedWorkout({
        templateId: template.id,
        templateName: template.name,
        completedAt: new Date().toISOString(),
        totalSets,
        completedSets,
        exercises: exercises.map(ex => ({
          name: ex.name,
          sets: ex.sets,
        })),
      });
      
      toast.success("Workout completato!", {
        description: "I tuoi progressi sono stati salvati.",
      });
      navigate("/dashboard");
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Template non trovato</p>
      </div>
    );
  }

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
  const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter((s) => s.completed).length, 0);
  const progress = (completedSets / totalSets) * 100;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">{template.name}</h1>
              <p className="text-sm text-muted-foreground">
                {completedSets} / {totalSets} serie
              </p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Exercises */}
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {exercises.map((exercise, exerciseIndex) => (
          <Card key={exercise.id} className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{exercise.name}</h3>

            <div className="space-y-3">
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-10 w-10 rounded-full ${getSetTypeColor(set.type)}`}
                      >
                        {getSetTypeIcon(set.type)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="start">
                      <div className="space-y-1">
                        <Button
                          variant={set.type === "warm-up" ? "secondary" : "ghost"}
                          className="w-full justify-start text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                          onClick={() => updateSet(exerciseIndex, setIndex, "type", "warm-up")}
                        >
                          <Flame className="h-4 w-4 mr-2" />
                          Warm Up
                        </Button>
                        <Button
                          variant={set.type === "working" ? "secondary" : "ghost"}
                          className="w-full justify-start text-primary hover:bg-primary/10"
                          onClick={() => updateSet(exerciseIndex, setIndex, "type", "working")}
                        >
                          <Dumbbell className="h-4 w-4 mr-2" />
                          Working Set
                        </Button>
                        <Button
                          variant={set.type === "drop" ? "secondary" : "ghost"}
                          className="w-full justify-start text-purple-500 hover:text-purple-600 hover:bg-purple-500/10"
                          onClick={() => updateSet(exerciseIndex, setIndex, "type", "drop")}
                        >
                          <TrendingDown className="h-4 w-4 mr-2" />
                          Drop Set
                        </Button>
                        <Button
                          variant={set.type === "rest-pause" ? "secondary" : "ghost"}
                          className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-500/10"
                          onClick={() => updateSet(exerciseIndex, setIndex, "type", "rest-pause")}
                        >
                          <Repeat className="h-4 w-4 mr-2" />
                          Rest Pause
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <span className="text-sm font-medium text-muted-foreground w-8">
                    {setIndex + 1}
                  </span>

                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">kg</label>
                      <Input
                        type="number"
                        value={set.weight || ""}
                        onChange={(e) =>
                          updateSet(exerciseIndex, setIndex, "weight", parseFloat(e.target.value) || 0)
                        }
                        className="h-10 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">reps</label>
                      <Input
                        type="number"
                        value={set.reps || ""}
                        onChange={(e) =>
                          updateSet(exerciseIndex, setIndex, "reps", parseInt(e.target.value) || 0)
                        }
                        className="h-10 text-center"
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">RIR</label>
                      <Input
                        type="number"
                        value={set.rir || ""}
                        onChange={(e) =>
                          updateSet(exerciseIndex, setIndex, "rir", parseInt(e.target.value) || 0)
                        }
                        className="h-10 text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <Checkbox
                    checked={set.completed}
                    onCheckedChange={(checked) =>
                      updateSet(exerciseIndex, setIndex, "completed", checked === true)
                    }
                    className="h-6 w-6 rounded-full"
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4">
        <Button
          size="lg"
          className="rounded-full shadow-lg px-8 h-14 text-base font-semibold"
          onClick={completeWorkout}
        >
          <Check className="mr-2 h-5 w-5" />
          Completa Workout
        </Button>
      </div>
    </div>
  );
};

export default Workout;
