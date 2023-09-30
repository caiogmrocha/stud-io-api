import { IConfirmEmailCodeUseCase, IConfirmEmailCodeUseCaseParams, IConfirmEmailCodeUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-confirm-email-code-use-case";
import { IGetPasswordRecoveryByCodeRepository } from "@/app/contracts/repositories/passwords-recoveries/i-get-by-code-repository";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { left, right } from "@/utils/logic/either";
import { CodeDoesNotExistError } from "./errors/code-does-not-exists-error";

export class ConfirmEmailService implements IConfirmEmailCodeUseCase {
	constructor (
		private readonly getPasswordRecoveryByCodeRepository: IGetPasswordRecoveryByCodeRepository,
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult> {
		const passwordRecoveryRegister = await this.getPasswordRecoveryByCodeRepository.getByCode(params.code);

		if (!passwordRecoveryRegister) {
			return left(new CodeDoesNotExistError(params.code));
		}

		const jwtVerifyResult = await this.jwtAuthenticationProvider.verify(passwordRecoveryRegister.send_code_token);

		if (jwtVerifyResult.isLeft()) {
			return left(jwtVerifyResult.value);
		}

		return right(undefined);
	}
}
