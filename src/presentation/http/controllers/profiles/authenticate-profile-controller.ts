import { ProfileDoesNotExistsError } from "@/app/services/profiles/errors/profile-does-not-exists-error";
import { IAuthenticateProfileUseCase } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { ValidationComposite } from "@/validation/validation-composite";
import * as Http from "../../contracts";

export type IAuthenticateProfileControllerRequestBody = {
	email: string;
	password: string;
};

export type IAuthenticateProfileControllerResponseBody = {
  token: string;
};

export class AuthenticateProfileController implements Http.IController {
  constructor (private readonly authenticateProfileUseCase: IAuthenticateProfileUseCase) {}

  async handle({ body }: Http.IHttpRequest<IAuthenticateProfileControllerRequestBody>): Promise<
		Http.IHttpResponse<IAuthenticateProfileControllerResponseBody>
	> {
    try {
      const validationComposite = new ValidationComposite([
        new RequiredValueValidator('email', body.email),
        new EmailFormatValidator('email', body.email),
        new RequiredValueValidator('password', body.password),
        new MinimumValueValidator('password', body.password, 12),
      ]);

      const validationResult = await validationComposite.validate();

      if (validationResult.isLeft()) {
        return Http.unprocessable(validationResult.value);
      }

      const result = await this.authenticateProfileUseCase.execute(body);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileDoesNotExistsError:
            return Http.unauthorized();

          default:
            return Http.badRequest();
        }
      }

      return Http.ok(result.value);
    } catch (error) {
      return Http.serverError();
    }
  }
}
