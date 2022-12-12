import { faker } from "@faker-js/faker"
import { File } from "."

describe('[Unit] File Entity', () => {
    it('should return with correct properties', () => {
        const sut = new File({
            id: faker.datatype.uuid(),
            name: faker.word.noun(),
            path: faker.internet.url(),
            mediaType: faker.helpers.arrayElement([ 'video', 'image', 'pdf', 'markdown' ]),
            extension: faker.helpers.arrayElement([ '.mp4', '.png', '.pdf', '.md' ]),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
            isDeleted: false,
        })

        expect(sut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            path: expect.any(String),
            mediaType: expect.any(String),
            extension: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: expect.any(Boolean),
        }))
    })
})
