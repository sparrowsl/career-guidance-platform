import { NextRequest, NextResponse } from "next/server";
import { pdf } from "pdf-parse";

let pipeline: any | null = null;
async function getPipeline() {
  if (!pipeline) {
    const mod = await import("@xenova/transformers");
    pipeline = mod.pipeline;
  }
  return pipeline;
}

async function extractPdfText(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const result = await pdf(buffer);
  return result.text || "";
}

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9+/#.&\-\s]/g, " ").replace(/\s+/g, " ").trim();
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

async function extractSkillsWithModel(text: string): Promise<string[]> {
  const prompt = `Extract a concise comma-separated list of professional skills mentioned in the following resume/profile text. Only output the skills, no extra text.\n\nTEXT:\n${text}\n\nSkills:`;
  const getPipe = await getPipeline();
  const generator = await getPipe("text2text-generation", "Xenova/LaMini-Flan-T5-783M");
  const out = await generator(prompt, { max_new_tokens: 128 });
  const outputText = Array.isArray(out) ? out[0]?.generated_text ?? "" : (out as any)?.generated_text ?? "";
  const skills = (outputText as string)
    .split(/[\,\n]/)
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0)
    .map((s: string) => s.replace(/^[–-•\d.\s]+/, ""));
  return unique(skills);
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "No PDF file uploaded under field 'file'" }, { status: 400 });
    }
    const text = await extractPdfText(file);
    if (!text.trim()) {
      return NextResponse.json({ success: false, error: "Could not extract text from PDF" }, { status: 400 });
    }
    const extractedSkills = await extractSkillsWithModel(text.slice(0, 8000));
    return NextResponse.json({ success: true, data: { extractedSkills, textPreview: text.slice(0, 4000) } });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}


