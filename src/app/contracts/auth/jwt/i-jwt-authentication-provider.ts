import { Either } from "@/utils/logic/either";
import { JWTSignError } from "./errors/jwt-sign-error";
import { JWTVerifyError } from "./errors/jwt-verify-error";
import { IAuthenticatedProfilePayload } from "@/domain/usecases/profiles/i-authentaticate-profile-use-case";

export interface IJWTAuthenticationProvider<IPayload = IAuthenticatedProfilePayload> {
  sign(params: IPayload, expiresIn: number): Promise<Either<JWTSignError, string>>;
  verify(accessToken: string): Promise<Either<JWTVerifyError, IPayload>>;
}
