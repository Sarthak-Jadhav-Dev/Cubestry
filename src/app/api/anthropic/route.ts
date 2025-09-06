import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
    const { model, prompt } = await request.json();
    try {
        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY, 
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
        console.log("Error from Anthropics Side ",error);
        return new Response("Error for the Anthropics Service ",{status:500});
    }
}

