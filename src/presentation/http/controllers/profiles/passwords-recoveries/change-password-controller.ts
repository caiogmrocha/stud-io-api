import * as Http from "@/presentation/http/contracts";
import { IChangePasswordUseCase } from "@/domain/usecases/profiles/password-recovery/i-change-password-use-case";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { TokenDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/token-does-not-exists-error";
import { ValidationComposite } from "@/validation/validation-composite";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";

export type IChangePasswordControllerRequest = Http.IHttpRequest<
	{ password: string },
	{},
	{},
	{ 'Authorization': `Bearer ${string}` }
>;

export class ChangePasswordController implements Http.IController {
	constructor (
		private readonly changePasswordUseCase: IChangePasswordUseCase,
	) {}

	async handle(request: IChangePasswordControllerRequest): Promise<Http.IHttpResponse> {
		try {
			const validationComposite = new ValidationComposite([
        new RequiredValueValidator('password', request.body.password),
        new MinimumValueValidator('password', request.body.password, 12),
      ]);

			const validationResult = await validationComposite.validate();

			if (validationResult.isLeft()) {
				return Http.unprocessable(validationResult.value);
			}

			const authToken = request.headers['Authorization'];

			if (!authToken) {
				return Http.unauthorized('Tentativa de alteração de senha não autorizada.');
			}

			const changePasswordUseCaseResult = await this.changePasswordUseCase.execute({
				password: request.body.password,
				token: authToken.replace('Bearer ', ''),
			});

			if (changePasswordUseCaseResult.isLeft()) {
				const error = changePasswordUseCaseResult.value;

				switch (error.constructor) {
					case JWTVerifyError:
					case TokenDoesNotExistError:
						return Http.forbidden(error.message);

					default:
						return Http.badRequest(error.message);
				}
			}

			return Http.ok({
				message: 'Senha alterada com sucesso.',
			});
		} catch (error) {
			console.log(error)
			return Http.serverError();
		}
	}
}
