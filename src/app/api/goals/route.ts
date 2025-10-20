import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get student goals
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { error: "studentId is required" },
        { status: 400 }
      );
    }

    const goals = await prisma.goal.findMany({
      where: { studentId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

// POST - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, title, description, targetDate } = body;

    if (!studentId || !title) {
      return NextResponse.json(
        { error: "studentId and title are required" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.create({
      data: {
        studentId,
        title,
        description,
        targetDate: targetDate ? new Date(targetDate) : null,
        status: "active",
      },
    });

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}
