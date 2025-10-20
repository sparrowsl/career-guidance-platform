"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function MentorRegisterPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    title: "",
    company: "",
    yearsExperience: "",
    careerId: "",
    linkedInUrl: "",
    maxMentees: "5",
  });

  useEffect(() => {
    // Fetch available careers
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => setCareers(data))
      .catch((err) => console.error("Error fetching careers:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/mentors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store mentor ID in localStorage
        localStorage.setItem("mentorId", data.id);

        // Redirect to mentor dashboard
        router.push(`/mentor/dashboard`);
      } else {
        alert(data.error || "Failed to register");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Become a Mentor
          </h1>
          <p className="text-gray-600">
            Share your experience and help students navigate their career paths
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="title">Current Title *</Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google"
              />
            </div>

            <div>
              <Label htmlFor="yearsExperience">Years of Experience *</Label>
              <Input
                id="yearsExperience"
                name="yearsExperience"
                type="number"
                required
                min="1"
                max="50"
                value={formData.yearsExperience}
                onChange={handleChange}
                placeholder="5"
              />
            </div>

            <div>
              <Label htmlFor="careerId">Career Field *</Label>
              <select
                id="careerId"
                name="careerId"
                required
                value={formData.careerId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a career field</option>
                {careers.map((career) => (
                  <option key={career.id} value={career.id}>
                    {career.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tell students about yourself, your experience, and what you can help them with..."
              />
            </div>

            <div>
              <Label htmlFor="linkedInUrl">LinkedIn Profile URL</Label>
              <Input
                id="linkedInUrl"
                name="linkedInUrl"
                type="url"
                value={formData.linkedInUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <Label htmlFor="maxMentees">Maximum Mentees</Label>
              <Input
                id="maxMentees"
                name="maxMentees"
                type="number"
                min="1"
                max="20"
                value={formData.maxMentees}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Registering..." : "Register as Mentor"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
