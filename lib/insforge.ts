import { createClient } from "@insforge/sdk";

let client: ReturnType<typeof createClient> | null = null;

export function getInsforge() {
  if (client) return client;

  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    throw new Error("Missing InsForge environment variables.");
  }

  client = createClient({ baseUrl, anonKey });
  return client;
}
