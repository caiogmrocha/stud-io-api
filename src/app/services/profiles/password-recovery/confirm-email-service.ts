import { IConfirmEmailCodeUseCase, IConfirmEmailCodeUseCaseParams, IConfirmEmailCodeUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-confirm-email-code-use-case";
import { IGetPasswordRecoveryByCodeRepository } from "@/app/contracts/repositories/passwords-recoveries/i-get-by-code-repository";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { left, right } from "@/utils/logic/either";
import { CodeDoesNotExistError } from "./errors/code-does-not-exists-error";
import { IIncrementPasswordRecoveryAttemptsRepository } from "@/app/contracts/repositories/passwords-recoveries/i-increment-password-recovery-attempts";
import { MaximumCodeVerificationAttemptsReachedError } from "./errors/maximum-code-verification-attempts-reached-error";
import { IUpdatePasswordRecoveryRepository } from "@/app/contracts/repositories/passwords-recoveries/i-update";

export class ConfirmEmailService implements IConfirmEmailCodeUseCase {
	constructor (
		private readonly getPasswordRecoveryByCodeRepository: IGetPasswordRecoveryByCodeRepository,
		private readonly updatePasswordRecoveryRepository: IUpdatePasswordRecoveryRepository,
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult> {
		const passwordRecoveryRegister = await this.getPasswordRecoveryByCodeRepository.getByCode(params.code);

		if (!passwordRecoveryRegister) {
			return left(new CodeDoesNotExistError(params.code));
		}

		const currentAttempts = passwordRecoveryRegister.attempts + 1;

		await this.updatePasswordRecoveryRepository.update({
			attempts: currentAttempts,
		}, passwordRecoveryRegister.id);

		if (currentAttempts >= 3) {
			return left(new MaximumCodeVerificationAttemptsReachedError());
		}

		const jwtVerifyResult = await this.jwtAuthenticationProvider.verify(passwordRecoveryRegister.send_code_token);

		if (jwtVerifyResult.isLeft()) {
			return left(jwtVerifyResult.value);
		}

		const changePasswordJwtSignResult = await this.jwtAuthenticationProvider.sign({
			id: passwordRecoveryRegister.id,
		}, 3 * 60 * 60 * 24)

		if (changePasswordJwtSignResult.isLeft()) {
			return left(changePasswordJwtSignResult.value);
		}

		await this.updatePasswordRecoveryRepository.update({
			change_password_token: changePasswordJwtSignResult.value
		}, passwordRecoveryRegister.id);

		return right({
			token: changePasswordJwtSignResult.value,
		});
	}
}
