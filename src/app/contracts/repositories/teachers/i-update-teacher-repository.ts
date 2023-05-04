import { ITeacherModel } from "./i-teacher-model";

export type ITeacherModelToUpdate = Partial<Omit<ITeacherModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
  | 'profile'
)>>;

export interface IUpdateTeacherRepository {
  update(id: string, data: ITeacherModelToUpdate): Promise<ITeacherModel>;
}
