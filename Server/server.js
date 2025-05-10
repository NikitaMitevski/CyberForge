import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import dns from 'dns/promises';

dotenv.config();

const app = express();
const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
console.log('API Key loaded:', !!API_KEY);

app.use(cors({
  origin: 'http://localhost:5174', // Change to your frontend port if needed
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path);
  next();
});

function isSuspicious(hostname, pathname = '') {
  // Hostname checks
  if (/xn--/.test(hostname)) return true;
  if (hostname.length > 50) return true; // Increased length limit
  if (/\d{5,}/.test(hostname)) return true;
  
  // Updated TLD check to include more educational domains
  if (!/\.(com|net|org|mk|edu|gov|info|biz|ac|sch|school|edu\.mk|[a-z]{2,})$/i.test(hostname)) return true;

  // Path checks - removed some common legitimate keywords
  const suspiciousPathKeywords = ['secure', 'login', 'verify', 'update', 'account', 'bank', 'police'];
  for (const keyword of suspiciousPathKeywords) {
    if (pathname.toLowerCase().includes(keyword)) return true;
  }
  if (/\d{6,}/.test(pathname)) return true;

  return false;
}

app.post('/api/check-link', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Extract hostname and pathname from URL
    let hostname, pathname;
    try {
      const parsedUrl = new URL(url);
      hostname = parsedUrl.hostname;
      pathname = parsedUrl.pathname;
    } catch (e) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Suspicious check
    const suspicious = isSuspicious(hostname, pathname);

    // Trusted TLDs
    const trustedTLDs = /\.(gov|edu|)$/i;

    // DNS lookup to check if domain exists (skip for trusted TLDs)
    if (!trustedTLDs.test(hostname)) {
      let dnsWorks = false;
      try {
        await dns.lookup(hostname);
        dnsWorks = true;
      } catch (e) {
        try {
          await dns.resolve(hostname);
          dnsWorks = true;
        } catch (e2) {}
      }
      if (!dnsWorks) {
        return res.status(400).json({ error: 'Domain does not exist', suspicious });
      }
    }

    // Check if the website is reachable (skip for trusted TLDs)
    if (!trustedTLDs.test(hostname)) {
      let siteReachable = false;
      try {
        let siteResponse = await fetch(url, { method: 'HEAD', timeout: 5000 });
        if (siteResponse.ok) {
          siteReachable = true;
        } else {
          siteResponse = await fetch(url, { method: 'GET', timeout: 5000 });
          if (siteResponse.ok) {
            siteReachable = true;
          }
        }
      } catch (e) {}
      if (!siteReachable) {
        return res.status(400).json({ error: 'Website is not reachable', suspicious });
      }
    }

    // Google Safe Browsing API
    let isMalicious = false;
    if (API_KEY) {
      const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: "cyberforge", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
          }
        })
      });
      if (response.ok) {
        const data = await response.json();
        isMalicious = !!data.matches;
      }
    }

    // URLhaus API check
    let isUrlhausMalicious = false;
    try {
      const urlhausRes = await fetch('https://urlhaus-api.abuse.ch/v1/url/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ url })
      });
      const urlhausData = await urlhausRes.json();
      isUrlhausMalicious = urlhausData.query_status === 'malicious';
    } catch (e) {
      console.error('URLhaus API error:', e);
    }

    res.json({
      safe: !isMalicious && !isUrlhausMalicious,
      suspicious,
      urlhaus: isUrlhausMalicious
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
