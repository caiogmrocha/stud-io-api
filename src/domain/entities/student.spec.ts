import { Profile, Student, Subject } from "."

import { faker } from '@faker-js/faker'
import { Password } from "../value-objects"

describe('[Unit] Student Entity', () => {
  it('should return with correct properties', () => {
    const sut = new Student({
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      isDeleted: false,

      profile: new Profile({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: Password.create(faker.random.alphaNumeric(12), false).value as Password,
        level: Number(faker.random.numeric()),
        type: faker.helpers.arrayElement(['student', 'teacher']),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      }),
      subjects: [new Subject({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        displayName: faker.name.fullName(),
        description: faker.random.words(7),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })]
    })

    expect(sut.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: undefined,
      isDeleted: false,

      profile: expect.any(Profile),
      subjects: expect.arrayContaining([
        expect.any(Subject)
      ]),
    }))
  })
})
