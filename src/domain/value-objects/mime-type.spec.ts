import { InvalidMimeType } from "./errors/invalid-mime-type"
import { MimeType } from "./mime-type"

describe('[Unit] Media Type Value Object', () => {
  it('should reject invalid media type', () => {
    const sut1 = MimeType.create('application')
    const sut2 = MimeType.create('html')
    const sut3 = MimeType.create('pdf')

    expect(sut1.isLeft()).toBeTruthy()
    expect(sut2.isLeft()).toBeTruthy()
    expect(sut3.isLeft()).toBeTruthy()
    expect(sut1.value).toEqual(new InvalidMimeType('application'))
    expect(sut2.value).toEqual(new InvalidMimeType('html'))
    expect(sut3.value).toEqual(new InvalidMimeType('pdf'))
  })
})
