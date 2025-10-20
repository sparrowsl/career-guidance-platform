import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all careers
export async function GET(request: NextRequest) {
  try {
    const careers = await prisma.career.findMany({
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
        _count: {
          select: {
            mentors: true,
            recommendations: true,
          },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
