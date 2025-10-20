import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get student progress
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

    const progress = await prisma.studentProgress.findMany({
      where: { studentId },
      include: {
        resource: {
          include: {
            skill: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// POST - Create or update progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, resourceId, status, progressPercent } = body;

    if (!studentId || !resourceId) {
      return NextResponse.json(
        { error: "studentId and resourceId are required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (progressPercent !== undefined) {
      updateData.progressPercent = progressPercent;
    }

    // Mark as completed if progress is 100%
    if (progressPercent === 100) {
      updateData.status = "completed";
      updateData.completedAt = new Date();
    }

    const progress = await prisma.studentProgress.upsert({
      where: {
        studentId_resourceId: {
          studentId,
          resourceId,
        },
      },
      update: updateData,
      create: {
        studentId,
        resourceId,
        status: status || "started",
        progressPercent: progressPercent || 0,
      },
      include: {
        resource: {
          include: {
            skill: true,
          },
        },
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error creating/updating progress:", error);
    return NextResponse.json(
      { error: "Failed to create/update progress" },
      { status: 500 }
    );
  }
}
