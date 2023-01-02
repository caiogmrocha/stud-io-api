import { Either, left, right } from "@/utils/logic/either";
import { IValidator } from "../contracts/i-validator";
import { ValueInListError } from "../errors/value-in-list-error";

export class ValueInListValidator implements IValidator {
  constructor (
    public readonly fieldName: string,
    public readonly fieldValue: unknown,
    public readonly validValues: Array<any> = [],
  ) {}

  async validate(): Promise<Either<Error, void>> {
    if (!this.validValues.includes(this.fieldValue)) {
      return left(new ValueInListError(this.fieldName, this.validValues));
    }

    return right(undefined);
  }
}
