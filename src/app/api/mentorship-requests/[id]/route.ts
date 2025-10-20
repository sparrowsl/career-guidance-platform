import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH - Update mentorship request status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, response } = body;

    if (!status) {
      return NextResponse.json(
        { error: "status is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "accepted", "rejected", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updateData: any = { status };
    if (response !== undefined) {
      updateData.response = response;
    }

    const mentorshipRequest = await prisma.mentorshipRequest.update({
      where: { id },
      data: updateData,
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
    console.error("Error updating mentorship request:", error);
    return NextResponse.json(
      { error: "Failed to update mentorship request" },
      { status: 500 }
    );
  }
}

// GET - Get a specific mentorship request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentorshipRequest = await prisma.mentorshipRequest.findUnique({
      where: { id },
      include: {
        student: true,
        mentor: {
          include: {
            career: true,
          },
        },
      },
    });

    if (!mentorshipRequest) {
      return NextResponse.json(
        { error: "Mentorship request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentorshipRequest);
  } catch (error) {
    console.error("Error fetching mentorship request:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentorship request" },
      { status: 500 }
    );
  }
}
