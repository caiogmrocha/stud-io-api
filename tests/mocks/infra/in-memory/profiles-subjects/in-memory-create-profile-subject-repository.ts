import { getInMemoryDatabase, IN_MEMORY_DATABASE_PATH } from "@/../tests/helpers/in-memory-database";
import { ICreateProfileSubjectRepository, IProfileSubjectModelToCreate } from "@/app/contracts/repositories/profiles-subjects/i-create-profile-subject-repository";
import { IProfileSubjectModel } from "@/app/contracts/repositories/profiles-subjects/i-profile-subject-model";

import { writeFile } from "fs/promises";

export class InMemoryCreateProfileSubjectRepository implements ICreateProfileSubjectRepository {
  async create({ subject_id, profile_id }: IProfileSubjectModelToCreate): Promise<IProfileSubjectModel> {
    const database = await getInMemoryDatabase();

    const treatedData: IProfileSubjectModel = {
			subject_id,
      profile_id,
      created_at: new Date(),
      updated_at: undefined,
    };

    database.profile_subjects.push(treatedData);

    await writeFile(IN_MEMORY_DATABASE_PATH, JSON.stringify(database));

    return treatedData;
  }
}
