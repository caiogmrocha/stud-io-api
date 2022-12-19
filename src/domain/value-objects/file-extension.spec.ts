import { InvalidFileExtensionError } from "./errors/invalid-file-extension"
import { FileExtension } from "./file-extension"

describe('[Unit] File Extension Value Object', () => {
  it('should accept valid extension', () => {
    const suts = [
      FileExtension.create('.txt'),
      FileExtension.create('.html'),
      FileExtension.create('.png'),
      FileExtension.create('.jpg'),
      FileExtension.create('.gif'),
      FileExtension.create('.mp4'),
      FileExtension.create('.mp3'),
      FileExtension.create('.pdf'),
    ]

    suts.forEach(sut => {
      expect(sut.isRight()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(FileExtension)
    })
  })

  it('should reject invalid extension', () => {
    const suts = [
      FileExtension.create('png'),
      FileExtension.create('.'),
    ]

    suts.forEach(sut => {
      expect(sut.isLeft()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(InvalidFileExtensionError)
    })
  })
})
