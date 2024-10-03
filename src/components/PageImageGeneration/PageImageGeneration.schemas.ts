import * as z from 'zod';

export const formSchema = z.object({
  prompt: z
    .string({
      message: 'A mensagem é obrigatoria ',
    })
    .min(1, {
      message: 'A mensagem é obrigatoria ',
    }),
  amount: z.string().min(1),
  resolution: z.string().min(1)
});
export type FormSchema = z.infer<typeof formSchema>;

export const amountOptions = [
  { value: '1', label: '1 Photo' },
  { value: '2', label: '2 Photos' },
  { value: '3', label: '3 Photos' },
  { value: '4', label: '4 Photos' },
  { value: '5', label: '5 Photos' },
]

export const resolutionOptions = [
  { value: '256x256', label: '256x256' },
  { value: '512x512', label: '512x512' },
  { value: '1024x104', label: '1024x1024' }
]