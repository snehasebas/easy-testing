module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var parsed = req.body;
  if (!parsed || typeof parsed === 'string') {
    try { parsed = JSON.parse(parsed || '{}'); } catch(e) { parsed = {}; }
  }

  var targetUrl = parsed.url;
  var targetMethod = parsed.method || 'POST';
  var targetBody = parsed.body;

  if (!targetUrl || !/^https:\/\/manthan\.(dev|app)\.docketai\.com\//.test(targetUrl)) {
    return res.status(400).json({ error: 'Invalid target URL', received: typeof targetUrl, body_type: typeof req.body });
  }

  try {
    var fetchOpts = {
      method: targetMethod,
      headers: { 'Content-Type': 'application/json' },
    };
    if (targetBody) {
      fetchOpts.body = typeof targetBody === 'string' ? targetBody : JSON.stringify(targetBody);
    }

    var response = await fetch(targetUrl, fetchOpts);
    var text = await response.text();

    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
