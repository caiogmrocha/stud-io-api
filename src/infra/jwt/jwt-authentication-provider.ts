import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { JWTSignError } from "@/app/contracts/auth/jwt/errors/jwt-sign-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";

import { Either, left, right } from "@/utils/logic/either";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export class JWTAuthenticationProvider implements IJWTAuthenticationProvider {
  async sign(params: any, expiresIn: number): Promise<Either<
    JWTSignError<any>,
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

  async verify(accessToken: string): Promise<Either<JWTVerifyError, any>> {
    try {
      const decoded = jwt.verify(accessToken, secret) as any;

      return right(decoded);
    } catch (error) {
			console.log('JWTAuthenticationProvider', error)
      return left(new JWTVerifyError(accessToken));
    }
  }
}
