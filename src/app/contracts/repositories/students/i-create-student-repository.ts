import { IStudentModel } from "./i-student-model";

export type IStudentModelToCreate = Omit<IStudentModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
)>;

export interface ICreateStudentRepository {
  create(data: IStudentModelToCreate): Promise<IStudentModel>;
}
