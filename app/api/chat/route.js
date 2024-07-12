// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";



export async function POST(req, res) {
  const { messages } = await req.json();
  const result = await streamText({
    model: google("models/gemini-1.5-flash"),
    messages,
  });

  return result.toAIStreamResponse();
}
