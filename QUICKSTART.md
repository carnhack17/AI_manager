# Quick Start Checklist

Complete these steps in order to get AI Inbox Manager running.

## ✅ Prerequisites (5 min)
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Anthropic API key (get at [console.anthropic.com](https://console.anthropic.com/))

## ✅ Setup (5 min)

```bash
# 1. Navigate to project directory
cd ai-inbox-manager

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env and add your API key
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
```

## ✅ Run Locally (2 min)

```bash
# Start development server
npm run netlify

# Open browser
# → http://localhost:3000
```

## ✅ Test It (2 min)

1. Enter message: `"I want a refund"`
2. Click "Analyze Message"
3. Should see: `intent: refund, sentiment: neutral, reply: [helpful message]`

## ✅ Deploy to Netlify (5 min)

1. Push to GitHub: `git push origin main`
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → select your repo
4. Build command: `npm run build`
5. Publish: `build`
6. Set environment: `ANTHROPIC_API_KEY=sk-ant-xxx`
7. Deploy ✅

## 🆘 If Something Breaks

| Issue | Fix |
|-------|-----|
| `Command not found: npm` | Install Node.js from nodejs.org |
| `ANTHROPIC_API_KEY not found` | Run `cp .env.example .env` and edit it |
| `Error connecting to API` | Check API key is valid |
| `Cannot find module` | Run `npm install` |
| `Port 3000 already in use` | Kill process or use different port |

## 📚 Documentation

- **Full Setup**: See [SETUP.md](./SETUP.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Prompt Tuning**: See [PROMPT_DESIGN.md](./PROMPT_DESIGN.md)

## ⚡ You're Done!

**Time elapsed:** ~20 minutes  
**Status:** ✅ Running locally at http://localhost:3000
