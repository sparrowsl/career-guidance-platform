"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Award, ExternalLink } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  company?: string;
  bio?: string;
  yearsExperience: number;
  availability: string;
  linkedInUrl?: string;
  career: {
    id: string;
    title: string;
    category: string;
  };
  _count: {
    mentorshipRequests: number;
  };
}

export default function MentorsPage() {
  const router = useRouter();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    // Check if student is logged in
    const id = localStorage.getItem("studentId");
    setStudentId(id);

    // Fetch careers for filter
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => setCareers(data))
      .catch((err) => console.error("Error fetching careers:", err));

    // Fetch mentors
    fetchMentors();
  }, []);

  const fetchMentors = (careerId?: string) => {
    setLoading(true);
    const url = careerId
      ? `/api/mentors?careerId=${careerId}&availability=available`
      : "/api/mentors?availability=available";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMentors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching mentors:", err);
        setLoading(false);
      });
  };

  const handleCareerFilter = (careerId: string) => {
    setSelectedCareer(careerId);
    if (careerId) {
      fetchMentors(careerId);
    } else {
      fetchMentors();
    }
  };

  const handleRequestMentorship = (mentorId: string) => {
    if (!studentId) {
      alert("Please register as a student first");
      router.push("/start");
      return;
    }

    router.push(`/mentors/${mentorId}/request`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Mentor
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect with experienced professionals who can guide your career journey
          </p>

          {/* Career Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCareer === "" ? "default" : "outline"}
              onClick={() => handleCareerFilter("")}
            >
              All Fields
            </Button>
            {careers.map((career) => (
              <Button
                key={career.id}
                variant={selectedCareer === career.id ? "default" : "outline"}
                onClick={() => handleCareerFilter(career.id)}
              >
                {career.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading mentors...</p>
          </div>
        ) : mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No mentors available in this field yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600 font-medium">{mentor.title}</p>
                    {mentor.company && (
                      <p className="text-sm text-gray-500">at {mentor.company}</p>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Award className="w-3 h-3 mr-1" />
                      {mentor.yearsExperience} years
                    </Badge>
                    <Badge variant="outline">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {mentor.career.title}
                    </Badge>
                    <Badge variant="outline">
                      <Users className="w-3 h-3 mr-1" />
                      {mentor._count.mentorshipRequests} mentees
                    </Badge>
                  </div>

                  {/* Bio */}
                  {mentor.bio && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {mentor.bio}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleRequestMentorship(mentor.id)}
                    >
                      Request Mentorship
                    </Button>
                    {mentor.linkedInUrl && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(mentor.linkedInUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-100 to-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Are you an experienced professional?
            </h2>
            <p className="text-gray-600 mb-4">
              Join our mentor community and help shape the next generation
            </p>
            <Button onClick={() => router.push("/mentor/register")}>
              Become a Mentor
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
