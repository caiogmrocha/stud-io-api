export class InvalidFileExtensionError extends Error {
  constructor (extension: string) {
    super(`"${extension}" is an invalid extension.`);
    this.name = 'InvalidFileExtensionError';
  }
}
