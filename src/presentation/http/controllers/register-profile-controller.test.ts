import { ProfileAlreadyExistsError } from '@/app/services/profiles/errors/profile-already-exists-error';
import { prisma } from '@/infra/prisma/prisma';
import { app } from '@/main/server';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('[E2E] Register Profile Controller', () => {
  it('should return 403 if the provided e-mail already was registered', async () => {
    const email = faker.internet.email();

    await prisma.profile.create({
      data: {
        email,
        password: faker.random.alphaNumeric(12),
        student: {
          create: {
            name: faker.name.fullName(),
          },
        },
      },
    });

    const response = await request(app).post('/profiles').send({
      name: faker.name.fullName(),
      email,
      password: faker.random.alphaNumeric(12),
      subjectIds: [],
    });

    expect(response.status).toBe(403);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ProfileAlreadyExistsError.name
      }),
    }));
  });
});
