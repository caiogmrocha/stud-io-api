import { Student } from "."

import { faker } from '@faker-js/faker'

describe('[Unit] Student Entity', () => {
    it('should return with correct properties', () => {
        const sut = new Student({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
            isDeleted: false,
        })

        expect(sut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: false,
        }))
    })
})
