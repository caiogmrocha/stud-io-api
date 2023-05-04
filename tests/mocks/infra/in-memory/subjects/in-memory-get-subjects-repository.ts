import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetSubjectsRepository, IGetSubjectsRepositoryOptions } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";

export class InMemoryGetSubjectsRepository implements IGetSubjectsRepository {
  async get(params: IGetSubjectsRepositoryOptions): Promise<ISubjectModel[]> {
    const database = await getInMemoryDatabase();

    const filteredSubjects = database.subjects.filter(row => {
      const counter: boolean[] = [];

      if (params.where && params.where?.length > 0) {
        for (let [ column, operator, value ] of params.where) {
          switch (true) {
            case operator === '<': counter.push(row[column]! < value!); break;
            case operator === '<=': counter.push(row[column]! <= value!); break;
            case operator === '=': counter.push(row[column]! == value!); break;
            case operator === '>=': counter.push(row[column]! >= value!); break;
            case operator === '>': counter.push(row[column]! > value!); break;
            case operator === '<>': counter.push(row[column]! != value!); break;
						case operator === 'in': counter.push(Array.isArray(value) && value.includes(row[column])); break;
          }
        }
      }

      return counter.every(condition => condition === true);
    });

		let paginatedSubjects;

		if (params.limit && params.offset) {
			paginatedSubjects = filteredSubjects.slice(params.offset - 1, params.limit);
		} else if (params.limit) {
			paginatedSubjects = filteredSubjects.slice(0, params.limit);
		} else if (params.offset) {
			paginatedSubjects = filteredSubjects.slice(params.offset);
		} else {
			paginatedSubjects = filteredSubjects;
		}

    return paginatedSubjects;
  }
}
