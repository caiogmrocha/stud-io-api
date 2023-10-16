import { IChangePasswordUseCase, IChangePasswordUseCaseParams, IChangePasswordUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-change-password-use-case";
import { IGetPasswordRecoveryByTokenRepository } from "@/app/contracts/repositories/profiles/passwords-recoveries/i-get-by-token";
import { IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { left, right } from "@/utils/logic/either";
import { TokenDoesNotExistError } from "./errors/token-does-not-exists-error";

export class ChangePasswordService implements IChangePasswordUseCase {
	constructor (
		private readonly updateProfileRepository: IUpdateProfileRepository,
		private readonly getPasswordRecoveryByTokenRepository: IGetPasswordRecoveryByTokenRepository,
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async execute(params: IChangePasswordUseCaseParams): Promise<IChangePasswordUseCaseResult> {
		const passwordRecoveryRegister = await this.getPasswordRecoveryByTokenRepository.getByToken(params.token, 'change_password_token');

		if (!passwordRecoveryRegister) {
			return left(new TokenDoesNotExistError(params.token));
		}

		const tokenVerifyResult = await this.jwtAuthenticationProvider.verify(params.token);

		if (tokenVerifyResult.isLeft()) {
			return tokenVerifyResult;
		}

		const { id: profileId } = tokenVerifyResult.value;

		await this.updateProfileRepository.update(profileId, {
			password: params.password,
		});

		return right(undefined);
	}
}
