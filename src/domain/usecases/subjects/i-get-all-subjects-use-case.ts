import { Either } from "@/utils/logic/either";
import { Subject } from "@/domain/entities";

export type IGetSubjectsUseCaseInputBoundary = {
	limit?: number;
	offset?: number;
};

export type IGetSubjectsUseCaseOutputBoundary = Subject[];

export interface IGetSubjectsUseCase {
	execute(input?: IGetSubjectsUseCaseInputBoundary): Promise<Either<
		Error,
		IGetSubjectsUseCaseOutputBoundary
	>>
}
