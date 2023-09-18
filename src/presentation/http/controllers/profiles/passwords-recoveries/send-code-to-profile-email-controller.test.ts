import { app } from '@/main/config/http';
import * as Errors from '@/presentation/http/contracts';

import request from 'supertest';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { prisma } from '@/infra/prisma/prisma';

jest.mock('@/infra/bull/bull-queue-provider', () => require('~/mocks/infra/bullmq/fake-bull-queue-provider'));

describe('[E2E] SendCodeToProfileEmailController', () => {
	let sharedData = {
    email: faker.internet.email(),
  };

  beforeAll(async () => {
    await prisma.profile.create({
      data: {
        email: sharedData.email,
        password: await bcrypt.hash(faker.random.alphaNumeric(12), 10),
        type: 'student',
        student: {
          create: {
            name: faker.name.fullName(),
          },
        },
      },
    });
  });

	it('should return 404 if the provided e-mail does not exists in data source', async () => {
		const response = await request(app).post('/profiles/password-recovery/send-code-to-profile-email').send({
			email: 'any@email.com',
		});

		expect(response.status).toBe(404);
		expect(response.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Errors.NotFoundError.name,
			}),
		}));
	});

	it('should return 422 if the provided request data is invalid', async () => {
		const response = await request(app).post('/profiles/password-recovery/send-code-to-profile-email').send({
			email: 'any-email',
		});

		expect(response.status).toBe(422);
		expect(response.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Errors.UnprocessableEntityError.name,
			}),
		}));
	});

	it('should return 200 if is able to send the code to the provided profile e-mail', async () => {
		const response = await request(app).post('/profiles/password-recovery/send-code-to-profile-email').send({
			email: sharedData.email,
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({
			message: `Código enviado para o e-mail ${sharedData.email}.`,
			token: expect.any(String),
		}));
	});
});
