'use strict';

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#39;',
  })[character]);
}

module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.statusCode = 405;
    return res.end('Method not allowed.');
  }

  let destination;
  try {
    const target = req.query?.target;
    if (typeof target !== 'string' || !target.trim()) {
      throw new Error('A single target URL is required.');
    }
    destination = new URL(target);
    if (!['https:', 'http:'].includes(destination.protocol)) {
      throw new Error('Target must use HTTP or HTTPS.');
    }
    if (destination.username || destination.password) {
      throw new Error('Target must not contain credentials.');
    }
  } catch {
    res.statusCode = 400;
    return res.end(req.method === 'HEAD' ? undefined :
      '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
      '<title>Invalid target</title></head><body><p>Provide a single valid ' +
      'HTTP or HTTPS target URL without credentials.</p></body></html>');
  }

  const href = destination.href;
  const htmlHref = escapeHtml(href);
  // Prevent the target from terminating the inline script.
  const scriptHref = JSON.stringify(href)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting — Beauty Hall BD Gateway</title>
  <meta http-equiv="refresh" content="0; url='${htmlHref}'">
  <script>
    window.location.href = ${scriptHref};
  </script>
</head>
<body>
  <p>Redirecting… <a href="${htmlHref}">Continue to the destination</a>.</p>
</body>
</html>`;

  res.statusCode = 200;
  return res.end(req.method === 'HEAD' ? undefined : html);
};
