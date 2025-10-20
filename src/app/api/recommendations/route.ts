import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Get student info
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Get recommendations with career details
    const recommendations = await prisma.studentRecommendation.findMany({
      where: { studentId },
      include: {
        career: {
          include: {
            skills: {
              include: {
                skill: {
                  include: {
                    resources: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        matchScore: "desc",
      },
    });

    return NextResponse.json({
      studentName: student.name,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
