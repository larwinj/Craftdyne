/**
 * Website visitor counter — the host-agnostic core behind `/api/visitors`.
 *
 * The count is the number of distinct visitor IDs ever recorded, not a number
 * the browser computes and writes back. That makes it genuine by construction:
 *
 * - Recording is one atomic Redis script, so simultaneous visitors can never
 *   overwrite each other's increment (the lost-update bug of read → +1 → PUT).
 * - Recording is idempotent per visitor ID, so reloads, retries, extra tabs and
 *   React StrictMode's double effects cannot inflate it.
 * - Crawlers and headless browsers are shown the count but never added to it.
 * - Each IP may add a bounded number of *new* IDs per hour, so a script minting
 *   random IDs cannot pump the number.
 *
 * Adapters: `netlify/functions/visitors.mjs`, `api/visitors.js` (Vercel), and the
 * Vite dev/preview middleware in `vite.config.js`.
 */
import { isbot } from 'isbot';

const VISITORS_KEY = 'craftdyne:visitors';
const RATE_KEY_PREFIX = 'craftdyne:visitors:rl:';

/** New visitor IDs accepted per IP per window. Generous because Indian mobile
 * carriers put many real users behind one CGNAT address; the goal is to stop
 * scripted inflation, not to police shared networks. */
const NEW_VISITORS_PER_IP = 60;
const RATE_WINDOW_SECONDS = 60 * 60;

const VISITOR_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * KEYS[1] visitor set, KEYS[2] this IP's rate counter.
 * ARGV[1] visitor ID, ARGV[2] limit, ARGV[3] window in seconds.
 * Returning visitors never touch the rate counter, so repeat page loads from a
 * busy shared IP don't crowd out genuinely new visitors.
 */
const RECORD_SCRIPT = `
if redis.call('SISMEMBER', KEYS[1], ARGV[1]) == 0 then
  local attempts = redis.call('INCR', KEYS[2])
  if attempts == 1 then redis.call('EXPIRE', KEYS[2], ARGV[3]) end
  if attempts <= tonumber(ARGV[2]) then redis.call('SADD', KEYS[1], ARGV[1]) end
end
return redis.call('SCARD', KEYS[1])
`;

/** Upstash Redis over its REST API — plain fetch, so no SDK in the bundle. */
function createRedisStore(url, token) {
  const command = async (...args) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(5000),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.error) {
      throw new Error(`Redis ${args[0]} failed: ${body.error ?? res.status}`);
    }
    return body.result;
  };

  return {
    count: async () => Number(await command('SCARD', VISITORS_KEY)),
    record: async (id, rateKey) =>
      Number(
        await command(
          'EVAL',
          RECORD_SCRIPT,
          '2',
          VISITORS_KEY,
          rateKey,
          id,
          String(NEW_VISITORS_PER_IP),
          String(RATE_WINDOW_SECONDS),
        ),
      ),
  };
}

/** Same semantics as the Redis store, held in process memory. Local dev only —
 * serverless instances don't share memory, so this would be wrong in production. */
export function createMemoryStore() {
  const visitors = new Set();
  const attempts = new Map();

  return {
    count: async () => visitors.size,
    record: async (id, rateKey) => {
      if (!visitors.has(id)) {
        const now = Date.now();
        const entry = attempts.get(rateKey);
        const current = entry && entry.resetAt > now ? entry : { n: 0, resetAt: now + RATE_WINDOW_SECONDS * 1000 };
        current.n += 1;
        attempts.set(rateKey, current);
        if (current.n <= NEW_VISITORS_PER_IP) visitors.add(id);
      }
      return visitors.size;
    },
  };
}

/**
 * Accepts either Upstash's own variable names or the ones Vercel's Upstash
 * integration injects. Returns null when unconfigured.
 */
export function createVisitorStore(env) {
  const url = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN;
  return url && token ? createRedisStore(url.replace(/\/+$/, ''), token) : null;
}

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });

async function hashIp(ip) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`craftdyne:${ip}`));
  return Array.from(new Uint8Array(digest).slice(0, 12), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * GET  → `{ count }` without recording anything.
 * POST `{ id }` → records the visitor (if genuine) and returns `{ count }`.
 *
 * @param {Request} request
 * @param {{ store: ReturnType<typeof createVisitorStore>, ip?: string }} options
 */
export async function handleVisitors(request, { store, ip }) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return json(405, { error: 'Method not allowed' }, { Allow: 'GET, POST' });
  }

  if (!store) {
    console.error('Visitor counter: UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are not set.');
    return json(503, { error: 'Visitor counter is not configured' });
  }

  try {
    if (request.method === 'GET') {
      return json(200, { count: await store.count() });
    }

    // Browsers stamp this and pages cannot forge it, so other sites can't make
    // their visitors' browsers inflate our count.
    const fetchSite = request.headers.get('sec-fetch-site');
    if (fetchSite && fetchSite !== 'same-origin') {
      return json(403, { error: 'Cross-site requests are not accepted' });
    }

    const body = await request.json().catch(() => null);
    const id = typeof body?.id === 'string' ? body.id : '';
    if (!VISITOR_ID.test(id)) {
      return json(400, { error: 'A valid visitor id is required' });
    }

    const userAgent = request.headers.get('user-agent') ?? '';
    if (!userAgent || isbot(userAgent)) {
      return json(200, { count: await store.count() });
    }

    const rateKey = RATE_KEY_PREFIX + (await hashIp(ip || 'unknown'));
    return json(200, { count: await store.record(id.toLowerCase(), rateKey) });
  } catch (err) {
    console.error('Visitor counter failed:', err);
    return json(503, { error: 'Visitor counter is temporarily unavailable' });
  }
}
