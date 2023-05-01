import { Either, left, right } from "@/utils/logic/either";
import { IValidator, IValidatorCallback } from "@/validation/contracts/i-validator";
import { IsArrayValidatorError } from "@/validation/errors/primitive-types/is-array-validator-error";

export class IsArrayValidator implements IValidator {
	constructor (
		public readonly fieldName: string,
    public readonly fieldValue: unknown,
		public readonly cb?: IValidatorCallback,
	) {}

	async validate(): Promise<Either<Error, void>> {
		if (!Array.isArray(this.fieldValue)) {
			return left(new IsArrayValidatorError(this.fieldName));
		}

		if (!this.cb) {
			return right(undefined);
		}

		const itemsValidators = this.fieldValue.map((item, index) => {
			return this.cb!(`${this.fieldName}[${index}]`, item).validate();
		});

		for await (const validation of itemsValidators) {
			if (validation.isRight()) {
				continue;
			}

			return left(validation.value);
		}

		return right(undefined);
	}
}
