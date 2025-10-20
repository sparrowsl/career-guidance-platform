import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default openai;

// Helper function to check if OpenAI is configured
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here';
}

// Generate AI-powered career recommendations
export async function generateAIRecommendations(
  studentName: string,
  categoryScores: { analytical: number; creative: number; technical: number; interpersonal: number },
  careers: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    demandLevel: string;
    averageSalary?: string | null;
    jobGrowthRate?: string | null;
  }>
) {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API key is not configured');
  }

  const prompt = `You are a career counselor AI helping a student named ${studentName} find the best career matches based on their aptitude quiz results.

Their category scores (out of 5) are:
- Analytical: ${categoryScores.analytical.toFixed(2)}
- Creative: ${categoryScores.creative.toFixed(2)}
- Technical: ${categoryScores.technical.toFixed(2)}
- Interpersonal: ${categoryScores.interpersonal.toFixed(2)}

Available careers to consider:
${careers.map((c, i) => `${i + 1}. ${c.title} (${c.category}, ${c.demandLevel} demand)
   Description: ${c.description}
   Salary: ${c.averageSalary || 'N/A'}
   Growth: ${c.jobGrowthRate || 'N/A'}`).join('\n\n')}

Please analyze the student's strengths and rank the top 5 careers that best match their profile. For each career, provide:
1. A match score (0-100)
2. A personalized reasoning (2-3 sentences) explaining why this career is a good fit based on their specific strengths

Return ONLY a valid JSON array with this structure:
[
  {
    "careerId": "career_id_here",
    "matchScore": 85,
    "reasoning": "Your reasoning here..."
  }
]

Important:
- Use the actual career IDs from the list above
- Match scores should reflect how well the student's strengths align with each career
- Consider both aptitude scores AND market demand
- Provide realistic, encouraging, and specific feedback
- Return ONLY the JSON array, no additional text`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional career counselor AI. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const recommendations = JSON.parse(content);

    if (!Array.isArray(recommendations)) {
      throw new Error('Invalid response format from OpenAI');
    }

    return recommendations;
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    throw error;
  }
}

// Generate personalized career insights
export async function generateCareerInsights(
  careerTitle: string,
  studentStrengths: string[],
  industryTrends: string
) {
  if (!isOpenAIConfigured()) {
    return null;
  }

  const prompt = `Provide a brief career insight (2-3 sentences) for a student interested in becoming a ${careerTitle}.

Student's key strengths: ${studentStrengths.join(', ')}
Industry trends: ${industryTrends}

Focus on actionable advice and encouragement.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful career advisor providing brief, actionable career insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content?.trim() || null;
  } catch (error) {
    console.error('Error generating career insights:', error);
    return null;
  }
}
