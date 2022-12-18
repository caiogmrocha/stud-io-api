import { InvalidFileExtension } from "./errors/invalid-file-extension"
import { FileExtension } from "./file-extension"

describe('[Unit] File Extension Value Object', () => {
  it('should reject invalid extension', () => {
    const sut1 = FileExtension.create('png')
    const sut2 = FileExtension.create('.')

    expect(sut1.isLeft()).toBeTruthy()
    expect(sut2.isLeft()).toBeTruthy()
    expect(sut1.value).toEqual(new InvalidFileExtension('png'))
    expect(sut2.value).toEqual(new InvalidFileExtension('.'))
  })
})
