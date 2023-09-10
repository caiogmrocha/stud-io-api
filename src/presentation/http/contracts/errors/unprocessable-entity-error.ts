import { IValidationErrorMessages } from "@/validation/contracts/i-validation-error-messages";

export class UnprocessableEntityError extends Error {
	public readonly errors: IValidationErrorMessages;

	constructor(message: string, errors: IValidationErrorMessages) {
		super(message);
		this.name = 'UnprocessableEntityError';
		this.errors = errors;
	}
}
