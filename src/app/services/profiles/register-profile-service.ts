import { IGetProfilesRepository } from "@/app/contracts/repositories/i-get-profiles-repository";
import { IRegisterProfileUseCase, IRegisterProfileUseCaseInputBoundary, IRegisterProfileUseCaseOutPutBoundary } from "@/domain/usecases/profiles/i-register-profile-use-case";
import { Either, left, right } from "@/utils/logic/either";
import { ProfileAlreadyExistsError } from "./errors/profile-already-exists-error";

export class RegisterProfileService implements IRegisterProfileUseCase {
  constructor (private readonly getProfilesRepository: IGetProfilesRepository) {}

  async execute(input: IRegisterProfileUseCaseInputBoundary): Promise<any> {
    const profileAlreadyExists = await this.getProfilesRepository.get({
      where: [['email', '=', input.email]],
    });

    if (profileAlreadyExists.length > 0) {
      return left(new ProfileAlreadyExistsError(input.email));
    }

    return right(profileAlreadyExists);
  }
}
