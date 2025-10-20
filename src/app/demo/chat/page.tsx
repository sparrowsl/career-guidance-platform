'use client';

import { CareerChat } from '@/components/career-chat';
import Link from 'next/link';

export default function ChatDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/demo"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Demos
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            AI Chat Demo
          </h1>
          <p className="text-slate-600">
            Interactive career counseling chat powered by Vercel AI SDK's useChat hook
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Features Demonstrated:</h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Real-time streaming responses using <code className="bg-slate-100 px-2 py-1 rounded">streamText()</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>React <code className="bg-slate-100 px-2 py-1 rounded">useChat</code> hook for state management</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Message history and conversation context</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Loading states and error handling</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Career counselor AI personality</span>
            </li>
          </ul>
        </div>

        {/* Demo Component */}
        <CareerChat />

        {/* Try These Prompts */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Try these prompts:
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• "What careers are good for someone with strong analytical skills?"</li>
            <li>• "I enjoy creative work but also like working with data. Any suggestions?"</li>
            <li>• "What skills should I learn to become a data scientist?"</li>
            <li>• "How can I transition from marketing to UX design?"</li>
            <li>• "What's the job outlook for software engineers?"</li>
          </ul>
        </div>

        {/* Code Reference */}
        <div className="mt-8 bg-slate-800 text-slate-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Implementation:</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`// Component: src/components/career-chat.tsx
import { useChat } from 'ai/react';

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/ai/chat',
});

// API Route: src/app/api/ai/chat/route.ts
import { streamText } from 'ai';

const result = streamText({
  model: models.fast,
  system: systemPrompts.careerCounselor,
  messages,
});

return result.toDataStreamResponse();`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
