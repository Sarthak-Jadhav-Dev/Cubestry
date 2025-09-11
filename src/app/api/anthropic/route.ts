import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
    const { model, prompt ,apiKey } = await request.json();
    try {
        const anthropic = new Anthropic({
            apiKey: apiKey || " ", 
        });

        const response = await anthropic.messages.create({
            model: model || "claude-sonnet-4-20250514",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt || "Hello, Claude" }],
        });
        
        return new Response(
            JSON.stringify(response),
            {
                status:200,
            }
        )
    } catch (error) {
        console.log("The Error is Coming from the Anthropics API sending phase",error);
        return new Response("The Error is Coming from the Anthropics API sending phase",{status:500});
    }
}

