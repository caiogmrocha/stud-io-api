import { Either, right } from "@/utils/logic/either";
import { IGetSubjectsUseCase, IGetSubjectsUseCaseInputBoundary, IGetSubjectsUseCaseOutputBoundary,  } from "@/domain/usecases/subjects/i-get-all-subjects-use-case";
import { IGetSubjectsRepository } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { SubjectMapper } from "@/utils/mappers/subject-mapper";

export class GetSubjectsService implements IGetSubjectsUseCase {
	constructor (
		private readonly getSubjectsRepository: IGetSubjectsRepository,
	) {}

	async execute(input?: IGetSubjectsUseCaseInputBoundary): Promise<Either<
		Error,
		IGetSubjectsUseCaseOutputBoundary
	>> {
		const subjects = await this.getSubjectsRepository.get({
			limit: input?.limit,
			offset: input?.offset,
		});

		return right(subjects.map(SubjectMapper.fromModeltoEntity));
	}
}
