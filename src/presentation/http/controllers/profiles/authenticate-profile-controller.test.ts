import { app } from '@/main/http';

import { faker } from '@faker-js/faker';
import { prisma } from '@/infra/prisma/prisma';
import request from 'supertest';
import bcrypt from 'bcrypt';
import { UnauthorizedError, UnprocessableEntityError } from '../../contracts';

describe('[E2E] Authenticate Profile Controller', () => {
  let sharedData = {
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(12),
  };

  beforeAll(async () => {
    await prisma.profile.create({
      data: {
        email: sharedData.email,
        password: await bcrypt.hash(sharedData.password, 10),
        type: 'student',
        student: {
          create: {
            name: faker.name.fullName(),
          },
        },
      },
    });
  });

  it('should return 200 if the authentication is a success', async () => {
    const response = await request(app).post('/profiles/login').send(sharedData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String),
    }));
  });

  it('should return 401 if the provided e-mail and password match with some profile in data source', async () => {
    const response = await request(app).post('/profiles/login').send({
      email: 'random@email.com',
      password: '123456789101',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: UnauthorizedError.name,
      }),
    }));
  });

  it('should return 422 if the provided data is invalid', async () => {
    const response = await request(app).post('/profiles/login').send({
      email: '@email.com',
      password: '12345678',
    });

    expect(response.status).toBe(422);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: UnprocessableEntityError.name,
      }),
    }));
  });
});
