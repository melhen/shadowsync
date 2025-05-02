# ShadowSync Bot

**Status**: LIVE on Railway, deployed as a persistent worker daemon.

---

## What This Bot Does

- Connects to Telegram via Bot API.
- Handles user rituals, trophies, and responses.
- Uses Firebase Firestore as backend database.

---

## Deployment Overview

- **Hosting Platform**: Railway
- **Node Version**: 18.x
- **Process Type**: Worker (background daemon)
- **Start Script**: `npm run start` → `node bot.js`

---

## Environment Variables

- `BOT_TOKEN` - Telegram Bot token.
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY` (escaped `\\n`)
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_PROVIDER_CERT_URL`
- `FIREBASE_CLIENT_CERT_URL`

All Firebase credentials must be injected via ENV vars (no filesystem reads).

---

## Deployment Ritual

1. Clone repo
2. Install dependencies: `npm install`
3. Set environment variables (see above)

4. Start the bot locally: `npm run start`
5. For production deploy: push to Railway, auto-deploy triggers.

---

## Known Issues

- Free Railway tier has usage caps (~500 hours/month).
- Future migration to Webhooks (instead of polling) may be necessary for scaling.

---

## Future Plans

- Structured logging (levels: info, warn, error).
- Heartbeat pings.
- Frontend dashboard deployment (separate app).

---
