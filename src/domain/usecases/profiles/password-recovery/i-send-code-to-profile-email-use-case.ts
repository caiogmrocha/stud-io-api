import { Either } from "@/utils/logic/either";
import { ProfileDoesNotExistsError } from '@/app/services/profiles/errors/profile-does-not-exists-error';

export type ISendCodeToProfileEmailUseCaseInputBoundary = {
	email: string;
}

export type ISendCodeToProfileEmailUseCaseOutputBoundary = {
	/**
	 * @description The code that was sent to the user's email
	 */
	code: string;
	/**
	 * @description The token that was used to allow the user to
	 * submit the code back to the server for password recovery
	 */
	token: string;
}


export type ISendCodeToProfileEmailServiceExpectedErrors = (
	| ProfileDoesNotExistsError
)

export type ISendCodeToProfileEmailServiceResult = Either<
	ISendCodeToProfileEmailServiceExpectedErrors,
	ISendCodeToProfileEmailUseCaseOutputBoundary
>;

export interface ISendCodeToProfileEmailUseCase {
	execute(input: ISendCodeToProfileEmailUseCaseInputBoundary): Promise<ISendCodeToProfileEmailServiceResult>;
}
