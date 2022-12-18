export class InvalidFileExtension extends Error {
  constructor (type: string) {
    super(`"${type}" is an invalid extension.`);
    this.name = 'InvalidFileExtension';
  }
}
