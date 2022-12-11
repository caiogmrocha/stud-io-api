import { Profile, Student, Teacher } from "."

import { faker } from '@faker-js/faker'

describe('[Unit] Profile Entity', () => {
    it('should return with correct properties', () => {
        const firstSut = new Profile({
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(12),
            level: Number(faker.random.numeric()),
            type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
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
            })
        })
        const secondSut = new Profile({
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: faker.random.alphaNumeric(12),
            level: Number(faker.random.numeric()),
            type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
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
            })
        })

        expect(firstSut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            level: expect.any(Number),
            type: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: false,
            owner: expect.any(Student),
        }))
        expect(secondSut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            level: expect.any(Number),
            type: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: false,
            owner: expect.any(Teacher),
        }))
    })
})
