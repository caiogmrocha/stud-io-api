import { Email } from "./email"
import { InvalidEmailError } from "./errors/invalid-email"

describe('[Unit] Email Value Object', () => {
  it('should accept valid e-mail', () => {
    const sut = Email.create('email@email.com')

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Email)
  })

  it('should reject invalid e-mail', () => {
    const suts = [
      Email.create('test'),
      Email.create('@'),
      Email.create('@email.com'),
      Email.create('.com'),
    ]

    suts.forEach(sut => {
      expect(sut.isLeft()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(InvalidEmailError)
    })
  })
})
