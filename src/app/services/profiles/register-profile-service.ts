import { ICreateProfileRepository } from "@/app/contracts/repositories/profiles/i-create-profile-repository";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { ICreateStudentRepository } from "@/app/contracts/repositories/students/i-create-student-repository";
import { ICreateTeacherRepository } from "@/app/contracts/repositories/teachers/i-create-teacher-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { IBCryptProvider } from "@/app/contracts/encription/bcrypt/i-bcrypt-provider";
import { ProfileAlreadyExistsError } from "./errors/profile-already-exists-error";
import { BCryptHashError } from "@/app/contracts/encription/bcrypt/errors/bcrypt-hash-error";
import {
  IRegisterProfileUseCase,
  IRegisterProfileUseCaseInputBoundary,
  IRegisterProfileUseCaseOutPutBoundary
} from "@/domain/usecases/profiles/i-register-profile-use-case";

import { Either, left, right } from "@/utils/logic/either";

export class RegisterProfileService implements IRegisterProfileUseCase {
  constructor (
    private readonly getProfilesRepository: IGetProfilesRepository,
    private readonly createProfileRepository: ICreateProfileRepository,
    private readonly createStudentRepository: ICreateStudentRepository,
    private readonly createTeacherRepository: ICreateTeacherRepository,
    private readonly bcryptHashProvider: IBCryptProvider,
  ) {}

  async execute(input: IRegisterProfileUseCaseInputBoundary): Promise<Either<
    | ProfileAlreadyExistsError
    | BCryptHashError,
    IRegisterProfileUseCaseOutPutBoundary
  >> {
    const profileAlreadyExists = await this.getProfilesRepository.get({
      where: [['email', '=', input.email]],
    });

    if (profileAlreadyExists.length > 0) {
      return left(new ProfileAlreadyExistsError(input.email));
    }

    const hashedPassword = await this.bcryptHashProvider.hash(input.password, 10);

    if (hashedPassword.isLeft()) {
      return left(hashedPassword.value);
    }

    const createdProfile = await this.createProfileRepository.create({
      email: input.email,
      password: hashedPassword.value,
      level: 0,
      type: input.type,
    });

    let createdProfileOwner: IStudentModel | ITeacherModel;

    if (input.type === 'student') {
      createdProfileOwner = await this.createStudentRepository.create({
        name: input.name,
        profile_id: createdProfile.id,
      });
    } else {
      createdProfileOwner = await this.createTeacherRepository.create({
        name: input.name,
        profile_id: createdProfile.id,
      });
    }

    return right({
      profile: {
        name: createdProfileOwner.name,
        email: createdProfile.email,
      }
    });
  }
}
