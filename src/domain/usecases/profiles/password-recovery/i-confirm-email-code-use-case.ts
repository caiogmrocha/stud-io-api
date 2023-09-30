import { CodeDoesNotExistError } from "@/app/services/profiles/password-recovery/errors/code-does-not-exists-error";
import { Either } from "@/utils/logic/either";

export type IConfirmEmailCodeUseCaseParams = {
	email: string;
	code: string;
};

export type IConfirmEmailCodeUseCaseResult = Either<CodeDoesNotExistError, void>;

export interface IConfirmEmailCodeUseCase {
	execute(params: IConfirmEmailCodeUseCaseParams): Promise<IConfirmEmailCodeUseCaseResult>;
}
