// api/generate.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;
            const apiKey = process.env.GEMINI_API_KEY;

            const response = await fetch('https://api.gemini-ai.com/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            res.status(200).json({ response: data.response });
        } catch (error) {
            console.error('Error fetching AI response:', error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
