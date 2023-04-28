import { setupInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { GetSubjectsService } from "./get-subjects-service";
import { InMemoryGetSubjectsRepository } from "@/../tests/mocks/infra/in-memory/subjects/in-memory-get-subjects-repository";
import { faker } from "@faker-js/faker";

type SutTypes = {
	sut: GetSubjectsService;
};

function makeSut(): SutTypes {
	const getSubjectsRepository = new InMemoryGetSubjectsRepository();
	const sut = new GetSubjectsService(getSubjectsRepository);

	return { sut }
}

describe('[Unit] GetSubjectsService', () => {
	it('should return only the selected interval of subjects', async () => {
		await setupInMemoryDatabase({
			profile_subjects: [],
			profiles: [],
			students: [],
			subjects: faker.datatype.array(10).map(() => ({
				id: faker.datatype.number(),
				name: faker.name.fullName(),
				display_name: faker.name.fullName(),
				description: faker.random.words(6),
				is_deleted: false,
				created_at: new Date(),
			})),
			teachers: [],
		});

		const { sut } = makeSut();

		const output1 = await sut.execute({
			offset: 8,
			limit: 15,
		});
		const output2 = await sut.execute({
			offset: 1,
			limit: 10,
		});
		const output3 = await sut.execute({
			offset: 1,
			limit: 5,
		});

		expect(output1.isRight()).toBeTruthy();
		expect(output1.value).toHaveLength(3);
		expect(output2.isRight()).toBeTruthy();
		expect(output2.value).toHaveLength(10);
		expect(output3.isRight()).toBeTruthy();
		expect(output3.value).toHaveLength(5);
	});

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
