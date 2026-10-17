module.exports = function handler(req, res) {
  const target = req.query.target;

  if (typeof target !== 'string' || !target.trim()) {
    return res.status(400).send('A single target URL is required.');
  }

  let destination;
  try {
    destination = new URL(target);
  } catch {
    return res.status(400).send('Target must be a valid HTTP or HTTPS URL.');
  }

  if (!['http:', 'https:'].includes(destination.protocol)) {
    return res.status(400).send('Target must be a valid HTTP or HTTPS URL.');
  }

  res.statusCode = 301;
  res.setHeader('Location', destination.href);
  return res.end();
};
