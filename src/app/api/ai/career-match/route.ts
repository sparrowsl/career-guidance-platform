import { generateObject } from 'ai';
import { models, systemPrompts } from '@/lib/ai';
import { NextRequest, NextResponse } from 'next/server';
import { careerRecommendationSchema } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentName, categoryScores, careers } = body;

    if (!studentName || !categoryScores || !careers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Analyze career matches for ${studentName} based on their aptitude scores:
- Analytical: ${categoryScores.analytical}/5
- Creative: ${categoryScores.creative}/5
- Technical: ${categoryScores.technical}/5
- Interpersonal: ${categoryScores.interpersonal}/5

Available careers:
${careers.map((c: any, i: number) => `${i + 1}. ${c.title} (ID: ${c.id})
   Category: ${c.category}
   Description: ${c.description}
   Demand: ${c.demandLevel}
   Salary: ${c.averageSalary || 'N/A'}
   Growth Rate: ${c.jobGrowthRate || 'N/A'}`).join('\n\n')}

Provide the top 5 career recommendations with match scores, reasoning, key strengths that align, and areas to develop.`;

    // Generate structured output using generateObject
    const result = await generateObject({
      model: models.smart,
      system: systemPrompts.careerAnalyst,
      prompt,
      schema: careerRecommendationSchema,
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      data: result.object,
      usage: result.usage,
    });
  } catch (error) {
    console.error('Error generating career recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
