import { faker } from "@faker-js/faker";
import { SendEmailService } from "./send-email-service";
import { SendEmailServiceError } from "./errors/send-email-service-error";
import { ISendEmailProvider } from "@/app/contracts/email/i-send-email-provider";
import { left, right } from "@/utils/logic/either";
import { CanNotRenderTemplateError } from "@/app/contracts/template/errors/can-not-render-template-error";

describe('[Unit] SendEmailService', () => {
	it('should return an SendEmailServiceError if SendEmailProvider throws an error', async () => {
		const fakeTemplateProvider = {
			render: jest.fn().mockResolvedValue(right(undefined)),
		};

		const fakeSendEmailProvider = {
			send: jest.fn().mockResolvedValue(left(new CanNotRenderTemplateError('any-error'))),
		} as ISendEmailProvider;

		const sut = new SendEmailService(
			fakeTemplateProvider,
			fakeSendEmailProvider,
		);

		const output = await sut.execute({
			to: faker.internet.email(),
			from: faker.internet.email(),
			subject: faker.random.words(5),
			templatePath: 'any-path',
			templateData: {},
		});

		expect(output.isLeft()).toBeTruthy();
		expect(output.value).toBeInstanceOf(SendEmailServiceError);
	});

	it.todo('should return an SendEmailServiceError if TemplateProvider throws an error');
	it.todo('should return undefined if SendEmailProvider has sent the e-mail with success');
});
