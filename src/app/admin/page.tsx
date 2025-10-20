"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NavigationHeader } from "@/components/navigation-header";
import {
  Users,
  FileQuestion,
  Briefcase,
  BookOpen,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Award
} from "lucide-react";
import { AdminStats } from "@/lib/types";

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
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
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "Failed to load admin panel"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <NavigationHeader userName="Admin" showLogout={true} userType="admin" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">
            Manage quiz questions, careers, and view student statistics.
          </p>
        </div>

        {/* Stats Cards - Row 1 */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentors</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMentors}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active mentors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentorships</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMentorshipRequests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total requests
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Set</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGoals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Student goals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards - Row 2 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Careers</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCareers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                In database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Questions</CardTitle>
              <FileQuestion className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuestions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSkills}</div>
              <p className="text-xs text-muted-foreground mt-1">
                In database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress Tracked</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Learning activities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship Overview</TabsTrigger>
            <TabsTrigger value="data">Database Status</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
                <CardDescription>
                  Students who have recently signed up for career guidance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentStudents.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-slate-600">{student.email}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Joined {new Date(student.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xl font-bold text-blue-600">
                                {student._count.responses}
                              </p>
                              <p className="text-xs text-slate-600">Responses</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-green-600">
                                {student._count.recommendations}
                              </p>
                              <p className="text-xs text-slate-600">Recommendations</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-purple-600">
                                {student._count.goals}
                              </p>
                              <p className="text-xs text-slate-600">Goals</p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-orange-600">
                                {student._count.progress}
                              </p>
                              <p className="text-xs text-slate-600">Progress</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-center py-8">No students yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Mentors</CardTitle>
                <CardDescription>
                  Mentors who have recently registered to help students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.recentMentors && stats.recentMentors.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-semibold">{mentor.name}</h4>
                              <p className="text-sm text-slate-600">{mentor.title}</p>
                              {mentor.company && (
                                <p className="text-sm text-slate-500">at {mentor.company}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Badge variant="outline">{mentor.career.title}</Badge>
                            <p className="text-xs text-slate-500">
                              Joined {new Date(mentor.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">
                            {mentor._count.mentorshipRequests}
                          </p>
                          <p className="text-xs text-slate-600">Requests</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-center py-8">No mentors yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentorship" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mentorship Requests by Status</CardTitle>
                  <CardDescription>
                    Breakdown of mentorship request statuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stats.mentorshipStats && stats.mentorshipStats.length > 0 ? (
                    stats.mentorshipStats.map((stat) => (
                      <div key={stat.status} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={stat.status === 'accepted' ? 'default' : stat.status === 'pending' ? 'secondary' : 'outline'} className="capitalize">
                            {stat.status}
                          </Badge>
                          <span className="text-sm text-slate-600">requests</span>
                        </div>
                        <span className="text-2xl font-bold">{stat._count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-center py-4">No mentorship data yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>
                    Student goals by status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stats.goalStats && stats.goalStats.length > 0 ? (
                    stats.goalStats.map((stat) => (
                      <div key={stat.status} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={stat.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                            {stat.status}
                          </Badge>
                          <span className="text-sm text-slate-600">goals</span>
                        </div>
                        <span className="text-2xl font-bold">{stat._count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-center py-4">No goals data yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>
                    Student learning activities by status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stats.progressStats && stats.progressStats.length > 0 ? (
                    stats.progressStats.map((stat) => (
                      <div key={stat.status} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={stat.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                            {stat.status}
                          </Badge>
                          <span className="text-sm text-slate-600">activities</span>
                        </div>
                        <span className="text-2xl font-bold">{stat._count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-600 text-center py-4">No progress data yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Summary</CardTitle>
                  <CardDescription>
                    Quick overview of platform activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-slate-600">Learning Resources</span>
                    <span className="text-xl font-bold">{stats.totalResources}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-slate-600">Active Students</span>
                    <span className="text-xl font-bold">{stats.totalStudents}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-slate-600">Active Mentors</span>
                    <span className="text-xl font-bold">{stats.totalMentors}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
                <CardDescription>
                  Overview of data in the system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Quiz Questions</h4>
                      <p className="text-sm text-slate-600">
                        {stats.totalQuestions > 0
                          ? "Quiz is ready for students"
                          : "No questions added yet"}
                      </p>
                    </div>
                    <Badge variant={stats.totalQuestions > 0 ? "default" : "secondary"}>
                      {stats.totalQuestions > 0 ? "Ready" : "Not Ready"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Career Database</h4>
                      <p className="text-sm text-slate-600">
                        {stats.totalCareers > 0
                          ? `${stats.totalCareers} careers available`
                          : "No careers added yet"}
                      </p>
                    </div>
                    <Badge variant={stats.totalCareers > 0 ? "default" : "secondary"}>
                      {stats.totalCareers > 0 ? "Ready" : "Not Ready"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Skills & Resources</h4>
                      <p className="text-sm text-slate-600">
                        {stats.totalSkills > 0
                          ? `${stats.totalSkills} skills in database`
                          : "No skills added yet"}
                      </p>
                    </div>
                    <Badge variant={stats.totalSkills > 0 ? "default" : "secondary"}>
                      {stats.totalSkills > 0 ? "Ready" : "Not Ready"}
                    </Badge>
                  </div>

                  {(stats.totalQuestions === 0 || stats.totalCareers === 0) && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> The database needs to be seeded with initial data.
                        Run the seed script to populate quiz questions, careers, and skills.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
