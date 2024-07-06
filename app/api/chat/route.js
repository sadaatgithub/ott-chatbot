import { google } from '@ai-sdk/google';
import { streamText } from 'ai';


export async function POST(req) {

    const { messages } = await req.json();

    const result = await streamText({
      model: google('models/gemini-1.5-flash-latest'),
      messages,
    });
  
    return result.toAIStreamResponse();
  }