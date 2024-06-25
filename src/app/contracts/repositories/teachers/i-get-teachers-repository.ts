import { IWhereClauseOption } from "../common/i-where-clause-option";
import { IRelationsClauseOption } from "../common/i-relations-clause-option";
import { ITeacherModel } from "./i-teacher-model";

export type IGetTeachersRepositoryOptions = {
  where?: IWhereClauseOption<ITeacherModel>[];
  relations?: IRelationsClauseOption<'profile'>;
};

export interface IGetTeachersRepository {
  get(options: IGetTeachersRepositoryOptions): Promise<ITeacherModel[]>;
}
