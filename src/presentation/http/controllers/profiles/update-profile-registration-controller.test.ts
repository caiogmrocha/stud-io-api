import * as Http from '../../contracts';
import { app } from '@/main/server';

import { prisma } from '@/infra/prisma/prisma';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('[E2E] Update Profile Registration Controller', () => {
	it('should return 404 if profile does not exists', async () => {
		const email = faker.internet.email();
		const password = faker.random.alphaNumeric(12);

		const { id: profileId } = await prisma.profile.create({
			data: {
				email,
				password,
				type: 'student',
				student: {
					create: {
						name: faker.name.fullName(),
					},
				},
			},
		});

		const profileAuthenticationResponse = await request(app)
			.post('/profiles/login')
			.send({ email, password });

		await prisma.profile.delete({
			where: {
				id: profileId,
			},
		});

		const updateProfileRegistrationResponse = await request(app)
			.put(`/profiles`)
			.send({
				name: faker.name.fullName(),
				subjects: [],
			})
			.set('Authorization', profileAuthenticationResponse.body.token)

		expect(updateProfileRegistrationResponse.status).toBe(404);
		expect(updateProfileRegistrationResponse.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Http.NotFoundError.name,
			}),
		}));
	});

	it('should return 401 if profile is not authenticated', async () => {
		await prisma.profile.create({
			data: {
				email: faker.internet.email(),
				password: faker.random.alphaNumeric(12),
				type: 'student',
				student: {
					create: {
						name: faker.name.fullName(),
					},
				},
			},
		});

		const updateProfileRegistrationResponse = await request(app)
			.put(`/profiles`)
			.send({
				name: faker.name.fullName(),
				subjects: Array(5).map(() => faker.random.alphaNumeric()),
			});

		expect(updateProfileRegistrationResponse.status).toBe(401);
		expect(updateProfileRegistrationResponse.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Http.UnauthorizedError.name,
			}),
		}));
	});
});
