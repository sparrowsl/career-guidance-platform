import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get market insights for a career
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const careerId = searchParams.get("careerId");

    if (!careerId) {
      return NextResponse.json(
        { error: "careerId is required" },
        { status: 400 }
      );
    }

    const insights = await prisma.marketInsight.findMany({
      where: { careerId },
      orderBy: {
        month: "desc",
      },
      take: 12, // Last 12 months
    });

    return NextResponse.json(insights);
  } catch (error) {
    console.error("Error fetching market insights:", error);
    return NextResponse.json(
      { error: "Failed to fetch market insights" },
      { status: 500 }
    );
  }
}

// POST - Create market insight (for admin/seeding)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      careerId,
      month,
      jobPostings,
      avgSalary,
      demandTrend,
      topSkills,
      topCompanies,
    } = body;

    if (!careerId || !month || !jobPostings || !demandTrend || !topSkills) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const insight = await prisma.marketInsight.upsert({
      where: {
        careerId_month: {
          careerId,
          month,
        },
      },
      update: {
        jobPostings,
        avgSalary,
        demandTrend,
        topSkills,
        topCompanies,
      },
      create: {
        careerId,
        month,
        jobPostings,
        avgSalary,
        demandTrend,
        topSkills,
        topCompanies,
      },
    });

    return NextResponse.json(insight);
  } catch (error) {
    console.error("Error creating market insight:", error);
    return NextResponse.json(
      { error: "Failed to create market insight" },
      { status: 500 }
    );
  }
}
