import { ISynchronizeProfilesSubjectsUseCaseInputBoundary } from "@/domain/usecases/profiles-subjects/i-synchronize-profiles-subjects-use-case";
import { SynchronizeProfilesSubjectsService } from "./synchronize-profiles-subjects-service";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { InMemoryGetSubjectsRepository } from "@/../tests/mocks/infra/in-memory/subjects/in-memory-get-subjects-repository";
import { InMemoryGetProfilesSubjectsRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-get-profiles-subjects-repository";
import { InMemoryCreateProfileSubjectRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-create-profile-subject-repository";
import { InMemoryDeleteProfileSubjectRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-delete-profile-subject-repository";
import { ProfilesDoesNotExistsError } from "../profiles/errors/profiles-does-not-exists-error";
import { SubjectsDoesNotExistsError } from "../subjects/errors/subjects-does-not-exists-error";

import { faker } from "@faker-js/faker";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";

type SutTypes = {
	sut: SynchronizeProfilesSubjectsService;
}

function makeSut(): SutTypes {
  const getProfilesRepository = new InMemoryGetProfilesRepository();
	const getSubjectsRepository = new InMemoryGetSubjectsRepository();
	const getProfilesSubjectsRepository = new InMemoryGetProfilesSubjectsRepository();
	const createProfileSubjectRepository = new InMemoryCreateProfileSubjectRepository();
	const deleteProfileSubjectRepository = new InMemoryDeleteProfileSubjectRepository();
  const sut = new SynchronizeProfilesSubjectsService(
		getProfilesRepository,
		getSubjectsRepository,
		getProfilesSubjectsRepository,
		createProfileSubjectRepository,
		deleteProfileSubjectRepository,
  );

  return { sut };
}

describe('[Unit] Synchronize Profiles Subjects Service', () => {
	it('should return ProfilesDoesNotExistsError if at least one profile has not been founded', async () => {
		const profileId = faker.datatype.uuid();
		const profileIdThatDoesNotExists = faker.datatype.uuid();
		const subjectId = faker.datatype.number();

		await setupInMemoryDatabase({
			profiles: [
				{
					id: profileId,
					email: faker.internet.email(),
					password: faker.random.alphaNumeric(12),
					type: 'teacher',
					level: 12,
					created_at: new Date(),
					is_deleted: false,
				}
			],
			students: [],
			teachers: [],
			subjects: [
				{
					id: subjectId,
					name: faker.name.fullName(),
					display_name: faker.name.fullName(),
					description: faker.random.words(6),
					is_deleted: false,
					created_at: new Date(),
				}
			],
			profile_subjects: [
				{
					profile_id: profileId,
					subject_id: subjectId,
					created_at: new Date(),
				}
			],
		});

		const { sut } = makeSut();

		const input: ISynchronizeProfilesSubjectsUseCaseInputBoundary = {
			profilesIds: [
				profileId,
				profileIdThatDoesNotExists,
			],
			subjectsIds: [
				subjectId,
			]
		};

		const output = await sut.execute(input);

		expect(output.isLeft()).toBeTruthy();
		expect(output.value).toBeInstanceOf(ProfilesDoesNotExistsError);
	});

	it('should return SubjectsDoesNotExistsError if at least one subject has not been founded', async () => {
		const subjectId = faker.datatype.number();
		const subjectIdThatDoesNotExists = faker.datatype.number();
		const profileId = faker.datatype.uuid();

		await setupInMemoryDatabase({
			profiles: [
				{
					id: profileId,
					email: faker.internet.email(),
					password: faker.random.alphaNumeric(12),
					type: 'teacher',
					level: 12,
					created_at: new Date(),
					is_deleted: false,
				}
			],
			students: [],
			teachers: [],
			subjects: [
				{
					id: subjectId,
					name: faker.name.fullName(),
					display_name: faker.name.fullName(),
					description: faker.random.words(6),
					is_deleted: false,
					created_at: new Date(),
				}
			],
			profile_subjects: [
				{
					profile_id: profileId,
					subject_id: subjectId,
					created_at: new Date(),
				}
			],
		});

		const { sut } = makeSut();

		const input: ISynchronizeProfilesSubjectsUseCaseInputBoundary = {
			profilesIds: [
				profileId,
			],
			subjectsIds: [
				subjectId,
				subjectIdThatDoesNotExists,
			]
		};

		const output = await sut.execute(input);

		expect(output.isLeft()).toBeTruthy();
		expect(output.value).toBeInstanceOf(SubjectsDoesNotExistsError);
	});

	// it('should be able to synchronize the profiles with the subjects', async () => {

	// });
});
