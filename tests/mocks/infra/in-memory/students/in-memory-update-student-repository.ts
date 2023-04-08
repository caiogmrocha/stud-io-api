import { IN_MEMORY_DATABASE_PATH, getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { IStudentModelToUpdate, IUpdateStudentRepository } from "@/app/contracts/repositories/students/i-update-student-repository";
import { writeFile } from "fs/promises";

export class InMemoryUpdateStudentRepository implements IUpdateStudentRepository {
  async update(id: string, data: IStudentModelToUpdate): Promise<IStudentModel> {
    const database = await getInMemoryDatabase();

    const student = database.students.find(student => student.id === id)!;

    const updatedData: IStudentModel = {
      id,
      name: data.name || student.name,
      profile_id: data.profile_id || student.profile_id,
      created_at: student.created_at,
      updated_at: new Date(),
      deleted_at: student.deleted_at,
      is_deleted: student.is_deleted,
    };

    database.students = database.students.filter(student => student.id !== id);

    database.students.push(updatedData);

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return updatedData;
  }
}
