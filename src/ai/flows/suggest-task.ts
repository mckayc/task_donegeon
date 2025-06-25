'use server';

/**
 * @fileOverview AI-powered task suggestion for admin consideration.
 *
 * - suggestTask - A function that suggests tasks based on child profile and completed tasks.
 * - SuggestTaskInput - The input type for the suggestTask function.
 * - SuggestTaskOutput - The return type for the suggestTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskInputSchema = z.object({
  childProfile: z
    .string()
    .describe('Description of the child profile, including age and interests.'),
  completedTasks: z
    .string()
    .describe('List of previously completed tasks by the child.'),
});
export type SuggestTaskInput = z.infer<typeof SuggestTaskInputSchema>;

const SuggestTaskOutputSchema = z.object({
  suggestedTasks: z
    .array(z.string())
    .describe('Array of suggested tasks appropriate for the child.'),
});
export type SuggestTaskOutput = z.infer<typeof SuggestTaskOutputSchema>;

export async function suggestTask(input: SuggestTaskInput): Promise<SuggestTaskOutput> {
  return suggestTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPrompt',
  input: {schema: SuggestTaskInputSchema},
  output: {schema: SuggestTaskOutputSchema},
  prompt: `You are an AI task suggester for the Task Donegeon application. You will be provided with a child profile and a list of previously completed tasks. Your job is to suggest new age-appropriate tasks for the child.

Child Profile: {{{childProfile}}}
Completed Tasks: {{{completedTasks}}}

Suggest 5 new tasks:
`,
});

const suggestTaskFlow = ai.defineFlow(
  {
    name: 'suggestTaskFlow',
    inputSchema: SuggestTaskInputSchema,
    outputSchema: SuggestTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
