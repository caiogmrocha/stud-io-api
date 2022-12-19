import { InvalidMimeTypeError } from "./errors/invalid-mime-type"
import { MimeType } from "./mime-type"

describe('[Unit] Media Type Value Object', () => {
  it('should accept valid media type', () => {
    const suts = [
      MimeType.create('text/plain'),
      MimeType.create('text/html'),
      MimeType.create('image/gif'),
      MimeType.create('image/png'),
      MimeType.create('image/jpeg'),
      MimeType.create('video/webm'),
      MimeType.create('video/ogg'),
      MimeType.create('application/pdf'),
    ]

    suts.forEach(sut => {
      expect(sut.isRight()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(MimeType)
    })
  })

  it('should reject invalid media type', () => {
    const suts = [
      MimeType.create('application'),
      MimeType.create('html'),
      MimeType.create('pdf'),
    ]

    suts.forEach(sut => {
      expect(sut.isLeft()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(InvalidMimeTypeError)
    })
  })
})
