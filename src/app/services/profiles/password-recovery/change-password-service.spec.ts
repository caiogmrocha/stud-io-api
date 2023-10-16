import crypto from 'crypto';

import { faker } from '@faker-js/faker';

import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { ChangePasswordService } from "./change-password-service";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { IUpdateProfileRepository } from '@/app/contracts/repositories/profiles/i-update-profile-repository';
import { IGetPasswordRecoveryByTokenRepository } from '@/app/contracts/repositories/profiles/passwords-recoveries/i-get-by-token';
import { TokenDoesNotExistError } from './errors/token-does-not-exists-error';

describe('[Unit] ChangePasswordService', () => {
	it('should return TokenDoesNotExistsError if token does not exists in datasource', async () => {
		// Arrange
		const jwtAutheticationProvider = new JWTAuthenticationProvider();

		const fakeProfileRepository = {
			update: jest.fn(),
		} as IUpdateProfileRepository;

		const fakePasswordsRecoveriesRepository = {
			getByToken: jest.fn().mockResolvedValue(null),
		} as IGetPasswordRecoveryByTokenRepository;

		const sut = new ChangePasswordService(
			fakeProfileRepository,
			fakePasswordsRecoveriesRepository,
			jwtAutheticationProvider,
		);

		// Act
		const token = await jwtAutheticationProvider.sign({
			id: crypto.randomUUID(),
			email: faker.internet.email(),
		}, 3 * 60 * 60 * 1000);

		const result = await sut.execute({
			password: 'any_password',
			token: token.value as string,
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(TokenDoesNotExistError);
	});

	it('should return JWTVerifyError if token is invalid', async () => {
		// Arrange
		const jwtAutheticationProvider = new JWTAuthenticationProvider();

		const fakeProfileRepository = {
			update: jest.fn(),
		} as IUpdateProfileRepository;

		const token = await jwtAutheticationProvider.sign({
			id: crypto.randomUUID(),
			email: faker.internet.email(),
		}, -1);

		const fakePasswordsRecoveriesRepository = {
			getByToken: jest.fn().mockResolvedValue({
				id: crypto.randomUUID() as string,
				profile_id: crypto.randomUUID(),
				type: 'change_password_token',
				created_at: new Date(),
				updated_at: new Date(),
				attempts: 0,
				code: faker.random.alphaNumeric(6),
				token: faker.random.alphaNumeric(6),
				send_code_token: faker.random.alphaNumeric(6),
				change_password_token: token.value as string,
			} as Awaited<ReturnType<IGetPasswordRecoveryByTokenRepository['getByToken']>>),
		} as IGetPasswordRecoveryByTokenRepository;

		const sut = new ChangePasswordService(
			fakeProfileRepository,
			fakePasswordsRecoveriesRepository,
			jwtAutheticationProvider,
		);

		// Act
		const result = await sut.execute({
			password: 'any_password',
			token: token.value as string,
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(JWTVerifyError);
	});

	it('should return void if the password is changed successfully', async () => {
		// Arrange
		const profileEmail = faker.internet.email();
		const profileId = crypto.randomUUID();

		const jwtAutheticationProvider = new JWTAuthenticationProvider();

		const fakeProfileRepository = {
			update: jest.fn(),
		} as IUpdateProfileRepository;

		const token = await jwtAutheticationProvider.sign({
			id: profileId,
			email: profileEmail,
		}, 3 * 60 * 60 * 1000);

		const fakePasswordsRecoveriesRepository = {
			getByToken: jest.fn().mockResolvedValue({
				id: crypto.randomUUID() as string,
				profile_id: crypto.randomUUID(),
				type: 'change_password_token',
				created_at: new Date(),
				updated_at: new Date(),
				attempts: 0,
				code: faker.random.alphaNumeric(6),
				send_code_token: faker.random.alphaNumeric(6),
				change_password_token: token.value as string,
			} as Awaited<ReturnType<IGetPasswordRecoveryByTokenRepository['getByToken']>>),
		} as IGetPasswordRecoveryByTokenRepository;

		const sut = new ChangePasswordService(
			fakeProfileRepository,
			fakePasswordsRecoveriesRepository,
			jwtAutheticationProvider,
		);

		// Act
		const result = await sut.execute({
			password: 'any_password',
			token: token.value as string,
		});

		// Assert
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toBeUndefined();
		expect(fakeProfileRepository.update).toBeCalledWith(expect.any(String), {
			password: 'any_password',
		});
	});
});
