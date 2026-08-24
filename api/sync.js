// Agent Control portfolio sync endpoint.
// Browser companion observations are merged with the shared product-state contract.
let latest = globalThis.__agentControlLatest || new Map();
globalThis.__agentControlLatest = latest;

const AILHAT_STATE_URL = 'https://ailhat.vercel.app/api/product-state';

const PORTFOLIO = [
  { id: 'ailhat', name: 'Ailhat', url: 'https://ailhat.vercel.app/', role: 'Product intelligence', scope: 'portfolio' },
  { id: 'alvira', name: 'ALVIRA', url: 'https://alviratech.vercel.app/', role: 'Context intelligence', scope: 'portfolio' },
  { id: 'ledgato', name: 'Ledgato', url: 'https://ledgato.vercel.app/', role: 'Authorization / security control plane', scope: 'shared-builder' },
  { id: 'bridge', name: 'ALVIRA Bridge', url: 'https://alviratech-bridge.vercel.app/', role: 'Ecosystem integration', scope: 'shared-builder' }
];

async function getAilhatState() {
  try {
    const response = await fetch(AILHAT_STATE_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Ailhat state ${response.status}`);
    return await response.json();
  } catch (error) {
    return { ok: false, source: AILHAT_STATE_URL, error: String(error?.message || error), observed_at: null };
  }
}

async function probeSite(site) {
  const started = Date.now();
  try {
    const response = await fetch(site.url, { redirect: 'follow', cache: 'no-store' });
    return { ...site, status: response.ok ? 'online' : 'degraded', http: response.status, latency_ms: Date.now() - started, checked_at: new Date().toISOString() };
  } catch (error) {
    return { ...site, status: 'unreachable', http: null, latency_ms: Date.now() - started, checked_at: new Date().toISOString(), error: String(error?.message || error) };
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const values = [...latest.values()].sort((a, b) => (b.observedAt || 0) - (a.observedAt || 0));
    const [ailhat, ...sites] = await Promise.all([getAilhatState(), ...PORTFOLIO.map(probeSite)]);
    return res.status(200).json({
      ok: true,
      sources: values,
      portfolio: sites,
      productState: { ailhat },
      sharedCapacity: {
        id: 'cto.new:builder',
        provider: 'cto.new',
        account: 'Builder',
        consumers: ['ledgato', 'bridge'],
        rule: 'Ledgato and ALVIRA Bridge consume the same real-time execution bucket.'
      }
    });
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
