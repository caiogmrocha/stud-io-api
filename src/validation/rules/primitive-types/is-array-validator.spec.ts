import { IsArrayValidatorError } from "@/validation/errors/primitive-types/is-array-validator-error";
import { IsArrayValidator } from "./is-array-validator";

describe('[Unit] Is Array Validator', () => {
	it('should return IsArrayValidatorError if the provided value is invalid', async () => {
		const suts = [
			new IsArrayValidator('anyField', 'any_text').validate(),
			new IsArrayValidator('anyField', 1234).validate(),
			new IsArrayValidator('anyField', true).validate(),
			new IsArrayValidator('anyField', false).validate(),
			new IsArrayValidator('anyField', {}).validate(),
			new IsArrayValidator('anyField', Symbol('234')).validate(),
		];

		for await (const sut of suts) {
			expect(sut.isLeft()).toBeTruthy();
			expect(sut.value).toBeInstanceOf(IsArrayValidatorError);
		}
	});
});
