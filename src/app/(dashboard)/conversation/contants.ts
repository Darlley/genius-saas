import { z } from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});
export type FormSchema = z.infer<typeof formSchema>;
