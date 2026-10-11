import { z } from "zod";

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  ADMIN_PASSWORD_HASH: z.string().min(1, "ADMIN_PASSWORD_HASH is required"),
  ADMIN_SECRET: z.string().min(32, "ADMIN_SECRET must be at least 32 characters"),

  GOOGLE_APPS_SCRIPT_URL: z.string().url().optional(),

  LLM_PROVIDER: z.enum(["groq", "openrouter", "ollama"]).default("groq"),
  LLM_MODEL: z.string().default("openai/gpt-oss-20b"),
  LLM_API_KEY: z.string().optional(),
  LLM_BASE_URL: z.string().url().optional(),

  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_CHAT_ID: z.string().optional(),
  SLACK_WEBHOOK_URL: z.string().url().optional(),

  AUTO_APPROVE_COMMENTS: z.enum(["true", "false"]).default("false"),

  NEXT_PUBLIC_SITE_URL: z.string().url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let _env: ServerEnv | undefined;

export function env(): ServerEnv {
  if (_env) return _env;
  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`❌ Missing or invalid environment variables:\n${formatted}`);
  }
  _env = result.data;
  return _env;
}
