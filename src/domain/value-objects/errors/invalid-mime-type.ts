export class InvalidMimeType extends Error {
  constructor (type: string) {
    super(`"${type}" is an invalid mimetype.`);
    this.name = 'InvalidMimeType';
  }
}
