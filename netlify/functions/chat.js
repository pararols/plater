const fetch = require('node-fetch');

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

        // Call Google Gemini API
        // Using gemini-2.0-flash as requested
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
                                    text: `Ets un assistent virtual expert en el Pla Estratègic de Sant Jordi Desvalls i la Comunitat Local d'Energia (CLE). 
                  Respon de manera breu, amable i informativa. 
                  
                  CONTEXT SOBRE LA CLE (Comunitat Local d'Energia):
                  - Instal·lacions: Sala Nova (16.8 kWp) i Pavelló (20 kWp).
                  - Participació: Oberta a veïns a menys de 5000m (tot el municipi).
                  - Quotes de participació (Taxa anual):
                    - 0.5 kWp: 49 €/any
                    - 1.0 kWp: 83 €/any
                    - 1.5 kWp: 118 €/any
                    - 2.0 kWp: 152 €/any
                  - Estalvi estimat (ROI): Per cada 1€ invertit, s'estima un retorn de 2€ en estalvi a la factura.
                  - Objectiu: Sobirania energètica, sense ànim de lucre. Els beneficis van a un "Fons de Sostenibilitat" per manteniment i millores (bateries).

                  El teu objectiu és explicar el pla de sobirania energètica, la protecció del paisatge, l'ús de teulades i resoldre dubtes sobre la CLE amb les dades anteriors.
                  
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
