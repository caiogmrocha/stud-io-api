import { InMemoryGetProfilesRepository } from "../../../../../tests/mocks/infra/in-memory/profiles/in-memory-get-profiles-repository";
import { ProfileDoesNotExistsError } from "../errors/profile-does-not-exists-error";
import { SendCodeToProfileEmailService } from "./send-code-to-profile-email-service";

type SutTypes = {
	sut: SendCodeToProfileEmailService;
}

function makeSut(): SutTypes {
	const getProfilesRepository = new InMemoryGetProfilesRepository();
	const sut = new SendCodeToProfileEmailService(
		getProfilesRepository,
	);

	return { sut };
}

describe('[Unit] SendCodeToProfileEmailService', () => {
	it('should return ProfileDoesNotExistsError if the provided e-mail does not exists in data source', async () => {
		const { sut } = makeSut();

		const result = await sut.execute({
			email: 'any_email',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(ProfileDoesNotExistsError);
	});
});
