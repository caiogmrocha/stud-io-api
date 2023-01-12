import { Either } from "@/utils/logic/either"

export type IRegisterProfileUseCaseInputBoundary = {
  name: string;
  email: string;
  password: string;
  type: 'student' | 'teacher';
  subjectsIds: number[];
}

export type IRegisterProfileUseCaseOutPutBoundary = {
  profile: {
    name: string;
    email: string;
  };
}

export interface IRegisterProfileUseCase {
  execute(input: IRegisterProfileUseCaseInputBoundary): Promise<Either<
    Error,
    IRegisterProfileUseCaseOutPutBoundary
  >>;
}
