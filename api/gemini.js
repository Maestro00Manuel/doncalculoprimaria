export default async function handler(req, res) {
    // Solo aceptamos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ error: "Falta la variable de entorno GEMINI_API_KEY en Vercel." });
        }

        // Usamos la versión estable (v1) en lugar de v1beta
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body) // Pasamos el body directamente desde el frontend
        });

        const data = await apiResponse.json();
        
        return res.status(apiResponse.status).json(data);

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}
