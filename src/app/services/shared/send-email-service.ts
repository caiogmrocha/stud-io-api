import { ISendEmailProvider, ISendEmailProviderOutputBoundary } from "@/app/contracts/email/i-send-email-provider";
import { ISendEmailUseCase, ISendEmailUseCaseInputBoundary } from "@/domain/usecases/shared/i-send-email-use-case";
import { left, right } from "@/utils/logic/either";
import { SendEmailServiceError } from "./errors/send-email-service-error";
import { ITemplateProvider } from "@/app/contracts/template/i-template-provider";

export class SendEmailService implements ISendEmailUseCase {
	constructor (
		private readonly templateProvider: ITemplateProvider,
		private readonly sendEmailProvider: ISendEmailProvider,
	) {}

	async execute(input: ISendEmailUseCaseInputBoundary): Promise<ISendEmailProviderOutputBoundary> {
		const renderedTemplate = await this.templateProvider.render({
			templatePath: input.templatePath,
			templateData: input.templateData,
		});

		if (renderedTemplate.isLeft()) {
			return left(new SendEmailServiceError('Não foi possível renderizar o template de e-mail.'));
		}

		const sendEmailResult = await this.sendEmailProvider.send({
			to: input.to,
			from: input.from,
			subject: input.subject,
			body: renderedTemplate.value,
		});

		if (sendEmailResult.isLeft()) {
			return left(new SendEmailServiceError('Não foi possível enviar o template de e-mail.'));
		}

		return right(undefined);
	}
}
