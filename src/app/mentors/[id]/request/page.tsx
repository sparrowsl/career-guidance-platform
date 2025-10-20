"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Building } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio?: string;
  yearsExperience: number;
  career: {
    title: string;
    category: string;
  };
}

export default function RequestMentorshipPage() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.id as string;

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch mentor details
    fetch(`/api/mentors/${mentorId}`)
      .then((res) => res.json())
      .then((data) => {
        setMentor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentor:", err);
        setLoading(false);
      });
  }, [mentorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      alert("Please register as a student first");
      router.push("/start");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/mentorship-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          mentorId,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Mentorship request sent successfully!");
        router.push("/dashboard");
      } else {
        alert(data.error || "Failed to send request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8">
          <p className="text-gray-600 mb-4">Mentor not found</p>
          <Button onClick={() => router.push("/mentors")}>
            Back to Mentors
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Request Mentorship
          </h1>
          <p className="text-gray-600">
            Introduce yourself and explain why you'd like to connect
          </p>
        </div>

        {/* Mentor Profile Card */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {mentor.name}
              </h2>
              <p className="text-lg text-gray-600 font-medium">{mentor.title}</p>
              {mentor.company && (
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {mentor.company}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <Award className="w-3 h-3 mr-1" />
                {mentor.yearsExperience} years experience
              </Badge>
              <Badge variant="outline">
                <Briefcase className="w-3 h-3 mr-1" />
                {mentor.career.title}
              </Badge>
            </div>

            {mentor.bio && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">{mentor.bio}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Request Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="message">Introduction Message</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
                placeholder="Tell the mentor about yourself, your goals, and why you'd like them to be your mentor..."
              />
              <p className="text-sm text-gray-500 mt-2">
                A thoughtful introduction increases your chances of being accepted
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/mentors")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="flex-1">
                {submitting ? "Sending Request..." : "Send Request"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
