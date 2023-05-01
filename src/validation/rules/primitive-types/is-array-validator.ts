import { Either, left, right } from "@/utils/logic/either";
import { IValidator } from "@/validation/contracts/i-validator";
import { IsArrayValidatorError } from "@/validation/errors/primitive-types/is-array-validator-error";
import { ValidationComposite } from "@/validation/validation-composite";

type ICallback = (fieldName: string, fieldValue: unknown) => ValidationComposite;

export class IsArrayValidator implements IValidator {
	constructor (
		public readonly fieldName: string,
    public readonly fieldValue: unknown,
	) {}

	async validate(cb?: ICallback): Promise<Either<Error, void>> {
		if (!Array.isArray(this.fieldValue)) {
			return left(new IsArrayValidatorError(this.fieldName));
		}

		if (!cb) {
			return right(undefined);
		}

		const itemsValidators = this.fieldValue.map((item, index) => {
			return cb(`${this.fieldName}[${index}]`, item).validate();
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
