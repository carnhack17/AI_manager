# Setup Guide - AI Inbox Manager

## Prerequisites
- Node.js 16+ and npm installed
- An Anthropic API key (get one at https://console.anthropic.com/)
- A GitHub account and Netlify account (for production deployment)

## Local Development Setup

### 1. Clone & Install Dependencies
```bash
cd ai-inbox-manager
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
```

### 3. Install Netlify CLI (for local development)
```bash
npm install -g netlify-cli
```

### 4. Start Development Server
```bash
# This runs both React frontend and Netlify Functions locally
npm run netlify
```

This starts:
- **Frontend**: http://localhost:3000 (React app)
- **Backend**: http://localhost:8888 (Netlify Functions)

### 5. Test Locally
1. Open http://localhost:3000 in your browser
2. Enter a sample message (e.g., "Hello, I would like a refund")
3. Click "Analyze Message"
4. You should see the intent, sentiment, and suggested reply

## Troubleshooting Local Development

### Issue: "ANTHROPIC_API_KEY not found"
**Solution**: Make sure your `.env` file exists and contains your API key. Restart the dev server after creating/updating `.env`.

### Issue: "Cannot find module '@anthropic-ai/sdk'"
**Solution**: Run `npm install` in the root directory to install dependencies.

### Issue: CORS errors in browser
**Solution**: The local dev server should handle this. If not, ensure you're using the correct port (3000 for frontend, 8888 for functions).

### Issue: 500 error when calling API
**Solution**: Check the Netlify CLI logs. Ensure your ANTHROPIC_API_KEY is valid and the API key hasn't expired.

## Production Deployment to Netlify

### 1. Prepare Your Repository
```bash
# Make sure everything is committed
git add .
git commit -m "Initial AI Inbox Manager setup"
git push origin main
```

### 2. Connect to Netlify
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select your GitHub repository
4. Choose branch: `main`
5. Build command: `npm run build`
6. Publish directory: `build`

### 3. Set Environment Variables in Netlify
1. Go to your site settings
2. Navigate to **Site settings** → **Build & deploy** → **Environment**
3. Click "Edit variables"
4. Add new variable:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your Anthropic API key
5. Save

### 4. Deploy
1. Netlify auto-deploys when you push to `main`
2. Or manually trigger a deploy from the Netlify dashboard
3. Your site will be live at `https://your-site-name.netlify.app`

## API Endpoints

### POST /api/analyze
Analyzes a message and returns intent, sentiment, and suggested reply.

**Request:**
```json
{
  "message": "Hello, I would like a refund"
}
```

**Response (200):**
```json
{
  "intent": "refund",
  "sentiment": "neutral",
  "reply": "Thank you for reaching out. We'd be happy to help process your refund. Could you please provide your order number?"
}
```

**Error Response (400/500):**
```json
{
  "error": "Error description"
}
```

## Testing Different Intents

Try these sample messages to test various intents:

| Message | Expected Intent |
|---------|-----------------|
| "I want a refund" | refund |
| "This product is terrible!" | complaint |
| "When will you restock?" | inquiry |
| "Great service, highly recommend!" | praise |
| "Your app keeps crashing" | bug_report |
| "How do I upgrade my plan?" | subscription |
| "I never received my order" | complaint |
| "Thanks for the quick shipping!" | praise |

## Project Structure Reference

```
ai-inbox-manager/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── index.js                # React app entry point
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styles
│   ├── components/
│   │   └── InboxAnalyzer.jsx   # Main analyzer component
│   └── styles/
│       └── InboxAnalyzer.css   # Component styles
├── netlify/
│   └── functions/
│       ├── analyze.js          # Backend API function
│       └── package.json        # Function dependencies
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── netlify.toml               # Netlify configuration
├── ARCHITECTURE.md            # Architecture documentation
└── SETUP.md                   # This file
```

## Next Steps

1. **Customize the prompt** (`netlify/functions/analyze.js`): Modify `SYSTEM_PROMPT` to better fit your use case
2. **Expand intent types**: Add more specific intents for your domain
3. **Connect to email**: Integrate with Gmail API to analyze real inbox messages
4. **Add persistence**: Store analyzed messages in a database
5. **Enhance UI**: Add more features like message history, batch analysis

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Netlify Functions logs: `netlify dev --debug`
3. Check your Anthropic API key validity at https://console.anthropic.com/
4. Review the ARCHITECTURE.md for system design details

## Security Checklist

✅ API key is in backend only (process.env)
✅ No API key in frontend code (.jsx files)
✅ .env file is in .gitignore
✅ .env.example contains no real credentials
✅ API key is not logged or exposed in errors
✅ CORS headers are properly configured

Never commit your .env file or expose your API key!
