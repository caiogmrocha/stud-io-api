import { File, Post, Profile, Subject } from ".";
import { Email, FileExtension, MimeType, Password } from "../value-objects";

import { faker } from "@faker-js/faker";

describe('[Unit] Post Entity', () => {
  it('should return with correct properties', () => {
    const sut = new Post({
      id: faker.datatype.uuid(),
      title: faker.name.fullName(),
      description: faker.random.words(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      isDeleted: false,

      profile: new Profile({
        id: faker.datatype.uuid(),
        email: Email.create(faker.internet.email()).value as Email,
        password: Password.create(faker.random.alphaNumeric(12), false).value as Password,
        level: Number(faker.random.numeric()),
        type: faker.helpers.arrayElement(['student', 'teacher']),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      }),
      subjects: [new Subject({
        id: faker.datatype.number(),
        name: faker.name.firstName(),
        displayName: faker.name.fullName(),
        description: faker.random.words(7),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })],
      files: [new File({
        id: faker.datatype.uuid(),
        name: faker.word.noun(),
        path: faker.internet.url(),
        mimeType: faker.helpers.arrayElement([
          MimeType.create('text/plain').value,
          MimeType.create('text/html').value,
          MimeType.create('image/gif').value,
          MimeType.create('image/png').value,
          MimeType.create('image/jpeg').value,
          MimeType.create('video/webm').value,
          MimeType.create('video/ogg').value,
          MimeType.create('application/pdf').value,
        ]) as MimeType,
        extension: faker.helpers.arrayElement([
          FileExtension.create('.txt').value,
          FileExtension.create('.html').value,
          FileExtension.create('.png').value,
          FileExtension.create('.jpg').value,
          FileExtension.create('.gif').value,
          FileExtension.create('.mp4').value,
          FileExtension.create('.mp3').value,
          FileExtension.create('.pdf').value,
        ]) as FileExtension,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })]
    })

    expect(sut.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: undefined,
      isDeleted: expect.any(Boolean),

      profile: expect.any(Profile),
      subjects: expect.arrayContaining([
        expect.any(Subject),
      ]),
      files: expect.arrayContaining([
        expect.any(File),
      ]),
    }))
  })
})
