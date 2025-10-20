import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DemoIndexPage() {
  const demos = [
    {
      title: 'AI Chat',
      description: 'Interactive career counseling chat with real-time streaming responses',
      href: '/demo/chat',
      icon: '💬',
      color: 'from-blue-500 to-indigo-600',
      features: [
        'useChat hook',
        'streamText()',
        'Message history',
        'Real-time streaming',
      ],
      difficulty: 'Beginner',
    },
    {
      title: 'Career Insights',
      description: 'Generate personalized career advice with streaming AI responses',
      href: '/demo/insights',
      icon: '💡',
      color: 'from-purple-500 to-pink-600',
      features: [
        'useCompletion hook',
        'streamText()',
        'Dynamic parameters',
        'Single-message streaming',
      ],
      difficulty: 'Beginner',
    },
    {
      title: 'Structured Career Match',
      description: 'Type-safe career recommendations with Zod schema validation',
      href: '/demo/career-match',
      icon: '🎯',
      color: 'from-green-500 to-teal-600',
      features: [
        'generateObject()',
        'Zod schemas',
        'Type-safe responses',
        'Token usage tracking',
      ],
      difficulty: 'Intermediate',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge className="bg-purple-500 text-white px-4 py-2 text-sm">
              Vercel AI SDK Integration
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI SDK Demo Gallery
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Explore interactive examples showcasing the power of Vercel AI SDK in your career guidance platform
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                ← Back to Home
              </Button>
            </Link>
            <Link href="/AI-SDK-GUIDE.md" target="_blank">
              <Button className="bg-purple-600 hover:bg-purple-700">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {demos.map((demo) => (
            <Link key={demo.href} href={demo.href}>
              <Card className="h-full p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-slate-200 hover:border-purple-400 cursor-pointer bg-white">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`text-6xl mb-4 bg-gradient-to-r ${demo.color} bg-clip-text text-transparent`}>
                    {demo.icon}
                  </div>

                  {/* Title & Badge */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-slate-800">
                        {demo.title}
                      </h2>
                      <Badge variant="outline" className="text-xs">
                        {demo.difficulty}
                      </Badge>
                    </div>
                    <p className="text-slate-600">
                      {demo.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 mb-2">
                      Key Features:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {demo.features.map((feature, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-slate-100"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className={`w-full bg-gradient-to-r ${demo.color}`}>
                    Try Demo →
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Features Overview */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-white mb-2">Streaming</h3>
              <p className="text-sm text-slate-300">
                Real-time AI responses with streamText()
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-semibold text-white mb-2">React Hooks</h3>
              <p className="text-sm text-slate-300">
                useChat and useCompletion for state management
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-white mb-2">Type Safety</h3>
              <p className="text-sm text-slate-300">
                Zod schemas for validated responses
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-semibold text-white mb-2">Production Ready</h3>
              <p className="text-sm text-slate-300">
                Error handling and loading states
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-12 bg-slate-800 rounded-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Set up your API key</h3>
                <p className="text-slate-400 text-sm">
                  Add your OpenAI API key to <code className="bg-slate-700 px-2 py-1 rounded">.env</code> file
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Start the dev server</h3>
                <code className="text-green-400 text-sm">npm run dev</code>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Explore the demos</h3>
                <p className="text-slate-400 text-sm">
                  Click on any demo card above to see the AI SDK in action
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 text-center">
          <h3 className="text-slate-400 text-sm mb-4">Built with</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-white/10 text-white border-white/20">
              Next.js 15
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              Vercel AI SDK
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              OpenAI GPT-4o
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              TypeScript
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              Tailwind CSS
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20">
              Zod
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
