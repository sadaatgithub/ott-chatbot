import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const GROQ = new Groq({ apiKey: process.env.GROQ_API_KEY });
export async function POST(req, res) {
  try {
    // Check if the request is multipart/form-data
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content type must be multipart/form-data" },
        { status: 400 }
      );
    }

    // Get form data with the audio file
    const formData = await req.formData();
    // console.log(formData, "formData");
    const audioFile = formData.get("file"); // 'audio' should match your client field name

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }
    // Make sure it's a File object
    if (!(audioFile instanceof File)) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }
    const transcription = await GROQ.audio.transcriptions.create({
      file: audioFile, // Required path to audio file - replace with your audio file!
      model: "whisper-large-v3-turbo", // Required model to use for transcription
      prompt: "Specify context or spelling", // Optional
      response_format: "verbose_json", // Optional
      timestamp_granularities: ["word", "segment"], // Optional (must set response_format to "json" to use and can specify "word", "segment" (default), or both)
      language: "en", // Optional
      temperature: 0.0, // Optional
    });

    return NextResponse.json({
      success: true,

      text: transcription.text,
    });
  } catch (error) {
    console.error("Error processing audio file:", error);
    return NextResponse.json(
      { error: "Failed to process audio file" },
      { status: 500 }
    );
  }
}
