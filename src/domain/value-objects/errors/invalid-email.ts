export class InvalidEmailError extends Error {
  constructor (extension: string) {
    super(`"${extension}" is an invalid e-mail.`);
    this.name = 'InvalidEmailError';
  }
}
