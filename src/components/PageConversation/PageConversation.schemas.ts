import * as z from 'zod';

export const formSchema = z.object({
  prompt: z
    .string({
      message: 'A mensagem é obrigatoria ',
    })
    .min(1, {
      message: 'A mensagem é obrigatoria ',
    }),
});
export type FormSchema = z.infer<typeof formSchema>;
