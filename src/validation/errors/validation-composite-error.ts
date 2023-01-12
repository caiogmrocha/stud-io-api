import { IValidationErrorMessages } from "../contracts/i-validation-error-messages";

export class ValidationCompositeError extends Error {
  constructor (public readonly errors: IValidationErrorMessages) {
    super('Validation Error');
    this.name = 'ValidationCompositeError';
    this.errors = errors;
  }
}
