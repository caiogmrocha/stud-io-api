import { IGetProfilesRepository, IGetProfilesRepositoryOptions } from "@/app/contracts/repositories/i-get-profiles-repository";
import { IProfileModel } from "@/app/contracts/repositories/i-profile-model";

export class InMemoryGetProfilesRepository implements IGetProfilesRepository {
  constructor (private rows: IProfileModel[] = []) {}

  async get({ where }: IGetProfilesRepositoryOptions): Promise<IProfileModel[]> {
    return this.rows.filter(row => {
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
