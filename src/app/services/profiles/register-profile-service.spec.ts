import { RegisterProfileService } from "./register-profile-service";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { InMemoryCreateProfileRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-create-profile-repository";
import { InMemoryCreateStudentRepository } from "@/../tests/mocks/infra/in-memory/students/in-memory-create-student-repository";
import { InMemoryCreateTeacherRepository } from "@/../tests/mocks/infra/in-memory/teachers/in-memory-create-teacher-repository";
import { ProfileAlreadyExistsError } from "./errors/profile-already-exists-error";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";

import { faker } from "@faker-js/faker";
import { FakeBCryptProvider } from "@/../tests/mocks/infra/encription/bcrypt/fake-bcrypt-provider";

type SutTypes = {
  sut: RegisterProfileService
}

async function makeSut(profilesData: IProfileModel[] = []): Promise<SutTypes> {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: [],
    teachers: [],
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const createProfileRepository = new InMemoryCreateProfileRepository();
  const createStudentRepository = new InMemoryCreateStudentRepository();
  const createTeacherRepository = new InMemoryCreateTeacherRepository();
  const bcryptProvider = new FakeBCryptProvider();
  const sut = new RegisterProfileService(
    getProfilesRepository,
    createProfileRepository,
    createStudentRepository,
    createTeacherRepository,
    bcryptProvider,
  );

  return { sut };
}

describe('[Unit] Register Profile Service', () => {
  it('should be able to register the provided profile', async () => {
    const { sut } = await makeSut();

    const output = await sut.execute({
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(12),
      name: faker.name.fullName(),
      type: faker.helpers.arrayElement(['student', 'teacher']),
      subjectsIds: [],
    });

    expect(output.isRight()).toBeTruthy();
    expect(output.value).toEqual(expect.objectContaining({
      profile: expect.objectContaining({
        name: expect.any(String),
        email: expect.any(String),
      })
    }));
  });

  it('should return ProfileAlreadyExistsError if profile already exists', async () => {
    const commonData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(12),
    };
    const { sut } = await makeSut([ {
      ...commonData,
      id: faker.datatype.uuid(),
      type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
      level: 12,
      created_at: new Date(),
      is_deleted: false,
    } ]);

    const output = await sut.execute({
      ...commonData,
      type: faker.helpers.arrayElement(['student', 'teacher']),
      subjectsIds: [],
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(ProfileAlreadyExistsError);
  });
});
