import { IWhereClauseOption } from "./common/i-where-clause-option";
import { IProfileModel } from "./i-profile-model";

export type IGetProfilesRepositoryOptions = {
  where?: IWhereClauseOption<IProfileModel>[]
};

export interface IGetProfilesRepository {
  get(options: IGetProfilesRepositoryOptions): Promise<IProfileModel[]>;
}
