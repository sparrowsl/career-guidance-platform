"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, TrendingDown, Minus, Briefcase, DollarSign } from "lucide-react";
import { Career, MarketInsight } from "@/lib/types";

export default function MarketInsightsPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch careers
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
        if (data.length > 0) {
          setSelectedCareer(data[0].id);
          fetchInsights(data[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching careers:", err);
        setLoading(false);
      });
  }, []);

  const fetchInsights = (careerId: string) => {
    fetch(`/api/market-insights?careerId=${careerId}`)
      .then((res) => res.json())
      .then((data) => setInsights(data))
      .catch((err) => console.error("Error fetching insights:", err));
  };

  const handleCareerChange = (careerId: string) => {
    setSelectedCareer(careerId);
    fetchInsights(careerId);
  };

  const selectedCareerData = careers.find((c) => c.id === selectedCareer);

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (trend === "decreasing") return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-600" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-green-600";
    if (trend === "decreasing") return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">CareerGuide AI</span>
            </Link>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/mentors">
                <Button variant="outline">Mentors</Button>
              </Link>
              <Link href="/progress">
                <Button variant="outline">Progress</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Labor Market Insights
          </h1>
          <p className="text-gray-600">
            Explore job market trends and demand for different career paths
          </p>
        </div>

        {/* Career Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select a Career Field</h2>
          <div className="flex flex-wrap gap-3">
            {careers.map((career) => (
              <Button
                key={career.id}
                variant={selectedCareer === career.id ? "default" : "outline"}
                onClick={() => handleCareerChange(career.id)}
              >
                {career.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Insights Content */}
        {selectedCareerData && (
          <div className="space-y-6">
            {/* Career Overview */}
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCareerData.title}</h2>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedCareerData.category}</Badge>
                    <Badge variant={selectedCareerData.demandLevel === "high" ? "default" : "outline"}>
                      {selectedCareerData.demandLevel} demand
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {insights.length === 0 ? (
              <Card className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Market Data Available</h3>
                <p className="text-gray-600">
                  Market insights for this career are currently being collected
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Latest Trends */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Latest Trends</h3>
                  <div className="space-y-4">
                    {insights.slice(0, 3).map((insight) => {
                      const topSkills = JSON.parse(insight.topSkills);
                      return (
                        <div key={insight.month} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">
                              {new Date(insight.month + "-01").toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <div className={`flex items-center gap-1 ${getTrendColor(insight.demandTrend)}`}>
                              {getTrendIcon(insight.demandTrend)}
                              <span className="text-sm font-medium capitalize">
                                {insight.demandTrend}
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Job Postings</p>
                              <p className="font-semibold">{insight.jobPostings.toLocaleString()}</p>
                            </div>
                            {insight.avgSalary && (
                              <div>
                                <p className="text-gray-600">Avg Salary</p>
                                <p className="font-semibold">
                                  ${Math.round(insight.avgSalary / 1000)}k
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Top Skills in Demand */}
                {insights[0] && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Skills in Demand</h3>
                    <div className="space-y-2">
                      {JSON.parse(insights[0].topSkills).map((skill: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </span>
                          <span className="font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Job Postings Trend */}
                <Card className="p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Job Postings Over Time</h3>
                  <div className="space-y-3">
                    {insights.slice(0, 6).reverse().map((insight) => {
                      const maxPostings = Math.max(...insights.map((i) => i.jobPostings));
                      const percentage = (insight.jobPostings / maxPostings) * 100;

                      return (
                        <div key={insight.month}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>
                              {new Date(insight.month + "-01").toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            <span className="font-semibold">
                              {insight.jobPostings.toLocaleString()} postings
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Top Companies Hiring */}
                {insights[0] && insights[0].topCompanies && (
                  <Card className="p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Top Companies Hiring</h3>
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(insights[0].topCompanies).map((company: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm py-2">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
