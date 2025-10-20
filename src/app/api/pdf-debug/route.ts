import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { pdf } from "pdf-parse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await pdf(buffer);
    console.log("[pdf-debug] first 1000 chars:", result.text?.slice(0, 1000) ?? "");
    return NextResponse.json({ text: result.text ?? "" });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Failed to parse PDF" }, { status: 400 });
  }
}


