import { IProfileModel } from "../profiles/i-profile-model";

export type IStudentModel = {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: boolean;

  profile_id: string;
  profile?: IProfileModel;
}
