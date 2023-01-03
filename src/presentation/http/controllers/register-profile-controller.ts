import { ProfileAlreadyExistsError } from "@/app/services/profiles/errors/profile-already-exists-error";
import { IRegisterProfileUseCase } from "@/domain/usecases/profiles/i-register-profile-use-case";
import { ValidationCompositeError } from "@/validation/errors/validation-composite-error";
import { EmailFormatValidator } from "@/validation/rules/email-format-validator";
import { MinimumValueValidator } from "@/validation/rules/minimum-value-validator";
import { RequiredValueValidator } from "@/validation/rules/required-value-validator";
import { ValueInListValidator } from "@/validation/rules/value-in-list-validator";
import { ValidationComposite } from "@/validation/validation-composite";
import { clientError, conflict, created, IController, IHttpRequest, IHttpResponse, serverError, unprocessable } from "../contracts";

export type IRegisterProfileControllerRequestBody = {
  name: string;
  email: string;
  password: string;
  type: 'student' | 'teacher';
  subjectsIds: number[];
};

export class RegisterProfileController implements IController {
  constructor (
    private readonly registerProfileUseCase: IRegisterProfileUseCase,
    ) {}

  async handle({ body }: IHttpRequest<IRegisterProfileControllerRequestBody>): Promise<IHttpResponse<void>> {
    try {
      const validationComposite = new ValidationComposite([
        new RequiredValueValidator('name', body.name),
        new RequiredValueValidator('email', body.email),
        new RequiredValueValidator('password', body.password),
        new RequiredValueValidator('type', body.type),
        new EmailFormatValidator('email', body.email),
        new MinimumValueValidator('password', body.password, 12),
        new ValueInListValidator('type', body.type, ['student', 'teacher']),
      ]);

      const validationResult = await validationComposite.validate();

      console.log({ validationResult })

      if (validationResult.isLeft()) {
        return unprocessable(validationResult.value);
      }

      const result = await this.registerProfileUseCase.execute(body);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileAlreadyExistsError:
            return conflict(error);

          case ValidationCompositeError:
            return unprocessable(error);

          default:
            return clientError(error);
        }
      }

      return created();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
