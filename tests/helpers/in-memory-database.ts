import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model"
import { readFile, writeFile } from "fs/promises"
import path from "path";

type IInMemoryDatabaseModel = {
  profiles: IProfileModel[],
}

export async function setupInMemoryDatabase(data: IInMemoryDatabaseModel): Promise<void> {
  await writeFile(path.resolve(__dirname, '..', 'mocks', 'infra', 'database', 'database.json'), JSON.stringify(data));
}

export async function getInMemoryDatabase(): Promise<IInMemoryDatabaseModel> {
  const database = await readFile(path.resolve(__dirname, '..', 'mocks', 'infra', 'database', 'database.json'))

  return JSON.parse(database.toString()) as IInMemoryDatabaseModel;
}
