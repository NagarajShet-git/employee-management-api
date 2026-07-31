import dotenv from "dotenv";
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number(),
    MONGO_URI: z.string()
})

const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error(result.error.format());
    throw new Error("Invalid environment variables");
}

export const env = result.data;