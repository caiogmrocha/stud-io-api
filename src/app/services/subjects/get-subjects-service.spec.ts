import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { GetSubjectsService } from "./get-subjects-service";
import { InMemoryGetSubjectsRepository } from "@/../tests/mocks/infra/in-memory/subjects/in-memory-get-subjects-repository";

type SutTypes = {
	sut: GetSubjectsService;
};

function makeSut(): SutTypes {
	const getSubjectsRepository = new InMemoryGetSubjectsRepository();
	const sut = new GetSubjectsService(getSubjectsRepository);

	return { sut }
}

describe('[Unit] GetSubjectsService', () => {
	it('should return an empty array if does not exists subjects', async () => {
		await setupInMemoryDatabase({
			profile_subjects: [],
			profiles: [],
			students: [],
			subjects: [],
			teachers: [],
		});

		const { sut } = makeSut();

		const output = await sut.execute();

		expect(output.isRight()).toBeTruthy();
		expect(output.value).toEqual([]);
	});
});
