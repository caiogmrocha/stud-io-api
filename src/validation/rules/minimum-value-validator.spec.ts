import { MinimumValueError } from "../errors/minimum-value-error";
import { MinimumValueValidator } from "./minimum-value-validator";

describe('[Unit] Minimum Value Validator', () => {
  it('should return undefined if the provided value is valid', async () => {
    const suts = [
      new MinimumValueValidator('string', 'value', 5).validate(),
      new MinimumValueValidator('number', 10, 10).validate(),
      new MinimumValueValidator('array', [1, 2, 3], 3).validate(),
      new MinimumValueValidator('object', {
        prop1: 1,
        prop2: 2,
        prop3: 3,
      }, 3).validate(),
    ];

    for await (const result of suts) {
      expect(result.isRight()).toBeTruthy();
      expect(result.value).toBeUndefined();
    }
  });

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
