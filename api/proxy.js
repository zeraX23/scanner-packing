export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const telegramUrl = `https://api.telegram.org${req.url.replace('/api/proxy', '')}`;
  
  const response = await fetch(telegramUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
