import { ProfileDoesNotExistsError } from "@/app/services/profiles/errors/profile-does-not-exists-error";
import { IAuthenticateProfileUseCase } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { ValidationComposite } from "@/validation/validation-composite";
import { clientError, IController, IHttpRequest, IHttpResponse, ok, serverError, unauthorized, unprocessable } from "../../contracts";

export type IAuthenticateProfileControllerRequestBody = {
  email: string;
  password: string;
};

export class AuthenticateProfileController implements IController {
  constructor (private readonly authenticateProfileUseCase: IAuthenticateProfileUseCase) {}

  async handle({ body }: IHttpRequest<IAuthenticateProfileControllerRequestBody>): Promise<IHttpResponse<any>> {
    try {
      const validationComposite = new ValidationComposite([
        new RequiredValueValidator('email', body.email),
        new EmailFormatValidator('email', body.email),
        new RequiredValueValidator('password', body.password),
        new MinimumValueValidator('password', body.password, 12),
      ]);

      const validationResult = await validationComposite.validate();

      if (validationResult.isLeft()) {
        return unprocessable(validationResult.value);
      }

      const result = await this.authenticateProfileUseCase.execute(body);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileDoesNotExistsError:
            return unauthorized(error);

          default:
            return clientError(error);
        }
      }

      return ok(true);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
