module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var { url, method, headers, body } = req.body;

  if (!url || !/^https:\/\/manthan\.(dev|app)\.docketai\.com\//.test(url)) {
    return res.status(403).json({ error: 'Forbidden target' });
  }

  try {
    var fetchHeaders = { 'Content-Type': 'application/json' };
    if (headers) {
      Object.keys(headers).forEach(function(k) {
        if (!/^(origin|referer|host|cookie)$/i.test(k)) fetchHeaders[k] = headers[k];
      });
    }

    var fetchOpts = { method: method || 'POST', headers: fetchHeaders };
    if (body) fetchOpts.body = typeof body === 'string' ? body : JSON.stringify(body);

    var response = await fetch(url, fetchOpts);
    var text = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/plain');
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
