import { RequiredValueError } from "../errors/required-value-error";
import { RequiredValueValidator } from "./required-value-validator";

describe('[Unit] Required Value Validator', () => {
  it('should return undefined if the provided value is invalid', async () => {
    const sut = new RequiredValueValidator('name', 'John Doe');

    const result = await sut.validate();

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeUndefined();
  });

  it('should return RequiredValueError if the provided value is invalid', async () => {
    const suts = [
      new RequiredValueValidator('name', null).validate(),
      new RequiredValueValidator('name', undefined).validate(),
      new RequiredValueValidator('name', '').validate(),
    ];

    for await (const result of suts) {
      expect(result.isLeft()).toBeTruthy();
      expect(result.value).toBeInstanceOf(RequiredValueError);
    }
  });
});
