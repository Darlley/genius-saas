import { z } from 'zod'
import { auth } from '@clerk/nextjs/server';
import { OpenAI } from 'openai';
import { formSchema } from '@/components/PageImageGeneration/PageImageGeneration.schemas';
const apiKey = process.env.OPENAI_API_KEY!;

const client = new OpenAI({ apiKey });

export async function POST(request: Request) {
  const body = await request.json(); // Adicionado await

  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!apiKey) {
    return new Response('Open API Key not configured', { status: 400 });
  }

  const { amount = '1', prompt, resolution = '512x512', model } = formSchema.parse(body)

  if (!prompt) {
    return new Response('Prompt is required', { status: 400 });
  }

  if (!amount) {
    return new Response('Amount is required', { status: 400 });
  }

  if (!resolution) {
    return new Response('Resolution is required', { status: 400 });
  }

  try {
    const response = await client.images.generate({
      model: model,
      prompt,
      n: model === 'dall-e-3' ? 1 : parseInt(amount),
      size: resolution as "256x256" | "512x512" | "1024x1024" | "1024x1792" | "1792x1024",
    });

    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.error(error); // Adicionado para log de erro
    return new Response('Internal Server Error', { status: 500 });
  }
}
