# Agent Control Browser Companion

## Install locally in Chrome

1. Clone/download this repository.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Choose **Load unpacked**.
5. Select the repository's `extension/` folder.
6. Pin **Agent Control Companion**.

## Connect a source

1. Open the ChatGPT or cto.new account you want to track.
2. Make sure the capacity information is visible on the page.
3. Click the Agent Control Companion icon.
4. Enter a friendly account nickname and workspace/interface name.
5. Click **Sync visible capacity**.

The companion reads visible DOM text from the active supported tab only. It does not read passwords, cookies, session tokens, local storage, network traffic, or hidden/private page data.

## Important

The extractor is intentionally conservative. It reports the visible matches it can recognize; it does not invent capacity numbers. Provider UIs can change, so unsupported wording may require an extractor update.

The popup's default endpoint is a placeholder Vercel URL. After Agent Control is deployed, change it to the actual production `/api/sync` URL.
