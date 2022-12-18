import { InvalidMimeType } from "./errors/invalid-mime-type"
import { MimeType } from "./mime-type"

describe('[Unit] Media Type Value Object', () => {
  it('should accept valid media type', () => {
    const sut1 = MimeType.create('text/plain');
    const sut2 = MimeType.create('text/html');
    const sut3 = MimeType.create('image/gif');
    const sut4 = MimeType.create('image/png');
    const sut5 = MimeType.create('image/jpeg');
    const sut6 = MimeType.create('video/webm');
    const sut7 = MimeType.create('video/ogg');
    const sut8 = MimeType.create('application/pdf');

    expect(sut1.isRight()).toBeTruthy()
    expect(sut1.value).toBeInstanceOf(MimeType)
    expect(sut2.isRight()).toBeTruthy()
    expect(sut2.value).toBeInstanceOf(MimeType)
    expect(sut3.isRight()).toBeTruthy()
    expect(sut3.value).toBeInstanceOf(MimeType)
    expect(sut4.isRight()).toBeTruthy()
    expect(sut4.value).toBeInstanceOf(MimeType)
    expect(sut5.isRight()).toBeTruthy()
    expect(sut5.value).toBeInstanceOf(MimeType)
    expect(sut6.isRight()).toBeTruthy()
    expect(sut6.value).toBeInstanceOf(MimeType)
    expect(sut7.isRight()).toBeTruthy()
    expect(sut7.value).toBeInstanceOf(MimeType)
    expect(sut8.isRight()).toBeTruthy()
    expect(sut8.value).toBeInstanceOf(MimeType)
  })

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
