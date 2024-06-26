import { IProfileModel } from "./i-profile-model";

export type IProfileModelToCreate = Omit<IProfileModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
  | 'student'
  | 'teacher'
	| 'subjects'
)>;

export interface ICreateProfileRepository {
  create(data: IProfileModelToCreate): Promise<IProfileModel>;
}
