import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetStudentsRepository, IGetStudentsRepositoryOptions } from "@/app/contracts/repositories/students/i-get-students-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";

export class InMemoryGetStudentsRepository implements IGetStudentsRepository {
  async get({ where }: IGetStudentsRepositoryOptions): Promise<IStudentModel[]> {
    const database = await getInMemoryDatabase();

    const filteredStudents = database.students.filter(row => {
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

    return filteredStudents;
  }
}
