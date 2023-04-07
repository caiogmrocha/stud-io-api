import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IUpdateProfileRegistrationUseCase, IUpdateProfileRegistrationUseCaseInputBoundary, IUpdateProfileRegistrationUseCaseOutPutBoundary } from "@/domain/usecases/profiles/i-update-profile-registration-use-case";
import { Either, left } from "@/utils/logic/either";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

export class UpdateProfileRegistrationService implements IUpdateProfileRegistrationUseCase {
  constructor (
    private readonly getProfilesRepository: IGetProfilesRepository
  ) {}

  async execute(input: IUpdateProfileRegistrationUseCaseInputBoundary): Promise<any> { //Promise<Either<Error, IUpdateProfileRegistrationUseCaseOutPutBoundary>> {
    const [ profile ] = await this.getProfilesRepository.get({
      where: [['id', '=', input.id]],
    });

    if (!profile) {
      return left(new ProfileDoesNotExistsError());
    }

  }
}
