import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all mentors or filter by career
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const careerId = searchParams.get("careerId");
    const availability = searchParams.get("availability");

    const where: any = {};

    if (careerId) {
      where.careerId = careerId;
    }

    if (availability) {
      where.availability = availability;
    }

    const mentors = await prisma.mentor.findMany({
      where,
      include: {
        career: true,
        _count: {
          select: {
            mentorshipRequests: {
              where: {
                status: "accepted",
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}

// POST - Create or find a mentor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, bio, title, company, yearsExperience, careerId, linkedInUrl, maxMentees } = body;

    if (!name || !email || !title || !yearsExperience || !careerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if mentor already exists
    const existingMentor = await prisma.mentor.findUnique({
      where: { email },
    });

    if (existingMentor) {
      return NextResponse.json({
        id: existingMentor.id,
        existing: true,
      });
    }

    // Create new mentor
    const mentor = await prisma.mentor.create({
      data: {
        name,
        email,
        bio,
        title,
        company,
        yearsExperience: parseInt(yearsExperience),
        careerId,
        linkedInUrl,
        maxMentees: maxMentees ? parseInt(maxMentees) : 5,
      },
    });

    return NextResponse.json({
      id: mentor.id,
      existing: false,
    });
  } catch (error) {
    console.error("Error creating mentor:", error);
    return NextResponse.json(
      { error: "Failed to create mentor" },
      { status: 500 }
    );
  }
}
