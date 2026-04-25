import { Anthropic } from "@anthropic-ai/sdk";

// Initialize Anthropic client
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompt for classification and response generation
const SYSTEM_PROMPT = `You are an intelligent email/message analyzer assistant.

Your task is to:
1. Analyze the user's message
2. Identify the primary INTENT (e.g., refund, complaint, inquiry, praise, bug_report, subscription, etc.)
3. Determine the SENTIMENT (positive, negative, or neutral)
4. Generate a helpful, professional reply

You MUST respond with ONLY valid JSON, no other text. Use this exact format:
{
  "intent": "refund",
  "sentiment": "neutral",
  "reply": "Thank you for reaching out. We'd be happy to help with your refund request. Could you please provide your order number?"
}

Guidelines:
- Keep the reply professional and empathetic
- Keep the reply concise (2-3 sentences max)
- Match the tone of the original message
- Be helpful and action-oriented
- If sentiment is negative, acknowledge the concern
- If it's a request, provide clear next steps`;

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Message is required and must be a non-empty string" }),
      };
    }

    // Call Anthropic Claude API
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: message.trim(),
        },
      ],
    });

    // Extract the text response
    const textContent = response.content.find((block) => block.type === "text");
    if (!textContent) {
      throw new Error("No text content in response");
    }

    // Parse JSON response
    let result;
    try {
      result = JSON.parse(textContent.text);
    } catch (parseError) {
      // If Claude doesn't return valid JSON, try to extract it
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON response from Claude");
      }
    }

    // Validate result structure
    if (!result.intent || !result.sentiment || !result.reply) {
      throw new Error("Response missing required fields");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error in analyze function:", error);

    const statusCode = error.status || 500;
    const errorMessage = error.message || "Failed to analyze message";

    return {
      statusCode,
      body: JSON.stringify({ error: errorMessage }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
