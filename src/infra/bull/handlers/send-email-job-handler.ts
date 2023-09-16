import { IJobHandler } from "@/app/contracts/queue/i-job-handler";
import { ISendEmailUseCase, ISendEmailUseCaseInputBoundary } from "@/domain/usecases/shared/i-send-email-use-case";

export class SendEmailJobHandler implements IJobHandler {
	constructor (
		private readonly sendEmailService: ISendEmailUseCase,
	) {}

	public async handle(data: ISendEmailUseCaseInputBoundary): Promise<void> {
		await this.sendEmailService.execute(data);
	}
}
