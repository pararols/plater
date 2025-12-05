export default async (req, context) => {
    try {
        // Only allow POST requests
        if (req.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        const body = await req.json();
        const userMessage = body.message;

        // Get the API Key from Environment Variables (Secure)
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key not configured" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Call Google Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Ets un assistent virtual expert en el Pla Estratègic de Sant Jordi Desvalls. 
                  Respon de manera breu, amable i informativa. 
                  El teu objectiu és explicar el pla de sobirania energètica, la protecció del paisatge i l'ús de teulades.
                  
                  Pregunta de l'usuari: ${userMessage}`,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        const data = await response.json();

        // Extract the text from Gemini's response
        const botReply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Ho sento, no he pogut connectar amb el cervell digital ara mateix.";

        return new Response(JSON.stringify({ reply: botReply }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
