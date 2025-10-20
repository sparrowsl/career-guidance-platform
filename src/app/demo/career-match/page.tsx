'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CareerRecommendation } from '@/lib/types';

export default function CareerMatchDemoPage() {
  const [studentName, setStudentName] = useState('Alex Johnson');
  const [analytical, setAnalytical] = useState(4.5);
  const [creative, setCreative] = useState(3.2);
  const [technical, setTechnical] = useState(4.8);
  const [interpersonal, setInterpersonal] = useState(3.0);

  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<any>(null);

  // Sample careers data
  const sampleCareers = [
    {
      id: 'career_1',
      title: 'Data Scientist',
      category: 'Technical',
      description: 'Analyze complex data sets to extract insights and build predictive models',
      demandLevel: 'High',
      averageSalary: '$120,000',
      jobGrowthRate: '15%',
    },
    {
      id: 'career_2',
      title: 'Software Engineer',
      category: 'Technical',
      description: 'Design, develop, and maintain software applications',
      demandLevel: 'Very High',
      averageSalary: '$110,000',
      jobGrowthRate: '22%',
    },
    {
      id: 'career_3',
      title: 'UX Designer',
      category: 'Creative',
      description: 'Create user-centered designs for digital products',
      demandLevel: 'High',
      averageSalary: '$95,000',
      jobGrowthRate: '18%',
    },
    {
      id: 'career_4',
      title: 'Product Manager',
      category: 'Interpersonal',
      description: 'Lead product strategy and coordinate cross-functional teams',
      demandLevel: 'High',
      averageSalary: '$125,000',
      jobGrowthRate: '12%',
    },
    {
      id: 'career_5',
      title: 'Business Analyst',
      category: 'Analytical',
      description: 'Analyze business processes and recommend improvements',
      demandLevel: 'Medium',
      averageSalary: '$85,000',
      jobGrowthRate: '10%',
    },
  ];

  const handleGenerateRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    setUsage(null);

    try {
      const response = await fetch('/api/ai/career-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          categoryScores: {
            analytical,
            creative,
            technical,
            interpersonal,
          },
          careers: sampleCareers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recommendations');
      }

      const data = await response.json();
      setRecommendations(data.data.recommendations);
      setUsage(data.usage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/demo"
            className="text-green-600 hover:text-green-800 mb-4 inline-block"
          >
            ← Back to Demos
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Structured Career Match Demo
          </h1>
          <p className="text-slate-600">
            Type-safe career recommendations using Vercel AI SDK's generateObject with Zod schemas
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Features Demonstrated:</h2>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Structured output using <code className="bg-slate-100 px-2 py-1 rounded">generateObject()</code></span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Type-safe responses with Zod schema validation</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Complex data structures (nested objects and arrays)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Token usage tracking and optimization</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Career analyst AI personality</span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Student Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Student Profile</h3>
              <div>
                <Label htmlFor="name">Student Name</Label>
                <Input
                  id="name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </Card>

            {/* Aptitude Scores */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Aptitude Scores (0-5)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Analytical</Label>
                    <span className="text-sm font-medium">{analytical.toFixed(1)}</span>
                  </div>
                  <Input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={analytical}
                    onChange={(e) => setAnalytical(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Creative</Label>
                    <span className="text-sm font-medium">{creative.toFixed(1)}</span>
                  </div>
                  <Input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={creative}
                    onChange={(e) => setCreative(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Technical</Label>
                    <span className="text-sm font-medium">{technical.toFixed(1)}</span>
                  </div>
                  <Input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={technical}
                    onChange={(e) => setTechnical(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label>Interpersonal</Label>
                    <span className="text-sm font-medium">{interpersonal.toFixed(1)}</span>
                  </div>
                  <Input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={interpersonal}
                    onChange={(e) => setInterpersonal(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateRecommendations}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Generating Recommendations...' : 'Generate Career Matches'}
            </Button>

            {/* Available Careers */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Available Careers ({sampleCareers.length})</h3>
              <div className="space-y-2 text-sm">
                {sampleCareers.map((career) => (
                  <div key={career.id} className="border-b pb-2">
                    <div className="font-medium">{career.title}</div>
                    <div className="text-slate-600 text-xs">{career.category} • {career.demandLevel} demand</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                Error: {error}
              </div>
            )}

            {usage && (
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Token Usage</h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <div>Prompt: {usage.promptTokens} tokens</div>
                  <div>Completion: {usage.completionTokens} tokens</div>
                  <div className="font-medium">Total: {usage.totalTokens} tokens</div>
                </div>
              </Card>
            )}

            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Top Career Matches</h3>
                {recommendations.map((rec, index) => (
                  <Card key={rec.careerId} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-700">#{index + 1}</span>
                          <h4 className="text-lg font-semibold">
                            {sampleCareers.find(c => c.id === rec.careerId)?.title || rec.careerId}
                          </h4>
                        </div>
                      </div>
                      <Badge className="text-lg px-3 py-1">
                        {rec.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <Progress value={rec.matchScore} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm text-slate-700 mb-2">Why This Career:</h5>
                        <p className="text-sm text-slate-600">{rec.reasoning}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm text-slate-700 mb-2">Your Key Strengths:</h5>
                        <div className="flex flex-wrap gap-2">
                          {rec.keyStrengths.map((strength, i) => (
                            <Badge key={i} variant="secondary" className="bg-green-100 text-green-800">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm text-slate-700 mb-2">Areas to Develop:</h5>
                        <div className="flex flex-wrap gap-2">
                          {rec.developmentAreas.map((area, i) => (
                            <Badge key={i} variant="outline" className="border-orange-300 text-orange-700">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && recommendations.length === 0 && !error && (
              <Card className="p-12 text-center">
                <div className="text-slate-400 text-lg">
                  Click "Generate Career Matches" to see AI-powered recommendations
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Code Reference */}
        <div className="mt-8 bg-slate-800 text-slate-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Implementation:</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`// API Route: src/app/api/ai/career-match/route.ts
import { generateObject } from 'ai';
import { z } from 'zod';

const schema = z.object({
  recommendations: z.array(
    z.object({
      careerId: z.string(),
      matchScore: z.number().min(0).max(100),
      reasoning: z.string(),
      keyStrengths: z.array(z.string()),
      developmentAreas: z.array(z.string()),
    })
  ),
});

const result = await generateObject({
  model: models.smart,
  schema,
  prompt,
});

// result.object is fully typed!
return result.object.recommendations;`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
