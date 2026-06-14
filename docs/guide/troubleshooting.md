# Troubleshooting

Find solutions to common issues encountered while setting up, running, or developing CryptoLens.

---

## 🔌 Connection Errors between Phone and Local Server

### The Issue

You start the Expo development server, scan the QR code, but the app fails to load or hangs forever at `0%` or shows a network request timeout error.

### How to Fix

1. **Match Local Network:** Ensure your mobile device and your computer are connected to the exact same Wi-Fi network.
2. **Find Your Computer's Real IP:** Do not use `localhost` or `127.0.0.1` in your frontend `.env` file. These loop back to the mobile phone itself. Find your machine's private LAN IP (e.g. `192.168.1.50` on macOS/Linux via `ifconfig` or `ip a`, or `ipconfig` on Windows).
3. **Bind Wrangler Correctly:** When running the wrangler server, run it with `--ip 0.0.0.0` so it accepts connections from external LAN devices, not just your local machine:
   ```bash
   bunx wrangler dev --ip 0.0.0.0
   ```
4. **Firewall Block:** Check if your computer's firewall is blocking incoming connections on port `8787` (the worker) or `8081` (Metro). Temporarily disable the firewall or add rules to allow traffic on these ports.

---

## 🚫 Regional Price Streaming Failures (Binance WebSockets)

### The Issue

The coin lists and dashboard load successfully, but real-time price updates (flashing green/red) do not start or stop updating.

### Why it Happens

There are two common reasons live price updates (flashing red/green) fail:

1. **Regional Geo-blocking**: CryptoLens streams live price updates directly from the **Binance WebSockets API** on your device. Binance blocks websocket connections originating from certain jurisdictions, such as the United States.
2. **Asset Not Listed on Binance**: Some trending or low-cap coins from CoinGecko are not traded on Binance. Since Binance has no market data or websocket feeds for these pairs, their price will remain static.

### How to Fix

- **Use a VPN:** Connect your mobile device (or development machine if testing on a simulator) to a VPN location where Binance operates (such as Europe or Asia).
- **Verify Network:** Ensure your network does not have firewall rules blocking port `9443` (Binance WebSocket port).

---

## 🧹 Clearing Expo Cache

### The Issue

You modified `.env` variables or updated React Native packages, but the app is still behaving as if it has old configurations.

### How to Fix

Clear the cache of both Bun and Expo to force-reload the environment variables:

```bash
# Start Expo and clear the cache
bun expo start --clear
```

---

## 📦 Missing Native Modules

If you get errors about missing native dependencies (such as Reanimated or Safe Area Context), reinstall compatible package versions:

```bash
npx expo install --fix
```
