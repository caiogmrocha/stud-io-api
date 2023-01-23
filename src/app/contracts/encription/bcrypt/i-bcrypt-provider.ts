import { Either } from "@/utils/logic/either";
import { BCryptCompareError } from "./errors/bcrypt-compare-error";
import { BCryptHashError } from "./errors/bcrypt-hash-error";

export interface IBCryptProvider {
  hash(data: string | Buffer, salt: number): Promise<Either<BCryptHashError, string>>;
  compare(comparable: string, comparing: string): Promise<Either<BCryptCompareError, boolean>>;
}
