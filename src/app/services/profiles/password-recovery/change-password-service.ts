import { IChangePasswordUseCase, IChangePasswordUseCaseParams, IChangePasswordUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-change-password-use-case";
import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";
import { right } from "@/utils/logic/either";

export class ChangePasswordService implements IChangePasswordUseCase {
	constructor (
		private readonly updateProfileRepository: IUpdateProfileRepository,
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async execute(params: IChangePasswordUseCaseParams): Promise<IChangePasswordUseCaseResult> {
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
