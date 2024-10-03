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
  LoaderCircle,
  Mic,
  Paperclip,
  User,
} from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/index.mjs';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar } from '../ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { formSchema, FormSchema } from './PageConversation.schemas';
import { PageConversationProps } from './PageConversation.types';

export default function PageConversation(props: PageConversationProps) {
  const route = useRouter();

  const [messages, setMessages] = useState<
    Array<ChatCompletionAssistantMessageParam | ChatCompletionUserMessageParam>
  >([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const { isLoading, isSubmitSuccessful, isSubmitting, errors } =
    form.formState;

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const { prompt } = data;

    const userMessage: ChatCompletionUserMessageParam = {
      role: 'user',
      content: [
        {
          text: prompt,
          type: 'text',
        },
      ],
    };

    setMessages((current) => [...current, userMessage]);

    try {
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });

      setMessages((current) => [
        ...current,
        response.data as ChatCompletionAssistantMessageParam,
      ]);

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
        <div className="size-max rounded-lg bg-indigo-100 p-2 flex items-center justify-center border border-indigo-500">
          <Bot className="size-6 stroke-indigo-500 stroke-1" />
        </div>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            Conversa
          </h1>
          <p className="text-muted-foreground text-sm">
            Explore novas ideias, discuta conceitos, ou simplesmente compartilhe
            seus pensamentos. Estamos aqui para ouvir e ajudar de qualquer
            maneira que possamos.
          </p>
        </div>
      </header>

      <ScrollArea className="flex flex-col w-full h-full box-content p-4">
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

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : 'justify-start'
            }`}
          >
            <Avatar
              className={`size-8 p-1 mt-2 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'border flex items-center justify-center'
              }`}
            >
              {message.role === 'user' ? (
                <User className="size-full stroke-1" />
              ) : (
                <Bot className="size-full stroke-1" />
              )}
            </Avatar>
            <div
              className={`rounded-lg p-3 text-sm max-w-[80%] ${
                message.role === 'user'
                  ? 'border bg-secondary text-secondary-foreground '
                  : 'text-secondary-foreground'
              }`}
            >
              {Array.isArray(message.content) ? (
                message.content.map((part, index) => {
                  if (part.type === 'text') {
                    return (
                      <p
                        key={index}
                        className={`${
                          message.role === 'user' ? '' : 'font-mono'
                        } break-all whitespace-wrap`}
                      >
                        {part.text}
                      </p>
                    );
                  } else if (part.type === 'image_url') {
                    // Verifica se é uma imagem
                    return (
                      <Image
                        key={index}
                        src={part.image_url.url}
                        alt="Imagem"
                        layout="responsive"
                      />
                    );
                  }
                  return <p>Erro desconhecido.</p>; // Retorna null se o tipo não for reconhecido
                })
              ) : (
                <p
                  className={`${
                    message.role === 'user' ? '' : 'font-mono'
                  } break-all whitespace-break-spaces`}
                >
                  {message.content}
                </p>
              )}
            </div>
          </div>
        ))}

        {isSubmitting && (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
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
