import { ITeacherModel } from "./i-teacher-model";

export type ITeacherModelToCreate = Omit<ITeacherModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
  | 'profile'
)>;

export interface ICreateTeacherRepository {
  create(data: ITeacherModelToCreate): Promise<ITeacherModel>;
}
