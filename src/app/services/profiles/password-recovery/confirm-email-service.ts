import { IGetPasswordRecoveryByCodeRepository } from "@/app/contracts/repositories/passwords-recoveries/i-get-by-code-repository";
import { IGetProfilesRepository } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IConfirmEmailCodeUseCase, IConfirmEmailCodeUseCaseParams, IConfirmEmailCodeUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-confirm-email-code-use-case";
import { left, right } from "@/utils/logic/either";
import { CodeDoesNotExistError } from "./errors/code-does-not-exists-error";

export class ConfirmEmailService implements IConfirmEmailCodeUseCase {
	constructor (
		private readonly getPasswordRecoveryByCodeRepository: IGetPasswordRecoveryByCodeRepository,
	) {}

	async execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult> {
		const passwordRecoveryRegister = await this.getPasswordRecoveryByCodeRepository.getByCode(params.code);

		if (!passwordRecoveryRegister) {
			return left(new CodeDoesNotExistError(params.code));
		}

		return right(undefined);
	}
}
