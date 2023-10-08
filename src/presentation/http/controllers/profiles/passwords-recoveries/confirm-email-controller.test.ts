import { app } from '@/main/config/http';
import request from 'supertest';

describe('[E2E] ConfirmEmailController', () => {
	it('should return 403 if the provided code does not exist', async () => {
		const response = await request(app)
			.post('/profiles/password-recovery/confirm-email')
			.send({
				code: 'invalid-code',
			});

		expect(response.status).toBe(403);
	});

	it.todo('should return 403 if the provided code has expired');
	it.todo('should return 403 if the provided code has reached the maximum verification attempts');
	it.todo('should return 200 if the provided code is valid');
});
