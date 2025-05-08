import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
console.log('API Key loaded:', !!API_KEY); // Will log true/false without exposing the key

// Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path);
  next();
});

app.post('/api/check-link', async (req, res) => {
  try {
    const { url } = req.body;
    console.log('Checking URL:', url);
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!API_KEY) {
      throw new Error('Google Safe Browsing API key is not configured');
    }

    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
    
    const response = await fetch(apiUrl, {  // Changed this line
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client: {
          clientId: "cyberforge",
          clientVersion: "1.0.0"
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }]
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.json({ safe: !data.matches });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      message: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
