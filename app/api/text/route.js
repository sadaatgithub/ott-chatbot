import { NextResponse } from "next/server";
import { GROQ } from "../transcribe/route";


export async function POST(req, res) {
    console.log(req.body, "req.body");
//   const { text } = await req.json();

//   const result = await generateText({
//     model: google("models/whisper-1"),
//     text,
//   });

  return NextResponse.json({ text: "Hello" });
}
