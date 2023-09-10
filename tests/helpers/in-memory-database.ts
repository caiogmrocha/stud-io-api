import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model"
import { IStudentModel } from "@/app/contracts/repositories/students/i-student-model";
import { ISubjectModel } from "@/app/contracts/repositories/subjects/i-subject-model";
import { ITeacherModel } from "@/app/contracts/repositories/teachers/i-teacher-model";
import { readFile, writeFile } from "fs/promises"
import path from "path";

type IInMemoryDatabaseModel = Partial<{
  profiles: IProfileModel[],
  students: IStudentModel[],
  teachers: ITeacherModel[],
	subjects: ISubjectModel[],
	profile_subjects: IProfileSubjectModel[];
}>

export const IN_MEMORY_DATABASE_PATH = path.resolve(__dirname, '..', 'mocks', 'infra', 'database', 'database.json');

export async function setupInMemoryDatabase(data: IInMemoryDatabaseModel): Promise<void> {
  await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(data));
}

export async function getInMemoryDatabase(): Promise<IInMemoryDatabaseModel> {
  const database = await readFile(IN_MEMORY_DATABASE_PATH);

  return JSON.parse(database.toString()) as IInMemoryDatabaseModel;
}
