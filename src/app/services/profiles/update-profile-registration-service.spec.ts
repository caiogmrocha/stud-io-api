import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { UpdateProfileRegistrationService } from "./update-profile-registration-service";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { faker } from "@faker-js/faker";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";

type SutTypes = {
  sut: UpdateProfileRegistrationService;
}

async function makeSut(profilesData: IProfileModel[]): Promise<SutTypes> {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: [],
    teachers: [],
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const sut = new UpdateProfileRegistrationService(getProfilesRepository);

  return { sut };
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

  // it('should be able to update profile registration data')
});
