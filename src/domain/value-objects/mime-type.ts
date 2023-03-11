import { Either, left, right } from "@/utils/logic/either";
import { InvalidMimeTypeError } from "./errors/invalid-mime-type";

export const validMimeTypes = [
  'text/plain',
  'text/html',
  'image/gif',
  'image/png',
  'image/jpeg',
  'video/webm',
  'video/ogg',
  'application/pdf',
] as const;

export type IValidMimeType = typeof validMimeTypes[number];

export class MimeType {
  private constructor(private readonly type: IValidMimeType) {}

  static validate(value: any): Either<InvalidMimeTypeError, IValidMimeType> {
    if (!validMimeTypes.includes(value)) {
      return left(new InvalidMimeTypeError(value))
    }

    return right(value)
  }

  static create(value: any): Either<InvalidMimeTypeError, MimeType> {
    const valueValidation = this.validate(value)

    if (valueValidation.isLeft()) {
      return left(valueValidation.value)
    }

    return right(new MimeType(value))
  }

  get value(): IValidMimeType {
    return this.type;
  }
}
