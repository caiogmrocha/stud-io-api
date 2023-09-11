import { Either } from "@/utils/logic/either";
import { CanNotAddJobError } from "./errors/can-not-add-job-error";
import { CanNotRemoveJobError } from "./errors/can-not-remove-job-error";

export type IJobOptions = {
	removeOnComplete?: (
		| boolean
		| { age: number; }
		| { count: number; }
	);

	removeOnFail?: (
		| boolean
		| { age: number; }
		| { count: number; }
	);

	id: string;
	lifo?: boolean;
	delay?: number;
	priority?: number;
	attempts?: number;

	repeat?: (
		| { every: number; limit?: number; }
		| { cron: string; }
	);
}

export const defaultJobOptions: Omit<IJobOptions, 'id'> = {
	repeat: undefined,
	removeOnComplete: true,
	removeOnFail: true,
	lifo: false,
	delay: 0,
	priority: 0,
	attempts: 1,
};

/**
 * @classdesc
 *
 * Queue provider interface. In general, this interface
 * is used to manipulate queues, such as adding and
 * removing jobs during code execution.
 */
export interface IQueueProvider {
	/**
	 * Add a job to the specified queue.
	 *
	 * @param queue queue name
	 * @param data job data
	 * @param options job options
	 *
	 * @returns void
	 */
	addJob<T extends any = any>(queue: string, data: T, options: IJobOptions): Promise<Either<CanNotAddJobError, void>>;

	/**
	 * Remove a job from the specified queue.
	 *
	 * @param queue queue name
	 * @param jobId job identifier
	 */
	removeJob(queue: string, jobId: string): Promise<Either<CanNotRemoveJobError, void>>;
}
