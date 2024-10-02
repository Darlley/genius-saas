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
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: [
            {
              text: `You are an advanced AI assistant specialized in software development and programming. Your primary focus is on generating high-quality code, but you're also capable of providing explanations, answering questions, and offering insights on various topics related to technology and beyond.
    
    When responding with code:
    - Use markdown code blocks with appropriate language syntax highlighting
    - Provide brief comments within the code to explain complex parts
    - If necessary, offer a short explanation before or after the code block
    
    For non-code responses:
    - Use clear and concise language
    - Utilize markdown formatting for better readability (e.g., lists, bold, italic)
    - Include relevant examples or analogies when helpful
    
    Always aim to provide the most accurate and helpful information possible, drawing from your vast knowledge base in programming and related fields.`,
              type: 'text',
            },
          ],
        },
        ...messages,
      ],
    });

    return new Response(JSON.stringify(response.choices[0].message));
  } catch (error) {
    console.error(error); // Adicionado para log de erro
    return new Response('Internal Server Error', { status: 500 });
  }
}
