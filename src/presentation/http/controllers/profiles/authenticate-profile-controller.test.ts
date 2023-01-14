import { faker } from '@faker-js/faker';
import { prisma } from '@/infra/prisma/prisma';
import request from 'supertest';
import { app } from '@/main/server';
import { ValidationCompositeError } from '@/validation/errors/validation-composite-error';

describe('[E2E] Authenticate Profile Controller', () => {
  let sharedData;

  beforeAll(async () => {
    sharedData = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(12),
    };

    await prisma.profile.create({
      data: {
        ...sharedData,
        type: 'student',
        student: {
          create: {
            name: faker.name.fullName(),
          },
        },
      },
    });
  });

  it('should return 422 if the provided data is invalid', async () => {
    const response = await request(app).post('/profiles/login').send({
      email: '@email.com',
      password: '12345678',
    });

    expect(response.status).toBe(422);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: ValidationCompositeError.name,
      }),
    }));
  });
});
