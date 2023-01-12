export class InvalidMimeTypeError extends Error {
  constructor (type: string) {
    super(`"${type}" is an invalid mimetype.`);
    this.name = 'InvalidMimeType';
  }
}
