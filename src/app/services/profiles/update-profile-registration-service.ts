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
		private readonly getSubjectsRepository: IGetSubjectsRepository,
		private readonly getProfilesSubjectsRepository: IGetProfilesSubjectsRepository,
		private readonly createProfileSubjectRepository: ICreateProfileSubjectRepository,
		private readonly deleteProfileSubjectRepository: IDeleteProfileSubjectRepository,
    private readonly updateProfileRepository: IUpdateProfileRepository,
    private readonly updateStudentRepository: IUpdateStudentRepository,
    private readonly updateTeacherRepository: IUpdateTeacherRepository,
  ) {}

  async execute(input: IUpdateProfileRegistrationUseCaseInputBoundary): Promise<Either<
    IUpdateProfileRegistrationServicePossibleErrors,
    IUpdateProfileRegistrationUseCaseOutPutBoundary
  >> {
		// Profile interations
    const [ profile ] = await this.getProfilesRepository.get({
      where: [['id', '=', input.id]],
    });

    if (!profile) {
      return left(new ProfileDoesNotExistsError());
    }

    await this.updateProfileRepository.update(profile.id, {
      email: input.email,
    });

		// Student/Teacher interations
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

		// Subjects interactions
		const subjects = await this.getSubjectsRepository.get({
			where: [['id', 'in', input.subjectsIds]]
		});

		if (!input.subjectsIds.every(id => subjects.some(subject => subject.id === id))) {
			const subjectsIdsNotFounded = input.subjectsIds.filter(id => !subjects.some(subject => subject.id === id));

			return left(new Error('Não foram encontrados assuntos para os ids: ' + subjectsIdsNotFounded.join(', ')));
		}

		const profilesSubjects = await this.getProfilesSubjectsRepository.get({
			where: [['profile_id', '=', profile.id]],
		});

		const subjectsIdsToDelete = input.subjectsIds.filter(id => profilesSubjects.some(profileSubject => profileSubject.subject_id === id));

		await Promise.all(
			subjectsIdsToDelete.map(subjectId => this.deleteProfileSubjectRepository.delete(
				profile.id,
				subjectId,
			)),
		);

		const subjectsIdsToCreate = input.subjectsIds.filter(id => !profilesSubjects.some(profileSubject => profileSubject.subject_id === id));

		await Promise.all(
			subjectsIdsToCreate.map(subjectId => this.createProfileSubjectRepository.create({
				profile_id: profile.id,
				subject_id: subjectId,
			})),
		);

    return right(null);
  }
}
