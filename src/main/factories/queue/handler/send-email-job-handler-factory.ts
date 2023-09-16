import { SendEmailService } from "@/app/services/shared/send-email-service";
import { SendEmailJobHandler } from "@/infra/bull/handlers";
import { EjsTemplateProvider } from "@/infra/ejs/ejs-template-provider";

export function sendEmailJobHandlerFactory(): SendEmailJobHandler {
		const ejsTemplateProvider = new EjsTemplateProvider();
		const sendEmailService = new SendEmailService(
			ejsTemplateProvider,
		);
		const sendEmailJobHandler = new SendEmailJobHandler();
		return sendEmailJobHandler;
}
