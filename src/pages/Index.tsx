import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Plus, Clock, X, Play, Pencil, Trash2 } from "lucide-react";
import { getTemplates, createTemplate, deleteTemplate, type WorkoutTemplate } from "@/lib/storage";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { BottomNav } from "@/components/BottomNav";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<WorkoutTemplate | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<WorkoutTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [exercises, setExercises] = useState<{ name: string; sets: number }[]>([
    { name: "", sets: 3 },
  ]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setTemplates(getTemplates());
  }, []);

  const startWorkout = (templateId: string) => {
    navigate(`/workout/${templateId}`);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: 3 }]);
  };

  const handleRemoveExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index: number, field: "name" | "sets", value: string | number) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const handleEditTemplate = (template: WorkoutTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setExercises(template.exercises.map(ex => ({ name: ex.name, sets: ex.sets.length })));
    setIsDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci un nome per la scheda",
        variant: "destructive",
      });
      return;
    }

    const validExercises = exercises.filter((ex) => ex.name.trim() !== "");
    if (validExercises.length === 0) {
      toast({
        title: "Errore",
        description: "Aggiungi almeno un esercizio",
        variant: "destructive",
      });
      return;
    }

    if (editingTemplate) {
      // Update existing template
      const updatedTemplate: WorkoutTemplate = {
        ...editingTemplate,
        name: templateName,
        exercises: validExercises.map((ex, exIndex) => {
          const existingExercise = editingTemplate.exercises[exIndex];
          return {
            id: existingExercise?.id || Date.now().toString() + exIndex,
            name: ex.name,
            sets: Array.from({ length: ex.sets }, (_, i) => 
              existingExercise?.sets[i] || {
                weight: 0,
                reps: 0,
                rir: 0,
                completed: false,
                type: "working" as const,
              }
            ),
          };
        }),
      };
      
      const allTemplates = getTemplates();
      const updatedTemplates = allTemplates.map(t => 
        t.id === editingTemplate.id ? updatedTemplate : t
      );
      localStorage.setItem("workout-templates", JSON.stringify(updatedTemplates));
      setTemplates(updatedTemplates);
    } else {
      // Create new template
      createTemplate(templateName, validExercises);
      setTemplates(getTemplates());
    }
    
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setTemplateName("");
    setExercises([{ name: "", sets: 3 }]);
    toast({
      title: "Successo",
      description: editingTemplate ? "Scheda aggiornata con successo" : "Scheda creata con successo",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setTemplateName("");
    setExercises([{ name: "", sets: 3 }]);
  };

  const handleDeleteTemplate = () => {
    if (templateToDelete) {
      deleteTemplate(templateToDelete.id);
      setTemplates(getTemplates());
      setTemplateToDelete(null);
      toast({
        title: "Scheda eliminata",
        description: "La scheda è stata eliminata con successo",
      });
    }
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
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsDialogOpen(true)}
            >
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
              className="p-4 transition-all border-border"
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTemplate(template);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-10 w-10 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTemplateToDelete(template);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="default"
                    className="rounded-full shadow-sm gap-2 px-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      startWorkout(template.id);
                    }}
                  >
                    <Play className="h-4 w-4" />
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

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Modifica Scheda" : "Crea Nuova Scheda"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Nome Scheda</Label>
              <Input
                id="template-name"
                placeholder="es. Upper Body"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Esercizi</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddExercise}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Aggiungi
                </Button>
              </div>

              {exercises.map((exercise, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Esercizio {index + 1}</Label>
                      {exercises.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleRemoveExercise(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Nome esercizio"
                      value={exercise.name}
                      onChange={(e) =>
                        handleExerciseChange(index, "name", e.target.value)
                      }
                    />
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`sets-${index}`} className="text-sm min-w-fit">
                        Serie:
                      </Label>
                      <Input
                        id={`sets-${index}`}
                        type="number"
                        min="1"
                        max="10"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleExerciseChange(
                            index,
                            "sets",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-20"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                Annulla
              </Button>
              <Button onClick={handleSaveTemplate} className="flex-1">
                {editingTemplate ? "Salva Modifiche" : "Crea Scheda"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!templateToDelete} onOpenChange={() => setTemplateToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione eliminerà permanentemente la scheda "{templateToDelete?.name}". 
              Questa operazione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTemplate}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
