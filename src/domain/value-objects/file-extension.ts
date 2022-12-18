import { Either, left, right } from "@/utils/logic/either";
import { InvalidFileExtension } from "./errors/invalid-file-extension";

export const validFileExtensions = [
  '.txt',
  '.html',
  '.png',
  '.jpg',
  '.gif',
  '.mp4',
  '.mp3',
  '.pdf',
]

export type IValidFileExtension = typeof validFileExtensions[number]

export class FileExtension {
  private constructor (private readonly extension: string) {}

  static validate(value: string): Either<InvalidFileExtension, IValidFileExtension> {
    if (!validFileExtensions.includes(value)) {
      return left(new InvalidFileExtension(value))
    }

    return right(value)
  }

  static create(value: string) {
    const valueValidation = this.validate(value)

    if (valueValidation.isLeft()) {
      return left(valueValidation.value)
    }

    return right(new FileExtension(value))
  }
}
