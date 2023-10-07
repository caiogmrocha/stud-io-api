import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { JWTSignError } from "@/app/contracts/auth/jwt/errors/jwt-sign-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

import { Either, left, right } from "@/utils/logic/either";
import jwt from 'jsonwebtoken';
import { env } from "@/utils/env";


export class JWTAuthenticationProvider implements IJWTAuthenticationProvider {
  async sign(params: any, expiresIn: number): Promise<Either<
    JWTSignError<any>,
    string
  >> {
    try {
      const token = jwt.sign(params, env.JWT_SECRET, {
        expiresIn,
      });

      return right(token);
    } catch (error) {
      return left(new JWTSignError(params));
    }
  }

  async verify(accessToken: string): Promise<Either<JWTVerifyError, any>> {
    try {
      const decoded = jwt.verify(accessToken, env.JWT_SECRET) as any;

      return right(decoded);
    } catch (error) {
      return left(new JWTVerifyError(accessToken));
    }
  }
}
