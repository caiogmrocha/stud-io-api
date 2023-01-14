import { IAuthenticateProfileUseCase } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { ValidationComposite } from "@/validation/validation-composite";
import { IController, IHttpRequest, IHttpResponse, ok, serverError, unprocessable } from "../../contracts";

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

      return ok(true);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
