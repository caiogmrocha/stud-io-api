import { Either, left, right } from "@/utils/logic/either";
import { hash } from "bcrypt";
import { InvalidPasswordError } from "./errors/invalid-password";

export class Password {
  private constructor (
    private readonly password: string,
    private readonly isHashed: boolean,
  ) {}

  static validate(value: string, isHashed: boolean): Either<InvalidPasswordError, string> {
    if (!isHashed && (value.length < 12 || value.length > 255)) {
      return left(new InvalidPasswordError(value))
    }

    return right(value)
  }

  static create(value: string, isHashed: boolean): Either<InvalidPasswordError, Password> {
    const valueValidation = this.validate(value, isHashed)

    if (valueValidation.isLeft()) {
      return left(valueValidation.value)
    }

    return right(new Password(valueValidation.value, isHashed))
  }

  async getHashedValue(): Promise<string> {
    if (this.isHashed) {
      return this.password
    }

    return await hash(this.password, 8)
  }
}
