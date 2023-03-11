import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { Profile } from "@/domain/entities";
import { IGetProfileDetailsUseCase, IGetProfileDetailsUseCaseInputBoundary } from "@/domain/usecases/profiles/i-get-profile-details";
import { Either, left, right } from "@/utils/logic/either";
import { ProfileMapper } from "@/utils/mappers/profile-mapper";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

export class GetProfileDetailsService implements IGetProfileDetailsUseCase {
  constructor (private readonly getProfilesRepository: IGetProfilesRepository) {}

  async execute(input: IGetProfileDetailsUseCaseInputBoundary): Promise<Either<Error, Profile>> {
    const [ profileData ] = await this.getProfilesRepository.get({
      where: [ [ 'id', '=', input.profileId ] ],
      relations: {
        student: true,
        teacher: true,
      }
    });

    if (!profileData) {
      return left(new ProfileDoesNotExistsError);
    }

    const profile = ProfileMapper.fromModeltoEntity(profileData);

    return right(profile);
  }
}
