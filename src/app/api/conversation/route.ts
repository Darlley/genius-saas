import { auth } from '@clerk/nextjs/server';
import { OpenAI } from 'openai';
const apiKey = process.env.OPENAI_API_KEY!;

const client = new OpenAI({ apiKey });

export async function POST(request: Request) {
  const { messages } = await request.json(); // Adicionado await

  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!apiKey) {
    return new Response('Open API Key not configured', { status: 400 });
  }

  if (!messages) {
    return new Response('Message are required', { status: 400 });
  }

  try {
    const response = await client.chat.completions.create({
      messages,
      model: 'gpt-4o-mini',
    });

    return new Response(JSON.stringify(response.choices[0].message));
  } catch (error) {
    console.error(error); // Adicionado para log de erro
    return new Response('Internal Server Error', { status: 500 });
  }
}
