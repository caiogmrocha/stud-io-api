import { Subject, Teacher, Student, Post } from "."

import { faker } from "@faker-js/faker"

describe('[Unit] Subject Entity', () => {
    it('should return with correct properties', () => {
        const sut = new Subject({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            displayName: faker.name.fullName(),
            description: faker.random.words(7),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: undefined,
            isDeleted: false,

            students: [ new Student({
                id: faker.datatype.uuid(),
                name: faker.name.fullName(),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
                profile: undefined,
            }) ],
            teachers: [ new Teacher({
                id: faker.datatype.uuid(),
                name: faker.name.fullName(),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
                profile: undefined,
            }) ],
            posts: [ new Post({
                id: faker.datatype.uuid(),
                title: faker.name.fullName(),
                description: faker.random.words(7),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
            }) ]
        })

        expect(sut.props).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            displayName: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            deletedAt: undefined,
            isDeleted: false,

            teachers: expect.arrayContaining([
                expect.any(Teacher),
            ]),
            students: expect.arrayContaining([
                expect.any(Student),
            ]),
            posts: expect.arrayContaining([
                expect.any(Post),
            ]),
        }))
    })
})
