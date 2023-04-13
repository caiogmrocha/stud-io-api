import { IUpdateProfileRegistrationUseCase, IUpdateProfileRegistrationUseCaseInputBoundary, IUpdateProfileRegistrationUseCaseOutPutBoundary } from "@/domain/usecases/profiles/i-update-profile-registration-use-case";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IGetStudentsRepository } from "@/app/contracts/repositories/students/i-get-students-repository";
import { IGetTeachersRepository } from "@/app/contracts/repositories/teachers/i-get-teachers-repository";
import { IGetSubjectsRepository } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { IGetProfilesSubjectsRepository } from "@/app/contracts/repositories/profiles-subjects/i-get-profiles-subjects-repository";
import { IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";
import { IUpdateStudentRepository } from "@/app/contracts/repositories/students/i-update-student-repository";
import { IUpdateTeacherRepository } from "@/app/contracts/repositories/teachers/i-update-teacher-repository";
import { ICreateProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-create-profile-subject-repository";
import { IDeleteProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-delete-profile-subject-repository";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { StudentDoesNotExistsError } from "../students/errors/student-does-not-exists-error";
import { TeacherDoesNotExistsError } from "../teachers/errors/teacher-does-not-exists-error";

import { Either, left, right } from "@/utils/logic/either";
import { ISynchronizeProfilesSubjectsUseCase } from "@/domain/usecases/profiles-subjects/i-synchronize-profiles-subjects-use-case";

type IUpdateProfileRegistrationServicePossibleErrors = (
  | ProfileDoesNotExistsError
  | StudentDoesNotExistsError
  | TeacherDoesNotExistsError
);

export class UpdateProfileRegistrationService implements IUpdateProfileRegistrationUseCase {
  constructor (
    private readonly getProfilesRepository: IGetProfilesRepository,
    private readonly getStudentsRepository: IGetStudentsRepository,
    private readonly getTeachersRepository: IGetTeachersRepository,
    private readonly updateProfileRepository: IUpdateProfileRepository,
    private readonly updateStudentRepository: IUpdateStudentRepository,
    private readonly updateTeacherRepository: IUpdateTeacherRepository,
		private readonly synchronizeProfilesSubjectsService: ISynchronizeProfilesSubjectsUseCase,
  ) {}

  async execute(input: IUpdateProfileRegistrationUseCaseInputBoundary): Promise<Either<
    IUpdateProfileRegistrationServicePossibleErrors,
    IUpdateProfileRegistrationUseCaseOutPutBoundary
  >> {
    const [ profile ] = await this.getProfilesRepository.get({
      where: [['id', '=', input.id]],
    });

    if (!profile) {
      return left(new ProfileDoesNotExistsError());
    }

    await this.updateProfileRepository.update(profile.id, {
      email: input.email,
    });

    let owner: IStudentModel | ITeacherModel | undefined;

    if (profile.type === 'student') {
      [ owner ] = await this.getStudentsRepository.get({
        where: [[ 'profile_id', '=', profile.id ]],
      });

      if (!owner) {
        return left(new StudentDoesNotExistsError());
      }

      await this.updateStudentRepository.update(owner.id, {
        name: input.name,
      });
    } else if (profile.type === 'teacher') {
      [ owner ] = await this.getTeachersRepository.get({
        where: [[ 'profile_id', '=', profile.id ]],
      })

      if (!owner) {
        return left(new TeacherDoesNotExistsError());
      }

      await this.updateTeacherRepository.update(owner.id, {
        name: input.name,
      });
    }

		await this.synchronizeProfilesSubjectsService.execute({
			profilesIds: [ profile.id ],
			subjectsIds: input.subjectsIds,
		});

    return right(null);
  }
}
