import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { JWTSignError } from "@/app/contracts/auth/jwt/errors/jwt-sign-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

import { Either, left, right } from "@/utils/logic/either";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export class JWTAuthenticationProvider<IPayload extends string | object | Buffer> implements IJWTAuthenticationProvider<IPayload> {
  async sign(params: IPayload, expiresIn: number): Promise<Either<
    JWTSignError<IPayload>,
    string
  >> {
    try {
      const token = jwt.sign(params, secret, {
        expiresIn,
      });

      return right(token);
    } catch (error) {
      return left(new JWTSignError(params));
    }
  }

  async verify(accessToken: string): Promise<Either<JWTVerifyError, IPayload>> {
    try {
      const decoded = jwt.verify(accessToken, secret) as IPayload;

      return right(decoded);
    } catch (error) {
      return left(new JWTVerifyError(accessToken));
    }
  }
}
