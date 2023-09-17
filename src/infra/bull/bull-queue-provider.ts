
import { IAvailableQueues, IJobOptions, IQueueProvider, defaultJobOptions } from "@/app/contracts/queue/i-queue-provider";
import { CanNotAddJobError } from "@/app/contracts/queue/errors/can-not-add-job-error";
import { CanNotRemoveJobError } from "@/app/contracts/queue/errors/can-not-remove-job-error";
import { Either, left, right } from "@/utils/logic/either";
import { env } from '@/utils/env';

import Redis from 'ioredis';
import { JobsOptions, Queue } from "bullmq";

const redis = new Redis({
	host: env.REDIS_HOST,
	port: env.REDIS_PORT,
});

export class BullQueueProvider implements IQueueProvider {
	async addJob<T extends unknown = any>(queue: IAvailableQueues, data: T, options: IJobOptions): Promise<Either<CanNotAddJobError, void>> {
		try {
			const queueInstance = new Queue(queue, { connection: redis });

			const preparedJopOptions: JobsOptions = {
				removeOnComplete: typeof options.removeOnComplete === 'boolean' ? options.removeOnComplete : defaultJobOptions.removeOnComplete,
				removeOnFail: typeof options.removeOnFail === 'boolean' ? options.removeOnFail : defaultJobOptions.removeOnFail,
				lifo: typeof options.lifo === 'boolean' ? options.lifo : defaultJobOptions.lifo,
				delay: typeof options.delay === 'number' ? options.delay : defaultJobOptions.delay,
				priority: typeof options.priority === 'number' ? options.priority : defaultJobOptions.priority,
				attempts: typeof options.attempts === 'number' ? options.attempts : defaultJobOptions.attempts,
				jobId: options.id,
			};

			await queueInstance.add(queue, data, preparedJopOptions);

			return right(undefined);
		} catch (error: any) {
			return left(new CanNotAddJobError(error.message));
		}
	}

	async removeJob(queue: IAvailableQueues, jobId: string): Promise<Either<CanNotRemoveJobError, void>> {
		try {
			const queueInstance = new Queue(queue, { connection: redis });

			await queueInstance.remove(jobId);

			return right(undefined);
		} catch (error: any) {
			return left(new CanNotRemoveJobError(error.message));
		}
	}
}
