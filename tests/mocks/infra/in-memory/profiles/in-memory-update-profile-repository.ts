import { IN_MEMORY_DATABASE_PATH, getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";
import { IProfileModelToUpdate, IUpdateProfileRepository } from "@/app/contracts/repositories/profiles/i-update-profile-repository";
import { writeFile } from "fs/promises";

export class InMemoryUpdateProfileRepository implements IUpdateProfileRepository {
  async update(id: string, data: IProfileModelToUpdate): Promise<IProfileModel> {
    const database = await getInMemoryDatabase();

    const profile = database.profiles.find(profile => profile.id === id)!;

    const updatedData: IProfileModel = {
      id,
      email: data.email ?? profile.email,
      level: data.level ?? profile.level,
      password: data.password ?? profile.password,
      type: data.type ?? profile.type,
      created_at: profile.created_at,
      updated_at: new Date(),
      deleted_at: profile.deleted_at,
      is_deleted: profile.is_deleted,
    };

    database.profiles = database.profiles.filter(profile => profile.id !== id);

    database.profiles.push(updatedData);

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return updatedData;
  }
}
