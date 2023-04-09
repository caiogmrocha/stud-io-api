import { UpdateProfileRegistrationService } from "./update-profile-registration-service";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";
import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { InMemoryGetTeachersRepository } from "@/../tests/mocks/infra/in-memory/teachers/in-memory-get-teachers-repository";
import { InMemoryGetStudentsRepository } from "@/../tests/mocks/infra/in-memory/students/in-memory-get-students-repository";
import { InMemoryGetSubjectsRepository } from "@/../tests/mocks/infra/in-memory/subjects/in-memory-get-subjects-repository";
import { InMemoryUpdateProfileRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-update-profile-repository";
import { InMemoryUpdateTeacherRepository } from "@/../tests/mocks/infra/in-memory/teachers/in-memory-update-teacher-repository";
import { InMemoryUpdateStudentRepository } from "@/../tests/mocks/infra/in-memory/students/in-memory-update-student-repository";
import { InMemoryGetProfilesSubjectsRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-get-profiles-subjects-repository";
import { InMemoryCreateProfileSubjectRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-create-profile-subject-repository";
import { InMemoryDeleteProfileSubjectRepository } from "@/../tests/mocks/infra/in-memory/profiles-subjects/in-memory-delete-profile-subject-repository";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { faker } from "@faker-js/faker";

type SutTypes = {
  getProfilesRepository: InMemoryGetProfilesRepository;
  sut: UpdateProfileRegistrationService;
}

async function makeSut(
  profilesData: IProfileModel[] = [],
  studentsData: IStudentModel[] = [],
  teachersData: ITeacherModel[] = [],
  subjectsData: ISubjectModel[] = [],
	profilesSubjectsData: IProfileSubjectModel[] = [],
): Promise<SutTypes> {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: studentsData,
    teachers: teachersData,
		subjects: subjectsData,
		profile_subjects: profilesSubjectsData,
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const getStudentsRepository = new InMemoryGetStudentsRepository();
  const getTeachersRepository = new InMemoryGetTeachersRepository();
  const getSubjectsRepository = new InMemoryGetSubjectsRepository();
  const getProfilesSubjectsRepository = new InMemoryGetProfilesSubjectsRepository();
	const createProfileSubjectRepository = new InMemoryCreateProfileSubjectRepository();
	const deleteProfileSubjectRepository = new InMemoryDeleteProfileSubjectRepository();
  const updateProfileRepository = new InMemoryUpdateProfileRepository();
  const updateStudentRepository = new InMemoryUpdateStudentRepository();
  const updateTeacherRepository = new InMemoryUpdateTeacherRepository();
  const sut = new UpdateProfileRegistrationService(
    getProfilesRepository,
    getStudentsRepository,
    getTeachersRepository,
		getSubjectsRepository,
		getProfilesSubjectsRepository,
		createProfileSubjectRepository,
		deleteProfileSubjectRepository,
    updateProfileRepository,
    updateStudentRepository,
    updateTeacherRepository
  );

  return { sut, getProfilesRepository };
}

describe('[Unit] Update Profile Registration Service', () => {
  it('should return ProfileDoesNotExistsError if profile does not exists', async () => {
    const { sut } = await makeSut([
      {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(12),
        type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
        level: 12,
        created_at: new Date(),
        is_deleted: false,
      }
    ]);

    const output = await sut.execute({
      id: faker.datatype.uuid(),
      name: faker.random.words(4),
      email: faker.internet.email(),
      subjectsIds: [],
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(ProfileDoesNotExistsError);
  });

  it('should be able to update profile registration data of a student', async () => {
    const id = faker.datatype.uuid();
    const { sut, getProfilesRepository } = await makeSut([
      {
        id,
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(12),
        type: 'student',
        level: 12,
        created_at: new Date(),
        is_deleted: false,
      }
    ], [
      {
        id: faker.datatype.uuid(),
        name: faker.random.words(4),
        created_at: new Date(),
        is_deleted: false,
        profile_id: id,
      }
    ]);

    const input = {
      id,
      name: faker.random.words(4),
      email: faker.internet.email(),
      subjectsIds: [],
    };

    const output = await sut.execute(input);

    const [ updatedProfile ] = await getProfilesRepository.get({
      where: [['id', '=', id]],
      relations: {
        student: {
          fields: ['name'],
        },
      }
    });

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toBeNull();
    expect(updatedProfile).toEqual(expect.objectContaining<Partial<IProfileModel>>({
      id,
      email: input.email,

      student: expect.objectContaining<Partial<IStudentModel>>({
        name: input.name,
      }),
    }));
  });

  it('should be able to update profile registration data of a teacher', async () => {
    const profileId = faker.datatype.uuid();
		const subjectsIds = faker.datatype.array(10).map(() => faker.datatype.number()); // generate random subjectsIds

    const { sut, getProfilesRepository } = await makeSut([
      {
        id: profileId,
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(12),
        type: 'teacher',
        level: 12,
        created_at: new Date(),
        is_deleted: false,
      }
    ], [], [
      {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        created_at: new Date(),
        is_deleted: false,
        profile_id: profileId,
      }
    ], [
			...subjectsIds.map<ISubjectModel>(subjectId => ({
				id: subjectId,
				name: faker.name.fullName(),
				display_name: faker.name.fullName(),
				description: faker.random.words(6),
				is_deleted: false,
				created_at: new Date(),
			}))
		], [
			...subjectsIds.map<IProfileSubjectModel>(subjectId => ({
				profile_id: profileId,
				subject_id: subjectId,
				created_at: new Date(),
			}))
		]);

    const input = {
      id: profileId,
      name: faker.random.words(4),
      email: faker.internet.email(),
      subjectsIds: subjectsIds.filter(() => faker.datatype.boolean()), // get randomized subjectsIds
    };

    const output = await sut.execute(input);

    const [ updatedProfile ] = await getProfilesRepository.get({
      where: [['id', '=', profileId]],
      relations: {
        teacher: { fields: ['name'] },
				subjects: { fields: ['name'] }
      }
    });

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toBeNull();
    expect(updatedProfile).toMatchObject({
      id: profileId,
      email: input.email,

      teacher: {
        name: input.name,
      },

			subjects: expect.any(Array),
    });
  });
});
