import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { Profile } from "@/domain/entities";
import { IGetProfileDetailsUseCase, IGetProfileDetailsUseCaseInputBoundary } from "@/domain/usecases/profiles/i-get-profile-details";
import { Either, left, right } from "@/utils/logic/either";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

export class GetProfileDetailsService implements IGetProfileDetailsUseCase {
  constructor (private readonly getProfilesRepository: IGetProfilesRepository) {}

  async execute(input: IGetProfileDetailsUseCaseInputBoundary): Promise<Either<Error, any>> {
    const [ profileData ] = await this.getProfilesRepository.get({ where: [
      [ 'id', '=', input.profileId ],
    ]});

    if (!profileData) {
      return left(new ProfileDoesNotExistsError);
    }

    return right({});
  }
}
