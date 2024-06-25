import { Either } from "@/utils/logic/either"

export type ISynchronizeProfilesSubjectsUseCaseInputBoundary = {
	profilesIds: string[];
	subjectsIds: number[];
}

export type ISynchronizeProfilesSubjectsUseCaseOutPutBoundary = null;

export interface ISynchronizeProfilesSubjectsUseCase {
  execute(input: ISynchronizeProfilesSubjectsUseCaseInputBoundary): Promise<Either<
    Error,
    ISynchronizeProfilesSubjectsUseCaseOutPutBoundary
  >>;
}
