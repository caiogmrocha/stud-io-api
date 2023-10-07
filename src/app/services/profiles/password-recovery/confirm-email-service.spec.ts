import crypto from "crypto";

import { faker } from "@faker-js/faker";

import { ConfirmEmailService } from "./confirm-email-service";
import { CodeDoesNotExistError } from "./errors/code-does-not-exists-error";
import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { JWTAuthenticationProvider } from "@/infra/jwt/jwt-authentication-provider";
import { IGetPasswordRecoveryByCodeRepository } from "@/app/contracts/repositories/passwords-recoveries/i-get-by-code-repository";
import { MaximumCodeVerificationAttemptsReachedError } from "./errors/maximum-code-verification-attempts-reached-error";
import { IUpdatePasswordRecoveryRepository } from "@/app/contracts/repositories/passwords-recoveries/i-update";

describe('[Unit] ConfirmEmailService', () => {
	it('should return CodeDoesNotExistError if the provided code does not exist', async () => {
		// Arrange
		const fakeGetPasswordRecoveryByCodeRepository = {
			getByCode: jest.fn().mockResolvedValue(null),
		};

		const jwtAuthenticationProvider = new JWTAuthenticationProvider();

		const fakeUpdatePasswordRecoveryRepository = {
			update: jest.fn(),
		} as IUpdatePasswordRecoveryRepository;

		const sut = new ConfirmEmailService(
			fakeGetPasswordRecoveryByCodeRepository,
			fakeUpdatePasswordRecoveryRepository,
			jwtAuthenticationProvider,
		);

		const fakeCode = faker.random.numeric(6);

		// Act
		const result = await sut.execute({
			code: fakeCode,
			email: faker.internet.email(),
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toEqual(new CodeDoesNotExistError(fakeCode));
	});

	it('should return JWTVerifyError if the provided authorization token is expired', async () => {
		// Arrange
		const fakeId = crypto.randomUUID();
		const fakeCode = faker.random.numeric(6);
		const fakeEmail = faker.internet.email();

		const jwtAuthenticationProvider = new JWTAuthenticationProvider();

		const fakeToken = await jwtAuthenticationProvider.sign({
			id: fakeId,
			email: fakeEmail,
		}, -1); // token already expired

		const fakeGetPasswordRecoveryByCodeRepository = {
			getByCode: jest.fn().mockResolvedValue({
				id: crypto.randomUUID() as string,
				code: fakeCode,
				send_code_token: fakeToken.value,
				profile_id: faker.random.alphaNumeric(10),
			} as Awaited<ReturnType<IGetPasswordRecoveryByCodeRepository['getByCode']>>),
		};

		const fakeUpdatePasswordRecoveryRepository = {
			update: jest.fn(),
		} as IUpdatePasswordRecoveryRepository;

		const sut = new ConfirmEmailService(
			fakeGetPasswordRecoveryByCodeRepository,
			fakeUpdatePasswordRecoveryRepository,
			jwtAuthenticationProvider,
		);

		// Act
		const result = await sut.execute({
			code: fakeCode,
			email: fakeEmail,
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(JWTVerifyError);
	});

	it('should return MaxAttemptsOfPasswordRecoveryReachedError if the provided code has reached 3 attempts', async () => {
		// Arrange
		const fakeId = crypto.randomUUID();
		const fakeCode = faker.random.numeric(6);
		const fakeEmail = faker.internet.email();

		const jwtAuthenticationProvider = new JWTAuthenticationProvider();

		const fakeToken = await jwtAuthenticationProvider.sign({
			id: fakeId,
			email: fakeEmail,
		}, 3 * 60 * 60 * 1000);

		const fakeGetPasswordRecoveryByCodeRepository = {
			getByCode: jest.fn().mockResolvedValue({
				id: crypto.randomUUID() as string,
				code: fakeCode,
				send_code_token: fakeToken.value,
				profile_id: faker.random.alphaNumeric(10),
				attempts: 3,
			} as Awaited<ReturnType<IGetPasswordRecoveryByCodeRepository['getByCode']>>),
		} as IGetPasswordRecoveryByCodeRepository;

		const fakeUpdatePasswordRecoveryRepository = {
			update: jest.fn(),
		} as IUpdatePasswordRecoveryRepository;

		const sut = new ConfirmEmailService(
			fakeGetPasswordRecoveryByCodeRepository,
			fakeUpdatePasswordRecoveryRepository,
			jwtAuthenticationProvider,
		);

		// Act
		const result = await sut.execute({
			code: fakeCode,
			email: fakeEmail,
		});

		// Assert
		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(MaximumCodeVerificationAttemptsReachedError);
	});

	it('should store and return the authorization token if the provided code is valid', async () => {
		// Arrange
		const fakeId = crypto.randomUUID();
		const fakeCode = faker.random.numeric(6);
		const fakeEmail = faker.internet.email();

		const jwtAuthenticationProvider = new JWTAuthenticationProvider();

		const fakeToken = await jwtAuthenticationProvider.sign({
			id: fakeId,
			email: fakeEmail,
		}, 3 * 60 * 60 * 1000);

		const fakeGetPasswordRecoveryByCodeRepository = {
			getByCode: jest.fn().mockResolvedValue({
				id: crypto.randomUUID() as string,
				code: fakeCode,
				send_code_token: fakeToken.value,
				profile_id: faker.random.alphaNumeric(10),
			} as Awaited<ReturnType<IGetPasswordRecoveryByCodeRepository['getByCode']>>),
		} as IGetPasswordRecoveryByCodeRepository;

		const fakeUpdatePasswordRecoveryRepository = {
			update: jest.fn(),
		} as IUpdatePasswordRecoveryRepository;

		const sut = new ConfirmEmailService(
			fakeGetPasswordRecoveryByCodeRepository,
			fakeUpdatePasswordRecoveryRepository,
			jwtAuthenticationProvider,
		);

		// Act
		const result = await sut.execute({
			code: fakeCode,
			email: fakeEmail,
		});

		// Assert

		console.log(result)
		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual(expect.objectContaining({
			token: expect.any(String),
		}));
	});

	it.todo('should return ProfileDoesNotExistsError if the provided email does not exist');
});


