import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get a specific mentor by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const mentor = await prisma.mentor.findUnique({
      where: { id },
      include: {
        career: {
          include: {
            skills: {
              include: {
                skill: true,
              },
            },
          },
        },
        mentorshipRequests: {
          include: {
            student: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error fetching mentor:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor" },
      { status: 500 }
    );
  }
}

// PATCH - Update mentor profile
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { bio, title, company, yearsExperience, linkedInUrl, availability, maxMentees } = body;

    const updateData: any = {};

    if (bio !== undefined) updateData.bio = bio;
    if (title !== undefined) updateData.title = title;
    if (company !== undefined) updateData.company = company;
    if (yearsExperience !== undefined) updateData.yearsExperience = parseInt(yearsExperience);
    if (linkedInUrl !== undefined) updateData.linkedInUrl = linkedInUrl;
    if (availability !== undefined) updateData.availability = availability;
    if (maxMentees !== undefined) updateData.maxMentees = parseInt(maxMentees);

    const mentor = await prisma.mentor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    return NextResponse.json(
      { error: "Failed to update mentor" },
      { status: 500 }
    );
  }
}
