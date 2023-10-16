import { JWTVerifyError } from "@/app/contracts/auth/jwt/errors/jwt-verify-error";
import { TokenDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/token-does-not-exists-error";
import { Either } from "@/utils/logic/either"

export type IChangePasswordUseCaseParams = {
	token: string
	password: string
}

export type IChangePasswordUseCaseResult = Either<JWTVerifyError | TokenDoesNotExistError, void>;

export interface IChangePasswordUseCase {
	execute(params: IChangePasswordUseCaseParams): Promise<IChangePasswordUseCaseResult>;
}
