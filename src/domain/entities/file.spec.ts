import { faker } from "@faker-js/faker"
import { File, Post } from "."
import { MimeType } from "../value-objects"

describe('[Unit] File Entity', () => {
  it('should return with correct properties', () => {
    const sut = new File({
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
      extension: faker.helpers.arrayElement(['.mp4', '.png', '.pdf', '.md']),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      isDeleted: false,

      post: new Post({
        id: faker.datatype.uuid(),
        title: faker.name.fullName(),
        description: faker.random.words(7),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        isDeleted: false,
      })
    })

    expect(sut.props).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      path: expect.any(String),
      mimeType: expect.any(MimeType),
      extension: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      deletedAt: undefined,
      isDeleted: expect.any(Boolean),

      post: expect.any(Post),
    }))
  })
})
