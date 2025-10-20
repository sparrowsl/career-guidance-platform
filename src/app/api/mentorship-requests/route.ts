import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get mentorship requests for a student or mentor
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");
    const mentorId = searchParams.get("mentorId");

    if (!studentId && !mentorId) {
      return NextResponse.json(
        { error: "Either studentId or mentorId is required" },
        { status: 400 }
      );
    }

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (mentorId) where.mentorId = mentorId;

    const requests = await prisma.mentorshipRequest.findMany({
      where,
      include: {
        student: true,
        mentor: {
          include: {
            career: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching mentorship requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentorship requests" },
      { status: 500 }
    );
  }
}

// POST - Create a new mentorship request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, mentorId, message } = body;

    if (!studentId || !mentorId) {
      return NextResponse.json(
        { error: "studentId and mentorId are required" },
        { status: 400 }
      );
    }

    // Check if request already exists
    const existingRequest = await prisma.mentorshipRequest.findUnique({
      where: {
        studentId_mentorId: {
          studentId,
          mentorId,
        },
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "You have already requested mentorship from this mentor" },
        { status: 400 }
      );
    }

    // Create new request
    const mentorshipRequest = await prisma.mentorshipRequest.create({
      data: {
        studentId,
        mentorId,
        message,
        status: "pending",
      },
      include: {
        student: true,
        mentor: {
          include: {
            career: true,
          },
        },
      },
    });

    return NextResponse.json(mentorshipRequest);
  } catch (error) {
    console.error("Error creating mentorship request:", error);
    return NextResponse.json(
      { error: "Failed to create mentorship request" },
      { status: 500 }
    );
  }
}
