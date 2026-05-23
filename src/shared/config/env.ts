import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_API_TIMEOUT_MS: z.coerce.number().positive().default(10000),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  throw new Error('Invalid environment configuration');
}

export const env = parsedEnv.data;
