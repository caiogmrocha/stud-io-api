import { ForbiddenError } from '../../contracts/errors/forbidden-error';
import { app } from '@/main/http';

import { prisma } from '@/infra/prisma/prisma';
import { faker } from '@faker-js/faker';
import request from 'supertest';
import { UnprocessableEntityError } from '../../contracts';

describe('[E2E] Register Profile Controller', () => {
  it('should return 201 if the profile has been registered', async () => {
    const response = await request(app).post('/profiles').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'abcdefghijkl',
      type: 'student',
      subjectsIds: [],
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeNull();
  });

  it('should return 422 if the provided data is invalid', async () => {
    const response = await request(app).post('/profiles').send({
      name: 12314,
      email: '@email.com',
      password: '12345678',
      subjectsIds: [],
    });

    expect(response.status).toBe(422);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: UnprocessableEntityError.name,
      }),
    }));
  });

  it('should return 403 if the provided e-mail already was registered', async () => {
    const email = faker.internet.email();

    await prisma.profile.create({
      data: {
        email,
        password: faker.random.alphaNumeric(12),
        type: 'student',
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
      type: 'student',
      subjectIds: [],
    });

    expect(response.status).toBe(403);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ForbiddenError.name
      }),
    }));
  });
});
