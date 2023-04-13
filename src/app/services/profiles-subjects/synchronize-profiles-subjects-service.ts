import { ISynchronizeProfilesSubjectsUseCase, ISynchronizeProfilesSubjectsUseCaseInputBoundary, ISynchronizeProfilesSubjectsUseCaseOutPutBoundary } from "@/domain/usecases/profiles-subjects/i-synchronize-profiles-subjects-use-case";
import { ICreateProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-create-profile-subject-repository";
import { IDeleteProfileSubjectRepository } from "@/app/contracts/repositories/profiles-subjects/i-delete-profile-subject-repository";
import { IGetProfilesSubjectsRepository } from "@/app/contracts/repositories/profiles-subjects/i-get-profiles-subjects-repository";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IGetSubjectsRepository } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { Either, left, right } from "@/utils/logic/either";
import { ProfilesDoesNotExistsError } from "../profiles/errors/profiles-does-not-exists-error";

export class SynchronizeProfilesSubjectsService implements ISynchronizeProfilesSubjectsUseCase {
	constructor (
		private readonly getProfilesRepository: IGetProfilesRepository,
		private readonly getSubjectsRepository: IGetSubjectsRepository,
		private readonly getProfilesSubjectsRepository: IGetProfilesSubjectsRepository,
		private readonly createProfileSubjectRepository: ICreateProfileSubjectRepository,
		private readonly deleteProfileSubjectRepository: IDeleteProfileSubjectRepository,
	) {}

	async execute(input: ISynchronizeProfilesSubjectsUseCaseInputBoundary): Promise<Either<Error, ISynchronizeProfilesSubjectsUseCaseOutPutBoundary>> {
		const profiles = await this.getProfilesRepository.get({
			where: [['id', 'in', input.profilesIds]]
		});

		if (!input.profilesIds.every(id => profiles.some(profile => profile.id === id))) {
			const profilesIdsNotFounded = input.profilesIds.filter(id => !profiles.some(profile => profile.id === id));

			return left(new ProfilesDoesNotExistsError({ ids: profilesIdsNotFounded }));
		}

		const subjects = await this.getSubjectsRepository.get({
			where: [['id', 'in', input.subjectsIds]]
		});

		if (!input.subjectsIds.every(id => subjects.some(subject => subject.id === id))) {
			const subjectsIdsNotFounded = input.subjectsIds.filter(id => !subjects.some(subject => subject.id === id));

			return left(new Error('Não foram encontrados assuntos para os ids: ' + subjectsIdsNotFounded.join(', ')));
		}

		const profilesSubjects = await this.getProfilesSubjectsRepository.get({
			where: [['profile_id', 'in', input.profilesIds]],
		});

		// Delete old relations
		const profilesIdsToDelete = input.profilesIds.filter(id => profilesSubjects.some(profileSubject => profileSubject.profile_id === id));
		const subjectsIdsToDelete = input.subjectsIds.filter(id => profilesSubjects.some(profileSubject => profileSubject.subject_id === id));

		const profilesSubjectsPromisesToDelete: ReturnType<IDeleteProfileSubjectRepository['delete']>[] = [];

		subjectsIdsToDelete.forEach(subjectId => {
			return profilesIdsToDelete.forEach(profileId => {
				profilesSubjectsPromisesToDelete.push(
					this.deleteProfileSubjectRepository.delete(
						profileId,
						subjectId,
					)
				);
			});
		});

		await Promise.all(profilesSubjectsPromisesToDelete);

		// Create new relations
		const profilesIdsToCreate = input.profilesIds.filter(id => !profilesSubjects.some(profileSubject => profileSubject.profile_id === id));
		const subjectsIdsToCreate = input.subjectsIds.filter(id => !profilesSubjects.some(profileSubject => profileSubject.subject_id === id));

		const profilesSubjectsPromisesToCreate: ReturnType<ICreateProfileSubjectRepository['create']>[] = [];

		subjectsIdsToCreate.forEach(subjectId => {
			return profilesIdsToCreate.forEach(profileId => {
				profilesSubjectsPromisesToCreate.push(
					this.createProfileSubjectRepository.create({
						profile_id: profileId,
						subject_id: subjectId,
					})
				);
			});
		});

		await Promise.all(profilesSubjectsPromisesToCreate);

		return right(null);
	}
}
