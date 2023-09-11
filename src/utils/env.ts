import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const envSchema = z.object({
	DATABASE_URL: z.string().nonempty().regex(/([a-z]+):\/\/([a-z]+):([a-z]+)@([a-z]+):([a-z]+)\/([a-z]+)/),
	HTTP_HOST: z.string().nonempty().ip(),
	HTTP_PORT: z.string().nonempty().regex(/[0-9]+/).transform(Number),
	JWT_SECRET: z.string().nonempty(),
	REDIS_HOST: z.string().nonempty().ip(),
	REDIS_PORT: z.string().nonempty().regex(/[0-9]+/).transform(Number),
})

export const env = envSchema.parse({
	DATABASE_URL: process.env.DATABASE_URL,
	HTTP_HOST: process.env.HTTP_HOST,
	HTTP_PORT: process.env.HTTP_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
});
