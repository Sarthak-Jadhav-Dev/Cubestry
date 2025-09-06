import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request: Request) {
    const {model,prompt} = await request.json();
    try {
        const response = await ai.models.generateContent({
            model: model || "gemini-2.5-flash",
            contents: prompt ||"Hello, gemini",
        });
        
        return new Response(
            JSON.stringify(response.text),
            {status:200}
        )
    } catch (error) {
        console.log("The Error is Coming from the Gemini API sending phase",error)
        return new Response("The Error is Coming from the Gemini API sending phase",{
            status:500
        })
    }
}
