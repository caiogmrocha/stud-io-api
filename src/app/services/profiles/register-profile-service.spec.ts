import { RegisterProfileService } from "./register-profile-service";
import { ProfileAlreadyExistsError } from "./errors/profile-already-exists-error";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/in-memory-get-profiles-repository";
import { IGetProfilesRepository } from "@/app/contracts/repositories/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/i-profile-model";

import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RegisterProfileService,
  profilesRepository: IGetProfilesRepository,
}

function makeSut(profilesData: IProfileModel[] = []): SutTypes {
  const profilesRepository = new InMemoryGetProfilesRepository(profilesData);
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
    const { sut } = makeSut([ {
      ...commonData,
      id: faker.datatype.uuid(),
      type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
      level: 12,
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
