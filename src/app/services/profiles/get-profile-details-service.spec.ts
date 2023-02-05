import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { faker } from "@faker-js/faker";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { GetProfileDetailsService } from "./get-profile-details-service";

async function makeSut(profilesData: IProfileModel[] = []) {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: [],
    teachers: [],
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const sut = new GetProfileDetailsService(getProfilesRepository);

  return { sut }
}

describe('[] Get Profile Details Service', () => {
  it('should return null if profile does not exists', async () => {
    const { sut } = await makeSut();

    const result = await sut.execute({ profileId: faker.datatype.uuid() });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ProfileDoesNotExistsError);
  });

  // it("should return a Profile entity with it's owner if that exists", async () => {

  // });
});
