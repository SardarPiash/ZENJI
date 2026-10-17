export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 's-maxage=0, max-age=0');
  res.status(200).send(`User-agent: *
Allow: /

Sitemap: https://zenji-kappa.vercel.app/sitemap.xml`);
}
