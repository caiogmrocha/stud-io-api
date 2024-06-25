import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetTeachersRepository, IGetTeachersRepositoryOptions } from "@/app/contracts/repositories/teachers/i-get-teachers-repository";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";

export class InMemoryGetTeachersRepository implements IGetTeachersRepository {
  async get({ where }: IGetTeachersRepositoryOptions): Promise<ITeacherModel[]> {
    const database = await getInMemoryDatabase();

    const filteredTeachers = database.teachers.filter(row => {
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

    return filteredTeachers;
  }
}
