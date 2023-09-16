import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { InMemoryGetProfilesRepository } from "../../../../../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { ProfileDoesNotExistsError } from "../errors/profile-does-not-exists-error";
import { SendCodeToProfileEmailService } from "./send-code-to-profile-email-service";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { ICreatePasswordRecoveryRequestRepository } from "@/app/contracts/repositories/passwords-recoveries/i-create-password-recovery-request-repository";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { IQueueProvider } from "@/app/contracts/queue/i-queue-provider";

describe('[Unit] SendCodeToProfileEmailService', () => {
	it('should return ProfileDoesNotExistsError if the provided e-mail does not exists in data source', async () => {
		const getProfilesRepository = {
			get: jest.fn().mockResolvedValue([]),
		} as InMemoryGetProfilesRepository;

		const createPasswordRecoveryRequestRepository = {
			createPasswordRecoveryRegister: jest.fn()
		} as ICreatePasswordRecoveryRequestRepository;

		const fakeJwtAuthenticationProvider = {
			sign: jest.fn(),
			verify: jest.fn(),
		} as IJWTAuthenticationProvider;

		const fakeQueueProvider = {
			addJob: jest.fn(),
			removeJob: jest.fn(),
		} as IQueueProvider;

		const sut = new SendCodeToProfileEmailService(
			getProfilesRepository,
			createPasswordRecoveryRequestRepository,
			fakeJwtAuthenticationProvider,
			fakeQueueProvider,
		);

		const result = await sut.execute({
			email: 'any@email.com',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ProfileDoesNotExistsError);
	});

	it('should return the 6 digits code and authorization token and have to sent send e-mail job to SendEmailQueue if the e-mail exists in data source', async () => {
		const getProfilesRepository = {
			get: jest.fn().mockResolvedValue([
				{
					id: 'any-id',
					email: 'any@email.com',
					password: 'any-password',
					created_at: new Date(),
					updated_at: new Date(),
					is_deleted: false,
					level: 0,
					type: 'student',
				}
			] as IProfileModel[]),
		} as unknown as IGetProfilesRepository;

		const createPasswordRecoveryRequestRepository = {
			createPasswordRecoveryRegister: jest.fn()
		} as unknown as ICreatePasswordRecoveryRequestRepository;

		const fakeJwtAuthenticationProvider = {
			sign: jest.fn().mockResolvedValue({
				isLeft: () => false,
				isRight: () => true,
				value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJuYW1lIjoiam9obiIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImV4cCI6MTYzMTk3MzAwMH0.yQy-b2hPWACy_Ldj0T49ynBe6XhG4F3Rr4lSmlzEtBo'
			} as Awaited<ReturnType<IJWTAuthenticationProvider['sign']>>),
			verify: jest.fn(),
		} as IJWTAuthenticationProvider;

		const fakeQueueProvider = {
			addJob: jest.fn(),
			removeJob: jest.fn(),
		} as IQueueProvider;

		const sut = new SendCodeToProfileEmailService(
			getProfilesRepository,
			createPasswordRecoveryRequestRepository,
			fakeJwtAuthenticationProvider,
			fakeQueueProvider,
		);

		const result = await sut.execute({
			email: 'any@email.com',
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value).toEqual(expect.objectContaining({
			code: expect.any(String),
			token: expect.any(String),
		}));
		expect(fakeJwtAuthenticationProvider.sign).toHaveBeenCalled();
		expect(fakeQueueProvider.addJob).toHaveBeenCalledWith(
			'SendEmailQueue',
			expect.objectContaining({
				template: 'password-recovery'
			}),
			expect.any(Object)
		);
		expect(createPasswordRecoveryRequestRepository.createPasswordRecoveryRegister).toHaveBeenCalledWith({
			profile_id: 'any-id',
			code: expect.any(String),
			send_code_token: expect.any(String),
			expires_at: expect.any(Date),
		});
	});
});
