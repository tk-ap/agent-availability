(() => {
  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  const text = () => clean(document.body?.innerText || '');
  const provider = location.hostname.includes('cto.new') ? 'cto.new' : 'ChatGPT';
  function extract() {
    const t = text();
    const matches = [];
    const patterns = [
      /(\d+)\s*%[^\n]{0,80}?(?:in|after)\s*(\d+)\s*(hours?|hrs?|h|minutes?|mins?|m)\b/gi,
      /(?:available|resets?|reset)\s*(?:in|after)?\s*(\d+)\s*(hours?|hrs?|h|minutes?|mins?|m)\b[^\n]{0,80}?(\d+)\s*%/gi,
      /(\d+)\s*%\s*(?:available|remaining)/gi
    ];
    for (const re of patterns) {
      let m;
      while ((m = re.exec(t)) && matches.length < 10) {
        const nums = [...m].filter(x => x && /^\d+$/.test(x));
        if (nums.length) matches.push({ text: clean(m[0]), numbers: nums.map(Number) });
      }
    }
    return { provider, url: location.origin, observedAt: new Date().toISOString(), pageTitle: document.title, matches };
  }
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg?.type === 'extract-capacity') { sendResponse(extract()); return true; }
  });
})();
