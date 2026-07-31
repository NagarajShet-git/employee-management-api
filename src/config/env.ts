import dotenv from "dotenv";
dotenv.config()
import {z} from 'zod'
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number(),
    MONGO_URI: z.string()
})

const parsed = envSchema.safeParse(process.env)

if(!parsed.success) {
     console.error(parsed.error.format());
    process.exit(1);
}

export const env = parsed.data