export class InvalidPasswordError extends Error {
  constructor (password: string) {
    super(`"${password}" is an invalid password.`);
    this.name = 'InvalidPasswordError';
  }
}
