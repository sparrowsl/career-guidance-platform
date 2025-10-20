import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get total counts
    const [
      totalStudents,
      totalCareers,
      totalQuestions,
      totalSkills,
      totalMentors,
      totalMentorshipRequests,
      totalGoals,
      totalProgress,
      totalResources,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.career.count(),
      prisma.quizQuestion.count(),
      prisma.skill.count(),
      prisma.mentor.count(),
      prisma.mentorshipRequest.count(),
      prisma.goal.count(),
      prisma.studentProgress.count(),
      prisma.learningResource.count(),
    ]);

    // Get recent students with their stats
    const recentStudents = await prisma.student.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            responses: true,
            recommendations: true,
            goals: true,
            progress: true,
          },
        },
      },
    });

    // Get mentorship stats
    const mentorshipStats = await prisma.mentorshipRequest.groupBy({
      by: ['status'],
      _count: true,
    });

    // Get recent mentors
    const recentMentors = await prisma.mentor.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        career: {
          select: {
            title: true,
          },
        },
        _count: {
          select: {
            mentorshipRequests: true,
          },
        },
      },
    });

    // Get goal completion stats
    const goalStats = await prisma.goal.groupBy({
      by: ['status'],
      _count: true,
    });

    // Get progress completion stats
    const progressStats = await prisma.studentProgress.groupBy({
      by: ['status'],
      _count: true,
    });

    return NextResponse.json({
      totalStudents,
      totalCareers,
      totalQuestions,
      totalSkills,
      totalMentors,
      totalMentorshipRequests,
      totalGoals,
      totalProgress,
      totalResources,
      recentStudents,
      recentMentors,
      mentorshipStats,
      goalStats,
      progressStats,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
