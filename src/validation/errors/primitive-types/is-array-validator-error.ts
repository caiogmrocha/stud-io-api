export class IsArrayValidatorError extends Error {
	constructor (fieldName: string) {
    super(`O campo ${fieldName} precisa ser um array.`);
    this.name = 'IsArrayValidatorError';
  }
}
