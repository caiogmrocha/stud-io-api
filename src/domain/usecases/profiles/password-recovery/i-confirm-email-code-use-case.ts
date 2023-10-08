import { CodeDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/code-does-not-exists-error";
import { MaximumCodeVerificationAttemptsReachedError } from "@/app/services/profiles/password-recovery/errors/maximum-code-verification-attempts-reached-error";
import { Either } from "@/utils/logic/either";

export type IConfirmEmailCodeUseCaseParams = {
	code: string;
};

export type IConfirmEmailCodeUseCaseResult = Either<(
	| CodeDoesNotExistError
	| MaximumCodeVerificationAttemptsReachedError
), {
	token: string;
}>;

export interface IConfirmEmailCodeUseCase {
	execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult>;
}
