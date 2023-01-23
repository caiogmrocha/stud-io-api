import { Either, left, right } from "@/utils/logic/either";
import { IValidator } from "../contracts/i-validator";
import { MinimumValueError } from "../errors/minimum-value-error";

export class MinimumValueValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly fieldValue: unknown,
    public readonly minimumValue: number,
  ) {}

  async validate(): Promise<Either<MinimumValueError, void>> {
    if (!this.fieldValue) {
      return left(new MinimumValueError(this.fieldName, this.fieldValue, this.minimumValue));
    }

    if (typeof this.fieldValue === 'string') {
      if (this.fieldValue.length < this.minimumValue) {
        return left(new MinimumValueError(this.fieldName, this.fieldValue, this.minimumValue));
      }
    }

    if (typeof this.fieldValue === 'number') {
      if (this.fieldValue < this.minimumValue) {
        return left(new MinimumValueError(this.fieldName, this.fieldValue, this.minimumValue));
      }
    }

    if (Array.isArray(this.fieldValue)) {
      if (this.fieldValue.length < this.minimumValue) {
        return left(new MinimumValueError(this.fieldName, this.fieldValue, this.minimumValue));
      }
    }

    if (typeof this.fieldValue === 'object') {
      if (Object.keys(this.fieldValue).length < this.minimumValue) {
        return left(new MinimumValueError(this.fieldName, this.fieldValue, this.minimumValue));
      }
    }

    return right(undefined);
  }
}
