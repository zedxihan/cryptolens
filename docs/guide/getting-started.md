---
title: Getting Started with CryptoLens
description: Set up CryptoLens for development or self-hosting, including the React Native app and Cloudflare Workers proxy.
head:
  - - meta
    - name: keywords
      content: cryptolens setup, cryptolens development, cryptolens guide, cloudflare workers deployment
---

# Getting Started

Welcome to **CryptoLens**, a clean, modern, and distraction-free cryptocurrency monitoring dashboard.

This guide will walk you through the architecture of CryptoLens and help you set up both the frontend application and the backend proxy worker for development or self-hosting.

---

## 🏛 Architecture Overview

CryptoLens consists of two main components:

1. **Frontend App:** A high-performance React Native (Expo) mobile application styled with NativeWind v5 (Tailwind CSS v4) and optimized for performance using Shopify's `FlashList`.
2. **Backend Proxy (Worker):** A lightweight serverless Cloudflare Worker built using the Hono framework. It proxies request calls to public crypto APIs (Binance, CoinGecko, SosoValue, CMC) and caches results in Cloudflare KV to avoid hitting rate limits.

---

## 📋 Prerequisites

### ❄️ The Nix Way (Recommended)

If you use **Nix**, the development environment is fully configured in the repository.

- **Nix** with flakes enabled (see [Nix installation guide](https://nixos.org/download/)).
- **direnv** (optional, for automatic environment loading).
- **Expo Go** app (installed on your Android/iOS device for testing).

Simply run `direnv allow` (or `nix develop`) in the root directory to automatically load the correct versions of **Bun**, **Node.js (v22)**, and all development tools.

### 🛠️ The Manual Way

If you are not using Nix, you can **safely ignore** the `flake.nix` and `.envrc` files (there is no need to delete them; they will not affect your workflow). Ensure you have the following installed manually on your local machine:

- **Node.js** (v18 or higher recommended)
- **Bun** (highly recommended package manager and runtime)
- **Git**
- **Expo Go** app (installed on your Android/iOS device for testing)

---

## 🚀 Quick Start Guide

### Step 1: Clone the Repository

Clone the repository and install the dependencies using Bun:

```bash
git clone https://github.com/zedxihan/cryptolens.git
cd cryptolens
bun install
```

### Step 2: Configure and Run the Backend Worker

Navigate to the `worker` directory, configure your environment variables, and start the local Cloudflare Wrangler dev server:

1. Enter the directory:
   ```bash
   cd worker
   ```
2. Create a `.dev.vars` file for local development:
   ```ini
   APP_SECRET=your_custom_secret_key
   # Add any API keys if required by services (e.g., CoinGecko CG_KEY)
   ```
3. Start the wrangler development server (binding to `0.0.0.0` so your mobile device can access it on your local network):
   ```bash
   bunx wrangler dev --ip 0.0.0.0
   ```
4. Note the port (default is `8787`) and find your local computer's IP address (e.g., `192.168.1.15`).

---

### Step 3: Configure the Frontend App

Go back to the root directory and create a `.env` file for the Expo client:

1. Return to the root folder:
   ```bash
   cd ..
   ```
2. Create a `.env` file:
   ```ini
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:8787
   EXPO_PUBLIC_APP_SECRET=your_custom_secret_key # Must match worker's APP_SECRET
   ```

---

### Step 4: Run the Application

Start the Expo CLI bundler:

```bash
bun expo start
```

This will spin up the Metro Bundler and display a QR code in your terminal.

1. Open the **Expo Go** app on your physical device.
2. Scan the QR code.
3. The app will compile and load, fetching real-time market data through your local Cloudflare Worker proxy!

---

## ⏭️ What's Next?

You have successfully set up the application! However, for production deployments or advanced setup options (like tweaking the API rate limits and features), you need to configure the environment properly.

👉 **[Proceed to the Configuration Guide](/guide/config) to finalize your setup.**
