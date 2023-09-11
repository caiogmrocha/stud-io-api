export interface IJobHandler {
	handle<T extends any = any>(data: T): Promise<void>;
}
