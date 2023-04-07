import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { UpdateProfileRegistrationService } from "./update-profile-registration-service";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { faker } from "@faker-js/faker";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { InMemoryUpdateProfileRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-update-profile-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";

type SutTypes = {
  getProfilesRepository: InMemoryGetProfilesRepository;
  sut: UpdateProfileRegistrationService;
}

async function makeSut(profilesData: IProfileModel[] = [], studentsData: IStudentModel[] = []): Promise<SutTypes> {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: studentsData,
    teachers: [],
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const updateProfileRepository = new InMemoryUpdateProfileRepository();
  const sut = new UpdateProfileRegistrationService(getProfilesRepository, updateProfileRepository);

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

  it('should be able to update profile registration data', async () => {
    const id = faker.datatype.uuid();
    const { sut, getProfilesRepository } = await makeSut([
      {
        id,
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(12),
        type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
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

    await new Promise(resolve => setTimeout(resolve, 3000))

    console.log('updatedProfile: ', updatedProfile)

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toBeNull();
    expect(updatedProfile).toEqual(expect.objectContaining<Partial<IProfileModel>>({
      id,
      email: input.email,

      student: expect.objectContaining<Partial<IProfileModel['student']>>({
        name: input.name,
      }),
    }));
  });
});
