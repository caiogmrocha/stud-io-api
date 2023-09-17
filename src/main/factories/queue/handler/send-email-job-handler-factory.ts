import { SendEmailService } from "@/app/services/shared/send-email-service";
import { SendEmailJobHandler } from "@/infra/bull/handlers";
import { EjsTemplateProvider } from "@/infra/ejs/ejs-template-provider";
import { NodeMailerEmailProvider } from "@/infra/node-mailer/node-mailer-email-provider";

export function sendEmailJobHandlerFactory(): SendEmailJobHandler {
	const ejsTemplateProvider = new EjsTemplateProvider();
	const emailProvider = new NodeMailerEmailProvider();
	const sendEmailService = new SendEmailService(
		ejsTemplateProvider,
		emailProvider,
	);
	const sendEmailJobHandler = new SendEmailJobHandler(sendEmailService);

	return sendEmailJobHandler;
}
