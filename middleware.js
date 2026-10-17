import { next, ipAddress } from '@vercel/functions';

export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const url = new URL(request.url);
  const userAgent = (request.headers.get('user-agent') || '').slice(0, 1024);
  const botMatch = userAgent.match(/googlebot|bingbot|duckduckbot|baiduspider|yandexbot|applebot|facebookexternalhit|twitterbot|linkedinbot|gptbot|chatgpt-user|oai-searchbot|claudebot|anthropic-ai|perplexitybot|bytespider|amazonbot|ahrefsbot|semrushbot|bot|crawler|spider|headless|python-requests|curl|wget/i);

  console.log(JSON.stringify({
    event: 'visitor_request',
    timestamp: new Date().toISOString(),
    method: request.method,
    path: url.pathname,
    ip: ipAddress(request) || null,
    userAgent,
    suspectedBot: Boolean(botMatch),
    botHint: botMatch ? botMatch[0].toLowerCase() : null,
    requestId: request.headers.get('x-vercel-id'),
  }));

  return next();
}
