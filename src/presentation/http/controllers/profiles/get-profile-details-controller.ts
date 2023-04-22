import { ProfileDoesNotExistsError } from "@/app/services/profiles/errors/profile-does-not-exists-error";
import { IGetProfileDetailsUseCase } from "@/domain/usecases/profiles/i-get-profile-details";
import * as Http from "../../contracts";

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

export class GetProfileDetailsController implements Http.IController {
  constructor (
    private readonly getProfileUseCase: IGetProfileDetailsUseCase,
  ) {}

  async handle({ params }: Http.IHttpRequest<null, IGetProfileDetailsControllerRequestParams>): Promise<
		Http.IHttpResponse<IGetProfileDetailsControllerResponseBody>
	> {
    try {
      const result = await this.getProfileUseCase.execute({
        profileId: params.id,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case ProfileDoesNotExistsError:
            return Http.clientError(error);

          default:
            return Http.clientError(error);
        }
      }

      const profile = result.value;

      return Http.ok({
        id: profile.id,
        name: profile.owner!.name,
        email: profile.email.value,
        level: profile.level,
        type: profile.type,
        createdAt: profile.createdAt,
      });
    } catch (error) {
      return Http.serverError(error as Error);
    }
  }
}
