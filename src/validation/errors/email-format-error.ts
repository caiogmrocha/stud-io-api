export class EmailFormatError extends Error {
  constructor (fieldValue: unknown) {
    super(`O valor "${fieldValue}" não é um e-mail válido.`);
    this.name = 'EmailFormatError';
  }
}
