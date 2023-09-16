export interface IJobHandler {
	handle(data: any): Promise<void>;
}
