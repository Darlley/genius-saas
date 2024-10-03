import * as z from 'zod';

export const modelOptions = [
  { value: 'dall-e-2', label: 'DALL-E 2' },
  { value: 'dall-e-3', label: 'DALL-E 3' },
] as const;

export const amountOptions = [
  { value: '1', label: '1 Foto' },
  { value: '2', label: '2 Fotos' },
  { value: '3', label: '3 Fotos' },
  { value: '4', label: '4 Fotos' },
  { value: '5', label: '5 Fotos' }
] as const;

export const resolutionOptionsDallE2 = [
  { value: '256x256', label: '256x256' },
  { value: '512x512', label: '512x512' },
  { value: '1024x1024', label: '1024x1024' },
] as const;

export const resolutionOptionsDallE3 = [
  { value: '1024x1024', label: '1024x1024' },
  { value: '1792x1024', label: '1792x1024' },
  { value: '1024x1792', label: '1024x1792' },
] as const;

export const formSchema = z.object({
  prompt: z
    .string({
      message: 'A mensagem é obrigatória',
    })
    .min(1, {
      message: 'A mensagem é obrigatória',
    }),
  amount: z.enum(['1', '2', '3', '4', '5']),
  resolution: z.enum(['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792']),
  model: z.enum(['dall-e-2', 'dall-e-3'])
});

export type FormSchema = z.infer<typeof formSchema>;