import request from 'supertest';
import { faker } from '@faker-js/faker';

import { prisma } from '@/infra/prisma/prisma';
import { app } from '@/main/config/http';
import { JWTAuthenticationProvider } from '@/infra/jwt/jwt-authentication-provider';
import { BCryptHashProvider } from '@/infra/bcrypt/bcrypt-hash-provider';

const jwtAuthenticationProvider = new JWTAuthenticationProvider();
const bcryptHashProvider = new BCryptHashProvider();

describe('[E2E] ConfirmEmailController', () => {
	it('should return 403 if the provided code does not exist', async () => {
		const response = await request(app)
			.post('/profiles/password-recovery/confirm-email')
			.send({
				code: 'invalid-code',
			});

		expect(response.status).toBe(403);
	});

	it('should return 403 if the provided code has expired', async () => {
		const profilePassword = (await bcryptHashProvider.hash(faker.random.alphaNumeric(12), 10)).value as string;

		const profileData = await prisma.profile.create({
      data: {
        email: faker.internet.email(),
        password: profilePassword,
        type: 'student',
        student: {
          create: {
            name: faker.name.fullName(),
          },
        },
      },
    });

		const token = (
			await jwtAuthenticationProvider.sign({
				id: profileData.id,
				email: profileData.email,
			}, 0)
		).value as string;

		await prisma.passwordRecovery.create({
			data: {
				code: 'expired-code',
				sendCodeToken: token,
				expiresAt: new Date(),
				attempts: 0,
				profileId: profileData.id,
			}
		});

		const response = await request(app)
			.post('/profiles/password-recovery/confirm-email')
			.send({
				code: 'expired-code',
			});

		expect(response.status).toBe(403);
	});

	it.todo('should return 403 if the provided code has reached the maximum verification attempts');
	it.todo('should return 200 if the provided code is valid');
});
