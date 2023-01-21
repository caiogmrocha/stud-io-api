import { InMemoryGetProfilesRepository } from "@/../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { IAuthenticateProfileUseCase } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case"
import { FakeAuthenticationJWTProvider } from "@/../tests/mocks/infra/auth/jwt/fake-jwt-authentication-provider";
import { FakeBCryptProvider } from "@/../tests/mocks/infra/encription/bcrypt/fake-bcrypt-provider";
import { AuthenticateProfileService } from "./authenticate-profile-service"
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";
import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";

import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';

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
  const bcryptProvider = new FakeBCryptProvider();
  const sut = new AuthenticateProfileService(
    getProfilesRepository,
    jwtAuthenticationProvider,
    bcryptProvider,
  );

  return { sut };
}

describe('[Unit] Authenticate Profile Service', () => {
  it('should return token if the provided e-mail and password match with some profile in data source', async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(12);
    const { sut } = await makeSut([
      {
        id: faker.datatype.uuid(),
        email,
        password: await bcrypt.hash(password, 10),
        type: 'student',
        level: 10,
        created_at: new Date(),
        is_deleted: false,
      }
    ]);

    const result = await sut.execute({ email, password });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toEqual(expect.objectContaining({
      token: expect.any(String),
    }));
  });

  it('should return ProfileDoesNotExistsError if the provided e-mail and password does not exists in data source', async () => {
    const { sut } = await makeSut([
      {
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.random.alphaNumeric(12), 10),
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
