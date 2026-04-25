# AI Inbox Manager - Architecture

## Overview
A lightweight, serverless tool that analyzes incoming messages (email, chat, forms) and generates intelligent responses using the Anthropic Claude API.

## Architecture Diagram
```
User Input (Frontend)
        ↓
React Component (text input + submit)
        ↓
HTTP POST → /api/analyze
        ↓
Netlify Function (backend)
        ↓
Anthropic Claude API
        ↓
JSON Response (intent, sentiment, reply)
        ↓
Display on Frontend
```

## Tech Stack
- **Frontend**: React 18
- **Backend**: Netlify Functions (serverless)
- **LLM API**: Anthropic Claude
- **HTTP Client**: Axios
- **Hosting**: Netlify

## Project Structure
```
ai-inbox-manager/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.jsx
│   └── components/
│       └── InboxAnalyzer.jsx
├── netlify/
│   └── functions/
│       └── analyze.js
├── .env.example
├── .gitignore
├── netlify.toml
├── package.json
└── ARCHITECTURE.md
```

## API Contract

### Request
```
POST /api/analyze
Content-Type: application/json

{
  "message": "Hello, I would like a refund"
}
```

### Response (200 OK)
```json
{
  "intent": "refund",
  "sentiment": "neutral",
  "reply": "Thank you for reaching out. We'd be happy to help process your refund. Could you please provide your order number?"
}
```

### Error Response (400/500)
```json
{
  "error": "Error message describing what went wrong"
}
```

## Environment Variables
- **ANTHROPIC_API_KEY**: Your Anthropic API key (never expose in frontend)
- **REACT_APP_API_URL**: Backend API URL (optional, for custom deployments)

## Security Considerations
✅ API key stored in backend only (process.env)
✅ No credentials in frontend code
✅ No credentials in version control (.gitignore)
✅ Netlify environment variables for production

## Development Workflow
1. Copy `.env.example` to `.env` and add your ANTHROPIC_API_KEY
2. Run `npm install`
3. Run `npm run netlify` to start dev server (runs React + Netlify Functions)
4. Navigate to http://localhost:3000
5. Test the analyzer with sample messages

## Deployment to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Netlify auto-builds and deploys
