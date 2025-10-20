import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, BookOpen, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">CareerGuide AI</span>
            </div>
            <div className="flex gap-4">
              <Link href="/admin">
                <Button variant="ghost">Admin</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Discover Your Perfect Career Path
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            AI-powered career guidance platform that helps students discover careers aligned with their aptitudes and market demand.
          </p>
          <Link href="/start">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>
                Take our aptitude quiz to receive career recommendations tailored to your unique strengths and interests.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Skill Roadmaps</CardTitle>
              <CardDescription>
                Get clear learning pathways with curated resources to acquire the skills needed for your dream career.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>
                Make informed decisions based on job market demand, salary expectations, and growth opportunities.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <CardTitle>Take the Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Answer questions about your interests, skills, and preferences. Takes about 5-10 minutes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <CardTitle>Get Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Our AI analyzes your responses and matches you with careers that fit your profile.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <CardTitle>Start Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Access curated learning resources and start building the skills you need.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">
          <p>&copy; 2025 CareerGuide AI. Empowering students to make informed career decisions.</p>
        </div>
      </footer>
    </div>
  );
}
