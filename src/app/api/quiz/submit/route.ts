import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAIRecommendations, isOpenAIConfigured } from "@/lib/openai";

// AI recommendation logic with OpenAI integration
async function generateRecommendations(studentId: string) {
  // Get student info
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new Error("Student not found");
  }
  // Get all student responses
  const responses = await prisma.studentResponse.findMany({
    where: { studentId },
    include: {
      question: true,
      option: true,
    },
  });

  // Calculate category scores
  const categoryScores: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};

  responses.forEach((response) => {
    const category = response.question.category;
    const score = response.option.score;

    if (!categoryScores[category]) {
      categoryScores[category] = 0;
      categoryCounts[category] = 0;
    }

    categoryScores[category] += score;
    categoryCounts[category] += 1;
  });

  // Calculate average scores per category
  const averageScores: Record<string, number> = {};
  Object.keys(categoryScores).forEach((category) => {
    averageScores[category] = categoryScores[category] / categoryCounts[category];
  });

  // Get all careers with their required skills
  const careers = await prisma.career.findMany({
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });

  let careerMatches;

  // Try to use AI-powered recommendations if OpenAI is configured
  if (isOpenAIConfigured()) {
    try {
      const aiRecommendations = await generateAIRecommendations(
        student.name,
        {
          analytical: averageScores.analytical || 0,
          creative: averageScores.creative || 0,
          technical: averageScores.technical || 0,
          interpersonal: averageScores.interpersonal || 0,
        },
        careers.map((c) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          category: c.category,
          demandLevel: c.demandLevel,
          averageSalary: c.averageSalary,
          jobGrowthRate: c.jobGrowthRate,
        }))
      );

      careerMatches = aiRecommendations.map((rec: any) => ({
        careerId: rec.careerId,
        matchScore: rec.matchScore,
        reasoning: rec.reasoning,
      }));

      console.log("Using AI-powered recommendations");
    } catch (error) {
      console.error("Error with AI recommendations, falling back to simple algorithm:", error);
      careerMatches = null;
    }
  }

  // Fall back to simple algorithm if AI is not configured or failed
  if (!careerMatches) {
    careerMatches = careers.map((career) => {
      // Simple matching: higher score in category = better match for careers in that category
      let matchScore = 0;

      // Base match on career category alignment with student's strongest categories
      const careerCategory = career.category;
      const relevantScore = averageScores[careerCategory] || 0;
      matchScore = (relevantScore / 5) * 100; // Convert 1-5 scale to 0-100

      // Boost for high demand careers
      if (career.demandLevel === "high") {
        matchScore += 10;
      }

      // Normalize to 0-100 range
      matchScore = Math.min(100, Math.max(0, matchScore));

      // Generate reasoning
      const topCategory = Object.entries(averageScores).sort((a, b) => b[1] - a[1])[0];
      const reasoning = `Based on your strong ${topCategory[0]} skills (score: ${topCategory[1].toFixed(1)}/5), this ${career.category} career is a good fit. ${
        career.demandLevel === "high" ? "This field has high market demand." : ""
      }`;

      return {
        careerId: career.id,
        matchScore,
        reasoning,
      };
    });

    console.log("Using simple recommendation algorithm");
  }

  // Sort by match score and take top 5
  const topMatches = careerMatches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  // Save recommendations
  for (const match of topMatches) {
    await prisma.studentRecommendation.upsert({
      where: {
        studentId_careerId: {
          studentId,
          careerId: match.careerId,
        },
      },
      update: {
        matchScore: match.matchScore,
        reasoning: match.reasoning,
      },
      create: {
        studentId,
        careerId: match.careerId,
        matchScore: match.matchScore,
        reasoning: match.reasoning,
      },
    });
  }

  return topMatches;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, answers } = body;

    if (!studentId || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Delete existing responses for this student
    await prisma.studentResponse.deleteMany({
      where: { studentId },
    });

    // Save all responses
    for (const answer of answers) {
      await prisma.studentResponse.create({
        data: {
          studentId,
          questionId: answer.questionId,
          optionId: answer.optionId,
        },
      });
    }

    // Generate recommendations
    const recommendations = await generateRecommendations(studentId);

    return NextResponse.json({
      success: true,
      recommendations: recommendations.length,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
