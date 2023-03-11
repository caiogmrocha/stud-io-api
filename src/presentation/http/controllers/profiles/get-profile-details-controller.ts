import { ProfileDoesNotExistsError } from "@/app/services/profiles/errors/profile-does-not-exists-error";
import { IGetProfileDetailsUseCase } from "@/domain/usecases/profiles/i-get-profile-details";
import { clientError, IController, IHttpRequest, IHttpResponse, ok, serverError } from "../../contracts";

export type IGetProfileDetailsControllerRequestParams = {
  id: string,
};

export type IGetProfileDetailsControllerResponseBody = {
  id: string,
  name: string,
  email: string,
  level: number,
  type: string,
  createdAt: string,
}

export class GetProfileDetailsController implements IController {
  constructor (
    private readonly getProfileUseCase: IGetProfileDetailsUseCase,
  ) {}

  async handle({ params, ...rest }: IHttpRequest<null, IGetProfileDetailsControllerRequestParams>): Promise<IHttpResponse<IGetProfileDetailsControllerResponseBody>> {
    try {
      const result = await this.getProfileUseCase.execute({
        profileId: params.id,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileDoesNotExistsError:
            return clientError(error);

          default:
            return clientError(error);
        }
      }

      const profile = result.value;

      return ok({
        id: profile.id,
        name: profile.owner!.name,
        email: profile.email.value,
        level: profile.level,
        type: profile.type,
        createdAt: profile.createdAt,
      });
    } catch (error) {
      console.error(error)
      return serverError(error as Error);
    }
  }
}
