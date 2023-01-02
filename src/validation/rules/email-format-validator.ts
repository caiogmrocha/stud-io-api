import { Either, left, right } from "@/utils/logic/either";
import { emailRegex } from "@/utils/regex";
import { IValidator } from "../contracts/i-validator";
import { EmailFormatError } from "../errors/email-format-error";

export class EmailFormatValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly fieldValue: unknown,
  ) {}

  async validate(): Promise<Either<EmailFormatError, void>> {
    if (typeof this.fieldValue === 'string') {
      if (!emailRegex.test(this.fieldValue)) {
        return left(new EmailFormatError(this.fieldValue));
      }

      return right(undefined);
    } else {
      return left(new EmailFormatError(this.fieldValue));
    }
  }
}
