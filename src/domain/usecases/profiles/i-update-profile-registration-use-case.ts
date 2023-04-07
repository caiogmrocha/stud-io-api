import { Either } from "@/utils/logic/either"

export type IUpdateProfileRegistrationUseCaseInputBoundary = {
  id: string;
  name: string;
  email: string;
  subjectsIds: number[];
}

export type IUpdateProfileRegistrationUseCaseOutPutBoundary = null;

export interface IUpdateProfileRegistrationUseCase {
  execute(input: IUpdateProfileRegistrationUseCaseInputBoundary): Promise<Either<
    Error,
    IUpdateProfileRegistrationUseCaseOutPutBoundary
  >>;
}
