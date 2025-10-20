import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if student already exists
    let student = await prisma.student.findUnique({
      where: { email },
    });

    // If student exists, return their ID
    if (student) {
      return NextResponse.json({ id: student.id, existing: true });
    }

    // Create new student
    student = await prisma.student.create({
      data: { name, email },
    });

    return NextResponse.json({ id: student.id, existing: false });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student profile" },
      { status: 500 }
    );
  }
}
