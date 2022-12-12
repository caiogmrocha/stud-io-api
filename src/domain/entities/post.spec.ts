import { File, Post, Profile, Subject } from ".";

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
                email: faker.internet.email(),
                password: faker.random.alphaNumeric(12),
                level: Number(faker.random.numeric()),
                type: faker.helpers.arrayElement([ 'student', 'teacher' ]),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
            }),
            subjects: [ new Subject({
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                displayName: faker.name.fullName(),
                description: faker.random.words(7),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
            }) ],
            files: [ new File({
                id: faker.datatype.uuid(),
                name: faker.word.noun(),
                path: faker.internet.url(),
                mediaType: faker.helpers.arrayElement([ 'video', 'image', 'pdf', 'markdown' ]),
                extension: faker.helpers.arrayElement([ '.mp4', '.png', '.pdf', '.md' ]),
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: undefined,
                isDeleted: false,
            }) ]
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
