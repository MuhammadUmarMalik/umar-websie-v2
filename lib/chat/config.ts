export const CHAT_CONFIG = {
  maxInputLength: 500,
  maxOutputTokens: 512,
  maxHistoryMessages: 8,
  rateLimitPerMinute: 10,
  rateLimitWindowMs: 60_000,
} as const;

export function getLLMConfig() {
  return {
    provider: process.env.LLM_PROVIDER || "groq",
    model: process.env.LLM_MODEL || "openai/gpt-oss-20b",
    apiKey: process.env.LLM_API_KEY || "",
    baseUrl:
      process.env.LLM_BASE_URL ||
      providerBaseUrl(process.env.LLM_PROVIDER || "groq"),
  };
}

function providerBaseUrl(provider: string): string {
  switch (provider) {
    case "groq":
      return "https://api.groq.com/openai/v1";
    case "openrouter":
      return "https://openrouter.ai/api/v1";
    case "ollama":
      return "http://localhost:11434/v1";
    default:
      return "https://api.groq.com/openai/v1";
  }
}
