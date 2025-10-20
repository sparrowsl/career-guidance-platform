'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CareerInsightsProps {
  careerTitle: string;
  studentStrengths?: string[];
  industryTrends?: string;
}

/**
 * Career insights component with streaming AI responses
 *
 * Uses useCompletion hook for single-message streaming
 */
export function CareerInsights({ careerTitle, studentStrengths, industryTrends }: CareerInsightsProps) {
  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/ai/insights',
  });

  const handleGenerateInsights = async () => {
    await complete('', {
      body: {
        careerTitle,
        studentStrengths,
        industryTrends,
      },
    });
  };

  return (
    <Card className="w-full p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">AI Career Insights</h3>
          <Button onClick={handleGenerateInsights} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Insights'}
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm">
            Error: {error.message}
          </div>
        )}

        {completion && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{completion}</p>
          </div>
        )}

        {!completion && !isLoading && (
          <div className="text-slate-500 text-center py-8">
            Click "Generate Insights" to get personalized career advice
          </div>
        )}
      </div>
    </Card>
  );
}
