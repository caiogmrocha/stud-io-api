import { IStudentModel } from "./i-student-model";

export type IStudentModelToUpdate = Partial<Omit<IStudentModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
  | 'profile'
)>>;

export interface IUpdateStudentRepository {
  update(id: string, data: IStudentModelToUpdate): Promise<IStudentModel>;
}
