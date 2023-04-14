import { IProfileModel } from "./i-profile-model";

export type IProfileModelToUpdate = Partial<Omit<IProfileModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
  | 'is_deleted'
  | 'student'
  | 'teacher'
	| 'subjects'
)>>;

export interface IUpdateProfileRepository {
  update(id: string, data: IProfileModelToUpdate): Promise<IProfileModel>;
}
