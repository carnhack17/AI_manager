# ⚡ AI Inbox Manager

A lightweight, serverless tool that analyzes incoming messages and generates intelligent responses using Claude AI.

**What it does:**
- Receives a message (email, chat, form)
- Analyzes the intent and sentiment
- Generates a professional, contextual reply
- Returns results instantly

---

## 🚀 Quick Start (2 minutes)

### 1. Get Your API Key
Visit [console.anthropic.com](https://console.anthropic.com/) and create an API key.

### 2. Set Up Locally
```bash
# Install dependencies
npm install

# Create .env file and add your API key
cp .env.example .env
# Edit .env: ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Start development server
npm run netlify
```

### 3. Open in Browser
Visit http://localhost:3000 and start analyzing messages!

---

## 📊 Example Usage

**Input:**
```
I've been waiting 2 weeks for my order and it still hasn't arrived. 
This is unacceptable and I want a refund.
```

**Output:**
```json
{
  "intent": "complaint",
  "sentiment": "negative",
  "reply": "I sincerely apologize for the delayed delivery. I understand your frustration. Let me investigate your order status immediately and either expedite delivery or process a refund. Could you please provide your order number?"
}
```

---

## 🏗️ Architecture

```
┌─────────────────────┐
│   React Frontend    │  (localhost:3000)
│  • Text input       │
│  • Result display   │
└──────────┬──────────┘
           │ HTTP POST
           ▼
┌─────────────────────┐
│ Netlify Function    │  (/api/analyze)
│ • Validate input    │
│ • Call Claude API   │
│ • Parse response    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Claude API         │  (Anthropic)
│ • Classify intent   │
│ • Detect sentiment  │
│ • Generate reply    │
└─────────────────────┘
```

**Tech Stack:**
- Frontend: React 18 + Axios
- Backend: Netlify Functions (Node.js)
- LLM: Anthropic Claude API
- Deployment: Netlify

---

## 📁 Project Structure

```
ai-inbox-manager/
├── public/
│   └── index.html                    # HTML entry point
├── src/
│   ├── index.js                      # React entry point
│   ├── App.jsx                       # Main app component
│   ├── App.css                       # App styles
│   ├── components/
│   │   └── InboxAnalyzer.jsx         # Main analyzer component
│   └── styles/
│       └── InboxAnalyzer.css         # Component styles
├── netlify/
│   └── functions/
│       ├── analyze.js                # Backend API function
│       └── package.json              # Function dependencies
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── package.json                      # Root dependencies
├── netlify.toml                      # Netlify config
├── ARCHITECTURE.md                   # System design
├── SETUP.md                          # Detailed setup guide
├── PROMPT_DESIGN.md                  # Prompt optimization
└── README.md                         # This file
```

---

## 🔧 Development

### Available Commands

```bash
# Install dependencies
npm install

# Start local dev server (React + Netlify Functions)
npm run netlify

# Build for production
npm run build

# Start production build locally
npm start
```

### Environment Variables

**Local (.env file):**
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
REACT_APP_API_URL=http://localhost:8888/api
```

**Production (Netlify Dashboard):**
- Go to Site settings → Build & deploy → Environment
- Add: `ANTHROPIC_API_KEY` = your API key
- That's it! Frontend automatically uses correct URL.

---

## 📡 API Reference

### POST /api/analyze

**Request:**
```bash
curl -X POST http://localhost:8888/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "I want a refund"}'
```

**Response (200 OK):**
```json
{
  "intent": "refund",
  "sentiment": "neutral",
  "reply": "Thank you for reaching out. We'd be happy to help with your refund. Could you provide your order number?"
}
```

**Error Response (400):**
```json
{
  "error": "Message is required and must be a non-empty string"
}
```

---

## 🎯 Supported Intents

The system recognizes these message types:

| Intent | Example |
|--------|---------|
| **refund** | "I want my money back" |
| **complaint** | "This product is terrible!" |
| **inquiry** | "When will you restock?" |
| **praise** | "Great service, thanks!" |
| **bug_report** | "Your app keeps crashing" |
| **subscription** | "How do I upgrade my plan?" |
| **order_status** | "Where's my delivery?" |
| **feedback** | "Here's a suggestion..." |

*Note: The AI is flexible and can infer other intents too.*

---

## 🚀 Deploy to Netlify

### Step 1: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository

### Step 2: Configure Build Settings
- Build command: `npm run build`
- Publish directory: `build`
- Functions directory: `netlify/functions`

### Step 3: Add Environment Variables
1. Go to Site settings → Build & deploy → Environment
2. Add new variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your API key from Anthropic

### Step 4: Deploy
Netlify auto-deploys on every push to `main`. Your site will be live at `https://your-site.netlify.app`

---

## 🛡️ Security

✅ API key **never exposed** in frontend code
✅ API key stored in backend environment variables only
✅ `.env` file is in `.gitignore` (never committed)
✅ No credentials in version control
✅ CORS properly configured for Netlify

**Best Practices:**
- Never paste API keys in code
- Use `.env.example` as template (without real keys)
- Rotate API keys periodically
- Monitor API usage for unauthorized access

---

## 🧪 Testing

### Manual Testing

1. **Test intent classification:**
   - "I want a refund" → should classify as `refund`
   - "This is terrible" → should classify as `complaint`
   - "How do I upgrade?" → should classify as `inquiry`

2. **Test sentiment:**
   - Positive messages → `positive` sentiment
   - Negative messages → `negative` sentiment
   - Neutral messages → `neutral` sentiment

3. **Test reply quality:**
   - Replies should be 2-3 sentences
   - Should be professional and empathetic
   - Should suggest next steps

### Debugging

```bash
# View Netlify Functions logs
netlify dev --debug

# Check environment variables are loaded
# Open browser console (F12) and check for errors
```

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** — Detailed setup & troubleshooting
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System design & API contract
- **[PROMPT_DESIGN.md](./PROMPT_DESIGN.md)** — Prompt optimization & testing

---

## 🔄 Next Steps

### Phase 1: MVP (Current) ✅
- ✅ Message analyzer with Claude
- ✅ Intent & sentiment classification
- ✅ Smart reply generation
- ✅ Clean UI
- ✅ Deployed on Netlify

### Phase 2: Integration
- [ ] Gmail API integration (analyze real inbox)
- [ ] Slack integration
- [ ] Email forwarding support
- [ ] Message history

### Phase 3: Enhancement
- [ ] Custom intent training
- [ ] User feedback loop
- [ ] Message templates
- [ ] A/B testing of replies
- [ ] Analytics dashboard
- [ ] Multi-language support

### Phase 4: Enterprise
- [ ] Team collaboration
- [ ] Role-based permissions
- [ ] Custom models
- [ ] Audit logs
- [ ] SLA monitoring

---

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY not found"
→ Create `.env` file and restart dev server

### "Cannot POST /api/analyze"
→ Make sure Netlify Functions are running (`npm run netlify`)

### "Invalid API key"
→ Check your key at [console.anthropic.com](https://console.anthropic.com/)

### "JSON parse error"
→ Claude might not return valid JSON. The backend has a fallback parser.

### Frontend shows 500 error
→ Check Netlify logs: `netlify dev --debug`

---

## 📖 Learn More

- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Netlify Functions Guide](https://docs.netlify.com/functions/overview/)
- [React Documentation](https://react.dev/)

---

## 💬 Feedback

This tool focuses on **efficacy**—building something that works well and serves real needs.

If you find issues or have ideas:
1. Test thoroughly before reporting
2. Include the exact message that caused the issue
3. Share the error message or logs
4. Suggest a solution if you have one

---

## 📄 License

This project is provided as-is for your use.

---

**Ready to get started?** See [SETUP.md](./SETUP.md) for step-by-step instructions.

⚡ Built with Anthropic Claude & Netlify
