"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink } from "lucide-react";
import { NavigationHeader } from "@/components/navigation-header";
import { Career, Skill, LearningResource, Recommendation } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [studentName, setStudentName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      router.push("/start");
      return;
    }

    fetchRecommendations(studentId);
  }, [router]);

  const fetchRecommendations = async (studentId: string) => {
    try {
      const response = await fetch(`/api/recommendations?studentId=${studentId}`);
      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const data = await response.json();
      setRecommendations(data.recommendations);
      setStudentName(data.studentName);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>No Recommendations Found</CardTitle>
            <CardDescription>
              {error || "Please complete the quiz first to get personalized career recommendations."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/start">
              <Button>Take Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <NavigationHeader userName={studentName} userType="student" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Career Recommendations</h1>
          <p className="text-slate-600">
            Based on your aptitude quiz results, here are careers that match your profile.
          </p>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <Card key={rec.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-blue-600">#{index + 1}</span>
                      <CardTitle className="text-2xl">{rec.career.title}</CardTitle>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary" className="capitalize">
                        {rec.career.category}
                      </Badge>
                      <Badge
                        variant={rec.career.demandLevel === "high" ? "default" : "outline"}
                      >
                        {rec.career.demandLevel} demand
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {Math.round(rec.matchScore)}%
                    </div>
                    <div className="text-sm text-slate-600">Match</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Required Skills</TabsTrigger>
                    <TabsTrigger value="resources">Learning Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-slate-600">{rec.career.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Why This Career?</h4>
                      <p className="text-slate-600">{rec.reasoning}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {rec.career.averageSalary && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Average Salary</h4>
                          <p className="text-slate-600">{rec.career.averageSalary}</p>
                        </div>
                      )}
                      {rec.career.jobGrowthRate && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Job Growth</h4>
                          <p className="text-slate-600">{rec.career.jobGrowthRate}</p>
                        </div>
                      )}
                      {rec.career.requiredEducation && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Education</h4>
                          <p className="text-slate-600">{rec.career.requiredEducation}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-3">
                    {rec.career.skills.length > 0 ? (
                      rec.career.skills.map((careerSkill) => (
                        <div key={careerSkill.skill.id} className="border-l-4 border-blue-600 pl-4 py-2">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{careerSkill.skill.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {careerSkill.importance}
                            </Badge>
                          </div>
                          {careerSkill.skill.description && (
                            <p className="text-sm text-slate-600">{careerSkill.skill.description}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-600">No specific skills listed yet.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-3">
                    {rec.career.skills.some(cs => cs.skill.resources.length > 0) ? (
                      rec.career.skills.map((careerSkill) =>
                        careerSkill.skill.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border rounded-lg p-4 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <BookOpen className="h-4 w-4 text-blue-600" />
                                  <h4 className="font-semibold">{resource.title}</h4>
                                  {resource.isFree && (
                                    <Badge variant="secondary" className="text-xs">Free</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-slate-600">
                                  {resource.provider} • {resource.type}
                                </p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-slate-400" />
                            </div>
                          </a>
                        ))
                      )
                    ) : (
                      <p className="text-slate-600">No learning resources available yet.</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/start">
            <Button variant="outline">Retake Quiz</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
