import { IAuthenticateProfileUseCase, IAuthenticateProfileUseCaseInputBoundary, IAuthenticateProfileUseCaseOutPutBoundary } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { ProfileDoesNotExistsError } from "./errors/profile-does-not-exists-error";

import { Either, left, right } from "@/utils/logic/either";
import { compare } from "bcrypt";

export class AuthenticateProfileService implements IAuthenticateProfileUseCase {
  constructor (
    private readonly getProfilesRepository: IGetProfilesRepository,
    private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
  ) {}

  async execute(input: IAuthenticateProfileUseCaseInputBoundary): Promise<Either<
    Error,
    IAuthenticateProfileUseCaseOutPutBoundary
  >> {
    const [ profileFoundedByEmail ] = await this.getProfilesRepository.get({ where: [
      ['email', '=', input.email],
    ]});

    if (!profileFoundedByEmail) {
      return left(new ProfileDoesNotExistsError());
    }

    const passwordMatchWithProfile = await compare(input.password, profileFoundedByEmail.password);

    if (!passwordMatchWithProfile) {
      return left(new ProfileDoesNotExistsError());
    }

    const token = await this.jwtAuthenticationProvider.sign({
      id: profileFoundedByEmail.id,
      ...input
    }, 36000);

    if (token.isLeft()) {
      return left(token.value);
    }

    return right({ token: token.value });
  }
}