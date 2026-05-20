# Configuration & Deployment

This page explains how to configure and deploy the CryptoLens frontend and backend.

---

## 🔑 Environment Variables

Both the mobile application and the Cloudflare Worker rely on environment variables to communicate securely and fetch data.

### Frontend App (`.env`)

Create a `.env` file in the root of the project:

```ini
# The URL of your deployed or local Cloudflare Worker backend
EXPO_PUBLIC_API_URL=https://your-worker.your-subdomain.workers.dev

# Secret key matching the worker's APP_SECRET to secure requests
EXPO_PUBLIC_APP_SECRET=your_super_secret_token
```

### Backend Worker Secrets (`.dev.vars` / Wrangler Secrets)

For local development, create `worker/.dev.vars`:

```ini
APP_SECRET=your_super_secret_token
CG_KEY=your_coingecko_api_key
# Additional keys as required by worker integrations
```

---

## ⚡ Backend Worker Deployment

The backend worker acts as a proxy cache and is designed to deploy seamlessly to **Cloudflare Workers**.

### 1. Login to Cloudflare CLI

Authenticate Wrangler with your Cloudflare account:

```bash
cd worker
bunx wrangler login
```

### 2. Configure `wrangler.toml`

Verify the `wrangler.toml` configuration matches your preferences (e.g., compatibility dates, name, KV namespace bindings).

### 3. Set Production Secrets

Upload your secret tokens securely to Cloudflare:

```bash
bunx wrangler secret put APP_SECRET
# Enter your super secret token when prompted

bunx wrangler secret put CG_KEY
# Enter your CoinGecko API key
```

### 4. Deploy the Worker

Run the deployment command:

```bash
bunx wrangler deploy
```

Once deployment is complete, Wrangler will output your production Worker URL (e.g., `https://cryptolens-worker.username.workers.dev`). Update your frontend `.env` file with this URL.

---

## 🛡 Security Best Practices

- **Never Commit Secrets:** Ensure `.env` and `worker/.dev.vars` are added to your `.gitignore` file.
- **Rotate keys:** Rotate your `APP_SECRET` regularly. If the secret is leaked, anyone can query your proxy, leading to potential exhaustion of your CoinGecko/CoinMarketCap API limits.
- **IP Binding:** When developing locally, only bind Wrangler to `0.0.0.0` inside safe private local networks.
