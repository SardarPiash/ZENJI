const ORIGIN = 'https://zenji-kappa.vercel.app';

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (char) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;'
  })[char]);
}

function gatewayUrls(query = {}) {
  let targets = query.target ?? query['target[]'] ?? query.targets;
  if (targets === undefined) targets = JSON.parse(process.env.TARGET_URLS || '[]');
  else if (typeof targets === 'string' && targets.trim().startsWith('[')) {
    targets = JSON.parse(targets);
  }
  if (!Array.isArray(targets)) targets = [targets];
  if (targets.length > 1000) throw new Error('Too many targets.');
  return [...new Set(targets.map((target) => {
    if (typeof target !== 'string') throw new Error('Invalid target.');
    const url = new URL(target);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Invalid protocol.');
    return `${ORIGIN}/gateway?target=${encodeURIComponent(url.href)}`;
  }))];
}

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  try {
    const urls = gatewayUrls(req.query);
    res.statusCode = 200;
    return res.end(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ZENJI Gateway Feed</title>
    <link>${ORIGIN}</link>
    <description>Gateway links published by ZENJI.</description>
${urls.map((url, index) => `    <item>
      <title>Gateway link ${index + 1}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
    </item>`).join('\n')}
  </channel>
</rss>`);
  } catch {
    res.statusCode = 400;
    return res.end('<?xml version="1.0" encoding="UTF-8"?><error>Provide up to 1000 HTTP or HTTPS targets using repeated target parameters, a JSON targets array, or the TARGET_URLS environment variable.</error>');
  }
};
