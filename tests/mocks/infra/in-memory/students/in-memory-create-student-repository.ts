import { getInMemoryDatabase, IN_MEMORY_DATABASE_PATH } from "@/../tests/helpers/in-memory-database";
import { ICreateStudentRepository, IStudentModelToCreate } from "@/app/contracts/repositories/students/i-create-student-repository";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";

import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

export class InMemoryCreateStudentRepository implements ICreateStudentRepository {
  async create({ name, profile_id }: IStudentModelToCreate): Promise<IStudentModel> {
    const database = await getInMemoryDatabase();

    const treatedData: IStudentModel = {
      id: randomUUID(),
      name: name,
      created_at: new Date(),
      updated_at: undefined,
      deleted_at: undefined,
      is_deleted: false,

      profile_id,
    };

    database.students.push(treatedData);

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return treatedData;
  }
}
