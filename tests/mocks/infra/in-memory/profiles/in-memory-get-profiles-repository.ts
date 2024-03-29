import { getInMemoryDatabase } from "@/../tests/helpers/in-memory-database";
import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/profiles/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/profiles/i-profile-model";

export class InMemoryGetProfilesRepository implements IGetProfilesRepository {
  async get({ where }: IGetProfilesRepositoryOptions): Promise<IProfileModel[]> {
    const database = await getInMemoryDatabase();

    return database.profiles.filter(row => {
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
          }
        }
      }

      return counter.every(condition => condition === true);
    });
  }
}
