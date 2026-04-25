# Prompt Design & Classification Strategy

## System Prompt Philosophy

The system prompt drives the classification accuracy. Our current design:

1. **Clear task definition**: Analyze messages, identify intent/sentiment, generate reply
2. **Explicit output format**: JSON-only response with required fields
3. **Intent categories**: Generic intents work well (refund, complaint, inquiry, praise, bug_report)
4. **Sentiment classification**: Three-tier (positive, negative, neutral)
5. **Response tone**: Professional, empathetic, action-oriented

## Current Intents Supported

The prompt naturally understands these intents:
- **refund**: Requests for money back
- **complaint**: Dissatisfaction or negative feedback
- **inquiry**: Questions or information requests
- **praise**: Positive feedback or compliments
- **bug_report**: Technical issues or errors
- **subscription**: Plan/account management
- **order_status**: Questions about delivery/shipping
- **feedback**: General suggestions or comments

*Note: The model is flexible—it can infer other intents too.*

## Sentiment Classification

- **positive**: Satisfied, happy, thankful tone
- **negative**: Angry, frustrated, disappointed tone
- **neutral**: Factual, informational, balanced tone

## Testing & Validation

### Test Cases

| Input | Expected Intent | Expected Sentiment | Notes |
|-------|-----------------|-------------------|-------|
| "I'd like a refund" | refund | neutral | Direct request |
| "This is TERRIBLE!" | complaint | negative | Strong emotion |
| "How do I reset my password?" | inquiry | neutral | Question-based |
| "Amazing service, thank you!" | praise | positive | Enthusiastic |
| "The app keeps crashing when I..." | bug_report | negative | Technical issue |
| "Upgrade my plan to premium" | subscription | neutral | Account request |
| "Where's my order?" | order_status | neutral | Status check |

### Manual Testing Steps

1. Start dev server: `npm run netlify`
2. Open http://localhost:3000
3. Enter each test message
4. Verify intent, sentiment, and reply quality
5. Adjust prompt if results are off

## Prompt Optimization Tips

If classification isn't matching your needs:

### 1. Add domain-specific context
```javascript
const SYSTEM_PROMPT = `You are an intelligent customer support message analyzer for [YOUR_DOMAIN].

You understand these specific intents: [list your intents]
...`
```

### 2. Add examples to prompt
```javascript
const SYSTEM_PROMPT = `...

Examples:
- Message: "My order hasn't arrived in 2 weeks"
  Intent: shipping_delay
  Sentiment: negative
  Reply: "I apologize for the delay. Let me check your order status right away..."
...`
```

### 3. Adjust reply style
Modify the guidelines section:
```javascript
// For curt responses:
"Keep replies to 1 sentence max"

// For verbose responses:
"Provide detailed, step-by-step guidance"

// For specific tone:
"Use a formal/casual/friendly tone"
```

### 4. Add constraints
```javascript
// To prevent certain intents:
"Only use these intents: [list]"

// To prioritize accuracy:
"If unsure about intent, use 'general_inquiry'"
```

## Common Issues & Fixes

### Issue: Wrong intent classification
**Solution**: 
- Add examples to the prompt for that intent
- Be more specific in intent descriptions
- Test with more similar messages to find patterns

### Issue: Generic replies
**Solution**:
- Add domain knowledge to system prompt
- Include industry-specific language
- Provide reply templates/examples

### Issue: Inconsistent sentiment detection
**Solution**:
- Add nuance guide (e.g., "sarcasm = negative")
- Test with mixed-tone messages
- Consider adding "mixed" as fourth sentiment option

### Issue: JSON parsing errors
**Solution**:
- Claude occasionally doesn't return valid JSON
- The backend has a fallback regex parser
- If issues persist, ask Claude to use markdown code blocks

## Performance Metrics

Monitor these for quality:
- **Accuracy**: Does intent match the message?
- **Reply quality**: Is the response helpful and appropriate?
- **Speed**: Does the API respond within 2 seconds?
- **Error rate**: How often does JSON parsing fail?

## Extending Intents

### Add a new intent

1. Update SYSTEM_PROMPT in `netlify/functions/analyze.js`:
```javascript
const SYSTEM_PROMPT = `...
Intent categories:
- refund: requests for money back
- complaint: negative feedback
- [YOUR NEW INTENT]: description
...`
```

2. Test with messages for that intent
3. Adjust reply examples if needed

### Example: Adding "billing_issue"
```javascript
// In SYSTEM_PROMPT:
"billing_issue: questions about charges, subscriptions, invoices, or payment problems"

// Test case:
Message: "I was charged twice for my subscription"
Expected intent: billing_issue
Expected sentiment: negative
```

## A/B Testing Ideas

1. **Prompt A**: Current prompt
2. **Prompt B**: With examples
3. Measure accuracy, reply quality, speed
4. Use results to optimize further

## Advanced: Fine-tuning

If you need perfect accuracy for your domain, consider:
1. Building a dataset of labeled messages
2. Fine-tuning a custom model
3. Using prompt engineering with examples
4. Implementing a feedback loop (user corrections → better prompts)

## Current Limitations

- Claude sometimes returns extra text before/after JSON (has fallback parser)
- Intent categories are generic (works for most use cases)
- No historical context (each message analyzed independently)
- Reply generation is template-based (not personalized)

## Future Enhancements

- [ ] Store and learn from user feedback
- [ ] Add conversation history support
- [ ] Implement urgency scoring
- [ ] Add priority/severity levels
- [ ] Multi-language support
- [ ] Custom intent training
