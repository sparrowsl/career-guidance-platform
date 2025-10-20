'use client';

import { CareerInsights } from '@/components/career-insights';
import Link from 'next/link';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function InsightsDemoPage() {
  const [careerTitle, setCareerTitle] = useState('Software Engineer');
  const [strengths, setStrengths] = useState('Problem solving, Coding, Logical thinking');
  const [trends, setTrends] = useState('High demand for cloud and AI skills');

  const strengthsArray = strengths.split(',').map(s => s.trim()).filter(s => s);

  // Preset examples
  const presets = [
    {
      name: 'Software Engineer',
      career: 'Software Engineer',
      strengths: 'Problem solving, Coding, Logical thinking',
      trends: 'High demand for cloud and AI skills',
    },
    {
      name: 'Data Scientist',
      career: 'Data Scientist',
      strengths: 'Statistics, Python, Data analysis, Machine learning',
      trends: 'AI and ML dominating the field, strong job growth',
    },
    {
      name: 'UX Designer',
      career: 'UX Designer',
      strengths: 'Creativity, Empathy, Visual design, User research',
      trends: 'Growing emphasis on accessibility and inclusive design',
    },
    {
      name: 'Product Manager',
      career: 'Product Manager',
      strengths: 'Communication, Strategic thinking, Leadership',
      trends: 'Tech companies seeking PM/tech hybrid roles',
    },
  ];

  const loadPreset = (preset: typeof presets[0]) => {
    setCareerTitle(preset.career);
    setStrengths(preset.strengths);
    setTrends(preset.trends);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/demo"
            className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
          >
            ← Back to Demos
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Career Insights Demo
          </h1>
          <p className="text-slate-600">
            Streaming personalized career advice using Vercel AI SDK's useCompletion hook
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Features Demonstrated:</h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Streaming insights using <code className="bg-slate-100 px-2 py-1 rounded">streamText()</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>React <code className="bg-slate-100 px-2 py-1 rounded">useCompletion</code> hook for single-message streaming</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Personalized advice based on student profile</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Dynamic parameter customization</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Career mentor AI personality</span>
            </li>
          </ul>
        </div>

        {/* Preset Examples */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Quick Presets:</h3>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => loadPreset(preset)}
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Configuration */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Customize Parameters:</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="career">Career Title</Label>
              <Input
                id="career"
                value={careerTitle}
                onChange={(e) => setCareerTitle(e.target.value)}
                placeholder="e.g., Data Scientist"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="strengths">Student Strengths (comma-separated)</Label>
              <Input
                id="strengths"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="e.g., Problem solving, Coding"
                className="mt-1"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {strengthsArray.map((strength, i) => (
                  <Badge key={i} variant="secondary">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="trends">Industry Trends</Label>
              <Input
                id="trends"
                value={trends}
                onChange={(e) => setTrends(e.target.value)}
                placeholder="e.g., High demand for AI skills"
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Demo Component */}
        <CareerInsights
          careerTitle={careerTitle}
          studentStrengths={strengthsArray}
          industryTrends={trends}
        />

        {/* Code Reference */}
        <div className="mt-8 bg-slate-800 text-slate-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Implementation:</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`// Component: src/components/career-insights.tsx
import { useCompletion } from 'ai/react';

const { completion, complete, isLoading } = useCompletion({
  api: '/api/ai/insights',
});

await complete('', {
  body: { careerTitle, studentStrengths, industryTrends }
});

// API Route: src/app/api/ai/insights/route.ts
import { streamText } from 'ai';

const result = streamText({
  model: models.fast,
  system: systemPrompts.mentor,
  prompt,
});

return result.toDataStreamResponse();`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
