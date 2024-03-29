import { InvalidPasswordError } from "./errors/invalid-password"
import { Password } from "./password"

describe('[Unit] Password Value Object', () => {
  it('should reject invalid password', () => {
    const suts = [
      Password.create('a'.repeat(11), false),
      Password.create('a'.repeat(256), false),
    ]

    suts.forEach(sut => {
      expect(sut.isLeft()).toBeTruthy()
      expect(sut.value).toBeInstanceOf(InvalidPasswordError)
    })
  })

  it('should accept valid password', () => {
    const sut = Password.create('a'.repeat(12), false)

    expect(sut.isRight()).toBeTruthy()
    expect(sut.value).toBeInstanceOf(Password)
  })

  it('should be able to return hashed password', async () => {
    const password = Password.create('a'.repeat(12), false).value as Password

    const sut = await password.getHashedValue()

    expect(sut.length).toBe(60)
  })
})
