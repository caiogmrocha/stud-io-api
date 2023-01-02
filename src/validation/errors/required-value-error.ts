export class RequiredValueError extends Error {
  constructor (fieldName: string) {
    super(`O campo ${fieldName} é obrigatório.`);
    this.name = 'RequiredValueError';
  }
}
