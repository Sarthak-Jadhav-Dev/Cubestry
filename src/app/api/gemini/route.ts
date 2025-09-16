import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const { model, prompt , apiKey } = await request.json();
  
  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const modelInstance = ai.getGenerativeModel({
      model: model || "gemini-1.5-flash",
    });

    const response = await modelInstance.generateContent(
      prompt || "Hello, gemini"
    );

    return new Response(
      JSON.stringify({ text: response.response.text() }),
      { status: 200 }
    );

  } catch (error) {
    console.error("The Error is Coming from the Gemini API sending phase", error);
    return new Response(
      "The Error is Coming from the Gemini API sending phase",
      { status: 500 }
    );
  }
}
