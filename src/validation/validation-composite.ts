import { Either, left, right } from "@/utils/logic/either";
import { IValidationErrorMessages } from "./contracts/i-validation-error-messages";
import { IValidator } from "./contracts/i-validator";
import { ValidationCompositeError } from "./errors/validation-composite-error";

export class ValidationComposite {
  constructor (private readonly validations: IValidator[]) {}

  async validate(): Promise<Either<ValidationCompositeError, void>> {
    const errors: IValidationErrorMessages = {};

    for (const validation of this.validations) {
      const result = await validation.validate();

      if (result.isLeft()) {
        const error = result.value;

        if (!errors[validation.fieldName]) {
          errors[validation.fieldName] = [];
        }

        errors[validation.fieldName].push(error.message);
      }
    }

    if (Object.keys(errors).length > 0) {
      return left(new ValidationCompositeError(errors));
    }

    return right(undefined);
  }
}
