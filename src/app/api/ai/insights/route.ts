import { streamText } from 'ai';
import { models, systemPrompts } from '@/lib/ai';
import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { careerTitle, studentStrengths, industryTrends } = await req.json();

    if (!careerTitle) {
      return new Response('Career title is required', { status: 400 });
    }

    const prompt = `Provide actionable career insights for a student interested in: ${careerTitle}

Student's strengths: ${studentStrengths?.join(', ') || 'General aptitude'}
Industry trends: ${industryTrends || 'General market conditions'}

Provide:
1. Key opportunities in this career field
2. Skills they should focus on developing
3. Practical next steps to take
4. Encouraging advice tailored to their strengths

Keep the response concise, actionable, and motivating.`;

    // Stream the career insights
    const result = streamText({
      model: models.fast,
      system: systemPrompts.mentor,
      prompt,
      temperature: 0.7,
    });

    // Return streaming response
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error generating insights:', error);
    return new Response('Error generating insights', { status: 500 });
  }
}
