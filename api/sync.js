// Vercel serverless endpoint for Live Source Sync.
// The browser companion posts normalized observations here. This intentionally
// accepts availability data only; it never receives passwords, cookies, or tokens.
let latest = globalThis.__agentControlLatest || new Map();
globalThis.__agentControlLatest = latest;

const AILHAT_STATE_URL = 'https://ailhat.vercel.app/api/product-state';

async function getAilhatState() {
  try {
    const response = await fetch(AILHAT_STATE_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Ailhat state ${response.status}`);
    return await response.json();
  } catch (error) {
    return {
      ok: false,
      source: AILHAT_STATE_URL,
      error: String(error?.message || error),
      observed_at: null
    };
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const values = [...latest.values()].sort((a, b) => (b.observedAt || 0) - (a.observedAt || 0));
    const ailhat = await getAilhatState();
    return res.status(200).json({ ok: true, sources: values, productState: { ailhat } });
  }
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  const body = req.body || {};
  if (!body.provider || !body.account) return res.status(400).json({ ok: false, error: 'provider and account are required' });
  const source = {
    id: String(body.id || `${body.provider}:${body.account}:${body.iface || 'default'}`),
    provider: String(body.provider),
    account: String(body.account),
    iface: String(body.iface || 'Unknown'),
    cap: Number.isFinite(Number(body.cap)) ? Math.max(0, Math.min(100, Number(body.cap))) : null,
    next: Number.isFinite(Number(body.next)) ? Number(body.next) : null,
    use: String(body.use || 'General work'),
    observedAt: Date.now(),
    method: String(body.method || 'browser'),
    confidence: String(body.confidence || 'medium')
  };
  latest.set(source.id, source);
  return res.status(200).json({ ok: true, source });
}
