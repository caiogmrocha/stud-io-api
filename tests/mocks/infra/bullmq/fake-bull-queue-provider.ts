import { JobsOptions } from "bullmq";

import { IAvailableQueues, IJobOptions, IQueueProvider, defaultJobOptions } from "@/app/contracts/queue/i-queue-provider";
import { CanNotAddJobError } from "@/app/contracts/queue/errors/can-not-add-job-error";
import { CanNotRemoveJobError } from "@/app/contracts/queue/errors/can-not-remove-job-error";
import { Either, left, right } from "@/utils/logic/either";

export class BullQueueProvider implements IQueueProvider {
	private queue: any[] = [];

	async addJob<T extends unknown = any>(queue: IAvailableQueues, data: T, options: IJobOptions): Promise<Either<CanNotAddJobError, void>> {
		try {
			const preparedJopOptions: JobsOptions = {
				removeOnComplete: typeof options.removeOnComplete === 'boolean' ? options.removeOnComplete : defaultJobOptions.removeOnComplete,
				removeOnFail: typeof options.removeOnFail === 'boolean' ? options.removeOnFail : defaultJobOptions.removeOnFail,
				lifo: typeof options.lifo === 'boolean' ? options.lifo : defaultJobOptions.lifo,
				delay: typeof options.delay === 'number' ? options.delay : defaultJobOptions.delay,
				priority: typeof options.priority === 'number' ? options.priority : defaultJobOptions.priority,
				attempts: typeof options.attempts === 'number' ? options.attempts : defaultJobOptions.attempts,
				jobId: options.id,
			};

			this.queue.push({
				queue,
				data,
				options: preparedJopOptions,
			});

			return right(undefined);
		} catch (error: any) {
			return left(new CanNotAddJobError(error.message));
		}
	}

	async removeJob(queue: IAvailableQueues, jobId: string): Promise<Either<CanNotRemoveJobError, void>> {
		try {
			this.queue = this.queue.filter((job) => job.queue !== queue && job.options.jobId !== jobId);

			return right(undefined);
		} catch (error: any) {
			return left(new CanNotRemoveJobError(error.message));
		}
	}
}
