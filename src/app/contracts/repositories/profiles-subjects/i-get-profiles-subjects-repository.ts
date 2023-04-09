import { IWhereClauseOption } from "../common/i-where-clause-option";
import { IRelationsClauseOption } from "../common/i-relations-clause-option";
import { IProfileSubjectModel } from "./i-profile-subject-model";

export type IGetProfilesSubjectsRepositoryOptions = {
  where?: IWhereClauseOption<Omit<IProfileSubjectModel, 'profile' | 'subject'>>[];
  relations?: IRelationsClauseOption<'profile' | 'subject'>;
};

export interface IGetProfilesSubjectsRepository {
  get(options: IGetProfilesSubjectsRepositoryOptions): Promise<IProfileSubjectModel[]>;
}
