export type ITeacherModel = {
  id: string;
  name: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: boolean;

  profile_id: string;
}
