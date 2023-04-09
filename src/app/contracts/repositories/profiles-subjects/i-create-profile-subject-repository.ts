import { IProfileSubjectModel } from "./i-profile-subject-model";

export type IProfileSubjectModelToCreate = Omit<IProfileSubjectModel, (
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'profile'
	| 'subject'
)>;

export interface ICreateProfileSubjectRepository {
  create(data: IProfileSubjectModelToCreate): Promise<IProfileSubjectModel>;
}
