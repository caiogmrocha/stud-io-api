import crypto from 'crypto';

import { faker } from '@faker-js/faker';

import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { ChangePasswordService } from "./change-password-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";

describe('[Unit] ChangePasswordService', () => {
	it('should return JWTVerifyError if token is invalid', async () => {
		// Arrange
		const jwtAutheticationProvider = new JWTAuthenticationProvider();

		const token = await jwtAutheticationProvider.sign({
			id: crypto.randomUUID(),
			email: faker.internet.email(),
		}, -1);
		const sut = new ChangePasswordService(jwtAutheticationProvider);

		// Act
		const result = await sut.execute({
			password: 'any_password',
			token: token.value as string,
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(JWTVerifyError);
	});

	it.todo('should return void if the password is changed successfully');
});
