import { getInMemoryDatabase, IN_MEMORY_DATABASE_PATH } from "@/../tests/helpers/in-memory-database";
import { ICreateTeacherRepository, ITeacherModelToCreate } from "@/app/contracts/repositories/teachers/i-create-teacher-repository";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";

import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

export class InMemoryCreateTeacherRepository implements ICreateTeacherRepository {
  async create({ name, profile_id }: ITeacherModelToCreate): Promise<ITeacherModel> {
    const database = await getInMemoryDatabase();

    const treatedData: ITeacherModel = {
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
