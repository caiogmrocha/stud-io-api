import { IWhereClauseOption } from "../common/i-where-clause-option";
import { IRelationsClauseOption } from "../common/i-relations-clause-option";
import { IProfileModel } from "./i-profile-model";

export type IGetProfilesRepositoryOptions = {
  where?: IWhereClauseOption<Omit<IProfileModel, 'student' | 'teacher' | 'subjects'>>[];
  relations?: IRelationsClauseOption<'student' | 'teacher' | 'subjects'>;
};

export interface IGetProfilesRepository {
  get(options: IGetProfilesRepositoryOptions): Promise<IProfileModel[]>;
}
