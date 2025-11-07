import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Target, TrendingUp, Flame, Dumbbell, TrendingDown, Repeat } from "lucide-react";
import { getWorkoutHistory, type CompletedWorkout } from "@/lib/workoutHistory";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const WorkoutHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const workout = getWorkoutHistory().find(w => w.id === id);

  if (!workout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Workout non trovato</p>
      </div>
    );
  }

  const totalVolume = workout.exercises.reduce((acc, ex) => {
    return acc + ex.sets.reduce((setAcc, set) => {
      return set.completed ? setAcc + (set.weight * set.reps) : setAcc;
    }, 0);
  }, 0);

  const getSetTypeIcon = (type: string) => {
    switch (type) {
      case "warm-up":
        return <Flame className="h-3 w-3" />;
      case "working":
        return <Dumbbell className="h-3 w-3" />;
      case "drop":
        return <TrendingDown className="h-3 w-3" />;
      case "rest-pause":
        return <Repeat className="h-3 w-3" />;
    }
  };

  const getSetTypeColor = (type: string) => {
    switch (type) {
      case "warm-up":
        return "text-orange-500 bg-orange-500/10";
      case "working":
        return "text-primary bg-primary/10";
      case "drop":
        return "text-purple-500 bg-purple-500/10";
      case "rest-pause":
        return "text-blue-500 bg-blue-500/10";
    }
  };

  const getSetTypeLabel = (type: string) => {
    switch (type) {
      case "warm-up":
        return "Warm Up";
      case "working":
        return "Working";
      case "drop":
        return "Drop";
      case "rest-pause":
        return "Rest Pause";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">{workout.templateName}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(workout.completedAt), "d MMMM yyyy 'alle' HH:mm", { locale: it })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Serie</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{workout.completedSets}/{workout.totalSets}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Volume</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalVolume.toLocaleString()}</p>
            <span className="text-xs text-muted-foreground">kg</span>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Esercizi</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{workout.exercises.length}</p>
          </Card>
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          {workout.exercises.map((exercise, exIndex) => (
            <Card key={exIndex} className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">{exercise.name}</h3>
              
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div 
                    key={setIndex} 
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      set.completed ? "border-primary/20 bg-primary/5" : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">
                        {setIndex + 1}
                      </span>
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getSetTypeColor(set.type)}`}>
                        {getSetTypeIcon(set.type)}
                        <span>{getSetTypeLabel(set.type)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">{set.weight}</p>
                        <p className="text-xs text-muted-foreground">kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">{set.reps}</p>
                        <p className="text-xs text-muted-foreground">reps</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-foreground">{set.rir}</p>
                        <p className="text-xs text-muted-foreground">RIR</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;
