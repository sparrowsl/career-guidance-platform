"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, TrendingUp, CheckCircle, Clock, Plus, Trash2, Target } from "lucide-react";
import { NavigationHeader } from "@/components/navigation-header";
import { StudentProgress, Goal } from "@/lib/types";

export default function ProgressPage() {
  const router = useRouter();
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (!id) {
      router.push("/start");
      return;
    }
    setStudentId(id);

    // Fetch progress
    fetch(`/api/progress?studentId=${id}`)
      .then((res) => res.json())
      .then((data) => setProgress(data))
      .catch((err) => console.error("Error fetching progress:", err));

    // Fetch goals
    fetch(`/api/goals?studentId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching goals:", err);
        setLoading(false);
      });
  }, [router]);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId) return;

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          ...newGoal,
        }),
      });

      if (res.ok) {
        const goal = await res.json();
        setGoals([goal, ...goals]);
        setNewGoal({ title: "", description: "", targetDate: "" });
        setShowGoalForm(false);
      } else {
        alert("Failed to create goal");
      }
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Failed to create goal");
    }
  };

  const handleToggleGoal = async (goalId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "completed" : "active";

    try {
      const res = await fetch(`/api/goals/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedGoal = await res.json();
        setGoals(goals.map((g) => (g.id === goalId ? updatedGoal : g)));
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm("Are you sure you want to delete this goal?")) return;

    try {
      const res = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGoals(goals.filter((g) => g.id !== goalId));
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const completedProgress = progress.filter((p) => p.status === "completed");
  const inProgressItems = progress.filter((p) => p.status === "in_progress" || p.status === "started");
  const activeGoals = goals.filter((g) => g.status === "active");
  const completedGoals = goals.filter((g) => g.status === "completed");

  const overallProgress = progress.length > 0
    ? Math.round((completedProgress.length / progress.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationHeader userName="User" userType="student" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Learning Progress
          </h1>
          <p className="text-gray-600">
            Track your learning journey and achieve your career goals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-2xl font-bold">{overallProgress}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{completedProgress.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{inProgressItems.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="progress">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6 mt-6">
            {progress.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Learning Progress Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start tracking your progress by exploring learning resources in your dashboard
                </p>
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {progress.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">
                            {item.resource.title}
                          </h3>
                          <div className="flex gap-2 text-sm text-gray-600">
                            <Badge variant="outline">{item.resource.skill.name}</Badge>
                            <Badge variant="secondary">{item.resource.type}</Badge>
                            {item.resource.provider && (
                              <span>{item.resource.provider}</span>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold">{item.progressPercent}%</span>
                        </div>
                        <Progress value={item.progressPercent} />
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={item.resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            Continue Learning
                          </Button>
                        </a>
                      </div>

                      <div className="text-xs text-gray-500">
                        Started: {new Date(item.startedAt).toLocaleDateString()}
                        {item.completedAt && (
                          <> • Completed: {new Date(item.completedAt).toLocaleDateString()}</>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="goals" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Career Goals</h2>
              <Button onClick={() => setShowGoalForm(!showGoalForm)}>
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </div>

            {showGoalForm && (
              <Card className="p-6">
                <form onSubmit={handleCreateGoal} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Goal Title *</Label>
                    <Input
                      id="title"
                      required
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                      placeholder="e.g., Complete Python Course"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={newGoal.description}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, description: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Add details about your goal..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, targetDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Create Goal</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowGoalForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {goals.length === 0 ? (
              <Card className="p-12 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Goals Yet</h3>
                <p className="text-gray-600 mb-4">
                  Set career goals to track your progress and stay motivated
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Active Goals</h3>
                {activeGoals.map((goal) => (
                  <Card key={goal.id} className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold">{goal.title}</h4>
                        {goal.description && (
                          <p className="text-gray-600 mt-1">{goal.description}</p>
                        )}
                        {goal.targetDate && (
                          <p className="text-sm text-gray-500 mt-2">
                            Target: {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleToggleGoal(goal.id, goal.status)}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {completedGoals.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mt-8">Completed Goals</h3>
                    {completedGoals.map((goal) => (
                      <Card key={goal.id} className="p-6 bg-green-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <h4 className="text-lg font-semibold line-through text-gray-600">
                                {goal.title}
                              </h4>
                            </div>
                            {goal.description && (
                              <p className="text-gray-600 ml-7">{goal.description}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
