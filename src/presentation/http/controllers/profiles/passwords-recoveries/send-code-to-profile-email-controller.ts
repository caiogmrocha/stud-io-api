import { ISendCodeToProfileEmailUseCase } from "@/domain/usecases/profiles/password-recovery/i-send-code-to-profile-email-use-case";
import * as Http from "../../../contracts";
import { ValidationComposite } from "@/validation/validation-composite";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { ProfileDoesNotExistsError } from "@/app/services/profiles/errors/profile-does-not-exists-error";

export type ISendCodeToProfileEmailControllerRequest = {
	email: string;
}

export type ISendCodeToProfileEmailControllerResponse = {
	code: string;
	token: string;
}

export class SendCodeToProfileEmailController implements Http.IController {
	constructor (private readonly sendCodeToProfileEmailUseCase: ISendCodeToProfileEmailUseCase) {}

	async handle({ body }: Http.IHttpRequest<ISendCodeToProfileEmailControllerRequest>): Promise<
		Http.IHttpResponse<ISendCodeToProfileEmailControllerResponse>
	> {
		try {
			const validationComposite = new ValidationComposite([
				new RequiredValueValidator('email', body.email),
				new EmailFormatValidator('email', body.email),
			]);

			const validationResult = await validationComposite.validate();

			if (validationResult.isLeft()) {
				return Http.unprocessable(validationResult.value);
			}

			const result = await this.sendCodeToProfileEmailUseCase.execute(body);

			if (result.isLeft()) {
				const error = result.value;

				switch (error.constructor) {
					case ProfileDoesNotExistsError:
						return Http.notFound(error.message);

					default:
						return Http.badRequest(error.message);
				}
			}

			return Http.ok({
				message: `Código enviado para o e-mail ${body.email}.`,
				token: result.value.token,
			});
		} catch (error) {
			return Http.serverError();
		}
	}
}
