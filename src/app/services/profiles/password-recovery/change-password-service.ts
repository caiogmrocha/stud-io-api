import { IJWTAuthenticationProvider } from "@/app/contracts/auth/jwt/i-jwt-authentication-provider";
import { IChangePasswordUseCase, IChangePasswordUseCaseParams, IChangePasswordUseCaseResult } from "@/domain/usecases/profiles/password-recovery/i-change-password-use-case";
import { right } from "@/utils/logic/either";

export class ChangePasswordService implements IChangePasswordUseCase {
	constructor (
		private readonly jwtAuthenticationProvider: IJWTAuthenticationProvider,
	) {}

	async execute(params: IChangePasswordUseCaseParams): Promise<IChangePasswordUseCaseResult> {
		const tokenVerifyResult = await this.jwtAuthenticationProvider.verify(params.token);

		if (tokenVerifyResult.isLeft()) {
			return tokenVerifyResult;
		}

		return right(undefined);
	}
}
