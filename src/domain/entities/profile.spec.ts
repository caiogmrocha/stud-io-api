import { Profile } from "."

import { faker } from '@faker-js/faker'

describe('[Unit] Profile Entity', () => {
    it('should return with correct properties', () => {
        const sut = new Profile({
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(12),
            level: Number(faker.random.numeric()),
            type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
            isDeleted: false,
        })

        expect(sut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            level: expect.any(Number),
            type: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: false,
        }))
    })
})
