"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { NavigationHeader } from "@/components/navigation-header";
import { MentorshipRequest } from "@/lib/types";

export default function MentorDashboardPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    const mentorId = localStorage.getItem("mentorId");
    if (!mentorId) {
      router.push("/mentor/register");
      return;
    }

    // Fetch mentor details
    fetch(`/api/mentors/${mentorId}`)
      .then((res) => res.json())
      .then((data) => setMentor(data))
      .catch((err) => console.error("Error fetching mentor:", err));

    // Fetch mentorship requests
    fetch(`/api/mentorship-requests?mentorId=${mentorId}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setLoading(false);
      });
  }, [router]);

  const handleRequestAction = async (requestId: string, status: string, response?: string) => {
    setProcessingId(requestId);

    try {
      const res = await fetch(`/api/mentorship-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, response }),
      });

      if (res.ok) {
        const updatedRequest = await res.json();
        setRequests((prev) =>
          prev.map((req) => (req.id === requestId ? updatedRequest : req))
        );
      } else {
        alert("Failed to update request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update request");
    } finally {
      setProcessingId(null);
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const acceptedRequests = requests.filter((r) => r.status === "accepted");
  const rejectedRequests = requests.filter((r) => r.status === "rejected");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationHeader userName={mentor?.name || "Mentor"} userType="mentor" />
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mentor Dashboard
          </h1>
          {mentor && (
            <p className="text-xl text-gray-600">
              Manage your mentorship requests
            </p>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{pendingRequests.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold">{acceptedRequests.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{rejectedRequests.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{requests.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Requests Tabs */}
        <Card className="p-6">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({acceptedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No pending requests
                </p>
              ) : (
                pendingRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {request.student.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.student.email}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>

                      {request.message && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {request.message}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleRequestAction(request.id, "accepted", "Welcome! I'm looking forward to mentoring you.")}
                          disabled={processingId === request.id}
                          className="flex-1"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleRequestAction(request.id, "rejected", "Thank you for your interest, but I'm at capacity right now.")}
                          disabled={processingId === request.id}
                          className="flex-1"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4 mt-6">
              {acceptedRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No accepted mentees yet
                </p>
              ) : (
                acceptedRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {request.student.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.student.email}
                          </p>
                        </div>
                        <Badge className="bg-green-500">Accepted</Badge>
                      </div>

                      {request.response && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            Your response: {request.response}
                          </p>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        onClick={() => handleRequestAction(request.id, "completed")}
                        disabled={processingId === request.id}
                      >
                        Mark as Completed
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4 mt-6">
              {rejectedRequests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No rejected requests
                </p>
              ) : (
                rejectedRequests.map((request) => (
                  <Card key={request.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {request.student.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.student.email}
                          </p>
                        </div>
                        <Badge variant="destructive">Rejected</Badge>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
