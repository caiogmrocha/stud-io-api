import { IStudentModel } from "../students/i-student-model";
import { ITeacherModel } from "../teachers/i-teacher-model";

export type IProfileModel = {
  id: string;
  email: string;
  password: string;
  level: number;
  type: 'student' | 'teacher';
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  is_deleted: boolean;

  student?: IStudentModel;
  teacher?: ITeacherModel;
}
