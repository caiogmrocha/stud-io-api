import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env.test") });
// if (process.env.NODE_ENV === "test") {
// 	console.log('test')
// } else {
// 	console.log('prod & dev')
// 	dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });
// }

const envSchema = z.object({
	DATABASE_URL: z.string().nonempty().url(),
	HTTP_HOST: z.string().nonempty().ip(),
	HTTP_PORT: z.string().nonempty().regex(/[0-9]+/).transform(Number),
	JWT_SECRET: z.string().nonempty(),
	REDIS_HOST: z.string().nonempty(),
	REDIS_PORT: z.string().nonempty().regex(/[0-9]+/).transform(Number),
	SMTP_HOST: z.string().nonempty(),
	SMTP_PORT: z.string().nonempty().regex(/[0-9]+/).transform(Number),
	SMTP_USER: z.string().nonempty(),
	SMTP_PASS: z.string().nonempty(),
})

console.log({
	DATABASE_URL: process.env.DATABASE_URL,
	HTTP_HOST: process.env.HTTP_HOST,
	HTTP_PORT: process.env.HTTP_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,
})

export const env = envSchema.parse({
	DATABASE_URL: process.env.DATABASE_URL,
	HTTP_HOST: process.env.HTTP_HOST,
	HTTP_PORT: process.env.HTTP_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASS: process.env.SMTP_PASS,
});
