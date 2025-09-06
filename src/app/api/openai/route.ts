import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY || " ", // This is the default and can be omitted
});

export async function POST(request:Request) {
    const {model,prompt} = await request.json();
    try {
        const response = await client.responses.create({
            model: model || 'gpt-4o',
            instructions: prompt || 'You are a coding assistant that talks like a pirate',
            input: prompt || 'Are semicolons optional in JavaScript?',
        });

        return new Response(
            JSON.stringify(response.text),
            { status: 200 }
        );
    }catch(error){
        console.log("Error While sending the Resuest to OpenAI", error);
        return new Response(
            "Error while processing the request from the OpenAI Phase",
            { status: 500 }
        );
    }
}