import { streamText } from 'ai';
import { models, systemPrompts } from '@/lib/ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Stream text responses with the AI SDK
    const result = streamText({
      model: models.fast,
      system: systemPrompts.careerCounselor,
      messages,
      temperature: 0.7,
    });

    // Return a streaming response compatible with useChat hook
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Error processing chat request', { status: 500 });
  }
}
