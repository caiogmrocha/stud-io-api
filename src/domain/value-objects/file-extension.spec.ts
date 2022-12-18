import { InvalidFileExtension } from "./errors/invalid-file-extension"
import { FileExtension } from "./file-extension"

describe('[Unit] File Extension Value Object', () => {
  it('should accept valid extension', () => {
    const sut1 = FileExtension.create('.txt')
    const sut2 = FileExtension.create('.html')
    const sut3 = FileExtension.create('.png')
    const sut4 = FileExtension.create('.jpg')
    const sut5 = FileExtension.create('.gif')
    const sut6 = FileExtension.create('.mp4')
    const sut7 = FileExtension.create('.mp3')
    const sut8 = FileExtension.create('.pdf')

    expect(sut1.isRight()).toBeTruthy()
    expect(sut1.value).toBeInstanceOf(FileExtension)
    expect(sut2.isRight()).toBeTruthy()
    expect(sut2.value).toBeInstanceOf(FileExtension)
    expect(sut3.isRight()).toBeTruthy()
    expect(sut3.value).toBeInstanceOf(FileExtension)
    expect(sut4.isRight()).toBeTruthy()
    expect(sut4.value).toBeInstanceOf(FileExtension)
    expect(sut5.isRight()).toBeTruthy()
    expect(sut5.value).toBeInstanceOf(FileExtension)
    expect(sut6.isRight()).toBeTruthy()
    expect(sut6.value).toBeInstanceOf(FileExtension)
    expect(sut7.isRight()).toBeTruthy()
    expect(sut7.value).toBeInstanceOf(FileExtension)
    expect(sut8.isRight()).toBeTruthy()
    expect(sut8.value).toBeInstanceOf(FileExtension)
  })

  it('should reject invalid extension', () => {
    const sut1 = FileExtension.create('png')
    const sut2 = FileExtension.create('.')

    expect(sut1.isLeft()).toBeTruthy()
    expect(sut2.isLeft()).toBeTruthy()
    expect(sut1.value).toEqual(new InvalidFileExtension('png'))
    expect(sut2.value).toEqual(new InvalidFileExtension('.'))
  })
})
