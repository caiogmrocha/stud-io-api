import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetProfilesSubjectsRepository, IGetProfilesSubjectsRepositoryOptions } from "@/app/contracts/repositories/profiles-subjects/i-get-profiles-subjects-repository";
import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";

export class InMemoryGetProfilesSubjectsRepository implements IGetProfilesSubjectsRepository {
  async get({ where }: IGetProfilesSubjectsRepositoryOptions): Promise<IProfileSubjectModel[]> {
    const database = await getInMemoryDatabase();

    const filteredProfilesSubjects = database.profile_subjects.filter(row => {
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

    return filteredProfilesSubjects;
  }
}
