# Vercel AI SDK Integration Guide

This guide shows you how to use the Vercel AI SDK in your career guidance platform.

## 🚀 What's Included

### 1. Core Configuration (`src/lib/ai.ts`)
- OpenAI provider setup
- Multiple model configurations (fast, smart, balanced)
- Reusable system prompts for different use cases

### 2. API Routes

#### `/api/ai/chat` - Streaming Chat
Interactive chat endpoint using `streamText()`. Works seamlessly with the `useChat` hook.

**Features:**
- Real-time streaming responses
- Compatible with `useChat` hook
- Career counselor personality

**Example request:**
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "What career paths are good for someone with strong analytical skills?"}
    ]
  }'
```

#### `/api/ai/career-match` - Structured Career Recommendations
Uses `generateObject()` to return type-safe, structured career recommendations based on student aptitude scores.

**Features:**
- Zod schema validation
- Structured JSON output
- Match scores, reasoning, strengths, and development areas

**Example request:**
```bash
curl -X POST http://localhost:3000/api/ai/career-match \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "Alice",
    "categoryScores": {
      "analytical": 4.5,
      "creative": 3.2,
      "technical": 4.8,
      "interpersonal": 3.0
    },
    "careers": [
      {
        "id": "career_1",
        "title": "Data Scientist",
        "category": "Technical",
        "description": "Analyze complex data sets",
        "demandLevel": "High",
        "averageSalary": "$120,000",
        "jobGrowthRate": "15%"
      }
    ]
  }'
```

**Example response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "careerId": "career_1",
        "matchScore": 92,
        "reasoning": "Your exceptional technical and analytical skills...",
        "keyStrengths": ["Data analysis", "Problem solving", "Technical skills"],
        "developmentAreas": ["Communication", "Leadership", "Business acumen"]
      }
    ]
  },
  "usage": {
    "promptTokens": 450,
    "completionTokens": 320,
    "totalTokens": 770
  }
}
```

#### `/api/ai/insights` - Streaming Career Insights
Streams personalized career insights using `streamText()`.

**Features:**
- Streaming response
- Actionable advice
- Encouraging tone

**Example request:**
```bash
curl -X POST http://localhost:3000/api/ai/insights \
  -H "Content-Type: application/json" \
  -d '{
    "careerTitle": "Software Engineer",
    "studentStrengths": ["Problem solving", "Logical thinking", "Coding"],
    "industryTrends": "High demand for cloud and AI skills"
  }'
```

### 3. React Components

#### `<CareerChat />` - Interactive Chat Interface
Uses the `useChat` hook for real-time conversational AI.

**Usage:**
```tsx
import { CareerChat } from '@/components/career-chat';

export default function ChatPage() {
  return <CareerChat />;
}
```

**Features:**
- Real-time streaming messages
- Message history
- Loading states
- Error handling
- Responsive UI

#### `<CareerInsights />` - Streaming Insights
Uses the `useCompletion` hook for single-message streaming responses.

**Usage:**
```tsx
import { CareerInsights } from '@/components/career-insights';

export default function CareerPage() {
  return (
    <CareerInsights
      careerTitle="Data Scientist"
      studentStrengths={['Analytics', 'Python', 'Statistics']}
      industryTrends="AI and ML dominating the field"
    />
  );
}
```

## 🎯 Key Concepts

### Streaming vs. Non-Streaming

**Streaming (`streamText`):**
- Use for chat interfaces
- Better user experience (see response as it's generated)
- Works with `useChat` and `useCompletion` hooks
- Returns `toDataStreamResponse()`

**Non-Streaming (`generateText`, `generateObject`):**
- Use when you need the complete response
- Better for structured data
- Returns complete object/text when done

### Type Safety with `generateObject`

The AI SDK uses Zod schemas to ensure type-safe responses:

```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const schema = z.object({
  recommendations: z.array(
    z.object({
      careerId: z.string(),
      matchScore: z.number().min(0).max(100),
      reasoning: z.string(),
    })
  ),
});

const result = await generateObject({
  model: models.smart,
  schema,
  prompt: 'Generate recommendations...',
});

// result.object is fully typed!
console.log(result.object.recommendations);
```

### React Hooks

**`useChat`** - For multi-message conversations
```typescript
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  api: '/api/ai/chat',
});
```

**`useCompletion`** - For single-message responses
```typescript
const { completion, complete, isLoading } = useCompletion({
  api: '/api/ai/insights',
});
```

## 🔧 Configuration

### Environment Variables
Make sure your `.env` file has:
```
OPENAI_API_KEY=your-api-key-here
```

### Model Selection
Choose models based on your needs:
- `models.fast` (gpt-4o-mini) - Quick responses, lower cost
- `models.smart` (gpt-4o) - Complex reasoning, higher accuracy
- `models.balanced` (gpt-4o-mini) - Default for most tasks

### System Prompts
Customize in `src/lib/ai.ts`:
```typescript
export const systemPrompts = {
  careerCounselor: 'You are a professional career counselor...',
  careerAnalyst: 'You are a career analyst...',
  mentor: 'You are a supportive career mentor...',
};
```

## 📚 Additional Features

### Multi-Modal Support
The AI SDK supports images and PDFs:
```typescript
const result = await generateText({
  model: models.smart,
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Analyze this resume' },
        { type: 'image', image: resumeImageURL },
      ],
    },
  ],
});
```

### Tool Calling
Define tools for the AI to use:
```typescript
import { tool } from 'ai';
import { z } from 'zod';

const result = await generateText({
  model: models.smart,
  tools: {
    getCareerData: tool({
      description: 'Get career information from database',
      parameters: z.object({
        careerId: z.string(),
      }),
      execute: async ({ careerId }) => {
        // Fetch from database
        return { career: 'Data Scientist', salary: '$120k' };
      },
    }),
  },
  toolChoice: 'auto',
  prompt: 'Tell me about being a data scientist',
});
```

### Embeddings for RAG
Create embeddings for semantic search:
```typescript
import { embedMany } from 'ai';
import { openai } from '@/lib/ai';

const { embeddings } = await embedMany({
  model: openai.embedding('text-embedding-3-small'),
  values: [
    'Career description 1',
    'Career description 2',
  ],
});

// Store embeddings in a vector database
```

## 🔗 Useful Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [API Reference](https://sdk.vercel.ai/docs/reference)
- [Examples](https://sdk.vercel.ai/examples)

## 🎨 Example: Upgrading Existing OpenAI Code

**Before (Traditional OpenAI):**
```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello' }],
});
const response = completion.choices[0].message.content;
```

**After (Vercel AI SDK with Streaming):**
```typescript
const result = streamText({
  model: models.fast,
  prompt: 'Hello',
});
return result.toDataStreamResponse();
```

**After (Vercel AI SDK with Structured Output):**
```typescript
const result = await generateObject({
  model: models.fast,
  schema: mySchema,
  prompt: 'Hello',
});
console.log(result.object); // Type-safe!
```
