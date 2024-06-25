import { IWhereClauseOption } from "../common/i-where-clause-option";
import { IRelationsClauseOption } from "../common/i-relations-clause-option";
import { IStudentModel } from "./i-student-model";

export type IGetStudentsRepositoryOptions = {
  where?: IWhereClauseOption<IStudentModel>[];
  relations?: IRelationsClauseOption<'profile'>;
};

export interface IGetStudentsRepository {
  get(options: IGetStudentsRepositoryOptions): Promise<IStudentModel[]>;
}
