import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { JWTSignError } from "@/app/contracts/auth/jwt/errors/jwt-sign-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

import { Either, right } from "@/utils/logic/either";

export class FakeAuthenticationJWTProvider<IPayload> implements IJWTAuthenticationProvider<IPayload> {
  async sign(params: IPayload, expiresIn: number): Promise<Either<
    JWTSignError<IPayload>,
    string
  >> {
    const token = Buffer.from(JSON.stringify(params)).toString('base64');

    return right(token);
  }

  async verify(accessToken: string): Promise<Either<JWTVerifyError, IPayload>> {
    const payload: IPayload = JSON.parse(Buffer.from(accessToken, 'base64').toString('utf-8'));

    return right(payload);
  }
}
