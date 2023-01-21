import { BCryptCompareError } from "@/app/contracts/encription/bcrypt/errors/bcrypt-compare-error";
import { BCryptHashError } from "@/app/contracts/encription/bcrypt/errors/bcrypt-hash-error";
import { IBCryptProvider } from "@/app/contracts/encription/bcrypt/i-bcrypt-provider";
import { Either, left, right } from "@/utils/logic/either";

import crypto from 'node:crypto';

export class FakeBCryptProvider implements IBCryptProvider {
  async hash(data: string | Buffer, salt: number): Promise<Either<BCryptHashError, string>> {
    try {
      const hashedData = crypto.createHash('md5').update(data).digest('hex');

      return right(hashedData);
    } catch (error) {
      return left(new BCryptHashError(data.toString()));
    }
  }

  async compare(comparable: string, comparing: string): Promise<Either<BCryptCompareError, boolean>> {
    try {
      const hashedComparable = crypto.createHash('md5').update(comparable).digest('hex');

      return right(hashedComparable === comparing);
    } catch (error) {
      return left(new BCryptCompareError(comparable, comparing));
    }
  }
}
