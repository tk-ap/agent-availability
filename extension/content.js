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

    // ChatGPT-style capacity panel observed from supplied realtime screenshots.
    // Important: this UI describes rolling limits, not a fixed midnight reset.
    const usageMatch = lower.match(/daily\s+usage\s+(\d+)\s*%/i);
    const freesSoonMatch = lower.match(/frees\s+up\s+soon\s*\+?(\d+)\s*%/i);
    const rollingWindowMatch = lower.match(/usage\s+limits\s+are\s+based\s+on\s+rolling\s+24\s+hour\s+and\s+7\s+day\s+windows/i);
    const noFixedReset = /there\s+is\s+no\s+fixed\s+reset\s+time/i.test(lower);

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

    // Capture account identity and plan from the visible billing/usage card.
    const accountMatch = t.match(/(?:Pro\s+trial|Plus|Pro|Team|Enterprise)[^\n]{0,100}?([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i);
    const planMatch = t.match(/\b(Pro\s+trial|Plus|Pro|Team|Enterprise)\b/i);

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
    const scheduledReturnPercent = freesSoonMatch ? Number(freesSoonMatch[1]) : null;
    const totalScheduledReturnPercent = futureWindows.reduce((sum, x) => sum + x.amountPercent, 0);

    return {
      provider,
      url: location.origin,
      observedAt: new Date().toISOString(),
      pageTitle: document.title,
      sourceMode: 'visible-dom',
      accountEmail: accountMatch ? accountMatch[1] : null,
      plan: planMatch ? planMatch[1] : null,
      dailyUsagePercent,
      currentAvailablePercent,
      scheduledReturnPercent,
      futureWindows,
      totalScheduledReturnPercent,
      limitModel: rollingWindowMatch ? 'rolling-24h-and-7d' : 'unknown',
      hasFixedReset: rollingWindowMatch ? !noFixedReset : null,
      capacitySemantics: rollingWindowMatch ? 'rolling-window-usage' : 'unknown',
      modelRatesDiffer: /models\s+use\s+your\s+limit\s+at\s+different\s+rates/i.test(lower),
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
