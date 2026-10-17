# ZENJI

A frontend build for **ZENJI**, an anime-inspired streetwear brand.

The site covers the brand home, shop with sale/new filters, product detail pages, a simple cart (localStorage), and an ethos/manifesto page — based on the ORIGIN drop collection.

## Local

```bash
python3 -m http.server 5173
```

Open http://localhost:5173

## Stack

Static HTML / CSS / JS. Cart uses localStorage.

## Server traffic logs (Vercel)

Root routing middleware logs every request, including static pages, assets and
the redirect gateway, as JSON with event `visitor_request`. In the Vercel project
open Logs and search for `visitor_request`; bot candidates have
`suspectedBot: true` and a `botHint` from their User-Agent. Entries include UTC
time, path, method, IP, User-Agent and Vercel request ID. Query strings, cookies
and authorization headers are excluded.

Bot detection is a User-Agent heuristic, not verified bot identity. Disguised
bots can look like browsers. Logs start after deployment; retention and sampling
depend on the Vercel plan and settings. Requests blocked by Vercel before
middleware execution must be inspected in Vercel Firewall logs.

## Pages

- `index.html` — home / hero / featured drops
- `shop.html` — full catalog + filters
- `product.html` — product detail + add to cart
- `about.html` — brand ethos
