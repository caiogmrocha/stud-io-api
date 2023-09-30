import { faker } from "@faker-js/faker";
import { ConfirmEmailService } from "./confirm-email-service";
import { CodeDoesNotExistError } from "./errors/code-does-not-exists-error";

describe('[Unit] ConfirmEmailService', () => {
	it('should return CodeDoesNotExistError if the provided code does not exist', async () => {
		// Arrange
		const fakeGetPasswordRecoveryByCodeRepository = {
			getByCode: jest.fn().mockResolvedValue(null),
		};
		const sut = new ConfirmEmailService(fakeGetPasswordRecoveryByCodeRepository);

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

	it.todo('should return ProfileDoesNotExistsError if the provided email does not exist');
	it.todo('should return CodeDoesNotMatchError if the provided code is invalid');
	it.todo('should return TokenExpiredError if the provided authorization token is expired');
	it.todo('should return MaxAttemptsExceededError if the provided authorization token has exceeded 3 attempts');
	it.todo('should return the authorization token if the provided code is valid');
});


