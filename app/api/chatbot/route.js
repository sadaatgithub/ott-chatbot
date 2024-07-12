// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { google } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { streamText, generateText  } from "ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);


export async function POST(req, res) {
  const { messages } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContentStream(messages[0].content);
  let text =''
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }
  return NextResponse.json({ text });
 
}

