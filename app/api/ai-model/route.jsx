import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { JobPosition, JobDescription, InterviewDuration, type } = await req.json();

  const FINAL_PROMPT = QUESTIONS_PROMPT
    .replace("{{jobTitle}}", JobPosition)
    .replace("{{JobDescription}}", JobDescription)
    .replace("{{InterviewDuration}}", InterviewDuration)
    .replace("{{type}}", type);

  console.log(FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); 

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // ✅ SAFETY CHECK
    if (
      !completion ||
      !completion.choices ||
      completion.choices.length === 0 ||
      !completion.choices[0].message
    ) {
      throw new Error("AI response is empty or malformed");
    }

    return NextResponse.json({ content: completion.choices[0].message.content });
  } catch (e) {
    console.error("AI Error:", e);
    return NextResponse.json({
      error:
        e.name === "AbortError"
          ? "Request timed out"
          : e.message || "Something went wrong",
    });
  }
}
