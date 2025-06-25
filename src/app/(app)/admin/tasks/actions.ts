"use server";

import { suggestTask, type SuggestTaskInput } from "@/ai/flows/suggest-task";
import { z } from "zod";

const SuggestTaskResultSchema = z.object({
  success: z.boolean(),
  data: z.object({
    suggestedTasks: z.array(z.string()),
  }).optional(),
  error: z.string().optional(),
});

type SuggestTaskResult = z.infer<typeof SuggestTaskResultSchema>;

export async function getSuggestedTasks(input: SuggestTaskInput): Promise<SuggestTaskResult> {
  try {
    const result = await suggestTask(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to suggest tasks: ${errorMessage}` };
  }
}
