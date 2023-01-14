import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { FakeAuthenticationJWTProvider } from "@/../tests/mocks/infra/auth/jwt/fake-jwt-authentication-provider";
import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { IAuthenticateProfileUseCase } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case"
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";
import { AuthenticateProfileService } from "./authenticate-profile-service"
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

type SutTypes = {
  sut: IAuthenticateProfileUseCase,
}

async function makeSut(profilesData: IProfileModel[] = []): Promise<SutTypes> {
  await setupInMemoryDatabase({
    profiles: profilesData,
    students: [],
    teachers: [],
  });

  const getProfilesRepository = new InMemoryGetProfilesRepository();
  const jwtAuthenticationProvider = new FakeAuthenticationJWTProvider();
  const sut = new AuthenticateProfileService(getProfilesRepository, jwtAuthenticationProvider);

  return { sut };
}

describe('[Unit] Authenticate Profile Service', () => {
  it('should return ProfileDoesNotExistsError if the provided e-mail and password does not exists in data source', async () => {
    const { sut } = await makeSut([
      {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: await hash(faker.random.alphaNumeric(12), 10),
        type: 'student',
        level: 10,
        created_at: new Date(),
        is_deleted: false,
      }
    ]);

    const result = await sut.execute({
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(12),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(ProfileDoesNotExistsError);
  });
});
