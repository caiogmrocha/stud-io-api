import crypto from 'crypto';

import request from	'supertest';

import { BCryptHashProvider } from '@/infra/bcrypt/bcrypt-hash-provider';
import { app } from '@/main/config/http';
import { faker } from '@faker-js/faker';
import { prisma } from '@/infra/prisma/prisma';
import { JWTAuthenticationProvider } from '@/infra/jwt/jwt-authentication-provider';
import { JWTVerifyError } from '@/app/contracts/auth/jwt/errors/jwt-verify-error';

const bcryptHashProvider = new BCryptHashProvider();
const jwtAuthenticationProvider = new JWTAuthenticationProvider();

describe('[E2E] ChangePasswordController', () => {
	it('should return 401 if no authorization header is provided', async () => {
		// Arrange
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

		// Act
		const sendCodeToProfileEmailResponse = await request(app)
			.post('/profiles/password-recovery/send-code-to-profile-email')
			.send({
				email: profileData.email,
			});

		await request(app)
			.post('/profiles/password-recovery/confirm-email')
			.send({
				code: sendCodeToProfileEmailResponse.body.code,
			});

		const changePasswordResponse = await request(app)
			.patch('/profiles/password-recovery/change-password')
			.send({
				password: 'any_password',
			});

		// Assert
		expect(changePasswordResponse.status).toBe(401);
		expect(changePasswordResponse.body).toEqual({
			error: expect.objectContaining({
				name: 'UnauthorizedError',
				message: 'Tentativa de alteração de senha não autorizada.',
			}),
		});
	}, 45000);

	it('should return 403 if the token does not exists in datasource', async () => {
		// Arrange
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

		// Act
		const sendCodeToProfileEmailResponse = await request(app)
			.post('/profiles/password-recovery/send-code-to-profile-email')
			.send({
				email: profileData.email,
			});

		await request(app)
			.post('/profiles/password-recovery/confirm-email')
			.send({
				code: sendCodeToProfileEmailResponse.body.code,
			});

		const fakeToken = (await jwtAuthenticationProvider.sign({
			id: crypto.randomUUID(),
			email: faker.internet.email(),
		}, 3 * 60 * 60 * 1000)).value as string;

		const changePasswordResponse = await request(app)
			.patch('/profiles/password-recovery/change-password')
			.send({
				password: 'any_password',
			})
			.set('Authorization', `Bearer ${fakeToken}`);

		// Assert
		expect(changePasswordResponse.status).toBe(403);
		expect(changePasswordResponse.body).toEqual({
			error: expect.objectContaining({
				name: 'ForbiddenError',
				message: `Não foi encontrado nenhum registro de recuperação de senha com o token ${fakeToken}`,
			}),
		});
	}, 45000);

	it.todo('should return 422 if the password is invalid');
	it.todo('should return 200 if the password is changed successfully');
});
