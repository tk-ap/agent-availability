(() => {
  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  const rawText = () => document.body?.innerText || '';
  const text = () => clean(rawText());
  const provider = location.hostname.includes('cto.new') ? 'cto.new' : 'ChatGPT';

  function parseHours(value, unit) {
    const n = Number(value);
    return /^m/i.test(unit) ? n / 60 : n;
  }

  function extract() {
    const raw = rawText();
    const t = clean(raw);
    const lower = t.toLowerCase();

    // ChatGPT-style capacity panel observed from the supplied realtime screenshots:
    // "DAILY USAGE 100%" + "FREES UP SOON +100%" followed by rows such as
    // "+13% ... in 9 hours". Treat this as exhausted-now with scheduled capacity returns.
    const usageMatch = lower.match(/daily\s+usage\s+(\d+)\s*%/i);
    const freesSoonMatch = lower.match(/frees\s+up\s+soon\s*\+?(\d+)\s*%/i);
    const futureWindows = [];
    const rowRe = /\+(\d+)\s*%\s+(?:in|after)\s+(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|m)\b/gi;
    let row;
    while ((row = rowRe.exec(t)) && futureWindows.length < 20) {
      futureWindows.push({
        amountPercent: Number(row[1]),
        inHours: parseHours(row[2], row[3]),
        raw: clean(row[0])
      });
    }

    // Generic capacity patterns for other providers/interfaces.
    const matches = [];
    const patterns = [
      /(\d+)\s*%[^\n]{0,80}?(?:in|after)\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|m)\b/gi,
      /(?:available|resets?|reset)\s*(?:in|after)?\s*(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|minutes?|mins?|m)\b[^\n]{0,80}?(\d+)\s*%/gi,
      /(\d+)\s*%\s*(?:available|remaining)/gi
    ];
    for (const re of patterns) {
      let m;
      while ((m = re.exec(t)) && matches.length < 20) {
        const nums = [...m].filter(x => x && /^\d+(?:\.\d+)?$/.test(x));
        if (nums.length) matches.push({ text: clean(m[0]), numbers: nums.map(Number) });
      }
    }

    const dailyUsagePercent = usageMatch ? Number(usageMatch[1]) : null;
    const currentAvailablePercent = dailyUsagePercent !== null ? Math.max(0, 100 - dailyUsagePercent) : null;

    return {
      provider,
      url: location.origin,
      observedAt: new Date().toISOString(),
      pageTitle: document.title,
      sourceMode: 'visible-dom',
      dailyUsagePercent,
      currentAvailablePercent,
      scheduledReturnPercent: freesSoonMatch ? Number(freesSoonMatch[1]) : null,
      futureWindows,
      matches
    };
  }

  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'extract-capacity') {
      sendResponse(extract());
      return true;
    }
  });
})();
