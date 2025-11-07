import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Clock } from "lucide-react";
import { getTemplates, type WorkoutTemplate } from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const startWorkout = (templateId: string) => {
    navigate(`/workout/${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">Template</h1>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Templates List */}
      <main className="container max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="p-4 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer border-border"
              onClick={() => startWorkout(template.id)}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.exercises.length} esercizi
                  </p>
                  {template.lastUsed && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(template.lastUsed), {
                          addSuffix: true,
                          locale: it,
                        })}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <Button
                    size="sm"
                    className="rounded-full shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      startWorkout(template.id);
                    }}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nessun template disponibile</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
