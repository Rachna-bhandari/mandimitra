# 🌾 MandiMitra

### *AI-Powered Mandi Price Forecaster for Mountain Farmers*

> Empowering village-level coordinators in Uttarakhand to make smarter selling decisions using live government mandi data and AI-generated advisories.

---

## 🚩 The Problem

Small-hold farmers in Kedarnath Valley harvest crops without knowing mandi prices.
By the time they reach Rudraprayag or Haldwani, they must accept whatever the middleman quotes — with no data, no forecast, no leverage.

---

## 💡 The Solution

**MandiMitra** fetches live mandi prices, visualizes 2-week trends, and delivers an AI advisory — *hold, sell, or reroute* — in plain Hindi/English, shareable instantly via WhatsApp.

---

## ✨ Features

| # | Feature | Description |
|---|---|---|
| 1 | 📊 Live Price Lookup | Real-time mandi prices via Agmarknet / data.gov.in API |
| 2 | 📈 Trend Chart | 2-week price trend visualized with Recharts |
| 3 | 🤖 AI Advisory | Claude API generates hold/sell/reroute recommendation |
| 4 | 🌾 Crop & Mandi Selector | Dropdowns for crop type and nearest mandi |
| 5 | 📲 WhatsApp Card Export | One-tap shareable advisory card for farmers |

---

## 🛠️ Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| AI API | Anthropic Claude API (Haiku) |
| Live Data | Agmarknet / data.gov.in |
| Backend | Express.js (Node) |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure
## How to Run Backend Locally

1. Go to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with `PORT=5000`
4. Start server: `npm run dev`
5. Server runs at http://localhost:5000

### API Endpoints
- GET /api/prices
- GET /api/prices/:id
- POST /api/prices
- PUT /api/prices/:id
- DELETE /api/prices/:id
- GET /api/search?crop=
