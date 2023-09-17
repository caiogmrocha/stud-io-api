import { Worker } from "bullmq";

import { sendEmailJobHandlerFactory } from "../factories/queue/handler/send-email-job-handler-factory";
import { redisConnection } from "@/infra/bull/bull-queue-provider";

export const workers: Worker[] = [
	new Worker("send-email-queue", async ({ data }) => {
		await sendEmailJobHandlerFactory().handle(data);
	}, {
		autorun: false,
		connection: redisConnection,
	}),
];
