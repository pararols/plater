exports.handler = async function (event, context) {
    try {
        // Only allow POST requests
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method Not Allowed" };
        }

        const body = JSON.parse(event.body);
        const userMessage = body.message;

        // Get the API Key from Environment Variables (Secure)
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "API Key not configured" })
            };
        }

        // Check if fetch is available
        if (typeof fetch === 'undefined') {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Global 'fetch' is not defined. Node version might be too old." })
            };
        }

        // Call Google Gemini API
        // Note: Node.js 18+ on Netlify has native fetch
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

        if (!response.ok) {
            const errorText = await response.text();
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Gemini API Error: ${response.status} - ${errorText}` })
            };
        }

        const data = await response.json();

        // Extract the text from Gemini's response
        const botReply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Ho sento, no he pogut connectar amb el cervell digital ara mateix.";

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: botReply })
        };

    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Internal Exception: ${error.message}` })
        };
    }
};
