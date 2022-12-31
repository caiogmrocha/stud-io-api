import { RegisterProfileService } from "./register-profile-service";
import { ProfileAlreadyExistsError } from "./errors/profile-already-exists-error";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";

import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RegisterProfileService,
  profilesRepository: IGetProfilesRepository,
}

async function makeSut(profilesData: IProfileModel[] = []): Promise<SutTypes> {
  await setupInMemoryDatabase({ profiles: profilesData });

  const profilesRepository = new InMemoryGetProfilesRepository();
  const sut = new RegisterProfileService(profilesRepository);

  return { sut, profilesRepository };
}

describe('[Unit] Register Student Service', () => {
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
      subjectsIds: [],
    });

    expect(output.isLeft()).toBeTruthy();
    expect(output.value).toBeInstanceOf(ProfileAlreadyExistsError);
  });
});
