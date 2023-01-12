import { ValueInListError } from "../errors/value-in-list-error";
import { ValueInListValidator } from "./value-in-list-validator";

describe('[Unit] Value In List Validator', () => {
  it('should return undefined if the provided value is valid', async () => {
    const sut = new ValueInListValidator('polygon', 'square', ['square', 'triangle', 'circle']);

    const result = await sut.validate();

    expect(result.isRight()).toBeTruthy(),
    expect(result.value).toBeUndefined();
  });

  it('should return ValueInListError if the provided value is invalid', async () => {
    const sut = new ValueInListValidator('polygon', 'square', ['triangle', 'circle']);

    const result = await sut.validate();

    expect(result.isLeft()).toBeTruthy(),
    expect(result.value).toBeInstanceOf(ValueInListError);
  });
});
