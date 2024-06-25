import { IN_MEMORY_DATABASE_PATH, getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { ITeacherModelToUpdate, IUpdateTeacherRepository } from "@/app/contracts/repositories/teachers/i-update-teacher-repository";
import { writeFile } from "fs/promises";

export class InMemoryUpdateTeacherRepository implements IUpdateTeacherRepository {
  async update(id: string, data: ITeacherModelToUpdate): Promise<ITeacherModel> {
    const database = await getInMemoryDatabase();

    const teacher = database.teachers.find(teacher => teacher.id === id)!;

    const updatedData: ITeacherModel = {
      id,
      name: data.name || teacher.name,
      profile_id: data.profile_id || teacher.profile_id,
      created_at: teacher.created_at,
      updated_at: new Date(),
      deleted_at: teacher.deleted_at,
      is_deleted: teacher.is_deleted,
    };

    database.teachers = database.teachers.filter(teacher => teacher.id !== id);

    database.teachers.push(updatedData)

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return updatedData;
  }
}
