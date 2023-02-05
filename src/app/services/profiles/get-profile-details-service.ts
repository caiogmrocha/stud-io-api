import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { Profile } from "@/domain/entities";
import { IGetProfileDetailsUseCase, IGetProfileDetailsUseCaseInputBoundary } from "@/domain/usecases/profiles/i-get-profile-details";
import { Email, Password } from "@/domain/value-objects";
import { Either, left, right } from "@/utils/logic/either";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

export class GetProfileDetailsService implements IGetProfileDetailsUseCase {
  constructor (private readonly getProfilesRepository: IGetProfilesRepository) {}

  async execute(input: IGetProfileDetailsUseCaseInputBoundary): Promise<Either<Error, Profile>> {
    const [ profileData ] = await this.getProfilesRepository.get({ where: [
      [ 'id', '=', input.profileId ],
    ]});

    if (!profileData) {
      return left(new ProfileDoesNotExistsError);
    }

    const email = Email.create(profileData.email);

    if (email.isLeft()) {
      return left(email.value);
    }

    const password = Password.create(profileData.password, true);

    if (password.isLeft()) {
      return left(password.value);
    }

    const profile = new Profile({
      id: profileData.id,
      email: email.value,
      password: password.value,
      type: profileData.type,
      level: profileData.level,
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
      deletedAt: profileData.deleted_at,
      isDeleted: profileData.is_deleted,
    });

    return right(profile);
  }
}
