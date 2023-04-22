import { Either } from "@/utils/logic/either"

export type IAuthenticateProfileUseCaseInputBoundary = {
  email: string;
  password: string;
}

export type IAuthenticateProfileUseCaseOutPutBoundary = {
  token: string;
}

export type IAuthenticatedProfilePayload = {
	id: string;
	email: string;
}

export interface IAuthenticateProfileUseCase {
  execute(input: IAuthenticateProfileUseCaseInputBoundary): Promise<Either<
    Error,
    IAuthenticateProfileUseCaseOutPutBoundary
  >>;
}
