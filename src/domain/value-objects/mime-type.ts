import { Either, left, right } from "@/utils/logic/either";
import { InvalidMimeType } from "./errors/invalid-mime-type";

export const validMimeTypes = [
  'text/plain',
  'text/html',
  'image/gif',
  'image/png',
  'image/jpeg',
  'video/webm',
  'video/ogg',
  'application/pdf',
];

export type IValidMimeType = typeof validMimeTypes[number];

export class MimeType {
  private constructor(private readonly type: string) {}

  static validate(value: string): Either<InvalidMimeType, IValidMimeType> {
    if (!validMimeTypes.includes(value)) {
      return left(new InvalidMimeType(value))
    }

    return right(value)
  }

  static create(value: IValidMimeType): Either<InvalidMimeType, MimeType> {
    const valueValidation = this.validate(value)

    if (valueValidation.isRight()) {
      return right(new MimeType(value))
    }

    return left(valueValidation.value)
  }
}
