import { Either, left, right } from "@/utils/logic/either";
import { IValidator } from "@/validation/contracts/i-validator";
import { IsArrayValidatorError } from "@/validation/errors/primitive-types/is-array-validator-error";

export class IsArrayValidator implements IValidator {
	constructor (
		public readonly fieldName: string,
    public readonly fieldValue: unknown,
	) {}

	async validate(): Promise<Either<Error, void>> {
		if (!Array.isArray(this.fieldValue)) {
			return left(new IsArrayValidatorError(this.fieldName));
		}

		return right(undefined);
	}
}
