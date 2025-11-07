import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Activity, Dumbbell, TrendingUp, Calendar } from "lucide-react";
import { getTotalStats, getWorkoutHistory, type CompletedWorkout } from "@/lib/workoutHistory";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { BottomNav } from "@/components/BottomNav";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalWorkouts: 0, totalSets: 0, totalVolume: 0 });
  const [recentWorkouts, setRecentWorkouts] = useState<CompletedWorkout[]>([]);

  useEffect(() => {
    setStats(getTotalStats());
    setRecentWorkouts(getWorkoutHistory().slice(0, 5));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-medium">Workout</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalWorkouts}</p>
            <p className="text-xs text-muted-foreground mt-1">totali</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity className="h-4 w-4" />
              <span className="text-xs font-medium">Serie</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalSets}</p>
            <p className="text-xs text-muted-foreground mt-1">completate</p>
          </Card>

          <Card className="p-4 col-span-2">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Volume totale</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.totalVolume.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">kg sollevati</p>
          </Card>
        </div>

        {/* Recent Workouts */}
        {recentWorkouts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground px-1">Workout recenti</h2>
            {recentWorkouts.map((workout) => (
              <Card 
                key={workout.id} 
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => navigate(`/workout-history/${workout.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{workout.templateName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {workout.completedSets} serie completate
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <span>
                        {formatDistanceToNow(new Date(workout.completedAt), {
                          addSuffix: true,
                          locale: it,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10">
                    <Dumbbell className="h-5 w-5 text-success" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {recentWorkouts.length === 0 && (
          <Card className="p-8">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nessun workout completato</p>
              <p className="text-sm text-muted-foreground mt-1">Inizia il tuo primo allenamento!</p>
            </div>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
