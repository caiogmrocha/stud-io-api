import { CodeDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/code-does-not-exists-error";
import { MaximumCodeVerificationAttemptsReachedError } from "@/app/services/profiles/password-recovery/errors/maximum-code-verification-attempts-reached-error";
import { Either } from "@/utils/logic/either";

export type IConfirmEmailCodeUseCaseParams = {
	email: string;
	code: string;
};

export type IConfirmEmailCodeUseCaseResult = Either<(
	| CodeDoesNotExistError
	| MaximumCodeVerificationAttemptsReachedError
), void>;

export interface IConfirmEmailCodeUseCase {
	execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult>;
}
