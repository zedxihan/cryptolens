# Privacy Policy

**Effective Date:** May 20, 2026

At CryptoLens, we believe in privacy as a fundamental right. This Privacy Policy details our approach to data privacy and explains the minimal interactions the CryptoLens mobile application and backend worker have with your information.

---

## 🔒 Personal Data Collection

**Currently, CryptoLens does not require, collect, or store any personal data.**

- **Current State (No Accounts):** You do not need to create an account, log in, or provide any personal details to use the core application. Your settings are saved directly on your local device storage (`AsyncStorage`).
- **Future Updates (Accounts & Databases):** We plan to introduce optional user accounts and database synchronization in future updates. At that time, we may collect minimal necessary information (such as an email address) to facilitate login and data syncing. Any such data collection will be strictly optional and transparent.
- **No Analytics:** We do not embed telemetry trackers, advertising IDs, crashlytics reporting, or analytical scripts in our client-side application.

---

## ☑️ User Consent

By accessing, downloading, or using the CryptoLens application, you signify your acceptance of this Privacy Policy and agree to our [Terms of Service](/terms). If you do not agree to this policy, please do not use our application.

---

## 🌐 Network Traffic & Third-Party APIs

To display cryptocurrency price tickers, ETF data, and fear/greed charts, the application connects to external web services.

1. **Binance WebSocket Feed:**
   - The app establishes a direct WebSocket connection from your mobile device to Binance's streaming endpoint to retrieve real-time price feeds.
   - Binance receives your device's public IP address as part of standard TCP network Handshakes.

2. **Self-Hosted / Proxy Workers:**
   - Other data points (like CoinGecko or ETF metrics) are requested via the backend Cloudflare Worker.
   - If you use the developer's default public worker endpoint, requests are received by the worker proxy. Standard request metadata (IP address, User-Agent) is temporarily visible to Cloudflare logs during transmission but is not harvested or sold.
   - If you self-host the worker, all traffic flows through your own Cloudflare account.

---

## 🍪 Cookies and Local Storage

CryptoLens does not use advertising cookies. We only use local device storage to preserve your preferences:

- Selected currency pairs.
- Watchlist and pinned coins.
- Theme preferences (Light/Dark mode).

---

## 📜 Changes to This Policy

We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.

---

## ✉️ Contact

If you have any questions or feedback regarding our privacy practices, you can open an issue on our [GitHub Repository](https://github.com/zedxihan/cryptolens).
