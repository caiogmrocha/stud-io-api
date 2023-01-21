import { Either } from "@/utils/logic/either";
import { JWTSignError } from "./errors/jwt-sign-error";
import { JWTVerifyError } from "./errors/jwt-verify-error";

export interface IJWTAuthenticationProvider<IPayload = any> {
  sign(params: IPayload, expiresIn: number): Promise<Either<JWTSignError, string>>;
  verify(accessToken: string): Promise<Either<JWTVerifyError, IPayload>>;
}
