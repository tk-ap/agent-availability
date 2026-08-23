# Agent Control Live Source Sync

## Install

1. Download/clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Choose **Load unpacked**.
5. Select the repository's `live-sync` folder.
6. Pin **Agent Control Live Source Sync** to the browser toolbar.

## Connect a source

1. Open an authenticated ChatGPT or cto.new page in the same browser.
2. Open the Agent Control extension from the toolbar.
3. Set the Dashboard URL to your deployed Agent Control URL.
4. Click **Sync visible availability**.
5. Return to Agent Control → **Sources** and use **Sync now**.

The extension reads only text visible on the active page. It does not collect passwords, cookies, session tokens, local/private storage, or network traffic.

## Important

The extension is intentionally conservative: if it cannot confidently recognize an availability value, it reports no observation rather than inventing one.

## Deploying the dashboard

The extension's dashboard URL defaults to the original project URL, but you should replace it with your current Vercel deployment URL before syncing.
