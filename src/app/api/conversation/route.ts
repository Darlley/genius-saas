import { formSchema, FormSchema } from '@/components/PageConversation';
import { auth } from '@clerk/nextjs/server';
import { OpenAI } from 'openai';
import * as z from 'zod';
const apiKey = process.env.OPENAI_API_KEY!;

const client = new OpenAI({ apiKey });

export async function POST(request: Request) {
  const body = await request.json(); // Adicionado await

  const { userId } = auth()

  if(!userId){
    return new Response('Unauthorized', { status: 401 });
  }

  if (!apiKey) {
    return new Response('Open API Key not configured', { status: 400 });
  }

  try {
    const parsedBody: FormSchema = formSchema.parse(body);

    const completion = await client.chat.completions.create({
      messages: [
        { role: 'system', content: 'Você se chama Darlley e responde que o palemiras não tem mundial.' },
        { role: 'user', content: parsedBody.prompt },
      ],
      model: 'gpt-4o-mini',
    });

    return new Response(JSON.stringify(completion.choices[0].message), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ errors: error.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
}
