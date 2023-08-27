import { Either, left, right } from "@/utils/logic/either";
import { ISendCodeToProfileEmailServiceResult, ISendCodeToProfileEmailUseCase, ISendCodeToProfileEmailUseCaseInputBoundary } from "@/domain/usecases/profiles/password-recovery/i-send-code-to-profile-email-use-case";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { ProfileDoesNotExistsError } from "../errors/profile-does-not-exists-error";

export class SendCodeToProfileEmailService implements ISendCodeToProfileEmailUseCase {
	constructor(
		private readonly getProfilesRepository: IGetProfilesRepository,
	) { }

	async execute(input: ISendCodeToProfileEmailUseCaseInputBoundary): Promise<Either<Error, any>> { // Promise<ISendCodeToProfileEmailServiceResult> {
		const [ profile ] = await this.getProfilesRepository.get({
			where: [
				['email', '=', input.email]
			]
		});

		if (!profile) {
			return left(new ProfileDoesNotExistsError());
		}

		return right(null)
	}
}
