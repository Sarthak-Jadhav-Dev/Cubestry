import OpenAI from 'openai';


export async function POST(request: Request) {
    const { model, prompt, apikey } = await request.json();
    const client = new OpenAI({
        apiKey: apikey || " ", // This is the default and can be omitted
    });
    try {
        const response = await client.responses.create({
            model: model || 'gpt-4o',
            prompt: prompt || 'Hello , OpenAI',
        });

        return new Response(
            JSON.stringify(response.text),
            { status: 200 }
        );
    } catch (error) {
        console.log("The Error is Coming from the OpenAi API sending phase", error);
        return new Response(
            "The Error is Coming from the OpenAi API sending phase",
            { status: 500 }
        );
    }
}