import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { JWTSignError } from "@/app/contracts/auth/jwt/errors/jwt-sign-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

import { Either, right } from "@/utils/logic/either";

export class FakeAuthenticationJWTProvider implements IJWTAuthenticationProvider {
  async sign(params: any, expiresIn: number): Promise<Either<
    JWTSignError<any>,
    string
  >> {
    const token = Buffer.from(JSON.stringify(params)).toString('base64');

    return right(token);
  }

  async verify(accessToken: string): Promise<Either<JWTVerifyError, any>> {
    const payload: any = JSON.parse(Buffer.from(accessToken, 'base64').toString('utf-8'));

    return right(payload);
  }
}
