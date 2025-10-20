import { createOpenAI } from '@ai-sdk/openai';

// Initialize the OpenAI provider with Vercel AI SDK
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Helper function to check if OpenAI is configured
export function isAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here';
}

// Default model configurations
export const models = {
  // Fast and cost-effective for most tasks
  fast: openai('gpt-4o-mini'),

  // More capable for complex reasoning
  smart: openai('gpt-4o'),

  // Balanced performance
  balanced: openai('gpt-4o-mini'),
};

// System prompts for different use cases
export const systemPrompts = {
  careerCounselor: 'You are a professional career counselor AI. You provide thoughtful, encouraging, and actionable career guidance based on student aptitudes, interests, and market trends.',

  careerAnalyst: 'You are a career analyst AI. You analyze career data, market trends, and student profiles to provide data-driven insights and recommendations.',

  mentor: 'You are a supportive career mentor. You help students navigate their career journey with empathy, practical advice, and motivation.',
};
