"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, ListPlus } from "lucide-react";
import { allTasksForSuggester, type Task } from "@/lib/data";
import { getSuggestedTasks } from "@/app/(app)/admin/tasks/actions";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  childProfile: z.string().min(10, {
    message: "Child profile must be at least 10 characters.",
  }),
  completedTasks: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const completedTasksString = allTasksForSuggester
  .filter((task) => task.status === "completed")
  .map((task) => task.title)
  .join("\n");

export function TaskSuggester() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      childProfile: "An 8-year-old who loves building with LEGOs and playing outside.",
      completedTasks: completedTasksString,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestions([]);
    
    const result = await getSuggestedTasks(data);

    if (result.success && result.data?.suggestedTasks) {
      setSuggestions(result.data.suggestedTasks);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "An unknown error occurred.",
      });
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <Wand2 className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Suggest Tasks
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Wand2 /> AI Task Suggester
          </DialogTitle>
          <DialogDescription>
            Get some inspiration for new quests. Describe the adventurer and their past deeds.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="childProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child Profile</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A 10-year-old who loves art and music."
                        className="resize-y min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completedTasks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed Tasks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List of tasks the child has already completed."
                        className="resize-y min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Suggesting...
                  </>
                ) : (
                  "Suggest New Tasks"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        {suggestions.length > 0 && (
          <div className="mt-4 space-y-3">
             <h3 className="font-semibold">Suggestions</h3>
            <div className="rounded-md border p-4 space-y-2 bg-muted/50">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-background">
                        <p className="text-sm">{suggestion}</p>
                        <Button variant="ghost" size="sm">
                            <ListPlus className="h-4 w-4 mr-2"/>
                            Add
                        </Button>
                    </div>
                ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
