import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IUpdateProfileRegistrationUseCase, IUpdateProfileRegistrationUseCaseInputBoundary, IUpdateProfileRegistrationUseCaseOutPutBoundary } from "@/domain/usecases/profiles/i-update-profile-registration-use-case";
import { Either, left, right } from "@/utils/logic/either";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";

export class UpdateProfileRegistrationService implements IUpdateProfileRegistrationUseCase {
  constructor (
    private readonly getProfilesRepository: IGetProfilesRepository,
    private readonly updateProfileRepository: IUpdateProfileRepository,
  ) {}

  async execute(input: IUpdateProfileRegistrationUseCaseInputBoundary): Promise<Either<
    ProfileDoesNotExistsError,
    IUpdateProfileRegistrationUseCaseOutPutBoundary
  >> {
    const [ profile ] = await this.getProfilesRepository.get({
      where: [['id', '=', input.id]],
    });

    if (!profile) {
      return left(new ProfileDoesNotExistsError());
    }

    await this.updateProfileRepository.update(profile.id, input);

    return right(null);
  }
}
