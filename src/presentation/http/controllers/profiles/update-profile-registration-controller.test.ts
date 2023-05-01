import * as Http from '../../contracts';
import { ValidationCompositeError } from '@/validation/errors/validation-composite-error';
import { app } from '@/main/server';

import { prisma } from '@/infra/prisma/prisma';
import { faker } from '@faker-js/faker';
import request from 'supertest';

describe('[E2E] Update Profile Registration Controller', () => {
	it('should return 422 if the provided data is invalid', async () => {
		const email = faker.internet.email();
		const password = faker.random.alphaNumeric(12);

		await prisma.profile.create({
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

		const subjectCreateMany = await prisma.subject.createMany({
			data: faker.datatype.array(10).map(() => ({
				name: faker.name.fullName(),
				displayName: faker.name.fullName(),
			})),
		});

		const profileAuthenticationResponse = await request(app)
			.post('/profiles/login')
			.send({ email, password });

		const updateProfileRegistrationResponse = await request(app)
			.put(`/profiles`)
			.send({
				name: '123412441',
				email: 'email@email.com',
				subjectsIds: [30],
			})
			.set('Authorization', 'Bearer ' + profileAuthenticationResponse.body.token)

		expect(updateProfileRegistrationResponse.status).toBe(422);
		expect(updateProfileRegistrationResponse.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: ValidationCompositeError.name,
				errors: expect.any(Object),
			}),
		}));
	});

	it('should return 404 if the profile does not exists', async () => {
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
				email: faker.internet.email(),
				subjectsIds: [],
			})
			.set('Authorization', 'Bearer ' + profileAuthenticationResponse.body.token)

		expect(updateProfileRegistrationResponse.status).toBe(404);
		expect(updateProfileRegistrationResponse.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Http.NotFoundError.name,
			}),
		}));
	});

	it('should return 401 if the profile is not authenticated', async () => {
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
				email: faker.internet.email(),
				subjectsIds: [],
			});

		expect(updateProfileRegistrationResponse.status).toBe(401);
		expect(updateProfileRegistrationResponse.body).toEqual(expect.objectContaining({
			error: expect.objectContaining({
				name: Http.UnauthorizedError.name,
			}),
		}));
	});
});
