import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Function to detect if the description is in Farsi
const isFarsi = (text) => {
  const farsiRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return farsiRegex.test(text);
};

export async function POST(req) {
  const { JobPosition, JobDescription, InterviewDuration, type } = await req.json();

  // Check if the description is in Farsi or English
  const language = isFarsi(JobDescription) ? "Farsi" : "English";

  // Define the prompt for generating questions based on language
  let FINAL_PROMPT = QUESTIONS_PROMPT
    .replace("{{jobTitle}}", JobPosition)
    .replace("{{JobDescription}}", JobDescription)
    .replace("{{InterviewDuration}}", InterviewDuration)
    .replace("{{type}}", type);

  if (language === "Farsi") {
    FINAL_PROMPT += `
      The description is in Farsi. Please generate interview questions in Farsi based on the job description.
    `;
  } else {
    FINAL_PROMPT += `
      The description is in English. Please generate interview questions in English based on the job description.
    `;
  }

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
