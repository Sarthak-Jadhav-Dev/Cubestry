export async function POST(request: Request) {
    const { model, prompt ,instruction } = await request.json();
    try {
        const response = await fetch('https://api.closerouter.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CLOSEROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                messages: [
                    {
                        "role": "system",
                        "content": instruction || "You are a helpful assistant."
                    },
                    {
                        "role": "user",
                        "content": prompt || "hello\n"
                    }
                ],
                model: model ||"gpt-4o-2024-08-06",
                temperature: 0.7,
                max_tokens: 4000,
                stream: false
            })
        });

        const data = await response.json();
        console.log("This is the data from the All in One API route",data)

        return new Response(
            JSON.stringify(data),
        {
                status: 200,
            }
        )
        
    } catch (error) {
        console.log("This error is for the All in One API route",error);
        return new Response("This error is for the All in One API route",
            {
                status: 500,
            }
        )
    }
}