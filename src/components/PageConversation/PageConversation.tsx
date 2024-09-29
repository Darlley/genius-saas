'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Bird,
  Bot,
  CornerDownLeft,
  LoaderCircle,
  Mic,
  Paperclip,
  Rabbit,
  Turtle,
  User,
} from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionAssistantMessageParam, ChatCompletionContentPartText, ChatCompletionMessageParam, ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar } from '../ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { formSchema, FormSchema } from './PageConversation.schemas';
import { PageConversationProps } from './PageConversation.types';
import Image from 'next/image';

export default function PageConversation(props: PageConversationProps) {
  const route = useRouter();

  const [messages, setMessages] = useState<Array<ChatCompletionAssistantMessageParam | ChatCompletionUserMessageParam>>([
    {
      role: 'assistant',
      content: [
        {
          text: 'Olá 🤖 como posso te ajudar?',
          type: 'text',
        },
      ],
    },
  ]);

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
        }
      ]
    };

    setMessages((current) => [...current, userMessage]);

    try {
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });

      setMessages((current) => [...current, response.data as ChatCompletionAssistantMessageParam]);

      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Ocorreu um erro.');
    } finally {
      // route.push('')
    }
  };

  return (
    <main className="grid flex-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 h-full overflow-hidden">
      <div
        className="relative hidden flex-col items-start gap-8 md:flex"
        x-chunk="dashboard-03-chunk-0"
      >
        <form className="grid w-full items-start gap-6">
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium items-center flex gap-2">
              <div className="rounded-lg bg-indigo-100 p-1 flex items-center justify-center border border-indigo-500">
                <Bot className="size-6 stroke-indigo-500 stroke-1" />
              </div>
              <span>Conversas</span>
            </legend>
            <div className="grid gap-3">
              <Label htmlFor="model">Model</Label>
              <Select>
                <SelectTrigger
                  id="model"
                  className="items-start [&_[data-description]]:hidden"
                >
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genesis">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Rabbit className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{' '}
                          <span className="font-medium text-foreground">
                            Genesis
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Our fastest model for general use cases.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="explorer">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Bird className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{' '}
                          <span className="font-medium text-foreground">
                            Explorer
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          Performance and speed for efficiency.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="quantum">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Turtle className="size-5" />
                      <div className="grid gap-0.5">
                        <p>
                          Neural{' '}
                          <span className="font-medium text-foreground">
                            Quantum
                          </span>
                        </p>
                        <p className="text-xs" data-description>
                          The most powerful model for complex computations.
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="temperature">Temperature</Label>
              <Input id="temperature" type="number" placeholder="0.4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
            <div className="grid gap-3">
              <Label htmlFor="role">Role</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="You are a..."
                className="min-h-[9.5rem]"
              />
            </div>
          </fieldset>
        </form>
      </div>
      <div className="relative flex h-full min-h-[50vh] flex-col  rounded-xl bg-muted/50 p-4 lg:col-span-2">
        <ScrollArea className="flex-grow p-4 max-h-full overflow-y-auto w-full">
          <div className="space-y-4 w-full">
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
                          <p key={index} className={`${message.role === 'user' ? '' : 'font-mono'} break-all whitespace-wrap`}>
                            {part.text}
                          </p>
                        );
                      } else if (part.type === 'image_url') { // Verifica se é uma imagem
                        return (
                          <Image key={index} src={part.image_url.url} alt="Imagem" layout="responsive" />
                        );
                      }
                      return <p>Erro desconhecido.</p>; // Retorna null se o tipo não for reconhecido
                    })
                  ) : (
                    <p className={`${message.role === 'user' ? '' : 'font-mono'} break-all whitespace-break-spaces`}>
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
          </div>
        </ScrollArea>
        <div>
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
      </div>
    </main>
  );
}
