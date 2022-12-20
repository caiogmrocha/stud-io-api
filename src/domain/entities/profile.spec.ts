import { Post, Profile, Student, Teacher } from "."
import { Email, Password } from "../value-objects"

import { faker } from '@faker-js/faker'

describe('[Unit] Profile Entity', () => {
  it('should return with correct properties', () => {
    const firstSut = new Profile({
      id: faker.datatype.uuid(),
      email: Email.create(faker.internet.email()).value as Email,
      password: Password.create(faker.random.alphaNumeric(12), false).value as Password,
      level: Number(faker.random.numeric()),
      type: faker.helpers.arrayElement(['student', 'teacher']),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      isDeleted: false,

      owner: new Student({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
        profile: undefined,
      }),
      posts: [new Post({
        id: faker.datatype.uuid(),
        title: faker.name.fullName(),
        description: faker.random.words(7),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })],
    })
    const secondSut = new Profile({
      id: faker.datatype.uuid(),
      email: Email.create(faker.internet.email()).value as Email,
      password: Password.create(faker.random.alphaNumeric(12), false).value as Password,
      level: Number(faker.random.numeric()),
      type: faker.helpers.arrayElement(['student', 'teacher']),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      isDeleted: false,

      owner: new Teacher({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
        profile: undefined,
      }),
      posts: [new Post({
        id: faker.datatype.uuid(),
        title: faker.name.fullName(),
        description: faker.random.words(7),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })],
    })

    expect(firstSut.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      email: expect.any(Email),
      password: expect.any(Password),
      level: expect.any(Number),
      type: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: undefined,
      isDeleted: false,
      owner: expect.any(Student),
      posts: expect.arrayContaining([
        expect.any(Post),
      ]),
    }))
    expect(secondSut.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      email: expect.any(Email),
      password: expect.any(Password),
      level: expect.any(Number),
      type: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: undefined,
      isDeleted: false,
      owner: expect.any(Teacher),
      posts: expect.arrayContaining([
        expect.any(Post),
      ]),
    }))
  })
})
