import { Either, left, right } from "@/utils/logic/either";
import { IValidator } from "../contracts/i-validator";
import { RequiredValueError } from "../errors/required-value-error";

export class RequiredValueValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly fieldValue: unknown,
  ) {}

  async validate(): Promise<Either<RequiredValueError, void>> {
    if (this.fieldValue === undefined || this.fieldValue === null || this.fieldValue === '') {
      return left(new RequiredValueError(this.fieldName));
    }

    return right(undefined);
  }
}
