import { IWhereClauseOption } from "../common/i-where-clause-option";
import { IRelationsClauseOption } from "../common/i-relations-clause-option";
import { ISubjectModel } from "./i-subject-model";

export type IGetSubjectsRepositoryOptions = {
  where?: IWhereClauseOption<Omit<ISubjectModel, 'students' | 'teachers'>>[];
  relations?: IRelationsClauseOption<'profiles'>;
	limit?: number;
	offset?: number;
};

export interface IGetSubjectsRepository {
  get(options: IGetSubjectsRepositoryOptions): Promise<ISubjectModel[]>;
}
