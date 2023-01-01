import { ProfileAlreadyExistsError } from "@/app/services/profiles/errors/profile-already-exists-error";
import { IRegisterProfileUseCase } from "@/domain/usecases/profiles/i-register-profile-use-case";
import { clientError, conflict, created, IController, IHttpRequest, IHttpResponse, serverError } from "../contracts";

type IRegisterProfileControllerRequestBody = {
  name: string;
  email: string;
  password: string;
  type: 'student' | 'teacher';
  subjectsIds: number[];
};

type IRegisterProfileControllerResponseBody = {

};

export class RegisterProfileController implements IController {
  constructor (private readonly registerProfileUseCase: IRegisterProfileUseCase) {}

  async handle({ body }: IHttpRequest<IRegisterProfileControllerRequestBody>): Promise<IHttpResponse<
    IRegisterProfileControllerResponseBody
  >> {
    try {
      const result = await this.registerProfileUseCase.execute(body);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileAlreadyExistsError:
            return conflict(error);

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
