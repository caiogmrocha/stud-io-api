import { MinimumValueError } from "../errors/minimum-value-error";
import { MinimumValueValidator } from "./minimum-value-validator";

describe('[Unit] Minimum Value Validator', () => {
  it('should return MinimumValueError if the provided value is invalid', async () => {
    const suts = [
      new MinimumValueValidator('string', 'value', 6).validate(),
      new MinimumValueValidator('number', 10, 11).validate(),
      new MinimumValueValidator('array', [1, 2, 3], 4).validate(),
      new MinimumValueValidator('object', {
        prop1: 1,
        prop2: 2,
        prop3: 3,
      }, 4).validate(),
    ];

    for await (const result of suts) {
      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(MinimumValueError);
    }
  });
});
