module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'SLACK_WEBHOOK_URL not configured on server' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      return res.status(200).json({ ok: true });
    } else {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
