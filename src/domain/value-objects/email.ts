import { Either, left, right } from "@/utils/logic/either";
import { emailRegex } from "@/utils/regex";
import { InvalidEmailError } from "./errors/invalid-email";

export class Email {
  private constructor (private readonly email: string) {}

  static validate(value: string): Either<InvalidEmailError, string> {
    if (!emailRegex.test(value)) {
      return left(new InvalidEmailError(value))
    }

    return right(value)
  }

  static create(value: string): Either<InvalidEmailError, Email> {
    const valueValidation = this.validate(value)

    if (valueValidation.isLeft()) {
      return left(valueValidation.value)
    }

    return right(new Email(valueValidation.value))
  }

  get value(): string {
    return this.email;
  }
}
