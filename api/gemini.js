// api/gemini.js
export default async function handler(req, res) {
  // Asegurarnos de que sólo aceptamos peticiones POST (cuando enviamos la pizarra)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Vercel inyectará aquí la variable de entorno automáticamente sin que nadie la vea
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body) // Reenviamos exactamente los mismos datos del cliente
    });
    
    const data = await response.json();
    // Le devolvemos al HTML (frontend) la respuesta de la IA
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
