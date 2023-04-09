import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetSubjectsRepository, IGetSubjectsRepositoryOptions } from "@/app/contracts/repositories/subjects/i-get-subjects-repository";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";

export class InMemoryGetSubjectsRepository implements IGetSubjectsRepository {
  async get({ where }: IGetSubjectsRepositoryOptions): Promise<ISubjectModel[]> {
    const database = await getInMemoryDatabase();

    const filteredSubjects = database.subjects.filter(row => {
      const counter: boolean[] = [];

      if (where && where?.length > 0) {
        for (let [ column, operator, value ] of where) {
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

    return filteredSubjects;
  }
}
