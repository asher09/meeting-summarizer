import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    const { transcript, prompt } = await request.json();

    if (!transcript) {
        return NextResponse.json({ 
            error: 'Transcript is required.' 
        }, { 
            status: 400 
            });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const systemPrompt = "You are a professional summarization bot. Summarize the following meeting transcript clearly and concisely. Use bullet points and markdown formatting where appropriate.";
    const userPrompt = `${prompt ? prompt + '\n' : ''}${transcript}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      max_tokens: 1024,
    });

    const summary = chatCompletion.choices[0]?.message?.content || '';

    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}