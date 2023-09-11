import { NotFoundError } from '../../contracts/errors/not-found-error';
import { app } from '@/main/http';

import { prisma } from '@/infra/prisma/prisma';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('[E2E] Get Profile Details Controller', () => {
  it('should return 200 if the profile has been founded', async () => {
    const email = faker.internet.email();

    const { id } = await prisma.profile.create({
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

    const response = await request(app).get(`/profiles/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      level: expect.any(Number),
      type: expect.any(String),
      createdAt: expect.any(String),
    }));
  });

  it("should return 400 if the profile hasn't been founded", async () => {
    const response = await request(app).get(`/profiles/qualquer-coisa`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.objectContaining({
      error: expect.objectContaining({
        name: NotFoundError.name,
      })
    }));
  });
});
