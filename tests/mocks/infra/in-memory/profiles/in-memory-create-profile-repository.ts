import { getInMemoryDatabase, IN_MEMORY_DATABASE_PATH } from "@/../tests/helpers/in-memory-database";
import { ICreateProfileRepository, IProfileModelToCreate } from "@/app/contracts/repositories/profiles/i-create-profile-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";

import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";

export class InMemoryCreateProfileRepository implements ICreateProfileRepository {
  async create({ email, password, type, level }: IProfileModelToCreate): Promise<IProfileModel> {
    const database = await getInMemoryDatabase();

    const treatedData: IProfileModel = {
      id: randomUUID(),
      email,
      password,
      type,
      level,
      created_at: new Date(),
      updated_at: undefined,
      deleted_at: undefined,
      is_deleted: false,
    };

    database.profiles.push(treatedData);

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return treatedData;
  }
}
