import { IBCryptProvider } from "@/app/contracts/encription/bcrypt/i-bcrypt-provider";
import { BCryptCompareError } from "@/app/contracts/encription/bcrypt/errors/bcrypt-compare-error";
import { BCryptHashError } from "@/app/contracts/encription/bcrypt/errors/bcrypt-hash-error";
import { Either, left, right } from "@/utils/logic/either";

import bcrypt from 'bcrypt';

export class BCryptHashProvider implements IBCryptProvider {
  async hash(data: string | Buffer, salt: number): Promise<Either<BCryptHashError, string>> {
    try {
      const hashedData = await bcrypt.hash(data, salt);

      return right(hashedData);
    } catch (error) {
      return left(new BCryptHashError(data.toString()))
    }
  }

  async compare(comparable: string, comparing: string): Promise<Either<BCryptCompareError, boolean>> {
    try {
      const comparisonResult = await bcrypt.compare(comparable, comparing);

      return right(comparisonResult);
    } catch (error) {
      return left(new BCryptCompareError(comparable, comparing));
    }
  }
}
