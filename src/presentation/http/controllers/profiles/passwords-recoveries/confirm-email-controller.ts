import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { CodeDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/code-does-not-exists-error";
import { MaximumCodeVerificationAttemptsReachedError } from "@/app/services/profiles/password-recovery/errors/maximum-code-verification-attempts-reached-error";
import { IConfirmEmailCodeUseCase } from "@/domain/usecases/profiles/password-recovery/i-confirm-email-code-use-case";
import * as Http from "@/presentation/http/contracts";

export type IConfirmEmailControllerRequest = Http.IHttpRequest<{
	code: string;
}>

export type IConfirmEmailControllerResponse = Http.IHttpResponse<{
	token: string;
}>;

export class ConfirmEmailController {
	constructor (
		private readonly confirmEmailUseCase: IConfirmEmailCodeUseCase,
	) {}

	public async handle(request: IConfirmEmailControllerRequest): Promise<IConfirmEmailControllerResponse> {
		const confirmEmailUseCaseResult = await this.confirmEmailUseCase.execute({
			code: request.body.code,
		});

		if (confirmEmailUseCaseResult.isLeft()) {
			const error = confirmEmailUseCaseResult.value;

			switch (error.constructor) {
				case CodeDoesNotExistError:
					return Http.forbidden(error.message);

				case JWTVerifyError:
					return Http.forbidden(error.message);

				case MaximumCodeVerificationAttemptsReachedError:
					return Http.forbidden(error.message);

				default:
					return Http.badRequest(error.message);
			}
		}

		return Http.ok({
			token: confirmEmailUseCaseResult.value.token,
		});
	}
}
