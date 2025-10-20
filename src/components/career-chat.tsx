'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

/**
 * Interactive career chat component using Vercel AI SDK's useChat hook
 *
 * Features:
 * - Real-time streaming responses
 * - Message history management
 * - Loading states
 * - Error handling
 */
export function CareerChat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/ai/chat' }),
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Hello! I\'m your AI career counselor. I can help you explore career paths, understand your strengths, and plan your professional journey. What would you like to know?',
          },
        ],
      },
    ],
  });

  const isLoading = status === 'streaming';

  return (
    <Card className="w-full max-w-2xl mx-auto p-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Career Chat Assistant</h2>

        {/* Messages */}
        <div className="flex flex-col gap-3 min-h-[400px] max-h-[500px] overflow-y-auto p-4 bg-slate-50 rounded-lg">
          {messages.map((message) => {
            const isUser = (message.role as string) === 'user';
            return (
              <div
                key={message.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-slate-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.parts
                      .filter((part) => part.type === 'text')
                      .map((part: any) => part.text)
                      .join('')}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            Error: {error.message}
          </div>
        )}

        {/* Input form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !isLoading) {
              sendMessage({ text: input });
              setInput('');
            }
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about careers, skills, or your next steps..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}
