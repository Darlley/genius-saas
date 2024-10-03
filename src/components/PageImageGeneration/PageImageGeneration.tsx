'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Bot,
  CornerDownLeft,
  ImageDown,
  LoaderCircle,
  Mic,
  Paperclip,
} from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar } from '../ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  amountOptions,
  formSchema,
  FormSchema,
  resolutionOptions,
} from './PageImageGeneration.schemas';
import { PageImageGenerationProps } from './PageImageGeneration.types';
export default function PageImageGeneration(props: PageImageGenerationProps) {
  const route = useRouter();
  const [images, setImages] = useState<Array<string>>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const { isLoading, isSubmitSuccessful, isSubmitting, errors } =
    form.formState;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    return console.log(data);
    try {
      const response = await axios.post('/api/conversation', data);
      const urls = response?.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro.');
    } finally {
      // route.push('')
    }
  };

  return (
    <main className="flex-1 h-full overflow-hidden flex flex-col">
      <header className="flex gap-4 items-center p-4 border-b">
        <div className="size-max rounded-lg bg-red-100 p-2 flex items-center justify-center border border-red-500">
          <ImageDown className="size-6 stroke-red-500 stroke-1" />
        </div>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            Gerar imagens
          </h1>
          <p className="text-muted-foreground text-sm">
            Descreva a imagem que você deseja criar e nossa IA transformará suas
            palavras em arte visual. Experimente diferentes prompts e veja a
            magia acontecer!
          </p>
        </div>
      </header>

      <ScrollArea className="flex flex-col w-full h-full box-content p-4 gap-4">
        <div className="flex items-start gap-3 justify-start">
          <Avatar className="size-8 p-1 mt-2 border flex items-center justify-center">
            <Bot className="size-full stroke-1" />
          </Avatar>
          <div className="rounded-lg p-3 text-sm max-w-[80%] text-secondary-foreground">
            <p className="font-mono break-all whitespace-break-spaces">
              Olá 🤖 como posso te ajudar?
            </p>
          </div>
        </div>

        {isSubmitting && (
          <div className="flex flex-col space-y-3 my-4">
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-20 w-[120px]" />
              <Skeleton className="h-20 w-[120px]" />
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="p-4">
        <Form {...form}>
          <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            x-chunk="dashboard-03-chunk-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Escreva sua mensagem."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between p-3 pt-0">
              <div className="flex items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {resolutionOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        disabled={isSubmitting}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {!!errors.prompt && (
                  <p className="text-destructive text-xs">
                    {errors?.prompt?.message}
                  </p>
                )}
                <Button
                  type="submit"
                  size="sm"
                  variant={!!errors.prompt ? 'destructive' : 'default'}
                  className="ml-auto gap-1.5"
                  disabled={isSubmitting}
                >
                  Send Message
                  {isSubmitting ? (
                    <LoaderCircle className="size-3.5 animate-spin" />
                  ) : (
                    <CornerDownLeft className="size-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
